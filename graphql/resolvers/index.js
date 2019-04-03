const FindUserService = require('../../services/user/FindUserService');
const CreateUserService = require('../../services/user/CreateUserService');
const FindTaskService = require('../../services/task/FindTaskService');
const CreateTaskService = require('../../services/task/CreateTaskService');

const FindTaskWatcherService = require('../../services/task/FindTaskWatcherService');
const WatchTaskService = require('../../services/task/WatchTaskService');

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
    },
    watchers: (args) => {
        return FindTaskWatcherService.findAll(args);
    },
    watchTask: (args) => {
        return WatchTaskService.watch(args);
    },
    stopWatchTask: (args) => {
        return WatchTaskService.stopWatch(args);
    }
};