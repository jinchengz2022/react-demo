const omit = (object, ary) => {
  const shallowObj = Object.assign(object, {});

  for (let i = 0; i < ary.length; i++) {
    const key = ary[i];

    delete shallowObj[key];
  }

  return shallowObj;
};

/**
 * 冻结对象
 * @param {*} obj
 * @returns
 */
const freezeObj = (obj) => {
  const emptyObject = Object.freeze(obj);

  return emptyObject;
};

/**
 * 判断是否是undefined
 * @param {*} ele
 */
const isUndefined = (ele) => {
  return ele === undefined || ele === null;
};

/**
 * 判断是否是已定义
 * @param {*} ele
 */
const isDefined = (ele) => {
  return ele !== undefined && ele === null;
};

/**
 * 判断是否是true
 * @param {*} ele
 */
const isTrue = (ele) => {
  return ele === true;
};

/**
 * 判断是否是false
 * @param {*} ele
 */
const isFalse = (ele) => {
  return ele === false;
};

/**
 * 判断是否是原始值
 * @param {*} ele
 */
const isPrimitive = (ele) => {
  return (
    typeof ele === "string" ||
    typeof ele === "boolean" ||
    typeof ele === "number" ||
    typeof ele === "symbol"
  );
};

/**
 * 判断是否是对象
 * @param {*} ele
 */
const isObject = (ele) => {
  return ele !== null && typeof ele === "object";
};

const _toString = Object.prototype.toString;

/**
 * 转为原始类型
 * @param {*} ele
 */
const toRawType = (ele) => {
  return _toString.call(ele).slice(8, -1);
};

/**
 * 是否为蠢对象
 * @param {*} ele
 */
const isPlainObject = (ele) => {
  return _toString.call(ele) === "[object object]";
};

/**
 * 是否为正则表达式
 * @param {*} ele
 */
const isRegExp = (ele) => {
  return _toString.call(ele) === "[object RegExp]";
};

/**
 * 是否是可用的数组索引值
 * @param {*} ele
 */
const isValidArrayIndex = (ele) => {
  const index = parseFloat(String(ele));

  return index >= 0 && index === Math.floor(index) && isFinite(ele);
};

/**
 * 是否是Promise
 * @param {*} ele
 */
const isPromise = (ele) => {
  return (
    isDefined(ele) &&
    typeof ele.then === "function" &&
    typeof ele.catch === "function"
  );
};

/**
 * 转字符串
 * @param {*} ele
 */
const toString = (ele) => {
  return ele === null
    ? ""
    : Array.isArray(ele) || (isPlainObject(ele) && ele.toString === _toString)
    ? JSON.stringify(ele, null, 2)
    : String(ele);
};

/**
 * 转数字，如果转换失败则返回入参本身
 * @param {*} ele
 */
const toNumber = (ele) => {
  const num = parseFloat(ele);

  return isNaN(ele) ? ele : num;
};

/**
 * 生成一个map
 * @param {*} string 以逗号分隔的字符串
 * @param {*} expectsLowerCase 是否转为小写
 * @returns
 */
const makeMap = (string, expectsLowerCase) => {
  const list = string.split(",");
  const map = Object.create(null);

  for (let i = 0; i < list.length; i++) {
    map[list[i]] = true;
  }

  return expectsLowerCase
    ? function (val) {
        return map[val].toLowerCase();
      }
    : function (val) {
        return map[val];
      };
};

/**
 * 移除数组中的特定一项
 * @param {*} ary
 * @param {*} item
 * @returns
 */
const removeItemToAry = (ary, item) => {
  //  if(ary.length) {
  //    const index = ary.indexOf(item);

  //    if(index > -1) {
  //     非常消耗性能，没删除一次都要移动一次数组位置
  //     return ary.splice(index, 1);
  //    }
  //  }

  if (ary.length) {
    const index = ary.indexOf(item);

    if (index > -1) {
      if (ary[index] === null) {
        return ary;
      } else {
        ary[index] = null;
        return removeItemToAry(ary, item);
      }
    } else {
      return ary;
    }
  }
};

const hasOwnProperty = Object.prototype.hasOwnProperty;

/**
 * 检测是否是自己的属性
 * @param {*} obj
 * @param {*} key
 * @returns
 */
