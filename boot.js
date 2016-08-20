require('dotenv').config()

console.log('Booting app...')
const server = require('./server')
server.run()
