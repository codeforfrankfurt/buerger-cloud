const fs = require('fs')

module.exports = {
  create: data => {
    const position = data.location ? data.location.latitude + ':' + data.location.longitude : '0:0'
    const timestamp = data.timestamp || new Date().toUTCString()
    const id = data.id || +new Date()
    fs.writeFile(__dirname + '/data/' + position + ':' + timestamp + ':' + id, JSON.stringify(data))
  }
}
