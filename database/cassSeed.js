const fs = require('fs');
const faker = require('faker');
const { argv } = require('yargs');

const start = argv.start || 1;
const finish = argv.finish || 2;

const filename1 = argv.output1 || 'cassPhotosByRoom.csv';
const filename2 = argv.output2 || 'cassListByUser.csv';

const stream1 = fs.createWriteStream(filename1);
const stream2 = fs.createWriteStream(filename2);

const photosByRoom = (roomId) => {
  const randomNumPhotos = Math.floor(Math.random() * 17);
  const room_id = roomId;
  const address = faker.address.streetAddress();
  let str = '';

  for (let i = 1; i < randomNumPhotos; i += 1) {
    const randomPhoto = Math.floor(Math.random() * 1000) + 1;

    const photo_order = i;
    const title = faker.lorem.words();
    const image_url = `https://teaa-photo-gallery-photos.s3-us-west-1.amazonaws.com/image${randomPhoto}.jpg`;
    const image_description = faker.lorem.words();

    str += `${room_id},${photo_order},${title},${address},${image_url},${image_description}\n`;
  }

  return `${str}`;
};

// let listId = 28383284; change this when making CSVs

const listByUser = (userId) => {
  const randomNumList = Math.floor(Math.random() * 5);
  const randomNumRoom = Math.floor(Math.random() * 8);
  const user_id = userId;
  let str = '';
  for (let j = 1; j < randomNumList; j += 1) {
    const list_name = faker.lorem.words();

    for (let k = 1; k < randomNumRoom; k += 1) {
      const list_id = listId;
      listId += 1;
      const room_id = Math.floor(Math.random() * 10000000) + 1;
      str += `${user_id},${list_id},${list_name},${room_id}\n`;
    }
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
      if (i === finish) {
        writeStream.write(data, encoding, done);
      } else {
        canWrite = writeStream.write(data, encoding);
      }
    } while (i < finish && canWrite);
    if (i < finish && !canWrite) {
      writeStream.once('drain', writing);
    }
  }
  writing();
};

stream1.write(`room_id, photo_order, title, address, image_url, image_description\n`, 'utf-8');

startWriting(stream1, 'utf-8', photosByRoom, () => {
  stream1.end();
});

stream2.write(`user_id,list_id,list_name,room_id\n`, 'utf-8');

startWriting(stream2, 'utf-8', listByUser, () => {
  stream2.end();
});
