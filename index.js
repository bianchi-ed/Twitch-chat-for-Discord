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




// Twitch API call examples

// Top 5 Categories ATM
// function topCategories(channel) {
//     const options = {
//         url: 'https://api.twitch.tv/helix/games/top',
//         method: 'GET',
//         headers: {
//             'Client-ID': clientId,
//             'Authorization': 'Bearer ' + 'snzrwhqlwe4kkw5nanitdia7apvsgt',
//         },
//     };

//     axios(options)
//         .then(response => {
//             const data = response.data;
//             channel.send("Most viwed twitch categories right now:");
//             // Print the names of the first 5 categories on separate lines
//             for (let i = 0; i < Math.min(5, data.data.length); i++) {
//                 const categoryUrl = 'https://www.twitch.tv/directory/category/' + data.data[i].name.replace(/\s+/g, '-').toLowerCase();
//                 const categoryName = data.data[i].name;

//                 // Send category name to the channel
//                 channel.send(`#${i+1} - ${categoryName}`);
//             }
//         })
//         .catch(error => {
//             console.log('Error making request:', error.message);
//             channel.send('Error fetching top categories. Please try again later.');
//         });
// }

// Get Users
// function getUser(channel, login) {
//     const options = {
//         url: `https://api.twitch.tv/helix/users?login=${encodeURIComponent(login)}`,
//         method: 'GET',
//         headers: {
//             'Client-ID': clientId,
//             'Authorization': 'Bearer ' + 'snzrwhqlwe4kkw5nanitdia7apvsgt',
//         },
//     };

//     axios(options)
//         .then(response => {
//             console.log(response.data);
            
//             channel.send('User information: ' + JSON.stringify(response.data));
//         })
//         .catch(error => {
//             console.log('Error making request:', error.message);
//             channel.send('Error fetching user information. Please try again later.');
//         });
// }

