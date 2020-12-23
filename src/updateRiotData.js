const FS = require('fs');
const AXIOS = require('axios');

// RIOT API
// Single file with limited info on each champion: http://ddragon.leagueoflegends.com/cdn/10.25.1/data/en_US/champion.json
// Champion details file: http://ddragon.leagueoflegends.com/cdn/10.25.1/data/en_US/champion/Aatrox.json
// Champion splash art: http://ddragon.leagueoflegends.com/cdn/img/champion/splash/Aatrox_0.jpg
const ROOT = "http://ddragon.leagueoflegends.com/cdn/";
const PATCH = "10.25.1/";
const BRANCH_CHAMP_LIST =  "data/en_US/";
const BRANCH_CHAMP_DETAILS = "data/en_US/champion/"
const BRANCH_SPLASH = "img/champion/splash/"

// Delay to avoid going over rate limites
const DELAY = (ms) => new Promise(res => setTimeout(res, ms))

// Etag for version checking
let etag = FS.readFileSync("./src/data/etag.txt", "utf-8");
let hasNewEtag = false;

console.log("First etag: ", etag)
// Queries the Riot API
function getChampList() {
    const FILE_NAME = "champion.json";
// Single file with limited info on each champion:
// http://ddragon.leagueoflegends.com/cdn/10.25.1/data/en_US/champion.json
    const QSTRING = ROOT + PATCH + BRANCH_CHAMP_LIST + FILE_NAME
    
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

async function updateChampions() {
    const CHAMP_LIST = JSON.parse(FS.readFileSync("./src/data/champion.json", "utf-8"))
    let qString;
    // get and store champion detail files and splash art w/ wait time

    for ( let champ in CHAMP_LIST.data) {

    
        let dir = `./src/data/${champ}`
        if (!FS.existsSync(dir)) {
            FS.mkdirSync(dir)
        }

        // get and store champion details file
        qString = ROOT + PATCH + BRANCH_CHAMP_DETAILS + champ + ".json"
        console.log(qString)
        AXIOS.get(qString)
        .then(
            (response) => {
                FS.writeFileSync(`${dir}/${champ}.json` , JSON.stringify(response.data))
            }
        )
        .catch(
            (error) => {
                console.log("error: " + error)
                throw error
            }
        )

        // get and store splash art
        qString = ROOT + BRANCH_SPLASH + champ + "_0.jpg"
        console.log(qString)
        AXIOS.get(qString, {responseType: 'arraybuffer'})
        // the responseType: arraybuffer option is necessary to correctly format the image data into a local file
        // see https://stackoverflow.com/questions/41846669/download-an-image-using-axios-and-convert-it-to-base64
        .then(
            (response) => {
                FS.writeFileSync(`${dir}/${champ}_0.jpg` , response.data)
            }
        )
        .catch(
            (error) => {
                console.log("error: " + error)
                throw error
            }
        )
        await DELAY(2450)
    }

    // TODO save index of champ names, aliases, and ids
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



