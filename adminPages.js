const marked = require('marked');

const storage = require('./modelsHandler');

// const formatDate = require('./modules/formatDate');

class Controller {
  async home(req, res) {
    const templist = await storage.News.findAll();
    templist
      .sort((a, b) => a.id - b.id)
      .forEach(async element => {
        element.text = marked(element?.text ?? '');
        // element.date = formatDate(element.date);
      });
    res.render('cardList', {
      list: templist,
      layout: 'layoutA',
      style_admin: 'active-button',
      page_name: 'Новости',
      path: 'news',
    });
  }

  async teams(req, res) {
    const templist = await storage.Teams.findAll();
    templist
      .sort((a, b) => a.id - b.id)
      .forEach(async element => {
        element.header = element.name;
        element.text = marked(element?.description ?? '');
      });
    res.render('cardList', {
      list: templist,
      layout: 'layoutA',
      style_teams: 'active-button',
      page_name: 'Команды',
      path: 'teams',
    });
  }

  async info(req, res) {
    const info = (await storage.Pages.findOne({
      where: { title: 'info' },
    })) ?? { body: '' };
    info.body = marked(info.body);

    res.render('infoA', {
      regulation: info.body,
      style_info: 'active-button',
      layout: 'layoutA',
      page_name: 'Положение',
    });
  }

  async getInfo(req, res) {
    const item =
      (await storage.Pages.findOne({ where: { title: 'info' } })) ?? '';
    res.render('edit', {
      action: `/admin/info/edit`,
      firstValue: 'Положение',
      secondValue: item.body,
      inputName: 'title',
      areaName: 'text',
      layout: 'layoutA',
      style_teams: 'active-button',
    });
  }

  async postInfo(req, res) {
    await storage.Pages.upsert(
      { title: 'info', body: req.body.text },
      { where: { title: 'info' } },
    );
    res.redirect('/admin/info');
  }
}

module.exports = Controller;
