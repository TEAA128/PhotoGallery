const fs = require('fs');
const faker = require('faker');
const { argv } = require('yargs');

const start = argv.start || 1; // change this later;
const finish = argv.finish || 2;

const filename1 = argv.output1 || 'postgresUsers.csv';
const filename2 = argv.output2 || 'postgresRooms.csv';
const filename3 = argv.output3 || 'postgresLists.csv';
const filename4 = argv.output4 || 'postgresPhotos.csv';

const stream1 = fs.createWriteStream(filename1);
const stream2 = fs.createWriteStream(filename2);
const stream3 = fs.createWriteStream(filename3);
const stream4 = fs.createWriteStream(filename4);

const createUsers = () => {
  const email = faker.internet.email();
  const first_name = faker.name.firstName();
  const last_name = faker.name.lastName();

  return `${email},${first_name},${last_name}\n`;
};

const createRooms = () => {
  const title = faker.lorem.words();
  const address = faker.address.streetAddress();

  return `${title},${address}\n`;
};

const createList = (userId) => {
  const randNumberRooms = Math.floor(Math.random() * 8);
  const randNumberListName = Math.floor(Math.random() * 5);
  const user_id = userId;
  let str = '';
  for (let i = 0; i < randNumberListName; i += 1) {
    const name = faker.lorem.words();
    for (let j = 0; j < randNumberRooms; j += 1) {
      const room_id = Math.floor(Math.random() * 1000000) + 1;
      str += `${user_id},${name},${room_id}\n`;
    }
  }
  return `${str}`;
};

const createRoomPhotos = (roomId) => {
  const randNumPhotos = Math.floor(Math.random() * 16);
  const room_id = roomId;
  let str = '';

  for(let k = 0; k < randNumPhotos; k += 1) {
    const image_url = faker.image.imageUrl();
    const image_desc = faker.lorem.words();

    str += `${image_url},${image_desc},${room_id}\n`;
  }
  return `${str}`;
};

const startWriting = (writeStream, encoding, dataFunction, done) => {
  let i = start;
  function writing() {
    let canWrite = true;
    do {
      let data = dataFunction(i);

      i += 1;
      // check if i === 0 so we would write and call `done`
      if (i === finish) {
        // we are done so fire callback
        writeStream.write(data, encoding, done);
      } else {
        // else call write and continue looping
        canWrite = writeStream.write(data, encoding);
      }
    } while (i < finish && canWrite);
    if (i < finish && !canWrite) {
      // our buffer for stream filled and need to wait for drain
      // Write some more once it drains.
      writeStream.once('drain', writing);
    }
  }
  // initiate our writing function
  writing();
};

// write our `header` line before we invoke the loop
stream1.write(`email,first_name,last_name\n`, 'utf-8');
// invoke startWriting and pass callback
startWriting(stream1, 'utf-8', createUsers, () => {
  stream1.end();
});

stream2.write(`title,address\n`, 'utf-8');

startWriting(stream2, 'utf-8', createRooms, () => {
  stream2.end();
})

stream3.write(`user_id, name, room_id\n`, 'utf-8');

startWriting(stream3, 'utf-8', createList, () => {
  stream3.end();
});

stream4.write(`image_url,image_desc,room_id\n`, 'utf-8');

startWriting(stream4, 'utf-8', createRoomPhotos, () => {
  stream4.end();
});
