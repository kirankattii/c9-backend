import blogModel from "../models/blogModel.js"
import fs from "fs"
import path from "path"

import { CloudinaryStorage } from "multer-storage-cloudinary"
import cloudinary from "../config/cloudinaryConfig.js"
import multer from "multer"

// Configure Multer storage to use Cloudinary
const storage = new CloudinaryStorage({
	cloudinary: cloudinary,
	params: {
		folder: "blog-images", // Folder name in Cloudinary
		format: async (req, file) => "jpg", // Supports promises as well
		public_id: (req, file) => `${Date.now()}_${file.originalname}`,
	},
})

const upload = multer({ storage: storage })

// add Blog
// const addBlog = async (req, res) => {
// 	let image_filename = `${req.file.filename}`
// 	const blog = new blogModel({
// 		title: req.body.title,
// 		description: req.body.description,
// 		image: image_filename,
// 	})
// 	try {
// 		await blog.save()
// 		res.json({ success: true, message: "Blog Added" })
// 	} catch (error) {
// 		console.log(error)
// 		res.json({ success: "false", message: "Error" })
// 	}
// }

const addBlog = async (req, res) => {
	try {
		const { title, description } = req.body
		const image = req.file.path // Cloudinary image URL

		const blog = new blogModel({
			title,
			description,
			image,
		})

		await blog.save()
		res.json({ success: true, message: "Blog Added", blog })
	} catch (error) {
		console.error(error)
		res.status(500).json({ success: false, message: "Internal Server Error" })
	}
}

// all food list
const listBlog = async (req, res) => {
	try {
		const blogs = await blogModel.find({})
		res.json({ success: true, data: blogs })
	} catch (error) {
		console.log(error)
		res.json({ success: false, message: error })
	}
}
//remove food item
// const removeBlog = async (req, res) => {
// 	try {
// 		const blog = await blogModel.findById(req.body.id)
// 		fs.unlink(`upload/${blog.image}`, () => {})
// 		await blogModel.findByIdAndDelete(req.body.id)
// 		res.json({ success: true, message: "Blog Removed" })
// 	} catch (error) {
// 		console.log(error)
// 		res.json({ success: false, message: error })
// 	}
// }

const removeBlog = async (req, res) => {
	try {
		const blog = await blogModel.findById(req.body.id)
		if (blog) {
			const imagePath = path.join("uploads", blog.image)
			fs.unlink(imagePath, (err) => {
				if (err) {
					console.log(err)
				}
			})
			await blogModel.findByIdAndDelete(req.body.id)
			res.json({ success: true, message: "Blog Removed" })
		} else {
			res.json({ success: false, message: "Blog not found" })
		}
	} catch (error) {
		console.log(error)
		res.json({ success: false, message: error })
	}
}

export { addBlog, listBlog, removeBlog, upload }
