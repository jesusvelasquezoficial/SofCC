const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const passport = require('passport');
const flash = require('connect-flash');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('express-session');

const { url } = require('./config/database');

mongoose.connect(url, { useNewUrlParser: true });

require('./config/passport')(passport);

//TODO:settings
app.set('port', process.env.PORT || 80);
app.set('views', path.join(__dirname,'views'));
app.set('view engine', 'ejs');

//TODO:middlewares
app.use(morgan('dev'));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
  secret:'SofCC',
  resave: true,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

//TODO:routes
require('./app/routes')(app,passport);

//TODO:static files
app.use(express.static(path.join(__dirname,'public')));

app.listen(app.get('port'), () => {
  console.log('Server on port', app.get('port'));
});
