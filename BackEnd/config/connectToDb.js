const mongoose = require('mongoose');

async function connectToDb() {
  const Db_url = process.env.DB_URL
  try{
    await mongoose.connect(Db_url);
    console.log('DB CONNECTION DONE');
  } catch(err) {
    console.log(err);
  }
}

//mongodb+srv://adibchiguer:adib1234@cluster0.1fwjjtn.mongodb.net/?retryWrites=true&w=majority

module.exports = connectToDb;