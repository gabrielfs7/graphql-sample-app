const { buildSchema } = require('graphql');

module.exports = buildSchema(`
        type User {
            _id: ID!
            email: String!
            username: String!
            password: String
            birthDate: String!
            tasks: [Task!]
        }

        type Task {
            _id: ID!
            task: String!
            doAt: String!
            status: String!
            owner: User!
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
            tasks: [Task!]!
        }

        type RootMutation {
            createUser(input: CreateUserInput): User
            createTask(input: CreateTaskInput): Task
        }

        schema {
            query: RootQuery
            mutation: RootMutation
        }
    `)