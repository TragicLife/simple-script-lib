import pad from "./../number/pad";

/**
 *
 * @param type 类型，可传值有yesterdays、days、weeks、months、years
 * @param separator 用于分割的符号，默认-
 * @returns {{start: string|string, end: string}}
 */
export default (type = 'days', separator = '-') => {
  let now = new Date();
  let dayTime = 24 * 3600 * 1000; // 一天的毫秒数
  let dateObj = {};
  let start = ''; // 起始时间
  let end = `${now.getFullYear()}${separator}${pad(now.getMonth() + 1)}${separator}${pad(now.getDate())}`; // 结束时间
  switch (type) {
    case 'yesterdays':
      let yesterdays = new Date(now - dayTime);
      dateObj = {
        y: yesterdays.getFullYear(),
        m: yesterdays.getMonth() + 1,
        d: yesterdays.getDate()
      };
      end = `${dateObj.y}${separator}${pad(dateObj.m)}${separator}${pad(dateObj.d)}`;
      break;
    case 'days':
      start = end;
      break;
    case 'weeks':
      let curDay = now.getDay() !== 0 ? now.getDay() : 7;
      let weeks = new Date(now - (curDay - 1) * dayTime); // 获取周一的日期
      dateObj = {
        y: weeks.getFullYear(),
        m: weeks.getMonth() + 1,
        d: weeks.getDate()
      };
      break;
    case 'months':
      dateObj = {
        y: now.getFullYear(),
        m: now.getMonth() + 1,
        d: 1
      };
      break;
    case 'years':
      dateObj = {
        y: now.getFullYear(),
        m: 1,
        d: 1
      };
      break;
    default:
      start = end;
      break;
  }
  start = start ? start : `${dateObj.y}${separator}${pad(dateObj.m)}${separator}${pad(dateObj.d)}`;
  return {
    start,
    end
  }
}