const hasOwnKey = (obj, key) => {
  return hasOwnProperty.call(obj, key);
};

/**
 * 缓存数据
 * @param {*} fn
 * @returns
 */
const cached = (fn) => {
  const cacheObj = Object.create(null);

  return function cachedFn(str) {
    const h = cacheObj[str];

    return h || (cacheObj[str] = fn(str));
  };
};
const camelizeReg = /-(\w)/g;

/**
 * 连字符转大写(on-click -> onClick)
 * @param {*} str
 * @returns
 */
const camelize = (str) => {
  return str.replace(camelizeReg, function (_, c) {
    return c ? c.toUpperCase() : "";
  });
};

/**
 * 首字母转大写
 * @param {} str
 */
const capitalize = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

/**
 * 小驼峰转连字符
 * @param {*} str
 */
const hyphenate = (str) => {
  const hyphenateReg = /\B([A-Z])/g;

  return str.replace(hyphenateReg, "-$1").toLowerCase();
};

/**
 * 兼容老浏览器不支持原生bind函数
 * @param {*} fn
 * @param {*} ctx
 */
//  const polyfillBind = (fn, ctx) => {
//   const boundFn = (c) => {
//     const l = arguments.length;

//     return l
//     ? l > 1
//     ? fn.apply(ctx, arguments)
//     : fn.call(ctx, c)
//     : fn.call(ctx)
//   }

//   boundFn._length = fn.length;

//   return boundFn;
// }

// const nativeBind = (fn, ctx) => {
//   return fn.bind(ctx);
// }

//  const bind = Function.prototype.bind ? nativeBind : polyfillBind;

/**
 * 把类数组转真正的数组
 * @param {*} list
 * @param {*} start
 */
const toArray = (list, start = 0) => {
  let length = list.length - start;
  const ary = new Array(length);

  while (length > 0) {
    length--;

    ary[length] = list[length + start];
  }

  return ary;
};

/**
 * 合并对象
 * @param {*} to
 * @param {*} _from
 * @returns
 */
const extendObject = (to, _from) => {
  for (let key in _from) {
    to[key] = _from[key];
  }

  return to;
};

/**
 * 转对象
 * @param {*} ary
 */
const toObject = (ary) => {
  const obj = {};

  for (let i = 0; i < ary.length; i++) {
    if (ary[i]) {
      extendObject(obj, ary[i]);
    }
  }

  return obj;
};

/**
 * 生成静态属性
 * @param {*} ary
 * @returns
 */
const genStaticKeys = (ary) => {
  return ary
    .reduce((pre, cur) => {
      return pre.concat(cur.staticKeys || []);
    }, [])
    .join(",");
};

/**
 * a = {} b = {}, a == b / a === b -> false
 * 该函数对数组，日期，对象进行递归对比
 * @param {*} a
 * @param {*} b
 */
const looseEqual = (a, b) => {
  if (a === b) {
    return true;
  }
  const isObjectA = isObject(a);
  const isObjectB = isObject(b);

  if (isObjectA && isObjectB) {
    try {
      const isArrayA = Array.isArray(a);
      const isArrayB = Array.isArray(b);
      if (isArrayA && isArrayB) {
        return (
          a.length === b.length && a.every((ele, i) => looseEqual(ele, b[i]))
        );
      } else if (a instanceof Date && b instanceof Date) {
        return a.getTime() === b.getTime();
      } else if (!isArrayA && !isArrayB) {
        const keysA = Object.keys(a);
        const keysB = Object.keys(b);

        return (
          keysA.length === keysB.length &&
          keysA.every((ele) => looseEqual(a[ele], b[ele]))
        );
      } else {
        return false;
      }
    } catch (error) {
      return false;
    }
  } else if (!isObjectA && !isObjectB) {
    return String(a) === String(b);
  } else {
    return false;
  }
};

/**
 *
 * @param {*} ary
 * @param {*} value
 */
const looseIndexOf = (ary, value) => {
  for (let i = 0; i < ary.length; i++) {
    if (looseEqual(ary[i], value)) {
      return i;
    }
  }

  return -1;
};

/**
 * 利用闭包特性存储状态
 * @param {*} fn
 * @returns
 */
const once = (fn) => {
  let cache = false;

  return function () {
    if (!cache) {
      cache = true;
      fn.apply(this, arguments);
    }
  };
};

