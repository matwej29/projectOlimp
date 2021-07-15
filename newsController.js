const storage = require('./news.js');

class Controller {
  getAdd(req, res) {
    res.render('addition', {
      inputName: 'header',
      areaName: 'text',
      action: '/admin/news/add',
      layout: 'layoutA',
      style_admin: 'active-button',
    });
  }

  postAdd(req, res) {
    const article = req.body;
    storage.News.upsert({
      header: article.header,
      text: article.header,
      access: article.access,
    });
    res.redirect('/admin');
  }

  delete(req, res) {
    storage.News.destroy({ where: { id: req.query.id } });
    res.redirect('/admin');
  }

  async getEdit(req, res) {
    const item = await storage.News.findOne({ where: { id: req.query.id } });
    res.render('edit', {
      action: `/admin/news/edit?id=${req.query.id}`,
      firstValue: item.header,
      secondValue: item.text,
      inputName: 'header',
      areaName: 'text',
      layout: 'layoutA',
      style_admin: 'active-button',
      options: [{value: '1', text: "Все пользователи", selected: item.access === 1 },
      {value: '2', text: "Только авторизованные пользователи", selected: item.access === 2},
    ]
    });
  }

  postEdit(req, res) {
    const article = req.body;
    storage.News.update(article, { where: { id: req.query.id } });
    res.redirect('/admin');
  }
}

module.exports = Controller;
