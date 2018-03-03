const express = require('express')

const app = express()

app.get('/health', (req, res) => res.json('ok'))
app.listen(8080)
