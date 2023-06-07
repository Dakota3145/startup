# The Typing Game

## Grading Rubric help for Startup DB for TAs
1. MongoDB Atlas database created - <img width="800" alt="Screen Shot 2023-06-06 at 4 48 20 PM" src="https://github.com/Dakota3145/startup/assets/77128933/b9cada5f-446b-4d87-bad3-7921e79114ae">

2. Provides backend endpoints for manipulating application data - Found in /server.js
3. Stores application data in MongoDB - MongoDB functions in /database.js, MongoDB calls found in /public/index.js line 16-27, /public/signup.js line 7-31, and /public/typing.js line 20-31, line 104-121, and line 155-187 
4. Multiple Git commits with meaningful comments - Roughly 7 commits for Startup DB

## Elevator Pitch
Have you ever wondered how fast you type? Are you looking for a new challenge? Try out this new Typing Game! Take on increasingly harder levels of typing and see how fast you can type! Leaderboards show who's the best typer out there. Can you be the best typer? Find out with the Typing Game!

<img width="782" alt="Screen Shot 2023-05-08 at 2 33 35 PM" src="https://user-images.githubusercontent.com/77128933/236928635-747e3c71-411a-4954-9976-78ce331f6d91.png">

## Features:
  1. Login to show your name when you get a high score
  2. Type increasingly difficult levels to find out how fast you can type
  3. The fastest 5 typers will have their names and their scores displayed on the leaderboard
  4. Anytime someone gets a score that makes the leaderboard, all other users will get a notification for it

## Technologies Used:
  1. Authentication: Each user will login so the website can send the user's name to the leaderboard.
  2. Database Data: The Leaderboard will be stored in a database and displayed for the user to see
  3. Websocket Data: The notifications will be real-time updates sent from other users when that other user gets a new high score that makes it to the leaderboard

