class FindTaskService
{
    findAll() {
        const Task = require('../../models/task');
        const User = require('../../models/user');

        const findTasks = taskIds => {
            return Task.find({ _id: { $in: taskIds } })
                .then(tasks => {
                    return tasks.map(task => {
                        return {
                            ...task._doc,
                            _id: task._doc._id.toString(),
                            doAt: task._doc.doAt.toLocaleDateString(),
                            owner: findUser.bind(this, task._doc.owner)
                        };
                    });
                })
                .catch(err => {
                    throw err;
                });
        }

        const findUser = userId => {
            return User.findById(userId)
                .then(user => {
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
                })
                .catch(err => {
                    return err;
                });
        }

        return Task.find()
            .then(tasks => {
                return tasks.map(task => {
                    return { 
                        ...task._doc, 
                        _id: task.id, 
                        doAt: task._doc.doAt.toLocaleDateString(),
                        owner: findUser.bind(this, task._doc.owner)
                    };
            });
        }).catch(err => {
            throw err;
        });
    }
}

module.exports = new FindTaskService();
