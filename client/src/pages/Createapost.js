import { useMutation } from '@apollo/client'
import { useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import { ADD_POST } from '../utils/mutation'
import auth from '../utils/auth'
import { Navigate, useNavigate } from 'react-router-dom'

export default function Createapost() {
    const navigate = useNavigate()
    const user = auth.getUser().payload
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

        await createPost({
            variables: {
                title,
                postContent,
                creatorId
            }
        }).then((response) => {
            console.log(response.data.addPost)
            navigate(`/posts/comments/${response.data.addPost._id}`)
        })
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
            <Button onClick={handleFormSubmit} variant="primary">
                Post it!
            </Button>
        </Form>
    </div> 
    )
}