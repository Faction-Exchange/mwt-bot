const {
        SlashCommandBuilder,
        EmbedBuilder
    } = require("discord.js");

const profileModel = require("../../models/profileSchema");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("leaderboard")
        .setDescription("View the leaderboard of the server")

        .addStringOption(
            option => option.setName("type")
                .setDescription("The type of leaderboard you want to view")
                .setRequired(false)
                .addChoices(
                    {name: "cash", value: "cash"},
                    {name: "bank", value: "bank"}
                )
        ),

    async execute(interaction) {

        const
            sortOption = "bank" || interaction.getAttribute("type");

        let
            results,
            leaderboard,
            i = 0;

        if (sortOption === "cash") {
            results = await profileModel.find({}).sort({ currency: -1 }).exec();
            leaderboard = results.map(result => {
                i++; return `${i}. ${interaction.client.users.cache.get(result.userID)} - $${result.currency}`;
            }).join("\n");
        }

        else if (sortOption === "bank") {
            results = await profileModel.find({}).sort({ bank: -1 }).exec();
            leaderboard = results.map(result => {
                i++; return `${i}. ${interaction.client.users.cache.get(result.userID)} - $${result.bank}`;
            }).join("\n");
        }

        const embed = new EmbedBuilder()
            .setTitle("Leaderboard" + ` (By ${sortOption})`)
            .setDescription(leaderboard)
            .setTimestamp()
            .setFooter({
                text: `Requested by ${interaction.user.tag}`,
                iconURL: interaction.user.displayAvatarURL()
            });
        await interaction.reply({embeds: [embed]});

    }

}