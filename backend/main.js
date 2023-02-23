// get all from shares.js
const {Client, Events, GatewayIntentBits, report, fs, Collection} = require('./shared.js');
const
    token = process.env.token,
    client = new Client({intents: [GatewayIntentBits.Guilds]});


client.on(Events.InteractionCreate, async interaction => {
    if (!interaction.isCommand()) return;

    const command = client.commands.get(interaction.commandName);

    if (!command) return;

    try {
        await command.execute(interaction);
    } catch (error) {
        console.error(error);
        await interaction.reply({content: 'There was an error while executing this command!', ephemeral: true});
    }
});


/*
    ====================================================================================================================
    COMMAND HANDLER /// COMMAND HANDLER /// COMMAND HANDLER /// COMMAND HANDLER /// COMMAND HANDLER /// COMMAND HANDLER
    ====================================================================================================================
*/

// Command Location: ../commands/
// There are subfolders for each category

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

// Log in to Discord with your client's token
client.login(token).then(r =>
    report.log('Logged in!')
).catch(e =>
    report.error('Failed to log in!', e)
);

client.once(Events.ClientReady, c => {
    report.log(`Ready! Logged in as ${c.user.tag}`);
    report.log("Loading commands...");

    // Loop through all subfolders in commands
    // and load all commands

    const categories = fs.readdirSync('../commands/');
    for (const category of categories) {
        load_commands(category);
    }
});