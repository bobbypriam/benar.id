const env = process.env.NODE_ENV || 'development'

const common = require('./common')
const environment = require('./environment')

module.exports = Object.assign({}, common, environment[env])
