require('dotenv').config()

const fs = require('fs')
const path = require('path')
const knex = require('knex')

const config = require('../../../server/config')

const databaseName = config.database.connection.database

const SCHEMA_FILEPATH = path.resolve(__dirname, '..', 'sql')
const SCHEMA_FILENAME = 'schema.sql'
const schemaFile = `${SCHEMA_FILEPATH}/${SCHEMA_FILENAME}`

function deepClone(obj) {
  return JSON.parse(JSON.stringify(obj))
}

module.exports = {
  createTestDb() {
    const configWithoutDbName = deepClone(config.database)
    delete configWithoutDbName.connection.database

    const db = knex(configWithoutDbName)
    return db.raw(`CREATE DATABASE IF NOT EXISTS ${databaseName}`)
      .then(() => db.destroy())
  },

  initTestTables() {
    return new Promise((resolve, reject) => {
      fs.readFile(schemaFile, 'utf8', (err, sql) => {
        if (err) {
          return reject(err)
        }

        const db = knex(config.database)
        return db.raw(sql)
          .then(() => db.destroy())
          .then(resolve)
          .catch(reject)
      })
    })
  },

  destroyTestDb() {
    const configWithoutDbName = deepClone(config.database)
    delete configWithoutDbName.connection.database

    const db = knex(configWithoutDbName)
    return db.raw(`DROP DATABASE ${databaseName}`)
      .then(() => db.destroy())
  },
}
