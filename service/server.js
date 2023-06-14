const express = require('express');
const app = express();
const DB = require('./database.js');

app.use(express.json());

app.set('trust proxy', true);

// Endpoints

let apiRouter = express.Router();
app.use(`/api`, apiRouter);


apiRouter.get('/users', async (_req, res) => {
  const users = await DB.getUsers();
  res.send(users);
});

apiRouter.post('/user', async (req, res) => {
  DB.addUser(req.body);
  const users = await DB.getUsers();
  res.send(users);
});

apiRouter.get('/leaderboard', async (_req, res) => {
  const leaderboard = await DB.getLeaderboard();
  res.send(leaderboard);
});

apiRouter.post('/score', async (req, res) => {
  DB.addScore(req.body);
  const leaderboard = await DB.getLeaderboard();
  res.send(leaderboard);
});

apiRouter.delete('/score', async (req, res) => {
  DB.deleteScore(req.body);
  const leaderboard = await DB.getLeaderboard();
  res.send(leaderboard);
});

// app.use(express.static('public'));

// app.use((_req, res) => {
//   res.sendFile('index.html', { root: 'public' });
// });

module.exports = app;
