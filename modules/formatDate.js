const MONTHS = [
  'января',
  'февраля',
  'марта',
  'апреля',
  'мая',
  'июня',
  'июля',
  'августа',
  'сентября',
  'октября',
  'ноября',
  'декабря',
];
/**
 * Форматирует строку из "2020-09-09 12:34:22.719308+00" в "12:34 9 сентября 2020"
 * @param {String} date - input date
 * @returns {String}
 */
function formatDate(s) {
  let tmp = '';
  if (s[8] !== '0') {
    tmp += s[8];
  }
  return `${s[11] + s[12] + s[13] + s[14] + s[15]} ${tmp}${s[9]} ${
    MONTHS[parseInt(s[5] + s[6], 10) - 1]
  } ${s[0]}${s[1]}${s[2]}${s[3]}`;
}

module.exports = formatDate;
