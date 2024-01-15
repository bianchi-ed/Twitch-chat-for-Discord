## Intro

This project uses Node.js alongside two libraries, being discord.js and twitch.js. Its purpose is to establish a connection between a Twitch chat channel and a Discord server. Through the integration of these libraries, users can monitor a Twitch chat directly within their Discord server, consolidating Twitch chat interactions within the familiar environment of Discord.

Future developments will explore the Twitch API, aiming to incorporating features. The primary goal is to create an interface on Discord that facilitates direct communication with Twitch chat and interactions with the Twitch API, integrating these elements into the Discord server environment.

## How to use

### 1. Clone project and install modules

```bash
#Run the command on project's root folder

$ npm install
```

### 2. Configure config.json

Create a file named config.json on the root folder and populate with the following information:

```json
{	
	"token": "Your discord bot token goes here",
	"clientId": "Your discord application ID goes here",
	"guildId": "This is your Discord server ID",
	"twitchUserToken": "User token for twitch IRC connection",
	"targetChannel": "Twitch channel name",
	"discordChannel": "discord channel ID that will be used to receive twitch chat messages"
}
```

**These are necessary for the discord.js application:**


[token](https://i.imgur.com/grBBTIy.png): You can obtain your bot token by navigating to the "Bot" tab in your Discord application settings. 

[clientId](https://i.imgur.com/u67WoGq.png): Find your Discord application ID in the "General Information" tab of your Discord application settings. 

[guildId](https://i.imgur.com/qKGsMnX.mp4): Copy your Discord server ID by right-clicking on your server name and selecting "Copy Server ID."

[discordChannel](https://i.imgur.com/6fSVSN1.mp4): Provide the Discord server channel ID by right-clicking on your desired channel name and selecting "Copy Channel ID."


**These are necessary for the twitch.js application:**


[twitchUserToken](https://twitchapps.com/tmi/): Get your Twitch user token by logging in here. It should look like "oauth:xXxXXx."

[targetChannel](https://i.imgur.com/UjIKXM1): Specify the target Twitch channel name.


### 3. Run

```bash
#Run the command on project's root folder

$ node index.js
```

If everything goes as expected you should be receiving the text from the twitch chat on target discord channel:

![image](https://github.com/bianchi-ed/Twitch-chat-for-Discord/assets/134458207/04d5dd92-9a5f-4af3-960f-a395ca0b8a05)

