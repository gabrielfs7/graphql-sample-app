class FindTaskService
{
    findById() {
        return async (taskId) => {
            try {
                const taskModel = require('../../models/task');
                const task = await taskModel.findById(taskId);

                if (!task) {
                    throw new Error('Task ' + taskId + ' not found');
                }

                return this.normalize(task);
            } catch (err) {
                throw err;
            }
        }
    }

    findByIds() {
        return async (taskIds) => {
            try {
                const taskModel = require('../../models/task');

                const tasks = await taskModel.find({ _id: { $in: taskIds } });

                return this.normalizeCollection(tasks);
            } catch (err) {
                throw err;
            }
        }
    }

    findAll() {
        const findTasks = async () => {
            try {
                const taskModel = require('../../models/task');
                const tasks = await taskModel.find();
    
                return this.normalizeCollection(tasks);
            } catch (err) {
                throw err;
            }
        }

        return findTasks();
    }

    normalize(task)
    {
        const findUserService = require('../user/FindUserService');

        return {
            ...task._doc,
            _id: task._doc._id.toString(),
            doAt: task._doc.doAt.toLocaleDateString(),
            owner: findUserService.findById().bind(this, task._doc.owner)
        }
    }

    normalizeCollection(tasks)
    {
        return tasks.map(task => {
            return this.normalize(task);
        });
    }
}

module.exports = new FindTaskService();
