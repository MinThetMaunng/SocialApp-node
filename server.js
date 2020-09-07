const express = require('express')
require('./config/env')

const app = require('./config/app')(express())
const logs = require('./helpers/logs')
const port = process.env.PORT || 3000

app.get('/', (req,res) => res.send('<h1>Hello World</h1>') )
app.listen(port, () => {
    console.log(logs.serverRunning)
    console.log(logs.environment)
})