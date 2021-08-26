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
    });
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
    const request = {
      team_name: req.body.team_name,
      team_desc: req.body.team_desc,
      school: req.body.school,
      boss: req.body.boss,
      status: 'unread',
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
  // затычка, устал и лень доделывать

  getRecover(req, res) {
    res.render('recover');
    res.mailer.send(
      'email',
      {
        to: req.user.email,
        subject: 'Проверка',
        layout: 'layoutE',
        value: 5,
      },
      (err) => {
        if (err != null) {
          Console.log(err);
        }
      },
    );
  }

  // затычка... см выше

  postRecover(req, res) {
    if (req.body.value == 5) {
      res.redirect('profile');
    } else {
      res.send('err');
    }
  }
}

module.exports = Controller;
