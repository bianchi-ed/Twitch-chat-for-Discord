const { Client: TwitchClient } = require('@twitchapis/twitch.js');
const { targetChannel } = require('./config.json');
const eventEmitter = require('./eventHandler');

// Instance new twitch.js client

const twitchJsClient = new TwitchClient({
	channels: [targetChannel],
});

// Ready Event
twitchJsClient.on('ready', () => {
	console.log(`Logged in as ${twitchJsClient.user.name}!`);
});

// Message Event
twitchJsClient.on('message', async (msg) => {

	// Keep alive for IRC
	if (msg.content === 'ping') {
		msg.channel.send('pong');
	}

	// Log the message to terminal
	console.log(msg.author.displayName + ": " + msg.content);

	// Send discord message
	eventEmitter.emit('twitchMessage', `**${msg.author.displayName}**: ${msg.content}`);
});

module.exports = twitchJsClient;