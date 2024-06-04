import express from "express"
import cors from "cors"
import { connectDB } from "./config/db.js"
import blogRouter from "./routes/blogRoute.js"
import userRouter from "./routes/userRoute.js"
import dotenv from "dotenv"
import blogModel from "./models/blogModel.js"
import fs from "fs" // Import fs module
import path from "path" // Import path module
import { fileURLToPath } from "url" // Import fileURLToPath

dotenv.config()

// Create __dirname equivalent
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// app config
const app = express()
const port = process.env.PORT || 8000

// middleware
app.use(express.json())
// app.use(
// 	cors({
// 		origin: ["https://c9-m4fo.vercel.app", "https://c9-admin.vercel.app"],
// 		optionsSuccessStatus: 200,
// 	})
// )

app.use(cors())

// app.use("/images", express.static("uploads"))
app.use("/uploads", express.static(path.join(__dirname, "uploads")))

// DB Connection
connectDB()

// api end point
app.use("/api/blog", blogRouter)
app.use("/api/user", userRouter)

const getImage = async (req, res) => {
	try {
		const blog = await blogModel.findById(req.params.id)
		if (!blog) {
			return res.status(404).json({ success: false, message: "Blog not found" })
		}
		const imagePath = path.join(__dirname, "uploads", blog.image) // Construct the path to the image file
		res.sendFile(imagePath) // Send the image file
	} catch (error) {
		console.log(error)
		res.status(500).json({ success: false, message: "Internal server error" })
	}
}

// Route to get image
app.get("/api/blog/image/:id", getImage)

app.get("/", (req, res) => {
	res.send("API WORKING")
})

app.listen(port, () => {
	console.log(`Server is running on http://localhost:${port}`)
})
