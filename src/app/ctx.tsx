import React, { createContext, useState } from "react";
import { API_URL } from "./auth"

export type User = {
    id	    : string
    user    : string
    name    : string
}

export type IUserCtx = {
    data    : User | null,
    reset() : void
}

export const UserCtx = createContext<IUserCtx>({} as IUserCtx)

export function UserProvider ( { children } ) {
    const [user, setUser] = useState<User | null>(null);
    const reset = () => {
	setUser(null);
	(async() => await fetch(`${API_URL}/logout`, {
	    credentials : "include"
	}))();
    };

    React.useEffect(() => {
       (async function() {
	    let u = await (await fetch(`${API_URL}` + '/me', {
		method: 'get',
		credentials: 'include'
	    })).json()

	    if (!u) return
	    else setUser(u as User)
	 })()
    }, []);

     return (
	<UserCtx.Provider value={ { data : user, reset } } children={children}/>
    )
};

