function capFirstLetter(inputString) {
    inputString = inputString.toLowerCase();
    return inputString.charAt(0).toUpperCase() + inputString.slice(1)
}

module.exports = {
    standardize: (inputString) => {
            let standardName = capFirstLetter(inputString);
            let displayName = standardName;

            // there has to be a better way to do this
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