const { MongoClient } = require('mongodb');
const config = require('./dbConfig.json');

const url = `mongodb+srv://${config.userName}:${config.password}@${config.hostname}`;
const client = new MongoClient(url);
const db = client.db('myDB');
const userCollection = db.collection('users');
const leaderboardCollection = db.collection('leaderboard');

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

async function addScore(score) {
    const result = await leaderboardCollection.insertOne(score);
    return result;
}

async function getLeaderboard() {
    const options = {
      sort: { level: -1 },
      limit: 5,
    };
    const cursor = await leaderboardCollection.find({}, options);
    const cursorArray = await cursor.toArray();
    return cursorArray;
}

async function deleteScore(score) {
    try {
        const result = leaderboardCollection.deleteOne( 
            { 
                "username" : score.username,
                "level": score.level 
            } );
        return result;
     } catch (error) {
        console.log("failed to delete score because: ", error.message);
     }
}

module.exports = { addUser, getUsers, addScore, getLeaderboard, deleteScore };