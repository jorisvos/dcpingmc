exports.run = async (settings, client, channel) => {
    client.utils.get('mcpingUtil').run(settings, client, channel);
};