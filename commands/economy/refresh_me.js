const mongoose = require('mongoose');
const {SlashCommandBuilder} = require("discord.js");

module.exports = {

    data: new SlashCommandBuilder()
        .setName('refresh_me')
        .setDescription('Refreshes your profile in the database.'),
    async execute(interaction) {

        const profileModel = require('../../models/profileSchema');
        module.exports = async (client, Discord, member) => {
            let profile = await profileModel.create({
                userID: member.id,
                coins: 1250,
                bank: 0,
                pocket: 1250
            });

            await profile.save();

            console.log("Profile created for " + member.user.tag);

        }

        await interaction.reply({content: 'Your profile has been refreshed!', ephemeral: true});

    }
}