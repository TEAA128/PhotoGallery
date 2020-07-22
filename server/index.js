/* eslint-disable import/newline-after-import */
/* eslint-disable no-console */
require('dotenv').config();
require('newrelic');
const express = require('express');
const port = process.env.PORT || 3004;
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
// const morgan = require('morgan');
const Controllers = require('./Controllers.js');

const cluster = require('cluster');
const numCPUs = require('os').cpus().length;

if (cluster.isMaster) {
  for (let i = 0; i < numCPUs; i += 1) {
    cluster.fork();
  }
} else {
  const app = express();
  // app.use(morgan('dev'));
  app.use(cors());
  app.use(bodyParser.json());
  app.use('/', express.static(path.join(__dirname, '../client/dist')));

  app.get('/api/rooms/:roomId/', (req, res) => {
    Controllers.getPhotos(req, res);
  });

  app.post('/api/users/:userId/lists', (req, res) => {
    Controllers.postSaveToList(req, res);
  });

  app.put('/api/users/:userId/lists', (req, res) => {
    Controllers.updateSaveToList(req, res);
  });

  app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));
}

// cluster.on('exit', function(worker, code, signal) {
//   console.log('Worker %d died with code/signal %s. Restarting worker...', worker.process.pid, signal || code);
//   cluster.fork();
// });

// // create room
// app.post('/api/rooms', (req, res) => {
//   Controllers.createRoom(req, res);
// });

// // update room
// app.put('/api/rooms/:roomId', (req, res) => {
//   Controllers.updateRoom(req, res);
// });

// // delete room
// app.delete('/api/rooms/:roomId', (req, res) => {
//   Controllers.removeRoom(req, res);
// });
