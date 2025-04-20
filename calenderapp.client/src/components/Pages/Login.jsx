import React, { useState, useContext } from 'react'
import { AuthContext } from '../../context/AuthProvider';
import { useNavigate, useLocation, Link } from 'react-router-dom';

const Login = () => {

    const { login } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";

    const [values, setValues] = useState({
        username: '',
        password: ''
    });
    const [validation, setValidation] = useState({});

    const isValid = () => {
        let validationErrors = {};

        if (values.username.length < 5) {
            validationErrors.username = "username cannot be less than 5 characters. ";
        }
        if (values.username.length > 30) {
            validationErrors.username = "username cannot be more than 30 characters. ";
        }
        if (values.password.length < 10) {
            validationErrors.password += "password cannot be less than 10 characters. ";
        }
        if (values.password.length > 40) {
            validationErrors.password += "password cannot be more than 40 characters. ";
        }
        const passPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d]).+$/;

        if (!passPattern.test(values.password)) {
            validationErrors.password += "password requires at least 1 uppercase character, 1 lowercase character, 1 number and a special character. ";
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
            /*const { data } = await axios.get('/Login');
            console.log(data);*/
            await login(values.username, values.password);
            navigate(from, { replace: true });
        }
    }

    return (
        <div>
            <div>
                <form onSubmit={submitValues}>
                    <div>
                        <label htmlFor="username">username</label>
                        <input type="text" name="username" onChange={handleInput} required />
                        {validation?.username && <p>{validation.username}</p>}

                    </div>
                    <div>
                        <label htmlFor="password">password</label>
                        <input type="text" name="password" onChange={handleInput} required />
                        {validation?.password && <p>{validation.password}</p>}

                    </div>
                    <button type="submit">Login</button>
                </form>
                <Link to="/register">Register</Link>
            </div>
        </div>
    )
}

export default Login