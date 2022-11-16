const { Client, GatewayIntentBits } = require('discord.js');
var secrets = require('./secrets.js');
var commands = require('./commands.js');

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.on('ready', async () => {
  console.log(`Logged in as ${client.user.tag}!`);
  const channel = client.channels.cache.find(channel => channel.name == "bot-commands");
  var urls = "Linux sucessfully restarted \n New Urls: \n" + await commands.getUrls();
  channel.send(urls);
});

client.on('interactionCreate', async interaction => {
  if (!interaction.isChatInputCommand()) return;
  var response = "command failed";
    switch(interaction.commandName) 
    {
      case 'mc-restart':
        //code for restarting minecraft server
        await interaction.deferReply();
        response = await commands.mcRestart();
        interaction.editReply(response)
        break;

      case 'ngrok-get-urls':
        response = await commands.getUrls();
        await interaction.reply(response);
        break;

      case 'ngrok-hard-reset':
        interaction.deferReply();
        response = await commands.ngrokHardReset();
        var urls = await commands.getUrls();

        response += "\n New Urls: \n" + urls;
        await interaction.editReply(response);
        break;

      case 'linux-reboot':
        interaction.reply("Linux restarting...")
        await commands.rebootLinux()
        break;
    }

    
  
});

client.login(secrets.TOKEN);