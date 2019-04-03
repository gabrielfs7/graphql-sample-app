class FindTaskWatcherService
{
    findAll() {
        const findTaskWatchers = async () => {
            try {
                const findTaskService = require('../task/FindTaskService');
                const findUserService = require('../user/FindUserService');
                const taskWatcherModel = require('../../models/taskWatcher');
                const taskWatchers = await taskWatcherModel.find();
    
                return taskWatchers.map(taskWatcher => {
                    return {
                        ...taskWatcher._doc,
                        _id: taskWatcher.id, 
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
