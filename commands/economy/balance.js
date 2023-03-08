const {
        SlashCommandBuilder,
        EmbedBuilder
    } = require("discord.js");

const profileModel = require("../../models/profileSchema");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("balance")
        .setDescription("Check your balance")

        .addMentionableOption(option =>
            option.setName("user")
                .setDescription("The user to check the balance of")
        ),

    async execute(interaction) {

        const
            userID = interaction.options.getMentionable("user") || interaction.user;
        let profileData;

        try {
            profileData = await profileModel.findOne({userID: userID.id});
            if (!profileData) {
                const embed = new EmbedBuilder()
                    .setColor('#0099ff')
                    .setTitle("User not in database")
                    .setDescription("Please use the /start command to create a profile")
                    .setTimestamp()
                    .setFooter({
                        text: `Requested by ${interaction.user.tag}`,
                        iconURL: interaction.user.displayAvatarURL()
                    })
                return interaction.reply({embeds: [embed]})
            }
        }
        catch (err) {
            console.log(err)
        }

        let currency = profileData.currency, bank = profileData.bank;

        // Format the values
        currency = currency.toLocaleString();
        bank = bank.toLocaleString();

        const embed = new EmbedBuilder()
            .setColor('#0099ff')
            .setDescription(`**<@${userID.id}>'s balance** \n\n**BANK:** $${bank}\n**IN HAND:** $${currency}`)
            .setTimestamp()
            .setFooter({
                text: `Requested by ${interaction.user.tag}`,
                iconURL: interaction.user.displayAvatarURL()
            });

        await interaction.reply({embeds: [embed]})

    }
}