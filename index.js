require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const Player = require('./models/player')
const { response } = require('express')

const app = express()

app.use(express.json())
app.use(cors())
app.use(express.static('build'))
app.use(morgan('tiny'))

// GET info about API
app.get('/info', (req, res) => {
  const date = new Date()
  const playerCount = players.length

  res.send(`<p>This API has data for ${playerCount} players.</p><p>${date}</p>`)
})

// GET all players
app.get('/api/players', (request, response) => {
  Player.find({}).then(players => {
    response.json(players)
  })
})

// GET single player resource
app.get('/api/players/:id', (req, res) => {
  Player.findById(req.params.id).then(player => {
    res.json(player)
  })
})

// POST create a player resource
app.post('/api/players', (request, response) => {
  const body = request.body
  console.log(body.name)
  if (body.name === undefined) {
    return response.status(400).json({ error: 'name missing' })
  }

  const player = new Player({
    name: body.name,
    url: body.url,
    wins: 0,
    losses: 0,
    titles: 0
  })

  player.save().then(savedPlayer => {
    response.json(savedPlayer)
  })
})

// DELETE a resource
app.delete('/api/players/:id', (req, res) => {
  const id = +req.params.id
  players = players.filter(p => p.id !== id)

  res.status(204).end()
})

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`)
})