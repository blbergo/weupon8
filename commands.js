const { exec } = require("child_process");
const { InteractionCollector } = require("discord.js");

var restartCommand = 'screen -S mcServer -X stuff "stop^M" && sleep 5; screen -S mcServer -X stuff "killall -9 java^M"; screen -S mcServer -X stuff "(cd ~/Desktop/Spigot && java -jar spigot-1.19.2.jar)^M"'


async function mcRestart(interaction) 
{

    
}

module.exports = {mcRestart}



