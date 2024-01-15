THIS IS A WORK IN PROGRESS


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
[token](https://i.imgur.com/grBBTIy.png) -> You can get your bot token by entering the specific discord application and navigating to the "Bot" tab. 

[clientId](https://i.imgur.com/u67WoGq.png) -> You can get your bot token by entering the specific discord application and navigating to the "General information" tab. 

[guildId](https://i.imgur.com/qKGsMnX.mp4) -> Discord server ID. You can get this ID by right clicking your discord server name and click "Copy Server ID".

[twitchUserToken](https://twitchapps.com/tmi/) -> Acess, log in and get your token. It looks like "oauth:xXxXXx"

[targetChannel](https://i.imgur.com/UjIKXM1) -> Target twitch channel name

[discordChannel](https://i.imgur.com/6fSVSN1.mp4) -> Discord server channel ID. You can get this ID by right clicking your desired channel name and click "Copy Channel ID".

### 3. Run project

```bash
#Run the command on project's root folder

$ node index.js
```


### 4.
