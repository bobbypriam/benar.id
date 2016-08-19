const databases = require('./databases')

module.exports = {
  development: {
    database: databases.development,
  },
  production: {
    database: databases.production,
  },
  test: {
    database: databases.test,
  },
}
