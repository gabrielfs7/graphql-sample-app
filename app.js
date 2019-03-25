const bodyParser = require('body-parser'); 
const express = require('express');
const graphqlHttp = require('express-graphql');
const { buildSchema } = require('graphql');
const mongoose = require('mongoose');

// Data mapped on nodemon.json
const mongoHost = process.env.MONGO_HOST;
const mongoPort = process.env.MONGO_PORT;
const mongoUser = process.env.MONGO_USER;
const mongoPass = process.env.MONGO_PASSWORD;
const mongoDB = process.env.MONGO_DB

const User = require('./models/user');
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
            // Get results from mongodb
            return User.find()
                .then(
                    users => {
                        // It is necessary to get _doc of each document to remove extra metadata
                        return users.map(user => {
                            // I need to translate the mongoDb ObjectId and bithDate to string here
                            return { ...user._doc, _id: user._doc._id.toString(), birthDate: user._doc.birthDate.toLocaleDateString() } 
                        });
                    }
                ).catch(err => {
                    throw err;
                });
        },
        createUser: (args) => {
            const user = new User({
                email: args.input.email,
                username: args.input.username,
                password: args.input.password,
                birthDate: new Date(args.input.birthDate)
            });

            return user.save().then(
                result => {
                    console.log('[SUCESS] User saved');
                    console.log(result);

                    // Return the document object from mongoose
                    return { ...result._doc }
                }
            ).catch(
                err => {
                    console.log('[ERROR] Saving User');
                    console.log(err);

                    return err;
                }
            );
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
mongoose.connect(`${mongoUser}:${mongoPass}@mongodb://${mongoHost}:${mongoPort}/${mongoDB}`, { useNewUrlParser: true })
    .then(() => {
        console.log('Mongo connection successfuly');
    })
    .catch(err => {
        console.log("[ERROR] MONGO CONNECTION: "); 
        console.log(err); 
    });