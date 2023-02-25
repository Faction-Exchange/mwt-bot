const {
    SlashCommandBuilder,
} = require("discord.js");

const config = require("../../data/config.json");
const fs = require("fs");
const path = require("path");


module.exports = {
    data: new SlashCommandBuilder()
        .setName("set_logo")
        .setDescription("Set your faction logo")
        .addAttachmentOption(option =>
            option.setName("logo")
                .setDescription("The logo you want to set")
                .setRequired(true)
        ),

    async execute(interaction) {

        const 
            logo = interaction.options.getAttachment("logo"),
            json = config;
        json[interaction.user.id.toString()] = logo.url;


        fs.writeFileSync(path.join(__dirname, "../../data/config.json"), JSON.stringify(json, null, 4));

        await interaction.reply({
            content: `Logo set to ${logo.url}`,
            ephemeral: false
        });

    }
}