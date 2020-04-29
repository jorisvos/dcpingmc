const Discord = require('discord.js');
const fs = require('fs');

let settings;
let embedColor;

exports.init = (client, settingsFile) => {
    settings = settingsFile;
    embedColor = ("0x" + settings.embedColor);

    // Command Handlers
    fs.readdir("./commands/", (err, files) => {
        if (err)
            return console.error(err);

        console.log('\nLoading commands:');
        files.forEach(file => {
            if (!file.endsWith(".js"))
                return;

            let props = require(`../commands/${file}`);
            console.log(" - Successfully loaded command file: " + file);

            let commandName = file.split(".")[0];
            client.commands.set(commandName, props);
        });
    });

    // Event Handlers
    fs.readdir('./events/', (err, files) => {
        if (err)
            return console.error(err);

        console.log('\nLoading events:');
        files.forEach(file => {
            let eventFunc = require(`../events/${file}`);
            console.log(" - Successfully loaded event file: " + file);

            let eventName = file.split(".")[0];
            client.on(eventName, (...args) => eventFunc.run(client, settings, ...args));
        });
    });

    // Interval Handlers
    fs.readdir("./interval/", (err, files) => {
        if (err)
            return console.error(err);

        console.log('\nLoading intervals:');
        files.forEach(file => {
            if (!file.endsWith(".js"))
                return;

            let props = require(`../interval/${file}`);
            console.log(" - Successfully loaded interval file: " + file);

            let intervalName = file.split(".")[0];
            client.interval.set(intervalName, props);
        });
    });
};

exports.enableIntervals = (settings, client) => {
    const pingFrequency = (settings.interval * 1000);
    const channel = client.channels.cache.find(c => c.id === settings.statusChannelID);

    client.setInterval(() => {
        client.interval.forEach(file => file.run(settings, client, channel));
    }, pingFrequency);
};

exports.logChannels = client => {
    client.channels.cache.forEach(channel => console.log(channel.id + ' - ' + channel.name));
    console.log();
};

exports.clearChannel = channel => {
    channel.messages.fetch({ limit: 100 }).then(messages => {
        messages.forEach(message => message.delete().catch(console.error));
    }).catch((err) => {
        console.error(err);
    });
};

exports.getChannelMessageCount = channel => {
    channel.messages.fetch({ limit: 100 }).then(messages => {
        return messages.length;
    }).catch((err) => {
        console.error(err);
    });
};

exports.getLastMessageFromChannel = async (channel) => {
    return await channel.messages.fetch({ limit: 1 }).then(messages => {
        return messages.first();
    }).catch((err) => {
        console.error(err);
    });
};

exports.getStatusMessage = (playerCount, playerList, serverDescription, serverVersion, icon) => {
    const responseMessage = new Discord.MessageEmbed()
        .setColor(embedColor)
        .setTitle(playerCount)
        .setDescription(playerList)
        .addField(serverDescription, serverVersion)
        .setTimestamp();

    if (icon !== null) {
        responseMessage
            .attachFiles([{ attachment: icon, name: 'icon.png' }])
            .setAuthor(settings.serverName, 'attachment://icon.png')
            .setFooter(settings.serverIp, 'attachment://icon.png');
    } else {
        responseMessage
            .setAuthor(settings.serverName)
            .setFooter(settings.serverIp);
    }

    return responseMessage;
};

exports.getEmbeddedMessage = (title, description) => {
    return new Discord.MessageEmbed()
        .setTitle(title)
        .setColor(embedColor)
        .setDescription(description);
};

exports.editLastMessageFromChannel = (channel, message) => {
    getLastMessageFromChannel(channel).then(msg => msg.edit(message));
};