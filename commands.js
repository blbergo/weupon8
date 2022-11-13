const { exec } = require("child_process");
const { InteractionCollector } = require("discord.js");
const { stdout } = require("process");

function mcRestart() 
{
    var restartCommand = 'screen -S mcServer -X stuff "stop^M" && sleep 5; screen -S mcServer -X stuff "killall -9 java^M"; screen -S mcServer -X stuff "(cd ~/Desktop/Spigot && java -jar spigot-1.19.2.jar)^M"'
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

function getUrls() 
{

    var getCommand = "curl -s localhost:4040/api/tunnels | jq -r .tunnels[1].public_url";

    var response = ''
    exec(getCommand, (error, stdout, stderr) => {
        if (error) {
            console.log(`error: ${error.message}`);
            response = error.message
            return response
        }
        if (stderr) {
            console.log(`stderr: ${stderr}`);
            response = stderr;
            return response;
        }
        console.log(`stdout: ${stdout}`);
        response = stdout;
        return stdout;
    });

    return response;
}



module.exports = {mcRestart, getUrls}



