const express = require('express')
const morgan = require('morgan')
const app = express()

app.use(express.json())
app.use(morgan('tiny'))

let players = [
  {
    id: 1,
    name: "slump",
    url: "twitch.tv/slumpcity"
  },
  {
    id: 2,
    name: "antcap24",
    url: "twitch.tv/antcap24"
  },
  {
    id: 3,
    name: "rocketz",
    url: "muthead.com"
  },
]

app.get('/', (req, res) => {
  res.send('<h1>Playter Tracker App</h1>')
})

// GET info about API
app.get('/info', (req, res) => {
  const date = new Date()
  const playerCount = players.length

  res.send(`<p>This API has data for ${playerCount} players.</p><p>${date}</p>`)
})

// GET all players
app.get('/api/players', (req, res) => {
  res.json(players)
})

// GET single player resource
app.get('/api/players/:id', (req, res) => {
  const id = +req.params.id
  const player = players.find(p => p.id === id)

  res.json(player)
})

// POST create a player resource
const generateId = () => {
  const maxId = players.length > 0 ? Math.max(...players.map(p => p.id)) : 0
  return maxId + 1
}

app.post('/api/players', (req, res) => {
  const body = req.body

  if (players.find(p => p.name === body.name)) {
    return res.status(400).json({
      error: "name must be unique"
    })
  }

  if (!body.name) {
    return res.status(400).json({
      error: "name must be provided"
    })
  }

  if (!body.url) {
    return res.status(404).json({
      error: "url must be provided"
    })
  }

  const player = {
    id: generateId(),
    name: body.name,
    url: body.url || 'unknown url'
  }

  players = players.concat(player)
  res.json(player)
})

// DELETE a resource
app.delete('/api/players/:id', (req, res) => {
  const id = +req.params.id
  players = players.filter(p => p.id !== id)

  res.status(204).end()
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`)
})