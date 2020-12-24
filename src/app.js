require('dotenv').config();
const { Client } = require('discord.js'); // Client extends EventEmitter
const DIS = require('discord.js');
const AXIOS = require('axios');
const FS = require('fs');
const NAMES = require('./names.js');

const API_KEY = "?api_key=" + process.env.RIOT_DEV_TEMP_TOKEN;
const RIOT_NA1 = "https://na1.api.riotgames.com/lol/";

// init client object
let client = new Client();

// set prefix
const PREFIX = "lolbot ";
const VALID_COMMANDS = ["whois", "help", "ability"]
// log the bot in
client.login(process.env.DISCORDJS_BOT_TOKEN);

// Callback function on ready event, which is fired when the bot comes online
client.on('ready', () => {
    // tag is the unique id in discord. cf. client.user.username
    console.log(`${client.user.tag} has logged in.`)
});

// Example event handler
// Callback function takes the message object as a parameter
client.on('message', (message) => {
    // ignores messages from bots
    if (message.author.bot) return;

    // Reply on the basis of the content of a message
    if (message.content === "Hello lolbot") {
        message.reply("Hello!")
    }
});

client.on("message", (message) => {
    if (message.author.bot) {
        return
    }

    if (message.content.startsWith(PREFIX.trim()) && message.content.length <= PREFIX.length) {
        message.reply("Placeholder for help message.")
        return
    }

    if (!message.content.startsWith(PREFIX)) {
        return
    }
    // If the prefix detected with at least one argument...

    // get channel id
    const CHANNEL = client.channels.cache.get(message.channel.id);

    // store command and args as a string
    const CMD_STRING = message.content
        .substring(PREFIX.length) // remove the prefix
        .trim()
        .replace(/\s+/, " ") // replace any number of blankspaces with just one
        .toLowerCase()

    const CMD_NAME = CMD_STRING.split(" ")[0]

    if (!VALID_COMMANDS.includes(CMD_NAME)) {
        message.reply("that command is not valid. For help, enter \"lolbot help\".")
        return 
    }

    const ARG_STRING = CMD_STRING
        .substring(CMD_NAME.length)
        .trim()
    const ARG_LIST = listArgs(ARG_STRING)

    console.log(`Command: ${CMD_NAME} recieved with arguments: ${ARG_STRING}`)
    console.log(`and args as list: ${ARG_LIST}`)

    if (CMD_NAME === "help") {
        message.reply("Placeholder for help text.")
    }

    if (CMD_NAME === "whois") {
        if (ARG_STRING.length === 0) {
            message.reply("that command requires a champion name. For help, enter \"lolbot help\".")
            return
        }    
        const CHAMP_LIST = JSON.parse(FS.readFileSync("./src/data/champion.json", "utf-8"))
        
        let champStdName = NAMES.standardize(ARG_STRING).standardName // TODO handle bad input

        console.log("champStdName: ", champStdName)
        
        let champDisplayName = NAMES.standardize(ARG_STRING).displayName
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

    if (CMD_NAME.toLowerCase() === "ability") {
        // check the last argument for q/w/e/r/passive and store
        
        
        // pop the last argument and convert the remaining list to a string
        let ability = "q"

        // standardize the name string
        let champStdName = "Janna"
        // query the data
        const CHAMP_DETAILS = JSON.parse(FS.readFileSync(`./src/data/${champStdName}/${champStdName}.json`))

        



        // initialize a message object and send it to channel
    }
})




// Champion Abilities
// .data[{champ name}].spells[0 through 3] or ...spells["id": "AatroxQ"]
// .data[{champ name}].passive



function listArgs(inputString) {
    let args = inputString
    return args.split(" ")
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