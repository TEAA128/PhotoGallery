DROP DATABASE IF EXISTS sdcphotogallery;
CREATE DATABASE sdcphotogallery;

\c sdcphotogallery;

CREATE TABLE IF NOT EXISTS users(
id SERIAL NOT NULL PRIMARY KEY,
email varchar(50) NOT NULL,
first_name varchar(20) NOT NULL,
last_name varchar(20) NOT NULL
);

CREATE TABLE IF NOT EXISTS rooms (
id SERIAL NOT NULL PRIMARY KEY,
title varchar (80) NOT NULL,
address varchar (70) NOT NULL
);

CREATE TABLE IF NOT EXISTS list (
id SERIAL NOT NULL PRIMARY KEY,
user_id INTEGER REFERENCES users(id),
name varchar(80),
room_id INTEGER REFERENCES rooms(id)
);

CREATE index user_id_room_id_list_index ON list (user_id, room_id);

CREATE TABLE IF NOT EXISTS room_photos (
id SERIAL NOT NULL PRIMARY KEY,
image_url varchar (50) NOT NULL,
image_desc varchar (70),
room_id INTEGER REFERENCES rooms(id)
);

CREATE index room_photos_index ON room_photos (room_id);