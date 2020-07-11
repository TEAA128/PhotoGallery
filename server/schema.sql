DROP DATABASE IF EXISTS sdcphotogallery;
CREATE DATABASE sdcphotogallery;

\c sdcphotogallery;

CREATE TABLE rooms (
id BIGSERIAL NOT NULL PRIMARY KEY,
user_Id BIGINT REFERENCES users(id),
title varchar (30) NOT NULL,
address varchar (70) NOT NULL,
room_photos ,
);

CREATE TABLE users(
id BIGSERIAL NOT NULL PRIMARY KEY,
email varchar(30) NOT NULL,
first_name varchar(20) NOT NULL,
last_name varchar(20) NOT NULL,
saved_lists BIGINT REFERENCES list (id),
);

CREATE TABLE list (
id BIGSERIAL NOT NULL PRIMARY KEY,
saved_rooms BIGINT REFERENCES rooms (id),
);