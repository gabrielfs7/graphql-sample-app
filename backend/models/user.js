const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema(
    {
        email: {
            type: String,
            required: true
        },
        username: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        },
        birthDate: {
            type: Date,
            required: true
        },
        tasks: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Task'
            }
        ]
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model('User', userSchema);