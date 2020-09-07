require('colors')
let port = process.env.PORT || 3000

const messages = {
    ServerRunning:     `SERVER   : ${port.cyan}`,
    DatabaseConnected: 'DATABASE : ' + 'CONNECTED'.cyan,
    DatabaseFailed:    'DATABASE : ' + 'FAILED'.brightRed,
}

module.exports = messages