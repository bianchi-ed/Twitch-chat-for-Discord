const { Client } = require('@twitchapis/twitch.js');
const axios = require('axios');
const { accessToken, clientSecret, clientId, userToken, channel } = require('./config.json')

// Monitored Channels
const client = new Client({
    channels: [''],
});

// ready event
client.on('ready', () => {
    console.log(`Logged in as ${client.user.name}!`);
});

// message event
client.on('message', (msg) => {

    // keep alive
    if (msg.content === 'ping') {
        msg.channel.send('pong');
    }

});

client.login(userToken);