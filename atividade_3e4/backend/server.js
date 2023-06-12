const express = require('express')
const path = require('path')
const router = require('./router.js')
const cors = require('cors')

const port = process.env.PORT ?? 3000
const host = process.env.HOST ?? "0.0.0.0"

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.static(path.join(__dirname, 'public')))
app.use(router)

app.listen(port, host, () => {
  console.log(`Escutando em ${host}:${port}`)
})