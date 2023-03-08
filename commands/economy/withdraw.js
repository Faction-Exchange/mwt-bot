const {
        SlashCommandBuilder,
        EmbedBuilder
    } = require("discord.js");

const profileModel = require("../../models/profileSchema");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("withdraw")
        .setDescription("Withdraw money from your bank account")
        .addIntegerOption(option =>
            option.setName("amount")
                .setDescription("The amount of money you want to deposit")
                .setRequired(false)
        ),

    async execute(interaction) {

        const
            profileData = await profileModel.findOne({userID: interaction.user.id});


        let
            userCash = profileData.bank,
            amount = userCash;

        // if amount is defined, set amount to amount
        if (interaction.options.getInteger("amount")) {
            amount = interaction.options.getInteger("amount");
        }


        const
            taxRate = 0.05,
            taxed = Math.round(amount * taxRate),
            untaxed = amount - taxed;

        if (amount > profileData.bank) return interaction.reply({content: "You don't have that much money in your bank account!", ephemeral: true});

        await profileModel.findOneAndUpdate(
            {
                userID: interaction.user.id
            },
            {
                $inc: {
                    currency: untaxed,
                    bank: -amount
                }
            }
        );

        const embed = new EmbedBuilder()
            .setTitle("Withdraw")
            .setDescription(`You withdrew $${amount.toLocaleString()} from your bank account. You payed fees of 5% ($${taxed.toLocaleString()})`)
            .setTimestamp()
            .setFooter({
                    text: `Requested by ${interaction.user.tag}`,
                    iconURL: interaction.user.displayAvatarURL()
                });

        interaction.reply({embeds: [embed]});
    }
};
