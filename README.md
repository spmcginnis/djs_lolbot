# lolbot
A Discord bot using discord.js to query champion data from the Riot Games API.

## TODO
- Summoner spell info (lolbot summs)
- Command string validation
- Handle Riot's inline XML and interpolations in the ability descriptions
- Validate whois by refactoring with a names enum

## Desirable Features
- Summoner info
- External tips
- Champion stats and tier lists
- Make a skins carousel
- Champion stat blocks with base stats (need to deal with riot's inline xml and interpolations)
- Champion stat blocks with symbols
- Champion stat blocks with level up
- lolbot quiz

## Completed
- Responds to Discord commands with prefix "lolbot "
- "whois" command queries chamption lore, splash art, and a random tip (when available).
- Refactor to fetch the champion data and store as local json.
- Refactor to fetch the champion splash art
- Refactor whois to query the cached files
- Account for all champion names and some common nicknames
- Command name validation
- lolbot returns champion ability info
- Get champion ability icons

## Using
- node
- nodemon watches for changes and keeps the server up during dev
- axios for http requests
- discord.js
- dotenv for using environment variables
- fs for reading and writing flat files
