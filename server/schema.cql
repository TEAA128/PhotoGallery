CREATE KEYSPACE IF NOT EXISTS bnb
WITH replication = {
  'class' : 'NetworkTopologyStrategy',
  'datacenter1' : 1
  };

CREATE TABLE bnb.users (
  user_Id uuid,
  email varchar,
  first_name varchar,
  last_name varchar,
  lists list <listName>, //not sure if this is possible?
  PRIMARY KEY (user_Id, email)
)

CREATE TYPE bnb.image (
  image varchar,
  description varchar,
)

CREATE TYPE bnb.listName (
  saved_Rooms list <text> // do i need to relate to roomId?
)

CREATE TABLE bnb.rooms (
  room_Id uuid,
  user_Id uuid,
  title varchar,
  address varchar,
  room_photos set<image>
  PRIMARY KEY (room_Id)
)

//address city or zip?
// duplicates?
CREATE TABLE bnb.rooms_by_address (
  address varchar,
  user_Id uuid,
  title varchar,
  room_photos set<image>,
  PRIMARY KEY (address)
)

