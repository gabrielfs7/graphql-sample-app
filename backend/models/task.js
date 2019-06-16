const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const taskSchema = new Schema(
    {
        task: {
            type: String,
            required: true
        },
        doAt: {
            type: Date,
            required: true
        },
        status: {
            type: String,
            required: true
        },
        owner: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        },
        taskWatchers: [
            {
                type: Schema.Types.ObjectId,
                ref: 'TaskWatcher'
            }
        ]
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model('Task', taskSchema);