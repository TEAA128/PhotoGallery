/* eslint-disable import/newline-after-import */
/* eslint-disable no-console */
const express = require('express');
const app = express();
const port = 3004;
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
const Controllers = require('./Controllers.js');

app.use(cors());
app.use(bodyParser.json());
app.use('/photogallery', express.static(path.join(__dirname, '../client/dist')));

app.get('/api/:roomId/photogallery', (req, res) => {
  Controllers.getPhotos(req, res);
});

app.post('/api/:roomId/photogallery', (req, res) => {
  Controllers.postSaveToList(req, res);
});

app.put('/api/:roomId/photogallery', (req, res) => {
  Controllers.updateSaveToList(req, res);
});

// create room
app.post('/api/:roomId/photogallery', (req, res) => {
  Controllers.createRoom(req, res);
});

// update room
app.put('/api/:roomId/photogallery', (req, res) => {
  Controllers.updateRoom(req, res);
});

// delete room
app.delete('/api/:roomId/photogallery', (req, res) => {
  Controllers.removeRoom(req, res);
});


app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));
