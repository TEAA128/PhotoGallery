/* eslint-disable import/newline-after-import */
/* eslint-disable no-multiple-empty-lines */
const cassandra = require('cassandra-driver');

const client = new cassandra.Client({
  contactPoints: [`${process.env.CONTACTPOINT}`],
  localDataCenter: `${process.env.DATACENTER}`,
  keyspace: `${process.env.KEYSPACE}`,
});



client.connect((err) => {
  if (err) {
    console.log('Error in connection:', err);
  } else {
    console.log('Cassandra connected');
  }
});


module.exports = client;


// const query = 'SELECT * FROM list_by_user WHERE user_id = 2';

// client.execute(query)
//   .then((result) => console.log(result.rows))
//   .catch(err => console.log(err));



// previous db used:
// const mongoose = require('mongoose');
// const mongoUri = 'mongodb://localhost/photoGallery';

// const db = mongoose.connect(mongoUri);

// module.exports = db;
