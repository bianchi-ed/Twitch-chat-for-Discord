//Imports
const { Client, Collection, GatewayIntentBits } = require('discord.js');
const { token } = require('./config.json');
const twitchJsClient = require('./twitchIRC/twitch.js');
const fs = require('node:fs');
const path = require('node:path');


// Instance Discord BOT
const client = new Client({ intents: [GatewayIntentBits.Guilds] })
client.commands = new Collection()

// Load Discord.js commands from commands folder
const loadCommands = (folderPath) => {
	const commandFolders = fs.readdirSync(folderPath)
  	for (const folder of commandFolders) {
    	const commandsPath = path.join(folderPath, folder)
    	const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'))
    	for (const file of commandFiles) {
      		const filePath = path.join(commandsPath, file)
      		const command = require(filePath)

      		if ('data' in command && 'execute' in command){
        		client.commands.set(command.data.name, command)
      		} else {
       			console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`)
      		}
    	}
  	}
};

// Load Discord.js events from events folder
const loadEvents = (folderPath) => {
	const eventFiles = fs.readdirSync(folderPath).filter(file => file.endsWith('.js'))
	for (const file of eventFiles) {
    	const filePath = path.join(folderPath, file)
    	const event = require(filePath)
    	if (event.once) {
      		client.once(event.name, (...args) => event.execute(...args, client))
    	} else {
      		client.on(event.name, (...args) => event.execute(...args, client))
    	}
  	}
};

// Try loading commands, events and connect discord bot to the server
(async () => {
	try {
		loadCommands(path.join(__dirname, 'commands'));
		loadEvents(path.join(__dirname, 'events'));
		await client.login(token);
	} catch (error) {
		console.error('An error occurred:', error);
	}
})();