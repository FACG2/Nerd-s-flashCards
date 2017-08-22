const func = require('../src/queries/db_functions.js');

const test = require('tape');
const {
  register,
  checkUser
} = require('../src/queries/db_functions.js');

test('Testing the checkuser function Query', (t) => {
  func.checkUser('qqq', (err, data) => {
    if (err) {
      t.notOk(err);
    } else {
      // console.log(data);
      t.equal(data[0].usaname, 'qqq', 'should the user if the user exists');
      t.end();
    }
  });
});

test('Testing the login function Query', (t) => {
  func.login('aaa', 'aaa', (err, data) => {
    if (err) {
      t.notOk(err);
    } else {
      t.equal(data[0].usaname, 'aaa', 'should return the user if the user name and password matched with any existing user');
      t.end();
    }
  });
});

test('Testing the register function Query', (t) => {
  var obj2 = {
    name: 'uiii',
    usaname: 'uiii',
    password: '116'
  };
  func.getUsers((err, res) => {
    if (err) {
      console.log(err);
    } else {
      func.register(obj2, (error, response) => {
        if (error) {
          console.log(error);
        } else {
          func.getUsers((error2, response2) => {
            if (error2) {
              console.log(error2);
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
