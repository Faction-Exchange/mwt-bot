const {SlashCommandBuilder, EmbedBuilder, PermissionsBitField} = require("discord.js");

module.exports = {

    data: new SlashCommandBuilder()
        .setName("purge")
        .setDescription("Purge a number of messages from a channel")
        .addIntegerOption(option =>
            option.setName("amount")
                .setDescription("The number of messages to purge")
                .setRequired(true)
        ),

    async execute(interaction) {

        const userPermissions = new PermissionsBitField(interaction.member.permissions.bitfield);


        if (!userPermissions.has(PermissionsBitField.Flags.KickMembers)) {
            await interaction.reply({content: "You do not have permission to use this command!", ephemeral: true});
            return;
        }

        const amount = interaction.options.getInteger('amount');

        if (amount > 99) {
            const embed = new EmbedBuilder()
                .setColor('#0099ff')
                .setTitle(`You cannot purge more than 99 messages at a time due to Discord API limitations`)
                .setFooter({
                    text: "Purged by " + interaction.user.tag,
                    iconURL: interaction.user.avatarURL({format: "png", dynamic: true, size: 1024})
                });

            await interaction.reply({embeds: [embed]});
            return;
        }

        if (interaction.channel.id === "1078460956276961331") {

            const embed = new EmbedBuilder()
                .setColor('#0099ff')
                .setTitle(`This is a protected channel, you cannot purge messages here!`)
                .setFooter({
                    text: "Purged by " + interaction.user.tag,
                    iconURL: interaction.user.avatarURL({format: "png", dynamic: true, size: 1024})
                });

            await interaction.reply({embeds: [embed]});
            return;

        }


        await interaction.channel.bulkDelete(amount + 1, true);
        await interaction.reply({content: `Successfully purged ${amount} messages!`, ephemeral: true});
    }
}