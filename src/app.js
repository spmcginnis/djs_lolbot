require('dotenv').config();
const { Client } = require('discord.js'); // Client extends EventEmitter
const DIS = require('discord.js');
const AXIOS = require('axios');
const FS = require('fs');

const API_KEY = "?api_key=" + process.env.RIOT_DEV_TEMP_TOKEN;
const RIOT_NA1 = "https://na1.api.riotgames.com/lol/";

// init client object
const client = new Client();

// set prefix
const PREFIX = "lolbot ";

// log the bot in
client.login(process.env.DISCORDJS_BOT_TOKEN);

// Callback function on ready event, which is fired when the bot comes online
client.on('ready', () => {
    // tag is the unique id in discord. cf. client.user.username
    console.log(`${client.user.tag} has logged in.`)
});


// Callback function takes the message object as a parameter
client.on('message', (message) => {
    // ignores messages from bots
    if (message.author.bot) return;

    // Reply on the basis of the content of a message
    if (message.content === "Hello Bot") {
        message.reply("Good day to you as well!")
    }
});

client.on("message", (message) => {
    if (message.author.bot) {
        return
    }

    if (message.content.startsWith(PREFIX.trim()) && message.content.length <= PREFIX.length) {
        message.reply("Placeholder for help message")
        return
    }

    // prefix detected with at least one argument

    // get channel id
    const CHANNEL = client.channels.cache.get(message.channel.id);

    // store command and args as a string
    const CMD_LINE = message.content
        .substring(PREFIX.length) // remove the prefix
        .trim()
        .replace(/\s+/, " ") // replace any number of blankspaces with just one
        .toLowerCase()

    const CMD_NAME = CMD_LINE.split(" ")[0]
    const ARG_STRING = CMD_LINE
        .substring(CMD_NAME.length)
        .trim()

    console.log(`Command: ${CMD_NAME} recieved with arguments: ${ARG_STRING}`)
    console.log(`and args as list: ${listArgs(ARG_STRING)}`)

    if (CMD_NAME === "whois") {
        
        const CHAMP_LIST = JSON.parse(FS.readFileSync("./src/data/champion.json", "utf-8"))
        
        let champStdName = standardizeChampName(ARG_STRING).standardName // TODO handle bad input

        console.log("champStdName: ", champStdName)
        
        let champDisplayName = standardizeChampName(ARG_STRING).displayName
        let blurb = CHAMP_LIST.data[champStdName].blurb
        let title = CHAMP_LIST.data[champStdName].title
        let splashURL = `http://ddragon.leagueoflegends.com/cdn/img/champion/splash/${champStdName}_0.jpg`
        
        // Selecting a random riot suplied tip, which are not always available
        const CHAMP_DETAILS = JSON.parse(FS.readFileSync(`./src/data/${champStdName}/${champStdName}.json`))
        let champDetail = CHAMP_DETAILS.data[champStdName]
        let tipCat = "allytips"
        let choice = Math.floor(Math.random()*2)
        if (choice === 1) {
            tipCat = "enemytips"
        }
        choice = Math.floor(Math.random() * champDetail[tipCat].length);
            
        let champTip = champDetail[tipCat][choice]

        if (typeof(champTip) != "undefined") {
            champTip = "Rito Super Tip:  " + champTip
        }

        
        const MESSAGE = new DIS.MessageEmbed()
            .setDescription(blurb)
            .setImage(splashURL)
            .setTitle(champDisplayName + ", " + title)
            .setFooter(champTip);
        
    CHANNEL.send(MESSAGE);
    }


    
})

function listArgs(inputString) {
    let args = inputString
    return args.split(" ")
}

