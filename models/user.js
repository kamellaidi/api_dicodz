const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true }, // hashed
  email: { type: String, required: true, unique: true },
  role: {
    type: String,
    enum: ['basic', 'contributor', 'admin'],
    default: 'basic',
  },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
