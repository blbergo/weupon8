const { Client, GatewayIntentBits, EmbedBuilder } = require('discord.js');
var secrets = require('./secrets.js');
var commands = require('./commands.js');
var gameCommands = require('./oitc.js');

var playerList = []; 

//part of discord api
const client = new Client({ intents: [GatewayIntentBits.Guilds] });


//on bot launch
client.on('ready', async () => {
  console.log(`Logged in as ${client.user.tag}!`);
  const channel = client.channels.cache.find(channel => channel.name == "bot-commands");
  const channel2 = client.channels.cache.find(channel => channel.name == "game-chat");

  var urls = "<@&1042159117210488892>\n";
  var response = await commands.getUrls();

  urls += response[0]

  var embed = new EmbedBuilder().setTitle("Server Map").setURL(response[1]).setColor(0x0099FF).

  channel.send({content: urls, embeds:[embed]});
});

//whenever interaction is created
client.on('interactionCreate', async interaction => {

  //only interested in slash commands
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
        var embed = new EmbedBuilder().setTitle("Server Map").setURL(response[1]).setColor(0x0099FF)
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

      //other commands can be added here using case: 'command': code to be run
      case 'end':
          response = gameCommands.endGame();
          interaction.reply(response);
          break;
    }

    
  
});

client.login(secrets.TOKEN);