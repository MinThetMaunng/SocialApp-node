const mongoose = require('mongoose')
const dbUri = `mongodb://${process.env.DB_USER}:${process.env.DB_PASS}${process.env.DB_URI}`;
const logs = require('../helpers/logs')
            
module.exports = {

    setup: () => {
        mongoose.connect(dbUri, {
            useNewUrlParser: true,
            useFindAndModify: false,
            useCreateIndex: true,
            useUnifiedTopology: true 
        })

        mongoose.connection.on('connected', () => {
            console.log(logs.DatabaseConnected)
        })
        mongoose.connection.on('error', function(err) {
            console.error(logs.DatabaseFailed);
            throw err
        });
    }

}