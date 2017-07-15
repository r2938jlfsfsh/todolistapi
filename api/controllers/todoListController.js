'use strict';


var mongoose = require('mongoose'),
    Task = mongoose.model('Tasks');

exports.list_all_tasks = function(req, res) {
    console.log("in list_all_tasks");
    Task.find({}, function(err, task) {
        if (err)
            res.send(err);

        var newList = [];
        var newObj;
        for(var i = 0; i < task.length; i++) {
            newObj = task[i].toObject({ virtuals: true });
            newList.push(newObj);
        }
        res.json(newList);
    });
};

exports.create_a_task = function(req, res) {
    var new_task = new Task(req.body);
    console.log("in create_a_task");
    new_task.save(function(err, task) {
        if (err)
            res.send(err);
        //console.log(task);
        res.json(task.toObject({ virtuals: true }));
    });
};

exports.read_a_task = function(req, res) {
    Task.findById(req.params.taskId, function(err, task) {
        if (err)
            res.send(err);
        res.json(task.toObject({ virtuals: true }));
    });
};


exports.read_a_task_by_name = function(req, res) {
    Task.find({name: req.params.name}, function(err, task) {
        if (err)
            res.send(err);
        var newList = [];
        var newObj;
        for(var i = 0; i < task.length; i++) {
            newObj = task[i].toObject({ virtuals: true });
            newList.push(newObj);
        }
        res.json(newList);
    });
};


exports.update_a_task = function(req, res) {
    Task.findOneAndUpdate({_id: req.params.taskId}, req.body, {new: true}, function(err, task) {
        if (err)
            res.send(err);
        res.json(task.toObject({ virtuals: true }));
    });
};


exports.delete_a_task = function(req, res) {


    Task.remove({
        _id: req.params.taskId
    }, function(err, task) {
        if (err)
            res.send(err);
        res.json({ message: 'Task successfully deleted' });
    });
};
