import React from 'react';
import { useState } from 'react';
import { setCurrentUser, setAuth } from '../store/store';
import { useDispatch } from 'react-redux';
import { useHistory, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import {Log, Container, Box, Form} from './LoginStyle';
import server from '../config/host';

const Login = () => {
    const history = useHistory()
    const dispatch = useDispatch()
    const notify = (text) => toast.error(text, {
        position: "bottom-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    });

    const [username, setUsername] = useState()
    const [password, setPassword] = useState()

    const handleSubmit = async (e) => {
        e.preventDefault()
        const formData = {
            username,
            password,
        }
        // GENERATING AUTH TOKEN
        
        const res = await fetch(`${server}/api/auth`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(formData)
        })

        const data = await res.json()
        if (res.status === 200) {
            localStorage.setItem('TOKEN', data.token)
            dispatch(setAuth(true));
            console.log(data);
            dispatch(setCurrentUser({username: data.username,
                                    fullname: data.fullname}))   ;         
            history.push('/');
        } else {
            alert('Login failed')
        }
    }

    return (
        <Log>
            <Container>
                <Box>
                    <h1>Login</h1>
                    <h3>Wellcome!</h3>
                    <Form onSubmit={handleSubmit}>
                        <label>Username</label>
                        <input type="text" onChange={e => setUsername(e.target.value)} />
                        <label>Password</label>
                        <input type="password" onChange={e => setPassword(e.target.value)} />
                        <button className="create" type='submit' >Continue</button>
                    </Form>
                    <h2>Not have an account?<Link to="/register" style={{ color: "#3B49DF", textDecoration: "none" }}> Sign Up</Link>
                    <h3>or <Link to="/" style={{ color: "#3B49DF", textDecoration: "none" }}> View as anonymous</Link></h3>
                    <h3>If you are a teacher <Link to="/teacher/login" style={{ color: "#3B49DF", textDecoration: "none" }}> Login as teacher</Link></h3>
                    </h2>
                </Box>
            </Container>
        </Log>
    )
}

export default Login
