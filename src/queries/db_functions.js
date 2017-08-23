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

const getUserTopics = (id, cb) => {
  dbConnection.query(`SELECT topics.title ,users.name from topics inner join users on topics.user_id = users.id  where topics.user_id ='${id}'`, (err, res) => {
    if (err) {
      cb(err);
    } else {
      cb(null, res.rows);
    }
  });
};

const getTopics = (cb) => {
  dbConnection.query(`SELECT topics.title ,users.name from topics inner join users on topics.user_id = users.id where topics.status = true`, (err, res) => {
    if (err) {
      cb(err);
    } else {
      cb(null, res.rows);
    }
  });
};

const getCards = (cb) => {
  dbConnection.query(`SELECT cards.content, cards.likes from cards inner join topics on cards.topics_id = topics.id inner join topic_likes on cards.likes = topic_likes.likes`, (err, res) => {
    if (err) {
      cb(err);
    } else {
      cb(null, res.rows);
    }
  });
};


module.exports = {
  addTopic,
  addCard,
  deleteCard,
  UpdateCard,
  getUserTopics,
  getTopics,
  getCards
};
