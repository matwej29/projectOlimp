const marked = require('marked');

const storage = require('./modelsHandler');

const formatDate = require('./modules/formatDate.js');

class Controller {
  async home(req, res) {
    const templist = await storage.News.findAll();
    
    templist
      .sort((a, b) => a.id - b.id)
      .forEach(async element => {
        element.text = undefined ? '' : marked(element.text);
        element.date = formatDate(element.date);
      });
    res.render('homeA', {
      list: templist,
      layout: 'layoutA',
      style_admin: 'active-button',
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
    res.render('teamsA', {
      list: templist,
      layout: 'layoutA',
      style_teams: 'active-button',
    });
  }

  async info(req, res) {
    const info = await storage.Pages.findOne({ where: { title: 'info' } });
    info.body = marked(info.body);

    res.render('infoA', {
      regulation: info.body,
      style_info: 'active-button',
      layout: 'layoutA',
    });
  }

  async getInfo(req, res) {
    const item = await storage.Pages.findOne({ where: { title: 'info' } });
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
    await pages.Pages.update(
      { body: req.body.text },
      { where: { title: 'info' } },
    );
    res.redirect('/admin/info');
  }
}

module.exports = Controller;
