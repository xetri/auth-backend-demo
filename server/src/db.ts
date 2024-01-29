import { PrismaClient } from '@prisma/client'

const db = new PrismaClient()

db.$extends({
	model: {
		user: {
		}
	}
})

export default db
