var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser');

// const swaggerUi = require('swagger-ui-express');
// const swaggerDocument = require('./api/config/swagger.json');


var app = express();
app.listen(3000, () => {
  console.log(`server on start port`);
})

// view engine setup
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json());



//setip swagger-ui
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./api/config/swagger.json');

app.use(
  '/api-docs',
  swaggerUi.serve,
  swaggerUi.setup(swaggerDocument)
);


const passport = require('passport');
const configJWTStrategy=require('./api/middleware/passportJWT');
app.use(passport.initialize());
configJWTStrategy();

const routerAPI = require('./api/api');
routerAPI(app);



//connect DB
const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://sa:123@cluster0.phca6.mongodb.net/zodiacDB?retryWrites=true&w=majority', { useUnifiedTopology: true, useNewUrlParser: true },
  err => {
    if (err) {
      console.log('can not connect to mongoDD,because ' + err)
    } else {
      console.log("MongoDB database connection establish successfully!!!");
    }
  });




// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500).json(err);
});



module.exports = app;
