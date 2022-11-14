const {exec} = require("child_process");



async function mcRestart() 
{
    var restartCommand = 'screen -S mcServer -X stuff "stop^M" && sleep 5; screen -S mcServer -X stuff "killall -9 java^M"; screen -S mcServer -X stuff "(cd ~/Desktop/Spigot && java -jar spigot-1.19.2.jar)^M"'
    
    return new Promise((resolve, reject) => 
    {
        exec(restartCommand, (error, stdout, stderr) => {
            if (error) {
                console.log(`error: ${error.message}`);
            }
            if (stderr) {
                console.log(`stderr: ${stderr}`);
            }
            console.log(`stdout: ${stdout}`);

            resolve(stdout? 'Server Restarting...' : stderr)
        });
    })

    
}

async function getUrls() 
{
   var getCommand = "curl -s localhost:4040/api/tunnels | jq -r .tunnels";

    return new Promise((resolve, reject) => 
    {
        exec(getCommand, (error, stdout, stderr) => {
            if (error) {
                console.log(`error: ${error.message}`);
            }
            if (stderr) {
                console.log(`stderr: ${stderr}`);
            }
            console.log(`stdout: ${stdout}`);
            resolve(stdout? stdout : stderr)
        });
    })

   
}



module.exports = {mcRestart, getUrls}



