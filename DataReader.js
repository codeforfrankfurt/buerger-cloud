const fs = require('fs.promised')

module.exports = {
  find: params => {
    return fs.readdir(__dirname + '/data')
      .then(files => files.filter(file => file.indexOf('.') !== 0))
      .then(files => files.map(file => JSON.parse(fs.readFileSync(__dirname + '/data/' + file).toString())))
  }
}
