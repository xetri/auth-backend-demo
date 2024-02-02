import React from "react"
import { Route, Switch } from "wouter"

import Home from "./app/home"
import {Register, Login } from "./app/auth"
import N404 from "./app/404"
// import Profile from "./app/profile"

import { UserProvider } from "./ctx"

export default function() {
	return (<>
		<UserProvider>
			<Switch>
				<Route path="/" component={Home}/>
				<Route path="/login" component={Login}/>
				<Route path="/register" component={Register}/>
				<Route component={N404}/>
			</Switch>
		</UserProvider>
	</>)
}
