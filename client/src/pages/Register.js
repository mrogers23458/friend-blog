import { useApolloClient, useMutation } from '@apollo/client'
import { useState } from 'react'
import {Form, Button} from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { ADD_USER } from '../utils/mutation'
import auth from '../utils/auth'
export default function Register () {
    
    const navigate = useNavigate()
    const [regCreds, setRegCreds] = useState({
        email: '',
        username: '',
        password: ''
    })

    const [register, {loading, error, data}] = useMutation(ADD_USER)

    const handleChange = function (e) {
        setRegCreds({...regCreds, [e.target.name]:e.target.value})
    }

    const handleFormSubmit = async (e) => {
        e.preventDefault()

        if (regCreds.email && regCreds.username && regCreds.password) {
            const {email, username, password} = regCreds

           const { loading, error, data } = await register({
               variables: {
                   username,
                   email,
                   password
               }
            })

            if (loading) {
                return(
                    <div className='loading-box'>
                        Loading...
                    </div>
                )
            }

            if (error) {
                console.error(error)
            }

            if (data) {
                auth.login(data.addUser.token)
                navigate('/profile')
                
            }

        }
    }

    return (
        <div className='register-box'>
        <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control onChange={handleChange} type="email" placeholder="Enter email" name='email' />
                <Form.Text className="text-muted">
                We'll never share your email with anyone else.
                </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicUsername">
                <Form.Label>Username</Form.Label>
                <Form.Control onChange={handleChange} type="text" placeholder="username" name='username' />
                <Form.Text className="text-muted">
                Choose a username.
                </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control onChange={handleChange} type="password" placeholder="Password" name='password' />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicCheckbox">
                <Form.Check type="checkbox" label="Stay logged in?" />
            </Form.Group>
            <Button variant="primary" type="submit" onClick={handleFormSubmit}>
                Register
            </Button>
        </Form>
    </div>
    )
}