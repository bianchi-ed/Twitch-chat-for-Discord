const { Client: TwitchClient } = require('@twitchapis/twitch.js');
const { Client, Collection, GatewayIntentBits } = require('discord.js');
const { token, targetChannel, twitchUserToken, discordChannel } = require('./config.json');
const fs = require('node:fs');
const path = require('node:path');

// Instance discord.js client
const discordClient = new Client({ intents: [GatewayIntentBits.Guilds] });

discordClient.commands = new Collection();

// Load Discord.js commands from commands folder
const loadCommands = (folderPath) => {
  const commandFolders = fs.readdirSync(folderPath);
  for (const folder of commandFolders) {
    const commandsPath = path.join(folderPath, folder);
    const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
    for (const file of commandFiles) {
      const filePath = path.join(commandsPath, file);
      const command = require(filePath);
      if ('data' in command && 'execute' in command) {
        discordClient.commands.set(command.data.name, command);
      } else {
        console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
      }
    }
  }
};

// Load Discord.js events from events folder
const loadEvents = (folderPath) => {
  const eventFiles = fs.readdirSync(folderPath).filter(file => file.endsWith('.js'));
  for (const file of eventFiles) {
    const filePath = path.join(folderPath, file);
    const event = require(filePath);
    if (event.once) {
      discordClient.once(event.name, (...args) => event.execute(...args, discordClient));
    } else {
      discordClient.on(event.name, (...args) => event.execute(...args, discordClient));
    }
  }
};

// Instance twitch.js client
const twitchJsClient = new TwitchClient({
    channels: [targetChannel],
});
  
// Twitch.js ready event
twitchJsClient.on('ready', () => {
  console.log(`Twitch.js: Logged in as ${twitchJsClient.user.name}!`);
});

// Twitch.js message event
twitchJsClient.on('message', async (msg) => {

  // Keep alive
  if (msg.content === 'ping') {
    msg.channel.send('pong');
  }

  // Log the message to terminal
  console.log(msg.author.displayName + ": " + msg.content);

  //Send twitch chat message to discord channel
  const channel = discordClient.channels.cache.get(discordChannel);
  channel.send(msg.author.displayName + ": " + msg.content)
});

// Discord.js login and load commands/events
(async () => {
    try {
      //load discord.js commands and events
      loadCommands(path.join(__dirname, 'commands'));
      loadEvents(path.join(__dirname, 'events'));
      
      //connect to twitch channel and discord server
      await discordClient.login(token);
      await twitchJsClient.login(twitchUserToken);
  
    } catch (error) {
      console.error('Discord.js: An error occurred:', error);
    }
})();

// Export clients
module.exports = { discordClient, twitchJsClient };