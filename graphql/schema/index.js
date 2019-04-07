const { buildSchema } = require('graphql');

module.exports = buildSchema(`
        type TaskWatcher {
            _id: ID!
            task: Task!
            user: User!
            createdAt: String!
            updatedAt: String!
        }

        type User {
            _id: ID!
            email: String!
            username: String!
            password: String
            birthDate: String!
            createdAt: String!
            updatedAt: String!
            tasks: [Task!]
        }

        type Task {
            _id: ID!
            task: String!
            doAt: String!
            status: String!
            createdAt: String!
            updatedAt: String!
            owner: User!
        }

        type AuthData {
            userId: ID!
            token: String!
            tokenExpiresIn: Int!
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

        input WatchTaskInput {
            taskId: ID!
            userId: ID!
        }

        input StopWatchTaskInput {
            id: ID!
        }

        input UserLoginInput {
            email: String!
            password: String!
        }

        type RootQuery {
            users: [User!]!
            tasks: [Task!]!
            watchers: [TaskWatcher!]!
            login(input: UserLoginInput): AuthData
        }

        type RootMutation {
            createUser(input: CreateUserInput): User
            createTask(input: CreateTaskInput): Task
            watchTask(input: WatchTaskInput): TaskWatcher
            stopWatchTask(input: StopWatchTaskInput): TaskWatcher
        }

        schema {
            query: RootQuery
            mutation: RootMutation
        }
`);