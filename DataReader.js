const fs = require('fs.promised')
const path = require('path')

const dataPath = __dirname + '/data'

function inBox(lat, lon, box) {
  return true
}

function inDateTimeRange(timestamp, dateTimeRange) {
  return timestamp >= dateTimeRange.from && timestamp <= dateTimeRange.to
}

function filterRelevant(file, box, dateTimeRange) {
  if (file.indexOf('.') === 0) {
    return false
  }
  const [dummy, lat, lon, timestamp] = file.match(/([\d.]+):([\d.]+):(.*):/)
  return inBox(lat, lon, box) && inDateTimeRange(new Date(timestamp), dateTimeRange)
}

module.exports = {
  find: (params, model) => {
    const type = 'FeatureCollection'
    const box = [params.lat1, params.lon1, params.lat2, params.lon2]
    const dateTimeRange = {from: new Date(params.from), to: new Date(params.to)}
    const properties = {box, dateTimeRange}
    return new Promise((fulfil, reject) => {
      const measurements = model.db.collection('Measurement')
      measurements.find({}).toArray((error, features) => {
        if (error) {
          console.error(error)
          reject(error)
        } else {
          fulfil({type, features, properties})
        }
      })
    })
  },

  getFakeData: () => {
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

    return {
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
  }
}
