var models = require('../models');

var defaultHeaders = {
  'Access-Control-Allow-Origin': '*',
  'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'access-control-allow-headers': 'content-type, accept',
  'access-control-max-age': 10, // Seconds.
  'Content-Type': 'application/json'
};

module.exports = {
  messages: {
    get: function (req, res) {

      res.writeHead(200, defaultHeaders);

      models.messages.get(function(data) {
        res.end(JSON.stringify(data));
      });

    }, // a function which handles a get request for all messages
    post: function (req, res) {
      res.writeHead(302, defaultHeaders);
      var dataStr = '';
      req.on('data', function(chunk) {


        dataStr += chunk;
      });
      req.on('end', function() {
        //console.log('dataStr is' + dataStr);
        models.messages.post(JSON.parse(dataStr));
        res.end('Posted!');
      });
     // res.end('Posted!');
    } // a function which handles posting a message to the database
  },

  users: {
    // Ditto as above
    get: function (req, res) {
      //Do we need this?
    },
    post: function (req, res) {
     // console.log('HERE');
      // console.log(typeof req);
      // console.dir('constructor is' + req.constructor);
      // console.log(req.headers);
      // console.log(req.json);

      res.writeHead(302, defaultHeaders);
      var username = '';
      //console.log('HERE');
      //console.log(req);
      console.log(req.body);
      req.on('data', function(chunk) {
       // console.log(chunk);
        username += chunk;
        console.log(chunk);
      });



      req.on('end', function() {
        console.log(username);
       // console.log('HERE');
        //console.log(JSON.parse(username).username);
        //console.log(models.messages.users.post);
        //console.log(JSON.parse(username)['username']);
        //JSON.
        console.log('username is' + username);
        models.users.post(JSON.parse(username)['username']);
        res.end('User posted!');
        
      });


    }
  }
};

// module.exports.messages.get()

// $.ajax({url:'http://127.0.0.1:3000/classes/messages',method:'POST', body:{
// username:'lentanasdfass',
// roomname:'lobby',
// createdAt:'october 3rd'
// updatedAt: 'october 4th',
// text: 'test message',
// }});