const baseConnectionOptions = {
  host: process.env.MYSQL_HOSTNAME,
  user: process.env.MYSQL_USERNAME,
  password: process.env.MYSQL_PASSWORD,
}

module.exports = {
  development: {
    client: 'mysql',
    connection: Object.assign({}, baseConnectionOptions, {
      database: process.env.MYSQL_DATABASE,
      multipleStatements: true,
    }),
  },
  production: {
    client: 'mysql',
    connection: Object.assign({}, baseConnectionOptions, {
      database: process.env.MYSQL_DATABASE,
    }),
  },
  test: {
    client: 'mysql',
    connection: Object.assign({}, baseConnectionOptions, {
      database: `${process.env.MYSQL_DATABASE}_test`,
      multipleStatements: true,
    }),
  },
}
