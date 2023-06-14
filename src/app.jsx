import React from 'react';
import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import { Login } from './login/login.jsx';
import { Signup } from './signup/signup.jsx';
import { Typing } from './typing/typing.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';

function App() {
  const [userName, setUserName] = React.useState(sessionStorage.getItem('userName') || '');

  return (
    <BrowserRouter>
        <header>
            <img
                src="https://img.uxwing.com/wp-content/themes/uxwing/download/web-app-development/typing-icon.svg"
                width="100"
            />
            <h1>The Typing Game</h1>
            <h2>Dakota Stevens</h2>
        </header>

        <Routes>
          <Route
            path='/'
            element={
              <Login/>
            }
            exact
          />
          <Route path='/signup' element={<Signup />} />
          <Route path='/typing' element={<Typing userName={userName} />} />
          <Route path='*' element={<NotFound />} />
        </Routes>

        <footer>
            <a className="btn btn-primary" href="https://github.com/Dakota3145/startup" role="button">Check out the Source Code Here</a>
        </footer>
    </BrowserRouter>
  );
}

function NotFound() {
  return <main className='container-fluid bg-secondary text-center'>404: Return to sender. Address unknown.</main>;
}

export default App;