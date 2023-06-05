const app = require('./server');
const port = process.argv.length > 2 ? process.argv[2] : 4000;

const httpService = app.listen(port, () => {     
    console.log(`Listening on port ${port}`); 
})

