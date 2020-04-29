exports.run = async (settings, client, message, args) => {
    // Send a message to the user saying its getting the server status
    message.channel.send('Getting server status...')
        // Replace the message with the actual status if the status is retrieved.
        .then(msg => client.utils.get('mcpingUtil').run(settings, client, msg));
};
