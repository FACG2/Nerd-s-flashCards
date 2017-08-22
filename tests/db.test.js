const test = require('tape');
const functions = require('../src/queries/db_functions.js');

//
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
