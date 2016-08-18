const databases = require('./databases')

module.exports = {
  development: {
    database: databases.main,
  },
  production: {
    database: databases.main,
  },
  test: {
    database: databases.test,
  },
}
