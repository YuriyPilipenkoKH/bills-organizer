
import prisma from "../../prisma";

export const connectMongoDB = async () => {
	try {
		await prisma.$connect()
	} 
	catch (error:any) {
		return new Error(error.message)
	}
}