class Storage {
  constructor() {
    this.items = [];
    this.id = 1;
  }

  getList() {
    let temps = [];
    for (let i = 0; i < this.items.length; i += 1) {
      const { value, id } = this.items[i];
      temps[i] = { value: value, id: id };
    }
    return temps;
  }

  add(s) {
    this.items.push({ value: s, id: this.id });
    this.id += 1;
  }

  delete(id) {
    if (this.hasId(id)) {
      const i = this.findIndexById(id);
      this.items.splice(i, 1);
      return true;
    }
    return false;
  }

  hasId(id) {
    return this.items.findIndex((item) => item.id === id) >= 0;
  }

  findIndexById(id) {
    return this.items.findIndex((item) => item.id === id);
  }
}
module.exports = Storage;
