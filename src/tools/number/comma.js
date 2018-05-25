/**
 * 将数字转换为科学计数法，即1000转为1,000
 * @param source 数据源
 * @param length 分隔长度
 * @returns {string}
 */
export default (source, length = 3) => {
  source = String(source).split(".");
  source[0] = source[0].replace(new RegExp('(\\d)(?=(\\d{' + length + '})+$)', 'ig'), "$1,");
  return source.join(".");
}
