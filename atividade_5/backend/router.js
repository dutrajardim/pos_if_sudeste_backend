const express = require('express')
const path = require('path')
const userController = require('./controllers/user')
const commentController = require('./controllers/comment')

// Rotas da API
const apiRouter = express.Router()

apiRouter.get('/users', userController.list)
apiRouter.post('/users', userController.save)

apiRouter.get('/comments', commentController.list)
apiRouter.post('/comments', commentController.save)

apiRouter.get('*', (_, res) =>
  res.status(404).json({ message: "Recurso não encontrado!" }))

// Rotas do APP que serão respondidas pelo index.html
const appRouter = express.Router()
appRouter.use(/^\/(api|rest)/, apiRouter)

appRouter.get('*', (_, res) =>
  res.sendFile(path.join(__dirname, 'public', 'index.html')))

module.exports = appRouter