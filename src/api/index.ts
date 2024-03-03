import { Elysia } from "elysia"

import login, { LoginPayload } from "./auth/login"
import register, { RegisterPayload } from "./auth/register"
import logout from "./auth/logout"
import me from "./me"

const app = new Elysia()

app.group("/api", (app) =>
	app
	  .get("/me", me)
	  .get("/logout", logout)
	  .post("/login", login, {
		  body : LoginPayload
	  })
	  .post("/register", register, {
		  body : RegisterPayload
	  })
)

export default app;
