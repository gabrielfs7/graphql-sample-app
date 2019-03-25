mongoose = require('mongoose');

const Schema = mongoose.Schema;

taskSchema = new Schema({
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
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
});

module.export = mongoose.model('Task', taskSchema);