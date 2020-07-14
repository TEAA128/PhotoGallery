DROP DATABASE IF EXISTS sdcphotogallery;
CREATE DATABASE sdcphotogallery;

\c sdcphotogallery;

CREATE TABLE IF NOT EXISTS users(
id SERIAL NOT NULL PRIMARY KEY,
email varchar(50) NOT NULL,
first_name varchar(20) NOT NULL,
last_name varchar(20) NOT NULL
);

-- CREATE TABLE rooms (
-- id SERIAL NOT NULL PRIMARY KEY,
-- title varchar (30) NOT NULL,
-- address varchar (70) NOT NULL
-- );

-- CREATE TABLE list (
-- id SERIAL NOT NULL PRIMARY KEY,
-- user_Id INTEGER REFERENCES users(id),
-- name varchar(30),
-- room_id INTEGER REFERENCES rooms(id)
-- );

-- CREATE TABLE room_photos (
-- id SERIAL NOT NULL PRIMARY KEY,
-- image_url varchar (50) NOT NULL,
-- image_desc varchar (70),
-- room_Id INTEGER REFERENCES rooms(id)
-- )