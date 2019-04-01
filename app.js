const bodyParser = require('body-parser'); 
const express = require('express');
const graphqlHttp = require('express-graphql');
const graphqlSchema = require('./graphql/schema');

const connection = require('./database/connection');

const app = express();
const resolvers = require('./graphql/resolvers/index');

// Use BodyParser as middleware to handle JSON body requests
app.use(bodyParser.json());

// Application will listem to everything pointing to port 8000
app.listen(8000);

app.use('/graphql', graphqlHttp({
    schema: graphqlSchema,
    rootValue: resolvers, // These are 'resolvers', they must have the same name as inside 'RootQuery' schema:
    graphiql: true // Enables "Graphiql" testing tool accessible now by http://localhost:8080/graphql
}));