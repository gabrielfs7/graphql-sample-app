class FindTaskWatcherService
{
    findAll() {
        const findTaskWatchers = async () => {
            try {
                const findTaskService = require('../task/FindTaskService');
                const findUserService = require('../user/FindUserService');
                const taskWatcherModel = require('../../models/taskWatcher');
                const { toISODate } = require('../../helpers/date');
                const taskWatchers = await taskWatcherModel.find();
                
                return taskWatchers.map(taskWatcher => {
                    return {
                        ...taskWatcher._doc,
                        _id: taskWatcher.id, 
                        createdAt: toISODate(taskWatcher._doc.createdAt),
                        updatedAt: toISODate(taskWatcher._doc.updatedAt),
                        user: findUserService.findById().bind(this, taskWatcher._doc.user),
                        task: findTaskService.findById().bind(this, taskWatcher._doc.task)
                    }
                });
            } catch (err) {
                throw err;
            }
        }

        return findTaskWatchers();
    }
}

module.exports = new FindTaskWatcherService();
