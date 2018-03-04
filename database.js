const MongoClient = require('mongodb').MongoClient

module.exports = {
  connect: (host, port, dbName, user, password) => new Promise((fulfil, reject) => {
    const url = 'mongodb://' + user + ':' + password + '@' + host + ':' + port + '/' + dbName
    MongoClient.connect(url, (err, client) => {
      if (err) {
        console.error('Cannot connect to MongoDB:', err)
        reject(err)
      } else {
        console.log("Connected successfully to MongoDB server")
        const db = client.db(dbName)
        fulfil({db, client})
      }
    })
  })
}
