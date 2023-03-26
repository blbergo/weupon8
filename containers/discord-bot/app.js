//discord is our top level docker component since it interacts with the others

const { Client, GatewayIntentBits, EmbedBuilder } = require("discord.js");
var secrets = require("./secrets.js");
var commands = require("./commands.js");
const dockerHelpers = require("./docker.js");

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.on("ready", async () => {
  console.log(`Logged in as ${client.user.tag}!`);

  console.log("\nStarting up containers...");
  await dockerHelpers.startContainers();
  console.log("Containers successfully initialized");
});

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isChatInputCommand()) return;
  var response = "command failed";
  switch (interaction.commandName) {
    case "restart-servers":
      await interaction.reply(await commands.restartServers());
      break;
    case "get-urls":
      await interaction.reply(await commands.getUrls());
      break;
    default:
      await interaction.reply(response);    
  }
});

//program close code taken from stackoverflow
function stopEvent(code) {
  console.log("\nBot shutting down...");

  dockerHelpers.stopAllContainers();
  client.user.setStatus("invisible");
  client.destroy();
}

process.addListener("SIGINT", stopEvent);
process.addListener("SIGTERM", stopEvent);

client.login(secrets.TOKEN);
