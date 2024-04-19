const express = require('express')
require('dotenv').config()
const cors = require('cors')
const mongoose = require('mongoose')
const Blog = require('./models/Blog')
const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser')

const app = express()

const PORT = process.env.PORT || 4000

app.use(cors({ origin: 'https://kaikaci12.github.io', credentials: true }))
app.use(express.json({ limit: '10mb' }))
app.use(cookieParser())

const createBlogs = async (req, res) => {
  const { title, description, image, email, author, date, types } = req.body
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

const authenticate = async (req, res) => {
  const { email } = req.body
  jwt.sign({ email }, process.env.SECRET, {}, (err, token) => {
    if (err) throw err
    res.cookie('token', token).json({ message: 'User has been authenticated' })
  })
}

const getToken = async (req, res) => {
  const { token } = req.cookies
  try {
    jwt.verify(token, process.env.SECRET, {}, (err, token) => {
      if (err) throw err
      const { email } = token
      if (!email) {
        res
          .status(401)
          .json({ message: 'User is not authenticated', authenticated: false })
      } else {
        res
          .status(200)
          .json({ message: 'User is authenticated', authenticated: true })
      }
    })
  } catch (err) {
    console.log(err)
  }
}

app.get('/get-blogs', getAllBlogs)
app.post('/add-blog', createBlogs)
app.post('/authenticate', authenticate)
app.get('/check-auth', getToken)

mongoose.connect(process.env.MONGO_URL).then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
  })
  console.log('successfully connected to the database')
})
