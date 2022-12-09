const { REST, Routes } = require('discord.js');
var secrets = require('./secrets.js');

const commands = [
  {
    name: 'mc-restart',
    description: 'restarts minecraft server',
  },
  {
    name: 'ngrok-get-urls',
    description: 'gets the current ngrok urls'
  },
   {
    name: 'ngrok-hard-reset',
    description: 'hard resets ngrok'
   },
   {
    name:'linux-reboot',
    description: 'restarts the linux server'
   },
   {
    name:'start',
    description: 'starts the game'
   },
   {
    name:'restart',
    description: 'restarts the game'
   },
   {
    name:'force-end',
    description: 'ends the game'
   },
   {
    name:'enter',
    description: 'player enters game'
   },
   {
    name:'leave',
    description: 'player leaves game'
   },
   {
    name:'dead',
    description: 'player status is dead'
   },
   {
    name:'kill',
    description: 'player gets kill'
   },

   //register commands before running npm app.js 
   //use this format to add commands
]

const rest = new REST({ version: '10' }).setToken(secrets.TOKEN);


(async () => {
  try {
    console.log('Started refreshing application (/) commands.');

    await rest.put(Routes.applicationCommands(secrets.CLIENT_ID), { body: commands });

    console.log('Successfully reloaded application (/) commands.');
  } catch (error) {
    console.error(error);
  }
})();

