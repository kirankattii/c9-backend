import mongoose from "mongoose"
import dotenv from "dotenv"
dotenv.config()

export const connectDB = async () => {
	console.log("DB_URI:", process.env.DB_URI) // Debugging line
	try {
		await mongoose.connect(process.env.DB_URI)
		console.log("DB connected")
	} catch (error) {
		console.error("DB connection error:", error.message)
	}
}
