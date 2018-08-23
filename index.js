const express = require('express');
const app = express();

app.use(express.json());

const PORT = process.env.PORT || 5000;
const KEYS = require('./config/keys');

const mongoose = require('mongoose');

mongoose.connect(KEYS.mongoURI, { 'useNewUrlParser': true });

// Run models code
require('./models/user');
require('./models/exercise');

app.get('/', (req, res, next) => {
  res.send('Welcome to the Exercise Tracker API');
});

require('./routes/apiRoutes')(app);

app.listen(PORT, () => {
  console.log(`\nListening on port ${PORT}\n`);
});
