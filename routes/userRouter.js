const express = require('express');

const router = express.Router();
const passport = require('passport');
const { Strategy } = require('passport-local');
const { ensureLoggedIn } = require('connect-ensure-login');
const flash = require('connect-flash');

const { Users } = require('../modelsHandler');

const UserPages = require('../userPages');
const userPages = new UserPages();

module.exports = app => {
  app.use(passport.initialize());
  app.use(passport.session());
  app.use(flash());

  passport.use(
    new Strategy(
      {
        usernameField: 'email',
        passwordField: 'password',
      },
      async (email, password, done) => {
        await Users.findOne({ where: { email }, raw: true }).then(
          async (user, err) => {
            if (err) {
              return done(err, false);
            }
            if (!user) {
              return done('user not founded', false);
            }
            if (!(await Users.comparePasswords(password, user))) {
              return done('the passwords didn`t match', false);
            }
            return done(null, user);
          },
        );
      },
    ),
  );

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser(async (id, done) => {
    await Users.findOne({ where: { id }, raw: true }).then((user, err) => {
      done(err, user);
    });
  });

  const auth = passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failWithError: true,
  });

  router.get('/news', userPages.news);

  router.get('/login', userPages.getLogin);

  router.post('/login', auth, userPages.postLogin);

  router.get('/logout', ensureLoggedIn('/login'), userPages.logout);

  router.get('/profile', ensureLoggedIn('/login'), userPages.profile);

  router.get('/registration', userPages.getRegister);

  router.post('/registration', userPages.postRegister);

  router.get('/request', ensureLoggedIn('/login'), userPages.getRequest);

  router.post('/request', ensureLoggedIn('/login'), userPages.postRequest);

  router.get('/recover', userPages.getRecover);

  router.post('/recover', userPages.postRecover);

  router.get('/reset/:token', userPages.getReset);

  router.post('/reset/:token', userPages.postReset);

  return router;
};
