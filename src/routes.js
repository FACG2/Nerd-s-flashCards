var handler = require('./handlers.js');

function router (req, res) {
  var url = req.url;
  if (url === '/' || url.startsWith('/public')) {
    handler.publicHandler(req, res, (req, response) => {
      handler.viewTopicsHandler(req, response);
    });
  } else if (url === '/login') {  // //// login method should be POST
    handler.loginHandler(req, res);
  } else if (url === '/logout') {
    handler.logOutHandler(req, res);
  } else if (url === '/register') {
    handler.registerHandler(req, res);
  } else if (url === '/getUserTopics') {
    handler.getUserTopics(req, res);
  } else if (url === '/addTopic') {

  } else if (url === '/addCard') {

  } else if (url === '/deleteCard') {

  } else if (url === '/showCrds') {
    handler.viewCardsHandler(req, res);
  } else if (url === '/likeCard') {

  } else {
    handler.noPageHandler(req, res);
  }
}
module.exports = router;
