const bodyParser = require('body-parser'); 
const express = require('express');
const graphqlHttp = require('express-graphql');
const graphqlSchema = require('./graphql/schema');
const authMiddleware = require('./middlewares/auth');
const corsMiddleware = require('./middlewares/cors');
const connection = require('./database/connection');

const app = express();
const resolvers = require('./graphql/resolvers/index');

// Use BodyParser as middleware to handle JSON body requests
app.use(bodyParser.json());

// Use Auth middlerware to check user JWT token
app.use(authMiddleware);

// Use CORS middlerware allow external requests
app.use(corsMiddleware);

// Application will listem to everything pointing to port 8000
app.listen(8000);

app.use('/graphql', graphqlHttp({
    schema: graphqlSchema,
    rootValue: resolvers, // These are 'resolvers', they must have the same name as inside 'RootQuery' schema:
    graphiql: true // Enables "Graphiql" testing tool accessible now by http://localhost:8080/graphql
}));