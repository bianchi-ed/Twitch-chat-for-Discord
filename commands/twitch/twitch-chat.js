const { SlashCommandBuilder, ChannelType } = require('discord.js');
const twitchJsClient = require('../../twitch.js');
const { twitchUserToken, targetChannel, discordServerCategoryID } = require('../../config.json');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('twitch-chat')
    .setDescription('Start monitoring target twitch channel chat'),
  async execute(interaction) {

    // Get Guild and check if target channel already exists
    const guild = interaction.guild;
    const existingChannel = guild.channels.cache.find(channel => channel.name === targetChannel);
    
    if (existingChannel) {
      // Log in to the IRC chat using twitch user token
      twitchJsClient.login(twitchUserToken);
      return interaction.reply(`Connected to Twitch IRC Channel #${targetChannel}.`);

    } else{
      return interaction.reply(`Please create a Discord text chat named **${targetChannel}** and run this command again`);
    }
  },
};