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
  const style = '';
  res.send(`<div style="text-align: center"><br><br><h3>Welcome to the Exercise Tracker API</h3><br><br><p>NOTE: The api paths are prefixed with \'<strong style="${style}">/api/exercise</strong>\', so to create a new user, POST to \'<strong style="${style}">/api/exercise/new-user</strong>\'</p></div>`);
});

require('./routes/apiRoutes')(app);

app.listen(PORT, () => {
  console.log(`\nListening on port ${PORT}\n`);
});
