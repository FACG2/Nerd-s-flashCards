const test = require('tape');
const functions = require('../src/queries/db_functions.js');
const {
  selectLastAdded,
  selectById
} = require('./helpers/db.js');

// //////// checkUser test ///// qamar
test('Testing the checkuser function Query', (t) => {
  functions.checkUser('qqq', (err, data) => {
    if (err) {
      t.notOk(err);
    } else {
      t.equal(data[0].usaname, 'qqq', 'should the user if the user exists');
      t.end();
    }
  });
});

 // ////// LOG-IN test //// qamar

test('Testing the login function Query', (t) => {
  functions.login('aaa', 'aaa', (err, data) => {
    if (err) {
      t.notOk(err);
    } else {
      t.equal(data[0].usaname, 'aaa', 'should return the user if the user name and password matched with any existing user');
      t.end();
    }
  });
});

    // //////// Register test  //// qamar
test('Testing the register function Query', (t) => {
  var obj2 = {
    name: 'io',
    username: 'pp',
    password: '116'
  };
  functions.getUsers((err, res) => {
    if (err) {
      t.end(err);
    } else {
      functions.register(obj2, (error, response) => {
        if (error) {
          t.end(error);
        } else {
          functions.getUsers((error2, response2) => {
            if (error2) {
              t.notOk(error2);
            } else {
              t.notEqual(res, response2, 'The length of the table should not be the same');
              t.end();
            }
          });
        }
      });
    }
  });
});

// //// ADD TOPIC TEST
test('Add New Topic', (t) => {
  var obj = {
    title: 'Ghadeer',
    status: false,
    user_id: 3
  };

  functions.addTopic(obj, (err, res) => {
    if (err) {
      t.notOk(err);
    } else {
      t.deepEqual(res.command, 'INSERT', 'should return the inerted object');
      t.end();
    }
  });
});

// //// GET TOPICS TEST

test('get topcis', (t) => {
  functions.getTopics((err, res) => {
    if (err) {
      t.notOk(err);
    } else {
      var actual = res[0];
      var expected = {
        title: 'Qamer',
        name: 'Qamer'
      };
      t.deepEqual(actual, expected, 'should return an object with MahmmoudMahmmoud');
      t.end();
    }
  });
});

// //// ADD NEW CARD TEST
test('Add New Card: addCard', (t) => {
  var obj = {
    content: 'GHDEERGHDEERGHDR',
    likes: 7,
    topics_id: 3
  };

  functions.addCard(obj, (err, res) => {
    if (err) {
      t.notOk(err);
    } else {
      t.deepEqual(res.command, 'INSERT', 'should run query type INSERT');

      selectLastAdded('cards', (err, res) => {
        if (err) {
          throw err;
        }
        t.equal(res[0].content, obj.content, 'should insert correct content to \'cards\' table');
        t.equal(res[0].likes, obj.likes, 'should insert correct likes to \'cards\' table');
        t.equal(res[0].topics_id, obj.topics_id, 'should insert correct topics_id to \'cards\' table');
        t.end();
      });
    }
  });
});

// //// GET USER TOPICS TEST

test('get user topcis', (t) => {
  functions.getUserTopics(1, (err, res) => {
    if (err) {
      t.notOk(err);
    } else {
      var actual = res[0];
      var expected = {
        title: 'Qamer',
        name: 'Qamer'
      };
      t.deepEqual(actual, expected, 'should return an object with MahmmoudMahmmoud');
      t.end();
    }
  });
});

// //// DELETE CARD TEST

test('Delete exists card', (t) => {
  // first we create a card
  var obj = {
    content: 'GHDEERGHDEERGHDR',
    likes: 7,
    topics_id: 3
  };
  functions.addCard(obj, (err, res) => {
    if (err) {
      t.notOk(err);
    } else {
      selectLastAdded('cards', (err, res) => {
        if (err) {
          throw err;
        }
        const newCard = res[0];
        functions.deleteCard(newCard, (err, res) => {
          if (err) {
            t.notOk(err);
          } else {
            t.deepEqual(res.command, 'DELETE', 'should run query type DELETE');
            selectById('cards', newCard.id, (err, res) => {
              if (err) {
                t.notOk(err);
              }
              t.equal(res.length, 0, `should delete new card (with id ${newCard.id})`);
              t.end();
            });
          }
        });
      });
    }
  });
});

// /// UPDATE EXISTED CARD
test(' Update exists card ', (t) => {
  // first we create a card
  var obj = {
    content: 'GHDEERGHDEERGHDR',
    likes: 7,
    topics_id: 3
  };
  functions.addCard(obj, (err, res) => {
    if (err) {
      t.notOk(err);
    } else {
      selectLastAdded('cards', (err, res) => {
        if (err) {
          throw err;
        }
        const newCard = res[0];
        functions.UpdateCard(newCard, (err, res) => {
          if (err) {
            t.notOk(err);
          } else {
            t.deepEqual(res.command, 'UPDATE', 'should run query type UPDATE');
            selectById('cards', newCard.id, (err, res) => {
              if (err) {
                t.notOk(err);
              } else {
                t.equal(res[0].content, newCard.content, `should Update new card (with id ${newCard.id})`);
                t.end();
              }
            });
          }
        });
      });
    }
  });
});
