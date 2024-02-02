import { t } from "elysia"
import bcrypt from "bcryptjs"
import { randomBytes } from "crypto"

import db from "../../db"
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

	let user : any
	try {
		user = await db.user.create({ data })
		status = StatusCode.Created
	} catch(e) {
		status = StatusCode.Conflict
	}
	req.set.status = status

	if (status == StatusCode.Created) {
		let payload = {	
			id	 : user.id,
			user : user.username,
			name : user.name,
		}
		let token = await req.jwt.sign(payload)
		req.setCookie(token_name, token, { expires : TokenMaxAge() } )

		return payload
	}

	return null
}

export const RegisterPayload = t.Object({
	  name		: t.String(),
	  username	: t.String(),
	  password	: t.String(),
	  email		: t.Optional(t.String())
})
