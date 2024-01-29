import { t } from "elysia"
import bcrypt from "bcryptjs"
import db from "../../db"
import { randomBytes } from "crypto"
import { StatusCode, isEmail, securePwd, token_name, TokenMaxAge } from "../../utils"

export default async function register(req : any) {
	let status = StatusCode.OK
	let { username, password, name, email } = req.body
	username = username.toLowerCase()

	const salt = randomBytes(16).toString("base64")
	const hash = bcrypt.hashSync(securePwd(salt, password), 4)

	let data : { username : string, name : string, salt : string, hash : string, email? : string } = {
		username,
		name,
		salt,
		hash,
	}
	if (email) {
		if (!isEmail(email)) return StatusCode.BadRequest
		data.email = email
	}
	
	try {
		const user = await db.user.create({ data })
		let token = await req.jwt.sign({
			id	 : user.id,
			user : user.username,
			name : user.name,
		})

		req.setCookie(token_name, token, { expires : TokenMaxAge() } )
		status = StatusCode.Created
	} catch(e) {
		status = StatusCode.Conflict
	}

	req.set.status = status
}

export const RegisterPayload = t.Object({
	  name		: t.String(),
	  username	: t.String(),
	  password	: t.String(),
	  email		: t.Optional(t.String())
})
