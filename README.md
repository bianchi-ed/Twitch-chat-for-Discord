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
	"twitchUserToken" : "User token for twitch IRC connection",
	"targetChannel" : "Twitch channel name",
	"discordChannel" : "discord channel ID that will be used to receive twitch chat messages"
}
```
[token](https://twitchapps.com/tmi/)
[clientId](https://twitchapps.com/tmi/)

[guildId](https://twitchapps.com/tmi/) -> Discord server ID. You can get this ID by right clicking your discord server name and click "Copy Server ID":
https://imgur.com/a/vSkt1Ul

[twitchUserToken](https://twitchapps.com/tmi/) -> Acess, log in and get your token. It looks like "oauth:xXxXXx"
[targetChannel](https://twitchapps.com/tmi/) -> Target twitch channel name
[discordChannel](https://twitchapps.com/tmi/) -> Discord channel ID that will receive the IRC twitch channel messages. 

### 3. Run project

```bash
#Run the command on project's root folder

$ node index.js
```


### 4.
