const { Client, GatewayIntentBits } = require('discord.js');
var secrets = require('./secrets.js');
var commands = require('./commands.js');

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('interactionCreate', async interaction => {
  if (!interaction.isChatInputCommand()) return;

  if (interaction.commandName === 'mc-restart') {
    //code for restarting minecraft server
    commands.mcRestart();
    await interaction.reply('Success');
  }
});

client.login(secrets.TOKEN);