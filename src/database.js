const MongoClient = require('mongodb').MongoClient

module.exports = {
  connect: (host, port, dbName, user, password) => new Promise((fulfil, reject) => {
    const url = 'mongodb://' + user + ':' + password + '@' + host + ':' + port + '/' + dbName
    MongoClient.connect(url, (err, client) => {
      if (err) {
        console.error('Cannot connect to MongoDB:', err)  // eslint-disable-line no-console
        reject(err)
      } else {
        console.log('Connected successfully to MongoDB server')  // eslint-disable-line no-console
        const db = client.db(dbName)
        fulfil({db, client})
      }
    })
  })
}
