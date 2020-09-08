class DateForm {
  formatDate(s) {
    let tmp = "";
    if (s[8] != "0") {
      tmp += s[8];
    }
    return (
      s[11] +
      s[12] +
      s[13] +
      s[14] +
      s[15] +
      " " +
      tmp +
      s[9] +
      " " +
      MONTHS[parseInt(s[5] + s[6]) - 1] +
      " " +
      s[0] +
      s[1] +
      s[2] +
      s[3]
    ).toString();
  }
}

const MONTHS = [
  "января",
  "февраля",
  "марта",
  "апреля",
  "мая",
  "июня",
  "июля",
  "августа",
  "сентября",
  "октября",
  "ноября",
  "декабря",
];
module.exports = DateForm;
