const bodyParser = require('body-parser')
const path = require('path')
const result = require('dotenv').config({ 
    path: path.join(__dirname + './../.env')
})

if(result.error) {
    console.log("ERROR")
    console.log(result.error)
    throw result.error
}

module.exports = (app) => {

        require('./db')()
        app.use(bodyParser.urlencoded({ extended: false }))
        app.use(bodyParser.json())
        
        return app
    
}