const FindUserService = require('../../services/user/FindUserService');
const CreateUserService = require('../../services/user/CreateUserService');
const LoginUserService = require('../../services/user/LoginUserService');

const FindTaskService = require('../../services/task/FindTaskService');
const CreateTaskService = require('../../services/task/CreateTaskService');

const FindTaskWatcherService = require('../../services/task/FindTaskWatcherService');
const WatchTaskService = require('../../services/task/WatchTaskService');

const authorizeUser = (req) => {
    if (!req.authenticated) {
        throw new Error('Unauthorized!');
    }
}

module.exports = {
    users: (args, req) => {
        authorizeUser(req);

        return FindUserService.findAll();
    },
    createUser: (args) => {
        return CreateUserService.create(args);
    },
    login: (args) => {
        return LoginUserService.login(args);
    },
    tasks: (args, req) => {
        authorizeUser(req);

        return FindTaskService.findAll();
    },
    createTask: (args, req) => {
        authorizeUser(req);

        return CreateTaskService.create(args, req.authenticatedUser.id);
    },
    watchers: (args, req) => {
        authorizeUser(req);

        return FindTaskWatcherService.findAll(args);
    },
    watchTask: (args, req) => {
        authorizeUser(req);

        return WatchTaskService.watch(args);
    },
    stopWatchTask: (args, req) => {
        authorizeUser(req);

        return WatchTaskService.stopWatch(args);
    }
};