/**
 * [express description]
 * @author-Khondakar Readul Islam
 * @version 1.0.0
 * @type {[type]}
 */
const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const multer = require("multer");
const cors = require("cors");

const appRoutes = require('./routes/app');
const userSignupRoutes = require('./routes/signup');
const userSigninRoutes = require('./routes/signin');
const userLocationRoutes = require('./routes/location');
const userActivitiesRoutes = require('./routes/activities');
const imageUpload = require('./routes/imageUpload');

const UPLOAD_PATH = 'uploads';
// Multer Settings for file upload
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, exports.UPLOAD_PATH);
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now());
    }
});
const upload = multer({ storage: storage });

const app = express();
mongoose.connect('mongodb://heroku_f0551vt9:clhjcdbngv8pc7ugqc1c5vsrh9@ds257848.mlab.com:57848/heroku_f0551vt9');
// mongoose.connect('localhost:27017/social-life-tracker');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());


/**
 * [description]
 * @author-Khondakar Readul Islam
 * @version 1.0.0
 * @param  {[type]} (req, res,          next [description]
 * @return {[type]}       [description]
 */
app.use((req, res, next)=> {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'POST, GET, PATCH, DELETE, OPTIONS','PUT');
    res.setHeader('Access-Control-Allow-Credentials', 'true')
    next();
});

app.use('/user', userSignupRoutes);
app.use('/user', userSigninRoutes);
app.use('/user', userLocationRoutes);
app.use('/user', userActivitiesRoutes);
app.use('/user', imageUpload);
app.use('/', appRoutes);

// catch 404 and forwPlaceard to error handler
app.use(function (req, res, next) {
    return res.render('index');
});

module.exports = UPLOAD_PATH; 
module.exports = upload; 
module.exports = app;