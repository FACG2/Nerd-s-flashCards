  const dbConnection = require('../database/db_connection.js');
// users , topics , cards ,card_likes

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
    getUserTopics,
    getTopics,
    getCards
  };
