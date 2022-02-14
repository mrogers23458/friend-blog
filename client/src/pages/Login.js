import {Form, Button} from 'react-bootstrap'

export default function Login () {
    return(
    <div className="login-box">
        <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Username</Form.Label>
                <Form.Control type="text" placeholder="Enter email" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicCheckbox">
                <Form.Check type="checkbox" label="stay logged in" />
            </Form.Group>
            <Button variant="primary" type="submit">
            Submit
            </Button>
        </Form>
    </div>
    )
}