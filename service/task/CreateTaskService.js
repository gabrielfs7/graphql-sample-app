class CreateTaskrService
{
    create(args) {
        const Task = require('../../models/task');
        const User = require('../../models/user');

        let owner;
        let userId = '5c9910447bee5a37dab62060'; //@FIXME Mocking user ID for now...
        let task = new Task({
            task: args.input.task,
            doAt: args.input.doAt,
            status: 'pending',
            owner: userId
        });

        return User.findById(userId)
            .then(user => {
                if (!user) {
                    throw new Error('User not found');
                }

                owner = user;

                return task.save();
            }).then(result => {
                owner.tasks.push(task);

                return owner.save();
            })
            .then(result => {
                return task;
            }).catch(err => {
                return err;
            }
        );
    }
}

module.exports = new CreateTaskrService();
