CREATE KEYSPACE IF NOT EXISTS bnb
WITH replication = {
  'class' : 'NetworkTopologyStrategy',
  'datacenter1' : 1
  };

--photo order
CREATE TABLE bnb.photos_by_room (
  room_id uuid,
  photo_id uuid, --time uuid
  title varchar,
  address varchar,
  image_url varchar,
  image_description text,
  PRIMARY KEY (room_id) --add photo_id
)

CREATE TABLE bnb.list_by_user (
  user_id uuid,
  list_id uuid,
  list_name varchar,
  PRIMARY KEY(user_id, list_id)
)

--order by date ???
CREATE TABLE bnb.rooms_by_list_id(
  list_id uuid,
  room_id uuid,
  PRIMARY KEY(list_id)
)


-- CREATE TYPE bnb.image (
--   image varchar,
--   description varchar,
-- )

-- CREATE TYPE bnb.listName (
--   saved_rooms list <text> // do i need to relate to roomId?
-- )

--not sure if still necessary since query driven. But when log in maybe? --not necessary
-- CREATE TABLE bnb.users (
--   user_id uuid,
--   email varchar,
--   first_name varchar,
--   last_name varchar,
--   --saved_lists list <listName>,  lists should just be in here as names?
--   PRIMARY KEY (user_id)
)

--not sure if necessary since query driven. -- not necessary
-- CREATE TABLE bnb.rooms (
--   room_id uuid,
--   user_id uuid,
--   title varchar,
--   address varchar,
--   --room_photos set<image> should just be a bunch of images in here
--   PRIMARY KEY (room_id)
-- )

--this doesn't seem necessary
-- CREATE TABLE bnb.rooms_by_address (
--   address varchar,
--   user_id uuid,
--   title varchar,
--   room_photos set<image>,
--   PRIMARY KEY (address)
-- )

--as if it was owner, would then lead to bnb.rooms by room id?
-- CREATE TABLE bnb.rooms_by_user (
--   user_id uuid,
--   room_id uuid,
--   titel varchar,
--   address varchar,
--   PRIMARY KEY (user_id)
-- )