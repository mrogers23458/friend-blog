import { useMutation } from '@apollo/client'
import { useState } from 'react'
import {Form, Button} from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import auth from '../utils/auth'
import { LOGIN } from '../utils/mutation'

export default function Login () {
    const navigate = useNavigate()
    const [loginCreds, setLoginCreds] = useState({
        username:'',
        password: ''
    })

    const handleChange = function (e) {
        setLoginCreds({...loginCreds, [e.target.name]:e.target.value})
    }
    console.log(loginCreds)
    const [login, {loading, error, data}] = useMutation(LOGIN)

    const handleLogin = async (e) => {
        e.preventDefault()
        const { username, password } = loginCreds

       const {loading, error, data } = await login({
            variables: {
                username,
                password
            }
        })

        if (loading) {
            return(<div>
                loading...
            </div>)
        }

        if (error) {
            console.log(error)
        }

        if (data) {
            auth.login(data.login.token)
            navigate('/profile')
        }
    }
    return(
    <div className="login-box">
        <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Username</Form.Label>
                <Form.Control onChange={handleChange} type="text" placeholder="Enter username" name="username" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control onChange={handleChange} type="password" placeholder="Password" name="password" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicCheckbox">
                <Form.Check type="checkbox" label="stay logged in" />
            </Form.Group>
            <Button onClick={handleLogin} variant="primary" type="submit">
            Submit
            </Button>
        </Form>
    </div>
    )
}