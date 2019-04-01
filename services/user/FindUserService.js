class FindUserService
{
    findAll() {
        const Task = require('../../models/task');
        const User = require('../../models/user');

        const findTasks = async taskIds => {
            const tasks = await Task.find({ _id: { $in: taskIds } });

            try {
                return tasks.map(task => {
                    return {
                        ...task._doc,
                        _id: task._doc._id.toString(),
                        doAt: task._doc.doAt.toLocaleDateString(),
                        owner: findUser.bind(this, task._doc.owner)
                    };
                });
            } catch (err) {
                throw err;
            }
        }

        const findUser = async userId => {
            try {
                const user = await User.findById(userId);

                if (!user) {
                    throw new Error('User ' + userId + ' not found');
                }

                return { 
                    ...user._doc, 
                    password: null,
                    _id: user.id,
                    birthDate: user._doc.birthDate.toLocaleDateString(),
                    tasks: findTasks.bind(this, user._doc.tasks)
                };
            } catch (err) {
                throw err;
            }
        }

        return async () => {
            try {
                const users = await User.find();

                return users.map(user => {
                    return { 
                        ...user._doc, 
                        password: null,
                        _id: user._doc._id.toString(), 
                        birthDate: user._doc.birthDate.toLocaleDateString(),
                        tasks: findTasks.bind(this, user._doc.tasks)
                    } 
                });
            } catch (err) {
                throw err;
            }
        }
    }
}

module.exports = new FindUserService();
