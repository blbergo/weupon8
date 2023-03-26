/* All commands should interact with a docker container */

const { restartAllContainers } = require("./docker");

async function restartServers() {
  console.log("\nRestart All Requested");
  let state = await restartAllContainers();
  if (state) {
    return "All servers successfully restarted";
  } else {
    return "Error! Servers failed to restart";
  }
}

async function getUrls() {
  var getCommand = "curl -s localhost:4040/api/tunnels | jq -r .tunnels";
  var response = "No Active Tunnels";

  return new Promise((resolve, reject) => {
    exec(getCommand, (error, stdout, stderr) => {
      if (error) {
        console.log(`error: ${error.message}`);
      }
      if (stderr) {
        console.log(`stderr: ${stderr}`);
      }

      try {
        stdout = JSON.parse(stdout);
      } catch (e) {
        resolve("Ngrok currently offline");
      }

      response = "";

      for (i = 0; i < stdout.length; i++) {
        response += stdout[i].name + ": " + stdout[i].public_url + "\n";
      }

      resolve(response);
    });
  });
}

module.exports = { restartServers, getUrls};
