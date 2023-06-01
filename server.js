// const express = require('express');
import express from 'express';
// import * as url from 'url';
const app = express();

app.use(express.json());

// Endpoints
const userData = {
  usernames: ["Henry95", "Josh96", "Jeremy97", "Sam98", "Sarah99", "test"],
  firstNames: ["Henry", "Josh", "Jeremy", "Sam", "Sarah", "TestUser"],
  passwords: ["hotdog", "pineapple", "banana", "strawberry", "blueberry", "test"]
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

export default app;

// const __dirname = url.fileURLToPath(new URL('.', import.meta.url));
app.use(express.static('public'));

app.use((_req, res) => {
  res.sendFile('index.html', { root: 'public' });
});

