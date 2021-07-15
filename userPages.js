const marked = require('marked');

const { Op } = require('sequelize');
const Console = require('Console');
const storage = require('./news.js');
const users = require('./users.js');
const { Users } = users;

// const pages = require('./pageModel.js');

const formatDate = require('./modules/formatDate.js');

class Controller {
  async home(req, res) {
    let templist = await storage.News.findAll({
      where: { access: { [Op.or]: [{ [Op.lte]: req.user.access }, 1] } },
    });
    templist = templist
      .sort((a, b) => a.id - b.id)
      .forEach(element => {
        element.text = marked(element.text);
        Console.error(element.text);
        element.date = formatDate(element.date);
      });
    Console.warn(templist);
    res.render('home', {
      list: templist,
      style_home: 'active-button',
      page_name: 'Новости',
    });
  }

  requests(req, res) {
    Console.log(req, res);
  }

  getLogin(req, res) {
    res.render('login');
  }

  async postLogin(req, res) {
    res.redirect('/');
  }

  logout(req, res) {
    req.logout();
    res.redirect('/');
  }

  profile(req, res) {
    res.render('profile', { user: req.user });
  }

  async postRegister(req, res) {
    if (await Users.findOne({ where: { email: req.body.email } })) {
      res.redirect('/');
    } else {
      await Users.create({
        password: req.body.password,
        email: req.body.email,
        access: 0,
      }).catch(err => {
        res.send(err);
      });
      res.redirect('/login');
    }
  }

  getRegister(req, res) {
    res.render('register');
  }
}

module.exports = Controller;
