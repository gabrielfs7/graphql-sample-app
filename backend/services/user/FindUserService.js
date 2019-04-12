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
        const { toISODate } = require('../../helpers/date');

        return { 
            ...user._doc, 
            password: null,
            _id: user._doc._id.toString(),
            createdAt: toISODate(user._doc.createdAt),
            updatedAt: toISODate(user._doc.updatedAt),
            tasks: findTaskService.findByIds().bind(this, user._doc.tasks)
        } 
    }
}

module.exports = new FindUserService();
