import { useQuery } from "@apollo/client"
import { useParams } from "react-router-dom"
import { GET_POST } from "../utils/query"
import { Card } from 'react-bootstrap'

export default function Comments() {
    const params = useParams()
    const getId = (params.id)
    const {loading, error, data } = useQuery(GET_POST, {
        variables: {
            postId: getId
        }
    })

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
        const comments = data.post.comments
        
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
                    <Card key={comment._id} style={{ width: '80vw', marginBottom: '2vh' }}>
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