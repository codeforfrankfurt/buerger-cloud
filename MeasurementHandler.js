const fs = require('fs')

module.exports = {
  create: data => {
    console.log(data)
    fs.writeFile(__dirname + '/data/' + data.location.latitude + ':' + data.location.longitude + ':' + data.timestamp + ':' + data.id, JSON.stringify(data))
  }
}