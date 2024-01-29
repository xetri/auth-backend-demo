import { token_name } from "../utils"

export default async function me(req : any) {
	let user = await req.jwt.verify(String(req.cookie[token_name]))
	if (!user) req.set.status = 401
	return user
}
