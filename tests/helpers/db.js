const dbConnection = require('../../src/database/db_connection.js');

const selectLastAdded = (tableName, cb) => {
  dbConnection.query(`SELECT * FROM ${tableName} ORDER BY id DESC LIMIT 1`, (err, res) => {
    if (err) {
      cb(err);
    } else {
      cb(null, res.rows);
    }
  });
};
const selectById = (tableName, id, cb) => {
  dbConnection.query(`SELECT * FROM ${tableName} WHERE id=${id}`, (err, res) => {
    if (err) {
      cb(err);
    } else {
      cb(null, res.rows);
    }
  });
};

module.exports = {
  selectLastAdded,
  selectById
};
