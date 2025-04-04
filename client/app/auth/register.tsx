import React from "react"
import { Link, Redirect } from "wouter"

import { API_URL } from "../const"
import {  useAuth } from "../../ctx"

type Payload = {
    name     : string
    username : string
    password : string
    email?   : string
}

export function Register() {
    const user = useAuth()

    if (user.loading) return <h1>Loading...</h1>
    if (user.data) return <Redirect to="/"/>

    let [errMsg, setErrMsg] = React.useState<null | string>(null)
    let [errMsgHidden, setErrMsgHidden] = React.useState(true)

    const setError = (msg : string, duration : number) => {
        setErrMsgHidden(false);
        setErrMsg(msg)

        setTimeout((e) => {
            setErrMsgHidden(true)
        }, duration);
    }

    async function handler(e : any) {
        e.preventDefault()

        let {uname, name, email, pwd, confirmpwd} = e.target

        if (pwd.value != confirmpwd.value) {
            setError("Confirm password does not match with the password !", 1200);
            return;
        }

        let payload : Payload = {
            name : name.value,
            username : uname.value,
            password : pwd.value,
        }
        if (email.value.length) payload.email = email.value

        try {
        const res = await fetch(`${API_URL}/register`, {
            method: "post",
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        })

        if (201 == res.status) {
            user.set(await res.json() as any)
        }

        } catch(e) {
            setError("Unable to register: "+ e, 1500)
        }
    }

    return (<>
        <div className="container">
            {!errMsgHidden &&
                <div className="notification is-danger is-fixed err-msg">
                    {errMsg}
                </div>
            }
            <h1 className="title is-1 has-text-centered">Register</h1>
            <form onSubmit={handler}>
                <div className="field">
                    <label htmlFor="name" className="label">Display Name</label>
                    <input type="text" className="input" name="name" required/>
                </div>

                <div className="field">
                    <label htmlFor="uname" className="label">Username</label>
                    <input type="text" className="input" name="uname" required/>
                </div>

                <div className="field">
                    <label htmlFor="email" className="label">Email</label>
                    <input type="email" className="input" name="email" />
                </div>
                
                <div className="field">
                    <label htmlFor="pwd" className="label">Password</label>
                    <input type="password" className="input" name="pwd" required/>
                </div>

                <div className="field">
                    <label htmlFor="confirmpwd" className="label">Confirm Password</label>
                    <input type="password" className="input" name="confirmpwd" required/>
                </div>

                <span>
                    By registering you agree to the <Link to="#terms-and-conditions">terms and conditions</Link>
                </span>

                <input type="submit" id="reg" value="Register" className="button is-dark is-fullwidth my-4"/>
            </form>
        </div>  
    </>)
}
