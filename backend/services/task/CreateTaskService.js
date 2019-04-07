class CreateTaskService
{
    create(args, currentUserId) {
        const Task = require('../../models/task');
        const userModel = require('../../models/user');
        
        try {
            const createTask = async () => {
                const user = await userModel.findById(currentUserId);

                if (!user) {
                    throw new Error('User ' + currentUserId + ' not found');
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