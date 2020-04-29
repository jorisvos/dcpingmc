const Discord = require('discord.js');
const settings = require('./config.json');
const client = new Discord.Client();
const fs = require('fs');

// Initialize discord commands, events, aliases
client.commands = new Discord.Collection();
client.events = new Discord.Collection();
client.interval = new Discord.Collection();
client.utils = new Discord.Collection();

// Init
const init = (() => {
    // Utils
    fs.readdir("./utils/", (err, files) => {
        if (err)
            return console.error(err);

        console.log('Loading utils:');
        files.forEach(file => {
            if (!file.endsWith(".js"))
                return;

            let props = require(`./utils/${file}`);
            console.log(" - Successfully loaded util file: " + file);

            let utilName = file.split(".")[0] + 'Util';
            client.utils.set(utilName, props);
        });
    });
})();

// Startup
client.on("ready", () => {
    // Init commands, events, intervals
    client.utils.get('discordUtil').init(client, settings);

    console.log("\nDCPingMC is Ready!\n");

    client.utils.get('discordUtil').logChannels(client);
    client.utils.get('discordUtil').enableIntervals(settings, client);
});

// Login
client.login(settings.botToken).then(() => console.log('\nLogged in!'));