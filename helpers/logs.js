require('colors')
let port = process.env.PORT || 3000
let env = process.env.ENV

const messages = {
    serverRunning:     `SERVER      : ${port.cyan}`,
    environment:       `ENVIRONMENT : ${env.cyan}`,
    databaseConnected: 'DATABASE    : ' + 'CONNECTED'.cyan,
    databaseFailed:    'DATABASE    : ' + 'FAILED'.brightRed,
}

module.exports = messages