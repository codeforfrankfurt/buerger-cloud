const express = require('express')
const bodyParser = require('body-parser')
const MeasurementHandler = require('./MeasurementHandler')

const app = express()
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

app.get('/health', (req, res) => res.json('ok'))

app.post('/push-sensor-data', (req, res) => {
  MeasurementHandler.create(req.body)
  res.json('ok')
})

app.get('/data/:lat1/:lon1/:lat2/:lon2/:from/:to', (req, res) => {
  res.json('not yet implemented')
})

app.listen(process.env.PORT || 8080)
