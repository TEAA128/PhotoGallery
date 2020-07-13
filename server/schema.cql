CREATE KEYSPACE IF NOT EXISTS bnb
WITH replication = {
  'class' : 'NetworkTopologyStrategy',
  'datacenter1' : 1
  };

CREATE TABLE bnb.users (
  user_id uuid,
  email varchar,
  first_name varchar,
  last_name varchar,
  saved_lists list <listName>, //not sure if this is possible?
  PRIMARY KEY (user_Id, email)
)

-- CREATE TYPE bnb.image (
--   image varchar,
--   description varchar,
-- )

-- CREATE TYPE bnb.listName (
--   saved_rooms list <text> // do i need to relate to roomId?
-- )

CREATE TABLE bnb.rooms (
  room_id uuid,
  user_id uuid,
  title varchar,
  address varchar,
  room_photos set<image>
  PRIMARY KEY (room_Id)
)


CREATE TABLE bnb.photos_by_room (
  room_id uuid,
  image_url varchar,
  image_description text,
  PRIMARY KEY (room_Id)
)

CREATE TABLE bnb.rooms_by_address (
  address varchar,
  user_id uuid,
  title varchar,
  room_photos set<image>,
  PRIMARY KEY (address)
)

CREATE TABLE bnb.list_by_user (
  user_id uuid,
  list_id uuid,
  list_name varchar,
  PRIMARY KEY(user_Id, list_id)
)

CREATE TABLE bnb.rooms_by_list_id(
  list_id uuid,
  room_id uuid,
  PRIMARY KEY(list_id)
)


CREATE TABLE bnb.rooms_by_user (
  user_id uuid,
  room_id uuid,
  PRIMARY KEY (user_id)
)