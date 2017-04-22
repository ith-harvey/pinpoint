const path = require('path')

//dev connection path for Mike
const connectionPATH = process.env.CONNECTION_PATH || ''

module.exports = {

  development: {
    client: 'pg',
    connection: `postgres://${connectionPATH}localhost/pinpoint_dev`,
    migrations: {
      directory: path.join(__dirname, 'db', 'migrations')
    },
    seeds: {
      directory: path.join(__dirname, 'db', 'seeds')
    }
  },
  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL,
    migrations: {
      directory: path.join(__dirname, 'db', 'migrations')
    },
    seeds: {
      directory: path.join(__dirname, 'db', 'seeds')
    }
  }

}
