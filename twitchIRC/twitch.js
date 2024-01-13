const { Client: TwitchClient } = require('@twitchapis/twitch.js');
const { targetChannel } = require('../config.json');

// Instance new twitch.js client
const twitchJsClient = new TwitchClient({
	channels: [targetChannel],
});

// Ready Event
twitchJsClient.on('ready', () => {
	console.log(`Logged in as ${twitchJsClient.user.name}!`);
});

// Message Event
twitchJsClient.on('message', (msg) => {
	if (msg.content === 'ping') {
		msg.channel.send('pong');
	}

	console.log(msg.author.displayName + ": " + msg.content);
});

module.exports = twitchJsClient;