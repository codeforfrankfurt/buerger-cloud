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
  find: params => {
    const type = 'FeatureCollection'
    const box = [params.lat1, params.lon1, params.lat2, params.lon2]
    const dateTimeRange = {from: new Date(params.from), to: new Date(params.to)}
    const properties = {box, dateTimeRange}
    return fs.readdir(dataPath)
      .then(files => files.filter(file => filterRelevant(file, box, dateTimeRange)))
      .then(files => files.map(file => JSON.parse(fs.readFileSync(path.join(dataPath, file)).toString())))
      .then(features => ({type, features, properties}))
  }
}
