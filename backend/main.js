require('dotenv').config();

// get all from shares.js
const
    {Client, Events, GatewayIntentBits, report, fs, Collection} = require('./shared.js'),
    {EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle} = require("discord.js"),
    token = process.env.TOKEN,
    client = new Client({
        intents: Object.values(GatewayIntentBits).reduce((a, b) => a | b, 0),
    }),
    MSG_COOLDOWN = new Set();
    mongoose = require('mongoose');
let profileModel = require("../models/profileSchema.js");
const {request} = require("undici");



client.on(Events.InteractionCreate, async interaction => {

    let profileData;
    try {
        profileData = await profileModel.findOne({userID: interaction.user.id});
        if (!profileData) {
            let profile = await profileModel.create({
                userID: interaction.user.id,
                coins: 1250,
                bank: 0,
                pocket: 1250
            });
            await profile.save();
        }
    } catch (err) {
        console.log(err);
    }

    const
        user = await client.users.fetch(interaction.user.id),
        profilePicture = user.avatarURL({format: "png", dynamic: true, size: 1024});

    switch (interaction.type) {
        case 2:
            const command = client.commands.get(interaction.commandName);
            try {
                report.log(`Executing command ${interaction.commandName} for ${interaction.user.tag} (${interaction.user.id})`);
                await command.execute(interaction);
            } catch (error) {
                report.error(error);
                await interaction.reply({
                    content: `There was an error while executing this command! This incident has been reported. Error: \`\`\`${error.stack}\`\`\``,
                    ephemeral: false
                });
            }
            break;
        case 3:
            // if starts with join_
            if (interaction.customId.startsWith('join_')) {
                const invite = interaction.customId.split('_')[1];
                await interaction.reply({
                    content: `Invite: ${invite}`,
                    ephemeral: true
                });
            }
            if (interaction.customId === `slashcommand`) {
                await interaction.reply({content: 'https://cdn.discordapp.com/attachments/1079127860020772874/1092797554837684314/video-2023-031-16_17.54.39-4.mp4'});
                break;
            }

            break;
        case 5:
            if (interaction.customId === 'factionAdvert') {
                const
                    factionName = interaction.fields.getTextInputValue('factionNameInput'),
                    factionDescription = interaction.fields.getTextInputValue('factionDescriptionInput')

                let
                    factionInvite = interaction.fields.getTextInputValue('factionInviteInput');

                // Check if faction invite is a valid URL
                if (!factionInvite.startsWith('http')) {
                    factionInvite = `https://${factionInvite}`
                }

                let factionLogo;

                // get ../../data/config.json
                const config = require("../data/config.json");

                // check json
                if (config[interaction.user.id.toString()] === undefined) {
                    factionLogo = "https://cdn.discordapp.com/ephemeral-attachments/1079132532207013989/1079134986436890764/126355137.png";
                } else {
                    factionLogo = config[interaction.user.id.toString()];
                }

                const embed = new EmbedBuilder()
                    .setColor('#0099ff')
                    .setAuthor({
                        name: factionName,
                        iconURL: factionLogo
                    })
                    .setImage(factionLogo)
                    .setTitle(`${factionName}`)
                    .setDescription(factionDescription)
                    .setFooter({
                        text: `Submitted by ${user.tag}`,
                        iconURL: profilePicture
                    });

                // Add a button to the embed

                const row = new ActionRowBuilder()
                    .addComponents(
                        new ButtonBuilder()
                            .setCustomId(`join_${factionInvite}`)
                            .setLabel('Join | 0 so far')
                            .setStyle(ButtonStyle.Primary)
                    );

                // send in channel with id 1078745396450430976
                const channel = await client.channels.fetch('1078745396450430976');
                await channel.send({embeds: [embed], components: [row]});

                await interaction.reply({content: 'Your faction advert has been sent!', ephemeral: true});
                break;

            }
            break;
    }
});
// Command Location: ../commands/*

client.commands = new Collection();

function load_commands(category) {

    const
        directory = `../commands/${category}/`,
        files = fs.readdirSync(directory);

    for (const file of files) {
        report.log(`Loading command ${file}`);
        const
            command = require(`${directory}${file}`),
            command_name = file.split('.')[0];
        client.commands.set(command_name, command);
        report.log(`Loaded command ${file} as ${command_name}`);
    }

}

// Log in to Discord with env vars
client.login(token).then(r =>
    report.log(r)
).catch(e =>
    report.error('Failed to log in!', e)
);

