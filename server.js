const express = require('express')
require('./config/env')

const app = require('./config/app')(express())
const logs = require('./helpers/logs')
const port = process.env.PORT || 3000
const userRoutes = require('./routes/UserRoutes')
const postRoutes = require('./routes/PostRoutes')
const followRoutes = require('./routes/FollowRoutes')

app.use('/users', userRoutes)
app.use('/posts', postRoutes)
app.use('/posts', followRoutes)

app.listen(port, () => {
    console.log(logs.serverRunning)
    console.log(logs.environment)
})