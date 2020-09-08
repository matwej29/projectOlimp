const marked = require("marked");

const Storage = require("./news.js");
const storage = new Storage();

const BDteam = require("./teams.js");
const dbTeam = new BDteam();

const DateForm = require("./dateForm");
const dateForm = new DateForm();

class Controller {
  async home(req, res) {
    let templist = await storage.news();
    templist.sort(function (a, b) {
      return a.id - b.id;
    });
    templist.forEach(async (element) => {
      element.text = null ? "" : element.text;
      element.text = marked(element.text);
      let s = element.date.toString();
      element.date = dateForm.formatDate(s);
    });
    res.render("homeA", { list: templist, layout: "layoutA", style_admin: "active-button"});
  }

  async teams(req, res) {
    let templist = await dbTeam.teams();
    templist.sort(function (a, b) {
      return a.id - b.id;
    });
    templist.forEach(async (element) => {
      element.description = null ? "" : element.description;
      element.description = marked(element.description);
    });
    res.render("teamsA", { list: templist, layout: "layoutA", style_teams: "active-button"});
  }
}

module.exports = Controller;
