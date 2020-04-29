exports.run = async (client, settings, message) => {
    if (message.author.bot)
        return;

    if (message.content.startsWith(settings.commandPrefix)) {
        let messageArray = message.content.split(' ');
        let cmd = messageArray[0].toLowerCase();
        let args = messageArray.slice(1);

        let commandFile = client.commands.get(cmd.slice(settings.commandPrefix.length));
        if (!commandFile) {
            console.log(message.member.user.tag + ' tried to run command: ' + cmd + '. However this command does not exist!');
            message.delete().catch(console.error);
            return;
        }

        console.log(message.member.user.tag + ' ran command: ' + cmd);
        commandFile.run(settings, client, message, args);
        message.delete().catch(console.error);
    }
}
