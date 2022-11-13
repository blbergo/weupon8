const { Client, GatewayIntentBits } = require('discord.js');
var secrets = require('./secrets.js');
var commands = require('./commands.js');

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('interactionCreate', async interaction => {
  if (!interaction.isChatInputCommand()) return;
  var response;
    switch(interaction.commandName) 
    {
      case 'mc-restart':
        //code for restarting minecraft server
        response = commands.mcRestart();
        await interaction.reply(response);
        break;
      case 'mc-get-map':
        response = commands.getMap();
        await interaction.reply(response);
        break;
    }

    
  
});

client.login(secrets.TOKEN);