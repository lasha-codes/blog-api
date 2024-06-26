const mongoose = require('mongoose')

const BlogSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String },
    email: { type: String, required: true },
    author: { type: String, required: true },
    date: { type: String, type: Date },
    types: [],
  },
  { timestamps: true }
)

const BlogModel = mongoose.model('Blogs', BlogSchema)

module.exports = BlogModel
