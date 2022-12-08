const { user } = require('/users/@me');
const { createDM } = require('/users/@me/channels');
const { EmbedBuilder } = require("@discordjs/builders");
const {exec} = require("child_process");

<<<<<<< HEAD
async function startGame(){
    return new Promise((resolve, reject) => 
    {
        
        resolve('');
    })
=======
const allPlayers = [];
const alivePlayers = [];
const numKills = [];

function startGame(){
    
>>>>>>> ecac6a546c7f942c95aa164aea29168a4ba896e9
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
