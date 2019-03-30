const bodyParser = require('body-parser'); 
const express = require('express');
const graphqlHttp = require('express-graphql');
const graphqlSchema = require('./graphql/schema');
const bcrypt = require('bcryptjs');

const connection = require('./database/connection');

const Task = require('./models/task');
const User = require('./models/user');
const app = express();

// Use BodyParser as middleware to handle JSON body requests
app.use(bodyParser.json());

// Application will listem to everything pointing to port 8000
app.listen(8000);

app.use('/graphql', graphqlHttp({
    schema: graphqlSchema,
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
            return Task.find().populate('owner')
                .then(tasks => {
                    // Return the document objects from mongoose, but formating fields
                    return tasks.map(task => {
                        console.log(task._doc);

                        return { 
                            ...task._doc, 
                            _id: task._doc._id.toString(), 
                            doAt: task._doc.doAt.toLocaleDateString() 
                        }
                    });
                }).catch(err => {
                    throw err;
                });
        },
        createTask: (args) => {
            let owner;
            let userId = '5c9910447bee5a37dab62060'; //@FIXME Mocking user ID for now...
            let task = new Task({
                task: args.input.task,
                doAt: args.input.doAt,
                status: 'pending',
                user: userId
            });

            return User.findById(userId)
                .then(user => {
                    if (!user) {
                        throw new Error('User not found');
                    }

                    owner = user;

                    return task.save();
                }).then(result => {
                    owner.tasks.push(task);

                    return owner.save();
                })
                .then(result => {
                    return task;
                }).catch(err => {
                    return err;
                }
            );
        }
    },
    // Enables "Graphiql" testing tool accessible now by http://localhost:8080/graphql
    graphiql: true
}));