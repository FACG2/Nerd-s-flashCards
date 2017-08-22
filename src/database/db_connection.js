
const {Pool} = require('pg')

require('env2')('./config.env')

if (!process.env.DB_URL) {
  throw new Error('No DATABASE_URL provided')
}
const pool = new Pool({connectionString: process.env.DB_URL})

module.exports = pool
