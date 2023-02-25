const {SlashCommandBuilder, EmbedBuilder, PermissionsBitField} = require("discord.js");
const {PunishmentLog} = require("../../backend/shared");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("warn")
        .setDescription("Warn a user in the server")
        .addUserOption(option =>
            option.setName("user")
                .setDescription("The user to warn")
                .setRequired(true)
        )
        .addStringOption(option =>
            option.setName("reason")
                .setDescription("The reason for the warning")
                .setRequired(true)
        ),

    async execute(interaction) {

        const data = [
            "warn",
            interaction.options.getUser('user'),
            interaction.options.getString('reason'),
            interaction.user
        ];

        const userPermissions = new PermissionsBitField(interaction.member.permissions.bitfield);

        if (!userPermissions.has(PermissionsBitField.Flags.KickMembers)) {
            await interaction.reply({content: "You do not have permission to use this command!", ephemeral: true});
            return;
        }

        const embed = new EmbedBuilder()
            .setColor('#0099ff')
            .setTitle(`You have been warned in ${interaction.guild.name}`)
            .setDescription(`**REASON:** ${data[2]}`)
            .setFooter({
                text: "Warned by " + interaction.user.tag,
                iconURL: interaction.user.avatarURL({format: "png", dynamic: true, size: 1024})
            });

        await data[1].send({embeds: [embed]});
        await interaction.reply({content: `Warned ${data[1].tag} for ${data[2]}`, ephemeral: true});

        PunishmentLog.addPunishmentLog(data[0], data[1], data[2], data[3]);

    }
}