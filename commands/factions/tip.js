const {SlashCommandBuilder, EmbedBuilder} = require("discord.js");


module.exports = {

    data: new SlashCommandBuilder()
        .setName('tip')
        .setDescription('Submit an anonymous tip regarding a faction.')

        .addStringOption(option =>
            option.setName('faction')
                .setDescription('Relevant factions.')
                .setRequired(true)
        )

        .addStringOption(option =>
            option.setName('tip')
                .setDescription('The tip you want to submit.')
                .setRequired(true)
        )

        .addAttachmentOption(option =>
            option.setName('attachment')
                .setDescription('An attachment to the tip.')
                .setRequired(false)
        )

        .addBooleanOption(
            option => option.setName('anonymous')
                .setDescription('Whether or not the tip should be anonymous. This is FALSE by default.')
                .setRequired(false)
        ),

    async execute(interaction) {
        const
            tip = interaction.options.getString('tip'),
            faction = interaction.options.getString('faction'),
            attachment = interaction.options.getAttachment('attachment' || null),
            anonymous = interaction.options.getBoolean('anonymous') || true,
            TIP_CASE = Math.floor(Math.random() * 10000).toString().padStart(4, '0');

        const embed = new EmbedBuilder()
            .setColor('#0099ff')
            .setTitle(`New tip for ${faction} | Case #${TIP_CASE}`)
            .setDescription(`${tip}`)
            .setImage(attachment ? attachment.url : null)
            .setFooter({
                text: `Submitted by ${anonymous ? "Anonymous" : interaction.user.tag}`,
                iconURL: anonymous ? null : interaction.user.avatarURL({format: "png", dynamic: true, size: 1024})
            })

        await interaction.reply({content: `Tip submitted! Case #${TIP_CASE} (keep this safe)`, ephemeral: true});
        await interaction.client.channels.cache.get('1089178584125554759').send({embeds: [embed]});

    }


}