

module.exports = (app) => {


  app.post('/api/exercise/new-user', (req, res, next) => {

    res.json({ 'user': 'A new User' });
  });

  app.post('/api/exercise/add', (req, res, next) => {

    res.json({ 'exercise': 'The exercise that was added' });
  });

  app.get('/api/exercise/log?{userId}[&from][&to][&limit]', (req, res, next) => {

    res.json({ 'exercise': 'Retrieved exercise' });
  });
};
