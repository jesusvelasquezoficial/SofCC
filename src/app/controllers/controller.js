const controller = {};

controller.inicio = (req, res) => {
  res.render('index',{
    message: req.flash('loginMessage')
  });
};

controller.signup = (passport) => {
  return passport.authenticate('local-signup', {
    successRedirect: '/APISettings',
    failureRedirect: '/signup',
    failureFlash: true
  });
};

controller.signupView = (req, res) => {
  res.render('signup',{
    message: req.flash('signupMessage')
  });
};

controller.signin = (passport) => {
  return passport.authenticate('local-login', {
    successRedirect: '/dashboard',
    failureRedirect: '/',
    failureFlash: true
  });
};

controller.apiView = (req, res) => {
  if (isLoggetIn(req,res)) {

    console.log("entro");
  }
  res.render('APISettings');
};

controller.actualizarApi = (req,res) => {
  const User = require('../models/user');
  let id = req.user._id;
  let data = {
    local:{
      apiSettigns:{
        apiKey: req.body.apiKey,
        secretKey: req.body.secretKey
      }
    }
  };
  User.findById(id, (err,user) => {
    if (err) return handleError(err);
    user.set(data);
    user.save();
    return res.redirect('dashboard');
  });

};

controller.dashboard = (req, res) => {
  if (isLoggetIn(req,res)) {
    let binance = binanceConnect(req,res);
    binance.prices((error, ticker) => {
      console.log(ticker.BTCUSDT);
      let p = ticker.BTCUSDT;
      callback(p);
    });

    res.render('dashboard',{
      user: req.user.local.apiSettigns.apiKey
    });
  }
};

controller.logout = (req, res) => {
  req.logout();
  res.redirect('/');
};

function binanceConnect(req,res,next) {
  const nodeBinance = require('node-binance-api');

  let key = req.user.local.apiSettigns.apiKey;
  let secrect = req.user.local.apiSettigns.secretKey;

  const binance = new nodeBinance().options({
   APIKEY: key,
   APISECRET: secrect,
   useServerTime: true,
   recvWindow: 60000, // Set a higher recvWindow to increase response timeout
   verbose: true, // Add extra output when subscribing to WebSockets, etc
   log: log => {
     console.log(log); // You can create your own logger here, or disable console output
   }
  });
  return binance;
}

function isLoggetIn(req, res, next) {
  if (req.isAuthenticated()) {
    return true;
  }
  console.log("no logueado.");
  return res.redirect('/');
}

module.exports = controller;
