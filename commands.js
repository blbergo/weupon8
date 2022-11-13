const exec = require("child_process");



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
    var getCommand = "curl -s localhost:4040/api/tunnels | jq -r .tunnels[0].public_url";

    
    exec(getCommand, (error, stdout, stderr) => {
        if (error) {
            console.log(`error: ${error.message}`);
            return error;
        }
        if (stderr) {
            console.log(`stderr: ${stderr}`);
  
            return stderr;
        }
        console.log(`stdout: ${stdout}`);
        return stdout;
    });

   
}



module.exports = {mcRestart, getUrls}



