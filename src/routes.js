var handler = require('./handlers.js');

function router (req, res) {
  var url = req.url;
  if (url === '/' || url.startsWith('/public')) {
    handler.publicHandler(req, res);
  } else if (url === '/login') {

  } else if (url === '/logout') {

  } else if (url === '/register') {

  } else if (url === '/addTopic') {

  } else if (url === '/addCard') {

  } else if (url === '/deleteCard') {

  } else if (url === '/showCrds') {

  } else if (url === '/likeCard') {

  } else {
    handler.noPageHandler(req, res);
  }
}
module.exports = router;
