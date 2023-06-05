const express = require('express')
const path = require('path')
const contacts = require('./contacts')

// Rotas da API
const apiRouter = express.Router()

apiRouter.post('/sum', (req, res) =>
  Array.isArray(req.body) && req.body.every(v => typeof v === 'number') ?
    res.status(200).json({ result: req.body.reduce((acc, cur) => acc + cur, 0) }) :
    res.status(400).json({ message: "O corpo da requisição deve conter um array de números!" }))

apiRouter.get('/contacts', (_, res) =>
  res.status(200).json(contacts))

apiRouter.get('^/contacts/:contact([0-9]+)', (req, res) =>
  req.params.contact >= contacts.length ?
    res.status(404).json({ message: "Recurso não encontrado!" }) :
    res.status(200).json(contacts[req.params.contact]))

apiRouter.get('*', (_, res) =>
  res.status(404).json({ message: "Recurso não encontrado!" }))

// Rotas do APP que serão respondidas pelo index.html
const appRouter = express.Router()
appRouter.use(/^\/(api|rest)/, apiRouter)

appRouter.get('*', (_, res) =>
  res.sendFile(path.join(__dirname, 'public', 'index.html')))

module.exports = appRouter