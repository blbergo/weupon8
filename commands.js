const {exec} = require("child_process");


async function mcRestart() 
{
    var restartCommand = 'screen -S mcServer -X stuff "stop^M" && sleep 5; screen -S mcServer -X stuff "killall -9 java^M"; screen -S mcServer -X stuff "(cd ~/Desktop/Spigot && java -jar spigot-1.19.2.jar)^M"'
    return new Promise((resolve, reject) => 
    {
        exec(restartCommand, (error, stdout, stderr) => {
            if (error) {
                console.log(`error: ${error.message}`);
                resolve(error.message);
            }
            if (stderr) {
                console.log(`stderr: ${stderr}`);
                resolve(stderr);
            }

            resolve('Server Restarting...');

            
        });
    })

    
}

async function getUrls() 
{
   var getCommand = "curl -s localhost:4040/api/tunnels | jq -r .tunnels";
   var response = "No Active Tunnels"

    return new Promise((resolve, reject) => 
    {
        
        exec(getCommand, (error, stdout, stderr) => {
            if (error) {
                console.log(`error: ${error.message}`);
            }
            if (stderr) {
                console.log(`stderr: ${stderr}`);
            }
    
            stdout = JSON.parse(stdout);

            response = ""
            for(i = 0; i < stdout.length; i++) 
            {
                response += stdout[i].name + ": " + stdout[i].public_url + "\n"
            }

            resolve(stdout? response : stderr)
        });
    })

   
}



module.exports = {mcRestart, getUrls}



