const marked = require('marked');

const cryptoString = require('crypto-random-string');
const datefns = require('date-fns');
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
    res.render('news', {
      list: templist,
      style_news: 'active-button',
      page_name: 'Новости',
      user: req?.user,
    });
  }

  requests(req, res) {
    Console.log(req, res);
  }

  getLogin(req, res) {
    res.render('login');
  }

  async postLogin(req, res) {
    res.redirect('/news');
  }

  logout(req, res) {
    req.logout();
    res.redirect('/');
  }

  async profile(req, res) {
    const request =
      (await storage.Requests.findOne({ where: { user_id: req.user.id } })) ??
      {};
    res.render('profile', {
      user: req.user,
      status: request?.status,
      reason: request?.reason,
      style_profile: 'active-button',
      page_name: 'Профиль',
    });
  }

  async postRegister(req, res) {
    if (await storage.Users.findOne({ where: { email: req.body.email } })) {
      req.flash('error', 'this email was already used');
      res.redirect('/login');
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
    const request = {
      team_name: req.body.team_name,
      team_desc: req.body.team_desc,
      school: req.body.school,
      boss: req.body.boss,
      status: 'на рассмотрении',
    };
    if (await storage.Requests.findOne({ where: { user_id: req.user.id } })) {
      await storage.Requests.update(request, {
        where: { user_id: req.user.id },
      });
    } else {
      request.user_id = req.user.id;
      await storage.Requests.create(request);
    }

    res.redirect('/profile');
  }

  getRecover(req, res) {
    res.render('recover', { error: req.flash('error') });
  }

  async postRecover(req, res) {
    const user = await storage.Users.findOne({
      where: { email: req.body.email },
    });
    if (!user) {
      req.flash('error', 'Пользователь с указанной почтой не найден');
      return res.redirect('/recover');
    }
    const token = cryptoString(20);
    user.update({
      resetPasswordToken: token,
      resetPasswordExpires: datefns.add(Date.now(), { days: 1 }),
    });
    res.mailer.send(
      'email-href',
      {
        to: req.body.email,
        subject: 'Восстановление пароля',
        layout: 'layoutE',
        value: `http://${req.headers.host}/reset/${token}`,
      },
      err => {
        if (err != null) {
          Console.error(err);
        }
      },
    );
    return res.redirect('/');
  }

  // /reset/:token
  async getReset(req, res) {
    const user = await storage.Users.findOne({
      where: {
        resetPasswordToken: req.params.token,
        resetPasswordExpires: { [Op.gte]: Date.now() },
      },
    });
    if (!user) {
      req.flash('error', 'Токен сброса пароля неправильный или просроченный');
      return res.redirect('/recover');
    }
    return res.render('reset', {
      email: user.email,
      token: req.params.token,
    });
  }

  // /reset/:token
  async postReset(req, res) {
    const user = await storage.Users.findOne({
      where: {
        resetPasswordToken: req.params.token,
        resetPasswordExpires: { [Op.gte]: Date.now() },
      },
    });
    if (!user) {
      req.flash('error', 'Токен сброса пароля неправильный или просроченный');
      return res.redirect('back');
    }
    user.update({
      password: req.body.password,
      resetPasswordToken: undefined,
      resetPasswordExpires: undefined,
    });
    res.mailer.send(
      'email-post',
      {
        to: user.email,
        subject: 'Ваш пароль был обновлен',
        layout: 'layoutE',
      },
      err => {
        if (err != null) {
          Console.log(err);
        }
      },
    );
    return res.redirect('/login');
  }
}

module.exports = Controller;
