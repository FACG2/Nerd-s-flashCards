// const querystring = require('querystring');
const fs = require('fs');
const dbFunctions = require('./queries/db_functions.js');
const path = require('path');
const cookie = require('cookie');
const jwt = require('jsonwebtoken');
var secret = process.env.JWT_SECRET;
var contentTypes = {
  css: 'text/css',
  html: 'text/html',
  js: 'application/javascript',
  ico: 'image/x-icon'
};

function viewTopicsHandler (req, res) {
  dbFunctions.getTopics((err, ress) => {
    if (err) {
      res.writeHead(500, {
        'Content-Type': 'text/html'
      });
      res.end('server error');
      console.log(err);
    } else {
      res.end(JSON.stringify(ress));
      console.log(ress);
    }
  });
}
function publicHandler (req, res) {
  var url = req.url;
  if (url === '/') {
    url = '/public/index.html';
  }
  var parts = url.split('.');
  var fileExtention = parts[parts.length - 1];
  fs.readFile(path.join(__dirname, '/..', url), (err, data) => {
    if (err) {
      res.writeHead(500, {
        'Content-Type': 'text/html'
      });
      res.end('<h1>Internal Server Error</h1>');
    } else {
      res.writeHead(200, {
        'Content-Type': contentTypes[fileExtention]
      });
      res.end(data);
    }
  });
}

function viewCardsHandler (req, res) {
  dbFunctions.getCards((err, ress) => {
    if (err) {
      res.writeHead(500, {
        'Content-Type': 'text/html'
      });
      res.end('server error');
      console.log(err);
    } else {
      res.end(JSON.stringify(ress));
      console.log(ress);
    }
  });
}

function noPageHandler (req, res) {
  res.writeHead(404, {
    'Content-Type': 'text/html'
  });
  res.end('<center><h1>404 Page Not found</h1></center>');
}

const registerHandler = (req, res) => {
  let data = '';
  req.on('data', function (dataChunks) {
    data += dataChunks;
  });
  if (data) {
    req.on('end', () => {
      var parsedData = JSON.parse(data);
      dbFunctions.register(parsedData, (err, res) => {
        if (err) {
          res.writeHead(404, {'content-type': 'text/plain'});
          res.end('Page Not Found');
        } else {
          res.writeHead(200, {'content-type': 'application/json'});
          res.end('Added successfully');
        }
      });
    });
  } else {
    res.writeHead(404, {'content-type': 'text/plain'});
    res.end('Page Not Found');
  }
};

const loginHandler = (req, res) => {
  let loginData = '';
  req.on('data', function (dataChunks) {
    loginData += dataChunks;
  });
  if (loginData) {
    req.on('end', () => {
      var parsedData = JSON.parse(loginData);
      dbFunctions.login(parsedData.name, parsedData.password, (err, res) => { // // will return the object
        if (err) {
          res.writeHead(404, {'content-type': 'text/plain'});
          res.end('Page Not Found');
        } else {
          // ///////////// set the cookie with the object id, redirect to the home and call view user topics
          var user = {
            userId: res[0].id,
            username: res[0].name
          };
          var userToken = jwt.sign(user, secret);
          res.writeHead(302, {'Location': '/', 'Set-Cookie': `token=${userToken}`});
          res.end('Added successfully');
        }
      });
    });
  } else {
    res.writeHead(404, {'content-type': 'text/plain'});
    res.end('Page Not Found');
  }
};

const logOutHandler = (req, res) => { // eslint-disable-line // // redirect to the home with get public cards only and delete the token
  res.writeHead(302, {'Location': '/', 'Set-Cookie': 'token=""; max-Age=0' }); // eslint-disable-line
  return res.end();// eslint-disable-line
};// eslint-disable-line
// ///////// in the DOM file
const getUserTopics = (req, res) => {
  // //////////
  if (req.headers.cookie === undefined) {
    res.writeHead(401, {'Content-Type': 'text/html' });// eslint-disable-line
  } else {
    var cookies = cookie.parse(req.headers.cookie);
    if (cookies.token) {
      var tokenState = jwt.verify(cookies.token, secret);
      if (tokenState) {
        getUserTopics(req.id, (err, res) => {
          if (err) {
            console.log(err);
          } else {
            console.log(res);
          }
        });
      } else {
        res.writeHead( 401, {'Content-Type': 'text/html' }); // eslint-disable-line
        res.end('NOT AUTHORISED ');
      }
    }
  }
};

const addTopicHandler = (req, res) => {
  let addTopicData = '';
  req.on('data', function (dataChunks) {
    addTopicData += dataChunks;
  });
  if (addTopicData) {
    req.on('end', () => {
      var parsedData = JSON.parse(addTopicData);
      dbFunctions.addTopic(parsedData.title, parsedData.status, parsedData.user_id, (err, res) => {
        if (err) {
          res.writeHead(404, {'content-type': 'text/plain'});
          res.end('Page Not Found');
        } else {
          res.writeHead(302, {'Location': '/addCard'});
          res.end('Added successfully');
        }
      });
    });
  } else {
    res.writeHead(404, {'content-type': 'text/plain'});
    res.end('Page Not Found');
  }
};

const addCardHandler = (req, res) => {
  let addCardData = '';
  req.on('data', function (dataChunks) {
    addCardData += dataChunks;
  });
  if (addCardData) {
    req.on('end', () => {
      var parsedData = JSON.parse(addCardData);
      dbFunctions.addTopic(parsedData.content, parsedData.likes, parsedData.topics_id, (err, res) => {
        if (err) {
          res.writeHead(404, {'content-type': 'text/plain'});
          res.end('Page Not Found');
        } else {
          res.writeHead(302, {'Location': '/'});
          res.end('Added successfully');
        }
      });
    });
  } else {
    res.writeHead(404, {'content-type': 'text/plain'});
    res.end('Page Not Found');
  }
};

const UpdateCardHandler = (req, res) => {
  let updateCardData = '';
  req.on('data', function (dataChunks) {
    updateCardData += dataChunks;
  });
  if (updateCardData) {
    req.on('end', () => {
      var parsedData = JSON.parse(updateCardData);
      dbFunctions.updateCardData(parsedData, (err, res) => {
        if (err) {
          res.writeHead(404, {'content-type': 'text/plain'});
          res.end('Page Not Found');
        } else {
          res.writeHead(302, {'Location': '/'});
          res.end('Added successfully');
        }
      });
    });
  } else {
    res.writeHead(404, {'content-type': 'text/plain'});
    res.end('Page Not Found');
  }
};

module.exports = {
  publicHandler,
  viewTopicsHandler,
  viewCardsHandler,
  noPageHandler,
  loginHandler,
  logOutHandler,
  getUserTopics,
  registerHandler,
  addTopicHandler,
  addCardHandler,
  UpdateCardHandler
};
