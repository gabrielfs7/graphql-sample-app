class FindUserService
{
    find(id) {
        const User = require('../../models/task');
        const FindTaskService = require('../task/FindTaskService');
 
        const tasks = taskIds => {
            return FindTaskService.findByIds(taskIds);
        }

        return User.findById(id)
            .then(user => {
                return { 
                    ...user._doc, 
                    password: null,
                    _id: user.id,
                    birthDate: user._doc.birthDate.toLocaleDateString(),
                    tasks: tasks.bind(this, user._doc.tasks)
                }
            }).catch(err => {
                throw err;
            });
    }

    findAll() {
        const User = require('../../models/task');
        const FindTaskService = require('../task/FindTaskService');

        const tasks = taskIds => {
            return FindTaskService.findByIds(taskIds);
        }

        return this.User.find()
            .then(users => {
                return users.map(user => {
                    return { 
                        ...user._doc, 
                        password: null,
                        _id: user._doc._id.toString(), 
                        birthDate: user._doc.birthDate.toLocaleDateString(),
                        tasks: tasks.bind(this, user._doc.tasks)
                    } 
                });
            }).catch(err => {
                throw err;
            });
    }
}

module.exports = new FindUserService();
