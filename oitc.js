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

async function restartGame(){
    return new Promise((resolve, reject) => 
    {
        
        resolve('');
    })
}

async function endGame(){
    return new Promise((resolve, reject) => 
    {
        
    })
}

async function playerEnter(){
    return new Promise((resolve, reject) => 
    {
        
        resolve('');
    })
}

async function playerLeave(){
    return new Promise((resolve, reject) => 
    {
        
    })
}

async function playerElim(){
    return new Promise((resolve, reject) => 
    {
        
    })
}

async function playerKill(){
    return new Promise((resolve, reject) => 
    {
        
    })
}

module.exports = {startGame, restartGame, endGame, playerEnter, playerLeave, playerElim, playerKill}
