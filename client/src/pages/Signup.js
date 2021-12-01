import React from 'react';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { setCurrentUser, setAuth } from '../store/store';

import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import {Log, Container, Box, Form} from './LoginStyle';
import server from '../config/host';

const Signup = () => {

    const history = useHistory();
    const dispatch = useDispatch();
    const [username, setUsername] = useState();
    const [fullname, setFullname] = useState();
    const [password, setPassword] = useState();
    const notify = (text) => toast.error(text, {
        position: "bottom-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    });

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = {
            username,
            fullname,
            password,
        }
        const res = await fetch(`${server}/api/auth`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(formData)
        })

        const data = await res.json()

        if (res.status === 400) {
            notify("User already exists!")
        } else {
            localStorage.setItem('TOKEN', data.token)
            dispatch(setAuth(true));
            dispatch(setCurrentUser({username: data.username,
                                    fullname: data.fullname}));
            history.push('/')
        }
    }

    return (
        <Log>
            <Container>
                <Box>
                    <h1>SignUp</h1>
                    <h3>Welcome</h3>
                    
                    <Form onSubmit={handleSubmit}>
                        <label>Full Name</label>
                        <input type="text" onChange={e => setFullname(e.target.value)} required />
                        <label>Username</label>
                        <input type="text" onChange={e => setUsername(e.target.value)} required />
                        <label>Password</label>
                        <input type="password" onChange={e => setPassword(e.target.value)} required />
                        <label>Retype password</label>
                        <input type="password" />
                        <button className="create" type="submit">Continue</button>
                    </Form>
                    <h2>Already have an account?<Link to="/login" style={{ color: "#3B49DF", textDecoration: "none" }}> Sign In</Link></h2>
                </Box>
                
            </Container>
        </Log>
        )
}

export default Signup;