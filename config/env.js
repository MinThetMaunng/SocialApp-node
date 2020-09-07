const path = require('path')
const result = require('dotenv').config({ 
    path: path.join(__dirname + './../.env')
})

if(result.error) {
    console.log(`Error in setting up env : ${result.error}`)
    throw result.error
}
