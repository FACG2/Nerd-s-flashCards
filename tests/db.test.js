const test = require('tape');
const {
  selectLastAdded,
  selectById
} = require('./helpers/db.js');
const functions = require('../src/queries/db_functions.js');
test('Add New Topic', (t) => {
  var obj = {
    title: 'Ghadeer',
    status: false,
    user_id: 3
  };

  functions.addTopic(obj, (err, res) => {
    if (err) {
      console.log(err);
    } else {
      t.deepEqual(res.command, 'INSERT', 'should return the inerted object');
      t.end();
    }
  });
});
test('Add New Card: addCard', (t) => {
  var obj = {
    content: 'GHDEERGHDEERGHDR',
    likes: 7,
    topics_id: 3
  };

  functions.addCard(obj, (err, res) => {
    if (err) {
      console.log(err);
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

test('Delete exists card', (t) => {
  // first we create a card
  var obj = {
    content: 'GHDEERGHDEERGHDR',
    likes: 7,
    topics_id: 3
  };
  functions.addCard(obj, (err, res) => {
    if (err) {
      console.log(err);
    } else {
      selectLastAdded('cards', (err, res) => {
        if (err) {
          throw err;
        }
        const newCard = res[0];
        functions.deleteCard(newCard, (err, res) => {
          if (err) {
            console.log(err);
          } else {
            t.deepEqual(res.command, 'DELETE', 'should run query type DELETE');
            selectById('cards', newCard.id, (err, res) => {
              if (err) {
                console.log(err);
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

test(' Update exists card ', (t) => {
  // first we create a card
  var obj = {
    content: 'GHDEERGHDEERGHDR',
    likes: 7,
    topics_id: 3
  };
  functions.addCard(obj, (err, res) => {
    if (err) {
      console.log(err);
    } else {
      selectLastAdded('cards', (err, res) => {
        if (err) {
          throw err;
        }
        const newCard = res[0];
        functions.UpdateCard(newCard, (err, res) => {
          if (err) {
            console.log(err);
          } else {
            t.deepEqual(res.command, 'UPDATE', 'should run query type UPDATE');
            selectById('cards', newCard.id, (err, res) => {
              if (err) {
                console.log(err);
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
