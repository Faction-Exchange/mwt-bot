const {SlashCommandBuilder, EmbedBuilder, PermissionsBitField} = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("announce")
        .setDescription("Announce something to the server")
        .addStringOption(option =>
            option.setName("message")
                .setDescription("The message to announce")
                .setRequired(true)
        )

        .addStringOption(option =>
            option.setName("title")
                .setDescription("The title of the announcement")
                .setRequired(true)
        )

        .addChannelOption(
            option => option.setName("channel")
                .setDescription("The channel to announce in")
                .setRequired(true)
        ),

    async execute(interaction) {

        const
            data = [
                interaction.options.getString('message'),
                interaction.options.getChannel('channel'),
                interaction.user,
                interaction.options.getString('title')
            ],
            userAvatar = interaction.user.avatarURL({format: "png", dynamic: true, size: 1024}),
            userPermissions = new PermissionsBitField(interaction.member.permissions.bitfield);

        if (!userPermissions.has(PermissionsBitField.Flags.Administrator)) {
            await interaction.reply({content: "You do not have permission to use this command!", ephemeral: true});
            return;
        }

        if (data[1].type !== 0) {
            await interaction.reply({content: "That is not a text channel!", ephemeral: true});
            return;
        }

        const embed = new EmbedBuilder()
            .setColor('#0099ff')
            .setTitle(data[3])
            .setDescription(data[0])
            .setFooter({
                text: "Announced by " + interaction.user.tag,
                iconURL: userAvatar
            });

        await data[1].send({embeds: [embed]});

        await interaction.reply({content: "Announcement sent!", ephemeral: true});

    }
}