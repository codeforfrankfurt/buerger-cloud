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
  create: (data, model) => {
    const measurements = model.db.collection('Measurement')
    measurements.insert(prepare(data), () => {})
  }
}
