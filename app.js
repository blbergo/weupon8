const { Client, GatewayIntentBits, EmbedBuilder } = require('discord.js');
var secrets = require('./secrets.js');
var commands = require('./commands.js');

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.on('ready', async () => {
  console.log(`Logged in as ${client.user.tag}!`);
  const channel = client.channels.cache.find(channel => channel.name == "bot-commands");
  var urls = "<@&1042159117210488892>\n";
  urls += await commands.getUrls();
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
        var embed = new EmbedBuilder().setTitle("Server Map").setURL('google.com')
        await interaction.reply({content: response[0], embeds: [embed]});
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