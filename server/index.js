const express = require('express')
require('dotenv').config()
const cors = require('cors')
const db = require('./connectDb.js')

const app = express()

const PORT = process.env.PORT || 4000

app.use(cors())
app.use(express.json())

const getBlogs = async (req, res) => {
  try {
    const query = 'SELECT * FROM blogs'
    const data = await db.query(query)
    res.status(200).json(data.rows)
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Server error.' })
  }
}

app.get('/get-blogs', getBlogs)

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
})
