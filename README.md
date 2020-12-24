# lolbot
A Discord bot using discord.js to query champion data from the Riot Games API.

## TODO
- Get champion ability info
- Get champion ability icons
- Summoner spell info (lolbot summs)

## Desirable Features
- Summoner info
- External tips
- Champion stats and tier lists
- Make a skins carousel
- Champion stat blocks with base stats (need to deal with riot's inline xml and interpolations)
- Champion stat blocks with symbols
- Champion stat blocks with level up

## Completed
- Responds to Discord commands with prefix "lolbot "
- "whois" command queries chamption lore, splash art, and a random tip (when available).
- Refactor to fetch the champion data and store as local json.
- Refactor to fetch the champion splash art
- Refactor whois to query the cached files
- Account for all champion names and some common nicknames

## Using
- node
- nodemon watches for changes and keeps the server up during dev
- axios for http requests
- discord.js
- dotenv for using environment variables
- fs for reading and writing flat files
