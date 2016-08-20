/* You'll need to
 *   npm install sequelize
 * before running this example. Documentation is at http://sequelizejs.com/
 */

var Sequelize = require('sequelize');
var db = new Sequelize('chatter', 'root', 'root');
/* TODO this constructor takes the database name, username, then password.
 * Modify the arguments if you need to */

/* first define the data structure by giving property names and datatypes
 * See http://sequelizejs.com for other datatypes you can use besides STRING. */
var Users = db.define('users', {
  userID: {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true},
  username: {type: Sequelize.STRING}
});

var Rooms = db.define('rooms', {
  roomID: {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true},
  roomname: {type: Sequelize.STRING}
});

var Messages = db.define('messages', {
  msgID: {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true},
  roomID: {type: Sequelize.INTEGER, references: {
    model: Rooms,
    key: 'roomID'
  }},
  userID: {type: Sequelize.INTEGER, references: {
    model: Users,
    key: 'userID'
  }},
  message: {type: Sequelize.STRING},
  roomname: {type: Sequelize.STRING},
  createdAt: {type: Sequelize.STRING},
  updatedAt: {type: Sequelize.STRING}
});

//(userID,roomID,message,createdAt,updatedAt)

Rooms.sync();
Messages.sync();
/* Sequelize comes with built in support for promises
 * making it easy to chain asynchronous operations together */
Users.sync()
  .then(function() {
    // Now instantiate an object and save it:
    return Users.create({username: 'Jean Valjean'});
  })
  .then(function() {
    // Retrieve objects from the database:
    return Users.findAll({ where: {username: 'Jean Valjean'} });
  })
  .then(function(users) {
    users.forEach(function(user) {
      console.log(user.username + ' exists');
    });
    //db.close();
  })
  .catch(function(err) {
    // Handle any error in the chain
    console.error(err);
  //  db.close();
  });
