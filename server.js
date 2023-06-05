const express = require('express');
const app = express();

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

app.get('/users', (req, res) => {
  res.send({ users:userData });
});

app.put('/users', (req, res) => {
  userData.usernames.push(req.body.username);
  userData.firstNames.push(req.body.firstname);
  userData.passwords.push(req.body.password);
  console.log(userData);
  res.send({ users:userData });
});

app.get('/leaderboard', (req, res) => {
  res.send({ leaderboard:leaderboardData });
});

app.put('/leaderboard', (req, res) => {
  leaderboardData.names = req.body.names;
  leaderboardData.levels = req.body.levels;
  console.log(leaderboardData);
  res.send({ leaderboard:leaderboardData });
});

app.use(express.static('public'));

app.use((_req, res) => {
  res.sendFile('index.html', { root: 'public' });
});

module.exports = app;
