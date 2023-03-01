const {SlashCommandBuilder, EmbedBuilder, PermissionsBitField} = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("review")
        .setDescription("Create an anonymous review for a faction")
        .addStringOption(option =>
            option.setName("faction")
                .setDescription("The faction to review")
                .setRequired(true)
        )
        .addIntegerOption(option =>
            option.setName("rating")
                .setDescription("The rating of the faction")
                .setRequired(true)

                .addChoices(
                    { name: "1", value: 1 },
                    { name: "2", value: 2 },
                    { name: "3", value: 3 },
                    { name: "4", value: 4 },
                    { name: "5", value: 5 }
                )

        )
        .addStringOption(option =>
            option.setName("title")
                .setDescription("The title of the review")
                .setRequired(true)
        )
        .addStringOption(option =>
            option.setName("body")
                .setDescription("The body of the review")
                .setRequired(true)
        ),

    async execute(interaction) {

        const
            data = [
                interaction.options.getString('faction'),
                interaction.options.getInteger('rating'),
                interaction.options.getString('title'),
                interaction.options.getString('review')
            ]

        const
            star = "⭐",
            starEmpty = "⬛";

        let stars = "";


        for (let i = 0; i < data[1]; i++) {
            stars += star;
        }

        for (let i = 0; i < 5 - data[1]; i++) {
            stars += starEmpty;
        }


        const embed = new EmbedBuilder()
            .setColor('#0099ff')
            .setTitle(`**${data[0]}** - ${data[2]}`)
            .setDescription(data[3])
            .setFooter({
                text: stars,
                iconURL: "https://media.discordapp.net/attachments/1078082033030529044/1080268320286191727/cow_on_sk8board.jpg"
            });

        await interaction.reply({embeds: [embed], ephemeral: true, content: "This function isn't yet ready, but here's a preview of what it will look like:"});

    }
}
