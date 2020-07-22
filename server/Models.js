/* eslint-disable quote-props */
const client = require('../database');

function getPhotos(roomId, callback) {
  const query = `SELECT * FROM photos_by_room where room_id = ${roomId}`;
  client.execute(query, callback);
}

// function getPhotos(roomId, callback) {
//   client.find({ 'room_id': roomId }, callback);
// }

function postSaveToList(userId, listId, listName, roomId, callback) {
  const query = `INSERT INTO list_by_user (user_id, list_id, list_name, room_id) VALUES (${userId}, ${listId}, ${listName}, ${roomId})`;

  client.execute(query, callback);
}

// function postSaveToList(roomId, listName, savedStatus, callback) {
//   client.update({ room_id: roomId },
//     {
//       $push: {
//         save_status: {
//           name: listName,
//           saved: savedStatus,
//         },
//       },
//     }, callback);
// }

function updateSaveToList (userId, listId, listName, roomId, callback) {
  if (roomId === undefined && listName !== undefined) {
    const query = `UPDATE list_by_user SET list_name = ${listName} where user_id = ${userId} and list_id = ${listId}`;
  }

  if (roomId !== undefined && listName === undefined) {
    const query = `UPDATE list_by_user SET  room_id = ${roomId} where user_id = ${userId} and list_id = ${listId}`;
  };

  client.execute(query, callback);
}


// function updateSaveToList(roomId, id, listName, savedStatus, callback) {
//   client.update({ room_id: roomId, 'save_status._id': id },
//     {
//       $set: {
//         'save_status.$.name': listName,
//         'save_status.$.saved': savedStatus,
//       },
//     }, callback);
// }

// // create room
// function createRoom(userId, roomId, roomPhotos, saveStatus, callback) {
//   Gallery.create({
//     user_id: userId,
//     room_id: roomId,
//     room_photos: roomPhotos,
//     save_status: [],
//   }, callback);
// }

// // update room
// function updateRoom(userId, roomId, roomPhotos, saveStatus, callback) {
//   Gallery.update();
// }

// // delete room
// function removeRoom(roomId, callback) {
//   Gallery.deleteOne({ room_id: roomId }, callback);
// }

module.exports = {
  getPhotos, postSaveToList, updateSaveToList,
};
