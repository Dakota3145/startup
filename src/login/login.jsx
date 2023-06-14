import React from 'react';


function login() {

}

export function Login({ userName }) {
  return (
    <main>
      <div style={{display: "flex", justifyContent: "center"}}>
        <label htmlFor="loginUsername">Username:</label>
        <input type="text" id="loginUsername" name="loginUsername" placeholder="Enter Username" /><br /><br />
      </div>
      <div style={{display: "flex", justifyContent: "center"}}>
        <label htmlFor="loginPassword">Password:</label>
        <input type="password" id="loginPassword" name="loginPassword" placeholder="Enter Password" /><br /><br />
      </div>
      <div style={{display: "flex", justifyContent: "center"}}>
        <button className="btn btn-primary" onClick={() => login()} role="button">Login</button>
        <button className="btn btn-primary" onClick={() => navigate('/signup')} role="button">No Account? Sign up Here</button>
      </div>
    </main>
  );
}