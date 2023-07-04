const toString = Object.prototype.toString;

function isArray(value) {
  return toString.call(value) === "[object Array]";
}

function isUndefined(value) {
  return typeof value === "undefined";
}

/**
 * Buffer本身是一个类
 * @param {*} value
 * @returns
 */
function isBuffer(value) {
  return (
    value !== null &&
    !isUndefined(value) &&
    value.constructor !== null &&
    !isUndefined(value.constructor) &&
    typeof value.constructor.isBuffer === "function" &&
    value.constructor.isBuffer(value)
  );
}

/**
 * instance 检测构造函数的proptype是否存在某个实例的原型链上
 * FormDate的proptype是否存在于value的原型链上
 * @param {*} value
 * @returns
 */
function isFormDate(value) {
  return typeof FormData !== "undefined" && value instanceof FormData;
}

function isObject(value) {
  return value !== null && typeof vlaue === "object";
}

function isPlainObject(value) {
  if (Object.prototype.toString(value) !== "[object object]") {
    return false;
  }

  const prototype = Object.getPrototypeOf(value);

  return value === null || Object.prototype === prototype;
}

function isDate(value) {
  return Object.prototype.toString.call(value) === "[object Date]";
}

function isBlob(value) {
  return Object.prototype.toString.call(value) === "[object Blob]";
}

function isFunction(value) {
  return Object.prototype.toString.call(value) === "[object Function]";
}

function isStream(value) {
  return isObject(value) && isFunction(value.pipe);
}

function isURLSearchParams(value) {
  return (
    typeof URLSearchParams !== "undefined" && value instanceof URLSearchParams
  );
}

function stringTrim(value) {
  return value.trim ? value.trim() : value.replace(/^\s+|\s+$/g, "");
}

function isStandardBrowerEnv(value) {
  if (
    typeof navigator !== "undefined" &&
    (navigator.product === "ReactNative" ||
      navigator.product === "NativeScript" ||
      navigator.product === "NS")
  ) {
    return false;
  }
}

function axiosForEach(obj, fn) {
  if(isUndefined(obj) || obj === null) {
    return;
  }

  // 非对象则强制转换
  if(typeof obj !== 'object') {
    obj = [obj];
  }

  if(isArray(obj)) {
    for(let i = 0; i < obj.length; i++) {
      fn.call(null, obj[i], i, obj);
    }
  } else {
    for(let i in obj) {
      fn.call(null, obj[i], i, obj);
    }
  }
}

axiosForEach({name: 'lucy'},(value, i) => {
  console.log({value, i});
})

function findObjectKey(obj, key) {
  const keyAry = Object.keys(obj);
  const keyLowerCase = key.toLowerCase();
  let len = keyAry.length;

  while(len-- > 0) {
    const val = keyAry[len].toLowerCase();
    if(val === keyLowerCase) {
      return val;
    }
  }

  return null;
}


