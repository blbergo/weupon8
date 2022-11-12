const { exec } = require("child_process");

var restartCommand = 'screen -S mcServer -p 0 -X stuff "stop^M" || screen -dmS mcServer bash -c "cd ~/Desktop/Spigot && java -jar spigot-1.19.2.jar"'


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



