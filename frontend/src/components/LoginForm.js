import React, { useState } from 'react';
import axios from 'axios';

function LoginForm() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://192.168.21.129:3001/login', {
                username,
                password
            });
            if (response.data.success) {
                setMessage('Login successful!');
            }
        } catch (error) {
            if (error.response && error.response.status === 401) {
                setMessage('Login failed: Invalid credentials');
            } else {
                setMessage('Login failed: Server error');
            }
        }
    };

    return (
        <form onSubmit={handleLogin}>
            <div>
                <label>Username:</label>
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
            </div>
            <div>
                <label>Password:</label>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>
            <button type="submit">Login</button>
            {message && <p>{message}</p>}
        </form>
    );
}

export default LoginForm;
