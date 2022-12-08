
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

/*
    All of these can use interaction within the case block to add more gameplay effects 
    for example "Dachios was killed by Stephen!"

    Another cool idea would be to add a random death effect "Dachios was gunned down by Stephen", "Stephen was silenced by Dachios," etc
*/

function startGame(playerArr){
    //ask for players to join
}

function restartGame(playerArr){
    //reset array, return it
}

function endGame(playerArr){
    //reset status, announce a winner using interaction
    return "Game has Ended";
}

function playerEnter(playerArr, playerID){
    //add player to playerArray and return it
}

function playerLeave(playerArr, playerID){
    //remove player from playerArray and return it
}

function playerElim(playerArr, playerID){
    //change player status, return array
}

function playerKill(playerArr, playerID, killerID){
   //change player status, add kill to killer, return array
}

module.exports = {startGame, restartGame, endGame, playerEnter, playerLeave, playerElim, playerKill}
