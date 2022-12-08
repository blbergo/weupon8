const { user } = require('/users/@me');
const { createDM } = require('/users/@me/channels');
const { EmbedBuilder } = require("@discordjs/builders");
const {exec} = require("child_process");

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
