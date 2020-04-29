const Discord = require('discord.js');

exports.run = async (settings, client, message, args) => {
    await message.channel.send(client.utils.get('discordUtil').getEmbeddedMessage('Commands', '' +
        '**/help** - Show this help menu\n'+
        '**/status** - Show the current status and player count of KoekoekCraft\n'+
        '**/crash** - Restart the bot\n'+
        '**/ping** - Ping the bot'));
};
