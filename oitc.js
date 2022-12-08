const { user } = require('/users/@me');
const { createDM } = require('/users/@me/channels');
const { EmbedBuilder } = require("@discordjs/builders");
const {exec} = require("child_process");
/*

Recommended Game setup

All players array: [
    {
        name: "somediscordID",
        status: 0 1 2 for alive, dead, not playing
        kills: x amount of kills 
    }, 
    {
        //next user
    }
]


use object orientated programming for this
each function must take the array as a parameter and return the modified array, so the global array can be set to the new array

*/

async function startGame(){
    return new Promise((resolve, reject) => 
    {
        
        resolve('');
    })
}

function restartGame(){
    
}

function endGame(){
    
}

function playerEnter(){
    
}

function playerLeave(){
    
}

function playerElim(){
    
}

function playerKill(){
   
}

module.exports = {startGame, restartGame, endGame, playerEnter, playerLeave, playerElim, playerKill}
