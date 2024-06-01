import mongoose from "mongoose"

export const connectDB = async () => {
	await mongoose
		.connect(
			"mongodb+srv://kiran:f5wdq62MMaXh6qz1@cluster0.sm1s8yi.mongodb.net/c9"
		)
		.then(() => console.log(`DB connected`))
}
