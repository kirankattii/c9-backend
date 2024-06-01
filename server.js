import express from "express"
import cors from "cors"
import { connectDB } from "./config/db.js"
import blogRouter from "./routes/blogRoute.js"
import dotenv from "dotenv"
dotenv.config()

// app config
const app = express()
const port = process.env.PORT || 8000

// middleware
app.use(express.json())
app.use(
	cors({
		origin: "https://c9-backend.onrender.com", // Adjust to your frontend domain if needed
		optionsSuccessStatus: 200,
	})
)

// DB Connection
connectDB()

// api end point
app.use("/api/blog", blogRouter)
app.use("/images", express.static("uploads"))

app.get("/", (req, res) => {
	res.send("API WORKING")
})

app.listen(port, () => {
	console.log(`Server is running on http://localhost:${port}`)
})
