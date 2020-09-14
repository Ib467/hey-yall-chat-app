import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import {Router, Redirect, Link, navigate} from '@reach/router';
import axios from 'axios';
import Login from './views/Login';
import Inside from './views/Inside';
import Registration from './components/RegistrationForm'


import Webcam from './views/Webcam';


function App() {
  const [loggedName, setLoggedName] = useState('')
  return (
    <div className="App">
      
        <Router>
          <Login loggedName={loggedName} setLoggedName={setLoggedName} path='/' />
          <Inside loggedName={loggedName} setLoggedName={setLoggedName} path='inside' />
        </Router>
    </div>
  );
}

export default App;
