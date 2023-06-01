// const express = require('express');
import express from 'express';
// import * as url from 'url';
const app = express();

app.use(express.json());

// Endpoints
const data = {
  usernames: ["Henry95", "Josh96", "Jeremy97", "Sam98", "Sarah99", "test"],
  firstNames: ["Henry", "Josh", "Jeremy", "Sam", "Sarah", "TestUser"],
  passwords: ["hotdog", "pineapple", "banana", "strawberry", "blueberry", "test"]
}

app.get('/users', (req, res) => {
  res.send({ users:data });
});

app.put('/users', (req, res) => {
  data.usernames.push(req.body.username);
  data.firstNames.push(req.body.firstname);
  data.passwords.push(req.body.password);
  console.log(data);
  res.send({ users:data });
});

export default app;

// const __dirname = url.fileURLToPath(new URL('.', import.meta.url));
app.use(express.static('public'));

app.use((_req, res) => {
  res.sendFile('index.html', { root: 'public' });
});

