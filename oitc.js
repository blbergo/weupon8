
/*

All players array: [
    {
        name: "somediscordID",
        status: 0 1 2 for alive, dead, not playing
        numkills: x amount of kills 
        target: "none";
    }, 
    {
        //next user
    }
]


use object orientated programming for this
each function must take the array as a parameter and return the modified array, so the global array can be set to the new array

Recommended Game setup


    All of these can use interaction within the case block to add more gameplay effects 
    for example "Dachios was killed by Stephen!"

    Another cool idea would be to add a random death effect "Dachios was gunned down by Stephen", "Stephen was silenced by Dachios," etc
*/

function startGame(playerArr){
    //sets targets and status for players, not randomly selected

    for(let i=0; i<playerArr.length-1; i++){
        playerArr[i].status = 1;
        playerArr[i].numKills = 0;
        playerArr[i].target = playerArr[i+1].name;
    }
    playerArr[playerArr.length-1].target = playerArr[0].name;

    return playerArr;
}

function restartGame(playerArr){
    //reset array, return it

    for(const player in playerArr){
        player.status = 2;
        player.target = "none";
        player.numKills = 0;
    }

    return playerArr;
}

function endGame(playerArr){
    //Announce a winner using interaction

    var winningPlayers = [];
    var highestKill =0;

    for(const player in playerArr){
        if(player.numKills >= highestKill){
            winningPlayers.push(player.name);
            highestKill = player.numKills;
        }
    }

    if(winningPlayers.length === 1){
        return "Game Over, Highest Kill: " + winningPlayers[0];
    }
    else{
        var names = "";
        for(const player in winningPlayers){
            names += player.name + " ";
        }
        return "Game Over, Highest Kill: " + names;
    }
}

function playerEnter(playerArr, playerID){
    //add player to playerArray and return it

    playerArr.push( {
        name: playerID,
        status: 2, //0, 1, 2 for dead, alive, not playing
        numkills: 0,
        target: "none"
    });

    return playerArr;
}

function playerLeave(playerArr, playerID){
    //remove player from playerArray and return it
    
    for(let i =0; i<playerArr; i++){
        if(playerArr[i].name === playerID) { 
            playerArr.slice(i);
            break;
        }
    }

    return playerArr;
}

function playerDead(playerArr, playerID){
    //change player status, return array
    
    for(const player in playerArr){
        if(player.name === playerID) { 
            playerArr[playerArr.findIndex(player)].status = 0;
            break;
        }
    }

    return playerArr;
}

function playerKill(playerArr, playerID){
   //change player status, add kill to killer, return array

   var playerIndex =0;
    for(const player in playerArr){
        if(player.name === playerID) { 
            playerIndex = playerArr.findIndex(player);
            playerArr[playerIndex].numKills += 1;
            break;
        }
    }

    //if other players are alive, find new target for player

    var targetFound = false;

    for(let i=playerIndex+1; i<playerArr.length; i++){
        //check if alive
        if(playerArr[i].status === 1){
            //set target and break
            playerArr[playerIndex].target = playerArr[i].name;
            targetFound = true;
            break;
        }

    }

    if(!targetFound){
        for(let i=0; i<playerIndex; i++){
            //check if alive
            if(playerArr[i].status === 1){
                //set target and break
                playerArr[playerIndex].target = playerArr[i].name;
                targetFound = true;
                break;
            }
        }
    }

    return playerArr;
}

function checkEnd(playerArr){
    var alivePlayers = 0;

    for(const player in playerArr){
        if(player.status === 1) { 
            alivePlayers++;
        }
    }

    if(alivePlayers === 1){
        return true;
    }
    else{
        return false;
    }
}

module.exports = {startGame, restartGame, endGame, playerEnter, playerLeave, playerDead, playerKill, checkEnd}
