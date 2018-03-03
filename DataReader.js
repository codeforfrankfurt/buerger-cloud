const fs = require('fs')

module.exports = {
  find: params => {
    return new Promise((fulfil, reject) => {
      fs.readdir(__dirname + '/data', (err, files) => {
        if (err) {
          reject(err)
        } else {
          fulfil(files.map(file => {
            if (file.indexOf('.') !== 0) {
              return JSON.parse(fs.readFileSync(__dirname + '/data/' + file).toString())
            }
          }).filter(Boolean))
        }
      })
    })
  }
}
