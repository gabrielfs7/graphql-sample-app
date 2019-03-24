const bodyParser = require('body-parser'); 
const express = require('express');
const graphqlHttp = require('express-graphql');
const { buildSchema } = require('graphql');

const app = express();

// Use BodyParser as middleware to handle JSON body requests
app.use(bodyParser.json());

// Application will listem to everything pointing to port 8000
app.listen(8000);

// Access http://localhost:8080/graphql
app.post('/graphql', graphqlHttp({
    schema: buildSchema(`
        type RootQuery {
            users: [String!]!
        }

        type RootMutation {
            createUser(userName: String): String
        }

        schema {
            query: RootQuery
            mutation: RootMutation
        }
    `),
    // These are 'resolvers', they must have the same name as inside 'RootQuery' above:
    rootValue: {
        users: () => {
            // Mocking result for now
            return [
                'John',
                'Paul',
                'Maria'
            ]
        },
        createUser: (args) => {
            return args.userName
        }
    },
    // Enables "Graphiql" testing tool accessible now by http://localhost:8080/graphql
    graphiql: true
}));