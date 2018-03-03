const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const MeasurementHandler = require('./MeasurementHandler')
const DataReader = require('./DataReader')

const app = express()
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
app.use(cors())

app.get('/health', (req, res) => res.json('ok'))

app.post('/push-sensor-data', (req, res) => {
  MeasurementHandler.create(req.body)
  res.json('ok')
})

app.get('/data/:lat1/:lon1/:lat2/:lon2/:from/:to', (req, res) => {
  DataReader.find(req.params)
    .then(data => res.json(data))
    .catch(console.error)
})


app.get('/version', function (req, res) {
  res.json('0.1')
})

app.get('/data/fake', function (req, res) {
  const latMin = 50.225574
  const lonMin = 8.473135
  const latMax = 50.0159274
  const lonMax = 8.811476
  const p1Min = 1.0
  const p1Max = 100.0
  const p2Min = 10.0
  const p2Max = 100.0

  const features = []

  for (let i = 0; i < 100; i++) {
    const point = {
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [
          parseFloat(Math.random() * (latMax - latMin + 1) + latMin).toFixed(6),
          parseFloat(Math.random() * (lonMax - lonMin + 1) + lonMin).toFixed(6)
        ]
      },
      "properties": {
        "id": "" + parseInt(i + 1) + "",
        "PM10": parseInt(Math.random() * (p1Max - p1Min + 1) + p1Min),
        "PM2.5": parseInt(Math.random() * (p2Max - p2Min + 1) + p2Min)
      }
    }
    features.push(point)
  }

  const response = {
    "type": "FeatureCollection",
    "features": features,
    "properties": {
      "box": [latMin, lonMin, latMax, lonMax],
      "dateTimeRange": {
        "from": "2018-03-03T14:00:00",
        "to": "2018-03-03T15:00:00"
      }
    }
  }

  res.json(response)
})

app.listen(process.env.PORT || 8080)
