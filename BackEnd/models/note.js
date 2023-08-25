const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
  title: String,
  body: String,
  user: {
    type : mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  }
});

const Note = mongoose.model('Note', noteSchema);

module.exports = Note;

// mangodb url ==> https://cloud.mongodb.com/v2/64c836196d75e071fb314566#/clusters