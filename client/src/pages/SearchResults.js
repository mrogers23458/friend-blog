import { useQuery } from "@apollo/client"
import { GET_POSTS } from "../utils/query"
import { Card } from "react-bootstrap"

export default function SearchResults () {
    const searchUrl = window.location.search
    console.log(searchUrl)
    const searchTerms = searchUrl.split('=').pop().split('+')
    const {loading, error, data} = useQuery(GET_POSTS)

    if(loading){
        return (
            <div className="loading-box">
                Loading..
            </div>
        )
    }

    if (error) {
        console.error(error)
        return(
            <div>
                There was an error
            </div>
        )
    }

    if (data) {
        var resultsArray = []
        const posts = data.posts
        const postTitles = posts.map((post) => {
            return post.title
        })
        const filterFunction = function(array1, array2){
            
            for (var i=0; i<array1.length; i++) {
                console.log(array1[i].title)
                console.log(array1[i].title.toString().toUpperCase())
                if (array1[i].title.toString().toUpperCase().includes(array2.map((term)=>{return term.toString().toUpperCase()}))) {
                   resultsArray.push(array1[i])
                }

        }
    }

        filterFunction(posts, searchTerms)
        console.log(resultsArray)
        return(
            <div className="results-box">
               {resultsArray.map((result)=> {
                   return (
                    <Card key={result._id} style={{width: "80vw", marginBottom:"2vh"}}>
                        <Card.Body><a href={`/posts/comments/${result._id}`}> {result.title} </a></Card.Body>
                    </Card>
                )
               })}
            </div>
        )
    }
}