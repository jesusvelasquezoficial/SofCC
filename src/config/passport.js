// Estrategia local
const LocalStrategy = require('passport-local').Strategy;

// Modelo Usuario
const User = require('../app/models/user');

module.exports = function (passport) {
  // serializa los datos
  passport.serializeUser(function (user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
      done(err, user);
    });
  });

  // Login
  passport.use('local-login', new LocalStrategy({
    usernameField: 'nickUser',
    passwordField: 'password',
    passReqToCallback: true
  },
  function (req, nickUser, password, done) {
    User.findOne({'local.nickUser': nickUser}, function (err, user) {
      if (err) {
        return done(err);
      }
      if (!user) {
        return done(null,false,req.flash('loginMessage', 'El usuario es incorrecto.'));
      }
      if (!user.validatePassword(password)) {
        return done(null,false,req.flash('loginMessage', 'El password es incorrecto.'));
      }
      return done(null,user);
    })
  }));

  // Signup
  passport.use('local-signup', new LocalStrategy({
    usernameField: 'nickUser',
    passwordField: 'password',
    passReqToCallback: true
  },
  function (req, nickUser, password, done) {
    User.findOne({'local.nickUser': nickUser}, function (err, user) {
      if (err) {
        return done(err);
      }
      if (user) {
        return done(null,false,req.flash('signupMessage', 'El usuario ya existe.'));
      } else {
        var newUser = new User();
        newUser.local.nickUser = nickUser;
        newUser.local.password = newUser.generateHash(password);
        newUser.save(function (err) {
          if (err) {
            throw err;
          }
          return done(null, newUser);
        });
      }
    })
  }));


}
