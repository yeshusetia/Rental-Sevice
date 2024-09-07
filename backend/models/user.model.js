const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserType = Object.freeze({
  USER: 'USER',
  BROKER: 'BROKER',
});

const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  userType: {
    type: String,
    enum: Object.values(UserType),
    required: true,
  },
});

Object.assign(UserSchema.statics, {
  UserType,
});

UserSchema.index({ email: 1 }, { unique: true });
module.exports = mongoose.model('User', UserSchema);