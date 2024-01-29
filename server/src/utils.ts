export const isEmail = (text : string) => /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{1,})$/i.test(text);

export const securePwd = (salt : string, pwd : string) => (salt + pwd + salt)

export const token_name = "_eauth"
export const TokenMaxAge =  () => new Date(Date.now() + (9 * (365 * 86400 * 1000)));

export type AuthResponse = {
	status : StatusCode
	msg	   : string	
}

export enum StatusCode {
	OK = 200,
	Created	= 201,
	UnAuthorized = 401,
	BadRequest = 400,
	NotFound = 404,
	Conflict = 409
}
