const mongoose = require('mongoose');

// Data mapped on nodemon.json
const mongoHost = process.env.MONGO_HOST;
const mongoPort = process.env.MONGO_PORT;
const mongoUser = process.env.MONGO_USER;
const mongoPass = process.env.MONGO_PASSWORD;
const mongoDB = process.env.MONGO_DB

// Connect to mongodb
module.exports = mongoose.connect(`${mongoUser}:${mongoPass}@mongodb://${mongoHost}:${mongoPort}/${mongoDB}`, { useNewUrlParser: true })
    .then(() => {
        console.log('Mongo connection successfuly');
    })
    .catch(err => {
        console.log("[ERROR] MONGO CONNECTION: "); 
        console.log(err); 
    });