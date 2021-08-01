import React from 'react'
import "./Login.css"
import { Button } from "@material-ui/core"
import { auth, provider } from './firebase';
import { actionTypes } from './reducer'
import { useStateValue } from './StateProvider'

function Login() {

    const [{}, dispatch] = useStateValue();


    const signIn = () => {
        auth
            .signInWithPopup(provider)
            .then((result) => {
                dispatch({
                    type: actionTypes.SET_USER,
                    user: result.user,
                })
            })
            .catch((error) => alert(error.message))
    };
    return (
        <div className="login">
            <div className="login_container">
                <img src="https://biznesskibaya.com/wp-content/uploads/2020/04/bYtqbOcTYOlgc6gqZ2rwb8lptHuwlNE75zYJu6Bn076-hTmvd96HH-6v7S0YUAAJXoJN.png" alt="" />
                <div className="login_test">
                    <h1>Sign in to whatsapp</h1>
                </div>
                <Button onClick={signIn}>Sign in with google</Button>
            </div>
        </div>
    )
}

export default Login
