require('dotenv').config();
const { Client } = require('discord.js'); // Client extends EventEmitter
const Discord = require('discord.js');
const axios = require('axios'); // npm install axios

const API_KEY = "?api_key=" + process.env.RIOT_DEV_TEMP_TOKEN;
const RIOT_NA1 = "https://na1.api.riotgames.com/lol/";

// init client object
const client = new Client();

// set prefix
const PREFIX = "$$";

// Query Riot API 
function getSummonerInfo (inputString) {
    // e.g. "https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-name/Gyromite"
    const URL_PART = "summoner/v4/summoners/by-name/" + inputString;

    const QSTRING = RIOT_NA1 + URL_PART + API_KEY;
    console.log(QSTRING);
    axios.get(QSTRING)
        .then(function (response) {
            console.log(response.data)
        })
        .catch(function (error) {
            console.log("error: " + error)
        })
        .then(function () {
            console.log("always executed")
        });
    
    return "info"
}

// Callback function on ready event, which is fired when the bot comes online
client.on('ready', () => {
    // tag is the unique id in discord. cf. client.user.username
    console.log(`${client.user.tag} has logged in.`)
});

// Callback function takes the message object as a parameter
client.on('message', (message) => {
    // ignores bot messages
    if (message.author.bot) return;

    // Reply on the basis of the content of a message
    if (message.content === "Hello Bot") {
        message.reply("Good day to you as well!")
    }
});

// Handling command messages and arguments. async keyword in front of the callback function allows us to wait for a 'promise.'
client.on("message", (message) => {
    const CHANNEL = client.channels.cache.get(message.channel.id);


    if (message.author.bot) return;
    if (message.content.startsWith(PREFIX)) {
        // using array destructuring to turn a content string into a command name and a list of arguments.
        const [CMD_NAME, ...args] = message.content
            .trim() // trims leading and trailing whitespace
            .substring(PREFIX.length) // not sure how this works
            .split(/\s+/); // splits on any amount of whitespace
        
        console.log("Command recieved: " + CMD_NAME);
        console.log("With argument(s): " + args);

        if (CMD_NAME.toLowerCase() === "summoner") {
            if (args.length === 1) {
                message.reply("Yes, you have asked about " + args[0] + ". Here is what I know:");
                
                const URL_PART = "summoner/v4/summoners/by-name/" + args[0];
                const QSTRING = RIOT_NA1 + URL_PART + API_KEY;
                console.log(QSTRING);
                axios.get(QSTRING)
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

        if (CMD_NAME.toLowerCase() === "lore") {
            if (args.length === 1) {
                // TODO validate against champion list
                
                const CHAMP_NAME = capFirstLetter(args[0].toLowerCase());
                const QSTRING = `http://ddragon.leagueoflegends.com/cdn/10.25.1/data/en_US/champion/${CHAMP_NAME}.json`;
                console.log(QSTRING);
                axios.get(QSTRING)
                    .then(function (response) {
                        let desc = response.data.data[CHAMP_NAME].lore;
                        let img = `http://ddragon.leagueoflegends.com/cdn/img/champion/splash/${CHAMP_NAME}_0.jpg`;
                        const MESSAGE = new Discord.MessageEmbed()
                            .setDescription(desc)
                            .setImage(img);
                        CHANNEL.send(MESSAGE);
                        
                        
                        
                        
                        
                        
                        
                        
                        
                        
                        
                        
                        //CHANNEL.send(response.data.data[CHAMP_NAME].lore)
                        







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

function capFirstLetter(inputString) {
    return inputString.charAt(0).toUpperCase() + inputString.slice(1)
}


// Riot API Examples
// http://ddragon.leagueoflegends.com/cdn/10.25.1/data/en_US/champion.json
// http://ddragon.leagueoflegends.com/cdn/10.25.1/data/en_US/champion/Aatrox.json
// http://ddragon.leagueoflegends.com/cdn/img/champion/splash/Aatrox_0.jpg