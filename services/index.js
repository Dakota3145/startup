const http = require('http');


const express = require('express');
const app = express();
const port = process.argv.length > 2 ? process.argv[2] : 4000;

app.listen(8080);

app.use(express.static(__dirname + '/public'));

app.use((_req, res) => {
    res.sendFile('index.html', { root: 'public' });
});

const httpService = app.listen(port, () => {     
    console.log(`Listening on port ${port}`); 
})
