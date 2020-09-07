const express = require('express')
const app = require('./config/app')(express())
const colors = require('colors')
const port = process.env.PORT || 3000

app.listen(port, async () => { await console.log(`SERVER PORT  : ${port.cyan}`)})