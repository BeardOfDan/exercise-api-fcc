const express = require('express');
const app = express();

app.use(express.json());

const mongoose = require('mongoose');

const PORT = process.env.PORT || 5000;
const KEYS = require('./config/keys');

mongoose.connect(KEYS.mongoURI, { 'useNewUrlParser': true });

// Run models code
require('./models/user');
require('./models/exercise');

app.get('/', (req, res, next) => {
  res.send('Welcome to the Exercise Tracker API');
});

require('./routes/apiRoutes')(app);

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
