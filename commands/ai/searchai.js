require('dotenv').config();

const
    search = require('../../backend/web_search'),
    axios = require("axios"),
    apiKey = process.env.API_KEY;
const {EmbedBuilder, SlashCommandBuilder} = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("searchai")
        .setDescription("Use our top class artificial intelligence to search the web and provide an intelligent summary")
        .addStringOption(option =>
            option.setName("query")
                .setDescription("The query to search for")
                .setRequired(true)),

    async execute(interaction) {


        interaction.reply("<a:processing:1085670319127285850> Searching... This may take up to 5 seconds")

        const query = interaction.options.getString("query");


        // Search google for the query then use one AI to 1) generate a title, 2) generate topics and 3) generate a summary
        search.searchGoogle(query).then(async (results) => {

            await interaction.editReply("<a:processing:1085670319127285850> Search complete. Processing results... This may take up to 15 seconds")

            const
                article = results.snippets,
                source = results.links,

                config = {
                    timeout: 15000,
                    method: "POST",
                    url: "https://api.oneai.com/api/v0/pipeline",
                    headers: {
                        "api-key": apiKey,
                        "Content-Type": "application/json",
                    },

                    data: {

                        input: article,
                        input_type: "article",
                        output_type: "json",

                        multilingual: {
                            enabled: false
                        },

                        steps: [
                            {
                                skill: "headline"
                            },
                            {
                                skill: "article-topics"
                            },

                            {
                                skill: "summarize",
                                params: {
                                    "auto_length": true,
                                    "find_origins": true
                                }
                            }
                        ]
                    }
                };

            let
                summary,
                topics,
                heading;


            axios(config)
                .then(async (response) => {

                        const
                            output_1 = response.data.output[0],
                            output_2 = response.data.output[1];

                        const
                            labels = output_1.labels;

                        heading = labels[0].value;
                        summary = output_2.contents[0].utterance

                        let sources = "";

                        // Loop through labels and append all but the first one to topics
                        for (let i = 1; i < labels.length; i++) {
                            topics += `[#${labels[i].value}](https://duckduckgo.com/?q=${labels[i].value.replace(" ", "+")}) `;

                            topics = topics.replace("undefined", "");

                        }

                        for (let i = 0; i < source.length; i++) {
                            sources += `[Source ${i + 1}](${source[i]})`;
                            if (i < source.length - 1) sources += ", ";
                        }

                        const embed = new EmbedBuilder()
                            .setColor('#0099ff')
                            .setTitle(heading)
                            .setDescription(summary + "\n\n" + topics + "\n\n**Sources**: " + sources)
                            .setFooter({
                                text: `Requested by ${interaction.user.username}`,
                                iconURL: "https://cataas.com/cat?width=32&height=32"
                            });

                        await interaction.editReply({embeds: [embed]});
                        await interaction.editReply(":white_check_mark: Done!");

                    }
                )
                .catch(async (error) => {
                    console.log(error);
                    await interaction.editReply("Sorry, something went wrong. Please try again later");
                });

        }).catch(async (error) => {
            console.log(error);
            await interaction.editReply("Sorry, something went wrong. Please try again later");
        });

    }
};


