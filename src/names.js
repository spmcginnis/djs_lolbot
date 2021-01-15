function capFirstLetter(inputString) {
    inputString = inputString.toLowerCase();
    return inputString.charAt(0).toUpperCase() + inputString.slice(1)
}

module.exports = {
    standardize: (inputString) => {
            let standardName = capFirstLetter(inputString);
            let displayName = standardName;

            // there has to be a better way to do this
            if (standardName === "Your dad") {
                standardName = "Seraphine";
                displayName = "Your Dad"
            }
            
            if (standardName === "Kai'sa" || standardName === "Kaisa") {
                standardName = "Kaisa";
                displayName = "Kai'Sa";
            }
            if (standardName === "Susan") {
                standardName = "Nasus";
                displayName = "Susan";
            }
            if (standardName === "Devil" || standardName === "The devil") {
                standardName = "Teemo";
                displayName = standardName;
            }
            if (standardName === "Miss fortune" || standardName === "Mf" || standardName === "Missfortune") {
                standardName = "MissFortune";
                displayName = "Miss Fortune";
            }
            if (standardName === "Kha'zix") {
                standardName = "Khazix";
                displayName = "Kha'Zix";
            }
            if (standardName === "Tahm" || standardName === "Kench") {
                standardName = "TahmKench";
                displayName = "Tahm Kench";
            }
            if (standardName === "Voli") {
                standardName = "Volibear";
                displayName = standardName;
            }
            if (standardName === "Wu kong" || standardName === "Monkeyking") {
                standardName = "MonkeyKing";
                displayName = "Wu Kong";
            }
            if (standardName === "200 years") {
                standardName = "Aphelios";
                displayName = standardName;
            }
            if (standardName === "Aurelion sol" || standardName === "Asol" || standardName === "A-sol" || standardName === "A sol") {
                standardName = "AurelionSol";
                displayName = "Aurelion Sol";
            }
            if (standardName === "Blitz") {
                standardName = "Blitzcrank";
                displayName = standardName;
            }
            if (standardName === "Dr. mundo" || standardName === "Dr mundo" || standardName === "Mundo" || standardName === "Doctor Mundo") {
                standardName = "DrMundo";
                displayName = "Dr. Mundo";
            }
            if (standardName === "Jarvan" || standardName === "J4" || standardName === "Jiv" || standardName === "J 4" || standardName === "Jarvan iv") {
                standardName = "JarvanIV";
                displayName = "Jarvan IV";
            }
            if (standardName === "Kog'maw" || standardName === "Kog maw" || standardName === "Kogmaw") {
                standardName = "KogMaw";
                displayName = "Kog'Maw";
            }
            if (standardName === "Leblanc" || standardName === "Le blanc" || standardName === "Lb") {
                standardName = "Leblanc";
                displayName = "LeBlanc";
            }
            if (standardName === "Lee" || standardName === "Leesin" || standardName === "Lee sin") {
                standardName = "LeeSin";
                displayName = "Lee Sin";
            }
            if (standardName === "Master yi" || standardName === "Yi") {
                standardName = "MasterYi";
                displayName = "Master Yi";
            }
            if (standardName === "Rek'sai" || standardName === "Reksai" || standardName === "Rek sai") {
                standardName = "RekSai";
                displayName = "Rek'Sai";
            }
            if (standardName === "Tf" || standardName === "Twisted fate" || standardName === "Twistedfate") {
                standardName = "TwistedFate";
                displayName = "Twisted Fate";
            }
            if (standardName === "Vel'koz" || standardName === "Velkoz" || standardName === "Vel koz") {
                standardName = "Velkoz";
                displayName = "Vel'Koz";
            }
            if (standardName === "Xin zhao" || standardName === "Xin" || standardName === "Xinzhao") {
                standardName = "XinZhao";
                displayName = "Xin Zhao";
            }

            return { "standardName": standardName, "displayName": displayName };
        }
}

