const { exec } = require("child_process");

var restartCommand = "screen -dmS mcServer bash -c 'java -jar ~/Desktop/Spigot/spigot-1.19.2.jar ; exec sh'"


function mcRestart() 
{

    exec(restartCommand, (error, stdout, stderr) => {
        if (error) {
            console.log(`error: ${error.message}`);
            return;
        }
        if (stderr) {
            console.log(`stderr: ${stderr}`);
            return;
        }
        console.log(`stdout: ${stdout}`);
    });
}

module.exports = {mcRestart}



