const should = require('should')
const dataReader = require('./DataReader')

function collectionMock(error, features) {
  return {
    find: () => ({
      toArray: callback => {
        callback(error, features)
      }
    })
  }
}

function modelMock(collection) {
  return {
    db: {
      collection: name => name === 'Measurement' ? collection : null
    }
  }
}

describe('DataReader', () => {
  it('should return a FeatureCollection', done => {
    dataReader.find({}, modelMock(collectionMock()))
      .then(result => {
        result.should.have.property('type')
        result.type.should.equal('FeatureCollection')
        done()
      })
      .catch(done)
  })

  it('should return features', done => {
    dataReader.find({}, modelMock(collectionMock(null, [{_id: 42}])))
      .then(result => {
        result.should.have.property('features')
        result.features.length.should.equal(1)
        result.features[0].should.have.property('_id')
        result.features[0]._id.should.equal(42)
        done()
      })
      .catch(done)
  })

  it('should return its properties', done => {

    const params = {
      lat1: 8,
      lat2: 9,
      lon1: 50,
      lon2: 51,
      from: '2018-03-04 10:00:00',
      to: '2018-03-04 12:00:00'
    }
    dataReader.find(params, modelMock(collectionMock()))
      .then(result => {
        result.should.have.property('properties')
        result.properties.should.deepEqual({
          box: [params.lat1, params.lon1, params.lat2, params.lon2],
          dateTimeRange: {from: new Date(params.from), to: new Date(params.to)}
        })
        done()
      })
      .catch(done)
  })
})
