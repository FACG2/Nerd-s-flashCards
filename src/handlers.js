// const querystring = require('querystring');
const fs = require('fs');
const dbFunctions = require('./queries/db_functions.js');

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

  fs.readFile(__dirname.join('/..', url), (err, data) => {
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
  });
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

module.exports = {
  publicHandler,
  viewTopicsHandler,
  viewCardsHandler,
  noPageHandler
};
