import React, { useState, useContext } from 'react'
import { AuthContext } from '../../context/AuthProvider';
import { useNavigate, Link } from 'react-router-dom';

const Register = () => {
    const { register } = useContext(AuthContext);
    const navigate = useNavigate();

    const [values, setValues] = useState({
        Username: '',
        Password: '',
        Email: ''
    });
    const [validation, setValidation] = useState({});

    const isValid = () => {
        let validationErrors = {};

        if (values.Username.length < 5) {
            validationErrors.Username = "Username cannot be less than 5 characters. ";
        }
        if (values.Username.length > 5) {
            validationErrors.Username = "Username cannot be more than 30 characters. ";
        }
        if (values.Password.length < 10) {
            validationErrors.Password += "Password cannot be less than 10 characters. ";
        }
        if (values.Password.length > 40) {
            validationErrors.Password += "Password cannot be more than 40 characters. ";
        }
        const passPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d]).+$/;

        if (!passPattern.test(values.Password)) {
            validationErrors.Password += "Password requires at least 1 uppercase character, 1 lowercase character, 1 number and a special character. ";
        }

        const emailPattern = /^ [\w\.-] + @[\w\.-] +\.\w+$/;

        if (!emailPattern.test(values.Email)){
            validationErrors.email = "Please enter a valid email address with domain."
        }

        if (Object.keys(validationErrors).length) {
            setValidation({ ...validationErrors });
            return false;
        } else {
            setValidation({});
            return true;
        }
    }

    const handleInput = (event) => {
        setValues(prev => ({ ...prev, [event.target.name]: event.target.value }));
    };

    const submitValues = async (event) => {
        event.preventDefault();
        if (isValid()) {
            await register(values.Username, values.Password, values.Email);
            navigate("/", { replace: true });
        }
    }

    return (
        <div>
            <div>
                <form onSubmit={submitValues}>
                    <div>
                        <label htmlFor="Email">Email</label>
                        <input type="text" name="Email" onChange={handleInput} required />
                        {validation?.Email && <p>validation.Email</p>}

                    </div>
                    <div>
                        <label htmlFor="Username">Username</label>
                        <input type="text" name="Username" onChange={handleInput} required />
                        {validation?.Username && <p>validation.Username</p>}

                    </div>
                    <div>
                        <label htmlFor="Password">Password</label>
                        <input type="text" name="Password" onChange={handleInput} required />
                        {validation?.Password && <p>validation.Password</p>}

                    </div>
                    <button type="submit">Register</button>
                </form>
                <Link to="/login">Login</Link>
            </div>
        </div>
    )
}

export default Register