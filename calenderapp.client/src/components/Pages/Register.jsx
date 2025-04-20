import React, { useState } from 'react'
import axios from "axios";

const Register = () => {
    const [values, setValues] = useState({
        username: '',
        password: ''
    });

    const handleInput = (event) => {
        setValues(prev => ({ ...prev, [event.target.name]: event.target.value }));
    };

    const submitValues = async (event) => {
        event.preventDefault();
        const { data } = await axios.get('/Register');
        console.log(data);
        console.log(values);
    }

    return (
        <div>
            <div>
                <form onSubmit={submitValues}>
                    <div>
                        <label htmlFor="username">Username</label>
                        <input type="text" name="username"  onChange={handleInput} required />
                    </div>
                    <div>
                        <label htmlFor="password">Password</label>
                        <input type="text" name="password" onChange={handleInput} required />
                        <button type="submit">Register</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Register