
const mongoose = require('mongoose');

const User = mongoose.model('User');
const Exercise = mongoose.model('Exercise');

const { maxLength } = require('../config/keys');

const moment = require('moment');

module.exports = (app) => {
  app.post('/api/exercise/new-user', async (req, res, next) => {
    const { username } = req.body;

    // validate user input
    if (typeof username !== 'string') {
      return res.json({ 'error': 'username must be a string' });
    } else if (username.length < 1) {
      return res.json({ 'error': 'username cannot be an empty string' });
    } else if (username.length > maxLength) {
      return res.json({ 'error': `username cannot exceed ${maxLength} characters` });
    }

    const user = await User.findOne({ username });

    if (user === null) { // new user
      const newUser = await new User({ username }).save()
        .catch(() => {
          return res.json({ 'error': 'could not save the new user' });
        });

      return res.json({
        'username': newUser.username,
        '_id': newUser._id
      });
    }

    return res.json({ 'error': `A user with the username '${username}' already exists` });
  });

  app.get('/api/exercise/users', async (req, res, next) => {
    return res.json(
      await User.find({})
        .catch(() => {
          return res.json({ 'error': 'could not find users' });
        })
    );
  });

  app.post('/api/exercise/add', async (req, res, next) => {
    const { _id, description, duration } = req.body;
    let { date } = req.body;

    // date is optional, so handle creation, if needed
    if (date === undefined) {
      date = Date.now();

      console.log('\ndate: ' + date + '\n');

    } else if (typeof date !== 'number') {
      return res.json({ 'error': 'date must be Unix time stamp' });
    }

    // validate user input
    if (typeof _id !== 'string') {
      return res.json({ 'error': '_id must be a string' });
    } else if (typeof description !== 'string') {
      return res.json({ 'error': 'description must be a string' });
    } else if (typeof duration !== 'number') {
      return res.json({ 'error': 'duration must be a number' });
    }

    // find user that corresponds to _id
    const user = await User.findOne({ _id })
      .catch(() => {
        return res.json({ 'error': 'could not search for the user' });
      });

    if (user === null) {
      return res.json({ 'error': `no user with an _id of ${_id} was found` });
    }

    // Add the exercise
    const savedExercise = await new Exercise({
      description, duration, date,
      'username': user.username,
      'userId': user._id
    }).save();

    return res.json(savedExercise);
  });

  app.get('/api/exercise/log', async (req, res, next) => {
    const { userId, from, to, limit } = req.query;
    const _id = userId;

    if (typeof _id !== 'string') {
      return res.json({ 'error': 'need a string userId' });
    }

    let log = []; // initializing here, to avoid scoping issue

    if (from === undefined) { // no date filter
      if (limit === undefined) {
        log = await Exercise.find({ 'userId': _id }).sort({ 'date': -1 });
      } else {
        log = await Exercise.find({ 'userId': _id }).sort({ 'date': -1 }).limit(limit);
      }
    } else { // apply date filter
      const start = moment(from).unix() * 1000; // multiply by 1000 to convert to miliseconds
      const finish = moment(to).unix() * 1000;

      if (limit === undefined) {
        log = await Exercise.find({ 'userId': _id, date: { $gte: start, $lte: finish } }).sort({ 'date': -1 });
      } else {
        log = await Exercise.find({ 'userId': _id, date: { $gte: start, $lte: finish } }).sort({ 'date': -1 }).limit(limit);
      }
    }

    res.json({ log, 'count': log.length });
  });
};
