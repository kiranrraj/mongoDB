const Task = require('../models/task');

const getAllTasks = async (req, res) => {

    try {
        const tasks = await Task.find({});
        if(tasks.length === 0){
            let message = {message : `No task found`}
            return res.status(404).json(message);
        }
        res.status(200).json({Tasks: tasks});
    } catch (error) {
        console.error(error)
    }
};

const createTask = async (req, res) => {
    try {

        const task = await Task.create({
            task_desc: req.body.task_desc,
            completed: req.body.completed
        });
    
        res.status(201).json({ task })

    } catch (error) {
        let customError;
        if(error.code == 11000){
            customError = `The task '${error.keyValue.task_desc}' already in the app`;
            // console.log(error.code)
        }
        res.status(500).json({
            customMsg: customError,
            message: error
        })
    }
};

const getTask = async (req, res) => {
    try {
        const task = await Task.findOne({_id:req.params.id});

        if(!task){
            let message = {message : `Task with id ${req.params.id} not found`}
            return res.status(404).json(message);
        }
        res.json({task});
    } catch (error) {
        console.error(error)
    }
};

const updateTask = async (req, res) => {
    try {
        const task = await Task.updateOne({$set: {task_desc: req.body.task_desc, completed: req.body.completed}});

        if(!task){
            let message = {message : `Task with id ${req.params.id} not found`}
            return res.status(404).json(message);
        }
        res.status(200).json(task);
    } catch (error) {
        console.error(error)
    }

};

const deleteTask = async (req, res) => {

    try {
        const task = await Task.deleteOne({_id:req.params.id});

        if(!task){
            let message = {message : `Task with id ${req.params.id} not found`}
            return res.status(404).json(message);
        }
        res.status(200).json({message : `Task with id ${req.params.id} deleted`});
    } catch (error) {
        console.error(error)
    }
};

module.exports = {
    getAllTasks,
    createTask,
    getTask,
    updateTask,
    deleteTask
}