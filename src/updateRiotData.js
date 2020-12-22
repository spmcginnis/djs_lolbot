const FS = require('fs');
const AXIOS = require('axios');

// RIOT API
const ROOT = "http://ddragon.leagueoflegends.com/cdn/";
const PATCH = "10.25.1/";
const BRANCH =  "data/en_US/";

// Queries the Riot API
function getChampList() {
    const FILE_NAME = "champion.json";
// Single file with limited info on each champion:
// http://ddragon.leagueoflegends.com/cdn/10.25.1/data/en_US/champion.json
    const QSTRING = ROOT + PATCH + BRANCH + FILE_NAME
    console.log(QSTRING);
    AXIOS.get(QSTRING)
        .then(function (response) {
            writeData(response.data, "./src/data/champion.json")
        })
        .catch(function (error) {
            console.log("error: " + error)
        })

}

// TODO Writes the data to local json files
function writeData(data, filePath) {
    data = JSON.stringify(data);
    
    // testing
    console.log(filePath);

    FS.writeFileSync(filePath, data);


}

// TODO Keeps a log of the most recent updates

// TODO Creates an index of champion names, aliases, and ids.

// TODO lolbot update command from discord

getChampList();