require('dotenv').config();
const { Client } = require('discord.js'); // Client extends EventEmitter
const DIS = require('discord.js');
const AXIOS = require('axios');

const API_KEY = "?api_key=" + process.env.RIOT_DEV_TEMP_TOKEN;
const RIOT_NA1 = "https://na1.api.riotgames.com/lol/";

// init client object
const client = new Client();

// set prefix
const PREFIX = "lolbot ";

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

// Handling command messages and arguments. async keyword in front of the callback function allows us to wait for a 'promise.'
client.on("message", (message) => {
    const CHANNEL = client.channels.cache.get(message.channel.id);

    // Ignore bots.
    if (message.author.bot) return;
    if (message.content.startsWith(PREFIX)) {
        // using array destructuring to turn a content string into a command name and a list of arguments.
        // note that this does not work well for arguments with spaces, such as summoner names like Miss Fortune.
        // TODO refactor to account for e.g. Miss Fortune as a single argument
        const [CMD_NAME, ...args] = message.content
            .trim() // trims leading and trailing whitespace
            .substring(PREFIX.length) // not sure how this works
            .split(/\s+/); // splits on any amount of whitespace
        
        console.log("Command recieved: " + CMD_NAME);
        console.log("With argument(s): " + args);

        if (CMD_NAME.toLowerCase() === "summoner") {
            //turning off for now
            return
            if (args.length === 1) {
                message.reply("Yes, you have asked about " + args[0] + ". Here is what I know:");
                
                const URL_PART = "summoner/v4/summoners/by-name/" + args[0];
                const QSTRING = RIOT_NA1 + URL_PART + API_KEY;
                console.log(QSTRING);
                AXIOS.get(QSTRING)
                    .then(function (response) {
                        
                        //message.reply(response.data)
                        message.reply("Summoner Level: " + JSON.stringify(response.data.summonerLevel))
                    })
                    .catch(function (error) {
                        console.log("error: " + error)
                    })
                    .then(function () {
                        console.log("always executed")
                    });
            }
        }

        if (CMD_NAME.toLowerCase() === "whois") {
            if (args.length === 0 || args[0] == "help") {
                const MESSAGE =  new DIS.MessageEmbed()
                    .setTitle("lolbot help")
                    .setDescription("lolbot whois <champion name>");
                CHANNEL.send(MESSAGE)
            }
            
            if (args.length >= 1) {
                // TODO validate against champion list
                // TODO fix problem with multiple word names e.g. Miss Fortune
                const CHAMP_NAME = standardizeChampName(args[0]);
                const QSTRING = `http://ddragon.leagueoflegends.com/cdn/10.25.1/data/en_US/champion/${CHAMP_NAME[0]}.json`;
                console.log(QSTRING);
                AXIOS.get(QSTRING)
                    .then(function (response) {
                        let champ = response.data.data[CHAMP_NAME[0]];
                        let desc = champ.lore;
                        let img = `http://ddragon.leagueoflegends.com/cdn/img/champion/splash/${CHAMP_NAME[0]}_0.jpg`;
                        let tip = function () {
                            let tipCat = "allytips";
                            let choice = Math.floor(Math.random()*2);
                            if (choice === 1) {
                                tipCat = "enemytips"
                            }
                            choice = Math.floor(Math.random() * champ[tipCat].length);
                            
                            let tip = champ[tipCat][choice];
                            if (typeof(tip) != "undefined") {
                                return "Rito Super Tip:  " + tip
                            }
                            return ""
                            
                        }
                        // Construct an embedded message object
                        // see https://DISjs.guide/popular-topics/embeds.html#embed-preview
                        const MESSAGE = new DIS.MessageEmbed()
                            .setDescription(desc)
                            .setImage(img)
                            .setTitle(CHAMP_NAME[1])
                            .setFooter(tip());
                            
                        CHANNEL.send(MESSAGE);
                    })
                    .catch(function (error) {
                        console.log("error: " + error)
                    });

            }
        }
    }
});

// log the bot in
client.login(process.env.DISCORDJS_BOT_TOKEN);


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
        displayName = "Teemo"
    }

    if (standardName === "Miss" || standardName === "Mf") {
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

    return [standardName,displayName]
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