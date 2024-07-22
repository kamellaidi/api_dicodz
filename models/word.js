const mongoose = require('mongoose');

const wordSchema = new mongoose.Schema({
  wordfr: {
    type: String,
    required: true,
    unique: true
  },
  worddz: {
    type: String,
    required: true,
    unique: true
  },
  type: {
    type: String,
    required: true
  }
});

const Word = mongoose.model('Word', wordSchema);

module.exports = Word;
