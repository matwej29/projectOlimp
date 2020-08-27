class Controller {
  info(req, res) {
    res.render("info");
  }
  add(req, res) {
    res.render("addition");
  }

  home(list, req, res) {
    res.render("home", { list: list });
  }

  redirectToHome(res) {
    res.redirect("/home");
  }

  status404(res) {
    res.status(404).send("Not found");
  }

  edit(req, res, tmpid, header) {
    res.render("edit", { tmpid, header });
  }

  organizers(req, res) {
    res.render("organizers");
  }

  partners(req, res) {
    res.render("partners");
  }
}

module.exports = Controller;
