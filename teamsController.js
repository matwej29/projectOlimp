const {Teams} = require('./modelsHandler');

class Controller {
  getAdd(req, res) {
    res.render('addition', {
      inputName: 'name',
      areaName: 'description',
      action: '/admin/teams/add',
      layout: 'layoutA',
      style_teams: 'active-button',
    });
  }

  async postAdd(req, res) {
    Teams.upsert({
      name: req.body.name,
      description: req.body.description,
    });
    await Teams.insert(req.body.name, req.body.description);
    res.redirect('/admin/teams');
  }

  async delete(req, res) {
    await Teams.destroy({ where: { id: req.query.id } });
    res.redirect('/admin/teams');
  }

  async getEdit(req, res) {
    const item = await Teams.findOne({ where: { id: req.query.id } });
    res.render('edit', {
      action: `/admin/teams/edit?id=${req.query.id}`,
      firstValue: item.name,
      secondValue: item.description,
      inputName: 'name',
      areaName: 'description',
      layout: 'layoutA',
      style_teams: 'active-button',
    });
  }

  async postEdit(req, res) {
    await Teams.update(
      { name: req.body.name, description: req.body.description },
      { where: { id: req.query.id } },
    );
    res.redirect('/admin/teams');
  }
}

module.exports = Controller;
