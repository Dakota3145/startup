
let leaderboardNames = ["Henry", "Sam", "Josh", "Sarah"];
// request(app)
//     .put('/store/provo')
//     .send({names: leaderboardNames});
let leaderboardLevels = [12, 12, 12, 9];
// request(app)
//     .put('/store/provo')
//     .send({levels: leaderboardLevels});

// async function getLeaderboardData() {
//     const response = await fetch('/leaderboard');
//     const data = await response.json();
//     usernames = data.users.usernames;
//     firstNames = data.users.firstNames;
//     passwords = data.users.passwords;
// }
// getLeaderboardData();
let mockNewDatabaseData = false;
let loadPageTime = new Date().getTime();
let updateSeconds = 10;
let mockNewDataDate = new Date(loadPageTime + updateSeconds*1000);
let didPass = false;
let levels = {
    9: "He is nice",
    12: "You can sit here",
    15: "She went up the hill",
    18: "He was a very kind man",
    21: "You can do it in a week",
    24: "I want to go see a fun movie",
    27: "Do you want to go to a ball game",
    30: "It is a lot of fun to drive a car",
    33: "Do you want to go and get a bite to eat",
    36: "Can you get that to me by the end of the day",
    39: "I can pick you up from your work if you want me to"
}
let logoutBtnEl = document.querySelector("#logoutBtn");
logoutBtnEl.innerText = sessionStorage.getItem("logoutFName");
let currLevel = 9;

function showModal(event = null) {
    if (event != null) {
        event.preventDefault();
    }
    const inputVal = document.querySelector('#typeInput').value;
    let modalEl = document.querySelector('#typingModal');
    let modalText = document.querySelector('#typingModalText');
    let maxLevel = 39;
    if (inputVal != null && inputVal == levels[currLevel]) {
        didPass = true;
        if (currLevel == maxLevel) {
            modalText.innerText = "Passed! You passed all of the levels! Start from the beginning to see if you can pass the levels again!";
        }
        else {
            modalText.innerText = "Passed! Your input matched the given text. Click close to start the next level";
        }
    }
    else {
        didPass = false;
        modalText.innerText = "Missed! Your input didn't match the given text. Click close to start over";
    }
    const msgModal = new bootstrap.Modal(modalEl, {});
    msgModal.show();
    }

    let shouldShowModal = false;

    function finishTimer(event = null) {
    if (event != null) {
        event.preventDefault();
    }
    shouldShowModal = true;
    return false;
}

function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

function removeLeaderboard() {
    let leaderboardList = document.getElementById("leaderboard");
    removeAllChildNodes(leaderboardList)
}

function populateLeaderboard() {
    let list = document.getElementById("leaderboard");
    let leaderboardText = "";
    for (i = 0; i < leaderboardNames.length; ++i) {
        let li = document.createElement('li');
        leaderboardText = `${leaderboardNames[i]}: ${leaderboardLevels[i]} WPM`;
        li.innerText = leaderboardText;
        list.appendChild(li);
    }
}
populateLeaderboard();

// function getLeaderboard() {
    // let databaseLevels = request(app)
    //     .get('/store/provo');
    // console.log(databaseLevels);


    // //This is where I will grab data from database, this is just pretending to grab that data
    // databaseNames = [];
    // databaseLevels = [];
    // if (mockNewDatabaseData) {
    //     databaseNames = ["Henry", "Sam", "Josh", "Sarah", "Jeremy"];
    //     databaseLevels = [12, 12, 12, 9, 9];
    // }
    // else {
    //     databaseNames = ["Henry", "Sam", "Josh", "Sarah"];
    //     databaseLevels = [12, 12, 12, 9];
    // }
    // //only remove and update leaderboard html if it's changed
    // if (JSON.stringify(databaseNames) !== JSON.stringify(leaderboardNames) || 
    //     JSON.stringify(databaseLevels) !== JSON.stringify(leaderboardLevels)) {
    //     leaderboardNames = databaseNames;
    //     leaderboardLevels = databaseLevels;
    //     removeLeaderboard();
    //     populateLeaderboard();
    // }
// }

// getLeaderboard();

function setTimer() {
    // Set the date we're counting down to
    let curr = new Date().getTime();
    numSeconds = 22;
    let countDownDate = new Date(curr + numSeconds*1000);

    // Update the count down every 1 second
    let x = setInterval(function() {
        let now = new Date().getTime();
        let distance = countDownDate - now;
        let seconds = Math.floor((distance % (1000 * 60)) / 1000);
        document.getElementById("demo").innerHTML = seconds + "s";
        if (mockNewDataDate < now) {
            mockNewDatabaseData = true;
        }
        //update database every 5 seconds
        if (Math.floor((now % (1000 * 60)) / 1000) % 5 == 0) {
            //getLeaderboardFromDatabase();
        }
        if (distance < 0) {
            shouldShowModal = true;
        }
        if (shouldShowModal == true) {
            shouldShowModal = false;
            clearInterval(x);
            document.getElementById("demo").innerHTML = "EXPIRED";
            showModal();
        }

    }, 1000);
}

function checkForHighScore() {
    let maxLeaderboardLength = 5;
    let replaceIndex = -1;
    for (let i = leaderboardLevels.length - 1; i >= 0; i--) {
        if (currLevel > leaderboardLevels[i]) {
            replaceIndex = i;
        }
        else if (currLevel == leaderboardLevels[i]) {
            if (i < (maxLeaderboardLength - 1)) {
                replaceIndex = i + 1;
                break;
            }
            else {
                break;
            }
        }
        else {
            break;
        }
    }
    if (replaceIndex > -1) {
        leaderboardLevels.splice(replaceIndex, 0, currLevel);
        leaderboardNames.splice(replaceIndex, 0, sessionStorage.getItem("currFName"));
        if (leaderboardLevels.length > maxLeaderboardLength) {
            leaderboardLevels = leaderboardLevels.slice(0, maxLeaderboardLength);
            leaderboardNames = leaderboardNames.slice(0, maxLeaderboardLength);
        }
        removeLeaderboard();
        populateLeaderboard();
    }
}

function changeLevel() {
    //TODO: change html inner text of the typing level
    document.getElementById("typeInput").value = "";
    if (didPass) {
        if (currLevel < 39) {
            currLevel += 3;
        }
        else {
            checkForHighScore();
            currLevel = 9;
        }
    }
    else {
        checkForHighScore();
        currLevel = 9;
    }
    let levelNum = document.querySelector('#levelNum');
    levelNum.innerText = `Level: ${currLevel} WPM`;
    let levelText = document.querySelector('#levelText');
    levelText.innerText = levels[currLevel];
    setTimer();
}

function replaceLeaderboard() {
    let list = document.getElementById("leaderboard");
    let li = document.createElement('li');
    li.innerText = "Jeremy: 9 WPM";
    list.appendChild(li);
    }

setTimer();
