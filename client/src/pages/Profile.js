import { useMutation, useQuery } from "@apollo/client"
import { Accordion } from "react-bootstrap"
import auth from '../utils/auth' 
import { GET_USER } from "../utils/query"
import ProfilePage from "../components/ProfilePage"
import DeleteAccount from "../components/DeleteAccount"

export default function Profile () {

    if (auth.loggedIn()) {
        const user = auth.getUser().payload
        console.log(user)
        return(
            <div className="profile-box-container">
                <ProfilePage data={user} />
                <DeleteAccount userData={user} />
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