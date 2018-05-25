/**
 * 将数字补全，和ES7的padStart(2,0)相似
 * @param source 数据源
 * @param length 补全长度
 * @returns {string}
 */
export default (source, length = 2) => {
  let pre = '';
  const negative = source < 0;
  const string = String(Math.abs(source));
  if (string.length < length) {
    pre = (new Array(length - string.length + 1)).join('0');
  }
  return (negative ? '-' : '') + pre + string;
}
