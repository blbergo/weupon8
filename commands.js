const { exec } = require("child_process");

var restartCommand = "screen -S mcServer -dm 'java -jar'"


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



