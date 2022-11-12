const { exec } = require("child_process");
const { InteractionCollector } = require("discord.js");

var restartCommand = 'screen -S mcServer -X stuff "stop^M" && sleep 5; screen -S mcServer -X stuff "killall -9 java^M"; screen -S mcServer -X stuff "(cd ~/Desktop/Spigot && java -jar spigot-1.19.2.jar)^M"'


function mcRestart(interaction) 
{

    exec(restartCommand, async (error, stdout, stderr) => {
        if (error) {
             await interaction.reply('Error: ' + error.message);
            console.log(`error: ${error.message}`);
           
            return;
        }
        if (stderr) {
            console.log(`stderr: ${stderr}`);
            await interaction.reply('std err: ' + stderr)
            return;
        }
        console.log(`stdout: ${stdout}`);

        await interaction.reply('Successfully restarted minecraft server');
    });
}

module.exports = {mcRestart}



