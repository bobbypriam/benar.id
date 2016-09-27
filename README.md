Benar.ID
=============

[![Build Status](https://travis-ci.org/bobbypriambodo/benar.id.svg?branch=master)](https://travis-ci.org/bobbypriambodo/benar.id)

Crowdsourced, collaborative Indonesian news rating app.

This is still a work in progress!

## Developing

Thanks for wanting to contribute! This section will explain how to get up and running on developing this project.

Make sure you have Docker and Docker Compose installed. [See here for further details](https://docs.docker.com/). If you're on OSX, the simplest way is to install Docker for Mac through Homebrew using `brew cask install docker`.

You'll also need `make`. To install it, run `sudo apt-get install build-essential` (Debian/Ubuntu) or `xcode-select --install` (OSX).

To start developing, follow these steps:

1. Clone this repo.
2. Create a `.env` file. Use the provided `.env.default` as an example.
3. Run `make build-containers`. This will build the Docker containers. Might take a while; so get your cup of tea! (Or coffee, if you're that kind of person.)
4. Run `make setup`. This will install NPM packages, Elm packages, and setup a development database. You'd also need your cup for this.
5. Run `make watch-client`. This will run webpack and watch the client files.
6. Open up a new terminal and run `make start`. This will start the app.
7. Open up your browser at [http://localhost:7000](http://localhost:7000) and start hacking!

Note that these commands will pull/build docker images and running `npm install` in the container if you haven't already done it before. It might take a while. Make sure you have a stable internet connection!

## Testing

```
$ make test
```

## License

Unless otherwise stated, all the code under the `source/` directory is distributed under the terms of the GNU Affero General Public License 3.0 (AGPL-3.0). See [LICENSE](LICENSE) for details.
