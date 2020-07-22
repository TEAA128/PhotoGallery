const Models = require('./Models.js');

function getPhotos(req, res) {
  const { roomId } = req.params;
  Models.getPhotos(roomId, (err, data) => {
    if (err) {
      res.status(400).send(err);
    } else {
      res.status(200).send(data.rows);
    }
  });
}

function postSaveToList(req, res) {
  const { roomId } = req.params;
  const { listId, listName } = req.body;
  Models.postSaveToList(roomId, name, saved, (err, data) => {
    if (err) {
      res.status(400).send(err);
    } else {
      res.status(200).send(data);
    }
  });
}

// function postSaveToList(req, res) {
//   const { roomId } = req.params;
//   const { name, saved } = req.body;
//   Models.postSaveToList(roomId, name, saved, (err, data) => {
//     if (err) {
//       res.status(400).send(err);
//     } else {
//       res.status(200).send(data);
//     }
//   });
// }

function updateSaveToList(req, res) {
  const { roomId } = req.params;
  const { id, name, saved } = req.body;
  Models.updateSaveToList(roomId, id, name, saved, (err, data) => {
    if (err) {
      res.status(400).send(err);
    } else {
      res.status(200).send(data);
    }
  });
}

// create room
// function createRoom(req, res) {
//   const { userId, roomId, roomPhotos, saveStatus } = req.body;
//   Models.createRoom( userId, roomId, roomPhotos, saveStatus, (err, data) => {
//     if (err) {
//       res.status(400).send(err);
//     } else {
//       res.status(200).send(data);
//     }
//   });
// }

// update room
// function updateRoom(req, res) {
//   const { userId, roomId, roomPhotos, saveStatus } = req.body;
//   Models.updateRoom( userId, roomId, roomPhotos, saveStatus, (err, data) => {
//     if(err) {
//       res.status(400).send(err);
//     } else {
//       res.status(200).send(data);
//     }
//   });
// }

// delete room
// function removeRoom(req, res) {
//   const { roomId } = req.params;
//   Models.removeRoom(roomId, (err, data) => {
//     if (err) {
//       res.status(400).send(err);
//     } else {
//       res.status(200).send(`${roomId} deleted`);
//     }
//   });
// }

module.exports = { getPhotos, postSaveToList, updateSaveToList };
