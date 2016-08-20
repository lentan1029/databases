var db = require('../db');
// db.query('SELECT * FROM users', function(err, data) {
//   console.log(data);
// });
var Sequelize = require('sequelize');

var SequelDb = new Sequelize('chatter', 'root', 'root');
var Users = SequelDb.define('users');
var Rooms = SequelDb.define('rooms');
var Messages = SequelDb.define('messages');
Users.sync();
Rooms.sync();
Messages.sync();


module.exports = {
  messages: {
    get: function (callback) {
      db.query('SELECT * FROM messages', function(err, data) {
        console.log(data);
      });
      Messages.findAll({attributes: ['message', 'createdAt', 'msgID', 'roomID', 'userID', 'updatedAt']}).then(function(data) {
        console.log('findall returns', data.map(function(elem) {
          return elem.dataValues;
        }));
        callback(data.map(function(elem) {
          return elem.dataValues;
        }));
      });
    },
      // db.query('SELECT * FROM messages', function(err, data) {
      //   callback(data);
      // });
    // }, // a function which produces all the messages
    post: function (message) {
      Users.findOrCreate({attributes: ['userID'], where: {username: message.username}, defaults: {username: message.username }})
      .then(function() {
        return Rooms.findOrCreate({attributes: ['roomID'], where: {roomname: message.roomname}, defaults: {roomname: message.roomname}});
      }).then(function() {
        return Messages.create(message);
      });

      // console.log('INTO MODELS.MESSAGES');
      // var insertMessage = function(message) {
      //   var query = 'INSERT into messages (userID,roomID,message,createdAt,updatedAt) \
      //     VALUES ( \
      //     (SELECT userID from users u where "' + message.username + '"=u.username), \
      //     (SELECT roomID from rooms r where "' + message.roomname + '"=r.roomname),"'
      //     + message.text + '","' + message.createdAt + '","' + message.updatedAt + '");';

      //   //messages will have a username property, 
      //   //console.log(query, 'is being inserted');
      //   db.query(query);
      // };

      // var insertUser = function(message, callback) {
      //   var query = 'INSERT into users (username) VALUES ("' + message.username + '")';
      //   db.query(query, function(err, data) {
      //     callback(message);
      //   });
      // };

      // var insertRoom = function(message, callback) {
      //   var query = 'INSERT into rooms (roomname) VALUES ("' + message.roomname + '")';
      //   db.query(query, function(err, data) {
      //     callback(message);
      //   });
      // };


      

      // db.query('SELECT * from users u where "' + message.username + '"=u.username', function(err, data) {
      //   // console.log(data);
      //   if (data.length === 0) { //[]
      //     insertUser(message, function(err, data) {
      //       db.query('SELECT roomname from rooms WHERE roomname = "' + message.roomname + '"', function(err, data) {
      //         if (data.length === 0) {
      //           insertRoom(message, insertMessage);
      //         } else {
      //           insertMessage(message);
      //         }
      //       });
      //     });
      //   } else {
      //     db.query('SELECT roomname from rooms WHERE roomname = "' + message.roomname + '"', function(err, data) {
      //       if (data.length === 0) {
      //         insertRoom(message, insertMessage);
      //       } else {
      //         insertMessage(message);
      //       }
      //     });
      //   }
      // });

      
      // console.log(message);
    } // a function which can be used to insert a message into the database
  },

  users: {
    // Ditto as above.
    get: function (callback) {
      db.query('SELECT * from users', function(err, data) {
        callback(data);
      });
    },
    post: function (username) { 
    //  console.log('inside models.users.post', username);
      var currentUsers = module.exports.users.get(function(data) {
        // console.log('this is', this);
      //  console.log('data is', data);
        for (var index in data) {
          if (data[index].username === username) {
            // throw new Error(username + 'is already in the database'); //TODO: error catching
            return;
          } 
        }
        var query = 'INSERT INTO users (username) VALUES ("' + username + '")';
        db.query(query);
      });
    }
  }
};

// module.exports.messages.post({
//   username: 'Brian',
//   roomname: 'lobby',
//   text: 'Hey!',
//   createdAt: 'October 2nd',
//   updatedAt: '13:54 PM October 3rd'
// });

// module.exports.messages.get(function(data) {
//   // console.dir(data);
//   for (var message in data) {
//     console.log(data[message]);
//   }
// });

// module.exports.users.post('lentanasdfass');
// module.exports.users.get(function(data) {
//   console.log(data);

// INSERT into messages (userID,roomID,message,createdAt,updatedAt) 
//         VALUES (
//         (SELECT userID from users u where 'lentanasdfass' =u.username), 
//         (SELECT roomID from rooms r where 'lobby' = r.roomname), 'text','October','November');
// });