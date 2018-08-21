const express = require('express');

const apiRoutes = require('./routes/api');

const app = express();

const PORT = process.env.PORT || 5000;

app.get('/', (req, res, next) => {
  res.send('Welcome to the Exercise Tracker API');
});

apiRoutes(app);

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
