/**
 * Javascript for index.html
 */


let currUsername = sessionStorage.getItem("currUsername");
let currFName = sessionStorage.getItem("currFName");
let logoutFName = sessionStorage.getItem("logoutFName");


let usernames = [];
let firstNames = [];
let passwords = [];


async function getUsersData() {
    try {
        const response = await fetch('/api/users');
        const data = await response.json();
        usernames = data.map(data => data.username);
        firstNames = data.map(data => data.firstname);
        passwords = data.map(data => data.password);
    }
    catch (error) {
        console.log("Failed to add user because: ", error.message);
    }
}

// addUser( { username: 'joe23', firstname: 'joe', password: 'oreo' });
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

/**
 * Javascript for typing.html
 */
