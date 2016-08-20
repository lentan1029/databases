CREATE DATABASE chat;

USE chat;

CREATE TABLE users(
  userID integer NOT NULL AUTO_INCREMENT, username text,
  PRIMARY KEY (userID)
);

CREATE TABLE rooms(
  roomID integer NOT NULL AUTO_INCREMENT, roomname text,
  PRIMARY KEY (roomID)
);

CREATE TABLE messages (
 msgID integer NOT NULL AUTO_INCREMENT, userID integer, roomID integer, createdAt text, updatedAt text, message text, 
 FOREIGN KEY (userID) REFERENCES users(userID),
 FOREIGN KEY (roomID) REFERENCES rooms(roomID), PRIMARY KEY (msgID)
);



CREATE TABLE rooms_users(
roomID integer, userID integer,
FOREIGN KEY (roomID) references rooms(roomID),
FOREIGN KEY (userID) references users(userID));

/* Create other tables and define schemas for them here! */




/*  Execute this file from the command line by typing:
 *    mysql -u root < server/schema.sql
 *  to create the database and the tables.*/

