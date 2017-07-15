var express = require('express'),
    app = express(),
    port = process.env.PORT || 3000,
    mongoose = require('mongoose'),
    Task = require('./api/models/todoListModel'),
    bodyParser = require('body-parser');

mongoose.Promise = global.Promise;
var dbConnString = process.env.MONGO_CONN;
var corsAllowString = process.env.CORS_ALLOW;
mongoose.connect(dbConnString);

var cors = require('cors');

// put this before all route definitions
app.use(cors({origin: corsAllowString}));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(function(err, req, res, next) {
    res.status(404).send({url: req.originalUrl + ' not found'})
});

var routes = require('./api/routes/todoListRoutes');
routes(app);


app.listen(port);

console.log('todo list RESTful API server started on: ' + port);