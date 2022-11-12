const { exec } = require("child_process");
const { InteractionCollector } = require("discord.js");
const { stdout } = require("process");

var restartCommand = 'screen -S mcServer -X stuff "stop^M" && sleep 5; screen -S mcServer -X stuff "killall -9 java^M"; screen -S mcServer -X stuff "(cd ~/Desktop/Spigot && java -jar spigot-1.19.2.jar)^M"'

function mcRestart() 
{
    exec(restartCommand, (error, stdout, stderr) => {
        if (error) {
            console.log(`error: ${error.message}`);
            return error.message;
        }
        if (stderr) {
            console.log(`stderr: ${stderr}`);
            return stderr;
        }
        console.log(`stdout: ${stdout}`);
        return 'Server restarting...'
    });

    return 'Server restarting...'
}

function getWebAddr() 
{
    var cmd = `curl --silent --show-error http://127.0.0.1:4040/api/tunnels | sed -nE 's/.*public_url":"https:..([^"]*).*/\1/p'`
    exec(cmd, (error, stdout, stderr) => {
        if (error) {
            console.log(`error: ${error.message}`);
            return error.message;
        }
        if (stderr) {
            console.log(`stderr: ${stderr}`);
            return stderr;
        }
        console.log(`stdout: ${stdout}`);
        return stdout;
    });

    return stdout;

}

module.exports = {mcRestart}



