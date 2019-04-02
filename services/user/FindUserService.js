class FindUserService
{
    findById() {
        return async (userId) => {
            try {
                const findTaskService = require('../task/FindTaskService');
                const userModel = require('../../models/user');
                const user = await userModel.findById(userId);

                if (!user) {
                    throw new Error('User ' + userId + ' not found');
                }

                return { 
                    ...user._doc, 
                    password: null,
                    _id: user.id,
                    birthDate: user._doc.birthDate.toLocaleDateString(),
                    tasks: findTaskService.findByIds().bind(this, user._doc.tasks)
                };
            } catch (err) {
                throw err;
            }
        }
    }

    findAll() {
        const users = async () => {
            try {
                const findTaskService = require('../task/FindTaskService');
                const userModel = require('../../models/user');
                const users = await userModel.find();

                return users.map(user => {
                    return { 
                        ...user._doc, 
                        password: null,
                        _id: user._doc._id.toString(), 
                        birthDate: user._doc.birthDate.toLocaleDateString(),
                        tasks: findTaskService.findByIds().bind(this, user._doc.tasks)
                    } 
                });
            } catch (err) {
                throw err;
            }
        }

        return users();
    }
}

module.exports = new FindUserService();
