import { useMutation, useQuery } from "@apollo/client"
import { Accordion } from "react-bootstrap"
import auth from '../utils/auth' 
import { GET_USER } from "../utils/query"
import ProfilePage from "../components/ProfilePage"

export default function Profile () {

    if (auth.loggedIn()) {
        const user = auth.getUser().payload
        console.log(user)
        return(
            <div>
                <ProfilePage data={user} />
            </div>
        )
    }

    else {
        return (
            <div>
                you are not logged in
            </div>
        )
    }


}