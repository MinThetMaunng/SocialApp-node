const mongoose = require('mongoose')
const uri = `mongodb://${process.env.DB_USER}:${process.env.DB_PASS}${process.env.DB_URI}`;
            
module.exports = () => {

    mongoose.connect(uri, {
        useNewUrlParser: true,
        useFindAndModify: false,
        useCreateIndex: true,
        useUnifiedTopology: true 
    })

    mongoose.connection.on('connected', () => {
        console.log('DB STATUS    : '+ 'CONNECTED'.cyan)
    })
    mongoose.connection.on('error', function(err) {
        console.error('DB STATUS    ' + 'FAILED'.brightRed);
    });

}