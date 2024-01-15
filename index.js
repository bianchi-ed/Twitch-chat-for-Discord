const { Client: TwitchClient } = require('@twitchapis/twitch.js');
const { Client, Collection, GatewayIntentBits } = require('discord.js');
const { token, targetChannel, twitchUserToken, discordChannel } = require('./config.json');
const fs = require('node:fs');
const path = require('node:path');

// Instance discord.js client
const discordClient = new Client({ intents: [GatewayIntentBits.Guilds] });

// Instance twitch.js client
const twitchJsClient = new TwitchClient({
  channels: [targetChannel],
});

discordClient.commands = new Collection();

const loadCommands = (folderPath) => {
  try {
    if (!fs.existsSync(folderPath)) {
      console.error(`[ERROR] Commands directory '${folderPath}' not found.`);
      return;
    }

    const commandFolders = fs.readdirSync(folderPath);
    for (const folder of commandFolders) {
      const commandsPath = path.join(folderPath, folder);

      if (!fs.existsSync(commandsPath) || !fs.lstatSync(commandsPath).isDirectory()) {
        console.error(`[ERROR] Commands subdirectory '${commandsPath}' not found.`);
        continue;
      }

      const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
      for (const file of commandFiles) {
        const filePath = path.join(commandsPath, file);

        try {
          const command = require(filePath);
          if ('data' in command && 'execute' in command) {
            discordClient.commands.set(command.data.name, command);
          } else {
            console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
          }
        } catch (error) {
          console.error(`[ERROR] Error loading command from file ${filePath}:`, error);
        }
      }
    }
  } catch (error) {
    console.error('[ERROR] An error occurred while loading commands:', error);
  }
};

const loadEvents = (folderPath) => {
  try {
    const eventFiles = fs.readdirSync(folderPath).filter(file => file.endsWith('.js'));
    for (const file of eventFiles) {
      const filePath = path.join(folderPath, file);

      try {
        const event = require(filePath);
        if (event.once) {
          discordClient.once(event.name, (...args) => event.execute(...args, discordClient));
        } else {
          discordClient.on(event.name, (...args) => event.execute(...args, discordClient));
        }
      } catch (error) {
        console.error(`[ERROR] Error loading event from file ${filePath}:`, error);
      }
    }
  } catch (error) {
    console.error('[ERROR] An error occurred while loading events:', error);
  }
};
  
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
  channel.send("**" + msg.author.displayName + "**" + ": " + msg.content)
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