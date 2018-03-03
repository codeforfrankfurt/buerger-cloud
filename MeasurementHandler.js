const fs = require('fs')

const mapping = {
  P1: 'PM10',
  P2: 'PM2.5'
}

function typeMapper(value) {
  return mapping[value]
}

function prepare(data) {
  const properties = {}

  if (data.sensordatavalues) {
    data.sensordatavalues.forEach(info => {
      const key = typeMapper(info.value_type)
      if (key) {
        properties[key] = info.value
      }
    })
  } else {
    console.error('No sensordatavalues', data)
  }

  return {
    type: 'Feature',
    geometry: {
      type: 'Point',
      coordinates: [
        data.location ? data.location.latitude : 50,
        data.location ? data.location.longitude : 8.5,
      ]
    },
    properties
  }
}

module.exports = {
  create: data => {
    const position = data.location ? data.location.latitude + ':' + data.location.longitude : '0:0'
    const timestamp = data.timestamp || new Date().toUTCString()
    const id = data.id || +new Date()
    fs.writeFile(__dirname + '/data/' + position + ':' + timestamp + ':' + id, JSON.stringify(prepare(data)), () => {})
  }
}
