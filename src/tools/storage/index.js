/**
 * 设置缓存
 * @param storageType 缓存类型
 * @param key 缓存的key
 * @param value 缓存的值
 * @param expire 过期时间，单位毫秒，不传则默认不设置过期时间
 * @private
 */
let _setStorage = (storageType, key = '', value = '', expire = 0) => {
  try {
    // 判断是否设置过期时间
    if (expire) {
      window[storageType].setItem(key, JSON.stringify({
        value,
        timestamp: +new Date(),
        expire
      }));
    } else {
      // 如果为对象或者数组，则转为字符串
      if (value && typeof value === 'object') {
        window[storageType].setItem(key, JSON.stringify(value));
      } else {
        window[storageType].setItem(key, value);
      }
    }
  } catch (e) {
    console.error(`set ${storageType} error`, e);
  }
};

/**
 * 获取缓存
 * @param storageType 缓存类型
 * @param key 缓存的key
 * @returns {*}
 * @private
 */
let _getStorage = (storageType, key) => {
  try {
    let value = window[storageType].getItem(key);
    let data = value && JSON.parse(value);
    // 判断是否含过期时间
    if (data && data.expire) {
      let date = +new Date();
      // 大于expires表示已过期，删除已存数据
      if (date - data.timestamp > data.expire) {
        window[storageType].removeItem(key);
        return null;
      } else {
        return data.value;
      }
    } else {
      return data;
    }
  } catch (e) {
    console.error(`get ${storageType} error`, e);
  }
};

let StorageHandle = {
  // TODO 设置localStorage
  setLocal(key = '', value = '', expire = 0) {
    _setStorage('localStorage', key, value, expire);
  },
  // TODO 获取localStorage
  getLocal(key) {
    return _getStorage('localStorage', key);
  },
  // TODO 设置sessionStorage
  setSession(key = '', value = '', expire = 0) {
    _setStorage('sessionStorage', key, value, expire);
  },
  // TODO 获取sessionStorage
  getSession(key) {
    return _getStorage('sessionStorage', key);
  }
};

export default StorageHandle;
