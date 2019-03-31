class FindTaskService
{
    findByIds(taskIds) {
        const FindUserService = require('../user/FindUserService');
        const Task = require('../../models/task');

        const user = userId => {
            return FindUserService.find(userId);
        }

        return Task.find({ _id: { $in: taskIds } })
            .then(tasks => {
                return tasks.map(task => {
                    return {
                        ...task._doc,
                        _id: task._doc._id.toString(),
                        doAt: task._doc.doAt.toLocaleDateString(),
                        owner: user.bind(this, task._doc.owner)
                    };
                });
            })
            .catch(err => {
                throw err;
            });
    }

    findAll() {
        const FindUserService = require('../user/FindUserService');
        const Task = require('../../models/task');

        const user = userId => {
            return FindUserService.find(userId);
        }

        return Task.find()
            .then(tasks => {
                return tasks.map(task => {
                    return { 
                        ...task._doc, 
                        _id: task._doc._id.toString(), 
                        doAt: task._doc.doAt.toLocaleDateString(),
                        owner: user.bind(this, task._doc.owner)
                    }
            });
        }).catch(err => {
            throw err;
        });
    }
}

module.exports = new FindTaskService();
