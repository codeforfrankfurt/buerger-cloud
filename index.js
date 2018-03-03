const express = require('express')

const app = express()

app.get('/health', (req, res) => res.json('ok'))

app.post('/meter/:meter/loc/:lat/:lon', (req, res) => {
  res.json('not yet implemented')
})

app.get('/data/:lat1/:lon1/:lat2/:lon2/:from/:to', (req, res) => {
  res.json('not yet implemented')
})

app.listen(process.env.PORT || 8080)
