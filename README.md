# The Typing Game

## Grading Rubric help for Startup React for TAs
1. Bundled using Vite - found in /vite.config.js
2. Multiple functional react components - found in /app.jsx
3. React router - found in /app.jsx
4. React hooks - found in /src/login/login.jsx line 9-10, 62, found in /src/signup/signup.jsx line 10-12, 96, 100, 104
5. Multiple Git commits with meaningful comments - Roughly 12 commits for Startup React

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

