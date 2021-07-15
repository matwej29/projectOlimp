// const Console = require('Console');
const express = require('express');

const app = express();
const hbs = require('hbs');
const helmet = require('helmet'); // protection

app.use(helmet());
app.use(require('body-parser').urlencoded({ extended: true }));
app.set('view engine', 'hbs');
app.set('views', `${__dirname}/views`);
hbs.registerPartials(`${__dirname}/views/partials`);

app.use('/static', express.static(`${__dirname}/static`));

const MILLS_IN_DAY = 86400000;
app.use(
  require('express-session')({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: MILLS_IN_DAY },
  }),
);

const userRouter = require('./routes/userRouter'); // for authorized users
const adminRouter = require('./routes/adminRouter');
const pageRouter = require('./routes/pageRouter');

app.use(userRouter(app));
app.use(adminRouter); // долго грузит
app.use(pageRouter); // pages for unauthorized users

app.get('*', (req, res) => {
  res.send('page not found');
});

app.listen(3000, 'localhost', () => {
  // Console.log('server started');
});
