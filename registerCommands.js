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
   }
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

