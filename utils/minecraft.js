exports.replaceColor = message => {
    return message
        .replace(/§3/g, '')
        .replace(/§r/g, '')
        .replace(/§e/g, '')
        .replace(/§a/g, '')
        .replace(/§6/g, '')
        .replace(/§f/g, '')
        .replace(/§n/g, '')
        .replace(/§7/g, '')
        .replace(/§4/g, '')
        .replace(/§2/g, '');
};

exports.getPlayersAsString = players => {
    if (typeof players === 'undefined') {
        return null;
    } else {
        let onlinePlayers = [];

        for (var i = 0; i < players.length; i++) {
            onlinePlayers.push(players[i].name);
        }

        return onlinePlayers.sort().join(', ');
    }
};

exports.getIconFromFavicon = favicon => {
    try {
        favicon = favicon.slice(22);
        return Buffer.from(favicon, 'base64');
    } catch (error) {
        return null;
    }
};