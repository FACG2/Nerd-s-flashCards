// const querystring = require('querystring');
const fs = require('fs');
const dbFunctions = require('./queries/db_functions.js');
const path = require('path');
var contentTypes = {
  css: 'text/css',
  html: 'text/html',
  js: 'application/javascript',
  ico: 'image/x-icon'
};

function publicHandler (req, res, cb) {
  var url = req.url;
  if (url === '/') {
    url = '/public/index.html';
  }
  var parts = url.split('.');
  var fileExtention = parts[parts.length - 1];
  // fs.readFile(__dirname.join('/..', url), (err, data) => {
  console.log((path.join(__dirname, '/..', 'public', 'index.html')));
  console.log(path.join(__dirname, '/..', url));

  fs.readFile((path.join(__dirname, '/..', 'public', 'index.html'), (err, data) => {
    if (err) {
      res.writeHead(500, {
        'Content-Type': 'text/html'
      });
      res.end('<h1>Internal Server Error</h1>');
    } else {
      res.writeHead(200, {
        'Content-Type': contentTypes[fileExtention]
      });

      // res.end(data);
      cb(req, res);
    }
  }));
}

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
      parsedData = JSON.parse(data);
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
// ////////////////////////////////////////////////////////
// //// loginHandler + edit wadia query + router + database
// ////////////////////////////////////////////////////////
const loginHandler = (req, res) => {
  let loginData = '';
  req.on('data', function (dataChunks) {
    loginData += dataChunks;
  });
  if (loginData) {
    req.on('end', () => {
      parsedData = JSON.parse(loginData);
      dbFunctions.login(loginData.name, loginData.password, (err, res) => { // // will return the object
        if (err) {
          res.writeHead(404, {'content-type': 'text/plain'});
          res.end('Page Not Found');
        } else {
          // ///////////// set the cookie with the object id, redirect to the home and call view user topics

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

const logOutHandler = (req, res) => { // // redirect to the home with get public cards only and delete the token
  res.writeHead(302, {'Location': '/', 'Set-Cookie': 'token=""; max-Age=0' });
  return res.end();
};

const getUserTopics = (req, res) => {
    // ///// if the user is authenticated (token is exist) then view the user topics else go to the public home
};

module.exports = {
  publicHandler,
  viewTopicsHandler,
  viewCardsHandler,
  noPageHandler,
  loginHandler,
  logoutHandler,
  getUserTopics,
  registerHandler
};
