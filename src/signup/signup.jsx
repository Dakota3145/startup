import React from 'react';
import { useNavigate } from 'react-router-dom';

export function Signup() {
    const navigate = useNavigate();
    let usernames = [];
    let firstNames = [];
    let passwords = [];

    const [firstnameInput, setFirstnameInput] = React.useState('');
    const [usernameInput, setUsernameInput] = React.useState('');
    const [passwordInput, setPasswordInput] = React.useState('');


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
        // let fnameInput = document.querySelector("#signupFName").value;
        // let usernameInput = document.querySelector("#signupUsername").value;
        let usernameIndex = usernames.indexOf(usernameInput);
        let modalEl = document.querySelector('#signupModal');
        let modalText = document.querySelector('#signupModalText');
        const msgModal = new bootstrap.Modal(modalEl, {});
        // let passwordInput = document.querySelector("#signupPassword").value;
        let errorStr = "";
        //only allow new usernames
        if (firstnameInput == "") {
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
                sessionStorage.setItem("currFName", firstnameInput);
                // let logoutEl = document.querySelector("#logoutBtn");
                // logoutEl.innerText = currFName + " - Logout";
                sessionStorage.setItem("logoutFName", firstnameInput + " - Logout");
                let user = {
                    username: usernameInput,
                    firstname: firstnameInput,
                    password: passwordInput
                }
                addUser(user);
                window.open("typing", "_self");
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

    return (
        <main>
            <div style={{display: "flex", justifyContent: "center"}}>
                <label htmlFor="signupFName">Enter First Name:</label>
                <input type="text" id="signupFName" name="signupFName" placeholder="Enter First Name" value={firstnameInput} onChange={(e) => setFirstnameInput(e.target.value)}/><br /><br />
            </div>
            <div style={{display: "flex", justifyContent: "center"}}>
                <label htmlFor="signupUsername">Create a Username:</label>
                <input type="text" id="signupUsername" name="signupUsername" placeholder="Enter Username" value={usernameInput} onChange={(e) => setUsernameInput(e.target.value)}/><br /><br />
            </div>
            <div style={{display: "flex", justifyContent: "center"}}>
                <label htmlFor="signupPassword">Create a Password:</label>
                <input type="password" id="signupPassword" name="signupPassword" placeholder="Enter Password" value={passwordInput} onChange={(e) => setPasswordInput(e.target.value)}/><br /><br />
            </div>
            <div style={{display: "flex", justifyContent: "center"}}>
                <button className="btn btn-primary" onClick={() => navigate('/')} role="button">Back to Login</button>
                <button className="btn btn-primary" onClick={() => signup()} role="button">Create Account</button>
            </div>
            <div className="modal fade" id="signupModal" tabIndex="-1">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content text-dark">
                        <div className="modal-body" id="signupModalText">Username already in use</div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );

}