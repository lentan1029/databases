var models = require('../models');



module.exports = {
  messages: {
    get: function (req, res) {

      var defaultCorsHeaders = {
        'Access-Control-Allow-Origin': '*',
        'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'access-control-allow-headers': 'content-type, accept',
        'access-control-max-age': 10 // Seconds.
      };

      headers = defaultCorsHeaders;
      headers['Content-Type'] = 'application/json'; 
      res.writeHead(200, headers);

      models.messages.get(function(data) {
        res.end(JSON.stringify(data));
      });

    }, // a function which handles a get request for all messages
    post: function (req, res) {} // a function which handles posting a message to the database
  },

  users: {
    // Ditto as above
    get: function (req, res) {},
    post: function (req, res) {}
  }
};

// module.exports.messages.get()