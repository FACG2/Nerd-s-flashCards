const dbConnection = require('../database/db_connection.js');

const addTopic = (obj, cb) => {
  dbConnection.query(`INSERT INTO topics (title ,status,user_id) VALUES ('${obj.title}', ${obj.status}, '${obj.user_id}')`, (err, res) => {
    if (err) {
      cb(err);
    } else {
      cb(null, res);
    }
  });
};

const addCard = (obj, cb) => {
  dbConnection.query(`INSERT INTO cards (content ,likes,topics_id) VALUES ('${obj.content}', ${obj.likes}, '${obj.topics_id}')`, (err, res) => {
    if (err) {
      cb(err);
    } else {
      cb(null, res);
    }
  });
};

const deleteCard = (obj, cb) => {
  dbConnection.query(`DELETE FROM cards WHERE id= '${obj.id}' `, (err, res) => {
    if (err) {
      cb(err);
    } else {
      cb(null, res);
    }
  });
};

const UpdateCard = (obj, cb) => {
  dbConnection.query(`UPDATE  cards SET content = '${obj.content}' WHERE id= '${obj.id}' `, (err, res) => {
    if (err) {
      cb(err);
    } else {
      cb(null, res);
    }
  });
};
module.exports = {
  addTopic,
  addCard,
  deleteCard,
  UpdateCard
};
