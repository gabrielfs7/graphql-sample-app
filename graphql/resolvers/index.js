const FindUserService = require('../../services/user/FindUserService');
const CreateUserService = require('../../services/user/CreateUserService');
const FindTaskService = require('../../services/task/FindTaskService');
const CreateTaskService = require('../../services/task/CreateTaskService');

module.exports = {
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
};