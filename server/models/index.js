var db = require('../db');
// db.query('SELECT * FROM users', function(err, data) {
//   console.log(data);
// });

module.exports = {
  messages: {
    get: function (callback) {
      db.query('SELECT * FROM messages', function(err, data) {
        callback(data);
      });
    }, // a function which produces all the messages
    post: function (message) {
      console.log(message);
      var query = 'INSERT into messages (userID,roomID,message,createdAt,updatedAt) \
        VALUES ( \
        (SELECT userID from users u where "' + message.username + '"=u.username), \
        (SELECT roomID from rooms r where "' + message.roomname + '"=r.roomname),"'
        + message.text + '","' + message.createdAt + '","' + message.updatedAt + '");';

      //messages will have a username property, 
      db.query(query);
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
      //console.log(username);
      var currentUsers = this.get(function(data) {
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