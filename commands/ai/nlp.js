const qna = require('@tensorflow-models/qna');
require('@tensorflow/tfjs-core');
require('@tensorflow/tfjs-node')


const
    search = require('../../backend/web_search'),
    axios = require("axios"),
    {SlashCommandBuilder, EmbedBuilder} = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("nlp")
        .setDescription("Use artificial intelligence to search the web and provide an intelligent summary")
        .addStringOption(option =>
            option.setName("query")
                .setDescription("The query to search for")
                .setRequired(true)),

    async execute(interaction) {

        console.log("HI")
        await interaction.reply("<a:processing:1085670319127285850> Searching... This may take a few seconds")

        const
            query = interaction.options.getString("query");
        let
            searchTime = Date.now(),
            summaryTime,
            timeForSearch,
            timeForSummary;


        search.searchGoogle(query).then(async (results) => {
            await interaction.editReply("<a:processing:1085670319127285850> Search complete. Processing results... This may take a few seconds")

            timeForSearch = Date.now() - searchTime;

            const
                article = results.snippets,
                source = results.links;

            const
                answers = await qna.load(),
                answer = await answers.findAnswers(query, article);


            const
                embed = new EmbedBuilder()
                    .setTitle("Search Results")
                    .setURL(source[0])
                    .setDescription(`. ` + answer.toString())
                    .setFooter({
                        text: `Search took ${timeForSearch}ms`
                    })
                    .setTimestamp();

            await interaction.editReply({embeds: [embed], content: "Search complete"})



        }).catch(async (error) => {
            console.log(error);
            await interaction.editReply("Sorry, something went wrong. Please try again later");
        });
    }
}