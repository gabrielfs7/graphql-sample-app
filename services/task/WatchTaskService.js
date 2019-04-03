class WatchTaskService
{
    watch(args) {
        const TaskWatcher = require('../../models/taskWatcher');
        const Task = require('../../models/task');
        const User = require('../../models/user');
        
        try {
            const watchTask = async () => {
                const user = await User.findById(args.input.userId)
                const task = await Task.findById(args.input.taskId)

                if (!user) {
                    throw new Error('User ' + args.input.userId + ' not found');
                }

                if (!task) {
                    throw new Error('Task ' + args.input.taskId + ' not found');
                }

                const taskWatcher = new TaskWatcher({
                    user: user,
                    task: task
                });
    
                await taskWatcher.save();
    
                return taskWatcher;
            }

            return watchTask();
        } catch (err) {
            throw err;
        }
    }

    stopWatch(args) {
        const TaskWatcher = require('../../models/taskWatcher');

        try {
            const createTask = async () => {
                const taskWatcher = await TaskWatcher.findById(args.input.id);

                if (!taskWatcher) {
                    throw new Error('TaskWatcher ' + args.input.id + ' not found');
                }

                await taskWatcher.remove();
    
                return taskWatcher;
            }

            return createTask();
        } catch (err) {
            throw err;
        }
    }
}

module.exports = new WatchTaskService();