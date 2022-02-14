import { useMutation } from '@apollo/client'
import { useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import { ADD_POST } from '../utils/mutation'
import auth from '../utils/auth'

export default function Createapost() {
    const user = auth.getUser().payload
    console.log(user)
    const [postData, setPostData] = useState({
        title: '',
        postContent: '',
        creatorId: user._id
    })

    const [createPost, {loading, error, data}] = useMutation(ADD_POST)

    const handleChange = function (e) {
        e.preventDefault()
        setPostData({...postData, [e.target.name]:e.target.value})
    }

    const handleFormSubmit = async () => {
        const {title, postContent, creatorId } = postData
        console.log(title, postContent, creatorId)

        await createPost({
            variables: {
                title,
                postContent,
                creatorId
            }
        })

        if (loading) {
            return (
                <div>
                    loading...
                </div>
            )
        }

        if (error) {
            console.error(error)
        }

        if (data) {
            console.log(data)
        }
    }
    
    return(
    <div className='create-post-box'>
        <Form>
            <Form.Group className="mb-3" controlId="post-title" style={{marginTop: "5vh"}}>
                <Form.Label>Enter a title for your post</Form.Label>
                <Form.Control size='md' type="text" placeholder="title goes here..." name="title" onChange={handleChange}/>
            </Form.Group>

            <Form.Group className="mb-3" controlId="post-content">
                <Form.Label>What do you want to say?</Form.Label>
                <Form.Control as="textarea" rows={10} placeholder="text goes here..." style={{height: "40vh", resize:"none"}} name="postContent" onChange={handleChange}/>
            </Form.Group>
            <Button onClick={handleFormSubmit} variant="primary" type="button">
                Post it!
            </Button>
        </Form>
    </div> 
    )
}