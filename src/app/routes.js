module.exports = (app, passport) => {

  app.get('/', (req, res) => {
    res.render('index',{
      message: req.flash('loginMessage')
    });
  });

  app.post('/signin', passport.authenticate('local-login', {
    successRedirect: '/dashboard',
    failureRedirect: '/',
    failureFlash: true
  }));

  app.get('/signup', (req, res) => {
    res.render('signup',{
      message: req.flash('signupMessage')
    });
  });

  app.post('/signup', passport.authenticate('local-signup', {
    successRedirect: '/dashboard',
    failureRedirect: '/signup',
    failureFlash: true
  }));

  app.get('/dashboard', isLoggetIn, (req, res) => {
    res.render('dashboard',{
      user: req.user
    });
  });

  app.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
  });

  function isLoggetIn(req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }
    return res.redirect('/');
  }
}
