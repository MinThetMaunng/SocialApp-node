const express = require('express')
require('./config/env')

const app = require('./config/app')(express())
const logs = require('./helpers/logs')
const port = process.env.PORT || 3000

app.get('/', (req, res) => res.send("<h1>Hello world</h1>"))
app.listen(port, () => console.log(logs.ServerRunning))