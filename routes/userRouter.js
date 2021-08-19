const express = require('express');
// const app = express();

const router = express.Router();
const passport = require('passport');
const { Strategy } = require('passport-local');
const { ensureLoggedIn } = require('connect-ensure-login');
const flash = require('connect-flash');

const users = require('../users');
const { Users } = users;

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

  router.get('/', userPages.home);

  router.get('/login', userPages.getLogin);

  router.post('/login', auth, userPages.postLogin);

  router.get('/logout', ensureLoggedIn('/login'), userPages.logout);

  router.get('/profile', ensureLoggedIn('/login'), userPages.profile);

  router.get('/registration', userPages.getRegister);

  router.post('/registration', userPages.postRegister);

  return router;
};
