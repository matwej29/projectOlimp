const express = require('express');

const app = express();
const hbs = require('hbs');
const helmet = require('helmet'); // protection

app.set('view engine', 'hbs');
app.use(express.urlencoded({ extended: true }));
app.set('views', `${__dirname}/views`);
hbs.registerPartials(`${__dirname}/views/partials`);

app.use(helmet());
app.use('/static', express.static(`${__dirname}/static`));

const adminRouter = require('./routes/adminRouter');
const pageRouter = require('./routes/pageRouter');

app.get('/*', pageRouter);

app.get('/admin', adminRouter);

app.get('*', (req, res) => {
  res.send('custom 404 page, TODO anyway');
});

app.listen(3000, 'localhost');
