class CreateTaskService
{
    create(args) {
        const Task = require('../../models/task');
        const User = require('../../models/user');
        const userId = '5c9910447bee5a37dab62060'; //@FIXME Mocking user ID for now...
        
        try {
            const createTask = async () => {
                const user = await User.findById(userId)

                if (!user) {
                    throw new Error('User ' + userId + ' not found');
                }

                const task = new Task({
                    task: args.input.task,
                    doAt: args.input.doAt,
                    status: 'pending',
                    owner: user
                });
    
                await task.save();
                await user.tasks.push(task);
                await user.save();
    
                return task;
            }

            return createTask();
        } catch (err) {
            throw err;
        }
    }
}

module.exports = new CreateTaskService();