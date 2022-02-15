import { Card } from 'react-bootstrap'

export default function CommentsView (props){
    console.log(props)
    const data = props.data
    const comments = props.data.post.comments
    return(
        <div className="comment-view-box">
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