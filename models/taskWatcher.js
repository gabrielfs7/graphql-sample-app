const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const taskWatcherSchema = new Schema(
    {
        task: {
            type: Schema.Types.ObjectId,
            ref: 'Task'
        },
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model('TaskWatcher', taskWatcherSchema);