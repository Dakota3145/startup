const express = require('express');
const app = express();
const DB = require('./database.js');

app.use(express.json());

// Endpoints
const userData = {
  usernames: ["Henry95", "Josh96", "Jeremy97", "Sam98", "Sarah99", "test"],
  firstNames: ["Henry", "Josh", "Jeremy", "Sam", "Sarah", "TestUser"],
  passwords: ["hotdog", "pineapple", "banana", "strawberry", "blueberry", "test"]
}

const leaderboardData = {
  names: ["Henry", "Sam", "Josh", "Sarah"],
  levels: [12, 12, 12, 9]
}

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

// app.get('/leaderboard', (req, res) => {
//   res.send({ leaderboard:leaderboardData });
// });

// app.put('/leaderboard', (req, res) => {
//   leaderboardData.names = req.body.names;
//   leaderboardData.levels = req.body.levels;
//   console.log(leaderboardData);
//   res.send({ leaderboard:leaderboardData });
// });

app.use(express.static('public'));

app.use((_req, res) => {
  res.sendFile('index.html', { root: 'public' });
});

module.exports = app;
