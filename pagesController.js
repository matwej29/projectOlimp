const marked = require('marked');

const storage = require('./modelsHandler');

const formatDate = require('./modules/formatDate');

class Controller {
  async info(req, res) {
    const info = (await storage.Pages.findOne({
      where: { title: 'info' },
    })) ?? { body: '' };
    info.body = marked(info.body);
    res.render('info', {
      style_info: 'active-button',
      page_name: 'Положение',
      regulation: info.body,
    });
  }

  async home(req, res) {
    const templist = await storage.News.findAll({ where: { access: 1 } });
    templist
      .sort((a, b) => a.id - b.id)
      .forEach(async element => {
        element.text = marked(element.text);
        element.date = formatDate(element.date);
      });
    res.render('home', {
      list: templist,
      style_home: 'active-button',
      page_name: 'Новости',
    });
  }

  status404(res) {
    res.status(404).send('Not found');
  }

  organizers(req, res) {
    res.render('organizers', {
      style_org: 'active-button',
      page_name: 'Организаторы',
    });
  }

  partners(req, res) {
    res.render('partners', {
      style_part: 'active-button',
      page_name: 'Партнеры',
    });
  }

  help(req, res) {
    res.render('help', {
      style_help: 'active-button',
      page_name: 'Помощь',
    });
  }

  async teams(req, res) {
    const templist = await storage.Teams.findAll();
    templist
      .sort((a, b) => a.id - b.id)
      .forEach(async element => {
        element.description = undefined ? '' : element.description;
        element.description = marked(element.description);
      });
    res.render('teams', {
      list: templist,
      style_teams: 'active-button',
      page_name: 'Команды',
    });
  }
}

module.exports = Controller;
