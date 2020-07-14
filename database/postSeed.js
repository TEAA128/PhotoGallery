const fs = require('fs');
const faker = require('faker');
const argv = require('yargs').arv;

const lines = argv.lines || 1000; //change this later;
const filename = argv.output || 'postgres.csv';
const writeStream = fs.createWriteStream(filename);

const createData = () => {
  const user_id = faker.random
}
