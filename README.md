# dcpingmc
A [Discord.js](https://discord.js.org/#/) bot that pings the specified [Minecraft](https://www.minecraft.net/nl-nl/about-minecraft) server and gives status updates every **n** seconds.

This bot was made for [Koekoekcraft](http://koekoekcraft.apexmc.co/), since we needed one. You can join the [Discord](https://discord.gg/Ec8bndS) server and ofcourse also the Minecraft server. Minecraft ip is: koekoekcraft.apexmc.co

<div align="center">
  <p>
    <a href="https://discord.gg/Ec8bndS"><img src="https://discordapp.com/api/guilds/702634448365289524/embed.png" alt="Discord server" /></a>
    <a href="https://github.com/jorisvos/dcpingmc/blob/master/LICENSE"><img src="https://img.shields.io/badge/dynamic/json?color=blue&label=License&query=%24.license.spdx_id&url=https%3A%2F%2Fapi.github.com%2Frepos%2Fjorisvos%2Fdcpingmc%2Flicense" alt="License" /></a>
    <img src="https://img.shields.io/badge/Open%20Source-%E2%9D%A4%EF%B8%8F-success" alr="Open Source Love" />
    <img src="https://img.shields.io/badge/Ask%20me-anything-1abc9c" alt="Ask me anything" />
    <img src="https://img.shields.io/badge/Maintained%3F-yes-green" alt="Maintained? yes" />
  </p>
</div>

# Commands
- `/help` - Shows a help message with all available commands
- `/status` - Manually get the status of the server (playercount, playerlist, description, version, etc)
- `/crash` - Restarts the bot (if run as a service or in a while loop) (essentialy stops the process)
- `/ping` - Pings the bot

# Setup
You need [Node.js](https://nodejs.org/en/) to run this bot. You can download it from [here](https://nodejs.org/en/download/).
- Open a terminal (CMD) in the root dcpingmc folder (where the indes.js is located) and run `npm install` to install the required packages
- You are now ready to run the bot.

Before you run the bot tho, you first have to edit the `config.json`. In this file you specify which server you want information from, as well as information needed by the bot. In the `config.json` file edit the following:
- `botToken` - you get this from the [Developer Portal](https://discordapp.com/developers/applications) of Discord.
- `commandPrefix` - default is `/`, this is a prefix to the command. If this is set to `!` you have to do `!help` instead of `/help`
- `serverName` - this is the name of the minecraft server, e.g. `My Minecraft Server`. This is used in for example status messages.
- `serverIp` - this is the server ip used to connect to the server, e.g. `play.myminecraftserver.com`
- `serverPort` - this is the server port, default is `25565`
- `interval` - default is `30`. This is the interval in secconds a status update should be send to the statusChannel.
- `embedColor` - default is `#0099FF`. This is the color to use in status messages.
- `statusChannelID` - this is the channel id of the channel where the bot should send a status update every **interval** seconds. (all channel names with their id's are shown when running the bot).

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
- `WorkingDirectory` - This should be the folder containing the `index.js` file, e.g. `/root/dcpingmc`
- `ExecStart` - Here you only change the second bit. This should be your working direcotyr + index.js, e.g. `/usr/bin/nodejs /root/dcpingmc/index.js`
4. Now execute the following commands and your bot is up and running (as a service)
- `sudo systemctl daemon-reload` - this reloads all .service files
- `sudo systemctl enable <your bot name>.service` - this enables your newly created service, now it'll start at boot
- `sudo systemctl start <your bot name>.service` - this starts the bot

### Other Operating Systems
Not yet, if you've done this. Please contact me so I can update this section!

# Used libraries
- [mc-ping-updated](https://www.npmjs.com/package/mc-ping-updated)
- [discord.js](https://www.npmjs.com/package/discord.js)

# License
MIT License

Copyright (c) 2020 Joris Vos

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
