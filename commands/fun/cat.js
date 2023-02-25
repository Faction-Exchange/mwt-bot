const {SlashCommandBuilder, EmbedBuilder, PermissionsBitField} = require("discord.js");
const https = require('https');


module.exports = {
    data: new SlashCommandBuilder()
        .setName("cat")
        .setDescription("Get a random cat image")
        .addStringOption(option =>
            option.setName("message")
                .setDescription("The message to announce")
                .setRequired(false)
        ),


    async execute(interaction) {

        const message = interaction.options.getString('message') || "";
        
        const embed = new EmbedBuilder()
            .setColor('#0099ff')
            .setTitle("Random cat")
            .setImage("https://cataas.com/cat?width=512&height=512&text=" + message)
            .setFooter({
                text: "Powered by cataas.com",
                iconURL: "https://cataas.com/cat?width=32&height=32"
            });

        await interaction.reply({embeds: [embed]});
    }
}