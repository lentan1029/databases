var Sequelize = require('sequelize');
// Sequelize.transaction(function(t){
//   var options = {raw:true,transaction:t};
//   Sequelize.query('SET FOREIGN_KEY_CHECKS = 0',null,options);
// });


var db = new Sequelize('chatter', 'root', 'root');
/* TODO this constructor takes the database name, username, then password.
 * Modify the arguments if you need to */

/* first define the data structure by giving property names and datatypes
 * See http://sequelizejs.com for other datatypes you can use besides STRING. */
var Users = db.define('users', {
  id: {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true},
  username: {type: Sequelize.STRING}
});

var Rooms = db.define('rooms', {
  id: {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true},
  roomname: {type: Sequelize.STRING}
});

var Messages = db.define('messages', {
  id: {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true},
  roomID: {type: Sequelize.INTEGER, references: {
    model: 'rooms',
    key: 'id'
  }},
  userID: {type: Sequelize.INTEGER, references: {
    model: 'users',
    key: 'id'
  }},
  // userID: {type: Sequelize.INTEGER, references: {
  //   model: Users,
  //   key: 'id'
  // }},
  message: {type: Sequelize.STRING},
  roomname: {type: Sequelize.STRING},
  createdAt: {type: Sequelize.STRING},
  updatedAt: {type: Sequelize.STRING}
});


Users.sync();
Rooms.sync();
Messages.sync();
/* Sequelize comes with built in support for promises
 * making it easy to chain asynchronous operations together */


/* Create other tables and define schemas for them here! */




/*  Execute this file from the command line by typing:
 *    mysql -u root < server/schema.sql
 *  to create the database and the tables.*/

