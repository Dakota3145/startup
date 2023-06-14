# The Typing Game

## Grading Rubric help for Startup Login for TAs
1. Supports new user registration - Found in /public/signup.js line 56-69
2. Supports existing user authentication - Found in /public/index.js line 42-56
3. Stores and retrieves credentials in MongoDB - Functions in /public/index.js line 16-27 and /public/signup.js line 7-31 call backend enpoint calls found in /server.js, those backend endpoint calls make database calls to MongoDB found in /database.js
4. Restricts application functionality based upon authentication - The only page that isn't for login or registration is typing.html, and if someone tries to access typing.html without being logged in, it will immediately send them back to the login page, found in /public/typing.js line 2-4
5. Multiple Git commits with meaningful comments - There's no new commits for this part of the deliverable. The login and registration has been something I've been working on pretty much since the beginning. Every grading rubric since the Startup HTML has asked that we implement some form of login/signup. So I just made the best working version of a login/signup that I could for each deliverable. By the time the Startup Javascript was due, my login/signup was fully functional given mock data. By the time the Startup DB was due, I had already switched all of my mock data to MongoDB data. If you still feel I don't qualify for these points, send me a DM in discord and we can resolve this.

## Grading Rubric help for Startup Websocket for TAs
1. Backend listens for WebSocket connection - Found in /public/index.js which calls /peerProxy.js
2. Frontend makes WebSocket connection - Found in /public/typing.js line 259-260
3. Data sent over WebSocket connection - Found in /public/typing.js line 229
4. WebSocket data displayed in the application interface - Found in /public/typing.js line 272
5. Multiple Git commits with meaningful comments - Roughly 4 commits for Startup Websocket. This one didn't have many commits because the websocket communication was something that either 100% worked or just crashed. I only made a commit when I knew the websocket was working.

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

