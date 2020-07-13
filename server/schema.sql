DROP DATABASE IF EXISTS sdcphotogallery;
CREATE DATABASE sdcphotogallery;

\c sdcphotogallery;

CREATE TABLE rooms (
id BIGSERIAL NOT NULL PRIMARY KEY,
user_Id BIGINT REFERENCES users(id), // not sure if necessary (owner owns rooms?)
title varchar (30) NOT NULL,
address varchar (70) NOT NULL,
);

CREATE TABLE users(
id BIGSERIAL NOT NULL PRIMARY KEY,
email varchar(30) NOT NULL,
first_name varchar(20) NOT NULL,
last_name varchar(20) NOT NULL,
);

CREATE TABLE list (
id BIGSERIAL NOT NULL PRIMARY KEY,
user_Id BIGINT REFERENCES users(id),
name varchar(30),
room_id REFERENCES rooms(id)
);

CREATE TABLE room_photos (
id BIGSERIAL NOT NULL PRIMARY KEY,
image_url varchar (50) NOT NULL,
room_Id BIGINT REFERENCES rooms(id)
)