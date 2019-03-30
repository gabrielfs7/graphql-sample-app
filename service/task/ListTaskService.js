class ListTaskService
{
    list() {
        const Task = require('../../models/task');
        const User = require('../../models/user');

        return Task.find().populate('owner')
            .then(tasks => {
                return tasks.map(task => {
                    console.log(task._doc);

                    return { 
                        ...task._doc, 
                        _id: task._doc._id.toString(), 
                        doAt: task._doc.doAt.toLocaleDateString() 
                    }
            });
        }).catch(err => {
            throw err;
        });
    }
}

module.exports = new ListTaskService();
