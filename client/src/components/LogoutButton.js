import React from 'react';

import axios from 'axios';
import {navigate} from '@reach/router'

//styling 
import Button from '@material-ui/core/Button';


export default function LogoutButton() {
    function handleClick() {
        axios.delete('http://localhost:8000/api/users/logout', {
            withCredentials: true
        })
        .then(() => navigate('/'))
        .catch(console.log)
    }

    return (
        <>
        {/* <button onClick={handleClick}>Log Out now</button> */}
        <Button variant="contained" color="primary"
        onClick={handleClick}>
        Log Out Now</Button>
        </>
    );
}