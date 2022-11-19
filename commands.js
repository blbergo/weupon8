const { EmbedBuilder } = require("@discordjs/builders");
const {exec} = require("child_process");


async function mcRestart() 
{
    var restartCommand = 'screen -S mcServer -X stuff "stop^M"; sleep 5; screen -S mcServer -X stuff "cd ~/Desktop/Paper^M"; screen -S mcServer -X stuff "java -jar paper.1.19.2-71.jar^M"'
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

            try 
            {
                stdout = JSON.parse(stdout);
            } catch(e) 
            {
                resolve("Ngrok currently offline");
            }
    
            urz = ""
            var embed = new EmbedBuilder().setTitle("Server Map");
            for(i = 0; i < stdout.length; i++) 
            {
                if(stdout[i].name == "Server_Map") 
                {
                    embed.setURL(stdout[i].public_url);
                    console.log()
                } 
                
                response += stdout[i].name + ": " + stdout[i].public_url + "\n"
            }


            var ret = [response, embed]

            resolve(stdout? ret : stderr)
        });
    })

   
}

async function ngrokHardReset() {

    var resetCommand = "screen -S ngrokServer stuff 'killall -9 ngrok^M'; screen -S ngrokServer -X stuff 'ngrok start --all^M'; sleep 5";

    return new Promise((resolve, reject) => 
    {
        exec(resetCommand, (error, stdout, stderr) => {
            if (error) {
                console.log(`error: ${error.message}`);
                resolve(error.message);
            }
            if (stderr) {
                console.log(`stderr: ${stderr}`);
                resolve(stderr);
            }

            resolve('Ngrok Restarting...');
        });
    });
}

async function rebootLinux() 
{
    var rebootCommand = "sudo reboot";
    return new Promise((resolve, reject) => 
    {
        exec(rebootCommand, (error, stdout, stderr) => {
            if (error) {
                console.log(`error: ${error.message}`);
                resolve(error.message);
            }
            if (stderr) {
                console.log(`stderr: ${stderr}`);
                resolve(stderr);
            }

            resolve('Linux Restarted!');
        });
    });
}



module.exports = {mcRestart, getUrls, ngrokHardReset, rebootLinux}