/*
toStandardName = {
    "aatrox":"Aatrox",
    "ahri":"Ahri",
    "akali":"Akali",
    "alistar":"Alistar",
    "amumu":"Amumu",
    "anivia":"Anivia",
    "annie":"Annie",
    "aphelios":"Aphelios",
    "ashe":"Ashe",
    "aurelion sol":"AurelionSol",
    "azir":"Azir",
    "bard":"Bard",
    "blitzcrank":"Blitzcrank",
    "brand":"Brand",
    "braum":"Braum",
    "caitlyn":"Caitlyn",
    "camille":"Camille",
    "cassiopeia":"Cassiopeia",
    "chogath":"Chogath",
    "corki":"Corki",
    "darius":"Darius",
    "diana":"Diana",
    "draven":"Draven",
    "drmundo":"DrMundo",
    "ekko":"Ekko",
    "elise":"Elise",
    "evelynn":"Evelynn",
    "ezreal":"Ezreal",
    "fiddlesticks":"Fiddlesticks",
    "fiora":"Fiora",
    "fizz":"Fizz",
    "galio":"Galio",
    "gangplank":"Gangplank",
    "garen":"Garen",
    "gnar":"Gnar",
    "gragas":"Gragas",
    "graves":"Graves",
    "hecarim":"Hecarim",
    "heimerdinger":"Heimerdinger",
    "illaoi":"Illaoi",
    "irelia":"Irelia",
    "ivern":"Ivern",
    "janna":"Janna",
    "jarvaniv":"JarvanIV",
    "jax": "Jax",
    "jayce":"Jayce",
    "jhin":"Jhin",
    "jinx": "Jinx",
    "kaisa":"Kaisa",
    "kalista":"Kalista",
    "karma":"Karma",
    "karthus":"Karthus",
    "kassadin":"Kassadin",
    "katarina":"Katarina",
    "kayle":"Kayle",
    "kayn":"Kayn",
    "kennen":"Kennen",
    "khazix":"Khazix",
    "kindred":"Kindred",
    "kled":"Kled",
    "kogmaw":"KogMaw",
    "leblanc":"Leblanc",
    "leesin":"LeeSin",
    "leona":"Leona",
    "lillia":"Lillia",
    "lissandra":"Lissandra",
    "lucian":"Lucian",
    "lulu":"Lulu",
    "lux":"Lux",
    "malphite":"Malphite",
    "malzahar":"Malzahar",
    "maokai": "Maokai",
    "masteryi":"MasterYi",
    "missfortune":"MissFortune",
    "wukong":"MonkeyKing",
    "mordekaiser":"Mordekaiser",
    "morgana":"Morgana",
    "nami":"Nami",
    "nasus":"Nasus",
    "nautilus":"Nautilus",
    "neeko": "Neeko",
    "nidalee":"Nidalee",
    "nocturne":"Nocturne",
    "nunu": "Nunu",
    "olaf":"Olaf",
    "orianna":"Orianna",
    "ornn":"Ornn",
    "pantheon":"Pantheon",
    "poppy":"Poppy",
    "pyke": "Pyke",
    "qiyana":"Qiyana",
    "quinn":"Quinn",
    "rakan":"Rakan",
    "rammus":"Rammus",
    "reksai":"RekSai",
    "rell": "Rell",
    "renekton":"Renekton",
    "rengar":"Rengar",
    "riven":"Riven",
    "rumble":"Rumble",
    "ryze":"Ryze",
    "samira":"Samira",
    "sejuani":"Sejuani",
    "senna":"Senna",
    "seraphine":"Seraphine",
    "sett":"Sett",
    "shaco":"Shaco",
    "shen":"Shen",
    "shyvana":"Shyvana",
    "singed":"Singed",
    "sion":"Sion",
    "sivir":"Sivir",
    "skarner":"Skarner",
    "sona":"Sona",
    "soraka":"Soraka",
    "swain":"Swain",
    "sylas":"Sylas",
    "syndra":"Syndra",
    "tahmkench":"TahmKench",
    "taliyah":"Taliyah",
    "talon":"Talon",
    "taric":"Taric",
    "teemo":"Teemo",
    "thresh":"Thresh",
    "tristana":"Tristana",
    "trundle":"Trundle",
    "tryndamere":"Tryndamere",
    "twistedfate":"TwistedFate",
    "twitch":"Twitch",
    "udyr":"Udyr",
    "urgot":"Urgot",
    "varus":"Varus",
    "vayne":"Vayne",
    "veigar":"Veigar",
    "velkoz":"Velkoz",
    "vi":"Vi",
    "viktor":"Viktor",
    "vladimir":"Vladimir",
    "volibear":"Volibear",
    "warwick":"Warwick",
    "xayah":"Xayah",
    "xerath":"Xerath",
    "xinzhao":"XinZhao",
    "yasuo":"Yasuo",
    "yone":"Yone",
    "yorick":"Yorick",
    "yuumi":"Yuumi",
    "zac":"Zac",
    "zed":"Zed",
    "ziggs":"Ziggs",
    "zilean":"Zilean",
    "zoe":"Zoe",
    "zyra":"Zyra"
    
}
toDisplayName = {
    "Aatrox":"Aatrox",
    "Ahri":"Ahri",
    "Akali":"Akali",
    "Alistar":"Alistar",
    "Amumu":"Amumu",
    "Anivia":"Anivia",
    "Annie":"Annie",
    "Aphelios":"Aphelios",
    "Ashe":"Ashe",
    "AurelionSol":"Aurelion Sol",
    "Azir":"Azir",
    "Bard":"Bard",
    "Blitzcrank":"Blitzcrank",
    "Brand":"Brand",
    "Braum":"Braum",
    "Caitlyn":"Caitlyn",
    "Camille":"Camille",
    "Cassiopeia":"Cassiopeia",
    "Chogath":"Cho'Gath",
    "Corki":"Corki",
    "Darius":"Darius",
    "Diana":"Diana",
    "Draven":"Draven",
    "DrMundo":"Dr. Mundo",
    "Ekko":"Ekko",
    "Elise":"Elise",
    "Evelynn":"Evelynn",
    "Ezreal":"Ezreal",
    "Fiddlesticks":"Fiddlesticks",
    "Fiora":"Fiora",
    "Fizz":"Fizz",
    "Galio":"Galio",
    "Gangplank":"Gangplank",
    "Garen":"Garen",
    "Gnar":"Gnar",
    "Gragas":"Gragas",
    "Graves":"Graves",
    "Hecarim":"Hecarim",
    "Heimerdinger":"Heimerdinger",
    "Illaoi":"Illaoi",
    "Irelia":"Irelia",
    "Ivern":"Ivern",
    "Janna":"Janna",
    "JarvanIV":"Jarvan IV",
    "Jax": "Jax",
    "Jayce":"Jayce",
    "Jhin":"Jhin",
    "Jinx": "Jinx",
    "Kaisa":"Kai'Sa",
    "Kalista":"Kalista",
    "Karma":"Karma",
    "Karthus":"Karthus",
    "Kassadin":"Kassadin",
    "Katarina":"Katarina",
    "Kayle":"Kayle",
    "Kayn":"Kayn",
    "Kennen":"Kennen",
    "Khazix":"Kha'Zix",
    "Kindred":"Kindred",
    "Kled":"Kled",
    "KogMaw":"Kog'Maw",
    "Leblanc":"LeBlanc",
    "LeeSin":"Lee Sin",
    "Leona":"Leona",
    "Lillia":"Lillia",
    "Lissandra":"Lissandra",
    "Lucian":"Lucian",
    "Lulu":"Lulu",
    "Lux":"Lux",
    "Malphite":"Malphite",
    "Malzahar":"Malzahar",
    "Maokai": "Maokai",
    "MasterYi":"Master Yi",
    "MissFortune":"Miss Fortune",
    "MonkeyKing":"Wukong",
    "Mordekaiser":"Mordekaiser",
    "Morgana":"Morgana",
    "Nami":"Nami",
    "Nasus":"Nasus",
    "Nautilus":"Nautilus",
    "Neeko": "Neeko",
    "Nidalee":"Nidalee",
    "Nocturne":"Nocturne",
    "Nunu": "Nunu & Willump",
    "Olaf":"Olaf",
    "Orianna":"Orianna",
    "Ornn":"Ornn",
    "Pantheon":"Pantheon",
    "Poppy":"Poppy",
    "Pyke": "Pyke",
    "Qiyana":"Qiyana",
    "Quinn":"Quinn",
    "Rakan":"Rakan",
    "Rammus":"Rammus",
    "RekSai":"Rek'Sai",
    "Rell": "Rell",
    "Renekton":"Renekton",
    "Rengar":"Rengar",
    "Riven":"Riven",
    "Rumble":"Rumble",
    "Ryze":"Ryze",
    "Samira":"Samira",
    "Sejuani":"Sejuani",
    "Senna":"Senna",
    "Seraphine":"Seraphine",
    "Sett":"Sett",
    "Shaco":"Shaco",
    "Shen":"Shen",
    "Shyvana":"Shyvana",
    "Singed":"Singed",
    "Sion":"Sion",
    "Sivir":"Sivir",
    "Skarner":"Skarner",
    "Sona":"Sona",
    "Soraka":"Soraka",
    "Swain":"Swain",
    "Sylas":"Sylas",
    "Syndra":"Syndra",
    "TahmKench":"Tahm Kench",
    "Taliyah":"Taliyah",
    "Talon":"Talon",
    "Taric":"Taric",
    "Teemo":"Teemo",
    "Thresh":"Thresh",
    "Tristana":"Tristana",
    "Trundle":"Trundle",
    "Tryndamere":"Tryndamere",
    "TwistedFate":"Twisted Fate",
    "Twitch":"Twitch",
    "Udyr":"Udyr",
    "Urgot":"Urgot",
    "Varus":"Varus",
    "Vayne":"Vayne",
    "Veigar":"Veigar",
    "Velkoz":"Vel'Koz",
    "Vi":"Vi",
    "Viktor":"Viktor",
    "Vladimir":"Vladimir",
    "Volibear":"Volibear",
    "Warwick":"Warwick",
    "Xayah":"Xayah",
    "Xerath":"Xerath",
    "XinZhao":"Xin Zhao",
    "Yasuo":"Yasuo",
    "Yone":"Yone",
    "Yorick":"Yorick",
    "Yuumi":"Yuumi",
    "Zac":"Zac",
    "Zed":"Zed",
    "Ziggs":"Ziggs",
    "Zilean":"Zilean",
    "Zoe":"Zoe",
    "Zyra":"Zyra"

    
}

// standard goes from input (all lower, symbols and spaces removed) to standard name
// display goes from standard name to display name

*/ 