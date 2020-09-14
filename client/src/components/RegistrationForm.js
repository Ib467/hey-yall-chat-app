import React, { useCallback, useState } from 'react';
import axios from 'axios';
import { navigate } from '@reach/router';

export default function RegistrationForm() {
    const [formState, setFormState] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        passwordConfirmation: ''
    });


    function handleChange(event) {
        const { name, value } = event.target;

        setFormState({
            ...formState,
            [name]: value
        });
    }

    function handleSubmit(event) {
        event.preventDefault();

        axios.post('http://localhost:8000/api/users', formState, {
            withCredentials: true

        })
            .then(() => {
                navigate('/inside')
            })
            .catch(() => console.log);
    }


    return (
        <form onSubmit={handleSubmit}>
            {/* <div>
                <label>First Name</label>
                <input
                    name="firstName"
                    value={formState.firstName}
                    onChange={handleChange}
                />
            </div>

            <div>
                <label>Last Name</label>
                <input
                    name="lastName"
                    value={formState.lastName}
                    onChange={handleChange}
                />
            </div>


            <div>
                <label>Email</label>
                <input
                    name="email"
                    value={formState.email}
                    onChange={handleChange}
                />
            </div>


            <div>
                <label>Password</label>
                <input
                    name="password"
                    type="password"
                    value={formState.password}
                    onChange={handleChange}
                />
            </div>

            <div>
                <label>Password Confirmation</label>
                <input
                    name="passwordConfirmation"
                    type="password"
                    value={formState.passwordConfirmation}
                    onChange={handleChange}
                />
            </div>

            <button>Submit</button> */}



            <div class="login-wrapper is-grouped is-grouped-right">
                <h3 class="is-size-1"> Register</h3>

                <div class="field">
                    <div class="control">
                        <input class="input" name="firstName" placeholder="First Name"
                        value={formState.firstName}
                        onChange={handleChange} />
                    </div>
                </div>
                <div class="field">
                    
                    <div class="control">
                        <input class="input" name="lastName" placeholder="Last Name" 
                         value={formState.lastName}
                         onChange={handleChange}/>
                    </div>
                </div>

                <div class="field ">
                        <p class="control has-icons-left has-icons-right">
                        <input class="input" name='email' type="email" placeholder="Email" 
                        value={formState.email}
                        onChange={handleChange} 
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
                            <input class="input" name="password" type="password" placeholder="Password" 
                            value={formState.password}
                            onChange={handleChange}
                            />
                            <span class="icon is-small is-left">
                                <i class="fas fa-lock"></i>
                            </span>
                        </p>
                </div>
                <div class="field " >
                        <p class="control has-icons-left">
                            <input class="input" name="passwordConfirmation" type="password" placeholder="Password Confirmation" 
                            value={formState.passwordConfirmation}
                            onChange={handleChange}
                            />
                            <span class="icon is-small is-left">
                                <i class="fas fa-lock"></i>
                            </span>
                        </p>
                </div>

                <button class="button is-success">
                                Register
                            </button>







            </div>
        </form>
    )
}