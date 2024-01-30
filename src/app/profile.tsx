import React, { useContext } from "react";
import { Redirect } from "wouter";

import { UserCtx } from "../ctx";

export default function() {
	const user = useContext(UserCtx)
	if (!user.data) return <Redirect to="/login"/>

	return (<>
		<div className="nav-bar nav-menu">
			<h1>ID : {user.data.id}</h1>
			<h1>Name : {user.data.name}</h1>
			<h1>User : {user.data.user}</h1>
			<button onClick={user.reset}>Logout</button>
		</div>	
	</>)
}
