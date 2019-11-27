const mongoose = require('mongoose');

let Schema = mongoose.Schema;

let roleShema = new Schema({
  code: {
    type: String,
    required: [true, 'code is necesary'],
    unique: true,
    trim: true
  },
  name: {
    type: String,
    required: [true, 'name is necesary'],
    unique: true
  }
});

module.exports = mongoose.model('roles', roleShema);
