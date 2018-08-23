
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const { maxLength } = require('../config/keys');

module.exports = {
  'User': mongoose.model('User', new Schema({
    'username': {
      'type': String,
      'required': true,
      'unique': true,
      'maxlength': [maxLength, 'username is too long'],
      'minlength': [1, 'username is too short']
    }
    // '_id': {
    //   'type': String,
    //   // 'index': true
    //   'unique': true,
    //   'default': mongoose.Types.ObjectId
    // }
  }))
};
