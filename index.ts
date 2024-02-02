import { Elysia } from "elysia"
import { cors } from "@elysiajs/cors"
import { cookie } from "@elysiajs/cookie"
import { jwt } from "@elysiajs/jwt"
import { staticPlugin } from "@elysiajs/static"

import db from "./src/db"
import apis from "./src/api"

const PORT = Bun.env.PORT || 6996
// const ALLOWED_DOMAINS = JSON.parse(Bun.env.ALLOWED_DOMAINS || '[]')

await db.$connect()

const app = new Elysia()
.use(cors({
	origin: true,
	// origin: (req) => ALLOWED_DOMAINS.includes(req.headers.get('origin')),
	credentials: true,
	allowedHeaders: ['Authorization', 'Content-Type'],
}))
.use(cookie({
	httpOnly : true,
}))
.use(jwt({
	secret : Bun.env.JWT_SECRET as string,
}))
.use(apis)
.use(staticPlugin())
.get("/*", _ => Bun.file("./public/index.html"))

app.listen(PORT, () => console.log(`Running at http://${app.server?.hostname}:${app.server?.port}`))

await db.$disconnect()
