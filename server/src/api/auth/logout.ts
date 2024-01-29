import { token_name } from "../../utils"

export default (req : any) => {
	req.setCookie(token_name, "", { expires : new Date(0) })
}
