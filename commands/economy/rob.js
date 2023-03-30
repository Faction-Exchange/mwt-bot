const {
        SlashCommandBuilder,
        EmbedBuilder
    } = require("discord.js");
const profileModel = require("../../models/profileSchema");

const cooldown = new Set();
const cooldownTime = 60 * 1000;

module.exports = {
    data: new SlashCommandBuilder()
        .setName("rob")
        .setDescription("Rob someone")
        .addUserOption(option =>
            option.setName("target")
                .setDescription("The user you want to rob")
                .setRequired(true)
        ),

    async execute(interaction) {

        // Check if the user is in the cooldown
        // stored like this: `USERID ::: DATE`

        // loop through the cooldown set
        for (const id of cooldown) {
            // split the id into an array
            const split = id.split(" ::: ");

            // check if the user id is the same as the user who ran the command
            if (split[0] === interaction.user.id) {
                // check if the current time is greater than the cooldown time
                if (Date.now() < split[1] + cooldownTime) {

                    // display time like this <t:epochtime:R>

                    split[1] = parseInt(split[1]);



                    const
                        timeLeft = (split[1] + cooldownTime - Date.now()),
                        embed = new EmbedBuilder()
                            .setTitle("Cooldown")
                            .setDescription(`You are on cooldown until <t:${(Date.now() + timeLeft)}:R>`)
                            .setTimestamp()
                            .setFooter({
                                text: `Requested by ${interaction.user.tag}`,
                                iconURL: interaction.user.displayAvatarURL()
                            });

                    console.log(
                        [
                            split[1],
                            cooldownTime,
                            Date.now(),
                            Date.now() + cooldownTime,
                            timeLeft,

                        ]
                    )

                    return interaction.reply({embeds: [embed]});
                }
            }
        }

        const
            target = interaction.options.getUser("target");

        let
            targetData;

        if (target.id === interaction.user.id) {
            return interaction.reply({
                content: "You can't rob yourself!",
                ephemeral: true
            });
        }

        try {
            targetData = await profileModel.findOne({userID: target.id});

            if (!targetData) {
                return interaction.reply({
                    content: "That user doesn't have a profile yet!",
                    ephemeral: true
                });
            }

            const
                targetCash = targetData.currency,
                robbed = Math.round(Math.random() / 2 * targetCash)

            // if (robbed <= 0) {
            //     const embed = new EmbedBuilder()
            //         .setTitle("Rob")
            //         .setDescription(`You tried to rob ${target.tag} but failed!`)
            //         .setTimestamp()
            //         .setFooter({
            //             text: `Requested by ${interaction.user.tag}`,
            //             iconURL: interaction.user.displayAvatarURL()
            //         })
            //
            //     return interaction.reply({embeds: [embed]});
            // }

            // add dictionary of the user id and the current time

            // epoch time
            const
                epochTime = Math.round(new Date().getTime() / 1000),
                endTime = `${interaction.user.id} ::: ${epochTime}`,
                expireTime = epochTime + 600;

            cooldown.add(endTime);

            setTimeout(() => {
                cooldown.delete(endTime);
                console.log(`Removed ${interaction.user.id} from the cooldown`);
            }, cooldownTime);

            const embed = new EmbedBuilder()
                .setTitle("Rob")
                .setDescription(`You robbed ${target.tag} and got away with $${robbed.toLocaleString()}`)
                .setTimestamp()
                .setFooter({
                    text: `Requested by ${interaction.user.tag}`,
                    iconURL: interaction.user.displayAvatarURL()
                })

            await profileModel.findOneAndUpdate(
                {
                    userID: interaction.user.id,
                },
                {
                    $inc: {currency: robbed}
                }
            )

            await profileModel.findOneAndUpdate(
                {
                    userID: target.id
                },
                {
                    $inc: {
                        currency: -robbed
                    }
                }
            )

            return interaction.reply({
                content: `<@${target.id}>`,
                embeds: [embed]
            })


        } catch (err) {
            console.log(err);
            return interaction.reply({
                content: "There was an error executing this command!",
                ephemeral: true
            });
        }

    }
}