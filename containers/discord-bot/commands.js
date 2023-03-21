/* All commands should interact with a docker container */

const { restartAllContainers } = require("./docker");

function restartServers() {
  console.log("\nRestart All Requested");
  let state = restartAllContainers();
  if (state) {
    return "All servers successfully restarted";
  } else {
    return "Error! Servers failed to restart";
  }
}

module.exports = { restartServers };
