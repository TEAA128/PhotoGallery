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

CREATE TABLE IF NOT EXISTS room_photos (
id SERIAL NOT NULL PRIMARY KEY,
image_url varchar (50) NOT NULL,
image_desc varchar (70),
room_id INTEGER REFERENCES rooms(id)
)