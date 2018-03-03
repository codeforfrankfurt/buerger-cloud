const fs = require('fs.promised')
const path = require('path')

const dataPath = __dirname + '/data'

function inBox(file, box) {
  return true
}

function inDateTimeRange(file, dateTimeRange) {
  return true
}

function filterRelevant(file, box, dateTimeRange) {
  return file.indexOf('.') !== 0 && inBox(file, box) && inDateTimeRange(file, dateTimeRange)
}

module.exports = {
  find: params => {
    const type = 'FeatureCollection'
    const box = [params.lat1, params.lon1, params.lat2, params.lon2]
    const dateTimeRange = {from: params.from, to: params.to}
    const properties = {box, dateTimeRange}
    return fs.readdir(dataPath)
      .then(files => files.filter(file => filterRelevant(file, box, dateTimeRange)))
      .then(files => files.map(file => JSON.parse(fs.readFileSync(path.join(dataPath, file)).toString())))
      .then(features => ({type, features, properties: {box, dateTimeRange}}))
  }
}
