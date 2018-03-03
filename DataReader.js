const fs = require('fs')

module.exports = {
  find: params => {
    return new Promise((fulfil, reject) => {
      fs.readdir(__dirname + '/data', (err, files) => {
        fulfil(files.map(file => fs.readFileSync(__dirname + '/data/' + file).toString()))
      })
    })
  }
}
