const {SlashCommandBuilder, EmbedBuilder, PermissionsBitField} = require("discord.js");
const {PunishmentLog} = require("../../backend/shared");

module.exports = {

    data: new SlashCommandBuilder()
        .setName("mute")
        .setDescription("Mute a user in the server")
        .addUserOption(option =>
            option.setName("user")
                .setDescription("The user to mute")
                .setRequired(true)
        )
        .addStringOption(option =>
            option.setName("reason")
                .setDescription("The reason for the mute")
                .setRequired(true)
        )
        .addStringOption(option =>
            option.setName("duration")
                .setDescription("The duration of the mute")
                .setRequired(true)
                .addChoices(
                    {name: "1 minute", value: "1"},
                    {name: "5 minutes", value: "5"},
                    {name: "10 minutes", value: "10"},
                    {name: "1 hour", value: "60"},
                    {name: "1 day", value: "1440"},
                    {name: "1 week", value: "10080"}
                )
        ),

    async execute(interaction) {

        let data = [
            interaction.options.getUser('user'),
            interaction.options.getString('reason'),
            interaction.options.getString('duration'),
            interaction.user
        ];

        data[2] = parseInt(data[2]) * 60000;
        const guildMember = await interaction.guild.members.fetch(data[0].id);

        const userPermissions = new PermissionsBitField(interaction.member.permissions.bitfield);

        if (!userPermissions.has(PermissionsBitField.Flags.KickMembers)) {
            await interaction.reply({content: "You do not have permission to use this command!", ephemeral: true});
            return;
        }

        const embed = new EmbedBuilder()
            .setColor('#0099ff')
            .setTitle(`You have been muted in ${interaction.guild.name}`)
            .setDescription(`**REASON:** ${data[1]}`)
            .setFooter({
                text: "Muted by " + interaction.user.tag,
                iconURL: interaction.user.avatarURL({format: "png", dynamic: true, size: 1024})
            });

        await data[0].send({embeds: [embed]});

        await guildMember.timeout(data[2], {reason: data[1]});
        await interaction.reply({content: `Muted ${data[0].tag} for ${data[1]}`, ephemeral: true});

        PunishmentLog.addPunishmentLog("mute", data[0], data[3], data[1], data[2]);
    }
}