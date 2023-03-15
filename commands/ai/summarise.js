const {SlashCommandBuilder, EmbedBuilder} = require("discord.js");
const axios = require("axios"),
    apiKey = process.env.API_KEY;
require('dotenv').config();

console.log("API Key: " + apiKey)

module.exports = {
    data: new SlashCommandBuilder()
        .setName("summarise")
        .setDescription("Use our top class artificial intelligence to grab key points from a text prompt")
        .addStringOption(option =>
            option.setName("prompt")
                .setDescription("The text prompt to use")
                .setRequired(true)),

    async execute(interaction) {

        interaction.reply("Processing... This may take up to 5 seconds")

        // Edit this One AI API call using our studio at https://studio.oneai.com/?pipeline=ikntIl&share=true
        const
            article = interaction.options.getString("prompt"),
            config = {
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
                                "auto_length": false,
                                "find_origins": true,
                                "max_length": 100,
                                "min_length": 10,
                            }
                        }
                    ],
                },
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

                // Loop through labels and append all but the first one to topics
                for (let i = 1; i < labels.length; i++) {
                    topics += "#" + labels[i].value.toUpperCase() + " ";
                }


                const embed = new EmbedBuilder()
                    .setColor('#0099ff')
                    .setTitle(`AI Summary`)
                    .setDescription(`**HEADING**: ${heading}
**TOPICS**: ${topics.replace("undefined", "")}
**SUMMARY**: ${summary}`)
                    .setFooter({
                        text: `Requested by ${interaction.user.username}`,
                        iconURL: "https://cataas.com/cat?width=32&height=32"
                    });

                await interaction.editReply({embeds: [embed], contnet: "Ready!"})

            })
            .catch((error) => {
                console.log(error);
            });
    }
}
