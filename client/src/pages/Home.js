import { useQuery } from '@apollo/client'
import { GET_POSTS } from '../utils/query'
import { Card, Spinner } from 'react-bootstrap'

export default function Home(){

    
    const { loading, error, data } = useQuery(GET_POSTS)

    if (loading) {
        return(
            <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
            </Spinner>
        )
    }

    if (error) {
        console.error(error)
    }

    if (data) {
        const posts = data.posts
        return(
            <div className='home-box'>
                {posts.map((post)=>
                    <Card key={post._id} style={{ width: '80vw', textAlign: 'center', marginBottom: '2vh' }}>
                    <Card.Body>
                      <Card.Title><a href={`/posts/comments/${post._id}`}>{post.title}</a></Card.Title>
                        <Card.Text>
                            {post.postContent}
                        </Card.Text>
                    </Card.Body>
                  </Card>
                )}
            </div>
        )
    }

    return(
        <div className="404-box">
            page not found
        </div>
    )
}