client.once(Events.ClientReady, async c => {
    report.log(`Ready! Logged in as ${c.user.tag}`);

    report.log("Connecting to MongoDB...");
    mongoose.set("strictQuery", true);
    await mongoose.connect(process.env.MONGODB_SRC, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(() => {
        report.log('Connected to MongoDB!')
    })
        .catch((err) => {
            report.log('Failed to connect to MongoDB!')
            report.error(err)
        })

    // Loop through all subfolders in commands
    // and load all commands
    report.log("Loading commands...");
    const categories = fs.readdirSync('../commands/');
    for (const category of categories) {
        load_commands(category);
    }
});


client.on('guildMemberAdd', async member => {

    const
        catResult = await request('https://aws.random.cat/meow'),
        {file} = await catResult.body.json(),
        welcome_channel = member.guild.channels.cache.find(channel => channel.name === 'welcomes'),
        role = member.guild.roles.cache.find(role => role.name === 'Exchange Member'),
        memberCount = member.guild.memberCount,
        suffix = memberCount === 1 ? 'st' : memberCount === 2 ? 'nd' : memberCount === 3 ? 'rd' : 'th';

    let welcome_embed = new EmbedBuilder()
        .setTitle('Welcome!')
        .setDescription(`Welcome to the server, **<@${member.user.id}>!** You're the ${member.guild.memberCount}${suffix} member!
        
       
       **Here for an exclusive faction?**
       Check the Faction Exchange Exclusives category for a list of exclusive factions.
       <#1088530555190132766> • <#1088530612912144474> 
        `)
        .setImage(file)
        .setColor(0x00ff00)
        .setTimestamp();

    updateMemberCount(member)

    welcome_channel.send({embeds: [welcome_embed]});
    member.roles.add(role);


    // Economy

    const
        profileModel = require('../models/profileSchema');

    module.exports = async (client, Discord, member) => {
        let profile = await profileModel.create({
            userID: member.id,
            coins: 1250,
            bank: 0,
            pocket: 1250
        });

        await profile.save();

        report.log("Profile created for " + member.user.tag);
    }


});

client.on('guildMemberRemove', async member => {

    const
        catResult = await request('https://aws.random.cat/meow'),
        {file} = await catResult.body.json(),
        welcome_channel = member.guild.channels.cache.find(channel => channel.name === 'welcomes');

    let welcome_embed = new EmbedBuilder()
        .setTitle('Goodbye!')
        .setDescription(`Goodbye, **${member.user.tag}!**`)
        .setImage(file)
        .setColor(0xff0000)
        .setTimestamp();

    updateMemberCount(member)

    welcome_channel.send({embeds: [welcome_embed]});
});

client.on('messageCreate', async message => {

    if (message.author.bot) return;

    if (message.content.toLowerCase().startsWith('!')) {

        const
            embed = new EmbedBuilder()
                .setTitle('Faction Exchange Bot is better')
                .setDescription(
                    'Consider using the <@1078084068220092496> instead of UnbelievaBoat. It\'s open source and ' +
                    'has superior functionality. [Join Faction Exchange here](https://discord.gg/PZJTV3fsRq).'
                );
            // row = new ActionRowBuilder()
            //     .addComponents(
            //         new ButtonBuilder()
            //             .setCustomId(`join_https://discord.gg/PZJTV3fsRq`)
            //             .setLabel('Join Faction Exchange')
            //             .setStyle(ButtonStyle.Primary),
            //         new ButtonBuilder()
            //             .setCustomId(`slashcommands`)
            //             .setLabel('How to use slash commands')
            //             .setStyle(ButtonStyle.Primary)
            //     );


        // send message
        const channel = await message.channel.send({content: "Hi", embeds: [embed], components: [row]});
        await new Promise(resolve => setTimeout(resolve, 30000));
        channel.delete();

    }


    // if the user is on timeout
    if (message.author.id in MSG_COOLDOWN) return;
    // add user to timeout
    MSG_COOLDOWN[message.author.id] = true;

    // remove user from timeout after 30 seconds
    setTimeout(() => {
        delete MSG_COOLDOWN[message.author.id];
    }, 30000);

    const length = message.content.length;
    if (length < 20) return;

    const
        profileModel = require('../models/profileSchema.js'),
        currency = Math.floor(Math.random() * 100) + 1;

    await profileModel.findOneAndUpdate(
        {userID: message.author.id},
        {
            $inc: {currency: currency}
        }
    );
});

process.on('uncaughtException', function (error) {
    console.log(error.stack);
});

// Every minute

// setInterval(async () => {
//
//     if (new Date().getHours() === 0 && new Date().getMinutes() === 0) {
//         const users = await profileModel.find({});
//
//         for (const user of users) {
//             const
//                 newBank = user.userID === 729567972070391848 ? user.bank * 1.5 : user.bank * 1.01;
//             user.bank = Math.floor(newBank);
//             await user.save();
//         }
//
//         const
//             epoch = Math.floor(Date.now() / 1000),
//             tomorrow = epoch + 86400;
//
//         // Update embed on message with id 1090695819675578378
//         const
//             message = await client.channels.cache.get('1078776371557445682').messages.fetch('1090695819675578378'),
//             embed = new EmbedBuilder()
//                 .setTitle('Interest History')
//                 .setDescription(`**Last payout:** <t:${epoch}:R> | 1% interest paid out to active users\n**Next payout:** <t:${tomorrow}:R>`)
//                 .setColor(0x00ff00)
//                 .setTimestamp();
//
//         await message.edit({embeds: [embed]});
//     }
// }, /* minute */ 60000);