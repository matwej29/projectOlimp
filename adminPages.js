const marked = require('marked');

const Storage = require('./news.js');
const storage = new Storage();

const BDteam = require('./teams.js');
const dbTeam = new BDteam();

const formatDate = require('./modules/formatDate.js');

class Controller {
  async home(req, res) {
    const templist = await storage.news();
    templist.sort((a, b) => a.id - b.id);
    templist.forEach(async element => {
      element.text = undefined ? '' : marked(element.text);
      const s = element.date.toString();
      element.date = formatDate(s);
    });
    res.render('homeA', {
      list: templist,
      layout: 'layoutA',
      style_admin: 'active-button',
    });
  }

  async teams(req, res) {
    const templist = await dbTeam.teams();
    templist.sort((a, b) => a.id - b.id);
    templist.forEach(async element => {
      element.description = undefined ? '' : element.description;
      element.description = marked(element.description);
    });
    res.render('teamsA', {
      list: templist,
      layout: 'layoutA',
      style_teams: 'active-button',
    });
  }
}

module.exports = Controller;
