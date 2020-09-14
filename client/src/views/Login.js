import React, { useState } from 'react';
import axios from 'axios';
import { navigate } from '@reach/router';
import RegistrationForm from '../components/RegistrationForm';
import logo from './hey-yall.jpg';

export default function Login(props) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [err, setErr] = useState('');
    const [loggedName, setLoggedName] = useState('')

    function handleSubmit(event) {
        event.preventDefault();
        setErr('');
        axios.post('http://localhost:8000/api/users/login', {
            email,
            password
        }, { withCredentials: true })
            .then(response => {
                props.setLoggedName(response.data.name);
                console.log(response.data.name);
                navigate('/inside')
            })
            .catch(() => setErr('Please check your credentials!'));

    }

    return (
        <>
            

       
        <div class="notification container login_container">
        <img src={logo} alt='howdy' style={{"height" : "25%", "width" : "25%"}}/>
            <div class="">
                {/* <h1>Login/Reg</h1> */}
                {err && (
                    <p style={{ color: 'red' }}>{err}</p>
                )}
                <form onSubmit={handleSubmit}>

                    
                    {/* <div>
                        <label>Email</label>
                        <input
                            name="email"
                            value={email}
                            onChange={e => setEmail(e.target.value)}

                        />
                    </div> */}
                    {/* <div>
                        <label>password</label>
                        <input
                            name="password"
                            type="password"
                            value={password}
                            onChange={e => setPassword(e.target.value)}

                        />
                    </div> */}
                <div class="login-wrapper is-grouped is-grouped-left notification">
                <h3 class="is-size-1"> Login </h3>
                    <div class="field ">
                        <p class="control has-icons-left has-icons-right">
                        <input class="input" type="email" placeholder="Email"  value={email}
                        onChange={e => setEmail(e.target.value)}
                        />
                        <span class="icon is-small is-left">
                            <i class="fas fa-envelope"></i>
                        </span>
                        <span class="icon is-small is-right">
                            <i class="fas fa-check"></i>
                        </span>
                    </p>
                    </div>
                    <div class="field " >
                        <p class="control has-icons-left">
                            <input class="input" type="password" placeholder="Password" 
                            onChange={e => setPassword(e.target.value)}
                            />
                            <span class="icon is-small is-left">
                                <i class="fas fa-lock"></i>
                            </span>
                        </p>
                    </div>
                    <div class="field is-grouped is-grouped-left" >
                        <p class="control">
                            <button class="button is-success">
                                Login
                            </button>
                        </p>
                    </div>
                </div>


                    {/* <button>Submit</button> */}
                </form>
            </div>

                
                <div class="notification">
                    {/* This container is <strong>centered</strong> on desktop. */}
                    <RegistrationForm />
                </div>
        </div>


       
        </>
    );
}