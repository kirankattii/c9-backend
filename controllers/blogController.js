import blogModel from "../models/blogModel.js"
import fs from "fs"

// add Blog
const addBlog = async (req, res) => {
	let image_filename = `${req.file.filename}`

	const blog = new blogModel({
		title: req.body.title,
		description: req.body.description,
		image: image_filename,
	})
	try {
		await blog.save()
		res.json({ success: true, message: "Blog Added" })
	} catch (error) {
		console.log(error)
		res.json({ success: "false", message: "Error" })
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
const removeBlog = async (req, res) => {
	try {
		const blog = await blogModel.findById(req.body.id)
		fs.unlink(`upload/${blog.image}`, () => {})
		await blogModel.findByIdAndDelete(req.body.id)
		res.json({ success: true, message: "Blog Removed" })
	} catch (error) {
		console.log(error)
		res.json({ success: false, message: error })
	}
}

export { addBlog, listBlog, removeBlog }
