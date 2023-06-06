
let usernames = [];
let firstNames = [];
let passwords = [];


async function getUsersData() {
    const response = await fetch('/api/users');
    const data = await response.json();
    usernames = data.map(data => data.username);
    firstNames = data.map(data => data.firstname);
    passwords = data.map(data => data.password);
}
getUsersData();

async function addUser(user) {
    try {
        const response = await fetch('/api/user', {
            method: 'POST',
            body: JSON.stringify(user),
            headers: {
                'content-type': 'application/json'
            }
        })
        const data = await response.json();
        console.log(data);
    }   
    catch (error) {
        console.log("Failed to add user because: ", error.message);
    }
}

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
            let user = {
                username: usernameInput,
                firstname: fnameInput,
                password: passwordInput
            }
            addUser(user);
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
