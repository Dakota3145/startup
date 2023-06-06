
console.log("currUsername sessionStorage: ", sessionStorage.getItem("currUsername"));
if (sessionStorage.getItem("currUsername") == null) {
    window.open("index.html", "_self");
}

let leaderboardNames = [];
let leaderboardLevels = [];

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

async function getLeaderboardData() {
    try {
        const response = await fetch('/api/leaderboard');
        const data = await response.json();
        leaderboardNames = data.map(data => data.username);
        leaderboardLevels = data.map(data => data.level);
    }
    catch (error) {
        console.log("Failed to add user because: ", error.message);
    }
    // const response = await fetch('/leaderboard');
    // const data = await response.json();
    // leaderboardNames = data.leaderboard.names;
    // leaderboardLevels = data.leaderboard.levels;
    populateLeaderboard();
}

getLeaderboardData();
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
if (sessionStorage.getItem("logoutFName").length > 0) {
    logoutBtnEl.innerText = sessionStorage.getItem("logoutFName");
}
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
        document.getElementById("timer").innerHTML = seconds + "s";
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
            document.getElementById("timer").innerHTML = "EXPIRED";
            showModal();
        }

    }, 1000);
}

async function addScoreData(score) {
    try {
        const response = await fetch('/api/score', {
            method: 'POST',
            body: JSON.stringify(score),
            headers: {
                'content-type': 'application/json'
            }
        })
        const data = await response.json();
        console.log(data);
    }   
    catch (error) {
        console.log("Failed to add score because: ", error.message);
    }
}

async function deleteScoreData(score) {
    try {
        const response = await fetch('/api/score', {
            method: 'DELETE',
            body: JSON.stringify(score),
            headers: {
                'content-type': 'application/json'
            }
        })
        const data = await response.json();
        console.log(data);
    }   
    catch (error) {
        console.log("Failed to delete score because: ", error.message);
    }
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
        if (leaderboardLevels.length == maxLeaderboardLength) {
            const removeScore = {
                "username": leaderboardNames[maxLeaderboardLength - 1],
                "level": leaderboardLevels[maxLeaderboardLength - 1]
            }
            deleteScoreData(removeScore);
        }
        const addScore = {
            "username": sessionStorage.getItem("currUsername"),
            "level": currLevel
        }
        removeLeaderboard();
        addScoreData(addScore);
        getLeaderboardData();
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

async function setRandomName() {
    const response = await fetch("https://randomuser.me/api/");
    const data = await response.json();
    const randomName = data.results[0].name.first;
    let notification = document.querySelector('#notification');
    notification.innerText = randomName + ' just got 9 WPM!';
}

setRandomName();

setTimer();
