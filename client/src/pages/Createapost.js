import {Form, Button} from 'react-bootstrap'

export default function Createapost() {
    return(
    <div className='create-post-box'>
        <Form>
            <Form.Group className="mb-3" controlId="post-title" style={{marginTop: "5vh"}}>
                <Form.Label>Enter a title for your post</Form.Label>
                <Form.Control size='md' type="text" placeholder="title goes here..." />
            </Form.Group>

            <Form.Group className="mb-3" controlId="post-content">
                <Form.Label>What do you want to say?</Form.Label>
                <Form.Control as="textarea" rows={10} placeholder="text goes here..." style={{height: "40vh", resize:"none"}}/>
            </Form.Group>
            <Button variant="primary" type="submit">
            Post it!
            </Button>
        </Form>
    </div> 
    )
}