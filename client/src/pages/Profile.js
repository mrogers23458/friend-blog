import { useQuery } from "@apollo/client"
import { Accordion } from "react-bootstrap"
import auth from '../utils/auth' 
import { GET_USER } from "../utils/query"

export default function Profile () {
   const user = auth.getUser().payload
   const {loading, error, data} = useQuery(GET_USER, {
       variables: {
           id: user._id
       }
   })

    if (loading) {
        return (
            <div className="loading-box">
                Loading...
            </div>
        )
    }

    if (error) {
        console.error(error)
    }

    if (data) {
        const userData = data.user
        console.log(userData)
    
        return (
        <div className="profile-box">
            <h1 className="profile-welcome-text">Greetings, {userData.username}</h1>
            <Accordion >
                    <Accordion.Item eventKey="0">
                        <Accordion.Header>Email</Accordion.Header>
                        <Accordion.Body>
                            {user.email}
                        </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="1">
                        <Accordion.Header>Username</Accordion.Header>
                        <Accordion.Body>
                            {user.username}
                        </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="2">
                        <Accordion.Header>Post History</Accordion.Header>
                        <Accordion.Body>
                            {userData.posts.map((post)=> <a key={post._id} href={`/posts/comments/${post._id}`}>{post.title}</a>)}
                        </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="3">
                        <Accordion.Header>Comment History</Accordion.Header>
                        <Accordion.Body>
                            {userData.comments.map((comment) =>
                            <div className="comment-history-box">
                                <a href={`/posts/comments/${comment.postId}`}>{comment.postId.title}</a>
                                <p className="comment-history-text">{comment.commentContent}</p>
                            </div>)}
                        </Accordion.Body>
                    </Accordion.Item>
            </Accordion>
        </div>
        )
    }
}