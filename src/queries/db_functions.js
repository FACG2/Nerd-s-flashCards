const dbConnection = require('../database/db_connection.js');
const { createHash } = require('crypto');
// let obj = {
//   name: '',
//   usaname: '',
//   password: ''
// };

const checkUser = (name, cb) => {
  dbConnection.query(`SELECT * FROM users WHERE usaname='${name}'`, (err, res) => {
    if (err) {
      cb(err);
    } else {
      // if (res.rows.length == 0) {
      //   cb(null, false);
      // } else {
      //   cb(null, true);
      // }
      cb(null, res.rows);
    }
  });
};

const register = (obj, cb) => { // /// add user to users table (if NOT EXIST)
  const hashedPassword = createHash('sha256').update(obj.password).digest('hex');
  checkUser(obj.name, (err, res) => {
    if (err) {
      console.log('first error');
    } else {
      if (res.length !== 0) { // /// can't add the existing user
        const userError = new Error('User is exist');
        cb(userError);
      } else {
        const sql = {
          text: 'INSERT INTO users (name,usaname,password) VALUES ($1,$2,$3)',
          values: [obj.name, obj.usaname, hashedPassword]
        };
        dbConnection.query(sql, (err, res) => {
          if (err) {
            cb(err);
          } else {
            cb(null, res.rows);
          }
        });
      }
    }
  });
};

const getUsers = (cb) => {
  dbConnection.query('SELECT * FROM users', (err, res) => {
    if (err) {
      cb(err);
    } else {
      cb(null, res.rows.length);
    }
  });
};

const login = (name, password, cb) => {
  const hashedPassword = createHash('sha256').update(password).digest('hex');

  checkUser(name, (err, res) => {
    if (err) {
      cb(err);
    } else if (res.length !== 0) { // /// user exist
      if (hashedPassword === res[0].password) { // /// check the password
        cb(null, res);
        // getUserTopic(res.id, (err, res) => {
        //   if (err) {
        //     cb(err);
        //   } else {
        //     cb(null, res);
        //   }
        // });
      } else { // /// not matched password
        const passwordError = new Error('Not Matched Passwords');
        cb(passwordError);
      }
    }
  });
};

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
  register,
  login,
  checkUser,
  getUsers,
  getUserTopics,
  getTopics,
  getCards
};
