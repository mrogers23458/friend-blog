import { GET_USER } from "../utils/query"
import { useQuery } from "@apollo/client"
import { Accordion, Button } from "react-bootstrap"
import DeleteAccount from "./DeleteAccount"



export default function ProfilePage(props) {
    console.log(props)
    const user = props.data
    console.log(user)
    const newId = user._id
    console.log(newId)

    const {loading, error, data} = useQuery(GET_USER, {
        variables: {
            username: user.username
        }
    })

    if (loading) {
        return(
            <div className="loading-box">
                Loading...
            </div>
        )
    }

    if (error) {
        console.error(error)
        return (
            <div className="error-box">
                There was an error.
            </div>
        )
    }

    if (data) {
        console.log(data)
        const user = data.user
        const posts  = data.user.posts
        const comments = data.user.comments
        console.log(comments)
        return(
            <div className="profile-box">
                <h1 className="profile-welcome-text">Greetings, {user.username}</h1>
                <Accordion>
                    <Accordion.Item eventKey="0">
                        <Accordion.Header>Username</Accordion.Header>
                            <Accordion.Body>
                                {user.username}
                            </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="1">
                        <Accordion.Header>Email</Accordion.Header>
                            <Accordion.Body>
                                {user.email}
                            </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="2">
                        <Accordion.Header>Post History</Accordion.Header>
                            <Accordion.Body>
                            {
                                posts.map((item) => {
                                    return(
                                        <div key={item._id} className="post-history-box">
                                            <a href={`/posts/comments/${item._id}`}>{item.title}</a>
                                        </div>
                                    )
                                })
                            }
                            </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="3">
                        <Accordion.Header>Comment History</Accordion.Header>
                            <Accordion.Body style={{width: "80vw", display:"flex", flexDirection: "column", textBreak:"break"}}>
                            {
                                comments.map((item) => {
                                    return(
                                        <div key={item._id} className="post-history-box">
                                            <a href={`/posts/comments/${item.postId._id}`}>{item.postId.title}</a>
                                            <p className="comment-text">You commented, "{item.commentContent}"</p>
                                        </div>
                                    )
                                })
                            }
                            </Accordion.Body>
                    </Accordion.Item>
                </Accordion>
                
            </div>
        )
    }
}