/**
 * Javascript for index.html
 */

let currUsername = sessionStorage.getItem("currUsername");
let currFName = sessionStorage.getItem("currFName");
let logoutFName = sessionStorage.getItem("logoutFName");

let usernames = [];
let firstNames = [];
let passwords = [];

function getUsersData() {
    usernames = ["Henry95", "Josh96", "Jeremy97", "Sam98", "Sarah99", "test"];
    firstNames = ["Henry", "Josh", "Jeremy", "Sam", "Sarah", "TestUser"];
    passwords = ["hotdog", "pineapple", "banana", "strawberry", "blueberry", "test"];
}

getUsersData();

function login(event = null) {
    if (event != null) {
        event.preventDefault();
    }
    let usernameInput = document.querySelector("#loginUsername").value;
    let usernameIndex = usernames.indexOf(usernameInput);
    let modalEl = document.querySelector('#loginModal');
    let modalText = document.querySelector('#loginModalText');
    const msgModal = new bootstrap.Modal(modalEl, {});
    //if the username is found, compare it with the password and then open typing.html
    if (usernameIndex > -1) {
        let passwordInput = document.querySelector("#loginPassword").value;
        if (passwordInput == passwords[usernameIndex]) {
            sessionStorage.setItem("currUsername", usernameInput);
            sessionStorage.setItem("currFName", firstNames[usernameIndex]);
            sessionStorage.setItem("logoutFName", firstNames[usernameIndex] + " - Logout");
            // let logoutEl = document.querySelector("#logoutBtn");
            // logoutEl.innerText = currFName + " - Logout";
            // logoutFName = sessionStorage.currFName + " - Logout";
            window.open("typing.html", "_self");
        }
        else {
            modalText.innerText = "The Password inputted doesn't match the password saved for that username";
            msgModal.show();
        }
    }
    else {
        modalText.innerText = "Username not found";
        msgModal.show();
    }
}

/**
 * Javascript for signup.html
 */

 function signup(event = null) {
    if (event != null) {
        event.preventDefault();
    }
    let fnameInput = document.querySelector("#signupFName").value;
    let usernameInput = document.querySelector("#signupUsername").value;
    let usernameIndex = usernames.indexOf(usernameInput);
    let modalEl = document.querySelector('#signupModal');
    let modalText = document.querySelector('#signupModalText');
    const msgModal = new bootstrap.Modal(modalEl, {});
    let passwordInput = document.querySelector("#signupPassword").value;
    let errorStr = "";
    //only allow new usernames
    if (fnameInput == "") {
        errorStr += "You need to enter a first name\n";
    }
    if (usernameInput == "") {
        errorStr += "You need to enter a username\n";
    }
    if (passwordInput == "") {
        errorStr += "You need to enter a password";
    }
    if (errorStr == "") {
        if (usernameIndex == -1) {
            sessionStorage.setItem("currUsername", usernameInput);
            sessionStorage.setItem("currFName", fnameInput);
            // let logoutEl = document.querySelector("#logoutBtn");
            // logoutEl.innerText = currFName + " - Logout";
            sessionStorage.setItem("logoutFName", fnameInput + " - Logout");
            window.open("typing.html", "_self");
        }
        //if username is already saved, show error modal
        else {
            modalText.innerText = "Username is already in use. Try another username";
            msgModal.show();
        }
    }
    else {
        modalText.innerText = errorStr;
        msgModal.show();
    }

}

/**
 * Javascript for typing.html
 */

let leaderboardNames = ["Henry", "Sam", "Josh", "Sarah"];
let leaderboardLevels = [12, 12, 12, 9];
let mockNewDatabaseData = false;
let loadPageTime = new Date().getTime();
let updateSeconds = 10;
let mockNewDataDate = new Date(loadPageTime + updateSeconds*1000);
let didPass = false;
let levels = {
    9: "He is nice",
    12: "You can sit here",
    15: "She went up the hill",
    21: "You can do it in a week",
    24: "I want to go see a fun movie",
    27: "Do you want to go to a ball game",
    30: "It is a lot of fun to drive a car",
    33: "Do you want to go and get a bite to eat",
    36: "Can you get that to me by the end of the day",
    39: "I can pick you up from your work if you want me to"
}
let logoutBtnEl = document.querySelector("#logoutBtn");
console.log(sessionStorage.getItem("logoutFName"));
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

function getLeaderboardFromDatabase() {
    //This is where I will grab data from database, this is just pretending to grab that data
    databaseNames = [];
    databaseLevels = [];
    if (mockNewDatabaseData) {
        databaseNames = ["Henry", "Sam", "Josh", "Sarah", "Jeremy"];
        databaseLevels = [12, 12, 12, 9, 9];
    }
    else {
        databaseNames = ["Henry", "Sam", "Josh", "Sarah"];
        databaseLevels = [12, 12, 12, 9];
    }
    //only remove and update leaderboard html if it's changed
    if (JSON.stringify(databaseNames) !== JSON.stringify(leaderboardNames) || 
        JSON.stringify(databaseLevels) !== JSON.stringify(leaderboardLevels)) {
        leaderboardNames = databaseNames;
        leaderboardLevels = databaseLevels;
        removeLeaderboard();
        populateLeaderboard();
    }
}

getLeaderboardFromDatabase();

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
    console.log("current user's FName: ", sessionStorage.getItem("currFName"));
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
    console.log("replace index: ", replaceIndex);
    if (replaceIndex > -1) {
        leaderboardLevels.splice(replaceIndex, 0, currLevel);
        leaderboardNames.splice(replaceIndex, 0, sessionStorage.getItem("currFName"));
        console.log("leaderboard Names: ", leaderboardNames);
        console.log("leaderboard levels: ", leaderboardLevels);
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
