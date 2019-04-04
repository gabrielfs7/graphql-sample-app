class FindUserService
{
    findById() {
        return async (userId) => {
            try {
                const userModel = require('../../models/user');
                const user = await userModel.findById(userId);

                if (!user) {
                    throw new Error('User ' + userId + ' not found');
                }

                return this.normalize(user);
            } catch (err) {
                throw err;
            }
        }
    }

    findAll() {
        const users = async () => {
            try {
                const userModel = require('../../models/user');
                const users = await userModel.find();

                return users.map(user => {
                    return this.normalize(user);
                });
            } catch (err) {
                throw err;
            }
        }

        return users();
    }

    normalize(user)
    {
        const findTaskService = require('../task/FindTaskService');

        return { 
            ...user._doc, 
            password: null,
            _id: user._doc._id.toString(), 
            birthDate: new Date(user._doc.birthDate).toISOString(),
            createdAt: new Date(user._doc.createdAt).toISOString(),
            updatedAt: new Date(user._doc.updatedAt).toISOString(),
            tasks: findTaskService.findByIds().bind(this, user._doc.tasks)
        } 
    }
}

module.exports = new FindUserService();
