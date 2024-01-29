import React, { useState } from "react"
import { useLocation } from "wouter"

import { API_URL } from "./"
import { UserCtx } from "../ctx"
import { Redirect } from "wouter"

type Payload = {
    id       : string
    password : string
}

async function handler(e : any) {
    e.preventDefault()

    const { id, pwd } = e.target
    let payload : Payload = {
        id       : id.value,
        password : pwd.value,
    }

    try {
    const res = await fetch(`${API_URL}/login`, {
        method: 'POST',
        credentials: "include",
        body: JSON.stringify(payload),
        headers: {
            'Content-Type': 'application/json'
        },
    })
    } catch(e) {
    }
}

export function Login() {
    const user = React.useContext(UserCtx)
    if (user.data) return <Redirect to="/"/>

    return (<>
        <div className="container">
            <h1 className="title is-1 has-text-centered">Login</h1>
            <form onSubmit={handler}>
                <div className="field m-0">
                    <label htmlFor="id" className="label">Username or Email</label>
                    <input type="text" className="input" name="id" required/>
                </div>
                
                <div className="field m-0">
                    <label htmlFor="pwd" className="label">Password</label>
                    <input type="password" className="input" name="pwd" required/>
                </div>

                <input type="submit" value="Login" className="button is-dark is-fullwidth my-4"/>
            </form>
        </div>  
	</>)
}

