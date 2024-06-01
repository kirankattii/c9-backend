import express from "express"
import multer from "multer"
import { addBlog, listBlog, removeBlog } from "../controllers/blogController.js"

const blogRouter = express.Router()

// image storage Engine
const storage = multer.diskStorage({
	destination: "uploads",
	filename: (req, file, cb) => {
		return cb(null, `${Date.now()}${file.originalname}`)
	},
})

const upload = multer({
	storage: storage,
})

blogRouter.post("/add", upload.single("image"), addBlog)
blogRouter.get("/list", listBlog)
blogRouter.post("/remove", removeBlog)

export default blogRouter
