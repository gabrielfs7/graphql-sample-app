const bodyParser = require('body-parser'); 
const express = require('express');
const graphqlHttp = require('express-graphql');
const graphqlSchema = require('./graphql/schema');

const connection = require('./database/connection');

const app = express();

const FindUserService = require('./service/user/FindUserService');
const CreateUserService = require('./service/user/CreateUserService');
const FindTaskService = require('./service/task/FindTaskService');
const CreateTaskService = require('./service/task/CreateTaskService');

// Use BodyParser as middleware to handle JSON body requests
app.use(bodyParser.json());

// Application will listem to everything pointing to port 8000
app.listen(8000);

app.use('/graphql', graphqlHttp({
    schema: graphqlSchema,
    // These are 'resolvers', they must have the same name as inside 'RootQuery' schema:
    rootValue: {
        users: () => {
            return FindUserService.findAll();
        },
        createUser: (args) => {
            return CreateUserService.create(args);
        },
        tasks: () => {
            return FindTaskService.findAll();
        },
        createTask: (args) => {
            return CreateTaskService.create(args);
        }
    },
    // Enables "Graphiql" testing tool accessible now by http://localhost:8080/graphql
    graphiql: true
}));