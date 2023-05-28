import React, { useState } from 'react';
import {Link, useNavigate} from 'react-router-dom';
import styles from "../styles/style.module.scss"
function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [authenticated, setAuthenticated] = useState(false);
    let navigate = useNavigate();
    const handleSubmit = async (event) => {
        event.preventDefault();
        const encodedCredentials = btoa(`${username}:${password}`);
        const response = await fetch('http://localhost:5000/user/self', {
            headers: {
                Authorization: `Basic ${encodedCredentials}`,
            },
        });

        if (response.ok) {
            sessionStorage.setItem('Authorization', `Basic ${encodedCredentials}`)
            setAuthenticated(true);
        } else {
            alert('Authentication failed');
        }
    };

    if (authenticated) {
        navigate('/ad');
    }

    return (
        <form onSubmit={handleSubmit}>
            <br />
            <label htmlFor="emailInput">
                Email:
            </label>
            <input id="emailInput" type="text" value={username} onChange={(event) => setUsername(event.target.value)} />
            <br />
            <label htmlFor="passwordInput">
                Password:
            </label>
            <input id="passwordInput" type="password" value={password} onChange={(event) => setPassword(event.target.value)} />
            <button type="submit">Log in</button>
            <br />
        </form>
    );
}
export default Login;