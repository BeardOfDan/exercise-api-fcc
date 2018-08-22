
const User = require('../models/users');
const Exercise = require('../models/exercise');

const { maxLength } = require('../config/keys');

module.exports = (app) => {
  app.post('/api/exercise/new-user', async (req, res, next) => {
    const { username } = res.body;

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
      const newUser = await new User({ username }).save();

      return res.json({
        'username': newUser.username,
        '_id': newUser._id
      });
    }

    return res.json({ 'error': `A user with the username '${username}' already exists` })
  });

  app.get('/api/exercise/users', async (req, res, next) => {
    res.json(await User.find({}));
  });

  app.post('/api/exercise/add', (req, res, next) => {

    res.json({ 'exercise': 'The exercise that was added' });
  });

  app.get('/api/exercise/log?{userId}[&from][&to][&limit]', (req, res, next) => {

    res.json({ 'exercise': 'Retrieved exercise' });
  });
};
