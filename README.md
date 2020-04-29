# dcpingmc
A [Discord.js](https://discord.js.org/#/) bot that pings the specified [Minecraft](https://www.minecraft.net/nl-nl/about-minecraft) server and gives status updates every **n** seconds.

# Setup
You need [Node.js](https://nodejs.org/en/) to run this bot. You can download it from[here](https://nodejs.org/en/download/).
- Open a terminal (CMD) in the root dcpingmc folder and run `npm install` to install the required packages
- You are now ready to run the bot.

Before you run the bot tho, you first have to edit the `config.json`. In this file you specify which server you want information from, as well as the bot token etc.
- The value of `botToken` should be equal to the token you get from the [Developer Portal](https://discordapp.com/developers/applications) of Discord.
- The value of `commandPrefix` should be the prefix you want your commands to have, default is `"/"`
- The value of `serverName` should be equal to the name of the server, e.g. `"My Minecraft Server"`
- The value of `serverIp` should be equal to the ip of your minecraft serverv, e.g. `"play.myminecraftserver.com"`
- The value of `serverPort` should be equal to the port of your minecraft server, default is `25565`
- The value of `interval` should be equal to the interval in seconds you want the bot to update the server status, default `30`
- The value of `embedColor` should be a hexadecimal number, this will set the color of embedded messages, default is `"#0099FF"`
- The value of `statusChannelID` should be the ID of the channel you want your status updates to be send in. You can get the ID's by running the bot and then stopping it (with Ctrl+C). It logs all the channel ID's to the console on start.

Now that you've edited the `config.json` you're ready to start the bot.
- Run `node index.js`

# Run as service
If you want your bot to run as a service, you can do the following:

### Ubuntu
1. Create a file in the following folder `/etc/systemd/system` named `<your bot name>.service`
2. Paste the following into the file you just created
```
[Unit]
Description=<Your bot name> Discord Bot
After=multi-user.target

[Service]
User=root
Group=root
WorkingDirectory=<the folder where the index.js is located>
ExecStart=/usr/bin/nodejs <your working directory followed by 'index.js'>
Type=idle
Restart=always
RestartSec=15

[Install]
WantedBy=multi-user.target
```
3. Now you have to change a few things in this file:
- `Description` - You can change this to whatever you want
- `WorkingDirectory` - This should be the folder containing the `index.js` file, e.g. `WorkingDirectory=/root/dcpingmc`
- `ExecStart` - Here you only change the second bit. This should be your working direcotyr + index.js, e.g. `ExecStart=/usr/bin/nodejs /root/dcpingmc/index.js`
4. Now execute the following commands and your bot is up and running (as a service)
- `sudo systemctl daemon-reload` - this reloads all .service files
- `sudo systemctl enable <your bot name>.service` - this enables your newly created service, now it'll start at boot
- `sudo systemctl start <your bot name>.service` - this starts the bot

### Other Operating Systems
Not yet, if you've done this. Please

# Commands
- `/help` - Shows a help message with all available commands
- `/status` - Manually get the status of the server (playercount, playerlist, description, version, etc)
- `/crash` - Restarts the bot (if run as a service or in a while loop) (essentialy stops the process)
- `/ping` - Pings the bot
