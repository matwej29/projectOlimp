class DateFormatter {
  constructor(date = new Date()) {
    this.date = date;
  }
  
  Day() {
    return this.date.getDate();
  }

  Month() {
    return this.date.getMonth();
  }

  Year(){
    return this.date.getFullYear();
  }
}

module.exports = DateFormatter;