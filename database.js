const { MongoClient } = require('mongodb');
const config = require('./dbConfig.json');

const url = `mongodb+srv://${config.userName}:${config.password}@${config.hostname}`;
const client = new MongoClient(url);
const db = client.db('myDB');
const userCollection = db.collection('users');

// This will asynchronously test the connection and exit the process if it fails
(async function testConnection() {
    await client.connect();
    await db.command({ ping: 1 });
})().catch((ex) => {
    console.log(`Unable to connect to database with ${url} because ${ex.message}`);
    process.exit(1);
});

async function addUser(user) {
    const result = await userCollection.insertOne(user);
    return result;
}

async function getUsers() {
    const options = {
      sort: { username: 1 },
      limit: 1000000,
    };
    const cursor = await userCollection.find({}, options);
    const cursorArray = await cursor.toArray();
    return cursorArray;
}

module.exports = { addUser, getUsers };