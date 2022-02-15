import { useQuery } from "@apollo/client"
import { useParams } from "react-router-dom"
import { GET_POST } from "../utils/query"
import CreateComment from "./CreateComment"
import auth from "../utils/auth"
import CommentsView from "./CommentsView"

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
        if (auth.loggedIn()){
        return (
        <div className="post-comment-view-box">
            <CommentsView data={data} />
            <CreateComment postInfo={data.post} />
        </div>
        )
    }
    if (!auth.loggedIn()) {
        return(<div>
            <CommentsView data={data} />
        </div>)
    }
        
    }

    return(
        <div className="404-box">
            page not found
        </div>
    )
}