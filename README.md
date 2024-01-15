Node.js project containing a single method to get Twitch's API Access Token.


## How to use

### 1. Clone project and install modules

```bash
#Run the command on project's root folder

$ npm install
```

### 2. Configure config.json

Create a file named config.json on the root folder and provide the following information:

```json
{	
	"token": "Your discord bot token goes here",
	"clientId": "Your discord application ID goes here",
	"guildId": "This is your Discord server ID",
	"twitchUserToken" : "User token for twitch IRC connection",
	"targetChannel" : "Twitch channel name",
	"discordChannel" : "discord server ID that will be used to receive twitch chat messages"
}
```


### 3. Run project

```bash
#Run the command on project's root folder

$ node index.js
```


### 4.
