// const Console = require('Console');
const express = require('express');

const app = express();
const hbs = require('hbs');
const helmet = require('helmet'); // protection
const session = require('express-session');
const mailer = require('express-mailer');
const mailCfg = require('./mailConfig.json');

mailer.extend(app, {
  from: mailCfg.from,
  host: mailCfg.host,
  secureConnection: mailCfg.secure,
  port: mailCfg.port,
  transportMethod: mailCfg.method,
  auth: { user: mailCfg.user, pass: mailCfg.password },
});

app.use(
  helmet({
    contentSecurityPolicy: {
      useDefaults: true,
      directives: {
        'script-src': [
          "'self' 'unsafe-inline'",
          'https://cdn.jsdelivr.net',
          'https://cdnjs.cloudflare.com',
        ],
        'connect-src': [
          "'self'",
          'ws://localhost:1234',
          'https://cdn.jsdelivr.net',
        ],
        'script-src-attr': ["'self' 'unsafe-inline'"],
      },
    },
  }),
);

app.use(require('body-parser').urlencoded({ extended: true }));
app.set('view engine', 'hbs');
app.set('views', `${__dirname}/views`);
hbs.registerPartials(`${__dirname}/views/partials`);

app.use('/static', express.static(`${__dirname}/static`));

const { NODE_ENV, PORT = 3000 } = process.env;
const isProduction = NODE_ENV === 'production';

const Sequelize = require('sequelize');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const cfg = require('./dbConfig.json');
const sequelize = new Sequelize({
  dialect: 'postgres',
  host: cfg.host,
  password: cfg.password,
  port: cfg.port,
  username: cfg.username,
  database: cfg.database,
  logging: false,
});
sequelize.sync({ alter: true });

const MILLS_IN_DAY = 86400000;
app.use(
  session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: MILLS_IN_DAY * 10 },
    store: new SequelizeStore({
      db: sequelize,
    }),
  }),
);

app.use((err, req, res, next) => {
  res.status(500).json({
    message: 'Internal server error',
    error: isProduction ? null : err,
  });
});

const userRouter = require('./routes/userRouter'); // for authorized users
const adminRouter = require('./routes/adminRouter');
const pageRouter = require('./routes/pageRouter');

app.use(userRouter(app));
app.use(adminRouter); // долго грузит
app.use(pageRouter); // pages for unauthorized users

app.get('*', (req, res) => {
  res.send('page not found');
});

app.listen(PORT);
