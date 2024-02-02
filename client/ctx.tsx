import React, { createContext, useContext, useState } from "react";
import { API_URL } from "./app/const"

export type User = {
    id	    : string
    user    : string
    name    : string
}

export type IUserCtx = {
    data	    : User | null
    loading	    : boolean
    set(_0 : User)  : void
    reset()	    : void
}

export const UserCtx = createContext<IUserCtx>({} as IUserCtx)

export const useAuth = () => useContext(UserCtx)

export function UserProvider ( { children } : any ) {
    const [loading, setLoading] = useState(true)
    const [user, setUser] = useState<User | null>(null)

    const set = setUser

    const reset = () => {
	setUser(null);
	(async() => await fetch(`${API_URL}/logout`, {
	    credentials : "include"
	}))();
    };

    React.useEffect(() => {
       (async function() {
	   try {
	    let u : any = await (await fetch(`${API_URL}` + '/me', {
		credentials: 'include'
	    })).json()

	    u && setUser(u)
	   } catch(e) {
	   }
	   finally {
	    setLoading(false)
	   }
	 })()
    }, []);

     return (
	<UserCtx.Provider value={ { data : user, loading, set, reset } } children={children}/>
    )
}
