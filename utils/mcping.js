const mcping = require('mc-ping-updated');
const Discord = require('discord.js');

exports.run = async (settings, client, message) => {
    mcping(settings.serverIp, settings.serverPort, (err, res) => {
        if (err) {
            // If an error occurs, log the error to the server
            console.error(err);
        } else {
            // Declare used variables
            let playerList, playerCount,
                serverVersion, serverDescription,
                icon, activityStatus;

            // Get icon or null
            icon = client.utils.get('minecraftUtil').getIconFromFavicon(res.favicon);

            activityStatus = res.players.online + '/' + res.players.max + ' player(s) online!';
            playerCount = '**' + res.players.online + '/' + res.players.max + '** player(s) online!';
            serverVersion = 'Server version: ' + res.version.name;
            serverDescription = 'Description: ' + client.utils.get('minecraftUtil').replaceColor(res.description.text);

            // Get player list
            playerList = client.utils.get('minecraftUtil').getPlayersAsString(res.players.sample);
            if (playerList === null)
                playerList = 'No players online...';
            else
                playerList = 'Players: ' + playerList;

            const responseMessage = client.utils.get('discordUtil').getStatusMessage(playerCount, playerList, serverDescription, serverVersion, icon);
            client.user.setActivity(activityStatus, { type: 'PLAYING' });

            if (typeof message.channel === 'undefined') {
                client.utils.get('discordUtil').getLastMessageFromChannel(message).then(msg => msg.edit(responseMessage));
            } else if (typeof message.channel !== 'undefined') {
                message.delete().catch(console.error);
                message.channel.send(responseMessage);
            }
        }
    }, 3000);
};