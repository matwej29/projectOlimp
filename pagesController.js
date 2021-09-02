const marked = require('marked');
const storage = require('./modelsHandler');

class Controller {
  async home(req, res) {
    const templist = (await storage.News.findAll({ where: { access: 0 } })) ?? {
      text: '',
    };
    templist
      .sort((a, b) => a.id - b.id)
      .forEach(async element => {
        element.text = marked(element.text);
      });
    res.render('home', {
      list: templist,
      style_home: 'active-button',
      page_name: 'Главная',
      user: req?.user,
    });
  }

  async info(req, res) {
    const info = (await storage.Pages.findOne({
      where: { title: 'info' },
    })) ?? { body: '' };
    info.body = marked(info?.body ?? '');
    res.render('info', {
      style_info: 'active-button',
      page_name: 'Положение',
      regulation: info.body,
      user: req?.user,
    });
  }

  status404(res) {
    res.status(404).send('Not found');
  }

  organizers(req, res) {
    res.render('organizers', {
      style_org: 'active-button',
      page_name: 'Организаторы',
      user: req?.user,
    });
  }

  partners(req, res) {
    res.render('partners', {
      style_part: 'active-button',
      page_name: 'Партнеры',
      user: req?.user,
    });
  }

  help(req, res) {
    res.render('help', {
      style_help: 'active-button',
      page_name: 'Помощь',
      user: req?.user,
    });
  }

  async teams(req, res) {
    const templist = (await storage.Teams.findAll()) ?? {};
    templist
      .sort((a, b) => a.id - b.id)
      .forEach(async element => {
        element.description = marked(element.description ?? '');
      });
    res.render('teams', {
      list: templist,
      style_teams: 'active-button',
      page_name: 'Команды',
      user: req?.user,
    });
  }
}

module.exports = Controller;
