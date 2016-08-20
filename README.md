News Review
=============

Crowdsourced, collaborative Indonesian news rating app.

## Developing

Thanks for wanting to contribute! This section will explain how to get up and running on developing this project.

Make sure you have Docker and Docker Compose installed. [See here for further details](https://docs.docker.com/). If you're on OSX, the simplest way is to install Docker for Mac through Homebrew using `brew cask install docker`.

You'll also need `make`. To install it, run `sudo apt-get install build-essential` (Debian/Ubuntu) or `xcode-select --install` (OSX).

To start developing, follow these steps:

1. Clone this repo.
2. Create a `.env` file. Use the provided `.env.default` as an example.
3. Run `make setup`. This will create the tables on the database.
4. Run `make start`. This will run `docker-compose up`.
5. Start hacking!

Note that these commands will pull/build docker images and running `npm install` in the container if you haven't already done it before. It might take a while. Make sure you have a stable internet connection!
