// const express = require('express');
import express from 'express';
// import * as url from 'url';
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

export default app;

// const __dirname = url.fileURLToPath(new URL('.', import.meta.url));
app.use(express.static('public'));

app.use((_req, res) => {
  res.sendFile('index.html', { root: 'public' });
});

