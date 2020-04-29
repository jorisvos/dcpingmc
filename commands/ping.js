exports.run = async (settings, client, message, args) => {
    message.channel.send('Pinging...')
        .then((msg) => {
            msg.edit('Ping: ' + (Date.now() - msg.createdTimestamp));
        });
};
