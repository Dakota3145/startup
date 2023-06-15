import React from 'react';
import { useNavigate } from 'react-router-dom';

export function Login() {
    const navigate = useNavigate();
    let usernames = [];
    let firstNames = [];
    let passwords = [];
    const [usernameInput, setUsernameInput] = React.useState('');
    const [passwordInput, setPasswordInput] = React.useState('');

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

    getUsersData();

    function login(event = null) {
        if (event != null) {
            event.preventDefault();
        }
        // let usernameInput = document.querySelector("#loginUsername").value;
        // let usernameIndex = usernames.indexOf(usernameInput);
        let usernameIndex = usernames.indexOf(usernameInput);
        let modalEl = document.querySelector('#loginModal');
        let modalText = document.querySelector('#loginModalText');
        const msgModal = new bootstrap.Modal(modalEl, {});
        //if the username is found, compare it with the password and then open typing.html
        if (usernameIndex > -1) {
            // let passwordInput = document.querySelector("#loginPassword").value;
            if (passwordInput == passwords[usernameIndex]) {
                sessionStorage.setItem("currUsername", usernameInput);
                sessionStorage.setItem("currFName", firstNames[usernameIndex]);
                sessionStorage.setItem("logoutFName", firstNames[usernameIndex] + " - Logout");
                // window.open("typing", "_self");
                navigate('typing');
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

    return (
        <main>
            <div style={{display: "flex", justifyContent: "center"}}>
                <label htmlFor="loginUsername">Username:</label>
                <input type="text" id="loginUsername" name="loginUsername" placeholder="Enter Username" value={usernameInput} onChange={(e) => setUsernameInput(e.target.value)}/><br /><br />
            </div>
            <div style={{display: "flex", justifyContent: "center"}}>
                <label htmlFor="loginPassword">Password:</label>
                <input type="password" id="loginPassword" name="loginPassword" placeholder="Enter Password" value={passwordInput} onChange={(e) => setPasswordInput(e.target.value)}/><br /><br />
            </div>
            <div style={{display: "flex", justifyContent: "center"}}>
                <button className="btn btn-primary" onClick={() => login()} role="button">Login</button>
                <button className="btn btn-primary" onClick={() => navigate('/signup')} role="button">No Account? Sign up Here</button>
            </div>
            <div className="modal fade" id="loginModal" tabIndex="-1">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content text-dark">
                        <div className="modal-body" id="loginModalText">Username not Found</div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}