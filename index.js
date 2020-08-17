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
app.get('/api/players', (req, res) => {
  res.json(players)
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`)
})