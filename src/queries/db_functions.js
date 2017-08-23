const dbConnection = require('../database/db_connection.js');

const { createHash } = require('crypto');

const checkUser = (name, cb) => {
  dbConnection.query(`SELECT * FROM users WHERE usaname='${name}'`, (err, res) => {
    if (err) {
      cb(err);
    } else {
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
          values: [obj.name, obj.username, hashedPassword]
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

const login = (name, password, cb) => {
  console.log(name, password);
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
        console.log('no matches');
        const passwordError = new Error('Not Matched Passwords');
        cb(passwordError);
      }
    } else if (res.length === 0) {
      const notFount = new Error('Not Found User');
      cb(notFount);
    }
  });
};

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

const getUsers = (cb) => {
  dbConnection.query('SELECT * FROM users', (err, res) => {
    if (err) {
      cb(err);
    } else {
      cb(null, res.rows.length);
    }
  });
};

// const getUser = (userId, cb) => {
//   dbConnection.query(`SELECT * FROM users WHERE id='${userId}'`, (err, res) => {
//     if (err) {
//       cb(err);
//     } else {
//       cb(null, res.rows);
//     }
//   });
// };
//
// users , topics , cards ,card_likes

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
  addTopic,
  addCard,
  deleteCard,
  UpdateCard,
  getUserTopics,
  getTopics,
  getCards
};
