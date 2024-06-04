import express from "express"
import multer from "multer"
import {
	addBlog,
	listBlog,
	removeBlog,
	upload,
} from "../controllers/blogController.js"

const blogRouter = express.Router()

// image storage Engine
const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, "uploads")
	},
	filename: (req, file, cb) => {
		return cb(null, `${Date.now()}${file.originalname}`)
	},
})

// const upload = multer({
// 	storage: storage,
// 	fileFilter: (req, file, cb) => {
// 		if (
// 			file.mimetype == "image/jpeg" ||
// 			file.mimetype == "image/jpg" ||
// 			file.mimetype == "image/png" ||
// 			file.mimetype == "image/gif"
// 		) {
// 			cb(null, true)
// 		} else {
// 			cb(null, false)
// 			cb(new Error("Only jpeg,  jpg , png, and gif Image allow"))
// 		}
// 	},
// })

// blogRouter.post("/add", upload.single("image"), addBlog)

blogRouter.post("/add", upload.single("image"), addBlog)
blogRouter.get("/list", listBlog)
blogRouter.post("/remove", removeBlog)

export default blogRouter
