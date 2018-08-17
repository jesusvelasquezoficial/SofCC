module.exports = (app, passport) => {

  app.get('/', (req, res) => {
    res.render('index',{
      message: req.flash('loginMessage')
    });
  });

  app.post('/signin', (req, res) => {

  });

  app.get('/signup', (req, res) => {
    res.render('signup',{
      message: req.flash('signupMessage')
    });

  app.post('/signup', (req, res) => {

  });

};
