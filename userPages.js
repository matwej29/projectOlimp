const marked = require('marked');

const { Op } = require('sequelize');
const Console = require('Console');
const storage = require('./modelsHandler');

// const pages = require('./pageModel.js');

const formatDate = require('./modules/formatDate');

class Controller {
  async home(req, res) {
    const templist = await storage.News.findAll({
      where: { access: { [Op.or]: [{ [Op.lte]: req.user?.access }, 1] } },
    });
    templist
      .sort((a, b) => a.id - b.id)
      .forEach(element => {
        element.text = marked(element.text);
        element.date = formatDate(element.date);
      });
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
    if (await storage.Users.findOne({ where: { email: req.body.email } })) {
      res.redirect('/');
    } else {
      await storage.Users.create({
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

  getRequest(req, res) {
    res.render('request', { user: req.user });
  }

  async postRequest(req, res) {
    const request = JSON.stringify({
      team_name: req.body.team_name,
      team_desc: req.body.team_description,
      school: req.body.school,
      boss: req.body.boss,
      status: 'unread',
    });
    console.log(request);
    res.redirect('/');
  }
}

module.exports = Controller;
