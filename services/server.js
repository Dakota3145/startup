const express = require('express');
const app = express();


app.use(express.json());

// Endpoints
app.get('/store/:storeName', (req, res) => {
  res.send({ name: req.params.storeName });
});

app.put('/store/:storeName', (req, res) => {
  req.body.updated = true;
  res.send(req.body);
});

app.use(express.static(__dirname + '/public'));

app.use((_req, res) => {
  res.sendFile('index.html', { root: 'public' });
});

module.exports = app;