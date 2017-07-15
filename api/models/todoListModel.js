'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var hostName = process.env.APP_MY_IP;
var port = process.env.PORT || 3000;

var TaskSchema = new Schema({
    name: {
        type: String,
        Required: 'Kindly enter the name of the task'
    },
    Created_date: {
        type: Date,
        default: Date.now
    },
    status: {
        type: String,
        enum: ['pending', 'ongoing', 'completed'],
        default: ['pending']
    }
});

TaskSchema.virtual('uri').get(function () {
    //return "http://localhost:3000/tasks/" + this._id;
    return hostName + ":" + port + "/tasks/" + this._id;
});

module.exports = mongoose.model('Tasks', TaskSchema);