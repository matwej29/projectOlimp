const BDteam = require("./teams.js");
const dbTeam = new BDteam();

class Controller {
  getAdd(req, res) {
    res.render("addition", {
      inputName: "name",
      areaName: "description",
      action: "/admin/teams/add",
    });
  }

  async postAdd(req, res) {
    await dbTeam.add(req.body.name, req.body.description);
    res.redirect("/admin/teams");
  }

  async delete(req, res) {
    await dbTeam.delete(req.query.id);
    res.redirect("/admin/teams");
  }

  async getEdit(req, res) {
    const item = await dbTeam.itemById(req.query.id);
    res.render("edit", {
      action: `/admin/teams/edit?id=${req.query.id}`,
      firstValue: item.name,
      secondValue: item.description,
      inputName: "name",
      areaName: "description",
    });
  }

  async postEdit(req, res) {
    await dbTeam.edit(req.query.id, req.body);
    res.redirect("/admin/teams");
  }
}

module.exports = Controller;
