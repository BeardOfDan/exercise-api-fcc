
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const { maxLength } = require('../config/keys');

module.exports = {
  'Exercise': mongoose.model('Exercise', new Schema({
    // '_id': {
    //   'type': String,
    //   // 'index': true
    //   'unique': true,
    //   'default': mongoose.Types.ObjectId
    // },
    'description': {
      'type': String,
      'required': true,
      'maxlength': [maxLength, 'description is too long'],
      'minlength': [1, 'description is too short']
    },
    'duration': {
      'type': Number,
      'required': true,
      'min': [1, 'duration too short']
    },
    'date': {
      'type': Number,
      'default': Date.now
    },
    'username': String,
    'userId': {
      'type': String,
      'ref': 'User',
      'index': true
    }
  }))
};
