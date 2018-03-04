const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const MeasurementHandler = require('./MeasurementHandler')
const DataReader = require('./DataReader')
const database = require('./database')

database.connect(process.env.MONGODB_HOST, process.env.MONGODB_PORT, process.env.MONGODB_DBNAME, process.env.MONGODB_USER, process.env.MONGODB_PASSWORD)
  .then(model => {
    const app = express()
    app.set('json spaces', 2)
    app.use(bodyParser.urlencoded({extended: false}))
    app.use(bodyParser.json())
    app.use(cors())

    app.get('/health', (req, res) => res.json('ok'))

    app.get('/version', (req, res) => {
      res.json('0.1')
    })

    app.post('/push-sensor-data', (req, res) => {
      MeasurementHandler.create(req.body, model)
      res.json('ok')
    })

    app.get('/data/:lat1/:lon1/:lat2/:lon2/:from/:to', (req, res) => {
      DataReader.find(req.params, model)
        .then(data => res.json(data))
        .catch(error => res.status(500).json({error}))
    })

    app.get('/data/fake', function (req, res) {
      DataReader.getFakeData()
        .then(data => res.json(data))
    })

    app.listen(process.env.PORT || 8080)
  })
