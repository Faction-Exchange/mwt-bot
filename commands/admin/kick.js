const {Client, Events, GatewayIntentBits, report, fs, Collection} = require('../../backend/shared.js');
const {SlashCommandBuilder, EmbedBuilder, PermissionsBitField} = require("discord.js");
const {PunishmentLog} = require("../../backend/shared");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("kick")
        .setDescription("Kick a user")
        .addUserOption(option =>
            option.setName("user")
                .setDescription("The user to kick")
                .setRequired(true)
        )
        .addStringOption(option =>
            option.setName("reason")
                .setDescription("The reason for the kick")
                .setRequired(true)
        ),

    async execute(interaction) {

        const
            data = [
                interaction.options.getUser('user'),
                interaction.options.getString('reason'),
                interaction.user
            ],
            userAvatar = interaction.user.avatarURL({format: "png", dynamic: true, size: 1024}),
            userPermissions = new PermissionsBitField(interaction.member.permissions.bitfield);

        if (!userPermissions.has(PermissionsBitField.Flags.Administrator)) {
            await interaction.reply({content: "You do not have permission to use this command!", ephemeral: true});
            return;
        }

        const embed = new EmbedBuilder()
            .setColor('#0099ff')
            .setTitle(`You have been kicked from ${interaction.guild.name}`)
            .setDescription(`**REASON:** ${data[1]}`)
            .setFooter({
                text: "Kicked by " + interaction.user.tag,
                iconURL: userAvatar
            });

        await data[0].send({embeds: [embed]});

        await interaction.guild.members.kick(data[0], {reason: data[1]});
        await interaction.reply({content: `Kicked ${data[0].tag} for ${data[1]}`, ephemeral: true});

        PunishmentLog.addPunishmentLog("kick", data[0], data[1], data[2]);

    }
}