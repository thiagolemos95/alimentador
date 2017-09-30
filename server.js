const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const api = require('./api/index');
const app = express();


///////////////////////
// Server Middleware
///////////////////////

app.use(logger(app.get("env") === "production" ? "combined" : "dev"));

// parse application/json
app.use(bodyParser.json());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true}));

// CORS
// Isso permite que aplicativos cliente de outros domínios usem o servidor API
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});


//////////////////
// API Queries
//////////////////

app.use('/', api);


//////////////////
// Server Setup
//////////////////

app.set("env", process.env.NODE_ENV || "development");
app.set("host", process.env.HOST || "0.0.0.0");
app.set("port", process.env.PORT || 3000);

app.listen(app.get("port"), function () {
    console.log('\n' + '**********************************');
    console.log('REST API listening on port ' + app.get("port"));
    console.log('**********************************' + '\n');
});


////////////////////
// Error Handlers
////////////////////

// tratamento http 404
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// desenvolvimento error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status( err.code || 500 )
        .json({
            status: 'error',
            message: err
        });
    });
}

// produção error handler
app.use(function(err, req, res, next) {
    res.status(err.status || 500)
    .json({
        status: 'error',
        message: err.message
    });
});


module.exports = app;
