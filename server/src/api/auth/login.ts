import { t } from "elysia"
import bcrypt from "bcryptjs"

import db from "../../db"
import { isEmail, securePwd, StatusCode, token_name, TokenMaxAge } from "../../utils"

export default async function login( { jwt, body, set, setCookie } : any) {
	let status : StatusCode = StatusCode.OK;
	let { id, password } = body
	id = id.toLowerCase()

	let user : any;

	if (isEmail(id)) {
		try {
		user = await db.user.findFirst({
			where: {
				email: id
			},
			select: {
				id  : true,
				username: true,
				name: true,
				salt: true,
				hash: true
			}
		})

		const isAuthed = bcrypt.compareSync(securePwd(user?.salt as string, password), user?.hash as string)
		status = isAuthed ? StatusCode.OK : StatusCode.UnAuthorized
		} catch(e : any) {
			status = StatusCode.NotFound
		}
	} else {
		try {
		user = await db.user.findFirst({
			where: {
				username: id
			},
			select: {
				id : true,
				username: true,
				name: true,
				salt: true,
				hash: true
			}
		})

		const isAuthed = bcrypt.compareSync(securePwd(user?.salt as string, password), user?.hash as string)
		status = isAuthed ? StatusCode.OK : StatusCode.UnAuthorized
		} catch(e : any) {
			status = StatusCode.NotFound
		}
	}

	if (status = StatusCode.OK) {
		let token = await jwt.sign({
			id	 : user.id,
			user : user.username,
			name : user.name,
		})
		setCookie(token_name, token, { expires : TokenMaxAge() } )
		status = 200
	}

	set.status = status
}

export const LoginPayload = t.Object({
	  id		: t.String(),
	  password	: t.String()
})
