const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('Please provide the password as an argument: node mongo.js <password>')
  process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://fullstack:${password}@cluster0.t97qm.mongodb.net/player-tracker-app?retryWrites=true&w=majority`

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })

const playerSchema = new mongoose.Schema({
  name: String,
  url: String,
  wins: Number,
  losses: Number,
  titles: Number
})

const Player = mongoose.model('Player', playerSchema)

// const player = new Player({
//   name: process.argv[3],
//   url: process.argv[4],
//   wins: 0,
//   losses: 0,
//   titles: 0
// })

// player.save().then(result => {
//   console.log(`player ${player.name} saved | url: ${player.url}`)
//   mongoose.connection.close()
// })

Player.find({}).then(result => {
  console.log("players")
  result.forEach(player => {
    console.log(`name: ${player.name} - url: ${player.url}`)
  })
  mongoose.connection.close()
})