class Controller {
  info(req, res) {
    res.render("info");
  }

  home(list, req, res) {
    res.render("home", { list: list });
  }

  status404(res) {
    res.status(404).send("Not found");
  }

  organizers(req, res) {
    res.render("organizers");
  }

  partners(req, res) {
    res.render("partners");
  }
}

module.exports = Controller;
