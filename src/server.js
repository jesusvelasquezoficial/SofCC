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

//TODO:settings
app.set('port', process.env.PORT || 80);

//TODO:middlewares

//TODO:routes
app.get('/', function (req, res) {
  console.log(url);
  res.end('hola mundo');
});

//TODO:static files

app.listen(app.get('port'), () => {
  console.log('server on port', app.get('port'));
});
