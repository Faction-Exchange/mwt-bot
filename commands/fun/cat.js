const {SlashCommandBuilder, EmbedBuilder} = require("discord.js");
const { request } = require('undici');
const profileModel = require("../../models/profileSchema");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("cat")
        .setDescription("Get a random cat image"),


    async execute(interaction) {

        const
            catResult = await request('https://aws.random.cat/meow'),
            { file } = await catResult.body.json(),
            profileData = await profileModel.findOne({userID: interaction.user.id});

        // Check if the user has enough currency
        if (profileData.currency < 2500) return interaction.reply({
            content: "You don't have enough money to buy a cat picture, you need at least $2,500. Use /work to earn money",
        });

        else {
            await profileModel.findOneAndUpdate({
                userID: interaction.user.id
            }, {
                $inc: {
                    currency: -2500
                }
            });
        }


        const embed = new EmbedBuilder()
            .setColor('#0099ff')
            .setTitle(`Random Cat`)
            .setImage(`${file}`)
            .setFooter({
                text: "Powered by https://aws.random.cat/",
                iconURL: "https://cataas.com/cat?width=32&height=32"
            });

        await interaction.reply({embeds: [embed]});
    }
}