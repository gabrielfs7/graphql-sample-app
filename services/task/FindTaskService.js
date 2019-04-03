class FindTaskService
{
    findById() {
        return async (taskId) => {
            try {
                const findUserService = require('../user/FindUserService');
                const taskModel = require('../../models/task');
                const task = await taskModel.findById(taskId);

                if (!task) {
                    throw new Error('Task ' + taskId + ' not found');
                }

                return {
                    ...task._doc,
                    _id: task._doc._id.toString(),
                    doAt: task._doc.doAt.toLocaleDateString(),
                    owner: findUserService.findById().bind(this, task._doc.owner)
                }
            } catch (err) {
                throw err;
            }
        }
    }

    findByIds() {
        return async (taskIds) => {
            try {
                const findUserService = require('../user/FindUserService');
                const taskModel = require('../../models/task');

                const tasks = await taskModel.find({ _id: { $in: taskIds } });

                return tasks.map(task => {
                    return {
                        ...task._doc,
                        _id: task._doc._id.toString(),
                        doAt: task._doc.doAt.toLocaleDateString(),
                        owner: findUserService.findById().bind(this, task._doc.owner)
                    }
                });
            } catch (err) {
                throw err;
            }
        }
    }

    findAll() {
        const findTasks = async () => {
            try {
                const findUserService = require('../user/FindUserService');
                const taskModel = require('../../models/task');
                const tasks = await taskModel.find();
    
                return tasks.map(task => {
                    return {
                        ...task._doc,
                        _id: task.id, 
                        doAt: task._doc.doAt.toLocaleDateString(),
                        owner: findUserService.findById().bind(this, task._doc.owner)
                    }
                });
            } catch (err) {
                throw err;
            }
        }

        return findTasks();
    }
}

module.exports = new FindTaskService();
