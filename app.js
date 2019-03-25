const bodyParser = require('body-parser'); 
const express = require('express');
const graphqlHttp = require('express-graphql');
const { buildSchema } = require('graphql');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Data mapped on nodemon.json
const mongoHost = process.env.MONGO_HOST;
const mongoPort = process.env.MONGO_PORT;
const mongoUser = process.env.MONGO_USER;
const mongoPass = process.env.MONGO_PASSWORD;
const mongoDB = process.env.MONGO_DB

const User = require('./models/user');
const Task = require('./models/task');
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
            password: String
            birthDate: String!
        }

        type Task {
            _id: ID!
            task: String!
            doAt: String!
            status: String!
        }

        input CreateUserInput {
            email: String!
            username: String!
            password: String!
            birthDate: String!
        }

        input CreateTaskInput {
            task: String!
            doAt: String!
        }

        type RootQuery {
            users: [User!]!
        }

        type RootMutation {
            createUser(input: CreateUserInput): User
            createTask(input: CreateTaskInput): Task
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
                            // Return the document object from mongoose, but format/override fields
                            return { 
                                ...user._doc, 
                                password: null,
                                _id: user._doc._id.toString(), 
                                birthDate: user._doc.birthDate.toLocaleDateString() 
                            } 
                        });
                    }
                ).catch(err => {
                    throw err;
                });
        },
        createUser: (args) => {
            return User.findOne({ email: args.input.email })
                .then(user => {
                    if (user) {
                        throw new Error('User already exists');
                    }

                    return bcrypt.hash(args.input.password, 12);
                }).then(hashedPassword => {
                    const user = new User({
                        email: args.input.email,
                        username: args.input.username,
                        password: hashedPassword,
                        birthDate: new Date(args.input.birthDate)
                    });

                    return user.save();
                }).then(user => {
                    // Return the document object from mongoose, but format/override fields
                    return {
                        ...user._doc, 
                        password: null,
                        _id: user._doc._id.toString(), 
                        birthDate: user._doc.birthDate.toLocaleDateString() 
                    };
                })
                .catch(err => {
                    throw err;
                });
        },
        tasks: () => {
            // Get results from mongodb
            return Task.find()
                .then(
                    tasks => {
                        // It is necessary to get _doc of each document to remove extra metadata
                        return tasks.map(task => {
                            // I need to translate the mongoDb ObjectId and doAt to string here
                            return { ...task._doc, _id: task._doc._id.toString(), doAt: task._doc.doAt.toLocaleDateString() }
                        });
                    }
                ).catch(err => {
                    throw err;
                });
        },
        createTask: (args) => {
            const task = new Task({
                task: args.input.task,
                doAt: args.input.doAt,
                status: 'pending'
            });

            return task.save().then(
                result => {
                    console.log('[SUCESS] Task saved');
                    console.log(result);

                    // Return the document object from mongoose
                    return { ...result._doc }
                }
            ).catch(
                err => {
                    console.log('[ERROR] Saving Task');
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