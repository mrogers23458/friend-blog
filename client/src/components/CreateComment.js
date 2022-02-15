import { Form, Button } from "react-bootstrap"
import { useApolloClient, useMutation } from '@apollo/client'
import { ADD_COMMENT } from '../utils/mutation'
import { useState } from 'react'
import auth from '../utils/auth'
import { GET_POSTS } from "../utils/query"

export default function CreateComment (props) {
    const client = useApolloClient()
    const postId= props.postInfo._id
    const user = auth.getUser().payload

    const [ comment, setComment ] = useState({
        commentorId: user._id,
        postId: postId,
        commentContent: '',
    })

    const [addComment, {loading, error, data}] = useMutation(ADD_COMMENT)
    console.log(comment)
    const handleChange = function (e) {
        setComment({...comment, [e.target.name]:e.target.value})
    }

    const handleSubmitComment = async () => {
        const { commentorId, postId, commentContent } = comment
       const {loading, error, data} = await addComment({
            variables: {
                commentorId,
                postId,
                commentContent
            }
        }).then((response) => {
            console.log(response)
            client.reFetchObservableQueries(GET_POSTS)
        })
    }

    return(
    <Form className="comment-form">
        <Form.Group className="mb-3" controlId="formBasicComment">
        <Form.Text className="text-muted">What do you want to say?</Form.Text>
            <Form.Control onChange={handleChange} as="textarea" rows={10} placeholder="text goes here..." style={{height: "20vh", width:"80vw", resize:"none"}} name="commentContent" />
        </Form.Group>
            <Button onClick={handleSubmitComment} variant="primary" type="submit">
                add comment
            </Button>
    </Form>
 )
}