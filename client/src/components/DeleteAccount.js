import { useMutation } from "@apollo/client"
import { useNavigate } from "react-router-dom"
import auth from "../utils/auth"
import { DELETE_USER } from "../utils/mutation"
import { Button } from 'react-bootstrap' 

export default function DeleteAccount(props){
    console.log(props)
    const user = props.userData
    console.log(user)
    const navigate = useNavigate()
    const id = user._id
    console.log(id)
    const [deleteAccount, {loading, error, data}] = useMutation(DELETE_USER)
    
    const HandleDelete = async (e) => {
        e.preventDefault()
        auth.logout()

        await deleteAccount({
            variables: {
                userId: id
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

        console.log(data)
        navigate('/')
    }


    return (
        <Button onClick={HandleDelete} className="delete-account-button">Delete Account</Button>
    )
}