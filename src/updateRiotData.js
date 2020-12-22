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
    
    let config = {
        headers: {
            // TODO save this ETag value locally and update with this script
            "If-None-Match": '"de23f9a427b1d49dbfd102e8496908ed"'
        }
    }
    // In order to continue chaining, we have to return the async function that we are waiting on
    return (

        AXIOS.get(QSTRING,config)
            .then(
                function (response) {
                writeData(response.data, "./src/data/champion.json")  
            })
            .catch(function (error) {
                if (error.response.status === 304) {
                    console.log("Local file up to date")
                } else {
                    console.log("error: " + error)
                    throw error   
                }

            })
    )
}

// TODO Writes the data to local json files
function writeData(data, filePath) {
    data = JSON.stringify(data);
    
    // testing
    console.log(filePath);

    FS.writeFileSync(filePath, data);

    console.log(`Write complete: ${filePath}`)

}

// TODO Keeps a log of the most recent updates

// TODO Creates an index of champion names, aliases, and ids.

// TODO lolbot update command from discord

// getChampList().then(() => {
//     const CHAMP_LIST = JSON.parse(FS.readFileSync("./src/data/champion.json", "utf-8"))

//     for ( let champ in CHAMP_LIST.data) {
//         console.log(CHAMP_LIST.data[champ].name)
//     }

// })
async function main () {
    await getChampList()    

    const CHAMP_LIST = JSON.parse(FS.readFileSync("./src/data/champion.json", "utf-8"))

    for ( let champ in CHAMP_LIST.data) {
        console.log(CHAMP_LIST.data[champ].name)
}
}

main()



