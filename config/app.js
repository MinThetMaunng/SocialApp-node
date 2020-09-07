const bodyParser = require('body-parser')
const cors = require('cors')
const db = require('./db')

module.exports = (app) => {
    
    db.setup()
    app.use(cors())
    app.use(bodyParser.urlencoded({ extended: false }))
    app.use(bodyParser.json())
    
    return app

}