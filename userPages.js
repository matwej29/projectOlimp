const marked = require('marked');

const { Op } = require('sequelize');
const Console = require('Console');
const storage = require('./modelsHandler');

class Controller {
  async news(req, res) {
    const templist = await storage.News.findAll({
      where: { access: { [Op.lte]: req.user?.access ?? 0 } },
    });
    templist
      .sort((a, b) => a.id - b.id)
      .forEach(element => {
        element.text = marked(element.text);
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
        access: 1,
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
    Console.log(request);
    res.redirect('/');
  }
}

module.exports = Controller;
