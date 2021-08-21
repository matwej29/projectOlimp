/**
 * @type {import('sequelize').Model}
 */
const { News } = require('./modelsHandler');

class Controller {
  getAdd(req, res) {
    res.render('addition', {
      inputName: 'header',
      areaName: 'text',
      action: '/admin/news/add',
      layout: 'layoutA',
      style_admin: 'active-button',
      accessChoiсe: true,
      accessOptions: [
        { value: '0', text: 'Все пользователи', selected: true },
        {
          value: '1',
          text: 'Только авторизованные пользователи',
        },
      ],
    });
  }

  async postAdd(req, res) {
    const article = req.body;
    await News.upsert({
      header: article.header,
      text: article.text,
      access: article.access ?? 0,
    });
    res.redirect('/admin');
  }

  delete(req, res) {
    News.destroy({ where: { id: req.query.id } });
    res.redirect('/admin');
  }

  async getEdit(req, res) {
    const item = await News.findOne({ where: { id: req.query.id } });
    res.render('edit', {
      action: `/admin/news/edit?id=${req.query.id}`,
      firstValue: item.header,
      secondValue: item.text,
      inputName: 'header',
      areaName: 'text',
      layout: 'layoutA',
      style_admin: 'active-button',
      options: [
        { value: '1', text: 'Все пользователи', selected: item.access === 1 },
        {
          value: '2',
          text: 'Только авторизованные пользователи',
          selected: item.access === 2,
        },
      ],
      accessChoiсe: true,
    });
  }

  postEdit(req, res) {
    const article = req.body;
    News.update(article, { where: { id: req.query.id } });
    res.redirect('/admin');
  }
}

module.exports = Controller;
