const marked = require("marked");

const Storage = require("./news.js");
const storage = new Storage();

const BDteam = require("./teams.js");
const dbTeam = new BDteam();

class Controller {
  async home(req, res) {
    let templist = await storage.news();
    templist.sort(function (a, b) {
      return a.id - b.id;
    });
    templist.forEach(async (element) => {
      element.text = null ? "" : element.text;
      element.text = marked(element.text);
    });
    res.render("homeA", { list: templist, layout: "layoutA" });
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
    res.render("teamsA", { list: templist, layout: "layoutA" });
  }
}

module.exports = Controller;
