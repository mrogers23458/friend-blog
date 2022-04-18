import React from 'react';
import { GoogleLogin } from 'react-google-login'

const clientId = '245563683707-i3mo4j7d2d5st8kd0knm7q4ru9o32ql0.apps.googleusercontent.com'

function NewLogin () {

    //onSuccess is a method built into GoogleLogin
    const onSuccess = (res) => {
        console.log('[Login Success] currentUser:', res.profileObj)
    }

    const onFailure = (res) => {
        console.log('login failed res:', res)
    }

    return (
        <div>
            <GoogleLogin
                clientId={clientId}
                buttonText='Login With Google'
                cookiePolicy={'single_host_origin'}
                style={{marginTop: '100px'}}
                isSignedIn={true}
             />
        </div>
    )
}

export default NewLogin;