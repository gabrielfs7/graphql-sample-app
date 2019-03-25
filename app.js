const bodyParser = require('body-parser'); 
const express = require('express');
const graphqlHttp = require('express-graphql');
const { buildSchema } = require('graphql');
const mongoose = require('mongoose');

const mongoHost = process.env.MONGO_HOST;
const mongoPort = process.env.MONGO_PORT;
const mongoUser = process.env.MONGO_USER;
const mongoPass = process.env.MONGO_PASSWORD;

const app = express();

// Temporary storage for users
const users = [];

// Access http://localhost:8080/graphql
app.post('/graphql', graphqlHttp({
    schema: buildSchema(`
        type User {
            _id: ID!
            email: String!
            username: String!
            password: String!
            birthDate: String!
        }

        input CreateUserInput {
            email: String!
            username: String!
            password: String!
            birthDate: String!
        }

        type RootQuery {
            users: [User!]!
        }

        type RootMutation {
            createUser(input: CreateUserInput): User
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
            return users;
        },
        createUser: (args) => {
            const user = {
                _id: Math.random().toString(),
                email: args.input.email,
                username: args.input.username,
                password: args.input.password,
                birthDate: args.input.birthDate
            }

            users.push(user);

            return user
        }
    },
    // Enables "Graphiql" testing tool accessible now by http://localhost:8080/graphql
    graphiql: true
}));

// Use BodyParser as middleware to handle JSON body requests
app.use(bodyParser.json());

// Application will listem to everything pointing to port 8000
app.listen(8000);

// Connect to mongodb
mongoose.connect(`${mongoUser}:${mongoPass}@mongodb://${mongoHost}:${mongoPort}/graphql`, { useNewUrlParser: true })
    .then(() => {
        console.log('Mongo connection successfuly');
    })
    .then().catch(err => {
        console.log("[ERROR] MONGO CONNECTION: "); 
        console.log(err); 
    });