const { Client, GatewayIntentBits, EmbedBuilder, ClientUser } = require('discord.js');
var secrets = require('./secrets.js');
var commands = require('./commands.js');
var gameCommands = require('./oitc.js');

var playerList = []; 

//part of discord api
const client = new Client({ intents: [GatewayIntentBits.Guilds] });
//const user = new User();

//on bot launch

/*
  client.on('ready', async () => {
    console.log(`Logged in as ${client.user.tag}!`);
    const channel = client.channels.cache.find(channel => channel.name == "bot-commands");
    
    var urls = "<@&1042159117210488892>\n";
    var response = await commands.getUrls();

    urls += response[0]

    var embed = new EmbedBuilder().setTitle("Server Map").setURL(response[1]).setColor(0x0099FF).

    channel.send({content: urls, embeds:[embed]});
  });
*/

//whenever interaction is created
client.on('interactionCreate', async interaction => {
  const playerID = interaction;

  //only interested in slash commands
  if (!interaction.isChatInputCommand()) return;
  var response = "command failed";
    switch(interaction.commandName) 
    {
      
      //other commands can be added here using case: 'command': code to be run

      case 'start':
          playerList = gameCommands.startGame(playerList);
          reponse = "Game has started";
          interaction.reply(response);
          break;

      case 'restart':
          playerList = gameCommands.restartGame(playerList);
          reponse = "Game restarted";
          interaction.reply(response);
          break;

      case 'force-end':
          response = gameCommands.endGame(playerList);
          playerList = gameCommands.restartGame(playerList);
          interaction.reply(response);
          break;

      case 'enter':
          if(playerList.length === 10){
            reponse = "Max Players Reached";
            interaction.reply(response);
          }
          else{
            playerList = gameCommands.playerEnter(playerList, playerID);
            response = playerID + " has entered the game";
            interaction.reply(response);
          }
          break;
      
      case 'leave':
          playerList = gameCommands.playerLeave(playerList, playerID);
          reponse = playerID + " has left";
          interaction.reply(response);
          break;

      case 'dead':
          playerList = gameCommands.playerDead(playerList, playerID);
          response = playerID + " has died";
          interaction.reply(response);
          break;
          
      case 'kill':
          playerList = gameCommands.playerKill(playerList, playerID);
          response = playerID + " got a kill";
          interaction.reply(response);
          resonse.send("New Target: " + playerList[playerList.findIndex(playerID)].target);
          interaction.reply(response);
          if(gameCommands.checkEnd(playerList)){
            playerList = gameCommands.endGame(playerList);
            response = gameCommands.restartGame(playerList);
            interaction.reply(response);
          }
          break;
    }
    
});

client.login(secrets.TOKEN);