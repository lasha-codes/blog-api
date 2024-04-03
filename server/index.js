const express = require('express')
require('dotenv').config()
const cors = require('cors')
const mongoose = require('mongoose')
const Blog = require('./models/Blog')

const app = express()

const PORT = process.env.PORT || 4000

app.use(cors())
app.use(express.json())

const createBlogs = async (req, res) => {
  const { title, description, image, email, author, date } = req.body
  try {
    if (!image) {
      return
    }
    const createdBlog = await Blog.create({
      title,
      description,
      image,
      email,
      author,
      types,
      date,
    })
    res.status(200).json({
      message: 'U have successfully created a blog',
      ...createdBlog,
    })
  } catch (err) {
    console.error(err)
  }
}

const getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find({})
    res.status(200).json(blogs)
  } catch (err) {
    res
      .status(500)
      .json({ message: 'Sorry something went wrong with the server' })
  }
}

app.get('/get-blogs', getAllBlogs)
app.post('/add-blog', createBlogs)

mongoose.connect(process.env.MONGO_URL).then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
  })
  console.log('successfully connected to the database')
})
