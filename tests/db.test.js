const test = require('tape');
const functions = require('../src/queries/db_functions.js');
// //////// checkUser test
test('Testing the checkuser function Query', (t) => {
  functions.checkUser('qqq', (err, data) => {
    if (err) {
      t.notOk(err);
    } else {
      // console.log(data);
      t.equal(data[0].usaname, 'qqq', 'should the user if the user exists');
      t.end();
    }
  });
});

 // ////// LOG-IN test

test('Testing the login function Query', (t) => {
  functions.login('aaa', 'aaa', (err, data) => {
    if (err) {
      t.notOk(err);
    } else {
      console.log(data);
      t.equal(data[0].usaname, 'aaa', 'should return the user if the user name and password matched with any existing user');
      t.end();
    }
  });
});

    // //////// Register test
test('Testing the register function Query', (t) => {
  var obj2 = {
    name: 'uiii',
    usaname: 'uiii',
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

// //////// Get Topic test

test('get topcis', (t) => {
  functions.getTopics((err, res) => {
    if (err) {
      console.log(err);
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

// //// Get Users Topics test
test('get user topcis', (t) => {
  functions.getUserTopics(1, (err, res) => {
    if (err) {
      console.log(err);
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

// //// get cards test
test('get a cards', (t) => {
  functions.getCards((err, res) => {
    if (err) {
      console.log(err);
    } else {
      var actual = res[0];

      var expected = {
        content: 'MahmmoudMahmmoud',
        likes: 5
      };
      t.deepEqual(actual, expected, 'should return an object with MahmmoudMahmmoud');
      t.end();
    }
  });
});
