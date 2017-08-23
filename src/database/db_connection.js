
const {Pool} = require('pg');

require('env2')('./config.env');
var url='';
if (!process.env.DB_URL) {
  throw new Error('No DATABASE_URL provided');
}

if(process.env.NODE_ENV == 'test'){
  url=process.env.TEST_URL;
}
else {
  data_url = process.env.DB_URL;
}
const pool = new Pool({connectionString: url,ssl:true});

module.exports = pool;
