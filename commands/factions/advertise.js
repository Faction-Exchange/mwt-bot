const {
    SlashCommandBuilder,
    Events,
    ModalBuilder,
    TextInputBuilder,
    TextInputStyle,
    ActionRowBuilder,
    Client
} = require("discord.js");

module.exports = {

    data: new SlashCommandBuilder()
        .setName("advertise")
        .setDescription("Advertise your faction"),

    async execute(interaction) {


        const
            modal = new ModalBuilder()
                .setCustomId('factionAdvert')
                .setTitle('Advertise your faction!'),

            factionNameInput = new TextInputBuilder()
                .setCustomId('factionNameInput')
                .setLabel("Faction Name")
                .setStyle(TextInputStyle.Short),

            factionDescriptionInput = new TextInputBuilder()
                .setCustomId('factionDescriptionInput')
                .setLabel("Faction Description")
                .setStyle(TextInputStyle.Paragraph),

            factionInviteInput = new TextInputBuilder()
                .setCustomId('factionInviteInput')
                .setLabel("Faction Invite (Discord invite link)")
                .setStyle(TextInputStyle.Short),

            factionLogoInput = new TextInputBuilder()
                .setCustomId('factionLogoInput')
                .setLabel("Faction Logo (URL)")
                .setStyle(TextInputStyle.Short);


        const
            firstActionRow = new ActionRowBuilder().addComponents(factionNameInput),
            secondActionRow = new ActionRowBuilder().addComponents(factionDescriptionInput),
            thirdActionRow = new ActionRowBuilder().addComponents(factionInviteInput),
            fourthActionRow = new ActionRowBuilder().addComponents(factionLogoInput);


        // Add inputs to the modal
        modal.addComponents(firstActionRow, secondActionRow, thirdActionRow, fourthActionRow);

        // Show the modal to the user
        await interaction.showModal(modal);

    }
}

