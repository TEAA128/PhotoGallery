const fs = require('fs');
const faker = require('faker');
const { argv } = require('yargs');

const lines = argv.lines || 1000; //change this later;
const filename = argv.output || 'postgresUser.csv';
const stream = fs.createWriteStream(filename);

const createUsers = () => {
  const email = faker.internet.email();
  const first_name = faker.name.firstName();
  const last_name = faker.name.lastName();

  return `${email},${first_name},${last_name}\n`;

};

const createRooms = () => {
  const title = faker.lorem.sentences();
  const address = faker.address.streetAddress();

  return `${title},${address}\n`;
};

const createList = () => {
  const user_id = 1; // 1-1000
  const name = faker.lorem.words();
  const room_id = 1;// 1-1000
};

const createRoomPhotos = () => {
  const image_url = faker.image.imageUrl;
  const image_desc = faker.lorem.words();
  const room_id = 1; // 1-1000
};

const startWriting = (writeStream, encoding, done) => {
  let i = 0;
  function writing() {
    let canWrite = true;
    do {
      i += 1;
      let user = createUsers();
      // check if i === 0 so we would write and call `done`
      if (i === lines) {
        // we are done so fire callback
        writeStream.write(user, encoding, done);
      } else {
        // else call write and continue looping
        canWrite = writeStream.write(user, encoding);
      }
    } while (i < lines && canWrite);
    if (i < lines && !canWrite) {
      // our buffer for stream filled and need to wait for drain
      // Write some more once it drains.
      writeStream.once('drain', writing);
    }
  }
  // initiate our writing function
  writing();
};

// write our `header` line before we invoke the loop
stream.write(`email,first_name,last_name\n`, 'utf-8');
// invoke startWriting and pass callback
startWriting(stream, 'utf-8', () => {
  stream.end();
});
