var handler = require('./handlers.js');

function router (req, res) {
  var url = req.url;
  if (url === '/' || url.startsWith('/public')) {
    handler.publicHandler(req, res);
  } else if (url === '/viewTopic') {
    handler.viewTopicsHandler(req, res);
  } else if (url === '/login') {  // //// login method should be POST
    handler.loginHandler(req, res);
  } else if (url === '/logout') {
    handler.logOutHandler(req, res);
  } else if (url === '/register') {
    handler.registerHandler(req, res);
  } else if (url === '/getUserTopics') {
    handler.getUserTopics(req, res);
  } else if (url === '/addTopic') {
    handler.addTopic(req, res);
  } else if (url === '/addCard') {
    handler.addCard(req, res);
  } else if (url === '/deleteCard') {
    handler.deleteCard(req, res);
  } else if (url === '/showCrds') {
    handler.viewCardsHandler(req, res);
  } else if (url === '/likeCard') {

  } else {
    handler.noPageHandler(req, res);
  }
}
module.exports = router;
