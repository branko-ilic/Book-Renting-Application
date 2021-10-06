const path = require('path');
const express = require('express');
const mongoose = require('mongoose');

mongoose.connect("mongodb://127.0.0.1:27017/uvit_septembar2_2020", {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const indexRoutes = require('./routes/index');
const rentRoutes = require('./routes/rent');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(express.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRoutes);
app.use('/rent', rentRoutes);

app.use(function (req, res, next) {
    const err = new Error('The URL you requested does not exist: ' + req.url);
    err.status = 404;

    next(err);
});

app.use(function (error, req, res, next) {
    console.error(error.stack);

    const statusCode = error.status || 500;
    res.status(statusCode).render('error.ejs', {
        errorMessage: error.message,
        errorCode: statusCode
    });
});

module.exports = app;