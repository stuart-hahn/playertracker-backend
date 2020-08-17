const express = require('express')
const app = express()

const players = [
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

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`)
})