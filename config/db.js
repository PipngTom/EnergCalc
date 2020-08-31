const mongoose = require('mongoose');
const config = require('config');
const db = config.get('mongoURI');

const connectDb = async () => {
  try {

await mongoose.connect(db, {useNewUrlParser: true, useCreateIndex: true})
      console.log('MongoDb connected')

  } catch(err) {
    console.error(err.message)
    process.exit(1)
  }
}

module.exports = connectDb;