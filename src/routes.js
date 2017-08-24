var handler = require('./handlers.js');

function router (req, res) {
  var url = req.url;
  var method = req.method;

  if (url === '/' || url.startsWith('/public')) {
    handler.publicHandler(req, res);
  } else if (url === '/viewTopic' && method === 'GET') {
    handler.viewTopicsHandler(req, res);
  } else if (url === '/home') {
    handler.homeHandler(req, res);
  } else if (url === '/login' && method === 'POST') {  // //// login method should be POST
    handler.loginHandler(req, res);
  } else if (url === '/logout') {
    handler.logOutHandler(req, res);
  } else if (url === '/register') {
    handler.registerHandler(req, res);
  } else if (url.startsWith('/getUserTopics')) {
    handler.getUserTopics(req, res);
  } else if (url === '/addTopic') {
    handler.addTopicHandler(req, res);
  } else if (url === '/addCard') {
    handler.addCardHandler(req, res);
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
