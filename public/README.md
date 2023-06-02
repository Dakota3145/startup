# The Typing Game

## Grading Rubric help for Service Startup for T.A's
1. Create an HTTP service using Node.js and Express - Found in /server.js and /index.js
2. Frontend served up using express static middleware - Found in /server.js line 46
3. Your frontend calls third party service endpoints - Found in /public/typing.js line 196-202
4. Your backend provides service endpoints - Found in /server.js
5. Your frontend calls your service endpoints - Found in /public/index.js line 15-21, /public/signup.js line 7-13, line 16-26, /public/typing.js line 16-22, line 130-137

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

