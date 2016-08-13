module.exports = {
  main: {
    client: 'mysql',
    connection: {
      host: process.env.MYSQL_HOSTNAME,
      user: process.env.MYSQL_USERNAME,
      password: process.env.MYSQL_PASSWORD,
      database: process.env.MYSQL_DATABASE,
    },
  },
  test: {
    client: 'mysql',
    connection: {
      host: process.env.MYSQL_HOSTNAME,
      user: process.env.MYSQL_USERNAME,
      password: process.env.MYSQL_PASSWORD,
      database: `${process.env.MYSQL_DATABASE}_test`,
      multipleStatements: true,
    },
  },
}