function standardizeChampName(inputString) {
    standardName = capFirstLetter(inputString);
    displayName = standardName;
    if (standardName === "Kai'sa" || standardName === "Kaisa") {
        standardName = "Kaisa";
        displayName = "Kai'Sa"
    }

    if (standardName === "Susan") {
        standardName = "Nasus";
        displayName = "Susan"
    }

    if (standardName === "Devil") {
        standardName = "Teemo";
        displayName = standardName
    }

    if (standardName === "Miss fortune" || standardName === "Mf") {
        standardName = "MissFortune";
        displayName = "Miss Fortune"
    }

    if (standardName === "Kha'zix") {
        standardName = "Khazix";
        displayName = "Kha'Zix"
    }

    if (standardName === "Tahm" || standardName === "Kench") {
        standardName = "TahmKench";
        displayName = "Tahm Kench"
    }
    if (standardName === "Voli") {
        standardName = "Volibear";
        displayName = standardName
    }

    if (standardName === "Wu kong" || standardName === "Monkeyking") {
        standardName = "MonkeyKing";
        displayName = "Wu Kong"
    }

    if (standardName === "200 years") {
        standardName = "Aphelios";
        displayName = standardName
    }

    if (standardName === "Aurelion sol" || standardName === "Asol" || standardName === "A-sol" || standardName === "A sol") {
        standardName = "AurelionSol";
        displayName = "Aurelion Sol"
    }

    if (standardName === "Blitz") {
        standardName = "Blitzcrank";
        displayName = standardName
    }

    if (standardName === "Dr. mundo" || standardName === "Dr mundo" || standardName === "Mundo" || standardName === "Doctor Mundo") {
        standardName = "DrMundo";
        displayName = "Dr. Mundo"
    }

    if (standardName === "Jarvan" || standardName === "J4" || standardName === "Jiv" || standardName === "J 4" || standardName === "Jarvan iv") {
        standardName = "JarvanIV";
        displayName = "Jarvan IV"
    }

    if (standardName === "Kog'maw" || standardName === "Kog maw" || standardName === "Kogmaw") {
        standardName = "KogMaw";
        displayName = "Kog'Maw"
    }

    if (standardName === "Leblanc" || standardName === "Le blanc" || standardName === "Lb") {
        standardName = "Leblanc";
        displayName = "LeBlanc"
    }

    if (standardName === "Lee" || standardName === "Leesin" || standardName === "Lee sin") {
        standardName = "LeeSin";
        displayName = "Lee Sin"
    }

    if (standardName === "Master yi" || standardName === "Yi") {
        standardName = "MasterYi";
        displayName = "Master Yi"
    }

    if (standardName === "Rek'sai" || standardName === "Reksai" || standardName === "Rek sai") {
        standardName = "RekSai";
        displayName = "Rek'Sai"
    }

    if (standardName === "Tf" || standardName === "Twisted fate" || standardName === "Twistedfate") {
        standardName = "TwistedFate";
        displayName = "Twisted Fate"
    }

    if (standardName === "Vel'koz" || standardName === "Velkoz" || standardName === "Vel koz") {
        standardName = "Velkoz";
        displayName = "Vel'Koz"
    }

    if (standardName === "Xin zhao" || standardName === "Xin" || standardName === "Xinzhao") {
        standardName = "XinZhao";
        displayName = "Xin Zhao"
    }

    

    return {"standardName":standardName,"displayName":displayName}
}

function capFirstLetter(inputString) {
    inputString = inputString.toLowerCase();
    return inputString.charAt(0).toUpperCase() + inputString.slice(1)
}


// Riot API Examples
// Single file with limited info on each champion: http://ddragon.leagueoflegends.com/cdn/10.25.1/data/en_US/champion.json
// Champion details file: http://ddragon.leagueoflegends.com/cdn/10.25.1/data/en_US/champion/Aatrox.json
// Champion splash art: http://ddragon.leagueoflegends.com/cdn/img/champion/splash/Aatrox_0.jpg

// Example query Riot API for summoner info (with API_KEY)
// function getSummonerInfo (inputString) {
//     // e.g. "https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-name/Gyromite"
//     const URL_PART = "summoner/v4/summoners/by-name/" + inputString;

//     const QSTRING = RIOT_NA1 + URL_PART + API_KEY;
//     console.log(QSTRING);
//     AXIOS.get(QSTRING)
//         .then(function (response) {
//             console.log(response.data)
//         })
//         .catch(function (error) {
//             console.log("error: " + error)
//         })
//         .then(function () {
//             console.log("always executed")
//         });
    
//     return "info"
// }