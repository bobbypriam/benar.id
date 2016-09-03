require('dotenv').config()

console.log('Booting app...')
const server = require('./source/server')
server.run()
