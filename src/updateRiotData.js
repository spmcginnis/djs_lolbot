const FS = require('fs');
const AXIOS = require('axios');

// RIOT API
const ROOT = "http://ddragon.leagueoflegends.com/cdn/";
const PATCH = "10.25.1/";
const BRANCH =  "data/en_US/";

// Etag for version checking
let etag = FS.readFileSync("./src/data/etag.txt", "utf-8");
let hasNewEtag = false;

console.log("First etag: ", etag)
// Queries the Riot API
function getChampList() {
    const FILE_NAME = "champion.json";
// Single file with limited info on each champion:
// http://ddragon.leagueoflegends.com/cdn/10.25.1/data/en_US/champion.json
    const QSTRING = ROOT + PATCH + BRANCH + FILE_NAME
    
    // sets the request header to check the etag
    let config = {
        headers: {
            // TODO save this ETag value locally and update with this script
            "If-None-Match": etag
        }
    }
    // In order to continue chaining, we have to return the async function that we are waiting on
    return (
        AXIOS.get(QSTRING,config)
        .then(
            // this only fires if the etag of the resource is different than the one stored locally
            function (response) {
            writeData(response.data, "./src/data/champion.json")
            // stores the updated etag 
            etag = response.headers.etag
            hasNewEtag = true;
        })
        .catch(function (error) {
            if (error.response.status === 304) {
                console.log("Local file up to date. Etag: " + etag)
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
    FS.writeFileSync(filePath, data);
    console.log(`Write complete: ${filePath}`)
}

function updateChampions() {
    const CHAMP_LIST = JSON.parse(FS.readFileSync("./src/data/champion.json", "utf-8"))

    // TODO save index of champ names, aliases, and ids
    for ( let champ in CHAMP_LIST.data) {
        let dir = `./src/data/${champ}`
        if (!FS.existsSync(dir)) {
            FS.mkdirSync(dir)
        }

        const FILE_NAME = `${champ}.json`;

        

        FS.writeFileSync(`${dir}/${FILE_NAME}` , "data")

    }

}

async function setEtag(etag) {
    hasNewEtag = false;
    return FS.writeFileSync("./src/data/etag.txt", etag)
}

async function main () {
    // use await to wait for the completion of a function-- that function must return a promise.
    await getChampList()
    if (hasNewEtag) {
        await setEtag(etag)
    }
    
    updateChampions()
}

main()



