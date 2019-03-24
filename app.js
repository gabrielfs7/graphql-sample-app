const bodyParser = require('body-parser'); 
const express = require('express');

const app = express();

// Use BodyParser as middleware to handle JSON body requests
app.use(bodyParser.json());

// Application will listem to everything pointing to port 8000
app.listen(8000);

// Testing express is routing properly. Access http://localhost:8080
app.get('/', (req, res, next) => {
    res.send('{"message" : "Hello World!"}');
});