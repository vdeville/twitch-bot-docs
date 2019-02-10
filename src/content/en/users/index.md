---
title: "Users"
language: "en"
---

# Not a developer ? Not a problem !

If you are not familiar with code and PHP, you can use directly the bot without coding, lot of module are open source and easy to use and setup.

# Install the bot

## Linux

1. Download the latest relase on [Github](https://github.com/MyTheValentinus/twitch-bot/releases)

2. Extract in the folder of your choice

3. Launch `./setup.sh` to check the requirements and finally `./launch.sh`


## Docker
If you know Docker and you would like use it for the bot, you can install this bot using mapped volume.

`docker run -ti -v /home/valentin/Desktop/twitchbot-docker/twitchbot-1.4-0/:/bot mythevalentinus/twitchbot`

# Configure the base bot

There is one main configuration file for the bot, which is located in the root folder of the bot.
`config.json`:

````
{
  "twitch": {
    "user": "MySuperBot",
    "oauth": "oauth:",
    "irc_address": "irc.chat.twitch.tv",
    "port": "6667",
    "channels": "YourChannelName"
  },
  "general": {
    "command_prefix": "!",
    "connect_message": false
  }
}

````

| Param  	            | Description  |
|---		            |---|
| `user`                | Username of the bot  |
| `oauth`               | Twitch OAuth token (you can generate one on your account settings)  |
| `irc_address`         | IRC Server of Twitch (no changes required) |
| `channels `           | Where the bot is connected (1 channel max for moment)  |
| `command_prefix`      | Command symbol prefix for `onCommand()` hook  |
| `connect_message `    | OnConnect hook On/Off toggle |

# Configure modules
Each module has its own configuration files. For example the plugin "Commands" have two files : `commands.json` and `config.json` in his folder (`/modules/commands/`).
