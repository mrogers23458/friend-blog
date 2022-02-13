import { useApolloClient, useQuery } from "@apollo/client"
import { useParams } from "react-router-dom"
import { GET_POST } from "../utils/query"
import { Card } from 'react-bootstrap'

export default function Comments() {
    const params = useParams()
    console.log(params)
    console.log(params.id)
    const getId = (params.id)
    const {loading, error, data } = useQuery(GET_POST, {
        variables: {
            postId: getId
        }
    })
    const client = useApolloClient()

    if (loading) {
        return (
            <div className="loading-box">
                <p className="loading-text">Loading...</p>
            </div>
        )
    }

    if (error) {
        console.error(error)
    }

    if (data) {
        console.log(data)
        const comments = data.post.comments
        console.log(comments)
        console.log(getId)
        return (
        <div className="post-comment-view-box">
            <div className="post-header">
                <h1 className="post-title">{data.post.title}</h1>
            </div>
            <div className="post-content">
                <p className="post-content">{data.post.postContent}</p>
            </div>
            <div className="comments-box">
                {comments.map((comment)=>
                    <Card style={{ width: '80vw', marginBottom: '2vh' }}>
                    <Card.Body>
                      <Card.Text>
                          {comment.commentContent}
                      </Card.Text>
                      <Card.Subtitle className="mb-2 text-muted">{comment.commentorId.username}</Card.Subtitle>
                    </Card.Body>
                  </Card>
                 )}
            </div>
        </div>
        )
        
    }

    return(
        <div className="404-box">
            page not found
        </div>
    )
}