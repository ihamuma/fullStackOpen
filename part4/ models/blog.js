const mongoose = require('mongoose')

const url = process.env.MONGODB_URI

console.log('connecting to MongoDB')

mongoose.connect(url)
	.then(console.log('connected to MongoDB'))
	.catch((error) => {
		console.log('error connecting to MongoDB:', error.message)
	})

const blogSchema = new mongoose.Schema({
	title: String,
	author: String,
	url: String,
	likes: Number
})

console.log('schema defined in blog.js')

blogSchema.set('toJSON', {
	transform: (document, returnedObject) => {
		returnedObject.id = returnedObject._id.toString()
		delete returnedObject._id
		delete returnedObject.__v
	}
})

module.exports = mongoose.model('Blog', blogSchema)
