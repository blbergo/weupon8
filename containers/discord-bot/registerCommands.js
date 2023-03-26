const { REST, Routes } = require("discord.js");
var secrets = require("./secrets.js");

const commands = [
  {
    name: "restart-servers",
    description: "restarts all servers",
  },
  {
    name: "get-urls",
    description: "returns the current ngrok urls",
  },
];

const rest = new REST({ version: "10" }).setToken(secrets.TOKEN);

(async () => {
  try {
    console.log("Started refreshing application (/) commands.");

    await rest.put(Routes.applicationCommands(secrets.CLIENT_ID), {
      body: commands,
    });

    console.log("Successfully reloaded application (/) commands.");
  } catch (error) {
    console.error(error);
  }
})();
