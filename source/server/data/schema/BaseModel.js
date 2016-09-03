const knex = require('knex')
const { Model } = require('objection')

const config = require('../../../server/config')

const db = knex(config.database)
Model.knex(db)

module.exports = Model
