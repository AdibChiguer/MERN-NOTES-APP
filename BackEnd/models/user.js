const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username : {
    type : String ,
    required : true,
    unique : true ,
    lowercase : true ,
  },
  email: {
    type : String ,
    required : true,
    unique : true ,
    lowercase : true ,
    index : true 
  },
  password: {
    type : String ,
    required : true
  },
  notes: [
    {
      type: mongoose.Schema.Types.ObjectId ,
      ref: 'Note'
    }
  ]
});

const User = mongoose.model('User', userSchema);

module.exports = User;

// mangodb url ==> https://cloud.mongodb.com/v2/64c836196d75e071fb314566#/clusters