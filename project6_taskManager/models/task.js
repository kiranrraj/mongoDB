const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
    task_desc: {
        type: String,
        required: [true, "Task should be specified"],
        unique: [true, "Task already in the app"],
        trim: true,
        maxLength: [40, "Please keep the task description under 40 characters"],
    },
    completed:{
        type: Boolean,
        // required: [true, "Completion status required"],
        default: false,
    }
});

module.exports = mongoose.model('Task', TaskSchema);