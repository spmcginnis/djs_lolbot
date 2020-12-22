# lolbot
A Discord bot using discord.js to query champion data from the Riot Games API.

## TODO
- Account for all champion names
- Generate alias.json index of champion names and ids.
- Refactor to fetch the champion splash art

## Completed
- Responds to Discord commands with prefix "lolbot "
- "whois" command queries chamption lore, splash art, and a random tip (when available).
- Refactor to fetch the champion data and store as local json.

## Using
- node
- nodemon watches for changes and keeps the server up during dev
- axios for http requests
- discord.js
- dotenv for using environment variables
- fs for reading and writing flat files
