const { SlashCommandBuilder, ChannelType } = require('discord.js');
const twitchJsClient = require('../../twitchIRC/twitch.js');
const { twitchUserToken, targetChannel, discordServerCategoryID } = require('../../config.json');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('twitch-chat-on')
    .setDescription('Start monitoring target twitch channel chat'),
  async execute(interaction) {

    // Get the guild (server) from the interaction
    const guild = interaction.guild;

    // Check if the channel already exists
    const existingChannel = guild.channels.cache.find(channel => channel.name === targetChannel);
    
    if (existingChannel) {
      // Log in to the IRC chat using twitch user token
      twitchJsClient.login(twitchUserToken);
      return interaction.reply(`The Discord channel #${targetChannel} already exists. Proceeding to connect to Twitch IRC chat if necessary.`);
    }

    // Create a new channel on discord server to store the IRC messages
    const createdChannel = await guild.channels.create({
      name: targetChannel,
      type: ChannelType.GuildText,
      parent: discordServerCategoryID,
    });

    // Log in to the IRC chat using twitch user token
    twitchJsClient.login(twitchUserToken);

    return interaction.reply(`Connected to Twitch IRC Channel #${targetChannel}. Created Discord channel #${createdChannel.name}.`);
  },
};