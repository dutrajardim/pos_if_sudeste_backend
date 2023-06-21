const express = require('express')
const mongoose = require('mongoose')
const path = require('path')
const router = require('./router.js')
const cors = require('cors')

require('dotenv').config()

const mongoUrl = process.env.MONGO_URL
const port = process.env.PORT ?? 3000
const host = process.env.HOST ?? "0.0.0.0"

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.static(path.join(__dirname, 'public')))
app.use(router)

const startServer = async () => {
  try {
    await mongoose.connect(mongoUrl)
    app.listen(port, host, () => {
      console.log(`Escutando em ${host}:${port}`)
    })
  }
  catch (err) {
    console.error(err)
    process.exit(-1)
  }
}

startServer()