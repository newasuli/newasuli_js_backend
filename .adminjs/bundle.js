(function (React, adminjs, designSystem, reactRouterDom) {
  'use strict';

  function _interopDefault (e) { return e && e.__esModule ? e : { default: e }; }

  var React__default = /*#__PURE__*/_interopDefault(React);

  const CustomDashboard = () => {
    const {
      translate
    } = adminjs.useTranslation();
    return /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
      width: 1,
      textAlign: "center",
      padding: 5,
      bg: "white"
    });
  };

  /**
   * Create a bound version of a function with a specified `this` context
   *
   * @param {Function} fn - The function to bind
   * @param {*} thisArg - The value to be passed as the `this` parameter
   * @returns {Function} A new function that will call the original function with the specified `this` context
   */
  function bind(fn, thisArg) {
    return function wrap() {
      return fn.apply(thisArg, arguments);
    };
  }

  // utils is a library of generic helper functions non-specific to axios

  const { toString } = Object.prototype;
  const { getPrototypeOf } = Object;
  const { iterator, toStringTag } = Symbol;

  const kindOf = ((cache) => (thing) => {
    const str = toString.call(thing);
    return cache[str] || (cache[str] = str.slice(8, -1).toLowerCase());
  })(Object.create(null));

  const kindOfTest = (type) => {
    type = type.toLowerCase();
    return (thing) => kindOf(thing) === type;
  };

  const typeOfTest = (type) => (thing) => typeof thing === type;

  /**
   * Determine if a value is a non-null object
   *
   * @param {Object} val The value to test
   *
   * @returns {boolean} True if value is an Array, otherwise false
   */
  const { isArray } = Array;

  /**
   * Determine if a value is undefined
   *
   * @param {*} val The value to test
   *
   * @returns {boolean} True if the value is undefined, otherwise false
   */
  const isUndefined = typeOfTest('undefined');

  /**
   * Determine if a value is a Buffer
   *
   * @param {*} val The value to test
   *
   * @returns {boolean} True if value is a Buffer, otherwise false
   */
  function isBuffer(val) {
    return (
      val !== null &&
      !isUndefined(val) &&
      val.constructor !== null &&
      !isUndefined(val.constructor) &&
      isFunction$1(val.constructor.isBuffer) &&
      val.constructor.isBuffer(val)
    );
  }

  /**
   * Determine if a value is an ArrayBuffer
   *
   * @param {*} val The value to test
   *
   * @returns {boolean} True if value is an ArrayBuffer, otherwise false
   */
  const isArrayBuffer = kindOfTest('ArrayBuffer');

  /**
   * Determine if a value is a view on an ArrayBuffer
   *
   * @param {*} val The value to test
   *
   * @returns {boolean} True if value is a view on an ArrayBuffer, otherwise false
   */
  function isArrayBufferView(val) {
    let result;
    if (typeof ArrayBuffer !== 'undefined' && ArrayBuffer.isView) {
      result = ArrayBuffer.isView(val);
    } else {
      result = val && val.buffer && isArrayBuffer(val.buffer);
    }
    return result;
  }

  /**
   * Determine if a value is a String
   *
   * @param {*} val The value to test
   *
   * @returns {boolean} True if value is a String, otherwise false
   */
  const isString = typeOfTest('string');

  /**
   * Determine if a value is a Function
   *
   * @param {*} val The value to test
   * @returns {boolean} True if value is a Function, otherwise false
   */
  const isFunction$1 = typeOfTest('function');

  /**
   * Determine if a value is a Number
   *
   * @param {*} val The value to test
   *
   * @returns {boolean} True if value is a Number, otherwise false
   */
  const isNumber = typeOfTest('number');

  /**
   * Determine if a value is an Object
   *
   * @param {*} thing The value to test
   *
   * @returns {boolean} True if value is an Object, otherwise false
   */
  const isObject = (thing) => thing !== null && typeof thing === 'object';

  /**
   * Determine if a value is a Boolean
   *
   * @param {*} thing The value to test
   * @returns {boolean} True if value is a Boolean, otherwise false
   */
  const isBoolean = (thing) => thing === true || thing === false;

  /**
   * Determine if a value is a plain Object
   *
   * @param {*} val The value to test
   *
   * @returns {boolean} True if value is a plain Object, otherwise false
   */
  const isPlainObject = (val) => {
    if (kindOf(val) !== 'object') {
      return false;
    }

    const prototype = getPrototypeOf(val);
    return (
      (prototype === null ||
        prototype === Object.prototype ||
        Object.getPrototypeOf(prototype) === null) &&
      !(toStringTag in val) &&
      !(iterator in val)
    );
  };

  /**
   * Determine if a value is an empty object (safely handles Buffers)
   *
   * @param {*} val The value to test
   *
   * @returns {boolean} True if value is an empty object, otherwise false
   */
  const isEmptyObject = (val) => {
    // Early return for non-objects or Buffers to prevent RangeError
    if (!isObject(val) || isBuffer(val)) {
      return false;
    }

    try {
      return Object.keys(val).length === 0 && Object.getPrototypeOf(val) === Object.prototype;
    } catch (e) {
      // Fallback for any other objects that might cause RangeError with Object.keys()
      return false;
    }
  };

  /**
   * Determine if a value is a Date
   *
   * @param {*} val The value to test
   *
   * @returns {boolean} True if value is a Date, otherwise false
   */
  const isDate = kindOfTest('Date');

  /**
   * Determine if a value is a File
   *
   * @param {*} val The value to test
   *
   * @returns {boolean} True if value is a File, otherwise false
   */
  const isFile = kindOfTest('File');

  /**
   * Determine if a value is a React Native Blob
   * React Native "blob": an object with a `uri` attribute. Optionally, it can
   * also have a `name` and `type` attribute to specify filename and content type
   *
   * @see https://github.com/facebook/react-native/blob/26684cf3adf4094eb6c405d345a75bf8c7c0bf88/Libraries/Network/FormData.js#L68-L71
   *
   * @param {*} value The value to test
   *
   * @returns {boolean} True if value is a React Native Blob, otherwise false
   */
  const isReactNativeBlob = (value) => {
    return !!(value && typeof value.uri !== 'undefined');
  };

  /**
   * Determine if environment is React Native
   * ReactNative `FormData` has a non-standard `getParts()` method
   *
   * @param {*} formData The formData to test
   *
   * @returns {boolean} True if environment is React Native, otherwise false
   */
  const isReactNative = (formData) => formData && typeof formData.getParts !== 'undefined';

  /**
   * Determine if a value is a Blob
   *
   * @param {*} val The value to test
   *
   * @returns {boolean} True if value is a Blob, otherwise false
   */
  const isBlob = kindOfTest('Blob');

  /**
   * Determine if a value is a FileList
   *
   * @param {*} val The value to test
   *
   * @returns {boolean} True if value is a FileList, otherwise false
   */
  const isFileList = kindOfTest('FileList');

  /**
   * Determine if a value is a Stream
   *
   * @param {*} val The value to test
   *
   * @returns {boolean} True if value is a Stream, otherwise false
   */
  const isStream = (val) => isObject(val) && isFunction$1(val.pipe);

  /**
   * Determine if a value is a FormData
   *
   * @param {*} thing The value to test
   *
   * @returns {boolean} True if value is an FormData, otherwise false
   */
  function getGlobal() {
    if (typeof globalThis !== 'undefined') return globalThis;
    if (typeof self !== 'undefined') return self;
    if (typeof window !== 'undefined') return window;
    if (typeof global !== 'undefined') return global;
    return {};
  }

  const G = getGlobal();
  const FormDataCtor = typeof G.FormData !== 'undefined' ? G.FormData : undefined;

  const isFormData = (thing) => {
    if (!thing) return false;
    if (FormDataCtor && thing instanceof FormDataCtor) return true;
    // Reject plain objects inheriting directly from Object.prototype so prototype-pollution gadgets can't spoof FormData.
    const proto = getPrototypeOf(thing);
    if (!proto || proto === Object.prototype) return false;
    if (!isFunction$1(thing.append)) return false;
    const kind = kindOf(thing);
    return (
      kind === 'formdata' ||
      // detect form-data instance
      (kind === 'object' && isFunction$1(thing.toString) && thing.toString() === '[object FormData]')
    );
  };

  /**
   * Determine if a value is a URLSearchParams object
   *
   * @param {*} val The value to test
   *
   * @returns {boolean} True if value is a URLSearchParams object, otherwise false
   */
  const isURLSearchParams = kindOfTest('URLSearchParams');

  const [isReadableStream, isRequest, isResponse, isHeaders] = [
    'ReadableStream',
    'Request',
    'Response',
    'Headers',
  ].map(kindOfTest);

  /**
   * Trim excess whitespace off the beginning and end of a string
   *
   * @param {String} str The String to trim
   *
   * @returns {String} The String freed of excess whitespace
   */
  const trim = (str) => {
    return str.trim ? str.trim() : str.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '');
  };
  /**
   * Iterate over an Array or an Object invoking a function for each item.
   *
   * If `obj` is an Array callback will be called passing
   * the value, index, and complete array for each item.
   *
   * If 'obj' is an Object callback will be called passing
   * the value, key, and complete object for each property.
   *
   * @param {Object|Array<unknown>} obj The object to iterate
   * @param {Function} fn The callback to invoke for each item
   *
   * @param {Object} [options]
   * @param {Boolean} [options.allOwnKeys = false]
   * @returns {any}
   */
  function forEach(obj, fn, { allOwnKeys = false } = {}) {
    // Don't bother if no value provided
    if (obj === null || typeof obj === 'undefined') {
      return;
    }

    let i;
    let l;

    // Force an array if not already something iterable
    if (typeof obj !== 'object') {
      /*eslint no-param-reassign:0*/
      obj = [obj];
    }

    if (isArray(obj)) {
      // Iterate over array values
      for (i = 0, l = obj.length; i < l; i++) {
        fn.call(null, obj[i], i, obj);
      }
    } else {
      // Buffer check
      if (isBuffer(obj)) {
        return;
      }

      // Iterate over object keys
      const keys = allOwnKeys ? Object.getOwnPropertyNames(obj) : Object.keys(obj);
      const len = keys.length;
      let key;

      for (i = 0; i < len; i++) {
        key = keys[i];
        fn.call(null, obj[key], key, obj);
      }
    }
  }

  /**
   * Finds a key in an object, case-insensitive, returning the actual key name.
   * Returns null if the object is a Buffer or if no match is found.
   *
   * @param {Object} obj - The object to search.
   * @param {string} key - The key to find (case-insensitive).
   * @returns {?string} The actual key name if found, otherwise null.
   */
  function findKey(obj, key) {
    if (isBuffer(obj)) {
      return null;
    }

    key = key.toLowerCase();
    const keys = Object.keys(obj);
    let i = keys.length;
    let _key;
    while (i-- > 0) {
      _key = keys[i];
      if (key === _key.toLowerCase()) {
        return _key;
      }
    }
    return null;
  }

  const _global = (() => {
    /*eslint no-undef:0*/
    if (typeof globalThis !== 'undefined') return globalThis;
    return typeof self !== 'undefined' ? self : typeof window !== 'undefined' ? window : global;
  })();

  const isContextDefined = (context) => !isUndefined(context) && context !== _global;

  /**
   * Accepts varargs expecting each argument to be an object, then
   * immutably merges the properties of each object and returns result.
   *
   * When multiple objects contain the same key the later object in
   * the arguments list will take precedence.
   *
   * Example:
   *
   * ```js
   * const result = merge({foo: 123}, {foo: 456});
   * console.log(result.foo); // outputs 456
   * ```
   *
   * @param {Object} obj1 Object to merge
   *
   * @returns {Object} Result of all merge properties
   */
  function merge(...objs) {
    const { caseless, skipUndefined } = (isContextDefined(this) && this) || {};
    const result = {};
    const assignValue = (val, key) => {
      // Skip dangerous property names to prevent prototype pollution
      if (key === '__proto__' || key === 'constructor' || key === 'prototype') {
        return;
      }

      const targetKey = (caseless && findKey(result, key)) || key;
      // Read via own-prop only — a bare `result[targetKey]` walks the prototype
      // chain, so a polluted Object.prototype value could surface here and get
      // copied into the merged result.
      const existing = hasOwnProperty(result, targetKey) ? result[targetKey] : undefined;
      if (isPlainObject(existing) && isPlainObject(val)) {
        result[targetKey] = merge(existing, val);
      } else if (isPlainObject(val)) {
        result[targetKey] = merge({}, val);
      } else if (isArray(val)) {
        result[targetKey] = val.slice();
      } else if (!skipUndefined || !isUndefined(val)) {
        result[targetKey] = val;
      }
    };

    for (let i = 0, l = objs.length; i < l; i++) {
      objs[i] && forEach(objs[i], assignValue);
    }
    return result;
  }

  /**
   * Extends object a by mutably adding to it the properties of object b.
   *
   * @param {Object} a The object to be extended
   * @param {Object} b The object to copy properties from
   * @param {Object} thisArg The object to bind function to
   *
   * @param {Object} [options]
   * @param {Boolean} [options.allOwnKeys]
   * @returns {Object} The resulting value of object a
   */
  const extend = (a, b, thisArg, { allOwnKeys } = {}) => {
    forEach(
      b,
      (val, key) => {
        if (thisArg && isFunction$1(val)) {
          Object.defineProperty(a, key, {
            // Null-proto descriptor so a polluted Object.prototype.get cannot
            // hijack defineProperty's accessor-vs-data resolution.
            __proto__: null,
            value: bind(val, thisArg),
            writable: true,
            enumerable: true,
            configurable: true,
          });
        } else {
          Object.defineProperty(a, key, {
            __proto__: null,
            value: val,
            writable: true,
            enumerable: true,
            configurable: true,
          });
        }
      },
      { allOwnKeys }
    );
    return a;
  };

  /**
   * Remove byte order marker. This catches EF BB BF (the UTF-8 BOM)
   *
   * @param {string} content with BOM
   *
   * @returns {string} content value without BOM
   */
  const stripBOM = (content) => {
    if (content.charCodeAt(0) === 0xfeff) {
      content = content.slice(1);
    }
    return content;
  };

  /**
   * Inherit the prototype methods from one constructor into another
   * @param {function} constructor
   * @param {function} superConstructor
   * @param {object} [props]
   * @param {object} [descriptors]
   *
   * @returns {void}
   */
  const inherits = (constructor, superConstructor, props, descriptors) => {
    constructor.prototype = Object.create(superConstructor.prototype, descriptors);
    Object.defineProperty(constructor.prototype, 'constructor', {
      __proto__: null,
      value: constructor,
      writable: true,
      enumerable: false,
      configurable: true,
    });
    Object.defineProperty(constructor, 'super', {
      __proto__: null,
      value: superConstructor.prototype,
    });
    props && Object.assign(constructor.prototype, props);
  };

  /**
   * Resolve object with deep prototype chain to a flat object
   * @param {Object} sourceObj source object
   * @param {Object} [destObj]
   * @param {Function|Boolean} [filter]
   * @param {Function} [propFilter]
   *
   * @returns {Object}
   */
  const toFlatObject = (sourceObj, destObj, filter, propFilter) => {
    let props;
    let i;
    let prop;
    const merged = {};

    destObj = destObj || {};
    // eslint-disable-next-line no-eq-null,eqeqeq
    if (sourceObj == null) return destObj;

    do {
      props = Object.getOwnPropertyNames(sourceObj);
      i = props.length;
      while (i-- > 0) {
        prop = props[i];
        if ((!propFilter || propFilter(prop, sourceObj, destObj)) && !merged[prop]) {
          destObj[prop] = sourceObj[prop];
          merged[prop] = true;
        }
      }
      sourceObj = filter !== false && getPrototypeOf(sourceObj);
    } while (sourceObj && (!filter || filter(sourceObj, destObj)) && sourceObj !== Object.prototype);

    return destObj;
  };

  /**
   * Determines whether a string ends with the characters of a specified string
   *
   * @param {String} str
   * @param {String} searchString
   * @param {Number} [position= 0]
   *
   * @returns {boolean}
   */
  const endsWith = (str, searchString, position) => {
    str = String(str);
    if (position === undefined || position > str.length) {
      position = str.length;
    }
    position -= searchString.length;
    const lastIndex = str.indexOf(searchString, position);
    return lastIndex !== -1 && lastIndex === position;
  };

  /**
   * Returns new array from array like object or null if failed
   *
   * @param {*} [thing]
   *
   * @returns {?Array}
   */
  const toArray = (thing) => {
    if (!thing) return null;
    if (isArray(thing)) return thing;
    let i = thing.length;
    if (!isNumber(i)) return null;
    const arr = new Array(i);
    while (i-- > 0) {
      arr[i] = thing[i];
    }
    return arr;
  };

  /**
   * Checking if the Uint8Array exists and if it does, it returns a function that checks if the
   * thing passed in is an instance of Uint8Array
   *
   * @param {TypedArray}
   *
   * @returns {Array}
   */
  // eslint-disable-next-line func-names
  const isTypedArray = ((TypedArray) => {
    // eslint-disable-next-line func-names
    return (thing) => {
      return TypedArray && thing instanceof TypedArray;
    };
  })(typeof Uint8Array !== 'undefined' && getPrototypeOf(Uint8Array));

  /**
   * For each entry in the object, call the function with the key and value.
   *
   * @param {Object<any, any>} obj - The object to iterate over.
   * @param {Function} fn - The function to call for each entry.
   *
   * @returns {void}
   */
  const forEachEntry = (obj, fn) => {
    const generator = obj && obj[iterator];

    const _iterator = generator.call(obj);

    let result;

    while ((result = _iterator.next()) && !result.done) {
      const pair = result.value;
      fn.call(obj, pair[0], pair[1]);
    }
  };

  /**
   * It takes a regular expression and a string, and returns an array of all the matches
   *
   * @param {string} regExp - The regular expression to match against.
   * @param {string} str - The string to search.
   *
   * @returns {Array<boolean>}
   */
  const matchAll = (regExp, str) => {
    let matches;
    const arr = [];

    while ((matches = regExp.exec(str)) !== null) {
      arr.push(matches);
    }

    return arr;
  };

  /* Checking if the kindOfTest function returns true when passed an HTMLFormElement. */
  const isHTMLForm = kindOfTest('HTMLFormElement');

  const toCamelCase = (str) => {
    return str.toLowerCase().replace(/[-_\s]([a-z\d])(\w*)/g, function replacer(m, p1, p2) {
      return p1.toUpperCase() + p2;
    });
  };

  /* Creating a function that will check if an object has a property. */
  const hasOwnProperty = (
    ({ hasOwnProperty }) =>
    (obj, prop) =>
      hasOwnProperty.call(obj, prop)
  )(Object.prototype);

  /**
   * Determine if a value is a RegExp object
   *
   * @param {*} val The value to test
   *
   * @returns {boolean} True if value is a RegExp object, otherwise false
   */
  const isRegExp = kindOfTest('RegExp');

  const reduceDescriptors = (obj, reducer) => {
    const descriptors = Object.getOwnPropertyDescriptors(obj);
    const reducedDescriptors = {};

    forEach(descriptors, (descriptor, name) => {
      let ret;
      if ((ret = reducer(descriptor, name, obj)) !== false) {
        reducedDescriptors[name] = ret || descriptor;
      }
    });

    Object.defineProperties(obj, reducedDescriptors);
  };

  /**
   * Makes all methods read-only
   * @param {Object} obj
   */

  const freezeMethods = (obj) => {
    reduceDescriptors(obj, (descriptor, name) => {
      // skip restricted props in strict mode
      if (isFunction$1(obj) && ['arguments', 'caller', 'callee'].includes(name)) {
        return false;
      }

      const value = obj[name];

      if (!isFunction$1(value)) return;

      descriptor.enumerable = false;

      if ('writable' in descriptor) {
        descriptor.writable = false;
        return;
      }

      if (!descriptor.set) {
        descriptor.set = () => {
          throw Error("Can not rewrite read-only method '" + name + "'");
        };
      }
    });
  };

  /**
   * Converts an array or a delimited string into an object set with values as keys and true as values.
   * Useful for fast membership checks.
   *
   * @param {Array|string} arrayOrString - The array or string to convert.
   * @param {string} delimiter - The delimiter to use if input is a string.
   * @returns {Object} An object with keys from the array or string, values set to true.
   */
  const toObjectSet = (arrayOrString, delimiter) => {
    const obj = {};

    const define = (arr) => {
      arr.forEach((value) => {
        obj[value] = true;
      });
    };

    isArray(arrayOrString) ? define(arrayOrString) : define(String(arrayOrString).split(delimiter));

    return obj;
  };

  const noop = () => {};

  const toFiniteNumber = (value, defaultValue) => {
    return value != null && Number.isFinite((value = +value)) ? value : defaultValue;
  };

  /**
   * If the thing is a FormData object, return true, otherwise return false.
   *
   * @param {unknown} thing - The thing to check.
   *
   * @returns {boolean}
   */
  function isSpecCompliantForm(thing) {
    return !!(
      thing &&
      isFunction$1(thing.append) &&
      thing[toStringTag] === 'FormData' &&
      thing[iterator]
    );
  }

  /**
   * Recursively converts an object to a JSON-compatible object, handling circular references and Buffers.
   *
   * @param {Object} obj - The object to convert.
   * @returns {Object} The JSON-compatible object.
   */
  const toJSONObject = (obj) => {
    const stack = new Array(10);

    const visit = (source, i) => {
      if (isObject(source)) {
        if (stack.indexOf(source) >= 0) {
          return;
        }

        //Buffer check
        if (isBuffer(source)) {
          return source;
        }

        if (!('toJSON' in source)) {
          stack[i] = source;
          const target = isArray(source) ? [] : {};

          forEach(source, (value, key) => {
            const reducedValue = visit(value, i + 1);
            !isUndefined(reducedValue) && (target[key] = reducedValue);
          });

          stack[i] = undefined;

          return target;
        }
      }

      return source;
    };

    return visit(obj, 0);
  };

  /**
   * Determines if a value is an async function.
   *
   * @param {*} thing - The value to test.
   * @returns {boolean} True if value is an async function, otherwise false.
   */
  const isAsyncFn = kindOfTest('AsyncFunction');

  /**
   * Determines if a value is thenable (has then and catch methods).
   *
   * @param {*} thing - The value to test.
   * @returns {boolean} True if value is thenable, otherwise false.
   */
  const isThenable = (thing) =>
    thing &&
    (isObject(thing) || isFunction$1(thing)) &&
    isFunction$1(thing.then) &&
    isFunction$1(thing.catch);

  // original code
  // https://github.com/DigitalBrainJS/AxiosPromise/blob/16deab13710ec09779922131f3fa5954320f83ab/lib/utils.js#L11-L34

  /**
   * Provides a cross-platform setImmediate implementation.
   * Uses native setImmediate if available, otherwise falls back to postMessage or setTimeout.
   *
   * @param {boolean} setImmediateSupported - Whether setImmediate is supported.
   * @param {boolean} postMessageSupported - Whether postMessage is supported.
   * @returns {Function} A function to schedule a callback asynchronously.
   */
  const _setImmediate = ((setImmediateSupported, postMessageSupported) => {
    if (setImmediateSupported) {
      return setImmediate;
    }

    return postMessageSupported
      ? ((token, callbacks) => {
          _global.addEventListener(
            'message',
            ({ source, data }) => {
              if (source === _global && data === token) {
                callbacks.length && callbacks.shift()();
              }
            },
            false
          );

          return (cb) => {
            callbacks.push(cb);
            _global.postMessage(token, '*');
          };
        })(`axios@${Math.random()}`, [])
      : (cb) => setTimeout(cb);
  })(typeof setImmediate === 'function', isFunction$1(_global.postMessage));

  /**
   * Schedules a microtask or asynchronous callback as soon as possible.
   * Uses queueMicrotask if available, otherwise falls back to process.nextTick or _setImmediate.
   *
   * @type {Function}
   */
  const asap =
    typeof queueMicrotask !== 'undefined'
      ? queueMicrotask.bind(_global)
      : (typeof process !== 'undefined' && process.nextTick) || _setImmediate;

  // *********************

  const isIterable = (thing) => thing != null && isFunction$1(thing[iterator]);

  var utils$1 = {
    isArray,
    isArrayBuffer,
    isBuffer,
    isFormData,
    isArrayBufferView,
    isString,
    isNumber,
    isBoolean,
    isObject,
    isPlainObject,
    isEmptyObject,
    isReadableStream,
    isRequest,
    isResponse,
    isHeaders,
    isUndefined,
    isDate,
    isFile,
    isReactNativeBlob,
    isReactNative,
    isBlob,
    isRegExp,
    isFunction: isFunction$1,
    isStream,
    isURLSearchParams,
    isTypedArray,
    isFileList,
    forEach,
    merge,
    extend,
    trim,
    stripBOM,
    inherits,
    toFlatObject,
    kindOf,
    kindOfTest,
    endsWith,
    toArray,
    forEachEntry,
    matchAll,
    isHTMLForm,
    hasOwnProperty,
    hasOwnProp: hasOwnProperty, // an alias to avoid ESLint no-prototype-builtins detection
    reduceDescriptors,
    freezeMethods,
    toObjectSet,
    toCamelCase,
    noop,
    toFiniteNumber,
    findKey,
    global: _global,
    isContextDefined,
    isSpecCompliantForm,
    toJSONObject,
    isAsyncFn,
    isThenable,
    setImmediate: _setImmediate,
    asap,
    isIterable,
  };

  // RawAxiosHeaders whose duplicates are ignored by node
  // c.f. https://nodejs.org/api/http.html#http_message_headers
  const ignoreDuplicateOf = utils$1.toObjectSet([
    'age',
    'authorization',
    'content-length',
    'content-type',
    'etag',
    'expires',
    'from',
    'host',
    'if-modified-since',
    'if-unmodified-since',
    'last-modified',
    'location',
    'max-forwards',
    'proxy-authorization',
    'referer',
    'retry-after',
    'user-agent',
  ]);

  /**
   * Parse headers into an object
   *
   * ```
   * Date: Wed, 27 Aug 2014 08:58:49 GMT
   * Content-Type: application/json
   * Connection: keep-alive
   * Transfer-Encoding: chunked
   * ```
   *
   * @param {String} rawHeaders Headers needing to be parsed
   *
   * @returns {Object} Headers parsed into an object
   */
  var parseHeaders = (rawHeaders) => {
    const parsed = {};
    let key;
    let val;
    let i;

    rawHeaders &&
      rawHeaders.split('\n').forEach(function parser(line) {
        i = line.indexOf(':');
        key = line.substring(0, i).trim().toLowerCase();
        val = line.substring(i + 1).trim();

        if (!key || (parsed[key] && ignoreDuplicateOf[key])) {
          return;
        }

        if (key === 'set-cookie') {
          if (parsed[key]) {
            parsed[key].push(val);
          } else {
            parsed[key] = [val];
          }
        } else {
          parsed[key] = parsed[key] ? parsed[key] + ', ' + val : val;
        }
      });

    return parsed;
  };

  const $internals = Symbol('internals');

  const INVALID_HEADER_VALUE_CHARS_RE = /[^\x09\x20-\x7E\x80-\xFF]/g;

  function trimSPorHTAB(str) {
    let start = 0;
    let end = str.length;

    while (start < end) {
      const code = str.charCodeAt(start);

      if (code !== 0x09 && code !== 0x20) {
        break;
      }

      start += 1;
    }

    while (end > start) {
      const code = str.charCodeAt(end - 1);

      if (code !== 0x09 && code !== 0x20) {
        break;
      }

      end -= 1;
    }

    return start === 0 && end === str.length ? str : str.slice(start, end);
  }

  function normalizeHeader(header) {
    return header && String(header).trim().toLowerCase();
  }

  function sanitizeHeaderValue(str) {
    return trimSPorHTAB(str.replace(INVALID_HEADER_VALUE_CHARS_RE, ''));
  }

  function normalizeValue(value) {
    if (value === false || value == null) {
      return value;
    }

    return utils$1.isArray(value) ? value.map(normalizeValue) : sanitizeHeaderValue(String(value));
  }

  function parseTokens(str) {
    const tokens = Object.create(null);
    const tokensRE = /([^\s,;=]+)\s*(?:=\s*([^,;]+))?/g;
    let match;

    while ((match = tokensRE.exec(str))) {
      tokens[match[1]] = match[2];
    }

    return tokens;
  }

  const isValidHeaderName = (str) => /^[-_a-zA-Z0-9^`|~,!#$%&'*+.]+$/.test(str.trim());

  function matchHeaderValue(context, value, header, filter, isHeaderNameFilter) {
    if (utils$1.isFunction(filter)) {
      return filter.call(this, value, header);
    }

    if (isHeaderNameFilter) {
      value = header;
    }

    if (!utils$1.isString(value)) return;

    if (utils$1.isString(filter)) {
      return value.indexOf(filter) !== -1;
    }

    if (utils$1.isRegExp(filter)) {
      return filter.test(value);
    }
  }

  function formatHeader(header) {
    return header
      .trim()
      .toLowerCase()
      .replace(/([a-z\d])(\w*)/g, (w, char, str) => {
        return char.toUpperCase() + str;
      });
  }

  function buildAccessors(obj, header) {
    const accessorName = utils$1.toCamelCase(' ' + header);

    ['get', 'set', 'has'].forEach((methodName) => {
      Object.defineProperty(obj, methodName + accessorName, {
        // Null-proto descriptor so a polluted Object.prototype.get cannot turn
        // this data descriptor into an accessor descriptor on the way in.
        __proto__: null,
        value: function (arg1, arg2, arg3) {
          return this[methodName].call(this, header, arg1, arg2, arg3);
        },
        configurable: true,
      });
    });
  }

  let AxiosHeaders$1 = class AxiosHeaders {
    constructor(headers) {
      headers && this.set(headers);
    }

    set(header, valueOrRewrite, rewrite) {
      const self = this;

      function setHeader(_value, _header, _rewrite) {
        const lHeader = normalizeHeader(_header);

        if (!lHeader) {
          throw new Error('header name must be a non-empty string');
        }

        const key = utils$1.findKey(self, lHeader);

        if (
          !key ||
          self[key] === undefined ||
          _rewrite === true ||
          (_rewrite === undefined && self[key] !== false)
        ) {
          self[key || _header] = normalizeValue(_value);
        }
      }

      const setHeaders = (headers, _rewrite) =>
        utils$1.forEach(headers, (_value, _header) => setHeader(_value, _header, _rewrite));

      if (utils$1.isPlainObject(header) || header instanceof this.constructor) {
        setHeaders(header, valueOrRewrite);
      } else if (utils$1.isString(header) && (header = header.trim()) && !isValidHeaderName(header)) {
        setHeaders(parseHeaders(header), valueOrRewrite);
      } else if (utils$1.isObject(header) && utils$1.isIterable(header)) {
        let obj = {},
          dest,
          key;
        for (const entry of header) {
          if (!utils$1.isArray(entry)) {
            throw TypeError('Object iterator must return a key-value pair');
          }

          obj[(key = entry[0])] = (dest = obj[key])
            ? utils$1.isArray(dest)
              ? [...dest, entry[1]]
              : [dest, entry[1]]
            : entry[1];
        }

        setHeaders(obj, valueOrRewrite);
      } else {
        header != null && setHeader(valueOrRewrite, header, rewrite);
      }

      return this;
    }

    get(header, parser) {
      header = normalizeHeader(header);

      if (header) {
        const key = utils$1.findKey(this, header);

        if (key) {
          const value = this[key];

          if (!parser) {
            return value;
          }

          if (parser === true) {
            return parseTokens(value);
          }

          if (utils$1.isFunction(parser)) {
            return parser.call(this, value, key);
          }

          if (utils$1.isRegExp(parser)) {
            return parser.exec(value);
          }

          throw new TypeError('parser must be boolean|regexp|function');
        }
      }
    }

    has(header, matcher) {
      header = normalizeHeader(header);

      if (header) {
        const key = utils$1.findKey(this, header);

        return !!(
          key &&
          this[key] !== undefined &&
          (!matcher || matchHeaderValue(this, this[key], key, matcher))
        );
      }

      return false;
    }

    delete(header, matcher) {
      const self = this;
      let deleted = false;

      function deleteHeader(_header) {
        _header = normalizeHeader(_header);

        if (_header) {
          const key = utils$1.findKey(self, _header);

          if (key && (!matcher || matchHeaderValue(self, self[key], key, matcher))) {
            delete self[key];

            deleted = true;
          }
        }
      }

      if (utils$1.isArray(header)) {
        header.forEach(deleteHeader);
      } else {
        deleteHeader(header);
      }

      return deleted;
    }

    clear(matcher) {
      const keys = Object.keys(this);
      let i = keys.length;
      let deleted = false;

      while (i--) {
        const key = keys[i];
        if (!matcher || matchHeaderValue(this, this[key], key, matcher, true)) {
          delete this[key];
          deleted = true;
        }
      }

      return deleted;
    }

    normalize(format) {
      const self = this;
      const headers = {};

      utils$1.forEach(this, (value, header) => {
        const key = utils$1.findKey(headers, header);

        if (key) {
          self[key] = normalizeValue(value);
          delete self[header];
          return;
        }

        const normalized = format ? formatHeader(header) : String(header).trim();

        if (normalized !== header) {
          delete self[header];
        }

        self[normalized] = normalizeValue(value);

        headers[normalized] = true;
      });

      return this;
    }

    concat(...targets) {
      return this.constructor.concat(this, ...targets);
    }

    toJSON(asStrings) {
      const obj = Object.create(null);

      utils$1.forEach(this, (value, header) => {
        value != null &&
          value !== false &&
          (obj[header] = asStrings && utils$1.isArray(value) ? value.join(', ') : value);
      });

      return obj;
    }

    [Symbol.iterator]() {
      return Object.entries(this.toJSON())[Symbol.iterator]();
    }

    toString() {
      return Object.entries(this.toJSON())
        .map(([header, value]) => header + ': ' + value)
        .join('\n');
    }

    getSetCookie() {
      return this.get('set-cookie') || [];
    }

    get [Symbol.toStringTag]() {
      return 'AxiosHeaders';
    }

    static from(thing) {
      return thing instanceof this ? thing : new this(thing);
    }

    static concat(first, ...targets) {
      const computed = new this(first);

      targets.forEach((target) => computed.set(target));

      return computed;
    }

    static accessor(header) {
      const internals =
        (this[$internals] =
        this[$internals] =
          {
            accessors: {},
          });

      const accessors = internals.accessors;
      const prototype = this.prototype;

      function defineAccessor(_header) {
        const lHeader = normalizeHeader(_header);

        if (!accessors[lHeader]) {
          buildAccessors(prototype, _header);
          accessors[lHeader] = true;
        }
      }

      utils$1.isArray(header) ? header.forEach(defineAccessor) : defineAccessor(header);

      return this;
    }
  };

  AxiosHeaders$1.accessor([
    'Content-Type',
    'Content-Length',
    'Accept',
    'Accept-Encoding',
    'User-Agent',
    'Authorization',
  ]);

  // reserved names hotfix
  utils$1.reduceDescriptors(AxiosHeaders$1.prototype, ({ value }, key) => {
    let mapped = key[0].toUpperCase() + key.slice(1); // map `set` => `Set`
    return {
      get: () => value,
      set(headerValue) {
        this[mapped] = headerValue;
      },
    };
  });

  utils$1.freezeMethods(AxiosHeaders$1);

  const REDACTED = '[REDACTED ****]';

  function hasOwnOrPrototypeToJSON(source) {
    if (utils$1.hasOwnProp(source, 'toJSON')) {
      return true;
    }

    let prototype = Object.getPrototypeOf(source);

    while (prototype && prototype !== Object.prototype) {
      if (utils$1.hasOwnProp(prototype, 'toJSON')) {
        return true;
      }

      prototype = Object.getPrototypeOf(prototype);
    }

    return false;
  }

  // Build a plain-object snapshot of `config` and replace the value of any key
  // (case-insensitive) listed in `redactKeys` with REDACTED. Walks through arrays
  // and AxiosHeaders, and short-circuits on circular references.
  function redactConfig(config, redactKeys) {
    const lowerKeys = new Set(redactKeys.map((k) => String(k).toLowerCase()));
    const seen = [];

    const visit = (source) => {
      if (source === null || typeof source !== 'object') return source;
      if (utils$1.isBuffer(source)) return source;
      if (seen.indexOf(source) !== -1) return undefined;

      if (source instanceof AxiosHeaders$1) {
        source = source.toJSON();
      }

      seen.push(source);

      let result;
      if (utils$1.isArray(source)) {
        result = [];
        source.forEach((v, i) => {
          const reducedValue = visit(v);
          if (!utils$1.isUndefined(reducedValue)) {
            result[i] = reducedValue;
          }
        });
      } else {
        if (!utils$1.isPlainObject(source) && hasOwnOrPrototypeToJSON(source)) {
          seen.pop();
          return source;
        }

        result = Object.create(null);
        for (const [key, value] of Object.entries(source)) {
          const reducedValue = lowerKeys.has(key.toLowerCase()) ? REDACTED : visit(value);
          if (!utils$1.isUndefined(reducedValue)) {
            result[key] = reducedValue;
          }
        }
      }

      seen.pop();
      return result;
    };

    return visit(config);
  }

  let AxiosError$1 = class AxiosError extends Error {
    static from(error, code, config, request, response, customProps) {
      const axiosError = new AxiosError(error.message, code || error.code, config, request, response);
      axiosError.cause = error;
      axiosError.name = error.name;

      // Preserve status from the original error if not already set from response
      if (error.status != null && axiosError.status == null) {
        axiosError.status = error.status;
      }

      customProps && Object.assign(axiosError, customProps);
      return axiosError;
    }

    /**
     * Create an Error with the specified message, config, error code, request and response.
     *
     * @param {string} message The error message.
     * @param {string} [code] The error code (for example, 'ECONNABORTED').
     * @param {Object} [config] The config.
     * @param {Object} [request] The request.
     * @param {Object} [response] The response.
     *
     * @returns {Error} The created error.
     */
    constructor(message, code, config, request, response) {
      super(message);

      // Make message enumerable to maintain backward compatibility
      // The native Error constructor sets message as non-enumerable,
      // but axios < v1.13.3 had it as enumerable
      Object.defineProperty(this, 'message', {
        // Null-proto descriptor so a polluted Object.prototype.get cannot turn
        // this data descriptor into an accessor descriptor on the way in.
        __proto__: null,
        value: message,
        enumerable: true,
        writable: true,
        configurable: true,
      });

      this.name = 'AxiosError';
      this.isAxiosError = true;
      code && (this.code = code);
      config && (this.config = config);
      request && (this.request = request);
      if (response) {
        this.response = response;
        this.status = response.status;
      }
    }

    toJSON() {
      // Opt-in redaction: when the request config carries a `redact` array, the
      // value of any matching key (case-insensitive, at any depth) is replaced
      // with REDACTED in the serialized snapshot. Undefined or empty leaves the
      // existing serialization behavior unchanged.
      const config = this.config;
      const redactKeys = config && utils$1.hasOwnProp(config, 'redact') ? config.redact : undefined;
      const serializedConfig =
        utils$1.isArray(redactKeys) && redactKeys.length > 0
          ? redactConfig(config, redactKeys)
          : utils$1.toJSONObject(config);

      return {
        // Standard
        message: this.message,
        name: this.name,
        // Microsoft
        description: this.description,
        number: this.number,
        // Mozilla
        fileName: this.fileName,
        lineNumber: this.lineNumber,
        columnNumber: this.columnNumber,
        stack: this.stack,
        // Axios
        config: serializedConfig,
        code: this.code,
        status: this.status,
      };
    }
  };

  // This can be changed to static properties as soon as the parser options in .eslint.cjs are updated.
  AxiosError$1.ERR_BAD_OPTION_VALUE = 'ERR_BAD_OPTION_VALUE';
  AxiosError$1.ERR_BAD_OPTION = 'ERR_BAD_OPTION';
  AxiosError$1.ECONNABORTED = 'ECONNABORTED';
  AxiosError$1.ETIMEDOUT = 'ETIMEDOUT';
  AxiosError$1.ECONNREFUSED = 'ECONNREFUSED';
  AxiosError$1.ERR_NETWORK = 'ERR_NETWORK';
  AxiosError$1.ERR_FR_TOO_MANY_REDIRECTS = 'ERR_FR_TOO_MANY_REDIRECTS';
  AxiosError$1.ERR_DEPRECATED = 'ERR_DEPRECATED';
  AxiosError$1.ERR_BAD_RESPONSE = 'ERR_BAD_RESPONSE';
  AxiosError$1.ERR_BAD_REQUEST = 'ERR_BAD_REQUEST';
  AxiosError$1.ERR_CANCELED = 'ERR_CANCELED';
  AxiosError$1.ERR_NOT_SUPPORT = 'ERR_NOT_SUPPORT';
  AxiosError$1.ERR_INVALID_URL = 'ERR_INVALID_URL';
  AxiosError$1.ERR_FORM_DATA_DEPTH_EXCEEDED = 'ERR_FORM_DATA_DEPTH_EXCEEDED';

  // eslint-disable-next-line strict
  var httpAdapter = null;

  /**
   * Determines if the given thing is a array or js object.
   *
   * @param {string} thing - The object or array to be visited.
   *
   * @returns {boolean}
   */
  function isVisitable(thing) {
    return utils$1.isPlainObject(thing) || utils$1.isArray(thing);
  }

  /**
   * It removes the brackets from the end of a string
   *
   * @param {string} key - The key of the parameter.
   *
   * @returns {string} the key without the brackets.
   */
  function removeBrackets(key) {
    return utils$1.endsWith(key, '[]') ? key.slice(0, -2) : key;
  }

  /**
   * It takes a path, a key, and a boolean, and returns a string
   *
   * @param {string} path - The path to the current key.
   * @param {string} key - The key of the current object being iterated over.
   * @param {string} dots - If true, the key will be rendered with dots instead of brackets.
   *
   * @returns {string} The path to the current key.
   */
  function renderKey(path, key, dots) {
    if (!path) return key;
    return path
      .concat(key)
      .map(function each(token, i) {
        // eslint-disable-next-line no-param-reassign
        token = removeBrackets(token);
        return !dots && i ? '[' + token + ']' : token;
      })
      .join(dots ? '.' : '');
  }

  /**
   * If the array is an array and none of its elements are visitable, then it's a flat array.
   *
   * @param {Array<any>} arr - The array to check
   *
   * @returns {boolean}
   */
  function isFlatArray(arr) {
    return utils$1.isArray(arr) && !arr.some(isVisitable);
  }

  const predicates = utils$1.toFlatObject(utils$1, {}, null, function filter(prop) {
    return /^is[A-Z]/.test(prop);
  });

  /**
   * Convert a data object to FormData
   *
   * @param {Object} obj
   * @param {?Object} [formData]
   * @param {?Object} [options]
   * @param {Function} [options.visitor]
   * @param {Boolean} [options.metaTokens = true]
   * @param {Boolean} [options.dots = false]
   * @param {?Boolean} [options.indexes = false]
   *
   * @returns {Object}
   **/

  /**
   * It converts an object into a FormData object
   *
   * @param {Object<any, any>} obj - The object to convert to form data.
   * @param {string} formData - The FormData object to append to.
   * @param {Object<string, any>} options
   *
   * @returns
   */
  function toFormData$1(obj, formData, options) {
    if (!utils$1.isObject(obj)) {
      throw new TypeError('target must be an object');
    }

    // eslint-disable-next-line no-param-reassign
    formData = formData || new (FormData)();

    // eslint-disable-next-line no-param-reassign
    options = utils$1.toFlatObject(
      options,
      {
        metaTokens: true,
        dots: false,
        indexes: false,
      },
      false,
      function defined(option, source) {
        // eslint-disable-next-line no-eq-null,eqeqeq
        return !utils$1.isUndefined(source[option]);
      }
    );

    const metaTokens = options.metaTokens;
    // eslint-disable-next-line no-use-before-define
    const visitor = options.visitor || defaultVisitor;
    const dots = options.dots;
    const indexes = options.indexes;
    const _Blob = options.Blob || (typeof Blob !== 'undefined' && Blob);
    const maxDepth = options.maxDepth === undefined ? 100 : options.maxDepth;
    const useBlob = _Blob && utils$1.isSpecCompliantForm(formData);

    if (!utils$1.isFunction(visitor)) {
      throw new TypeError('visitor must be a function');
    }

    function convertValue(value) {
      if (value === null) return '';

      if (utils$1.isDate(value)) {
        return value.toISOString();
      }

      if (utils$1.isBoolean(value)) {
        return value.toString();
      }

      if (!useBlob && utils$1.isBlob(value)) {
        throw new AxiosError$1('Blob is not supported. Use a Buffer instead.');
      }

      if (utils$1.isArrayBuffer(value) || utils$1.isTypedArray(value)) {
        return useBlob && typeof Blob === 'function' ? new Blob([value]) : Buffer.from(value);
      }

      return value;
    }

    /**
     * Default visitor.
     *
     * @param {*} value
     * @param {String|Number} key
     * @param {Array<String|Number>} path
     * @this {FormData}
     *
     * @returns {boolean} return true to visit the each prop of the value recursively
     */
    function defaultVisitor(value, key, path) {
      let arr = value;

      if (utils$1.isReactNative(formData) && utils$1.isReactNativeBlob(value)) {
        formData.append(renderKey(path, key, dots), convertValue(value));
        return false;
      }

      if (value && !path && typeof value === 'object') {
        if (utils$1.endsWith(key, '{}')) {
          // eslint-disable-next-line no-param-reassign
          key = metaTokens ? key : key.slice(0, -2);
          // eslint-disable-next-line no-param-reassign
          value = JSON.stringify(value);
        } else if (
          (utils$1.isArray(value) && isFlatArray(value)) ||
          ((utils$1.isFileList(value) || utils$1.endsWith(key, '[]')) && (arr = utils$1.toArray(value)))
        ) {
          // eslint-disable-next-line no-param-reassign
          key = removeBrackets(key);

          arr.forEach(function each(el, index) {
            !(utils$1.isUndefined(el) || el === null) &&
              formData.append(
                // eslint-disable-next-line no-nested-ternary
                indexes === true
                  ? renderKey([key], index, dots)
                  : indexes === null
                    ? key
                    : key + '[]',
                convertValue(el)
              );
          });
          return false;
        }
      }

      if (isVisitable(value)) {
        return true;
      }

      formData.append(renderKey(path, key, dots), convertValue(value));

      return false;
    }

    const stack = [];

    const exposedHelpers = Object.assign(predicates, {
      defaultVisitor,
      convertValue,
      isVisitable,
    });

    function build(value, path, depth = 0) {
      if (utils$1.isUndefined(value)) return;

      if (depth > maxDepth) {
        throw new AxiosError$1(
          'Object is too deeply nested (' + depth + ' levels). Max depth: ' + maxDepth,
          AxiosError$1.ERR_FORM_DATA_DEPTH_EXCEEDED
        );
      }

      if (stack.indexOf(value) !== -1) {
        throw Error('Circular reference detected in ' + path.join('.'));
      }

      stack.push(value);

      utils$1.forEach(value, function each(el, key) {
        const result =
          !(utils$1.isUndefined(el) || el === null) &&
          visitor.call(formData, el, utils$1.isString(key) ? key.trim() : key, path, exposedHelpers);

        if (result === true) {
          build(el, path ? path.concat(key) : [key], depth + 1);
        }
      });

      stack.pop();
    }

    if (!utils$1.isObject(obj)) {
      throw new TypeError('data must be an object');
    }

    build(obj);

    return formData;
  }

  /**
   * It encodes a string by replacing all characters that are not in the unreserved set with
   * their percent-encoded equivalents
   *
   * @param {string} str - The string to encode.
   *
   * @returns {string} The encoded string.
   */
  function encode$1(str) {
    const charMap = {
      '!': '%21',
      "'": '%27',
      '(': '%28',
      ')': '%29',
      '~': '%7E',
      '%20': '+',
    };
    return encodeURIComponent(str).replace(/[!'()~]|%20/g, function replacer(match) {
      return charMap[match];
    });
  }

  /**
   * It takes a params object and converts it to a FormData object
   *
   * @param {Object<string, any>} params - The parameters to be converted to a FormData object.
   * @param {Object<string, any>} options - The options object passed to the Axios constructor.
   *
   * @returns {void}
   */
  function AxiosURLSearchParams(params, options) {
    this._pairs = [];

    params && toFormData$1(params, this, options);
  }

  const prototype = AxiosURLSearchParams.prototype;

  prototype.append = function append(name, value) {
    this._pairs.push([name, value]);
  };

  prototype.toString = function toString(encoder) {
    const _encode = encoder
      ? function (value) {
          return encoder.call(this, value, encode$1);
        }
      : encode$1;

    return this._pairs
      .map(function each(pair) {
        return _encode(pair[0]) + '=' + _encode(pair[1]);
      }, '')
      .join('&');
  };

  /**
   * It replaces URL-encoded forms of `:`, `$`, `,`, and spaces with
   * their plain counterparts (`:`, `$`, `,`, `+`).
   *
   * @param {string} val The value to be encoded.
   *
   * @returns {string} The encoded value.
   */
  function encode(val) {
    return encodeURIComponent(val)
      .replace(/%3A/gi, ':')
      .replace(/%24/g, '$')
      .replace(/%2C/gi, ',')
      .replace(/%20/g, '+');
  }

  /**
   * Build a URL by appending params to the end
   *
   * @param {string} url The base of the url (e.g., http://www.google.com)
   * @param {object} [params] The params to be appended
   * @param {?(object|Function)} options
   *
   * @returns {string} The formatted url
   */
  function buildURL(url, params, options) {
    if (!params) {
      return url;
    }

    const _encode = (options && options.encode) || encode;

    const _options = utils$1.isFunction(options)
      ? {
          serialize: options,
        }
      : options;

    const serializeFn = _options && _options.serialize;

    let serializedParams;

    if (serializeFn) {
      serializedParams = serializeFn(params, _options);
    } else {
      serializedParams = utils$1.isURLSearchParams(params)
        ? params.toString()
        : new AxiosURLSearchParams(params, _options).toString(_encode);
    }

    if (serializedParams) {
      const hashmarkIndex = url.indexOf('#');

      if (hashmarkIndex !== -1) {
        url = url.slice(0, hashmarkIndex);
      }
      url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams;
    }

    return url;
  }

  class InterceptorManager {
    constructor() {
      this.handlers = [];
    }

    /**
     * Add a new interceptor to the stack
     *
     * @param {Function} fulfilled The function to handle `then` for a `Promise`
     * @param {Function} rejected The function to handle `reject` for a `Promise`
     * @param {Object} options The options for the interceptor, synchronous and runWhen
     *
     * @return {Number} An ID used to remove interceptor later
     */
    use(fulfilled, rejected, options) {
      this.handlers.push({
        fulfilled,
        rejected,
        synchronous: options ? options.synchronous : false,
        runWhen: options ? options.runWhen : null,
      });
      return this.handlers.length - 1;
    }

    /**
     * Remove an interceptor from the stack
     *
     * @param {Number} id The ID that was returned by `use`
     *
     * @returns {void}
     */
    eject(id) {
      if (this.handlers[id]) {
        this.handlers[id] = null;
      }
    }

    /**
     * Clear all interceptors from the stack
     *
     * @returns {void}
     */
    clear() {
      if (this.handlers) {
        this.handlers = [];
      }
    }

    /**
     * Iterate over all the registered interceptors
     *
     * This method is particularly useful for skipping over any
     * interceptors that may have become `null` calling `eject`.
     *
     * @param {Function} fn The function to call for each interceptor
     *
     * @returns {void}
     */
    forEach(fn) {
      utils$1.forEach(this.handlers, function forEachHandler(h) {
        if (h !== null) {
          fn(h);
        }
      });
    }
  }

  var transitionalDefaults = {
    silentJSONParsing: true,
    forcedJSONParsing: true,
    clarifyTimeoutError: false,
    legacyInterceptorReqResOrdering: true,
  };

  var URLSearchParams$1 = typeof URLSearchParams !== 'undefined' ? URLSearchParams : AxiosURLSearchParams;

  var FormData$1 = typeof FormData !== 'undefined' ? FormData : null;

  var Blob$1 = typeof Blob !== 'undefined' ? Blob : null;

  var platform$1 = {
    isBrowser: true,
    classes: {
      URLSearchParams: URLSearchParams$1,
      FormData: FormData$1,
      Blob: Blob$1,
    },
    protocols: ['http', 'https', 'file', 'blob', 'url', 'data'],
  };

  const hasBrowserEnv = typeof window !== 'undefined' && typeof document !== 'undefined';

  const _navigator = (typeof navigator === 'object' && navigator) || undefined;

  /**
   * Determine if we're running in a standard browser environment
   *
   * This allows axios to run in a web worker, and react-native.
   * Both environments support XMLHttpRequest, but not fully standard globals.
   *
   * web workers:
   *  typeof window -> undefined
   *  typeof document -> undefined
   *
   * react-native:
   *  navigator.product -> 'ReactNative'
   * nativescript
   *  navigator.product -> 'NativeScript' or 'NS'
   *
   * @returns {boolean}
   */
  const hasStandardBrowserEnv =
    hasBrowserEnv &&
    (!_navigator || ['ReactNative', 'NativeScript', 'NS'].indexOf(_navigator.product) < 0);

  /**
   * Determine if we're running in a standard browser webWorker environment
   *
   * Although the `isStandardBrowserEnv` method indicates that
   * `allows axios to run in a web worker`, the WebWorker will still be
   * filtered out due to its judgment standard
   * `typeof window !== 'undefined' && typeof document !== 'undefined'`.
   * This leads to a problem when axios post `FormData` in webWorker
   */
  const hasStandardBrowserWebWorkerEnv = (() => {
    return (
      typeof WorkerGlobalScope !== 'undefined' &&
      // eslint-disable-next-line no-undef
      self instanceof WorkerGlobalScope &&
      typeof self.importScripts === 'function'
    );
  })();

  const origin = (hasBrowserEnv && window.location.href) || 'http://localhost';

  var utils = /*#__PURE__*/Object.freeze({
    __proto__: null,
    hasBrowserEnv: hasBrowserEnv,
    hasStandardBrowserEnv: hasStandardBrowserEnv,
    hasStandardBrowserWebWorkerEnv: hasStandardBrowserWebWorkerEnv,
    navigator: _navigator,
    origin: origin
  });

  var platform = {
    ...utils,
    ...platform$1,
  };

  function toURLEncodedForm(data, options) {
    return toFormData$1(data, new platform.classes.URLSearchParams(), {
      visitor: function (value, key, path, helpers) {
        if (platform.isNode && utils$1.isBuffer(value)) {
          this.append(key, value.toString('base64'));
          return false;
        }

        return helpers.defaultVisitor.apply(this, arguments);
      },
      ...options,
    });
  }

  /**
   * It takes a string like `foo[x][y][z]` and returns an array like `['foo', 'x', 'y', 'z']
   *
   * @param {string} name - The name of the property to get.
   *
   * @returns An array of strings.
   */
  function parsePropPath(name) {
    // foo[x][y][z]
    // foo.x.y.z
    // foo-x-y-z
    // foo x y z
    return utils$1.matchAll(/\w+|\[(\w*)]/g, name).map((match) => {
      return match[0] === '[]' ? '' : match[1] || match[0];
    });
  }

  /**
   * Convert an array to an object.
   *
   * @param {Array<any>} arr - The array to convert to an object.
   *
   * @returns An object with the same keys and values as the array.
   */
  function arrayToObject(arr) {
    const obj = {};
    const keys = Object.keys(arr);
    let i;
    const len = keys.length;
    let key;
    for (i = 0; i < len; i++) {
      key = keys[i];
      obj[key] = arr[key];
    }
    return obj;
  }

  /**
   * It takes a FormData object and returns a JavaScript object
   *
   * @param {string} formData The FormData object to convert to JSON.
   *
   * @returns {Object<string, any> | null} The converted object.
   */
  function formDataToJSON(formData) {
    function buildPath(path, value, target, index) {
      let name = path[index++];

      if (name === '__proto__') return true;

      const isNumericKey = Number.isFinite(+name);
      const isLast = index >= path.length;
      name = !name && utils$1.isArray(target) ? target.length : name;

      if (isLast) {
        if (utils$1.hasOwnProp(target, name)) {
          target[name] = utils$1.isArray(target[name])
            ? target[name].concat(value)
            : [target[name], value];
        } else {
          target[name] = value;
        }

        return !isNumericKey;
      }

      if (!target[name] || !utils$1.isObject(target[name])) {
        target[name] = [];
      }

      const result = buildPath(path, value, target[name], index);

      if (result && utils$1.isArray(target[name])) {
        target[name] = arrayToObject(target[name]);
      }

      return !isNumericKey;
    }

    if (utils$1.isFormData(formData) && utils$1.isFunction(formData.entries)) {
      const obj = {};

      utils$1.forEachEntry(formData, (name, value) => {
        buildPath(parsePropPath(name), value, obj, 0);
      });

      return obj;
    }

    return null;
  }

  const own = (obj, key) => (obj != null && utils$1.hasOwnProp(obj, key) ? obj[key] : undefined);

  /**
   * It takes a string, tries to parse it, and if it fails, it returns the stringified version
   * of the input
   *
   * @param {any} rawValue - The value to be stringified.
   * @param {Function} parser - A function that parses a string into a JavaScript object.
   * @param {Function} encoder - A function that takes a value and returns a string.
   *
   * @returns {string} A stringified version of the rawValue.
   */
  function stringifySafely(rawValue, parser, encoder) {
    if (utils$1.isString(rawValue)) {
      try {
        (parser || JSON.parse)(rawValue);
        return utils$1.trim(rawValue);
      } catch (e) {
        if (e.name !== 'SyntaxError') {
          throw e;
        }
      }
    }

    return (encoder || JSON.stringify)(rawValue);
  }

  const defaults = {
    transitional: transitionalDefaults,

    adapter: ['xhr', 'http', 'fetch'],

    transformRequest: [
      function transformRequest(data, headers) {
        const contentType = headers.getContentType() || '';
        const hasJSONContentType = contentType.indexOf('application/json') > -1;
        const isObjectPayload = utils$1.isObject(data);

        if (isObjectPayload && utils$1.isHTMLForm(data)) {
          data = new FormData(data);
        }

        const isFormData = utils$1.isFormData(data);

        if (isFormData) {
          return hasJSONContentType ? JSON.stringify(formDataToJSON(data)) : data;
        }

        if (
          utils$1.isArrayBuffer(data) ||
          utils$1.isBuffer(data) ||
          utils$1.isStream(data) ||
          utils$1.isFile(data) ||
          utils$1.isBlob(data) ||
          utils$1.isReadableStream(data)
        ) {
          return data;
        }
        if (utils$1.isArrayBufferView(data)) {
          return data.buffer;
        }
        if (utils$1.isURLSearchParams(data)) {
          headers.setContentType('application/x-www-form-urlencoded;charset=utf-8', false);
          return data.toString();
        }

        let isFileList;

        if (isObjectPayload) {
          const formSerializer = own(this, 'formSerializer');
          if (contentType.indexOf('application/x-www-form-urlencoded') > -1) {
            return toURLEncodedForm(data, formSerializer).toString();
          }

          if (
            (isFileList = utils$1.isFileList(data)) ||
            contentType.indexOf('multipart/form-data') > -1
          ) {
            const env = own(this, 'env');
            const _FormData = env && env.FormData;

            return toFormData$1(
              isFileList ? { 'files[]': data } : data,
              _FormData && new _FormData(),
              formSerializer
            );
          }
        }

        if (isObjectPayload || hasJSONContentType) {
          headers.setContentType('application/json', false);
          return stringifySafely(data);
        }

        return data;
      },
    ],

    transformResponse: [
      function transformResponse(data) {
        const transitional = own(this, 'transitional') || defaults.transitional;
        const forcedJSONParsing = transitional && transitional.forcedJSONParsing;
        const responseType = own(this, 'responseType');
        const JSONRequested = responseType === 'json';

        if (utils$1.isResponse(data) || utils$1.isReadableStream(data)) {
          return data;
        }

        if (
          data &&
          utils$1.isString(data) &&
          ((forcedJSONParsing && !responseType) || JSONRequested)
        ) {
          const silentJSONParsing = transitional && transitional.silentJSONParsing;
          const strictJSONParsing = !silentJSONParsing && JSONRequested;

          try {
            return JSON.parse(data, own(this, 'parseReviver'));
          } catch (e) {
            if (strictJSONParsing) {
              if (e.name === 'SyntaxError') {
                throw AxiosError$1.from(e, AxiosError$1.ERR_BAD_RESPONSE, this, null, own(this, 'response'));
              }
              throw e;
            }
          }
        }

        return data;
      },
    ],

    /**
     * A timeout in milliseconds to abort a request. If set to 0 (default) a
     * timeout is not created.
     */
    timeout: 0,

    xsrfCookieName: 'XSRF-TOKEN',
    xsrfHeaderName: 'X-XSRF-TOKEN',

    maxContentLength: -1,
    maxBodyLength: -1,

    env: {
      FormData: platform.classes.FormData,
      Blob: platform.classes.Blob,
    },

    validateStatus: function validateStatus(status) {
      return status >= 200 && status < 300;
    },

    headers: {
      common: {
        Accept: 'application/json, text/plain, */*',
        'Content-Type': undefined,
      },
    },
  };

  utils$1.forEach(['delete', 'get', 'head', 'post', 'put', 'patch', 'query'], (method) => {
    defaults.headers[method] = {};
  });

  /**
   * Transform the data for a request or a response
   *
   * @param {Array|Function} fns A single function or Array of functions
   * @param {?Object} response The response object
   *
   * @returns {*} The resulting transformed data
   */
  function transformData(fns, response) {
    const config = this || defaults;
    const context = response || config;
    const headers = AxiosHeaders$1.from(context.headers);
    let data = context.data;

    utils$1.forEach(fns, function transform(fn) {
      data = fn.call(config, data, headers.normalize(), response ? response.status : undefined);
    });

    headers.normalize();

    return data;
  }

  function isCancel$1(value) {
    return !!(value && value.__CANCEL__);
  }

  let CanceledError$1 = class CanceledError extends AxiosError$1 {
    /**
     * A `CanceledError` is an object that is thrown when an operation is canceled.
     *
     * @param {string=} message The message.
     * @param {Object=} config The config.
     * @param {Object=} request The request.
     *
     * @returns {CanceledError} The created error.
     */
    constructor(message, config, request) {
      super(message == null ? 'canceled' : message, AxiosError$1.ERR_CANCELED, config, request);
      this.name = 'CanceledError';
      this.__CANCEL__ = true;
    }
  };

  /**
   * Resolve or reject a Promise based on response status.
   *
   * @param {Function} resolve A function that resolves the promise.
   * @param {Function} reject A function that rejects the promise.
   * @param {object} response The response.
   *
   * @returns {object} The response.
   */
  function settle(resolve, reject, response) {
    const validateStatus = response.config.validateStatus;
    if (!response.status || !validateStatus || validateStatus(response.status)) {
      resolve(response);
    } else {
      reject(new AxiosError$1(
        'Request failed with status code ' + response.status,
        response.status >= 400 && response.status < 500 ? AxiosError$1.ERR_BAD_REQUEST : AxiosError$1.ERR_BAD_RESPONSE,
        response.config,
        response.request,
        response
      ));
    }
  }

  function parseProtocol(url) {
    const match = /^([-+\w]{1,25}):(?:\/\/)?/.exec(url);
    return (match && match[1]) || '';
  }

  /**
   * Calculate data maxRate
   * @param {Number} [samplesCount= 10]
   * @param {Number} [min= 1000]
   * @returns {Function}
   */
  function speedometer(samplesCount, min) {
    samplesCount = samplesCount || 10;
    const bytes = new Array(samplesCount);
    const timestamps = new Array(samplesCount);
    let head = 0;
    let tail = 0;
    let firstSampleTS;

    min = min !== undefined ? min : 1000;

    return function push(chunkLength) {
      const now = Date.now();

      const startedAt = timestamps[tail];

      if (!firstSampleTS) {
        firstSampleTS = now;
      }

      bytes[head] = chunkLength;
      timestamps[head] = now;

      let i = tail;
      let bytesCount = 0;

      while (i !== head) {
        bytesCount += bytes[i++];
        i = i % samplesCount;
      }

      head = (head + 1) % samplesCount;

      if (head === tail) {
        tail = (tail + 1) % samplesCount;
      }

      if (now - firstSampleTS < min) {
        return;
      }

      const passed = startedAt && now - startedAt;

      return passed ? Math.round((bytesCount * 1000) / passed) : undefined;
    };
  }

  /**
   * Throttle decorator
   * @param {Function} fn
   * @param {Number} freq
   * @return {Function}
   */
  function throttle(fn, freq) {
    let timestamp = 0;
    let threshold = 1000 / freq;
    let lastArgs;
    let timer;

    const invoke = (args, now = Date.now()) => {
      timestamp = now;
      lastArgs = null;
      if (timer) {
        clearTimeout(timer);
        timer = null;
      }
      fn(...args);
    };

    const throttled = (...args) => {
      const now = Date.now();
      const passed = now - timestamp;
      if (passed >= threshold) {
        invoke(args, now);
      } else {
        lastArgs = args;
        if (!timer) {
          timer = setTimeout(() => {
            timer = null;
            invoke(lastArgs);
          }, threshold - passed);
        }
      }
    };

    const flush = () => lastArgs && invoke(lastArgs);

    return [throttled, flush];
  }

  const progressEventReducer = (listener, isDownloadStream, freq = 3) => {
    let bytesNotified = 0;
    const _speedometer = speedometer(50, 250);

    return throttle((e) => {
      const rawLoaded = e.loaded;
      const total = e.lengthComputable ? e.total : undefined;
      const loaded = total != null ? Math.min(rawLoaded, total) : rawLoaded;
      const progressBytes = Math.max(0, loaded - bytesNotified);
      const rate = _speedometer(progressBytes);

      bytesNotified = Math.max(bytesNotified, loaded);

      const data = {
        loaded,
        total,
        progress: total ? loaded / total : undefined,
        bytes: progressBytes,
        rate: rate ? rate : undefined,
        estimated: rate && total ? (total - loaded) / rate : undefined,
        event: e,
        lengthComputable: total != null,
        [isDownloadStream ? 'download' : 'upload']: true,
      };

      listener(data);
    }, freq);
  };

  const progressEventDecorator = (total, throttled) => {
    const lengthComputable = total != null;

    return [
      (loaded) =>
        throttled[0]({
          lengthComputable,
          total,
          loaded,
        }),
      throttled[1],
    ];
  };

  const asyncDecorator =
    (fn) =>
    (...args) =>
      utils$1.asap(() => fn(...args));

  var isURLSameOrigin = platform.hasStandardBrowserEnv
    ? ((origin, isMSIE) => (url) => {
        url = new URL(url, platform.origin);

        return (
          origin.protocol === url.protocol &&
          origin.host === url.host &&
          (isMSIE || origin.port === url.port)
        );
      })(
        new URL(platform.origin),
        platform.navigator && /(msie|trident)/i.test(platform.navigator.userAgent)
      )
    : () => true;

  var cookies = platform.hasStandardBrowserEnv
    ? // Standard browser envs support document.cookie
      {
        write(name, value, expires, path, domain, secure, sameSite) {
          if (typeof document === 'undefined') return;

          const cookie = [`${name}=${encodeURIComponent(value)}`];

          if (utils$1.isNumber(expires)) {
            cookie.push(`expires=${new Date(expires).toUTCString()}`);
          }
          if (utils$1.isString(path)) {
            cookie.push(`path=${path}`);
          }
          if (utils$1.isString(domain)) {
            cookie.push(`domain=${domain}`);
          }
          if (secure === true) {
            cookie.push('secure');
          }
          if (utils$1.isString(sameSite)) {
            cookie.push(`SameSite=${sameSite}`);
          }

          document.cookie = cookie.join('; ');
        },

        read(name) {
          if (typeof document === 'undefined') return null;
          // Match name=value by splitting on the semicolon separator instead of building a
          // RegExp from `name` — interpolating an unescaped string into a RegExp would let
          // metacharacters (e.g. `.+?` in an attacker-influenced cookie name) cause ReDoS or
          // match the wrong cookie. Browsers may serialize cookie pairs as either ";" or
          // "; ", so ignore optional whitespace before each cookie name.
          const cookies = document.cookie.split(';');
          for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].replace(/^\s+/, '');
            const eq = cookie.indexOf('=');
            if (eq !== -1 && cookie.slice(0, eq) === name) {
              return decodeURIComponent(cookie.slice(eq + 1));
            }
          }
          return null;
        },

        remove(name) {
          this.write(name, '', Date.now() - 86400000, '/');
        },
      }
    : // Non-standard browser env (web workers, react-native) lack needed support.
      {
        write() {},
        read() {
          return null;
        },
        remove() {},
      };

  /**
   * Determines whether the specified URL is absolute
   *
   * @param {string} url The URL to test
   *
   * @returns {boolean} True if the specified URL is absolute, otherwise false
   */
  function isAbsoluteURL(url) {
    // A URL is considered absolute if it begins with "<scheme>://" or "//" (protocol-relative URL).
    // RFC 3986 defines scheme name as a sequence of characters beginning with a letter and followed
    // by any combination of letters, digits, plus, period, or hyphen.
    if (typeof url !== 'string') {
      return false;
    }

    return /^([a-z][a-z\d+\-.]*:)?\/\//i.test(url);
  }

  /**
   * Creates a new URL by combining the specified URLs
   *
   * @param {string} baseURL The base URL
   * @param {string} relativeURL The relative URL
   *
   * @returns {string} The combined URL
   */
  function combineURLs(baseURL, relativeURL) {
    return relativeURL
      ? baseURL.replace(/\/?\/$/, '') + '/' + relativeURL.replace(/^\/+/, '')
      : baseURL;
  }

  /**
   * Creates a new URL by combining the baseURL with the requestedURL,
   * only when the requestedURL is not already an absolute URL.
   * If the requestURL is absolute, this function returns the requestedURL untouched.
   *
   * @param {string} baseURL The base URL
   * @param {string} requestedURL Absolute or relative URL to combine
   *
   * @returns {string} The combined full path
   */
  function buildFullPath(baseURL, requestedURL, allowAbsoluteUrls) {
    let isRelativeUrl = !isAbsoluteURL(requestedURL);
    if (baseURL && (isRelativeUrl || allowAbsoluteUrls === false)) {
      return combineURLs(baseURL, requestedURL);
    }
    return requestedURL;
  }

  const headersToObject = (thing) => (thing instanceof AxiosHeaders$1 ? { ...thing } : thing);

  /**
   * Config-specific merge-function which creates a new config-object
   * by merging two configuration objects together.
   *
   * @param {Object} config1
   * @param {Object} config2
   *
   * @returns {Object} New object resulting from merging config2 to config1
   */
  function mergeConfig$1(config1, config2) {
    // eslint-disable-next-line no-param-reassign
    config2 = config2 || {};

    // Use a null-prototype object so that downstream reads such as `config.auth`
    // or `config.baseURL` cannot inherit polluted values from Object.prototype.
    // `hasOwnProperty` is restored as a non-enumerable own slot to preserve
    // ergonomics for user code that relies on it.
    const config = Object.create(null);
    Object.defineProperty(config, 'hasOwnProperty', {
      // Null-proto descriptor so a polluted Object.prototype.get cannot turn
      // this data descriptor into an accessor descriptor on the way in.
      __proto__: null,
      value: Object.prototype.hasOwnProperty,
      enumerable: false,
      writable: true,
      configurable: true,
    });

    function getMergedValue(target, source, prop, caseless) {
      if (utils$1.isPlainObject(target) && utils$1.isPlainObject(source)) {
        return utils$1.merge.call({ caseless }, target, source);
      } else if (utils$1.isPlainObject(source)) {
        return utils$1.merge({}, source);
      } else if (utils$1.isArray(source)) {
        return source.slice();
      }
      return source;
    }

    function mergeDeepProperties(a, b, prop, caseless) {
      if (!utils$1.isUndefined(b)) {
        return getMergedValue(a, b, prop, caseless);
      } else if (!utils$1.isUndefined(a)) {
        return getMergedValue(undefined, a, prop, caseless);
      }
    }

    // eslint-disable-next-line consistent-return
    function valueFromConfig2(a, b) {
      if (!utils$1.isUndefined(b)) {
        return getMergedValue(undefined, b);
      }
    }

    // eslint-disable-next-line consistent-return
    function defaultToConfig2(a, b) {
      if (!utils$1.isUndefined(b)) {
        return getMergedValue(undefined, b);
      } else if (!utils$1.isUndefined(a)) {
        return getMergedValue(undefined, a);
      }
    }

    // eslint-disable-next-line consistent-return
    function mergeDirectKeys(a, b, prop) {
      if (utils$1.hasOwnProp(config2, prop)) {
        return getMergedValue(a, b);
      } else if (utils$1.hasOwnProp(config1, prop)) {
        return getMergedValue(undefined, a);
      }
    }

    const mergeMap = {
      url: valueFromConfig2,
      method: valueFromConfig2,
      data: valueFromConfig2,
      baseURL: defaultToConfig2,
      transformRequest: defaultToConfig2,
      transformResponse: defaultToConfig2,
      paramsSerializer: defaultToConfig2,
      timeout: defaultToConfig2,
      timeoutMessage: defaultToConfig2,
      withCredentials: defaultToConfig2,
      withXSRFToken: defaultToConfig2,
      adapter: defaultToConfig2,
      responseType: defaultToConfig2,
      xsrfCookieName: defaultToConfig2,
      xsrfHeaderName: defaultToConfig2,
      onUploadProgress: defaultToConfig2,
      onDownloadProgress: defaultToConfig2,
      decompress: defaultToConfig2,
      maxContentLength: defaultToConfig2,
      maxBodyLength: defaultToConfig2,
      beforeRedirect: defaultToConfig2,
      transport: defaultToConfig2,
      httpAgent: defaultToConfig2,
      httpsAgent: defaultToConfig2,
      cancelToken: defaultToConfig2,
      socketPath: defaultToConfig2,
      allowedSocketPaths: defaultToConfig2,
      responseEncoding: defaultToConfig2,
      validateStatus: mergeDirectKeys,
      headers: (a, b, prop) =>
        mergeDeepProperties(headersToObject(a), headersToObject(b), prop, true),
    };

    utils$1.forEach(Object.keys({ ...config1, ...config2 }), function computeConfigValue(prop) {
      if (prop === '__proto__' || prop === 'constructor' || prop === 'prototype') return;
      const merge = utils$1.hasOwnProp(mergeMap, prop) ? mergeMap[prop] : mergeDeepProperties;
      const a = utils$1.hasOwnProp(config1, prop) ? config1[prop] : undefined;
      const b = utils$1.hasOwnProp(config2, prop) ? config2[prop] : undefined;
      const configValue = merge(a, b, prop);
      (utils$1.isUndefined(configValue) && merge !== mergeDirectKeys) || (config[prop] = configValue);
    });

    return config;
  }

  const FORM_DATA_CONTENT_HEADERS = ['content-type', 'content-length'];

  function setFormDataHeaders(headers, formHeaders, policy) {
    if (policy !== 'content-only') {
      headers.set(formHeaders);
      return;
    }

    Object.entries(formHeaders).forEach(([key, val]) => {
      if (FORM_DATA_CONTENT_HEADERS.includes(key.toLowerCase())) {
        headers.set(key, val);
      }
    });
  }

  /**
   * Encode a UTF-8 string to a Latin-1 byte string for use with btoa().
   * This is a modern replacement for the deprecated unescape(encodeURIComponent(str)) pattern.
   *
   * @param {string} str The string to encode
   *
   * @returns {string} UTF-8 bytes as a Latin-1 string
   */
  const encodeUTF8 = (str) =>
    encodeURIComponent(str).replace(/%([0-9A-F]{2})/gi, (_, hex) =>
      String.fromCharCode(parseInt(hex, 16))
    );

  var resolveConfig = (config) => {
    const newConfig = mergeConfig$1({}, config);

    // Read only own properties to prevent prototype pollution gadgets
    // (e.g. Object.prototype.baseURL = 'https://evil.com').
    const own = (key) => (utils$1.hasOwnProp(newConfig, key) ? newConfig[key] : undefined);

    const data = own('data');
    let withXSRFToken = own('withXSRFToken');
    const xsrfHeaderName = own('xsrfHeaderName');
    const xsrfCookieName = own('xsrfCookieName');
    let headers = own('headers');
    const auth = own('auth');
    const baseURL = own('baseURL');
    const allowAbsoluteUrls = own('allowAbsoluteUrls');
    const url = own('url');

    newConfig.headers = headers = AxiosHeaders$1.from(headers);

    newConfig.url = buildURL(
      buildFullPath(baseURL, url, allowAbsoluteUrls),
      config.params,
      config.paramsSerializer
    );

    // HTTP basic authentication
    if (auth) {
      headers.set(
        'Authorization',
        'Basic ' +
          btoa((auth.username || '') + ':' + (auth.password ? encodeUTF8(auth.password) : ''))
      );
    }

    if (utils$1.isFormData(data)) {
      if (platform.hasStandardBrowserEnv || platform.hasStandardBrowserWebWorkerEnv) {
        headers.setContentType(undefined); // browser handles it
      } else if (utils$1.isFunction(data.getHeaders)) {
        // Node.js FormData (like form-data package)
        setFormDataHeaders(headers, data.getHeaders(), own('formDataHeaderPolicy'));
      }
    }

    // Add xsrf header
    // This is only done if running in a standard browser environment.
    // Specifically not if we're in a web worker, or react-native.

    if (platform.hasStandardBrowserEnv) {
      if (utils$1.isFunction(withXSRFToken)) {
        withXSRFToken = withXSRFToken(newConfig);
      }

      // Strict boolean check — prevents proto-pollution gadgets (e.g. Object.prototype.withXSRFToken = 1)
      // and misconfigurations (e.g. "false") from short-circuiting the same-origin check and leaking
      // the XSRF token cross-origin.
      const shouldSendXSRF =
        withXSRFToken === true || (withXSRFToken == null && isURLSameOrigin(newConfig.url));

      if (shouldSendXSRF) {
        const xsrfValue = xsrfHeaderName && xsrfCookieName && cookies.read(xsrfCookieName);

        if (xsrfValue) {
          headers.set(xsrfHeaderName, xsrfValue);
        }
      }
    }

    return newConfig;
  };

  const isXHRAdapterSupported = typeof XMLHttpRequest !== 'undefined';

  var xhrAdapter = isXHRAdapterSupported &&
    function (config) {
      return new Promise(function dispatchXhrRequest(resolve, reject) {
        const _config = resolveConfig(config);
        let requestData = _config.data;
        const requestHeaders = AxiosHeaders$1.from(_config.headers).normalize();
        let { responseType, onUploadProgress, onDownloadProgress } = _config;
        let onCanceled;
        let uploadThrottled, downloadThrottled;
        let flushUpload, flushDownload;

        function done() {
          flushUpload && flushUpload(); // flush events
          flushDownload && flushDownload(); // flush events

          _config.cancelToken && _config.cancelToken.unsubscribe(onCanceled);

          _config.signal && _config.signal.removeEventListener('abort', onCanceled);
        }

        let request = new XMLHttpRequest();

        request.open(_config.method.toUpperCase(), _config.url, true);

        // Set the request timeout in MS
        request.timeout = _config.timeout;

        function onloadend() {
          if (!request) {
            return;
          }
          // Prepare the response
          const responseHeaders = AxiosHeaders$1.from(
            'getAllResponseHeaders' in request && request.getAllResponseHeaders()
          );
          const responseData =
            !responseType || responseType === 'text' || responseType === 'json'
              ? request.responseText
              : request.response;
          const response = {
            data: responseData,
            status: request.status,
            statusText: request.statusText,
            headers: responseHeaders,
            config,
            request,
          };

          settle(
            function _resolve(value) {
              resolve(value);
              done();
            },
            function _reject(err) {
              reject(err);
              done();
            },
            response
          );

          // Clean up request
          request = null;
        }

        if ('onloadend' in request) {
          // Use onloadend if available
          request.onloadend = onloadend;
        } else {
          // Listen for ready state to emulate onloadend
          request.onreadystatechange = function handleLoad() {
            if (!request || request.readyState !== 4) {
              return;
            }

            // The request errored out and we didn't get a response, this will be
            // handled by onerror instead
            // With one exception: request that using file: protocol, most browsers
            // will return status as 0 even though it's a successful request
            if (
              request.status === 0 &&
              !(request.responseURL && request.responseURL.startsWith('file:'))
            ) {
              return;
            }
            // readystate handler is calling before onerror or ontimeout handlers,
            // so we should call onloadend on the next 'tick'
            setTimeout(onloadend);
          };
        }

        // Handle browser request cancellation (as opposed to a manual cancellation)
        request.onabort = function handleAbort() {
          if (!request) {
            return;
          }

          reject(new AxiosError$1('Request aborted', AxiosError$1.ECONNABORTED, config, request));
          done();

          // Clean up request
          request = null;
        };

        // Handle low level network errors
        request.onerror = function handleError(event) {
          // Browsers deliver a ProgressEvent in XHR onerror
          // (message may be empty; when present, surface it)
          // See https://developer.mozilla.org/docs/Web/API/XMLHttpRequest/error_event
          const msg = event && event.message ? event.message : 'Network Error';
          const err = new AxiosError$1(msg, AxiosError$1.ERR_NETWORK, config, request);
          // attach the underlying event for consumers who want details
          err.event = event || null;
          reject(err);
          done();
          request = null;
        };

        // Handle timeout
        request.ontimeout = function handleTimeout() {
          let timeoutErrorMessage = _config.timeout
            ? 'timeout of ' + _config.timeout + 'ms exceeded'
            : 'timeout exceeded';
          const transitional = _config.transitional || transitionalDefaults;
          if (_config.timeoutErrorMessage) {
            timeoutErrorMessage = _config.timeoutErrorMessage;
          }
          reject(
            new AxiosError$1(
              timeoutErrorMessage,
              transitional.clarifyTimeoutError ? AxiosError$1.ETIMEDOUT : AxiosError$1.ECONNABORTED,
              config,
              request
            )
          );
          done();

          // Clean up request
          request = null;
        };

        // Remove Content-Type if data is undefined
        requestData === undefined && requestHeaders.setContentType(null);

        // Add headers to the request
        if ('setRequestHeader' in request) {
          utils$1.forEach(requestHeaders.toJSON(), function setRequestHeader(val, key) {
            request.setRequestHeader(key, val);
          });
        }

        // Add withCredentials to request if needed
        if (!utils$1.isUndefined(_config.withCredentials)) {
          request.withCredentials = !!_config.withCredentials;
        }

        // Add responseType to request if needed
        if (responseType && responseType !== 'json') {
          request.responseType = _config.responseType;
        }

        // Handle progress if needed
        if (onDownloadProgress) {
          [downloadThrottled, flushDownload] = progressEventReducer(onDownloadProgress, true);
          request.addEventListener('progress', downloadThrottled);
        }

        // Not all browsers support upload events
        if (onUploadProgress && request.upload) {
          [uploadThrottled, flushUpload] = progressEventReducer(onUploadProgress);

          request.upload.addEventListener('progress', uploadThrottled);

          request.upload.addEventListener('loadend', flushUpload);
        }

        if (_config.cancelToken || _config.signal) {
          // Handle cancellation
          // eslint-disable-next-line func-names
          onCanceled = (cancel) => {
            if (!request) {
              return;
            }
            reject(!cancel || cancel.type ? new CanceledError$1(null, config, request) : cancel);
            request.abort();
            done();
            request = null;
          };

          _config.cancelToken && _config.cancelToken.subscribe(onCanceled);
          if (_config.signal) {
            _config.signal.aborted
              ? onCanceled()
              : _config.signal.addEventListener('abort', onCanceled);
          }
        }

        const protocol = parseProtocol(_config.url);

        if (protocol && !platform.protocols.includes(protocol)) {
          reject(
            new AxiosError$1(
              'Unsupported protocol ' + protocol + ':',
              AxiosError$1.ERR_BAD_REQUEST,
              config
            )
          );
          return;
        }

        // Send the request
        request.send(requestData || null);
      });
    };

  const composeSignals = (signals, timeout) => {
    const { length } = (signals = signals ? signals.filter(Boolean) : []);

    if (timeout || length) {
      let controller = new AbortController();

      let aborted;

      const onabort = function (reason) {
        if (!aborted) {
          aborted = true;
          unsubscribe();
          const err = reason instanceof Error ? reason : this.reason;
          controller.abort(
            err instanceof AxiosError$1
              ? err
              : new CanceledError$1(err instanceof Error ? err.message : err)
          );
        }
      };

      let timer =
        timeout &&
        setTimeout(() => {
          timer = null;
          onabort(new AxiosError$1(`timeout of ${timeout}ms exceeded`, AxiosError$1.ETIMEDOUT));
        }, timeout);

      const unsubscribe = () => {
        if (signals) {
          timer && clearTimeout(timer);
          timer = null;
          signals.forEach((signal) => {
            signal.unsubscribe
              ? signal.unsubscribe(onabort)
              : signal.removeEventListener('abort', onabort);
          });
          signals = null;
        }
      };

      signals.forEach((signal) => signal.addEventListener('abort', onabort));

      const { signal } = controller;

      signal.unsubscribe = () => utils$1.asap(unsubscribe);

      return signal;
    }
  };

  const streamChunk = function* (chunk, chunkSize) {
    let len = chunk.byteLength;

    if (len < chunkSize) {
      yield chunk;
      return;
    }

    let pos = 0;
    let end;

    while (pos < len) {
      end = pos + chunkSize;
      yield chunk.slice(pos, end);
      pos = end;
    }
  };

  const readBytes = async function* (iterable, chunkSize) {
    for await (const chunk of readStream(iterable)) {
      yield* streamChunk(chunk, chunkSize);
    }
  };

  const readStream = async function* (stream) {
    if (stream[Symbol.asyncIterator]) {
      yield* stream;
      return;
    }

    const reader = stream.getReader();
    try {
      for (;;) {
        const { done, value } = await reader.read();
        if (done) {
          break;
        }
        yield value;
      }
    } finally {
      await reader.cancel();
    }
  };

  const trackStream = (stream, chunkSize, onProgress, onFinish) => {
    const iterator = readBytes(stream, chunkSize);

    let bytes = 0;
    let done;
    let _onFinish = (e) => {
      if (!done) {
        done = true;
        onFinish && onFinish(e);
      }
    };

    return new ReadableStream(
      {
        async pull(controller) {
          try {
            const { done, value } = await iterator.next();

            if (done) {
              _onFinish();
              controller.close();
              return;
            }

            let len = value.byteLength;
            if (onProgress) {
              let loadedBytes = (bytes += len);
              onProgress(loadedBytes);
            }
            controller.enqueue(new Uint8Array(value));
          } catch (err) {
            _onFinish(err);
            throw err;
          }
        },
        cancel(reason) {
          _onFinish(reason);
          return iterator.return();
        },
      },
      {
        highWaterMark: 2,
      }
    );
  };

  /**
   * Estimate decoded byte length of a data:// URL *without* allocating large buffers.
   * - For base64: compute exact decoded size using length and padding;
   *               handle %XX at the character-count level (no string allocation).
   * - For non-base64: use UTF-8 byteLength of the encoded body as a safe upper bound.
   *
   * @param {string} url
   * @returns {number}
   */
  function estimateDataURLDecodedBytes(url) {
    if (!url || typeof url !== 'string') return 0;
    if (!url.startsWith('data:')) return 0;

    const comma = url.indexOf(',');
    if (comma < 0) return 0;

    const meta = url.slice(5, comma);
    const body = url.slice(comma + 1);
    const isBase64 = /;base64/i.test(meta);

    if (isBase64) {
      let effectiveLen = body.length;
      const len = body.length; // cache length

      for (let i = 0; i < len; i++) {
        if (body.charCodeAt(i) === 37 /* '%' */ && i + 2 < len) {
          const a = body.charCodeAt(i + 1);
          const b = body.charCodeAt(i + 2);
          const isHex =
            ((a >= 48 && a <= 57) || (a >= 65 && a <= 70) || (a >= 97 && a <= 102)) &&
            ((b >= 48 && b <= 57) || (b >= 65 && b <= 70) || (b >= 97 && b <= 102));

          if (isHex) {
            effectiveLen -= 2;
            i += 2;
          }
        }
      }

      let pad = 0;
      let idx = len - 1;

      const tailIsPct3D = (j) =>
        j >= 2 &&
        body.charCodeAt(j - 2) === 37 && // '%'
        body.charCodeAt(j - 1) === 51 && // '3'
        (body.charCodeAt(j) === 68 || body.charCodeAt(j) === 100); // 'D' or 'd'

      if (idx >= 0) {
        if (body.charCodeAt(idx) === 61 /* '=' */) {
          pad++;
          idx--;
        } else if (tailIsPct3D(idx)) {
          pad++;
          idx -= 3;
        }
      }

      if (pad === 1 && idx >= 0) {
        if (body.charCodeAt(idx) === 61 /* '=' */) {
          pad++;
        } else if (tailIsPct3D(idx)) {
          pad++;
        }
      }

      const groups = Math.floor(effectiveLen / 4);
      const bytes = groups * 3 - (pad || 0);
      return bytes > 0 ? bytes : 0;
    }

    if (typeof Buffer !== 'undefined' && typeof Buffer.byteLength === 'function') {
      return Buffer.byteLength(body, 'utf8');
    }

    // Compute UTF-8 byte length directly from UTF-16 code units without allocating
    // a byte buffer (TextEncoder.encode would defeat the DoS guard on large bodies).
    // Using body.length here would undercount non-ASCII (e.g. '€' is 1 code unit
    // but 3 UTF-8 bytes).
    let bytes = 0;
    for (let i = 0, len = body.length; i < len; i++) {
      const c = body.charCodeAt(i);
      if (c < 0x80) {
        bytes += 1;
      } else if (c < 0x800) {
        bytes += 2;
      } else if (c >= 0xd800 && c <= 0xdbff && i + 1 < len) {
        const next = body.charCodeAt(i + 1);
        if (next >= 0xdc00 && next <= 0xdfff) {
          bytes += 4;
          i++;
        } else {
          bytes += 3;
        }
      } else {
        bytes += 3;
      }
    }
    return bytes;
  }

  const VERSION$1 = "1.16.0";

  const DEFAULT_CHUNK_SIZE = 64 * 1024;

  const { isFunction } = utils$1;

  const test = (fn, ...args) => {
    try {
      return !!fn(...args);
    } catch (e) {
      return false;
    }
  };

  const factory = (env) => {
    const globalObject = utils$1.global ?? globalThis;
    const { ReadableStream, TextEncoder } = globalObject;

    env = utils$1.merge.call(
      {
        skipUndefined: true,
      },
      {
        Request: globalObject.Request,
        Response: globalObject.Response,
      },
      env
    );

    const { fetch: envFetch, Request, Response } = env;
    const isFetchSupported = envFetch ? isFunction(envFetch) : typeof fetch === 'function';
    const isRequestSupported = isFunction(Request);
    const isResponseSupported = isFunction(Response);

    if (!isFetchSupported) {
      return false;
    }

    const isReadableStreamSupported = isFetchSupported && isFunction(ReadableStream);

    const encodeText =
      isFetchSupported &&
      (typeof TextEncoder === 'function'
        ? (
            (encoder) => (str) =>
              encoder.encode(str)
          )(new TextEncoder())
        : async (str) => new Uint8Array(await new Request(str).arrayBuffer()));

    const supportsRequestStream =
      isRequestSupported &&
      isReadableStreamSupported &&
      test(() => {
        let duplexAccessed = false;

        const request = new Request(platform.origin, {
          body: new ReadableStream(),
          method: 'POST',
          get duplex() {
            duplexAccessed = true;
            return 'half';
          },
        });

        const hasContentType = request.headers.has('Content-Type');

        if (request.body != null) {
          request.body.cancel();
        }

        return duplexAccessed && !hasContentType;
      });

    const supportsResponseStream =
      isResponseSupported &&
      isReadableStreamSupported &&
      test(() => utils$1.isReadableStream(new Response('').body));

    const resolvers = {
      stream: supportsResponseStream && ((res) => res.body),
    };

    isFetchSupported &&
      (() => {
        ['text', 'arrayBuffer', 'blob', 'formData', 'stream'].forEach((type) => {
          !resolvers[type] &&
            (resolvers[type] = (res, config) => {
              let method = res && res[type];

              if (method) {
                return method.call(res);
              }

              throw new AxiosError$1(
                `Response type '${type}' is not supported`,
                AxiosError$1.ERR_NOT_SUPPORT,
                config
              );
            });
        });
      })();

    const getBodyLength = async (body) => {
      if (body == null) {
        return 0;
      }

      if (utils$1.isBlob(body)) {
        return body.size;
      }

      if (utils$1.isSpecCompliantForm(body)) {
        const _request = new Request(platform.origin, {
          method: 'POST',
          body,
        });
        return (await _request.arrayBuffer()).byteLength;
      }

      if (utils$1.isArrayBufferView(body) || utils$1.isArrayBuffer(body)) {
        return body.byteLength;
      }

      if (utils$1.isURLSearchParams(body)) {
        body = body + '';
      }

      if (utils$1.isString(body)) {
        return (await encodeText(body)).byteLength;
      }
    };

    const resolveBodyLength = async (headers, body) => {
      const length = utils$1.toFiniteNumber(headers.getContentLength());

      return length == null ? getBodyLength(body) : length;
    };

    return async (config) => {
      let {
        url,
        method,
        data,
        signal,
        cancelToken,
        timeout,
        onDownloadProgress,
        onUploadProgress,
        responseType,
        headers,
        withCredentials = 'same-origin',
        fetchOptions,
        maxContentLength,
        maxBodyLength,
      } = resolveConfig(config);

      const hasMaxContentLength = utils$1.isNumber(maxContentLength) && maxContentLength > -1;
      const hasMaxBodyLength = utils$1.isNumber(maxBodyLength) && maxBodyLength > -1;

      let _fetch = envFetch || fetch;

      responseType = responseType ? (responseType + '').toLowerCase() : 'text';

      let composedSignal = composeSignals(
        [signal, cancelToken && cancelToken.toAbortSignal()],
        timeout
      );

      let request = null;

      const unsubscribe =
        composedSignal &&
        composedSignal.unsubscribe &&
        (() => {
          composedSignal.unsubscribe();
        });

      let requestContentLength;

      try {
        // Enforce maxContentLength for data: URLs up-front so we never materialize
        // an oversized payload. The HTTP adapter applies the same check (see http.js
        // "if (protocol === 'data:')" branch).
        if (hasMaxContentLength && typeof url === 'string' && url.startsWith('data:')) {
          const estimated = estimateDataURLDecodedBytes(url);
          if (estimated > maxContentLength) {
            throw new AxiosError$1(
              'maxContentLength size of ' + maxContentLength + ' exceeded',
              AxiosError$1.ERR_BAD_RESPONSE,
              config,
              request
            );
          }
        }

        // Enforce maxBodyLength against the outbound request body before dispatch.
        // Mirrors http.js behavior (ERR_BAD_REQUEST / 'Request body larger than
        // maxBodyLength limit'). Skip when the body length cannot be determined
        // (e.g. a live ReadableStream supplied by the caller).
        if (hasMaxBodyLength && method !== 'get' && method !== 'head') {
          const outboundLength = await resolveBodyLength(headers, data);
          if (
            typeof outboundLength === 'number' &&
            isFinite(outboundLength) &&
            outboundLength > maxBodyLength
          ) {
            throw new AxiosError$1(
              'Request body larger than maxBodyLength limit',
              AxiosError$1.ERR_BAD_REQUEST,
              config,
              request
            );
          }
        }

        if (
          onUploadProgress &&
          supportsRequestStream &&
          method !== 'get' &&
          method !== 'head' &&
          (requestContentLength = await resolveBodyLength(headers, data)) !== 0
        ) {
          let _request = new Request(url, {
            method: 'POST',
            body: data,
            duplex: 'half',
          });

          let contentTypeHeader;

          if (utils$1.isFormData(data) && (contentTypeHeader = _request.headers.get('content-type'))) {
            headers.setContentType(contentTypeHeader);
          }

          if (_request.body) {
            const [onProgress, flush] = progressEventDecorator(
              requestContentLength,
              progressEventReducer(asyncDecorator(onUploadProgress))
            );

            data = trackStream(_request.body, DEFAULT_CHUNK_SIZE, onProgress, flush);
          }
        }

        if (!utils$1.isString(withCredentials)) {
          withCredentials = withCredentials ? 'include' : 'omit';
        }

        // Cloudflare Workers throws when credentials are defined
        // see https://github.com/cloudflare/workerd/issues/902
        const isCredentialsSupported = isRequestSupported && 'credentials' in Request.prototype;

        // If data is FormData and Content-Type is multipart/form-data without boundary,
        // delete it so fetch can set it correctly with the boundary
        if (utils$1.isFormData(data)) {
          const contentType = headers.getContentType();
          if (
            contentType &&
            /^multipart\/form-data/i.test(contentType) &&
            !/boundary=/i.test(contentType)
          ) {
            headers.delete('content-type');
          }
        }

        // Set User-Agent header if not already set (fetch defaults to 'node' in Node.js)
        headers.set('User-Agent', 'axios/' + VERSION$1, false);

        const resolvedOptions = {
          ...fetchOptions,
          signal: composedSignal,
          method: method.toUpperCase(),
          headers: headers.normalize().toJSON(),
          body: data,
          duplex: 'half',
          credentials: isCredentialsSupported ? withCredentials : undefined,
        };

        request = isRequestSupported && new Request(url, resolvedOptions);

        let response = await (isRequestSupported
          ? _fetch(request, fetchOptions)
          : _fetch(url, resolvedOptions));

        // Cheap pre-check: if the server honestly declares a content-length that
        // already exceeds the cap, reject before we start streaming.
        if (hasMaxContentLength) {
          const declaredLength = utils$1.toFiniteNumber(response.headers.get('content-length'));
          if (declaredLength != null && declaredLength > maxContentLength) {
            throw new AxiosError$1(
              'maxContentLength size of ' + maxContentLength + ' exceeded',
              AxiosError$1.ERR_BAD_RESPONSE,
              config,
              request
            );
          }
        }

        const isStreamResponse =
          supportsResponseStream && (responseType === 'stream' || responseType === 'response');

        if (
          supportsResponseStream &&
          response.body &&
          (onDownloadProgress || hasMaxContentLength || (isStreamResponse && unsubscribe))
        ) {
          const options = {};

          ['status', 'statusText', 'headers'].forEach((prop) => {
            options[prop] = response[prop];
          });

          const responseContentLength = utils$1.toFiniteNumber(response.headers.get('content-length'));

          const [onProgress, flush] =
            (onDownloadProgress &&
              progressEventDecorator(
                responseContentLength,
                progressEventReducer(asyncDecorator(onDownloadProgress), true)
              )) ||
            [];

          let bytesRead = 0;
          const onChunkProgress = (loadedBytes) => {
            if (hasMaxContentLength) {
              bytesRead = loadedBytes;
              if (bytesRead > maxContentLength) {
                throw new AxiosError$1(
                  'maxContentLength size of ' + maxContentLength + ' exceeded',
                  AxiosError$1.ERR_BAD_RESPONSE,
                  config,
                  request
                );
              }
            }
            onProgress && onProgress(loadedBytes);
          };

          response = new Response(
            trackStream(response.body, DEFAULT_CHUNK_SIZE, onChunkProgress, () => {
              flush && flush();
              unsubscribe && unsubscribe();
            }),
            options
          );
        }

        responseType = responseType || 'text';

        let responseData = await resolvers[utils$1.findKey(resolvers, responseType) || 'text'](
          response,
          config
        );

        // Fallback enforcement for environments without ReadableStream support
        // (legacy runtimes). Detect materialized size from typed output; skip
        // streams/Response passthrough since the user will read those themselves.
        if (hasMaxContentLength && !supportsResponseStream && !isStreamResponse) {
          let materializedSize;
          if (responseData != null) {
            if (typeof responseData.byteLength === 'number') {
              materializedSize = responseData.byteLength;
            } else if (typeof responseData.size === 'number') {
              materializedSize = responseData.size;
            } else if (typeof responseData === 'string') {
              materializedSize =
                typeof TextEncoder === 'function'
                  ? new TextEncoder().encode(responseData).byteLength
                  : responseData.length;
            }
          }
          if (typeof materializedSize === 'number' && materializedSize > maxContentLength) {
            throw new AxiosError$1(
              'maxContentLength size of ' + maxContentLength + ' exceeded',
              AxiosError$1.ERR_BAD_RESPONSE,
              config,
              request
            );
          }
        }

        !isStreamResponse && unsubscribe && unsubscribe();

        return await new Promise((resolve, reject) => {
          settle(resolve, reject, {
            data: responseData,
            headers: AxiosHeaders$1.from(response.headers),
            status: response.status,
            statusText: response.statusText,
            config,
            request,
          });
        });
      } catch (err) {
        unsubscribe && unsubscribe();

        // Safari can surface fetch aborts as a DOMException-like object whose
        // branded getters throw. Prefer our composed signal reason before reading
        // the caught error, preserving timeout vs cancellation semantics.
        if (composedSignal && composedSignal.aborted && composedSignal.reason instanceof AxiosError$1) {
          const canceledError = composedSignal.reason;
          canceledError.config = config;
          request && (canceledError.request = request);
          err !== canceledError && (canceledError.cause = err);
          throw canceledError;
        }

        if (err && err.name === 'TypeError' && /Load failed|fetch/i.test(err.message)) {
          throw Object.assign(
            new AxiosError$1(
              'Network Error',
              AxiosError$1.ERR_NETWORK,
              config,
              request,
              err && err.response
            ),
            {
              cause: err.cause || err,
            }
          );
        }

        throw AxiosError$1.from(err, err && err.code, config, request, err && err.response);
      }
    };
  };

  const seedCache = new Map();

  const getFetch = (config) => {
    let env = (config && config.env) || {};
    const { fetch, Request, Response } = env;
    const seeds = [Request, Response, fetch];

    let len = seeds.length,
      i = len,
      seed,
      target,
      map = seedCache;

    while (i--) {
      seed = seeds[i];
      target = map.get(seed);

      target === undefined && map.set(seed, (target = i ? new Map() : factory(env)));

      map = target;
    }

    return target;
  };

  getFetch();

  /**
   * Known adapters mapping.
   * Provides environment-specific adapters for Axios:
   * - `http` for Node.js
   * - `xhr` for browsers
   * - `fetch` for fetch API-based requests
   *
   * @type {Object<string, Function|Object>}
   */
  const knownAdapters = {
    http: httpAdapter,
    xhr: xhrAdapter,
    fetch: {
      get: getFetch,
    },
  };

  // Assign adapter names for easier debugging and identification
  utils$1.forEach(knownAdapters, (fn, value) => {
    if (fn) {
      try {
        // Null-proto descriptors so a polluted Object.prototype.get cannot turn
        // these data descriptors into accessor descriptors on the way in.
        Object.defineProperty(fn, 'name', { __proto__: null, value });
      } catch (e) {
        // eslint-disable-next-line no-empty
      }
      Object.defineProperty(fn, 'adapterName', { __proto__: null, value });
    }
  });

  /**
   * Render a rejection reason string for unknown or unsupported adapters
   *
   * @param {string} reason
   * @returns {string}
   */
  const renderReason = (reason) => `- ${reason}`;

  /**
   * Check if the adapter is resolved (function, null, or false)
   *
   * @param {Function|null|false} adapter
   * @returns {boolean}
   */
  const isResolvedHandle = (adapter) =>
    utils$1.isFunction(adapter) || adapter === null || adapter === false;

  /**
   * Get the first suitable adapter from the provided list.
   * Tries each adapter in order until a supported one is found.
   * Throws an AxiosError if no adapter is suitable.
   *
   * @param {Array<string|Function>|string|Function} adapters - Adapter(s) by name or function.
   * @param {Object} config - Axios request configuration
   * @throws {AxiosError} If no suitable adapter is available
   * @returns {Function} The resolved adapter function
   */
  function getAdapter$1(adapters, config) {
    adapters = utils$1.isArray(adapters) ? adapters : [adapters];

    const { length } = adapters;
    let nameOrAdapter;
    let adapter;

    const rejectedReasons = {};

    for (let i = 0; i < length; i++) {
      nameOrAdapter = adapters[i];
      let id;

      adapter = nameOrAdapter;

      if (!isResolvedHandle(nameOrAdapter)) {
        adapter = knownAdapters[(id = String(nameOrAdapter)).toLowerCase()];

        if (adapter === undefined) {
          throw new AxiosError$1(`Unknown adapter '${id}'`);
        }
      }

      if (adapter && (utils$1.isFunction(adapter) || (adapter = adapter.get(config)))) {
        break;
      }

      rejectedReasons[id || '#' + i] = adapter;
    }

    if (!adapter) {
      const reasons = Object.entries(rejectedReasons).map(
        ([id, state]) =>
          `adapter ${id} ` +
          (state === false ? 'is not supported by the environment' : 'is not available in the build')
      );

      let s = length
        ? reasons.length > 1
          ? 'since :\n' + reasons.map(renderReason).join('\n')
          : ' ' + renderReason(reasons[0])
        : 'as no adapter specified';

      throw new AxiosError$1(
        `There is no suitable adapter to dispatch the request ` + s,
        'ERR_NOT_SUPPORT'
      );
    }

    return adapter;
  }

  /**
   * Exports Axios adapters and utility to resolve an adapter
   */
  var adapters = {
    /**
     * Resolve an adapter from a list of adapter names or functions.
     * @type {Function}
     */
    getAdapter: getAdapter$1,

    /**
     * Exposes all known adapters
     * @type {Object<string, Function|Object>}
     */
    adapters: knownAdapters,
  };

  /**
   * Throws a `CanceledError` if cancellation has been requested.
   *
   * @param {Object} config The config that is to be used for the request
   *
   * @returns {void}
   */
  function throwIfCancellationRequested(config) {
    if (config.cancelToken) {
      config.cancelToken.throwIfRequested();
    }

    if (config.signal && config.signal.aborted) {
      throw new CanceledError$1(null, config);
    }
  }

  /**
   * Dispatch a request to the server using the configured adapter.
   *
   * @param {object} config The config that is to be used for the request
   *
   * @returns {Promise} The Promise to be fulfilled
   */
  function dispatchRequest(config) {
    throwIfCancellationRequested(config);

    config.headers = AxiosHeaders$1.from(config.headers);

    // Transform request data
    config.data = transformData.call(config, config.transformRequest);

    if (['post', 'put', 'patch'].indexOf(config.method) !== -1) {
      config.headers.setContentType('application/x-www-form-urlencoded', false);
    }

    const adapter = adapters.getAdapter(config.adapter || defaults.adapter, config);

    return adapter(config).then(
      function onAdapterResolution(response) {
        throwIfCancellationRequested(config);

        // Expose the current response on config so that transformResponse can
        // attach it to any AxiosError it throws (e.g. on JSON parse failure).
        // We clean it up afterwards to avoid polluting the config object.
        config.response = response;
        try {
          response.data = transformData.call(config, config.transformResponse, response);
        } finally {
          delete config.response;
        }

        response.headers = AxiosHeaders$1.from(response.headers);

        return response;
      },
      function onAdapterRejection(reason) {
        if (!isCancel$1(reason)) {
          throwIfCancellationRequested(config);

          // Transform response data
          if (reason && reason.response) {
            config.response = reason.response;
            try {
              reason.response.data = transformData.call(
                config,
                config.transformResponse,
                reason.response
              );
            } finally {
              delete config.response;
            }
            reason.response.headers = AxiosHeaders$1.from(reason.response.headers);
          }
        }

        return Promise.reject(reason);
      }
    );
  }

  const validators$1 = {};

  // eslint-disable-next-line func-names
  ['object', 'boolean', 'number', 'function', 'string', 'symbol'].forEach((type, i) => {
    validators$1[type] = function validator(thing) {
      return typeof thing === type || 'a' + (i < 1 ? 'n ' : ' ') + type;
    };
  });

  const deprecatedWarnings = {};

  /**
   * Transitional option validator
   *
   * @param {function|boolean?} validator - set to false if the transitional option has been removed
   * @param {string?} version - deprecated version / removed since version
   * @param {string?} message - some message with additional info
   *
   * @returns {function}
   */
  validators$1.transitional = function transitional(validator, version, message) {
    function formatMessage(opt, desc) {
      return (
        '[Axios v' +
        VERSION$1 +
        "] Transitional option '" +
        opt +
        "'" +
        desc +
        (message ? '. ' + message : '')
      );
    }

    // eslint-disable-next-line func-names
    return (value, opt, opts) => {
      if (validator === false) {
        throw new AxiosError$1(
          formatMessage(opt, ' has been removed' + (version ? ' in ' + version : '')),
          AxiosError$1.ERR_DEPRECATED
        );
      }

      if (version && !deprecatedWarnings[opt]) {
        deprecatedWarnings[opt] = true;
        // eslint-disable-next-line no-console
        console.warn(
          formatMessage(
            opt,
            ' has been deprecated since v' + version + ' and will be removed in the near future'
          )
        );
      }

      return validator ? validator(value, opt, opts) : true;
    };
  };

  validators$1.spelling = function spelling(correctSpelling) {
    return (value, opt) => {
      // eslint-disable-next-line no-console
      console.warn(`${opt} is likely a misspelling of ${correctSpelling}`);
      return true;
    };
  };

  /**
   * Assert object's properties type
   *
   * @param {object} options
   * @param {object} schema
   * @param {boolean?} allowUnknown
   *
   * @returns {object}
   */

  function assertOptions(options, schema, allowUnknown) {
    if (typeof options !== 'object') {
      throw new AxiosError$1('options must be an object', AxiosError$1.ERR_BAD_OPTION_VALUE);
    }
    const keys = Object.keys(options);
    let i = keys.length;
    while (i-- > 0) {
      const opt = keys[i];
      // Use hasOwnProperty so a polluted Object.prototype.<opt> cannot supply
      // a non-function validator and cause a TypeError.
      const validator = Object.prototype.hasOwnProperty.call(schema, opt) ? schema[opt] : undefined;
      if (validator) {
        const value = options[opt];
        const result = value === undefined || validator(value, opt, options);
        if (result !== true) {
          throw new AxiosError$1(
            'option ' + opt + ' must be ' + result,
            AxiosError$1.ERR_BAD_OPTION_VALUE
          );
        }
        continue;
      }
      if (allowUnknown !== true) {
        throw new AxiosError$1('Unknown option ' + opt, AxiosError$1.ERR_BAD_OPTION);
      }
    }
  }

  var validator = {
    assertOptions,
    validators: validators$1,
  };

  const validators = validator.validators;

  /**
   * Create a new instance of Axios
   *
   * @param {Object} instanceConfig The default config for the instance
   *
   * @return {Axios} A new instance of Axios
   */
  let Axios$1 = class Axios {
    constructor(instanceConfig) {
      this.defaults = instanceConfig || {};
      this.interceptors = {
        request: new InterceptorManager(),
        response: new InterceptorManager(),
      };
    }

    /**
     * Dispatch a request
     *
     * @param {String|Object} configOrUrl The config specific for this request (merged with this.defaults)
     * @param {?Object} config
     *
     * @returns {Promise} The Promise to be fulfilled
     */
    async request(configOrUrl, config) {
      try {
        return await this._request(configOrUrl, config);
      } catch (err) {
        if (err instanceof Error) {
          let dummy = {};

          Error.captureStackTrace ? Error.captureStackTrace(dummy) : (dummy = new Error());

          // slice off the Error: ... line
          const stack = (() => {
            if (!dummy.stack) {
              return '';
            }

            const firstNewlineIndex = dummy.stack.indexOf('\n');

            return firstNewlineIndex === -1 ? '' : dummy.stack.slice(firstNewlineIndex + 1);
          })();
          try {
            if (!err.stack) {
              err.stack = stack;
              // match without the 2 top stack lines
            } else if (stack) {
              const firstNewlineIndex = stack.indexOf('\n');
              const secondNewlineIndex =
                firstNewlineIndex === -1 ? -1 : stack.indexOf('\n', firstNewlineIndex + 1);
              const stackWithoutTwoTopLines =
                secondNewlineIndex === -1 ? '' : stack.slice(secondNewlineIndex + 1);

              if (!String(err.stack).endsWith(stackWithoutTwoTopLines)) {
                err.stack += '\n' + stack;
              }
            }
          } catch (e) {
            // ignore the case where "stack" is an un-writable property
          }
        }

        throw err;
      }
    }

    _request(configOrUrl, config) {
      /*eslint no-param-reassign:0*/
      // Allow for axios('example/url'[, config]) a la fetch API
      if (typeof configOrUrl === 'string') {
        config = config || {};
        config.url = configOrUrl;
      } else {
        config = configOrUrl || {};
      }

      config = mergeConfig$1(this.defaults, config);

      const { transitional, paramsSerializer, headers } = config;

      if (transitional !== undefined) {
        validator.assertOptions(
          transitional,
          {
            silentJSONParsing: validators.transitional(validators.boolean),
            forcedJSONParsing: validators.transitional(validators.boolean),
            clarifyTimeoutError: validators.transitional(validators.boolean),
            legacyInterceptorReqResOrdering: validators.transitional(validators.boolean),
          },
          false
        );
      }

      if (paramsSerializer != null) {
        if (utils$1.isFunction(paramsSerializer)) {
          config.paramsSerializer = {
            serialize: paramsSerializer,
          };
        } else {
          validator.assertOptions(
            paramsSerializer,
            {
              encode: validators.function,
              serialize: validators.function,
            },
            true
          );
        }
      }

      // Set config.allowAbsoluteUrls
      if (config.allowAbsoluteUrls !== undefined) ; else if (this.defaults.allowAbsoluteUrls !== undefined) {
        config.allowAbsoluteUrls = this.defaults.allowAbsoluteUrls;
      } else {
        config.allowAbsoluteUrls = true;
      }

      validator.assertOptions(
        config,
        {
          baseUrl: validators.spelling('baseURL'),
          withXsrfToken: validators.spelling('withXSRFToken'),
        },
        true
      );

      // Set config.method
      config.method = (config.method || this.defaults.method || 'get').toLowerCase();

      // Flatten headers
      let contextHeaders = headers && utils$1.merge(headers.common, headers[config.method]);

      headers &&
        utils$1.forEach(['delete', 'get', 'head', 'post', 'put', 'patch', 'query', 'common'], (method) => {
          delete headers[method];
        });

      config.headers = AxiosHeaders$1.concat(contextHeaders, headers);

      // filter out skipped interceptors
      const requestInterceptorChain = [];
      let synchronousRequestInterceptors = true;
      this.interceptors.request.forEach(function unshiftRequestInterceptors(interceptor) {
        if (typeof interceptor.runWhen === 'function' && interceptor.runWhen(config) === false) {
          return;
        }

        synchronousRequestInterceptors = synchronousRequestInterceptors && interceptor.synchronous;

        const transitional = config.transitional || transitionalDefaults;
        const legacyInterceptorReqResOrdering =
          transitional && transitional.legacyInterceptorReqResOrdering;

        if (legacyInterceptorReqResOrdering) {
          requestInterceptorChain.unshift(interceptor.fulfilled, interceptor.rejected);
        } else {
          requestInterceptorChain.push(interceptor.fulfilled, interceptor.rejected);
        }
      });

      const responseInterceptorChain = [];
      this.interceptors.response.forEach(function pushResponseInterceptors(interceptor) {
        responseInterceptorChain.push(interceptor.fulfilled, interceptor.rejected);
      });

      let promise;
      let i = 0;
      let len;

      if (!synchronousRequestInterceptors) {
        const chain = [dispatchRequest.bind(this), undefined];
        chain.unshift(...requestInterceptorChain);
        chain.push(...responseInterceptorChain);
        len = chain.length;

        promise = Promise.resolve(config);

        while (i < len) {
          promise = promise.then(chain[i++], chain[i++]);
        }

        return promise;
      }

      len = requestInterceptorChain.length;

      let newConfig = config;

      while (i < len) {
        const onFulfilled = requestInterceptorChain[i++];
        const onRejected = requestInterceptorChain[i++];
        try {
          newConfig = onFulfilled(newConfig);
        } catch (error) {
          onRejected.call(this, error);
          break;
        }
      }

      try {
        promise = dispatchRequest.call(this, newConfig);
      } catch (error) {
        return Promise.reject(error);
      }

      i = 0;
      len = responseInterceptorChain.length;

      while (i < len) {
        promise = promise.then(responseInterceptorChain[i++], responseInterceptorChain[i++]);
      }

      return promise;
    }

    getUri(config) {
      config = mergeConfig$1(this.defaults, config);
      const fullPath = buildFullPath(config.baseURL, config.url, config.allowAbsoluteUrls);
      return buildURL(fullPath, config.params, config.paramsSerializer);
    }
  };

  // Provide aliases for supported request methods
  utils$1.forEach(['delete', 'get', 'head', 'options'], function forEachMethodNoData(method) {
    /*eslint func-names:0*/
    Axios$1.prototype[method] = function (url, config) {
      return this.request(
        mergeConfig$1(config || {}, {
          method,
          url,
          data: (config || {}).data,
        })
      );
    };
  });

  utils$1.forEach(['post', 'put', 'patch', 'query'], function forEachMethodWithData(method) {
    function generateHTTPMethod(isForm) {
      return function httpMethod(url, data, config) {
        return this.request(
          mergeConfig$1(config || {}, {
            method,
            headers: isForm
              ? {
                  'Content-Type': 'multipart/form-data',
                }
              : {},
            url,
            data,
          })
        );
      };
    }

    Axios$1.prototype[method] = generateHTTPMethod();

    // QUERY is a safe/idempotent read method; multipart form bodies don't fit
    // its semantics, so no queryForm shorthand is generated.
    if (method !== 'query') {
      Axios$1.prototype[method + 'Form'] = generateHTTPMethod(true);
    }
  });

  /**
   * A `CancelToken` is an object that can be used to request cancellation of an operation.
   *
   * @param {Function} executor The executor function.
   *
   * @returns {CancelToken}
   */
  let CancelToken$1 = class CancelToken {
    constructor(executor) {
      if (typeof executor !== 'function') {
        throw new TypeError('executor must be a function.');
      }

      let resolvePromise;

      this.promise = new Promise(function promiseExecutor(resolve) {
        resolvePromise = resolve;
      });

      const token = this;

      // eslint-disable-next-line func-names
      this.promise.then((cancel) => {
        if (!token._listeners) return;

        let i = token._listeners.length;

        while (i-- > 0) {
          token._listeners[i](cancel);
        }
        token._listeners = null;
      });

      // eslint-disable-next-line func-names
      this.promise.then = (onfulfilled) => {
        let _resolve;
        // eslint-disable-next-line func-names
        const promise = new Promise((resolve) => {
          token.subscribe(resolve);
          _resolve = resolve;
        }).then(onfulfilled);

        promise.cancel = function reject() {
          token.unsubscribe(_resolve);
        };

        return promise;
      };

      executor(function cancel(message, config, request) {
        if (token.reason) {
          // Cancellation has already been requested
          return;
        }

        token.reason = new CanceledError$1(message, config, request);
        resolvePromise(token.reason);
      });
    }

    /**
     * Throws a `CanceledError` if cancellation has been requested.
     */
    throwIfRequested() {
      if (this.reason) {
        throw this.reason;
      }
    }

    /**
     * Subscribe to the cancel signal
     */

    subscribe(listener) {
      if (this.reason) {
        listener(this.reason);
        return;
      }

      if (this._listeners) {
        this._listeners.push(listener);
      } else {
        this._listeners = [listener];
      }
    }

    /**
     * Unsubscribe from the cancel signal
     */

    unsubscribe(listener) {
      if (!this._listeners) {
        return;
      }
      const index = this._listeners.indexOf(listener);
      if (index !== -1) {
        this._listeners.splice(index, 1);
      }
    }

    toAbortSignal() {
      const controller = new AbortController();

      const abort = (err) => {
        controller.abort(err);
      };

      this.subscribe(abort);

      controller.signal.unsubscribe = () => this.unsubscribe(abort);

      return controller.signal;
    }

    /**
     * Returns an object that contains a new `CancelToken` and a function that, when called,
     * cancels the `CancelToken`.
     */
    static source() {
      let cancel;
      const token = new CancelToken(function executor(c) {
        cancel = c;
      });
      return {
        token,
        cancel,
      };
    }
  };

  /**
   * Syntactic sugar for invoking a function and expanding an array for arguments.
   *
   * Common use case would be to use `Function.prototype.apply`.
   *
   *  ```js
   *  function f(x, y, z) {}
   *  const args = [1, 2, 3];
   *  f.apply(null, args);
   *  ```
   *
   * With `spread` this example can be re-written.
   *
   *  ```js
   *  spread(function(x, y, z) {})([1, 2, 3]);
   *  ```
   *
   * @param {Function} callback
   *
   * @returns {Function}
   */
  function spread$1(callback) {
    return function wrap(arr) {
      return callback.apply(null, arr);
    };
  }

  /**
   * Determines whether the payload is an error thrown by Axios
   *
   * @param {*} payload The value to test
   *
   * @returns {boolean} True if the payload is an error thrown by Axios, otherwise false
   */
  function isAxiosError$1(payload) {
    return utils$1.isObject(payload) && payload.isAxiosError === true;
  }

  const HttpStatusCode$1 = {
    Continue: 100,
    SwitchingProtocols: 101,
    Processing: 102,
    EarlyHints: 103,
    Ok: 200,
    Created: 201,
    Accepted: 202,
    NonAuthoritativeInformation: 203,
    NoContent: 204,
    ResetContent: 205,
    PartialContent: 206,
    MultiStatus: 207,
    AlreadyReported: 208,
    ImUsed: 226,
    MultipleChoices: 300,
    MovedPermanently: 301,
    Found: 302,
    SeeOther: 303,
    NotModified: 304,
    UseProxy: 305,
    Unused: 306,
    TemporaryRedirect: 307,
    PermanentRedirect: 308,
    BadRequest: 400,
    Unauthorized: 401,
    PaymentRequired: 402,
    Forbidden: 403,
    NotFound: 404,
    MethodNotAllowed: 405,
    NotAcceptable: 406,
    ProxyAuthenticationRequired: 407,
    RequestTimeout: 408,
    Conflict: 409,
    Gone: 410,
    LengthRequired: 411,
    PreconditionFailed: 412,
    PayloadTooLarge: 413,
    UriTooLong: 414,
    UnsupportedMediaType: 415,
    RangeNotSatisfiable: 416,
    ExpectationFailed: 417,
    ImATeapot: 418,
    MisdirectedRequest: 421,
    UnprocessableEntity: 422,
    Locked: 423,
    FailedDependency: 424,
    TooEarly: 425,
    UpgradeRequired: 426,
    PreconditionRequired: 428,
    TooManyRequests: 429,
    RequestHeaderFieldsTooLarge: 431,
    UnavailableForLegalReasons: 451,
    InternalServerError: 500,
    NotImplemented: 501,
    BadGateway: 502,
    ServiceUnavailable: 503,
    GatewayTimeout: 504,
    HttpVersionNotSupported: 505,
    VariantAlsoNegotiates: 506,
    InsufficientStorage: 507,
    LoopDetected: 508,
    NotExtended: 510,
    NetworkAuthenticationRequired: 511,
    WebServerIsDown: 521,
    ConnectionTimedOut: 522,
    OriginIsUnreachable: 523,
    TimeoutOccurred: 524,
    SslHandshakeFailed: 525,
    InvalidSslCertificate: 526,
  };

  Object.entries(HttpStatusCode$1).forEach(([key, value]) => {
    HttpStatusCode$1[value] = key;
  });

  /**
   * Create an instance of Axios
   *
   * @param {Object} defaultConfig The default config for the instance
   *
   * @returns {Axios} A new instance of Axios
   */
  function createInstance(defaultConfig) {
    const context = new Axios$1(defaultConfig);
    const instance = bind(Axios$1.prototype.request, context);

    // Copy axios.prototype to instance
    utils$1.extend(instance, Axios$1.prototype, context, { allOwnKeys: true });

    // Copy context to instance
    utils$1.extend(instance, context, null, { allOwnKeys: true });

    // Factory for creating new instances
    instance.create = function create(instanceConfig) {
      return createInstance(mergeConfig$1(defaultConfig, instanceConfig));
    };

    return instance;
  }

  // Create the default instance to be exported
  const axios = createInstance(defaults);

  // Expose Axios class to allow class inheritance
  axios.Axios = Axios$1;

  // Expose Cancel & CancelToken
  axios.CanceledError = CanceledError$1;
  axios.CancelToken = CancelToken$1;
  axios.isCancel = isCancel$1;
  axios.VERSION = VERSION$1;
  axios.toFormData = toFormData$1;

  // Expose AxiosError class
  axios.AxiosError = AxiosError$1;

  // alias for CanceledError for backward compatibility
  axios.Cancel = axios.CanceledError;

  // Expose all/spread
  axios.all = function all(promises) {
    return Promise.all(promises);
  };

  axios.spread = spread$1;

  // Expose isAxiosError
  axios.isAxiosError = isAxiosError$1;

  // Expose mergeConfig
  axios.mergeConfig = mergeConfig$1;

  axios.AxiosHeaders = AxiosHeaders$1;

  axios.formToJSON = (thing) => formDataToJSON(utils$1.isHTMLForm(thing) ? new FormData(thing) : thing);

  axios.getAdapter = adapters.getAdapter;

  axios.HttpStatusCode = HttpStatusCode$1;

  axios.default = axios;

  // This module is intended to unwrap Axios default export as named.
  // Keep top-level export same with static properties
  // so that it can keep same with es module or cjs
  const {
    Axios,
    AxiosError,
    CanceledError,
    isCancel,
    CancelToken,
    VERSION,
    all,
    Cancel,
    isAxiosError,
    spread,
    toFormData,
    AxiosHeaders,
    HttpStatusCode,
    formToJSON,
    getAdapter,
    mergeConfig,
    create,
  } = axios;

  const ImageUpload$1 = props => {
    const {
      record
    } = props;
    const [selectedFile, setSelectedFile] = React__default.default.useState(null);
    const [title, setTitle] = React__default.default.useState('');
    const [description, setDescription] = React__default.default.useState('');
    const [loading, setLoading] = React__default.default.useState(false);
    const [error, setError] = React__default.default.useState('');
    const [success, setSuccess] = React__default.default.useState('');
    const sendNotice = adminjs.useNotice();
    const navigate = reactRouterDom.useNavigate();
    const api = new adminjs.ApiClient();
    const handleFileChange = event => {
      const file = event.target.files?.[0];
      if (file) {
        setSelectedFile(file);

        // // Save file into AdminJS form state
      }
    };
    const handleTitleChange = event => {
      setTitle(event.target.value);
    };
    const handleDescriptionChange = event => {
      setDescription(event.target.value);
    };
    const handleUpload = async event => {
      event.preventDefault();
      setError('');
      setSuccess('');
      if (!selectedFile) return;
      try {
        setLoading(true);
        const formData = new FormData();
        formData.append('image', selectedFile);
        const response = await axios.post('/gallery', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
        console.log('Upload successful:', response.data);
        await api.resourceAction({
          resourceId: 'Gallery',
          actionName: 'new',
          data: {
            title,
            description,
            imageUrl: response.data.url,
            cloudinaryPublicId: response.data.public_id
          }
        });
        sendNotice({
          message: 'Image uploaded successfully',
          type: 'success'
        });
        navigate('/admin/resources/Gallery');
      } catch (error) {
        console.error('Upload failed:', error);
        setError('Failed to upload image. Please try again.');
      } finally {
        setLoading(false);
      }
    };
    return /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
      backgroundColor: "white",
      p: 32,
      borderRadius: 4,
      boxShadow: "card"
    }, /*#__PURE__*/React__default.default.createElement("form", {
      style: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 16
      },
      onSubmit: handleUpload
    }, /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
      width: 1,
      border: "1px dashed #bbb",
      borderRadius: "12px",
      height: "350px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "#fafafa",
      p: 8
    }, /*#__PURE__*/React__default.default.createElement(designSystem.Label, {
      htmlFor: "image-upload",
      style: {
        width: '100%',
        height: '100%',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }
    }, selectedFile ? /*#__PURE__*/React__default.default.createElement(React__default.default.Fragment, null, /*#__PURE__*/React__default.default.createElement("img", {
      src: URL.createObjectURL(selectedFile),
      alt: "Preview",
      style: {
        width: '100%',
        height: '100%',
        objectFit: 'contain'
      }
    })) : /*#__PURE__*/React__default.default.createElement(designSystem.Text, null, "Upload Image")), /*#__PURE__*/React__default.default.createElement(designSystem.Input, {
      id: "image-upload",
      type: "file",
      accept: "image/*",
      onChange: handleFileChange,
      style: {
        display: 'none'
      },
      required: true
    })), /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
      width: 1
    }, /*#__PURE__*/React__default.default.createElement(designSystem.Label, {
      htmlFor: "title",
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: 2
      }
    }, /*#__PURE__*/React__default.default.createElement(designSystem.Text, {
      variant: "primary",
      color: "primary100"
    }, "*"), "Title"), /*#__PURE__*/React__default.default.createElement(designSystem.Input, {
      width: 1,
      variant: "default",
      type: "text",
      id: "title",
      value: title,
      onChange: handleTitleChange,
      required: true
    })), /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
      width: 1
    }, /*#__PURE__*/React__default.default.createElement(designSystem.Label, {
      htmlFor: "description"
    }, "Description"), /*#__PURE__*/React__default.default.createElement(designSystem.TextArea, {
      width: 1,
      variant: "default",
      type: "text",
      id: "description",
      value: description,
      onChange: handleDescriptionChange
    })), /*#__PURE__*/React__default.default.createElement(designSystem.Button, {
      type: "submit",
      variant: "contained",
      label: loading ? 'Uploading...' : 'Upload',
      disabled: loading
    })));
  };

  const CustomShow = props => {
    const {
      record
    } = props;
    return /*#__PURE__*/React__default.default.createElement("img", {
      src: record.params.imageUrl,
      alt: record.params.title,
      style: {
        width: '500px',
        height: '500px',
        objectFit: 'contain'
      }
    });
  };

  const RandomPicture = props => {
    const {
      record
    } = props;
    return /*#__PURE__*/React__default.default.createElement("img", {
      src: record.params.imageUrl,
      alt: record.params.title,
      style: {
        width: 200,
        height: 200,
        objectFit: 'cover'
      }
    });
  };

  const CustomImageUploadComponent = props => {
    const {
      record
    } = props;
    const [selectedFile, setSelectedFile] = React__default.default.useState(null);
    return /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
      width: 1,
      border: "1px dashed #bbb",
      borderRadius: "12px",
      height: "350px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "#fafafa",
      p: 8,
      marginBottom: 32
    }, /*#__PURE__*/React__default.default.createElement(designSystem.Label, {
      htmlFor: "image-upload",
      style: {
        width: '100%',
        height: '100%',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }
    }, record?.params.imageUrl ? /*#__PURE__*/React__default.default.createElement(React__default.default.Fragment, null, /*#__PURE__*/React__default.default.createElement("img", {
      src: record?.params.imageUrl,
      alt: "Preview",
      style: {
        width: '100%',
        height: '100%',
        objectFit: 'contain'
      }
    })) : /*#__PURE__*/React__default.default.createElement(designSystem.Text, null, "Upload Image")));
  };

  const ImageUpload = props => {
    const {
      record
    } = props;
    const [selectedFile, setSelectedFile] = React__default.default.useState(null);
    const [title, setTitle] = React__default.default.useState('');
    const [linkUrl, setLinkUrl] = React__default.default.useState('');
    const [isActive, setIsActive] = React__default.default.useState(true);
    const [loading, setLoading] = React__default.default.useState(false);
    const [error, setError] = React__default.default.useState('');
    const [success, setSuccess] = React__default.default.useState('');
    const sendNotice = adminjs.useNotice();
    const navigate = reactRouterDom.useNavigate();
    const api = new adminjs.ApiClient();
    const handleFileChange = event => {
      const file = event.target.files?.[0];
      if (file) {
        setSelectedFile(file);

        // // Save file into AdminJS form state
      }
    };
    const handleLinkUrlChange = event => {
      setLinkUrl(event.target.value);
    };
    const handleTitleChange = event => {
      setTitle(event.target.value);
    };
    const handleUpload = async event => {
      event.preventDefault();
      setError('');
      setSuccess('');
      if (!selectedFile) return;
      try {
        setLoading(true);
        const formData = new FormData();
        formData.append('image', selectedFile);
        const response = await axios.post('/popup', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
        console.log('Upload successful:', response.data);
        await api.resourceAction({
          resourceId: 'Popup',
          actionName: 'new',
          data: {
            title,
            linkUrl: linkUrl,
            imageUrl: response.data.url,
            cloudinaryPublicId: response.data.public_id,
            isActive
          }
        });
        sendNotice({
          message: 'Image uploaded successfully',
          type: 'success'
        });
        navigate('/admin/resources/Popup');
      } catch (error) {
        console.error('Upload failed:', error);
        setError('Failed to upload image. Please try again.');
      } finally {
        setLoading(false);
      }
    };
    return /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
      backgroundColor: "white",
      p: 32,
      borderRadius: 4,
      boxShadow: "card"
    }, /*#__PURE__*/React__default.default.createElement("form", {
      style: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 16
      },
      onSubmit: handleUpload
    }, /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
      width: 1,
      border: "1px dashed #bbb",
      borderRadius: "12px",
      height: "350px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "#fafafa",
      p: 8
    }, /*#__PURE__*/React__default.default.createElement(designSystem.Label, {
      htmlFor: "image-upload",
      style: {
        width: '100%',
        height: '100%',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }
    }, selectedFile ? /*#__PURE__*/React__default.default.createElement(React__default.default.Fragment, null, /*#__PURE__*/React__default.default.createElement("img", {
      src: URL.createObjectURL(selectedFile),
      alt: "Preview",
      style: {
        width: '100%',
        height: '100%',
        objectFit: 'contain'
      }
    })) : /*#__PURE__*/React__default.default.createElement(designSystem.Text, null, "Upload Image")), /*#__PURE__*/React__default.default.createElement(designSystem.Input, {
      id: "image-upload",
      type: "file",
      accept: "image/*",
      onChange: handleFileChange,
      style: {
        display: 'none'
      },
      required: true
    })), /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
      width: 1
    }, /*#__PURE__*/React__default.default.createElement(designSystem.Label, {
      htmlFor: "title",
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: 2
      }
    }, /*#__PURE__*/React__default.default.createElement(designSystem.Text, {
      variant: "primary",
      color: "primary100"
    }, "*"), "Title"), /*#__PURE__*/React__default.default.createElement(designSystem.Input, {
      width: 1,
      variant: "default",
      type: "text",
      id: "title",
      value: title,
      onChange: handleTitleChange,
      required: true
    })), /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
      width: 1
    }, /*#__PURE__*/React__default.default.createElement(designSystem.Label, {
      htmlFor: "linkUrl",
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: 2
      }
    }, "Link Url"), /*#__PURE__*/React__default.default.createElement(designSystem.Input, {
      width: 1,
      variant: "default",
      type: "text",
      id: "linkUrl",
      value: linkUrl,
      onChange: handleLinkUrlChange
    })), /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
      width: 1,
      display: "flex",
      alignItems: "center",
      gap: 2
    }, /*#__PURE__*/React__default.default.createElement(designSystem.CheckBox, {
      id: "isActive",
      checked: isActive,
      onClick: () => setIsActive(!isActive)
    }), /*#__PURE__*/React__default.default.createElement(designSystem.Label, {
      htmlFor: "isActive"
    }, "Is Active")), /*#__PURE__*/React__default.default.createElement(designSystem.Button, {
      type: "submit",
      variant: "contained",
      label: loading ? 'Uploading...' : 'Upload',
      disabled: loading
    })));
  };

  const ChangeAdminPassword = props => {
    const {
      onChange,
      where,
      record
    } = props;
    const isEdit = record?.params.email ? true : false; // Assuming email is always present for existing records
    const [showForm, setShowForm] = React.useState(!isEdit);
    const [oldPassword, setOldPassword] = React.useState('');
    const [newPassword, setNewPassword] = React.useState('');
    const [confirmPassword, setConfirmPassword] = React.useState('');
    const handleChangePasswordChange = e => {
      setNewPassword(e.target.value);
    };
    const handleChangePasswordClick = e => {
      e.preventDefault();
      e.stopPropagation();
      setShowForm(!showForm);
    };
    const handleCancel = e => {
      e.preventDefault();
      e.stopPropagation();
      setShowForm(false);
      setNewPassword('');
    };
    React.useEffect(() => {
      const timeout = setTimeout(() => {
        if (onChange) {
          onChange('password', newPassword);
        }
      }, 4000);
      return () => clearTimeout(timeout);
    }, [newPassword]);
    return /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
      width: 1,
      flex: true,
      flexDirection: "column",
      alignItems: "center",
      gap: 2
    }, showForm && /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
      width: 1,
      flex: true,
      flexDirection: "column",
      alignItems: "center",
      gap: 2
    }, /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
      width: 1,
      marginBottom: 32
    }, /*#__PURE__*/React__default.default.createElement(designSystem.Label, {
      htmlFor: "newPassword",
      required: true
    }, "New Password"), /*#__PURE__*/React__default.default.createElement(designSystem.Input, {
      id: "newPassword",
      type: "password",
      value: newPassword,
      onChange: handleChangePasswordChange,
      variant: "default",
      width: 1,
      required: true
    })), isEdit && /*#__PURE__*/React__default.default.createElement(designSystem.Button, {
      type: "button",
      onClick: handleCancel,
      variant: "default"
    }, "Cancel")), !showForm && /*#__PURE__*/React__default.default.createElement(designSystem.Button, {
      type: "button",
      marginBottom: 32,
      onClick: handleChangePasswordClick
    }, "Change Password"));
  };

  AdminJS.UserComponents = {};
  AdminJS.UserComponents.Dashboard = CustomDashboard;
  AdminJS.UserComponents.CustomGalleryUploadComponent = ImageUpload$1;
  AdminJS.UserComponents.CustomShow = CustomShow;
  AdminJS.UserComponents.RandomPicture = RandomPicture;
  AdminJS.UserComponents.CustomImageUploadComponent = CustomImageUploadComponent;
  AdminJS.UserComponents.CustomPopupUploadComponent = ImageUpload;
  AdminJS.UserComponents.CustomPasswordEditComponent = ChangeAdminPassword;

})(React, AdminJS, AdminJSDesignSystem, ReactRouterDOM);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVuZGxlLmpzIiwic291cmNlcyI6WyIuLi9zcmMvY29tcG9uZW50cy9DdXN0b21EYXNoYm9hcmQudHN4IiwiLi4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9oZWxwZXJzL2JpbmQuanMiLCIuLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL3V0aWxzLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9oZWxwZXJzL3BhcnNlSGVhZGVycy5qcyIsIi4uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvY29yZS9BeGlvc0hlYWRlcnMuanMiLCIuLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2NvcmUvQXhpb3NFcnJvci5qcyIsIi4uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvaGVscGVycy9udWxsLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9oZWxwZXJzL3RvRm9ybURhdGEuanMiLCIuLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2hlbHBlcnMvQXhpb3NVUkxTZWFyY2hQYXJhbXMuanMiLCIuLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2hlbHBlcnMvYnVpbGRVUkwuanMiLCIuLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2NvcmUvSW50ZXJjZXB0b3JNYW5hZ2VyLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9kZWZhdWx0cy90cmFuc2l0aW9uYWwuanMiLCIuLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL3BsYXRmb3JtL2Jyb3dzZXIvY2xhc3Nlcy9VUkxTZWFyY2hQYXJhbXMuanMiLCIuLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL3BsYXRmb3JtL2Jyb3dzZXIvY2xhc3Nlcy9Gb3JtRGF0YS5qcyIsIi4uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvcGxhdGZvcm0vYnJvd3Nlci9jbGFzc2VzL0Jsb2IuanMiLCIuLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL3BsYXRmb3JtL2Jyb3dzZXIvaW5kZXguanMiLCIuLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL3BsYXRmb3JtL2NvbW1vbi91dGlscy5qcyIsIi4uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvcGxhdGZvcm0vaW5kZXguanMiLCIuLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2hlbHBlcnMvdG9VUkxFbmNvZGVkRm9ybS5qcyIsIi4uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvaGVscGVycy9mb3JtRGF0YVRvSlNPTi5qcyIsIi4uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvZGVmYXVsdHMvaW5kZXguanMiLCIuLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2NvcmUvdHJhbnNmb3JtRGF0YS5qcyIsIi4uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvY2FuY2VsL2lzQ2FuY2VsLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9jYW5jZWwvQ2FuY2VsZWRFcnJvci5qcyIsIi4uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvY29yZS9zZXR0bGUuanMiLCIuLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2hlbHBlcnMvcGFyc2VQcm90b2NvbC5qcyIsIi4uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvaGVscGVycy9zcGVlZG9tZXRlci5qcyIsIi4uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvaGVscGVycy90aHJvdHRsZS5qcyIsIi4uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvaGVscGVycy9wcm9ncmVzc0V2ZW50UmVkdWNlci5qcyIsIi4uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvaGVscGVycy9pc1VSTFNhbWVPcmlnaW4uanMiLCIuLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2hlbHBlcnMvY29va2llcy5qcyIsIi4uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvaGVscGVycy9pc0Fic29sdXRlVVJMLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9oZWxwZXJzL2NvbWJpbmVVUkxzLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9jb3JlL2J1aWxkRnVsbFBhdGguanMiLCIuLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2NvcmUvbWVyZ2VDb25maWcuanMiLCIuLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2hlbHBlcnMvcmVzb2x2ZUNvbmZpZy5qcyIsIi4uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvYWRhcHRlcnMveGhyLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9oZWxwZXJzL2NvbXBvc2VTaWduYWxzLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9oZWxwZXJzL3RyYWNrU3RyZWFtLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9oZWxwZXJzL2VzdGltYXRlRGF0YVVSTERlY29kZWRCeXRlcy5qcyIsIi4uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvZW52L2RhdGEuanMiLCIuLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2FkYXB0ZXJzL2ZldGNoLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9hZGFwdGVycy9hZGFwdGVycy5qcyIsIi4uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvY29yZS9kaXNwYXRjaFJlcXVlc3QuanMiLCIuLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2hlbHBlcnMvdmFsaWRhdG9yLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9jb3JlL0F4aW9zLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9jYW5jZWwvQ2FuY2VsVG9rZW4uanMiLCIuLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2hlbHBlcnMvc3ByZWFkLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9oZWxwZXJzL2lzQXhpb3NFcnJvci5qcyIsIi4uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvaGVscGVycy9IdHRwU3RhdHVzQ29kZS5qcyIsIi4uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvYXhpb3MuanMiLCIuLi9ub2RlX21vZHVsZXMvYXhpb3MvaW5kZXguanMiLCIuLi9zcmMvY29tcG9uZW50cy9DdXN0b21HYWxsZXJ5VXBsb2FkQ29tcG9uZW50LnRzeCIsIi4uL3NyYy9jb21wb25lbnRzL0N1c3RvbVNob3cudHN4IiwiLi4vc3JjL2NvbXBvbmVudHMvUmFuZG9tUGljdHVyZS50c3giLCIuLi9zcmMvY29tcG9uZW50cy9DdXN0b21JbWFnZVVwbG9hZENvbXBvbmVudC50c3giLCIuLi9zcmMvY29tcG9uZW50cy9DdXN0b21Qb3B1cFVwbG9hZENvbXBvbmVudC50c3giLCIuLi9zcmMvY29tcG9uZW50cy9DdXN0b21BZG1pblBhc3N3b3JkQ29tcG9uZW50LnRzeCIsImVudHJ5LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCB7IHVzZVRyYW5zbGF0aW9uIH0gZnJvbSAnYWRtaW5qcyc7XHJcbmltcG9ydCB7IEJveCwgVGV4dCwgSDEgfSBmcm9tICdAYWRtaW5qcy9kZXNpZ24tc3lzdGVtJztcclxuXHJcbmNvbnN0IEN1c3RvbURhc2hib2FyZCA9ICgpID0+IHtcclxuICBjb25zdCB7IHRyYW5zbGF0ZSB9ID0gdXNlVHJhbnNsYXRpb24oKTtcclxuXHJcbiAgcmV0dXJuIDxCb3ggd2lkdGg9ezF9IHRleHRBbGlnbj1cImNlbnRlclwiIHBhZGRpbmc9ezV9IGJnPVwid2hpdGVcIj48L0JveD47XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBDdXN0b21EYXNoYm9hcmQ7XHJcbiIsIid1c2Ugc3RyaWN0JztcblxuLyoqXG4gKiBDcmVhdGUgYSBib3VuZCB2ZXJzaW9uIG9mIGEgZnVuY3Rpb24gd2l0aCBhIHNwZWNpZmllZCBgdGhpc2AgY29udGV4dFxuICpcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZuIC0gVGhlIGZ1bmN0aW9uIHRvIGJpbmRcbiAqIEBwYXJhbSB7Kn0gdGhpc0FyZyAtIFRoZSB2YWx1ZSB0byBiZSBwYXNzZWQgYXMgdGhlIGB0aGlzYCBwYXJhbWV0ZXJcbiAqIEByZXR1cm5zIHtGdW5jdGlvbn0gQSBuZXcgZnVuY3Rpb24gdGhhdCB3aWxsIGNhbGwgdGhlIG9yaWdpbmFsIGZ1bmN0aW9uIHdpdGggdGhlIHNwZWNpZmllZCBgdGhpc2AgY29udGV4dFxuICovXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBiaW5kKGZuLCB0aGlzQXJnKSB7XG4gIHJldHVybiBmdW5jdGlvbiB3cmFwKCkge1xuICAgIHJldHVybiBmbi5hcHBseSh0aGlzQXJnLCBhcmd1bWVudHMpO1xuICB9O1xufVxuIiwiJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQgYmluZCBmcm9tICcuL2hlbHBlcnMvYmluZC5qcyc7XG5cbi8vIHV0aWxzIGlzIGEgbGlicmFyeSBvZiBnZW5lcmljIGhlbHBlciBmdW5jdGlvbnMgbm9uLXNwZWNpZmljIHRvIGF4aW9zXG5cbmNvbnN0IHsgdG9TdHJpbmcgfSA9IE9iamVjdC5wcm90b3R5cGU7XG5jb25zdCB7IGdldFByb3RvdHlwZU9mIH0gPSBPYmplY3Q7XG5jb25zdCB7IGl0ZXJhdG9yLCB0b1N0cmluZ1RhZyB9ID0gU3ltYm9sO1xuXG5jb25zdCBraW5kT2YgPSAoKGNhY2hlKSA9PiAodGhpbmcpID0+IHtcbiAgY29uc3Qgc3RyID0gdG9TdHJpbmcuY2FsbCh0aGluZyk7XG4gIHJldHVybiBjYWNoZVtzdHJdIHx8IChjYWNoZVtzdHJdID0gc3RyLnNsaWNlKDgsIC0xKS50b0xvd2VyQ2FzZSgpKTtcbn0pKE9iamVjdC5jcmVhdGUobnVsbCkpO1xuXG5jb25zdCBraW5kT2ZUZXN0ID0gKHR5cGUpID0+IHtcbiAgdHlwZSA9IHR5cGUudG9Mb3dlckNhc2UoKTtcbiAgcmV0dXJuICh0aGluZykgPT4ga2luZE9mKHRoaW5nKSA9PT0gdHlwZTtcbn07XG5cbmNvbnN0IHR5cGVPZlRlc3QgPSAodHlwZSkgPT4gKHRoaW5nKSA9PiB0eXBlb2YgdGhpbmcgPT09IHR5cGU7XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYSBub24tbnVsbCBvYmplY3RcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKlxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYW4gQXJyYXksIG90aGVyd2lzZSBmYWxzZVxuICovXG5jb25zdCB7IGlzQXJyYXkgfSA9IEFycmF5O1xuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIHVuZGVmaW5lZFxuICpcbiAqIEBwYXJhbSB7Kn0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKlxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdGhlIHZhbHVlIGlzIHVuZGVmaW5lZCwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmNvbnN0IGlzVW5kZWZpbmVkID0gdHlwZU9mVGVzdCgndW5kZWZpbmVkJyk7XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYSBCdWZmZXJcbiAqXG4gKiBAcGFyYW0geyp9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICpcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGEgQnVmZmVyLCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNCdWZmZXIodmFsKSB7XG4gIHJldHVybiAoXG4gICAgdmFsICE9PSBudWxsICYmXG4gICAgIWlzVW5kZWZpbmVkKHZhbCkgJiZcbiAgICB2YWwuY29uc3RydWN0b3IgIT09IG51bGwgJiZcbiAgICAhaXNVbmRlZmluZWQodmFsLmNvbnN0cnVjdG9yKSAmJlxuICAgIGlzRnVuY3Rpb24odmFsLmNvbnN0cnVjdG9yLmlzQnVmZmVyKSAmJlxuICAgIHZhbC5jb25zdHJ1Y3Rvci5pc0J1ZmZlcih2YWwpXG4gICk7XG59XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYW4gQXJyYXlCdWZmZXJcbiAqXG4gKiBAcGFyYW0geyp9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICpcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGFuIEFycmF5QnVmZmVyLCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuY29uc3QgaXNBcnJheUJ1ZmZlciA9IGtpbmRPZlRlc3QoJ0FycmF5QnVmZmVyJyk7XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYSB2aWV3IG9uIGFuIEFycmF5QnVmZmVyXG4gKlxuICogQHBhcmFtIHsqfSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhIHZpZXcgb24gYW4gQXJyYXlCdWZmZXIsIG90aGVyd2lzZSBmYWxzZVxuICovXG5mdW5jdGlvbiBpc0FycmF5QnVmZmVyVmlldyh2YWwpIHtcbiAgbGV0IHJlc3VsdDtcbiAgaWYgKHR5cGVvZiBBcnJheUJ1ZmZlciAhPT0gJ3VuZGVmaW5lZCcgJiYgQXJyYXlCdWZmZXIuaXNWaWV3KSB7XG4gICAgcmVzdWx0ID0gQXJyYXlCdWZmZXIuaXNWaWV3KHZhbCk7XG4gIH0gZWxzZSB7XG4gICAgcmVzdWx0ID0gdmFsICYmIHZhbC5idWZmZXIgJiYgaXNBcnJheUJ1ZmZlcih2YWwuYnVmZmVyKTtcbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufVxuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGEgU3RyaW5nXG4gKlxuICogQHBhcmFtIHsqfSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhIFN0cmluZywgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmNvbnN0IGlzU3RyaW5nID0gdHlwZU9mVGVzdCgnc3RyaW5nJyk7XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYSBGdW5jdGlvblxuICpcbiAqIEBwYXJhbSB7Kn0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhIEZ1bmN0aW9uLCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuY29uc3QgaXNGdW5jdGlvbiA9IHR5cGVPZlRlc3QoJ2Z1bmN0aW9uJyk7XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYSBOdW1iZXJcbiAqXG4gKiBAcGFyYW0geyp9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICpcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGEgTnVtYmVyLCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuY29uc3QgaXNOdW1iZXIgPSB0eXBlT2ZUZXN0KCdudW1iZXInKTtcblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhbiBPYmplY3RcbiAqXG4gKiBAcGFyYW0geyp9IHRoaW5nIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKlxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYW4gT2JqZWN0LCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuY29uc3QgaXNPYmplY3QgPSAodGhpbmcpID0+IHRoaW5nICE9PSBudWxsICYmIHR5cGVvZiB0aGluZyA9PT0gJ29iamVjdCc7XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYSBCb29sZWFuXG4gKlxuICogQHBhcmFtIHsqfSB0aGluZyBUaGUgdmFsdWUgdG8gdGVzdFxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYSBCb29sZWFuLCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuY29uc3QgaXNCb29sZWFuID0gKHRoaW5nKSA9PiB0aGluZyA9PT0gdHJ1ZSB8fCB0aGluZyA9PT0gZmFsc2U7XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYSBwbGFpbiBPYmplY3RcbiAqXG4gKiBAcGFyYW0geyp9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICpcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGEgcGxhaW4gT2JqZWN0LCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuY29uc3QgaXNQbGFpbk9iamVjdCA9ICh2YWwpID0+IHtcbiAgaWYgKGtpbmRPZih2YWwpICE9PSAnb2JqZWN0Jykge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIGNvbnN0IHByb3RvdHlwZSA9IGdldFByb3RvdHlwZU9mKHZhbCk7XG4gIHJldHVybiAoXG4gICAgKHByb3RvdHlwZSA9PT0gbnVsbCB8fFxuICAgICAgcHJvdG90eXBlID09PSBPYmplY3QucHJvdG90eXBlIHx8XG4gICAgICBPYmplY3QuZ2V0UHJvdG90eXBlT2YocHJvdG90eXBlKSA9PT0gbnVsbCkgJiZcbiAgICAhKHRvU3RyaW5nVGFnIGluIHZhbCkgJiZcbiAgICAhKGl0ZXJhdG9yIGluIHZhbClcbiAgKTtcbn07XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYW4gZW1wdHkgb2JqZWN0IChzYWZlbHkgaGFuZGxlcyBCdWZmZXJzKVxuICpcbiAqIEBwYXJhbSB7Kn0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKlxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYW4gZW1wdHkgb2JqZWN0LCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuY29uc3QgaXNFbXB0eU9iamVjdCA9ICh2YWwpID0+IHtcbiAgLy8gRWFybHkgcmV0dXJuIGZvciBub24tb2JqZWN0cyBvciBCdWZmZXJzIHRvIHByZXZlbnQgUmFuZ2VFcnJvclxuICBpZiAoIWlzT2JqZWN0KHZhbCkgfHwgaXNCdWZmZXIodmFsKSkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIHRyeSB7XG4gICAgcmV0dXJuIE9iamVjdC5rZXlzKHZhbCkubGVuZ3RoID09PSAwICYmIE9iamVjdC5nZXRQcm90b3R5cGVPZih2YWwpID09PSBPYmplY3QucHJvdG90eXBlO1xuICB9IGNhdGNoIChlKSB7XG4gICAgLy8gRmFsbGJhY2sgZm9yIGFueSBvdGhlciBvYmplY3RzIHRoYXQgbWlnaHQgY2F1c2UgUmFuZ2VFcnJvciB3aXRoIE9iamVjdC5rZXlzKClcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbn07XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYSBEYXRlXG4gKlxuICogQHBhcmFtIHsqfSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhIERhdGUsIG90aGVyd2lzZSBmYWxzZVxuICovXG5jb25zdCBpc0RhdGUgPSBraW5kT2ZUZXN0KCdEYXRlJyk7XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYSBGaWxlXG4gKlxuICogQHBhcmFtIHsqfSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhIEZpbGUsIG90aGVyd2lzZSBmYWxzZVxuICovXG5jb25zdCBpc0ZpbGUgPSBraW5kT2ZUZXN0KCdGaWxlJyk7XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYSBSZWFjdCBOYXRpdmUgQmxvYlxuICogUmVhY3QgTmF0aXZlIFwiYmxvYlwiOiBhbiBvYmplY3Qgd2l0aCBhIGB1cmlgIGF0dHJpYnV0ZS4gT3B0aW9uYWxseSwgaXQgY2FuXG4gKiBhbHNvIGhhdmUgYSBgbmFtZWAgYW5kIGB0eXBlYCBhdHRyaWJ1dGUgdG8gc3BlY2lmeSBmaWxlbmFtZSBhbmQgY29udGVudCB0eXBlXG4gKlxuICogQHNlZSBodHRwczovL2dpdGh1Yi5jb20vZmFjZWJvb2svcmVhY3QtbmF0aXZlL2Jsb2IvMjY2ODRjZjNhZGY0MDk0ZWI2YzQwNWQzNDVhNzViZjhjN2MwYmY4OC9MaWJyYXJpZXMvTmV0d29yay9Gb3JtRGF0YS5qcyNMNjgtTDcxXG4gKlxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gdGVzdFxuICpcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGEgUmVhY3QgTmF0aXZlIEJsb2IsIG90aGVyd2lzZSBmYWxzZVxuICovXG5jb25zdCBpc1JlYWN0TmF0aXZlQmxvYiA9ICh2YWx1ZSkgPT4ge1xuICByZXR1cm4gISEodmFsdWUgJiYgdHlwZW9mIHZhbHVlLnVyaSAhPT0gJ3VuZGVmaW5lZCcpO1xufTtcblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgZW52aXJvbm1lbnQgaXMgUmVhY3QgTmF0aXZlXG4gKiBSZWFjdE5hdGl2ZSBgRm9ybURhdGFgIGhhcyBhIG5vbi1zdGFuZGFyZCBgZ2V0UGFydHMoKWAgbWV0aG9kXG4gKlxuICogQHBhcmFtIHsqfSBmb3JtRGF0YSBUaGUgZm9ybURhdGEgdG8gdGVzdFxuICpcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIGVudmlyb25tZW50IGlzIFJlYWN0IE5hdGl2ZSwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmNvbnN0IGlzUmVhY3ROYXRpdmUgPSAoZm9ybURhdGEpID0+IGZvcm1EYXRhICYmIHR5cGVvZiBmb3JtRGF0YS5nZXRQYXJ0cyAhPT0gJ3VuZGVmaW5lZCc7XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYSBCbG9iXG4gKlxuICogQHBhcmFtIHsqfSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhIEJsb2IsIG90aGVyd2lzZSBmYWxzZVxuICovXG5jb25zdCBpc0Jsb2IgPSBraW5kT2ZUZXN0KCdCbG9iJyk7XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYSBGaWxlTGlzdFxuICpcbiAqIEBwYXJhbSB7Kn0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKlxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYSBGaWxlTGlzdCwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmNvbnN0IGlzRmlsZUxpc3QgPSBraW5kT2ZUZXN0KCdGaWxlTGlzdCcpO1xuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGEgU3RyZWFtXG4gKlxuICogQHBhcmFtIHsqfSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhIFN0cmVhbSwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmNvbnN0IGlzU3RyZWFtID0gKHZhbCkgPT4gaXNPYmplY3QodmFsKSAmJiBpc0Z1bmN0aW9uKHZhbC5waXBlKTtcblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhIEZvcm1EYXRhXG4gKlxuICogQHBhcmFtIHsqfSB0aGluZyBUaGUgdmFsdWUgdG8gdGVzdFxuICpcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGFuIEZvcm1EYXRhLCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuZnVuY3Rpb24gZ2V0R2xvYmFsKCkge1xuICBpZiAodHlwZW9mIGdsb2JhbFRoaXMgIT09ICd1bmRlZmluZWQnKSByZXR1cm4gZ2xvYmFsVGhpcztcbiAgaWYgKHR5cGVvZiBzZWxmICE9PSAndW5kZWZpbmVkJykgcmV0dXJuIHNlbGY7XG4gIGlmICh0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJykgcmV0dXJuIHdpbmRvdztcbiAgaWYgKHR5cGVvZiBnbG9iYWwgIT09ICd1bmRlZmluZWQnKSByZXR1cm4gZ2xvYmFsO1xuICByZXR1cm4ge307XG59XG5cbmNvbnN0IEcgPSBnZXRHbG9iYWwoKTtcbmNvbnN0IEZvcm1EYXRhQ3RvciA9IHR5cGVvZiBHLkZvcm1EYXRhICE9PSAndW5kZWZpbmVkJyA/IEcuRm9ybURhdGEgOiB1bmRlZmluZWQ7XG5cbmNvbnN0IGlzRm9ybURhdGEgPSAodGhpbmcpID0+IHtcbiAgaWYgKCF0aGluZykgcmV0dXJuIGZhbHNlO1xuICBpZiAoRm9ybURhdGFDdG9yICYmIHRoaW5nIGluc3RhbmNlb2YgRm9ybURhdGFDdG9yKSByZXR1cm4gdHJ1ZTtcbiAgLy8gUmVqZWN0IHBsYWluIG9iamVjdHMgaW5oZXJpdGluZyBkaXJlY3RseSBmcm9tIE9iamVjdC5wcm90b3R5cGUgc28gcHJvdG90eXBlLXBvbGx1dGlvbiBnYWRnZXRzIGNhbid0IHNwb29mIEZvcm1EYXRhLlxuICBjb25zdCBwcm90byA9IGdldFByb3RvdHlwZU9mKHRoaW5nKTtcbiAgaWYgKCFwcm90byB8fCBwcm90byA9PT0gT2JqZWN0LnByb3RvdHlwZSkgcmV0dXJuIGZhbHNlO1xuICBpZiAoIWlzRnVuY3Rpb24odGhpbmcuYXBwZW5kKSkgcmV0dXJuIGZhbHNlO1xuICBjb25zdCBraW5kID0ga2luZE9mKHRoaW5nKTtcbiAgcmV0dXJuIChcbiAgICBraW5kID09PSAnZm9ybWRhdGEnIHx8XG4gICAgLy8gZGV0ZWN0IGZvcm0tZGF0YSBpbnN0YW5jZVxuICAgIChraW5kID09PSAnb2JqZWN0JyAmJiBpc0Z1bmN0aW9uKHRoaW5nLnRvU3RyaW5nKSAmJiB0aGluZy50b1N0cmluZygpID09PSAnW29iamVjdCBGb3JtRGF0YV0nKVxuICApO1xufTtcblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhIFVSTFNlYXJjaFBhcmFtcyBvYmplY3RcbiAqXG4gKiBAcGFyYW0geyp9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICpcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGEgVVJMU2VhcmNoUGFyYW1zIG9iamVjdCwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmNvbnN0IGlzVVJMU2VhcmNoUGFyYW1zID0ga2luZE9mVGVzdCgnVVJMU2VhcmNoUGFyYW1zJyk7XG5cbmNvbnN0IFtpc1JlYWRhYmxlU3RyZWFtLCBpc1JlcXVlc3QsIGlzUmVzcG9uc2UsIGlzSGVhZGVyc10gPSBbXG4gICdSZWFkYWJsZVN0cmVhbScsXG4gICdSZXF1ZXN0JyxcbiAgJ1Jlc3BvbnNlJyxcbiAgJ0hlYWRlcnMnLFxuXS5tYXAoa2luZE9mVGVzdCk7XG5cbi8qKlxuICogVHJpbSBleGNlc3Mgd2hpdGVzcGFjZSBvZmYgdGhlIGJlZ2lubmluZyBhbmQgZW5kIG9mIGEgc3RyaW5nXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IHN0ciBUaGUgU3RyaW5nIHRvIHRyaW1cbiAqXG4gKiBAcmV0dXJucyB7U3RyaW5nfSBUaGUgU3RyaW5nIGZyZWVkIG9mIGV4Y2VzcyB3aGl0ZXNwYWNlXG4gKi9cbmNvbnN0IHRyaW0gPSAoc3RyKSA9PiB7XG4gIHJldHVybiBzdHIudHJpbSA/IHN0ci50cmltKCkgOiBzdHIucmVwbGFjZSgvXltcXHNcXHVGRUZGXFx4QTBdK3xbXFxzXFx1RkVGRlxceEEwXSskL2csICcnKTtcbn07XG4vKipcbiAqIEl0ZXJhdGUgb3ZlciBhbiBBcnJheSBvciBhbiBPYmplY3QgaW52b2tpbmcgYSBmdW5jdGlvbiBmb3IgZWFjaCBpdGVtLlxuICpcbiAqIElmIGBvYmpgIGlzIGFuIEFycmF5IGNhbGxiYWNrIHdpbGwgYmUgY2FsbGVkIHBhc3NpbmdcbiAqIHRoZSB2YWx1ZSwgaW5kZXgsIGFuZCBjb21wbGV0ZSBhcnJheSBmb3IgZWFjaCBpdGVtLlxuICpcbiAqIElmICdvYmonIGlzIGFuIE9iamVjdCBjYWxsYmFjayB3aWxsIGJlIGNhbGxlZCBwYXNzaW5nXG4gKiB0aGUgdmFsdWUsIGtleSwgYW5kIGNvbXBsZXRlIG9iamVjdCBmb3IgZWFjaCBwcm9wZXJ0eS5cbiAqXG4gKiBAcGFyYW0ge09iamVjdHxBcnJheTx1bmtub3duPn0gb2JqIFRoZSBvYmplY3QgdG8gaXRlcmF0ZVxuICogQHBhcmFtIHtGdW5jdGlvbn0gZm4gVGhlIGNhbGxiYWNrIHRvIGludm9rZSBmb3IgZWFjaCBpdGVtXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IFtvcHRpb25zXVxuICogQHBhcmFtIHtCb29sZWFufSBbb3B0aW9ucy5hbGxPd25LZXlzID0gZmFsc2VdXG4gKiBAcmV0dXJucyB7YW55fVxuICovXG5mdW5jdGlvbiBmb3JFYWNoKG9iaiwgZm4sIHsgYWxsT3duS2V5cyA9IGZhbHNlIH0gPSB7fSkge1xuICAvLyBEb24ndCBib3RoZXIgaWYgbm8gdmFsdWUgcHJvdmlkZWRcbiAgaWYgKG9iaiA9PT0gbnVsbCB8fCB0eXBlb2Ygb2JqID09PSAndW5kZWZpbmVkJykge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIGxldCBpO1xuICBsZXQgbDtcblxuICAvLyBGb3JjZSBhbiBhcnJheSBpZiBub3QgYWxyZWFkeSBzb21ldGhpbmcgaXRlcmFibGVcbiAgaWYgKHR5cGVvZiBvYmogIT09ICdvYmplY3QnKSB7XG4gICAgLyplc2xpbnQgbm8tcGFyYW0tcmVhc3NpZ246MCovXG4gICAgb2JqID0gW29ial07XG4gIH1cblxuICBpZiAoaXNBcnJheShvYmopKSB7XG4gICAgLy8gSXRlcmF0ZSBvdmVyIGFycmF5IHZhbHVlc1xuICAgIGZvciAoaSA9IDAsIGwgPSBvYmoubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG4gICAgICBmbi5jYWxsKG51bGwsIG9ialtpXSwgaSwgb2JqKTtcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgLy8gQnVmZmVyIGNoZWNrXG4gICAgaWYgKGlzQnVmZmVyKG9iaikpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICAvLyBJdGVyYXRlIG92ZXIgb2JqZWN0IGtleXNcbiAgICBjb25zdCBrZXlzID0gYWxsT3duS2V5cyA/IE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKG9iaikgOiBPYmplY3Qua2V5cyhvYmopO1xuICAgIGNvbnN0IGxlbiA9IGtleXMubGVuZ3RoO1xuICAgIGxldCBrZXk7XG5cbiAgICBmb3IgKGkgPSAwOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgIGtleSA9IGtleXNbaV07XG4gICAgICBmbi5jYWxsKG51bGwsIG9ialtrZXldLCBrZXksIG9iaik7XG4gICAgfVxuICB9XG59XG5cbi8qKlxuICogRmluZHMgYSBrZXkgaW4gYW4gb2JqZWN0LCBjYXNlLWluc2Vuc2l0aXZlLCByZXR1cm5pbmcgdGhlIGFjdHVhbCBrZXkgbmFtZS5cbiAqIFJldHVybnMgbnVsbCBpZiB0aGUgb2JqZWN0IGlzIGEgQnVmZmVyIG9yIGlmIG5vIG1hdGNoIGlzIGZvdW5kLlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmogLSBUaGUgb2JqZWN0IHRvIHNlYXJjaC5cbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgLSBUaGUga2V5IHRvIGZpbmQgKGNhc2UtaW5zZW5zaXRpdmUpLlxuICogQHJldHVybnMgez9zdHJpbmd9IFRoZSBhY3R1YWwga2V5IG5hbWUgaWYgZm91bmQsIG90aGVyd2lzZSBudWxsLlxuICovXG5mdW5jdGlvbiBmaW5kS2V5KG9iaiwga2V5KSB7XG4gIGlmIChpc0J1ZmZlcihvYmopKSB7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICBrZXkgPSBrZXkudG9Mb3dlckNhc2UoKTtcbiAgY29uc3Qga2V5cyA9IE9iamVjdC5rZXlzKG9iaik7XG4gIGxldCBpID0ga2V5cy5sZW5ndGg7XG4gIGxldCBfa2V5O1xuICB3aGlsZSAoaS0tID4gMCkge1xuICAgIF9rZXkgPSBrZXlzW2ldO1xuICAgIGlmIChrZXkgPT09IF9rZXkudG9Mb3dlckNhc2UoKSkge1xuICAgICAgcmV0dXJuIF9rZXk7XG4gICAgfVxuICB9XG4gIHJldHVybiBudWxsO1xufVxuXG5jb25zdCBfZ2xvYmFsID0gKCgpID0+IHtcbiAgLyplc2xpbnQgbm8tdW5kZWY6MCovXG4gIGlmICh0eXBlb2YgZ2xvYmFsVGhpcyAhPT0gJ3VuZGVmaW5lZCcpIHJldHVybiBnbG9iYWxUaGlzO1xuICByZXR1cm4gdHlwZW9mIHNlbGYgIT09ICd1bmRlZmluZWQnID8gc2VsZiA6IHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnID8gd2luZG93IDogZ2xvYmFsO1xufSkoKTtcblxuY29uc3QgaXNDb250ZXh0RGVmaW5lZCA9IChjb250ZXh0KSA9PiAhaXNVbmRlZmluZWQoY29udGV4dCkgJiYgY29udGV4dCAhPT0gX2dsb2JhbDtcblxuLyoqXG4gKiBBY2NlcHRzIHZhcmFyZ3MgZXhwZWN0aW5nIGVhY2ggYXJndW1lbnQgdG8gYmUgYW4gb2JqZWN0LCB0aGVuXG4gKiBpbW11dGFibHkgbWVyZ2VzIHRoZSBwcm9wZXJ0aWVzIG9mIGVhY2ggb2JqZWN0IGFuZCByZXR1cm5zIHJlc3VsdC5cbiAqXG4gKiBXaGVuIG11bHRpcGxlIG9iamVjdHMgY29udGFpbiB0aGUgc2FtZSBrZXkgdGhlIGxhdGVyIG9iamVjdCBpblxuICogdGhlIGFyZ3VtZW50cyBsaXN0IHdpbGwgdGFrZSBwcmVjZWRlbmNlLlxuICpcbiAqIEV4YW1wbGU6XG4gKlxuICogYGBganNcbiAqIGNvbnN0IHJlc3VsdCA9IG1lcmdlKHtmb286IDEyM30sIHtmb286IDQ1Nn0pO1xuICogY29uc29sZS5sb2cocmVzdWx0LmZvbyk7IC8vIG91dHB1dHMgNDU2XG4gKiBgYGBcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqMSBPYmplY3QgdG8gbWVyZ2VcbiAqXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBSZXN1bHQgb2YgYWxsIG1lcmdlIHByb3BlcnRpZXNcbiAqL1xuZnVuY3Rpb24gbWVyZ2UoLi4ub2Jqcykge1xuICBjb25zdCB7IGNhc2VsZXNzLCBza2lwVW5kZWZpbmVkIH0gPSAoaXNDb250ZXh0RGVmaW5lZCh0aGlzKSAmJiB0aGlzKSB8fCB7fTtcbiAgY29uc3QgcmVzdWx0ID0ge307XG4gIGNvbnN0IGFzc2lnblZhbHVlID0gKHZhbCwga2V5KSA9PiB7XG4gICAgLy8gU2tpcCBkYW5nZXJvdXMgcHJvcGVydHkgbmFtZXMgdG8gcHJldmVudCBwcm90b3R5cGUgcG9sbHV0aW9uXG4gICAgaWYgKGtleSA9PT0gJ19fcHJvdG9fXycgfHwga2V5ID09PSAnY29uc3RydWN0b3InIHx8IGtleSA9PT0gJ3Byb3RvdHlwZScpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCB0YXJnZXRLZXkgPSAoY2FzZWxlc3MgJiYgZmluZEtleShyZXN1bHQsIGtleSkpIHx8IGtleTtcbiAgICAvLyBSZWFkIHZpYSBvd24tcHJvcCBvbmx5IOKAlCBhIGJhcmUgYHJlc3VsdFt0YXJnZXRLZXldYCB3YWxrcyB0aGUgcHJvdG90eXBlXG4gICAgLy8gY2hhaW4sIHNvIGEgcG9sbHV0ZWQgT2JqZWN0LnByb3RvdHlwZSB2YWx1ZSBjb3VsZCBzdXJmYWNlIGhlcmUgYW5kIGdldFxuICAgIC8vIGNvcGllZCBpbnRvIHRoZSBtZXJnZWQgcmVzdWx0LlxuICAgIGNvbnN0IGV4aXN0aW5nID0gaGFzT3duUHJvcGVydHkocmVzdWx0LCB0YXJnZXRLZXkpID8gcmVzdWx0W3RhcmdldEtleV0gOiB1bmRlZmluZWQ7XG4gICAgaWYgKGlzUGxhaW5PYmplY3QoZXhpc3RpbmcpICYmIGlzUGxhaW5PYmplY3QodmFsKSkge1xuICAgICAgcmVzdWx0W3RhcmdldEtleV0gPSBtZXJnZShleGlzdGluZywgdmFsKTtcbiAgICB9IGVsc2UgaWYgKGlzUGxhaW5PYmplY3QodmFsKSkge1xuICAgICAgcmVzdWx0W3RhcmdldEtleV0gPSBtZXJnZSh7fSwgdmFsKTtcbiAgICB9IGVsc2UgaWYgKGlzQXJyYXkodmFsKSkge1xuICAgICAgcmVzdWx0W3RhcmdldEtleV0gPSB2YWwuc2xpY2UoKTtcbiAgICB9IGVsc2UgaWYgKCFza2lwVW5kZWZpbmVkIHx8ICFpc1VuZGVmaW5lZCh2YWwpKSB7XG4gICAgICByZXN1bHRbdGFyZ2V0S2V5XSA9IHZhbDtcbiAgICB9XG4gIH07XG5cbiAgZm9yIChsZXQgaSA9IDAsIGwgPSBvYmpzLmxlbmd0aDsgaSA8IGw7IGkrKykge1xuICAgIG9ianNbaV0gJiYgZm9yRWFjaChvYmpzW2ldLCBhc3NpZ25WYWx1ZSk7XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuLyoqXG4gKiBFeHRlbmRzIG9iamVjdCBhIGJ5IG11dGFibHkgYWRkaW5nIHRvIGl0IHRoZSBwcm9wZXJ0aWVzIG9mIG9iamVjdCBiLlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBhIFRoZSBvYmplY3QgdG8gYmUgZXh0ZW5kZWRcbiAqIEBwYXJhbSB7T2JqZWN0fSBiIFRoZSBvYmplY3QgdG8gY29weSBwcm9wZXJ0aWVzIGZyb21cbiAqIEBwYXJhbSB7T2JqZWN0fSB0aGlzQXJnIFRoZSBvYmplY3QgdG8gYmluZCBmdW5jdGlvbiB0b1xuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBbb3B0aW9uc11cbiAqIEBwYXJhbSB7Qm9vbGVhbn0gW29wdGlvbnMuYWxsT3duS2V5c11cbiAqIEByZXR1cm5zIHtPYmplY3R9IFRoZSByZXN1bHRpbmcgdmFsdWUgb2Ygb2JqZWN0IGFcbiAqL1xuY29uc3QgZXh0ZW5kID0gKGEsIGIsIHRoaXNBcmcsIHsgYWxsT3duS2V5cyB9ID0ge30pID0+IHtcbiAgZm9yRWFjaChcbiAgICBiLFxuICAgICh2YWwsIGtleSkgPT4ge1xuICAgICAgaWYgKHRoaXNBcmcgJiYgaXNGdW5jdGlvbih2YWwpKSB7XG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShhLCBrZXksIHtcbiAgICAgICAgICAvLyBOdWxsLXByb3RvIGRlc2NyaXB0b3Igc28gYSBwb2xsdXRlZCBPYmplY3QucHJvdG90eXBlLmdldCBjYW5ub3RcbiAgICAgICAgICAvLyBoaWphY2sgZGVmaW5lUHJvcGVydHkncyBhY2Nlc3Nvci12cy1kYXRhIHJlc29sdXRpb24uXG4gICAgICAgICAgX19wcm90b19fOiBudWxsLFxuICAgICAgICAgIHZhbHVlOiBiaW5kKHZhbCwgdGhpc0FyZyksXG4gICAgICAgICAgd3JpdGFibGU6IHRydWUsXG4gICAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgICAgICBjb25maWd1cmFibGU6IHRydWUsXG4gICAgICAgIH0pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGEsIGtleSwge1xuICAgICAgICAgIF9fcHJvdG9fXzogbnVsbCxcbiAgICAgICAgICB2YWx1ZTogdmFsLFxuICAgICAgICAgIHdyaXRhYmxlOiB0cnVlLFxuICAgICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9LFxuICAgIHsgYWxsT3duS2V5cyB9XG4gICk7XG4gIHJldHVybiBhO1xufTtcblxuLyoqXG4gKiBSZW1vdmUgYnl0ZSBvcmRlciBtYXJrZXIuIFRoaXMgY2F0Y2hlcyBFRiBCQiBCRiAodGhlIFVURi04IEJPTSlcbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gY29udGVudCB3aXRoIEJPTVxuICpcbiAqIEByZXR1cm5zIHtzdHJpbmd9IGNvbnRlbnQgdmFsdWUgd2l0aG91dCBCT01cbiAqL1xuY29uc3Qgc3RyaXBCT00gPSAoY29udGVudCkgPT4ge1xuICBpZiAoY29udGVudC5jaGFyQ29kZUF0KDApID09PSAweGZlZmYpIHtcbiAgICBjb250ZW50ID0gY29udGVudC5zbGljZSgxKTtcbiAgfVxuICByZXR1cm4gY29udGVudDtcbn07XG5cbi8qKlxuICogSW5oZXJpdCB0aGUgcHJvdG90eXBlIG1ldGhvZHMgZnJvbSBvbmUgY29uc3RydWN0b3IgaW50byBhbm90aGVyXG4gKiBAcGFyYW0ge2Z1bmN0aW9ufSBjb25zdHJ1Y3RvclxuICogQHBhcmFtIHtmdW5jdGlvbn0gc3VwZXJDb25zdHJ1Y3RvclxuICogQHBhcmFtIHtvYmplY3R9IFtwcm9wc11cbiAqIEBwYXJhbSB7b2JqZWN0fSBbZGVzY3JpcHRvcnNdXG4gKlxuICogQHJldHVybnMge3ZvaWR9XG4gKi9cbmNvbnN0IGluaGVyaXRzID0gKGNvbnN0cnVjdG9yLCBzdXBlckNvbnN0cnVjdG9yLCBwcm9wcywgZGVzY3JpcHRvcnMpID0+IHtcbiAgY29uc3RydWN0b3IucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShzdXBlckNvbnN0cnVjdG9yLnByb3RvdHlwZSwgZGVzY3JpcHRvcnMpO1xuICBPYmplY3QuZGVmaW5lUHJvcGVydHkoY29uc3RydWN0b3IucHJvdG90eXBlLCAnY29uc3RydWN0b3InLCB7XG4gICAgX19wcm90b19fOiBudWxsLFxuICAgIHZhbHVlOiBjb25zdHJ1Y3RvcixcbiAgICB3cml0YWJsZTogdHJ1ZSxcbiAgICBlbnVtZXJhYmxlOiBmYWxzZSxcbiAgICBjb25maWd1cmFibGU6IHRydWUsXG4gIH0pO1xuICBPYmplY3QuZGVmaW5lUHJvcGVydHkoY29uc3RydWN0b3IsICdzdXBlcicsIHtcbiAgICBfX3Byb3RvX186IG51bGwsXG4gICAgdmFsdWU6IHN1cGVyQ29uc3RydWN0b3IucHJvdG90eXBlLFxuICB9KTtcbiAgcHJvcHMgJiYgT2JqZWN0LmFzc2lnbihjb25zdHJ1Y3Rvci5wcm90b3R5cGUsIHByb3BzKTtcbn07XG5cbi8qKlxuICogUmVzb2x2ZSBvYmplY3Qgd2l0aCBkZWVwIHByb3RvdHlwZSBjaGFpbiB0byBhIGZsYXQgb2JqZWN0XG4gKiBAcGFyYW0ge09iamVjdH0gc291cmNlT2JqIHNvdXJjZSBvYmplY3RcbiAqIEBwYXJhbSB7T2JqZWN0fSBbZGVzdE9ial1cbiAqIEBwYXJhbSB7RnVuY3Rpb258Qm9vbGVhbn0gW2ZpbHRlcl1cbiAqIEBwYXJhbSB7RnVuY3Rpb259IFtwcm9wRmlsdGVyXVxuICpcbiAqIEByZXR1cm5zIHtPYmplY3R9XG4gKi9cbmNvbnN0IHRvRmxhdE9iamVjdCA9IChzb3VyY2VPYmosIGRlc3RPYmosIGZpbHRlciwgcHJvcEZpbHRlcikgPT4ge1xuICBsZXQgcHJvcHM7XG4gIGxldCBpO1xuICBsZXQgcHJvcDtcbiAgY29uc3QgbWVyZ2VkID0ge307XG5cbiAgZGVzdE9iaiA9IGRlc3RPYmogfHwge307XG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1lcS1udWxsLGVxZXFlcVxuICBpZiAoc291cmNlT2JqID09IG51bGwpIHJldHVybiBkZXN0T2JqO1xuXG4gIGRvIHtcbiAgICBwcm9wcyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKHNvdXJjZU9iaik7XG4gICAgaSA9IHByb3BzLmxlbmd0aDtcbiAgICB3aGlsZSAoaS0tID4gMCkge1xuICAgICAgcHJvcCA9IHByb3BzW2ldO1xuICAgICAgaWYgKCghcHJvcEZpbHRlciB8fCBwcm9wRmlsdGVyKHByb3AsIHNvdXJjZU9iaiwgZGVzdE9iaikpICYmICFtZXJnZWRbcHJvcF0pIHtcbiAgICAgICAgZGVzdE9ialtwcm9wXSA9IHNvdXJjZU9ialtwcm9wXTtcbiAgICAgICAgbWVyZ2VkW3Byb3BdID0gdHJ1ZTtcbiAgICAgIH1cbiAgICB9XG4gICAgc291cmNlT2JqID0gZmlsdGVyICE9PSBmYWxzZSAmJiBnZXRQcm90b3R5cGVPZihzb3VyY2VPYmopO1xuICB9IHdoaWxlIChzb3VyY2VPYmogJiYgKCFmaWx0ZXIgfHwgZmlsdGVyKHNvdXJjZU9iaiwgZGVzdE9iaikpICYmIHNvdXJjZU9iaiAhPT0gT2JqZWN0LnByb3RvdHlwZSk7XG5cbiAgcmV0dXJuIGRlc3RPYmo7XG59O1xuXG4vKipcbiAqIERldGVybWluZXMgd2hldGhlciBhIHN0cmluZyBlbmRzIHdpdGggdGhlIGNoYXJhY3RlcnMgb2YgYSBzcGVjaWZpZWQgc3RyaW5nXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IHN0clxuICogQHBhcmFtIHtTdHJpbmd9IHNlYXJjaFN0cmluZ1xuICogQHBhcmFtIHtOdW1iZXJ9IFtwb3NpdGlvbj0gMF1cbiAqXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAqL1xuY29uc3QgZW5kc1dpdGggPSAoc3RyLCBzZWFyY2hTdHJpbmcsIHBvc2l0aW9uKSA9PiB7XG4gIHN0ciA9IFN0cmluZyhzdHIpO1xuICBpZiAocG9zaXRpb24gPT09IHVuZGVmaW5lZCB8fCBwb3NpdGlvbiA+IHN0ci5sZW5ndGgpIHtcbiAgICBwb3NpdGlvbiA9IHN0ci5sZW5ndGg7XG4gIH1cbiAgcG9zaXRpb24gLT0gc2VhcmNoU3RyaW5nLmxlbmd0aDtcbiAgY29uc3QgbGFzdEluZGV4ID0gc3RyLmluZGV4T2Yoc2VhcmNoU3RyaW5nLCBwb3NpdGlvbik7XG4gIHJldHVybiBsYXN0SW5kZXggIT09IC0xICYmIGxhc3RJbmRleCA9PT0gcG9zaXRpb247XG59O1xuXG4vKipcbiAqIFJldHVybnMgbmV3IGFycmF5IGZyb20gYXJyYXkgbGlrZSBvYmplY3Qgb3IgbnVsbCBpZiBmYWlsZWRcbiAqXG4gKiBAcGFyYW0geyp9IFt0aGluZ11cbiAqXG4gKiBAcmV0dXJucyB7P0FycmF5fVxuICovXG5jb25zdCB0b0FycmF5ID0gKHRoaW5nKSA9PiB7XG4gIGlmICghdGhpbmcpIHJldHVybiBudWxsO1xuICBpZiAoaXNBcnJheSh0aGluZykpIHJldHVybiB0aGluZztcbiAgbGV0IGkgPSB0aGluZy5sZW5ndGg7XG4gIGlmICghaXNOdW1iZXIoaSkpIHJldHVybiBudWxsO1xuICBjb25zdCBhcnIgPSBuZXcgQXJyYXkoaSk7XG4gIHdoaWxlIChpLS0gPiAwKSB7XG4gICAgYXJyW2ldID0gdGhpbmdbaV07XG4gIH1cbiAgcmV0dXJuIGFycjtcbn07XG5cbi8qKlxuICogQ2hlY2tpbmcgaWYgdGhlIFVpbnQ4QXJyYXkgZXhpc3RzIGFuZCBpZiBpdCBkb2VzLCBpdCByZXR1cm5zIGEgZnVuY3Rpb24gdGhhdCBjaGVja3MgaWYgdGhlXG4gKiB0aGluZyBwYXNzZWQgaW4gaXMgYW4gaW5zdGFuY2Ugb2YgVWludDhBcnJheVxuICpcbiAqIEBwYXJhbSB7VHlwZWRBcnJheX1cbiAqXG4gKiBAcmV0dXJucyB7QXJyYXl9XG4gKi9cbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBmdW5jLW5hbWVzXG5jb25zdCBpc1R5cGVkQXJyYXkgPSAoKFR5cGVkQXJyYXkpID0+IHtcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGZ1bmMtbmFtZXNcbiAgcmV0dXJuICh0aGluZykgPT4ge1xuICAgIHJldHVybiBUeXBlZEFycmF5ICYmIHRoaW5nIGluc3RhbmNlb2YgVHlwZWRBcnJheTtcbiAgfTtcbn0pKHR5cGVvZiBVaW50OEFycmF5ICE9PSAndW5kZWZpbmVkJyAmJiBnZXRQcm90b3R5cGVPZihVaW50OEFycmF5KSk7XG5cbi8qKlxuICogRm9yIGVhY2ggZW50cnkgaW4gdGhlIG9iamVjdCwgY2FsbCB0aGUgZnVuY3Rpb24gd2l0aCB0aGUga2V5IGFuZCB2YWx1ZS5cbiAqXG4gKiBAcGFyYW0ge09iamVjdDxhbnksIGFueT59IG9iaiAtIFRoZSBvYmplY3QgdG8gaXRlcmF0ZSBvdmVyLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gZm4gLSBUaGUgZnVuY3Rpb24gdG8gY2FsbCBmb3IgZWFjaCBlbnRyeS5cbiAqXG4gKiBAcmV0dXJucyB7dm9pZH1cbiAqL1xuY29uc3QgZm9yRWFjaEVudHJ5ID0gKG9iaiwgZm4pID0+IHtcbiAgY29uc3QgZ2VuZXJhdG9yID0gb2JqICYmIG9ialtpdGVyYXRvcl07XG5cbiAgY29uc3QgX2l0ZXJhdG9yID0gZ2VuZXJhdG9yLmNhbGwob2JqKTtcblxuICBsZXQgcmVzdWx0O1xuXG4gIHdoaWxlICgocmVzdWx0ID0gX2l0ZXJhdG9yLm5leHQoKSkgJiYgIXJlc3VsdC5kb25lKSB7XG4gICAgY29uc3QgcGFpciA9IHJlc3VsdC52YWx1ZTtcbiAgICBmbi5jYWxsKG9iaiwgcGFpclswXSwgcGFpclsxXSk7XG4gIH1cbn07XG5cbi8qKlxuICogSXQgdGFrZXMgYSByZWd1bGFyIGV4cHJlc3Npb24gYW5kIGEgc3RyaW5nLCBhbmQgcmV0dXJucyBhbiBhcnJheSBvZiBhbGwgdGhlIG1hdGNoZXNcbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gcmVnRXhwIC0gVGhlIHJlZ3VsYXIgZXhwcmVzc2lvbiB0byBtYXRjaCBhZ2FpbnN0LlxuICogQHBhcmFtIHtzdHJpbmd9IHN0ciAtIFRoZSBzdHJpbmcgdG8gc2VhcmNoLlxuICpcbiAqIEByZXR1cm5zIHtBcnJheTxib29sZWFuPn1cbiAqL1xuY29uc3QgbWF0Y2hBbGwgPSAocmVnRXhwLCBzdHIpID0+IHtcbiAgbGV0IG1hdGNoZXM7XG4gIGNvbnN0IGFyciA9IFtdO1xuXG4gIHdoaWxlICgobWF0Y2hlcyA9IHJlZ0V4cC5leGVjKHN0cikpICE9PSBudWxsKSB7XG4gICAgYXJyLnB1c2gobWF0Y2hlcyk7XG4gIH1cblxuICByZXR1cm4gYXJyO1xufTtcblxuLyogQ2hlY2tpbmcgaWYgdGhlIGtpbmRPZlRlc3QgZnVuY3Rpb24gcmV0dXJucyB0cnVlIHdoZW4gcGFzc2VkIGFuIEhUTUxGb3JtRWxlbWVudC4gKi9cbmNvbnN0IGlzSFRNTEZvcm0gPSBraW5kT2ZUZXN0KCdIVE1MRm9ybUVsZW1lbnQnKTtcblxuY29uc3QgdG9DYW1lbENhc2UgPSAoc3RyKSA9PiB7XG4gIHJldHVybiBzdHIudG9Mb3dlckNhc2UoKS5yZXBsYWNlKC9bLV9cXHNdKFthLXpcXGRdKShcXHcqKS9nLCBmdW5jdGlvbiByZXBsYWNlcihtLCBwMSwgcDIpIHtcbiAgICByZXR1cm4gcDEudG9VcHBlckNhc2UoKSArIHAyO1xuICB9KTtcbn07XG5cbi8qIENyZWF0aW5nIGEgZnVuY3Rpb24gdGhhdCB3aWxsIGNoZWNrIGlmIGFuIG9iamVjdCBoYXMgYSBwcm9wZXJ0eS4gKi9cbmNvbnN0IGhhc093blByb3BlcnR5ID0gKFxuICAoeyBoYXNPd25Qcm9wZXJ0eSB9KSA9PlxuICAob2JqLCBwcm9wKSA9PlxuICAgIGhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKVxuKShPYmplY3QucHJvdG90eXBlKTtcblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhIFJlZ0V4cCBvYmplY3RcbiAqXG4gKiBAcGFyYW0geyp9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICpcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGEgUmVnRXhwIG9iamVjdCwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmNvbnN0IGlzUmVnRXhwID0ga2luZE9mVGVzdCgnUmVnRXhwJyk7XG5cbmNvbnN0IHJlZHVjZURlc2NyaXB0b3JzID0gKG9iaiwgcmVkdWNlcikgPT4ge1xuICBjb25zdCBkZXNjcmlwdG9ycyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3JzKG9iaik7XG4gIGNvbnN0IHJlZHVjZWREZXNjcmlwdG9ycyA9IHt9O1xuXG4gIGZvckVhY2goZGVzY3JpcHRvcnMsIChkZXNjcmlwdG9yLCBuYW1lKSA9PiB7XG4gICAgbGV0IHJldDtcbiAgICBpZiAoKHJldCA9IHJlZHVjZXIoZGVzY3JpcHRvciwgbmFtZSwgb2JqKSkgIT09IGZhbHNlKSB7XG4gICAgICByZWR1Y2VkRGVzY3JpcHRvcnNbbmFtZV0gPSByZXQgfHwgZGVzY3JpcHRvcjtcbiAgICB9XG4gIH0pO1xuXG4gIE9iamVjdC5kZWZpbmVQcm9wZXJ0aWVzKG9iaiwgcmVkdWNlZERlc2NyaXB0b3JzKTtcbn07XG5cbi8qKlxuICogTWFrZXMgYWxsIG1ldGhvZHMgcmVhZC1vbmx5XG4gKiBAcGFyYW0ge09iamVjdH0gb2JqXG4gKi9cblxuY29uc3QgZnJlZXplTWV0aG9kcyA9IChvYmopID0+IHtcbiAgcmVkdWNlRGVzY3JpcHRvcnMob2JqLCAoZGVzY3JpcHRvciwgbmFtZSkgPT4ge1xuICAgIC8vIHNraXAgcmVzdHJpY3RlZCBwcm9wcyBpbiBzdHJpY3QgbW9kZVxuICAgIGlmIChpc0Z1bmN0aW9uKG9iaikgJiYgWydhcmd1bWVudHMnLCAnY2FsbGVyJywgJ2NhbGxlZSddLmluY2x1ZGVzKG5hbWUpKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgY29uc3QgdmFsdWUgPSBvYmpbbmFtZV07XG5cbiAgICBpZiAoIWlzRnVuY3Rpb24odmFsdWUpKSByZXR1cm47XG5cbiAgICBkZXNjcmlwdG9yLmVudW1lcmFibGUgPSBmYWxzZTtcblxuICAgIGlmICgnd3JpdGFibGUnIGluIGRlc2NyaXB0b3IpIHtcbiAgICAgIGRlc2NyaXB0b3Iud3JpdGFibGUgPSBmYWxzZTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpZiAoIWRlc2NyaXB0b3Iuc2V0KSB7XG4gICAgICBkZXNjcmlwdG9yLnNldCA9ICgpID0+IHtcbiAgICAgICAgdGhyb3cgRXJyb3IoXCJDYW4gbm90IHJld3JpdGUgcmVhZC1vbmx5IG1ldGhvZCAnXCIgKyBuYW1lICsgXCInXCIpO1xuICAgICAgfTtcbiAgICB9XG4gIH0pO1xufTtcblxuLyoqXG4gKiBDb252ZXJ0cyBhbiBhcnJheSBvciBhIGRlbGltaXRlZCBzdHJpbmcgaW50byBhbiBvYmplY3Qgc2V0IHdpdGggdmFsdWVzIGFzIGtleXMgYW5kIHRydWUgYXMgdmFsdWVzLlxuICogVXNlZnVsIGZvciBmYXN0IG1lbWJlcnNoaXAgY2hlY2tzLlxuICpcbiAqIEBwYXJhbSB7QXJyYXl8c3RyaW5nfSBhcnJheU9yU3RyaW5nIC0gVGhlIGFycmF5IG9yIHN0cmluZyB0byBjb252ZXJ0LlxuICogQHBhcmFtIHtzdHJpbmd9IGRlbGltaXRlciAtIFRoZSBkZWxpbWl0ZXIgdG8gdXNlIGlmIGlucHV0IGlzIGEgc3RyaW5nLlxuICogQHJldHVybnMge09iamVjdH0gQW4gb2JqZWN0IHdpdGgga2V5cyBmcm9tIHRoZSBhcnJheSBvciBzdHJpbmcsIHZhbHVlcyBzZXQgdG8gdHJ1ZS5cbiAqL1xuY29uc3QgdG9PYmplY3RTZXQgPSAoYXJyYXlPclN0cmluZywgZGVsaW1pdGVyKSA9PiB7XG4gIGNvbnN0IG9iaiA9IHt9O1xuXG4gIGNvbnN0IGRlZmluZSA9IChhcnIpID0+IHtcbiAgICBhcnIuZm9yRWFjaCgodmFsdWUpID0+IHtcbiAgICAgIG9ialt2YWx1ZV0gPSB0cnVlO1xuICAgIH0pO1xuICB9O1xuXG4gIGlzQXJyYXkoYXJyYXlPclN0cmluZykgPyBkZWZpbmUoYXJyYXlPclN0cmluZykgOiBkZWZpbmUoU3RyaW5nKGFycmF5T3JTdHJpbmcpLnNwbGl0KGRlbGltaXRlcikpO1xuXG4gIHJldHVybiBvYmo7XG59O1xuXG5jb25zdCBub29wID0gKCkgPT4ge307XG5cbmNvbnN0IHRvRmluaXRlTnVtYmVyID0gKHZhbHVlLCBkZWZhdWx0VmFsdWUpID0+IHtcbiAgcmV0dXJuIHZhbHVlICE9IG51bGwgJiYgTnVtYmVyLmlzRmluaXRlKCh2YWx1ZSA9ICt2YWx1ZSkpID8gdmFsdWUgOiBkZWZhdWx0VmFsdWU7XG59O1xuXG4vKipcbiAqIElmIHRoZSB0aGluZyBpcyBhIEZvcm1EYXRhIG9iamVjdCwgcmV0dXJuIHRydWUsIG90aGVyd2lzZSByZXR1cm4gZmFsc2UuXG4gKlxuICogQHBhcmFtIHt1bmtub3dufSB0aGluZyAtIFRoZSB0aGluZyB0byBjaGVjay5cbiAqXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAqL1xuZnVuY3Rpb24gaXNTcGVjQ29tcGxpYW50Rm9ybSh0aGluZykge1xuICByZXR1cm4gISEoXG4gICAgdGhpbmcgJiZcbiAgICBpc0Z1bmN0aW9uKHRoaW5nLmFwcGVuZCkgJiZcbiAgICB0aGluZ1t0b1N0cmluZ1RhZ10gPT09ICdGb3JtRGF0YScgJiZcbiAgICB0aGluZ1tpdGVyYXRvcl1cbiAgKTtcbn1cblxuLyoqXG4gKiBSZWN1cnNpdmVseSBjb252ZXJ0cyBhbiBvYmplY3QgdG8gYSBKU09OLWNvbXBhdGlibGUgb2JqZWN0LCBoYW5kbGluZyBjaXJjdWxhciByZWZlcmVuY2VzIGFuZCBCdWZmZXJzLlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmogLSBUaGUgb2JqZWN0IHRvIGNvbnZlcnQuXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBUaGUgSlNPTi1jb21wYXRpYmxlIG9iamVjdC5cbiAqL1xuY29uc3QgdG9KU09OT2JqZWN0ID0gKG9iaikgPT4ge1xuICBjb25zdCBzdGFjayA9IG5ldyBBcnJheSgxMCk7XG5cbiAgY29uc3QgdmlzaXQgPSAoc291cmNlLCBpKSA9PiB7XG4gICAgaWYgKGlzT2JqZWN0KHNvdXJjZSkpIHtcbiAgICAgIGlmIChzdGFjay5pbmRleE9mKHNvdXJjZSkgPj0gMCkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIC8vQnVmZmVyIGNoZWNrXG4gICAgICBpZiAoaXNCdWZmZXIoc291cmNlKSkge1xuICAgICAgICByZXR1cm4gc291cmNlO1xuICAgICAgfVxuXG4gICAgICBpZiAoISgndG9KU09OJyBpbiBzb3VyY2UpKSB7XG4gICAgICAgIHN0YWNrW2ldID0gc291cmNlO1xuICAgICAgICBjb25zdCB0YXJnZXQgPSBpc0FycmF5KHNvdXJjZSkgPyBbXSA6IHt9O1xuXG4gICAgICAgIGZvckVhY2goc291cmNlLCAodmFsdWUsIGtleSkgPT4ge1xuICAgICAgICAgIGNvbnN0IHJlZHVjZWRWYWx1ZSA9IHZpc2l0KHZhbHVlLCBpICsgMSk7XG4gICAgICAgICAgIWlzVW5kZWZpbmVkKHJlZHVjZWRWYWx1ZSkgJiYgKHRhcmdldFtrZXldID0gcmVkdWNlZFZhbHVlKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgc3RhY2tbaV0gPSB1bmRlZmluZWQ7XG5cbiAgICAgICAgcmV0dXJuIHRhcmdldDtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gc291cmNlO1xuICB9O1xuXG4gIHJldHVybiB2aXNpdChvYmosIDApO1xufTtcblxuLyoqXG4gKiBEZXRlcm1pbmVzIGlmIGEgdmFsdWUgaXMgYW4gYXN5bmMgZnVuY3Rpb24uXG4gKlxuICogQHBhcmFtIHsqfSB0aGluZyAtIFRoZSB2YWx1ZSB0byB0ZXN0LlxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYW4gYXN5bmMgZnVuY3Rpb24sIG90aGVyd2lzZSBmYWxzZS5cbiAqL1xuY29uc3QgaXNBc3luY0ZuID0ga2luZE9mVGVzdCgnQXN5bmNGdW5jdGlvbicpO1xuXG4vKipcbiAqIERldGVybWluZXMgaWYgYSB2YWx1ZSBpcyB0aGVuYWJsZSAoaGFzIHRoZW4gYW5kIGNhdGNoIG1ldGhvZHMpLlxuICpcbiAqIEBwYXJhbSB7Kn0gdGhpbmcgLSBUaGUgdmFsdWUgdG8gdGVzdC5cbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIHRoZW5hYmxlLCBvdGhlcndpc2UgZmFsc2UuXG4gKi9cbmNvbnN0IGlzVGhlbmFibGUgPSAodGhpbmcpID0+XG4gIHRoaW5nICYmXG4gIChpc09iamVjdCh0aGluZykgfHwgaXNGdW5jdGlvbih0aGluZykpICYmXG4gIGlzRnVuY3Rpb24odGhpbmcudGhlbikgJiZcbiAgaXNGdW5jdGlvbih0aGluZy5jYXRjaCk7XG5cbi8vIG9yaWdpbmFsIGNvZGVcbi8vIGh0dHBzOi8vZ2l0aHViLmNvbS9EaWdpdGFsQnJhaW5KUy9BeGlvc1Byb21pc2UvYmxvYi8xNmRlYWIxMzcxMGVjMDk3Nzk5MjIxMzFmM2ZhNTk1NDMyMGY4M2FiL2xpYi91dGlscy5qcyNMMTEtTDM0XG5cbi8qKlxuICogUHJvdmlkZXMgYSBjcm9zcy1wbGF0Zm9ybSBzZXRJbW1lZGlhdGUgaW1wbGVtZW50YXRpb24uXG4gKiBVc2VzIG5hdGl2ZSBzZXRJbW1lZGlhdGUgaWYgYXZhaWxhYmxlLCBvdGhlcndpc2UgZmFsbHMgYmFjayB0byBwb3N0TWVzc2FnZSBvciBzZXRUaW1lb3V0LlxuICpcbiAqIEBwYXJhbSB7Ym9vbGVhbn0gc2V0SW1tZWRpYXRlU3VwcG9ydGVkIC0gV2hldGhlciBzZXRJbW1lZGlhdGUgaXMgc3VwcG9ydGVkLlxuICogQHBhcmFtIHtib29sZWFufSBwb3N0TWVzc2FnZVN1cHBvcnRlZCAtIFdoZXRoZXIgcG9zdE1lc3NhZ2UgaXMgc3VwcG9ydGVkLlxuICogQHJldHVybnMge0Z1bmN0aW9ufSBBIGZ1bmN0aW9uIHRvIHNjaGVkdWxlIGEgY2FsbGJhY2sgYXN5bmNocm9ub3VzbHkuXG4gKi9cbmNvbnN0IF9zZXRJbW1lZGlhdGUgPSAoKHNldEltbWVkaWF0ZVN1cHBvcnRlZCwgcG9zdE1lc3NhZ2VTdXBwb3J0ZWQpID0+IHtcbiAgaWYgKHNldEltbWVkaWF0ZVN1cHBvcnRlZCkge1xuICAgIHJldHVybiBzZXRJbW1lZGlhdGU7XG4gIH1cblxuICByZXR1cm4gcG9zdE1lc3NhZ2VTdXBwb3J0ZWRcbiAgICA/ICgodG9rZW4sIGNhbGxiYWNrcykgPT4ge1xuICAgICAgICBfZ2xvYmFsLmFkZEV2ZW50TGlzdGVuZXIoXG4gICAgICAgICAgJ21lc3NhZ2UnLFxuICAgICAgICAgICh7IHNvdXJjZSwgZGF0YSB9KSA9PiB7XG4gICAgICAgICAgICBpZiAoc291cmNlID09PSBfZ2xvYmFsICYmIGRhdGEgPT09IHRva2VuKSB7XG4gICAgICAgICAgICAgIGNhbGxiYWNrcy5sZW5ndGggJiYgY2FsbGJhY2tzLnNoaWZ0KCkoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9LFxuICAgICAgICAgIGZhbHNlXG4gICAgICAgICk7XG5cbiAgICAgICAgcmV0dXJuIChjYikgPT4ge1xuICAgICAgICAgIGNhbGxiYWNrcy5wdXNoKGNiKTtcbiAgICAgICAgICBfZ2xvYmFsLnBvc3RNZXNzYWdlKHRva2VuLCAnKicpO1xuICAgICAgICB9O1xuICAgICAgfSkoYGF4aW9zQCR7TWF0aC5yYW5kb20oKX1gLCBbXSlcbiAgICA6IChjYikgPT4gc2V0VGltZW91dChjYik7XG59KSh0eXBlb2Ygc2V0SW1tZWRpYXRlID09PSAnZnVuY3Rpb24nLCBpc0Z1bmN0aW9uKF9nbG9iYWwucG9zdE1lc3NhZ2UpKTtcblxuLyoqXG4gKiBTY2hlZHVsZXMgYSBtaWNyb3Rhc2sgb3IgYXN5bmNocm9ub3VzIGNhbGxiYWNrIGFzIHNvb24gYXMgcG9zc2libGUuXG4gKiBVc2VzIHF1ZXVlTWljcm90YXNrIGlmIGF2YWlsYWJsZSwgb3RoZXJ3aXNlIGZhbGxzIGJhY2sgdG8gcHJvY2Vzcy5uZXh0VGljayBvciBfc2V0SW1tZWRpYXRlLlxuICpcbiAqIEB0eXBlIHtGdW5jdGlvbn1cbiAqL1xuY29uc3QgYXNhcCA9XG4gIHR5cGVvZiBxdWV1ZU1pY3JvdGFzayAhPT0gJ3VuZGVmaW5lZCdcbiAgICA/IHF1ZXVlTWljcm90YXNrLmJpbmQoX2dsb2JhbClcbiAgICA6ICh0eXBlb2YgcHJvY2VzcyAhPT0gJ3VuZGVmaW5lZCcgJiYgcHJvY2Vzcy5uZXh0VGljaykgfHwgX3NldEltbWVkaWF0ZTtcblxuLy8gKioqKioqKioqKioqKioqKioqKioqXG5cbmNvbnN0IGlzSXRlcmFibGUgPSAodGhpbmcpID0+IHRoaW5nICE9IG51bGwgJiYgaXNGdW5jdGlvbih0aGluZ1tpdGVyYXRvcl0pO1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gIGlzQXJyYXksXG4gIGlzQXJyYXlCdWZmZXIsXG4gIGlzQnVmZmVyLFxuICBpc0Zvcm1EYXRhLFxuICBpc0FycmF5QnVmZmVyVmlldyxcbiAgaXNTdHJpbmcsXG4gIGlzTnVtYmVyLFxuICBpc0Jvb2xlYW4sXG4gIGlzT2JqZWN0LFxuICBpc1BsYWluT2JqZWN0LFxuICBpc0VtcHR5T2JqZWN0LFxuICBpc1JlYWRhYmxlU3RyZWFtLFxuICBpc1JlcXVlc3QsXG4gIGlzUmVzcG9uc2UsXG4gIGlzSGVhZGVycyxcbiAgaXNVbmRlZmluZWQsXG4gIGlzRGF0ZSxcbiAgaXNGaWxlLFxuICBpc1JlYWN0TmF0aXZlQmxvYixcbiAgaXNSZWFjdE5hdGl2ZSxcbiAgaXNCbG9iLFxuICBpc1JlZ0V4cCxcbiAgaXNGdW5jdGlvbixcbiAgaXNTdHJlYW0sXG4gIGlzVVJMU2VhcmNoUGFyYW1zLFxuICBpc1R5cGVkQXJyYXksXG4gIGlzRmlsZUxpc3QsXG4gIGZvckVhY2gsXG4gIG1lcmdlLFxuICBleHRlbmQsXG4gIHRyaW0sXG4gIHN0cmlwQk9NLFxuICBpbmhlcml0cyxcbiAgdG9GbGF0T2JqZWN0LFxuICBraW5kT2YsXG4gIGtpbmRPZlRlc3QsXG4gIGVuZHNXaXRoLFxuICB0b0FycmF5LFxuICBmb3JFYWNoRW50cnksXG4gIG1hdGNoQWxsLFxuICBpc0hUTUxGb3JtLFxuICBoYXNPd25Qcm9wZXJ0eSxcbiAgaGFzT3duUHJvcDogaGFzT3duUHJvcGVydHksIC8vIGFuIGFsaWFzIHRvIGF2b2lkIEVTTGludCBuby1wcm90b3R5cGUtYnVpbHRpbnMgZGV0ZWN0aW9uXG4gIHJlZHVjZURlc2NyaXB0b3JzLFxuICBmcmVlemVNZXRob2RzLFxuICB0b09iamVjdFNldCxcbiAgdG9DYW1lbENhc2UsXG4gIG5vb3AsXG4gIHRvRmluaXRlTnVtYmVyLFxuICBmaW5kS2V5LFxuICBnbG9iYWw6IF9nbG9iYWwsXG4gIGlzQ29udGV4dERlZmluZWQsXG4gIGlzU3BlY0NvbXBsaWFudEZvcm0sXG4gIHRvSlNPTk9iamVjdCxcbiAgaXNBc3luY0ZuLFxuICBpc1RoZW5hYmxlLFxuICBzZXRJbW1lZGlhdGU6IF9zZXRJbW1lZGlhdGUsXG4gIGFzYXAsXG4gIGlzSXRlcmFibGUsXG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQgdXRpbHMgZnJvbSAnLi4vdXRpbHMuanMnO1xuXG4vLyBSYXdBeGlvc0hlYWRlcnMgd2hvc2UgZHVwbGljYXRlcyBhcmUgaWdub3JlZCBieSBub2RlXG4vLyBjLmYuIGh0dHBzOi8vbm9kZWpzLm9yZy9hcGkvaHR0cC5odG1sI2h0dHBfbWVzc2FnZV9oZWFkZXJzXG5jb25zdCBpZ25vcmVEdXBsaWNhdGVPZiA9IHV0aWxzLnRvT2JqZWN0U2V0KFtcbiAgJ2FnZScsXG4gICdhdXRob3JpemF0aW9uJyxcbiAgJ2NvbnRlbnQtbGVuZ3RoJyxcbiAgJ2NvbnRlbnQtdHlwZScsXG4gICdldGFnJyxcbiAgJ2V4cGlyZXMnLFxuICAnZnJvbScsXG4gICdob3N0JyxcbiAgJ2lmLW1vZGlmaWVkLXNpbmNlJyxcbiAgJ2lmLXVubW9kaWZpZWQtc2luY2UnLFxuICAnbGFzdC1tb2RpZmllZCcsXG4gICdsb2NhdGlvbicsXG4gICdtYXgtZm9yd2FyZHMnLFxuICAncHJveHktYXV0aG9yaXphdGlvbicsXG4gICdyZWZlcmVyJyxcbiAgJ3JldHJ5LWFmdGVyJyxcbiAgJ3VzZXItYWdlbnQnLFxuXSk7XG5cbi8qKlxuICogUGFyc2UgaGVhZGVycyBpbnRvIGFuIG9iamVjdFxuICpcbiAqIGBgYFxuICogRGF0ZTogV2VkLCAyNyBBdWcgMjAxNCAwODo1ODo0OSBHTVRcbiAqIENvbnRlbnQtVHlwZTogYXBwbGljYXRpb24vanNvblxuICogQ29ubmVjdGlvbjoga2VlcC1hbGl2ZVxuICogVHJhbnNmZXItRW5jb2Rpbmc6IGNodW5rZWRcbiAqIGBgYFxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSByYXdIZWFkZXJzIEhlYWRlcnMgbmVlZGluZyB0byBiZSBwYXJzZWRcbiAqXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBIZWFkZXJzIHBhcnNlZCBpbnRvIGFuIG9iamVjdFxuICovXG5leHBvcnQgZGVmYXVsdCAocmF3SGVhZGVycykgPT4ge1xuICBjb25zdCBwYXJzZWQgPSB7fTtcbiAgbGV0IGtleTtcbiAgbGV0IHZhbDtcbiAgbGV0IGk7XG5cbiAgcmF3SGVhZGVycyAmJlxuICAgIHJhd0hlYWRlcnMuc3BsaXQoJ1xcbicpLmZvckVhY2goZnVuY3Rpb24gcGFyc2VyKGxpbmUpIHtcbiAgICAgIGkgPSBsaW5lLmluZGV4T2YoJzonKTtcbiAgICAgIGtleSA9IGxpbmUuc3Vic3RyaW5nKDAsIGkpLnRyaW0oKS50b0xvd2VyQ2FzZSgpO1xuICAgICAgdmFsID0gbGluZS5zdWJzdHJpbmcoaSArIDEpLnRyaW0oKTtcblxuICAgICAgaWYgKCFrZXkgfHwgKHBhcnNlZFtrZXldICYmIGlnbm9yZUR1cGxpY2F0ZU9mW2tleV0pKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgaWYgKGtleSA9PT0gJ3NldC1jb29raWUnKSB7XG4gICAgICAgIGlmIChwYXJzZWRba2V5XSkge1xuICAgICAgICAgIHBhcnNlZFtrZXldLnB1c2godmFsKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBwYXJzZWRba2V5XSA9IFt2YWxdO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBwYXJzZWRba2V5XSA9IHBhcnNlZFtrZXldID8gcGFyc2VkW2tleV0gKyAnLCAnICsgdmFsIDogdmFsO1xuICAgICAgfVxuICAgIH0pO1xuXG4gIHJldHVybiBwYXJzZWQ7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQgdXRpbHMgZnJvbSAnLi4vdXRpbHMuanMnO1xuaW1wb3J0IHBhcnNlSGVhZGVycyBmcm9tICcuLi9oZWxwZXJzL3BhcnNlSGVhZGVycy5qcyc7XG5cbmNvbnN0ICRpbnRlcm5hbHMgPSBTeW1ib2woJ2ludGVybmFscycpO1xuXG5jb25zdCBJTlZBTElEX0hFQURFUl9WQUxVRV9DSEFSU19SRSA9IC9bXlxceDA5XFx4MjAtXFx4N0VcXHg4MC1cXHhGRl0vZztcblxuZnVuY3Rpb24gdHJpbVNQb3JIVEFCKHN0cikge1xuICBsZXQgc3RhcnQgPSAwO1xuICBsZXQgZW5kID0gc3RyLmxlbmd0aDtcblxuICB3aGlsZSAoc3RhcnQgPCBlbmQpIHtcbiAgICBjb25zdCBjb2RlID0gc3RyLmNoYXJDb2RlQXQoc3RhcnQpO1xuXG4gICAgaWYgKGNvZGUgIT09IDB4MDkgJiYgY29kZSAhPT0gMHgyMCkge1xuICAgICAgYnJlYWs7XG4gICAgfVxuXG4gICAgc3RhcnQgKz0gMTtcbiAgfVxuXG4gIHdoaWxlIChlbmQgPiBzdGFydCkge1xuICAgIGNvbnN0IGNvZGUgPSBzdHIuY2hhckNvZGVBdChlbmQgLSAxKTtcblxuICAgIGlmIChjb2RlICE9PSAweDA5ICYmIGNvZGUgIT09IDB4MjApIHtcbiAgICAgIGJyZWFrO1xuICAgIH1cblxuICAgIGVuZCAtPSAxO1xuICB9XG5cbiAgcmV0dXJuIHN0YXJ0ID09PSAwICYmIGVuZCA9PT0gc3RyLmxlbmd0aCA/IHN0ciA6IHN0ci5zbGljZShzdGFydCwgZW5kKTtcbn1cblxuZnVuY3Rpb24gbm9ybWFsaXplSGVhZGVyKGhlYWRlcikge1xuICByZXR1cm4gaGVhZGVyICYmIFN0cmluZyhoZWFkZXIpLnRyaW0oKS50b0xvd2VyQ2FzZSgpO1xufVxuXG5mdW5jdGlvbiBzYW5pdGl6ZUhlYWRlclZhbHVlKHN0cikge1xuICByZXR1cm4gdHJpbVNQb3JIVEFCKHN0ci5yZXBsYWNlKElOVkFMSURfSEVBREVSX1ZBTFVFX0NIQVJTX1JFLCAnJykpO1xufVxuXG5mdW5jdGlvbiBub3JtYWxpemVWYWx1ZSh2YWx1ZSkge1xuICBpZiAodmFsdWUgPT09IGZhbHNlIHx8IHZhbHVlID09IG51bGwpIHtcbiAgICByZXR1cm4gdmFsdWU7XG4gIH1cblxuICByZXR1cm4gdXRpbHMuaXNBcnJheSh2YWx1ZSkgPyB2YWx1ZS5tYXAobm9ybWFsaXplVmFsdWUpIDogc2FuaXRpemVIZWFkZXJWYWx1ZShTdHJpbmcodmFsdWUpKTtcbn1cblxuZnVuY3Rpb24gcGFyc2VUb2tlbnMoc3RyKSB7XG4gIGNvbnN0IHRva2VucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gIGNvbnN0IHRva2Vuc1JFID0gLyhbXlxccyw7PV0rKVxccyooPzo9XFxzKihbXiw7XSspKT8vZztcbiAgbGV0IG1hdGNoO1xuXG4gIHdoaWxlICgobWF0Y2ggPSB0b2tlbnNSRS5leGVjKHN0cikpKSB7XG4gICAgdG9rZW5zW21hdGNoWzFdXSA9IG1hdGNoWzJdO1xuICB9XG5cbiAgcmV0dXJuIHRva2Vucztcbn1cblxuY29uc3QgaXNWYWxpZEhlYWRlck5hbWUgPSAoc3RyKSA9PiAvXlstX2EtekEtWjAtOV5gfH4sISMkJSYnKisuXSskLy50ZXN0KHN0ci50cmltKCkpO1xuXG5mdW5jdGlvbiBtYXRjaEhlYWRlclZhbHVlKGNvbnRleHQsIHZhbHVlLCBoZWFkZXIsIGZpbHRlciwgaXNIZWFkZXJOYW1lRmlsdGVyKSB7XG4gIGlmICh1dGlscy5pc0Z1bmN0aW9uKGZpbHRlcikpIHtcbiAgICByZXR1cm4gZmlsdGVyLmNhbGwodGhpcywgdmFsdWUsIGhlYWRlcik7XG4gIH1cblxuICBpZiAoaXNIZWFkZXJOYW1lRmlsdGVyKSB7XG4gICAgdmFsdWUgPSBoZWFkZXI7XG4gIH1cblxuICBpZiAoIXV0aWxzLmlzU3RyaW5nKHZhbHVlKSkgcmV0dXJuO1xuXG4gIGlmICh1dGlscy5pc1N0cmluZyhmaWx0ZXIpKSB7XG4gICAgcmV0dXJuIHZhbHVlLmluZGV4T2YoZmlsdGVyKSAhPT0gLTE7XG4gIH1cblxuICBpZiAodXRpbHMuaXNSZWdFeHAoZmlsdGVyKSkge1xuICAgIHJldHVybiBmaWx0ZXIudGVzdCh2YWx1ZSk7XG4gIH1cbn1cblxuZnVuY3Rpb24gZm9ybWF0SGVhZGVyKGhlYWRlcikge1xuICByZXR1cm4gaGVhZGVyXG4gICAgLnRyaW0oKVxuICAgIC50b0xvd2VyQ2FzZSgpXG4gICAgLnJlcGxhY2UoLyhbYS16XFxkXSkoXFx3KikvZywgKHcsIGNoYXIsIHN0cikgPT4ge1xuICAgICAgcmV0dXJuIGNoYXIudG9VcHBlckNhc2UoKSArIHN0cjtcbiAgICB9KTtcbn1cblxuZnVuY3Rpb24gYnVpbGRBY2Nlc3NvcnMob2JqLCBoZWFkZXIpIHtcbiAgY29uc3QgYWNjZXNzb3JOYW1lID0gdXRpbHMudG9DYW1lbENhc2UoJyAnICsgaGVhZGVyKTtcblxuICBbJ2dldCcsICdzZXQnLCAnaGFzJ10uZm9yRWFjaCgobWV0aG9kTmFtZSkgPT4ge1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvYmosIG1ldGhvZE5hbWUgKyBhY2Nlc3Nvck5hbWUsIHtcbiAgICAgIC8vIE51bGwtcHJvdG8gZGVzY3JpcHRvciBzbyBhIHBvbGx1dGVkIE9iamVjdC5wcm90b3R5cGUuZ2V0IGNhbm5vdCB0dXJuXG4gICAgICAvLyB0aGlzIGRhdGEgZGVzY3JpcHRvciBpbnRvIGFuIGFjY2Vzc29yIGRlc2NyaXB0b3Igb24gdGhlIHdheSBpbi5cbiAgICAgIF9fcHJvdG9fXzogbnVsbCxcbiAgICAgIHZhbHVlOiBmdW5jdGlvbiAoYXJnMSwgYXJnMiwgYXJnMykge1xuICAgICAgICByZXR1cm4gdGhpc1ttZXRob2ROYW1lXS5jYWxsKHRoaXMsIGhlYWRlciwgYXJnMSwgYXJnMiwgYXJnMyk7XG4gICAgICB9LFxuICAgICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICAgIH0pO1xuICB9KTtcbn1cblxuY2xhc3MgQXhpb3NIZWFkZXJzIHtcbiAgY29uc3RydWN0b3IoaGVhZGVycykge1xuICAgIGhlYWRlcnMgJiYgdGhpcy5zZXQoaGVhZGVycyk7XG4gIH1cblxuICBzZXQoaGVhZGVyLCB2YWx1ZU9yUmV3cml0ZSwgcmV3cml0ZSkge1xuICAgIGNvbnN0IHNlbGYgPSB0aGlzO1xuXG4gICAgZnVuY3Rpb24gc2V0SGVhZGVyKF92YWx1ZSwgX2hlYWRlciwgX3Jld3JpdGUpIHtcbiAgICAgIGNvbnN0IGxIZWFkZXIgPSBub3JtYWxpemVIZWFkZXIoX2hlYWRlcik7XG5cbiAgICAgIGlmICghbEhlYWRlcikge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ2hlYWRlciBuYW1lIG11c3QgYmUgYSBub24tZW1wdHkgc3RyaW5nJyk7XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IGtleSA9IHV0aWxzLmZpbmRLZXkoc2VsZiwgbEhlYWRlcik7XG5cbiAgICAgIGlmIChcbiAgICAgICAgIWtleSB8fFxuICAgICAgICBzZWxmW2tleV0gPT09IHVuZGVmaW5lZCB8fFxuICAgICAgICBfcmV3cml0ZSA9PT0gdHJ1ZSB8fFxuICAgICAgICAoX3Jld3JpdGUgPT09IHVuZGVmaW5lZCAmJiBzZWxmW2tleV0gIT09IGZhbHNlKVxuICAgICAgKSB7XG4gICAgICAgIHNlbGZba2V5IHx8IF9oZWFkZXJdID0gbm9ybWFsaXplVmFsdWUoX3ZhbHVlKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBjb25zdCBzZXRIZWFkZXJzID0gKGhlYWRlcnMsIF9yZXdyaXRlKSA9PlxuICAgICAgdXRpbHMuZm9yRWFjaChoZWFkZXJzLCAoX3ZhbHVlLCBfaGVhZGVyKSA9PiBzZXRIZWFkZXIoX3ZhbHVlLCBfaGVhZGVyLCBfcmV3cml0ZSkpO1xuXG4gICAgaWYgKHV0aWxzLmlzUGxhaW5PYmplY3QoaGVhZGVyKSB8fCBoZWFkZXIgaW5zdGFuY2VvZiB0aGlzLmNvbnN0cnVjdG9yKSB7XG4gICAgICBzZXRIZWFkZXJzKGhlYWRlciwgdmFsdWVPclJld3JpdGUpO1xuICAgIH0gZWxzZSBpZiAodXRpbHMuaXNTdHJpbmcoaGVhZGVyKSAmJiAoaGVhZGVyID0gaGVhZGVyLnRyaW0oKSkgJiYgIWlzVmFsaWRIZWFkZXJOYW1lKGhlYWRlcikpIHtcbiAgICAgIHNldEhlYWRlcnMocGFyc2VIZWFkZXJzKGhlYWRlciksIHZhbHVlT3JSZXdyaXRlKTtcbiAgICB9IGVsc2UgaWYgKHV0aWxzLmlzT2JqZWN0KGhlYWRlcikgJiYgdXRpbHMuaXNJdGVyYWJsZShoZWFkZXIpKSB7XG4gICAgICBsZXQgb2JqID0ge30sXG4gICAgICAgIGRlc3QsXG4gICAgICAgIGtleTtcbiAgICAgIGZvciAoY29uc3QgZW50cnkgb2YgaGVhZGVyKSB7XG4gICAgICAgIGlmICghdXRpbHMuaXNBcnJheShlbnRyeSkpIHtcbiAgICAgICAgICB0aHJvdyBUeXBlRXJyb3IoJ09iamVjdCBpdGVyYXRvciBtdXN0IHJldHVybiBhIGtleS12YWx1ZSBwYWlyJyk7XG4gICAgICAgIH1cblxuICAgICAgICBvYmpbKGtleSA9IGVudHJ5WzBdKV0gPSAoZGVzdCA9IG9ialtrZXldKVxuICAgICAgICAgID8gdXRpbHMuaXNBcnJheShkZXN0KVxuICAgICAgICAgICAgPyBbLi4uZGVzdCwgZW50cnlbMV1dXG4gICAgICAgICAgICA6IFtkZXN0LCBlbnRyeVsxXV1cbiAgICAgICAgICA6IGVudHJ5WzFdO1xuICAgICAgfVxuXG4gICAgICBzZXRIZWFkZXJzKG9iaiwgdmFsdWVPclJld3JpdGUpO1xuICAgIH0gZWxzZSB7XG4gICAgICBoZWFkZXIgIT0gbnVsbCAmJiBzZXRIZWFkZXIodmFsdWVPclJld3JpdGUsIGhlYWRlciwgcmV3cml0ZSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICBnZXQoaGVhZGVyLCBwYXJzZXIpIHtcbiAgICBoZWFkZXIgPSBub3JtYWxpemVIZWFkZXIoaGVhZGVyKTtcblxuICAgIGlmIChoZWFkZXIpIHtcbiAgICAgIGNvbnN0IGtleSA9IHV0aWxzLmZpbmRLZXkodGhpcywgaGVhZGVyKTtcblxuICAgICAgaWYgKGtleSkge1xuICAgICAgICBjb25zdCB2YWx1ZSA9IHRoaXNba2V5XTtcblxuICAgICAgICBpZiAoIXBhcnNlcikge1xuICAgICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChwYXJzZXIgPT09IHRydWUpIHtcbiAgICAgICAgICByZXR1cm4gcGFyc2VUb2tlbnModmFsdWUpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHV0aWxzLmlzRnVuY3Rpb24ocGFyc2VyKSkge1xuICAgICAgICAgIHJldHVybiBwYXJzZXIuY2FsbCh0aGlzLCB2YWx1ZSwga2V5KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh1dGlscy5pc1JlZ0V4cChwYXJzZXIpKSB7XG4gICAgICAgICAgcmV0dXJuIHBhcnNlci5leGVjKHZhbHVlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ3BhcnNlciBtdXN0IGJlIGJvb2xlYW58cmVnZXhwfGZ1bmN0aW9uJyk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgaGFzKGhlYWRlciwgbWF0Y2hlcikge1xuICAgIGhlYWRlciA9IG5vcm1hbGl6ZUhlYWRlcihoZWFkZXIpO1xuXG4gICAgaWYgKGhlYWRlcikge1xuICAgICAgY29uc3Qga2V5ID0gdXRpbHMuZmluZEtleSh0aGlzLCBoZWFkZXIpO1xuXG4gICAgICByZXR1cm4gISEoXG4gICAgICAgIGtleSAmJlxuICAgICAgICB0aGlzW2tleV0gIT09IHVuZGVmaW5lZCAmJlxuICAgICAgICAoIW1hdGNoZXIgfHwgbWF0Y2hIZWFkZXJWYWx1ZSh0aGlzLCB0aGlzW2tleV0sIGtleSwgbWF0Y2hlcikpXG4gICAgICApO1xuICAgIH1cblxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIGRlbGV0ZShoZWFkZXIsIG1hdGNoZXIpIHtcbiAgICBjb25zdCBzZWxmID0gdGhpcztcbiAgICBsZXQgZGVsZXRlZCA9IGZhbHNlO1xuXG4gICAgZnVuY3Rpb24gZGVsZXRlSGVhZGVyKF9oZWFkZXIpIHtcbiAgICAgIF9oZWFkZXIgPSBub3JtYWxpemVIZWFkZXIoX2hlYWRlcik7XG5cbiAgICAgIGlmIChfaGVhZGVyKSB7XG4gICAgICAgIGNvbnN0IGtleSA9IHV0aWxzLmZpbmRLZXkoc2VsZiwgX2hlYWRlcik7XG5cbiAgICAgICAgaWYgKGtleSAmJiAoIW1hdGNoZXIgfHwgbWF0Y2hIZWFkZXJWYWx1ZShzZWxmLCBzZWxmW2tleV0sIGtleSwgbWF0Y2hlcikpKSB7XG4gICAgICAgICAgZGVsZXRlIHNlbGZba2V5XTtcblxuICAgICAgICAgIGRlbGV0ZWQgPSB0cnVlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKHV0aWxzLmlzQXJyYXkoaGVhZGVyKSkge1xuICAgICAgaGVhZGVyLmZvckVhY2goZGVsZXRlSGVhZGVyKTtcbiAgICB9IGVsc2Uge1xuICAgICAgZGVsZXRlSGVhZGVyKGhlYWRlcik7XG4gICAgfVxuXG4gICAgcmV0dXJuIGRlbGV0ZWQ7XG4gIH1cblxuICBjbGVhcihtYXRjaGVyKSB7XG4gICAgY29uc3Qga2V5cyA9IE9iamVjdC5rZXlzKHRoaXMpO1xuICAgIGxldCBpID0ga2V5cy5sZW5ndGg7XG4gICAgbGV0IGRlbGV0ZWQgPSBmYWxzZTtcblxuICAgIHdoaWxlIChpLS0pIHtcbiAgICAgIGNvbnN0IGtleSA9IGtleXNbaV07XG4gICAgICBpZiAoIW1hdGNoZXIgfHwgbWF0Y2hIZWFkZXJWYWx1ZSh0aGlzLCB0aGlzW2tleV0sIGtleSwgbWF0Y2hlciwgdHJ1ZSkpIHtcbiAgICAgICAgZGVsZXRlIHRoaXNba2V5XTtcbiAgICAgICAgZGVsZXRlZCA9IHRydWU7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIGRlbGV0ZWQ7XG4gIH1cblxuICBub3JtYWxpemUoZm9ybWF0KSB7XG4gICAgY29uc3Qgc2VsZiA9IHRoaXM7XG4gICAgY29uc3QgaGVhZGVycyA9IHt9O1xuXG4gICAgdXRpbHMuZm9yRWFjaCh0aGlzLCAodmFsdWUsIGhlYWRlcikgPT4ge1xuICAgICAgY29uc3Qga2V5ID0gdXRpbHMuZmluZEtleShoZWFkZXJzLCBoZWFkZXIpO1xuXG4gICAgICBpZiAoa2V5KSB7XG4gICAgICAgIHNlbGZba2V5XSA9IG5vcm1hbGl6ZVZhbHVlKHZhbHVlKTtcbiAgICAgICAgZGVsZXRlIHNlbGZbaGVhZGVyXTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBjb25zdCBub3JtYWxpemVkID0gZm9ybWF0ID8gZm9ybWF0SGVhZGVyKGhlYWRlcikgOiBTdHJpbmcoaGVhZGVyKS50cmltKCk7XG5cbiAgICAgIGlmIChub3JtYWxpemVkICE9PSBoZWFkZXIpIHtcbiAgICAgICAgZGVsZXRlIHNlbGZbaGVhZGVyXTtcbiAgICAgIH1cblxuICAgICAgc2VsZltub3JtYWxpemVkXSA9IG5vcm1hbGl6ZVZhbHVlKHZhbHVlKTtcblxuICAgICAgaGVhZGVyc1tub3JtYWxpemVkXSA9IHRydWU7XG4gICAgfSk7XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIGNvbmNhdCguLi50YXJnZXRzKSB7XG4gICAgcmV0dXJuIHRoaXMuY29uc3RydWN0b3IuY29uY2F0KHRoaXMsIC4uLnRhcmdldHMpO1xuICB9XG5cbiAgdG9KU09OKGFzU3RyaW5ncykge1xuICAgIGNvbnN0IG9iaiA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG5cbiAgICB1dGlscy5mb3JFYWNoKHRoaXMsICh2YWx1ZSwgaGVhZGVyKSA9PiB7XG4gICAgICB2YWx1ZSAhPSBudWxsICYmXG4gICAgICAgIHZhbHVlICE9PSBmYWxzZSAmJlxuICAgICAgICAob2JqW2hlYWRlcl0gPSBhc1N0cmluZ3MgJiYgdXRpbHMuaXNBcnJheSh2YWx1ZSkgPyB2YWx1ZS5qb2luKCcsICcpIDogdmFsdWUpO1xuICAgIH0pO1xuXG4gICAgcmV0dXJuIG9iajtcbiAgfVxuXG4gIFtTeW1ib2wuaXRlcmF0b3JdKCkge1xuICAgIHJldHVybiBPYmplY3QuZW50cmllcyh0aGlzLnRvSlNPTigpKVtTeW1ib2wuaXRlcmF0b3JdKCk7XG4gIH1cblxuICB0b1N0cmluZygpIHtcbiAgICByZXR1cm4gT2JqZWN0LmVudHJpZXModGhpcy50b0pTT04oKSlcbiAgICAgIC5tYXAoKFtoZWFkZXIsIHZhbHVlXSkgPT4gaGVhZGVyICsgJzogJyArIHZhbHVlKVxuICAgICAgLmpvaW4oJ1xcbicpO1xuICB9XG5cbiAgZ2V0U2V0Q29va2llKCkge1xuICAgIHJldHVybiB0aGlzLmdldCgnc2V0LWNvb2tpZScpIHx8IFtdO1xuICB9XG5cbiAgZ2V0IFtTeW1ib2wudG9TdHJpbmdUYWddKCkge1xuICAgIHJldHVybiAnQXhpb3NIZWFkZXJzJztcbiAgfVxuXG4gIHN0YXRpYyBmcm9tKHRoaW5nKSB7XG4gICAgcmV0dXJuIHRoaW5nIGluc3RhbmNlb2YgdGhpcyA/IHRoaW5nIDogbmV3IHRoaXModGhpbmcpO1xuICB9XG5cbiAgc3RhdGljIGNvbmNhdChmaXJzdCwgLi4udGFyZ2V0cykge1xuICAgIGNvbnN0IGNvbXB1dGVkID0gbmV3IHRoaXMoZmlyc3QpO1xuXG4gICAgdGFyZ2V0cy5mb3JFYWNoKCh0YXJnZXQpID0+IGNvbXB1dGVkLnNldCh0YXJnZXQpKTtcblxuICAgIHJldHVybiBjb21wdXRlZDtcbiAgfVxuXG4gIHN0YXRpYyBhY2Nlc3NvcihoZWFkZXIpIHtcbiAgICBjb25zdCBpbnRlcm5hbHMgPVxuICAgICAgKHRoaXNbJGludGVybmFsc10gPVxuICAgICAgdGhpc1skaW50ZXJuYWxzXSA9XG4gICAgICAgIHtcbiAgICAgICAgICBhY2Nlc3NvcnM6IHt9LFxuICAgICAgICB9KTtcblxuICAgIGNvbnN0IGFjY2Vzc29ycyA9IGludGVybmFscy5hY2Nlc3NvcnM7XG4gICAgY29uc3QgcHJvdG90eXBlID0gdGhpcy5wcm90b3R5cGU7XG5cbiAgICBmdW5jdGlvbiBkZWZpbmVBY2Nlc3NvcihfaGVhZGVyKSB7XG4gICAgICBjb25zdCBsSGVhZGVyID0gbm9ybWFsaXplSGVhZGVyKF9oZWFkZXIpO1xuXG4gICAgICBpZiAoIWFjY2Vzc29yc1tsSGVhZGVyXSkge1xuICAgICAgICBidWlsZEFjY2Vzc29ycyhwcm90b3R5cGUsIF9oZWFkZXIpO1xuICAgICAgICBhY2Nlc3NvcnNbbEhlYWRlcl0gPSB0cnVlO1xuICAgICAgfVxuICAgIH1cblxuICAgIHV0aWxzLmlzQXJyYXkoaGVhZGVyKSA/IGhlYWRlci5mb3JFYWNoKGRlZmluZUFjY2Vzc29yKSA6IGRlZmluZUFjY2Vzc29yKGhlYWRlcik7XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfVxufVxuXG5BeGlvc0hlYWRlcnMuYWNjZXNzb3IoW1xuICAnQ29udGVudC1UeXBlJyxcbiAgJ0NvbnRlbnQtTGVuZ3RoJyxcbiAgJ0FjY2VwdCcsXG4gICdBY2NlcHQtRW5jb2RpbmcnLFxuICAnVXNlci1BZ2VudCcsXG4gICdBdXRob3JpemF0aW9uJyxcbl0pO1xuXG4vLyByZXNlcnZlZCBuYW1lcyBob3RmaXhcbnV0aWxzLnJlZHVjZURlc2NyaXB0b3JzKEF4aW9zSGVhZGVycy5wcm90b3R5cGUsICh7IHZhbHVlIH0sIGtleSkgPT4ge1xuICBsZXQgbWFwcGVkID0ga2V5WzBdLnRvVXBwZXJDYXNlKCkgKyBrZXkuc2xpY2UoMSk7IC8vIG1hcCBgc2V0YCA9PiBgU2V0YFxuICByZXR1cm4ge1xuICAgIGdldDogKCkgPT4gdmFsdWUsXG4gICAgc2V0KGhlYWRlclZhbHVlKSB7XG4gICAgICB0aGlzW21hcHBlZF0gPSBoZWFkZXJWYWx1ZTtcbiAgICB9LFxuICB9O1xufSk7XG5cbnV0aWxzLmZyZWV6ZU1ldGhvZHMoQXhpb3NIZWFkZXJzKTtcblxuZXhwb3J0IGRlZmF1bHQgQXhpb3NIZWFkZXJzO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQgdXRpbHMgZnJvbSAnLi4vdXRpbHMuanMnO1xuaW1wb3J0IEF4aW9zSGVhZGVycyBmcm9tICcuL0F4aW9zSGVhZGVycy5qcyc7XG5cbmNvbnN0IFJFREFDVEVEID0gJ1tSRURBQ1RFRCAqKioqXSc7XG5cbmZ1bmN0aW9uIGhhc093bk9yUHJvdG90eXBlVG9KU09OKHNvdXJjZSkge1xuICBpZiAodXRpbHMuaGFzT3duUHJvcChzb3VyY2UsICd0b0pTT04nKSkge1xuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgbGV0IHByb3RvdHlwZSA9IE9iamVjdC5nZXRQcm90b3R5cGVPZihzb3VyY2UpO1xuXG4gIHdoaWxlIChwcm90b3R5cGUgJiYgcHJvdG90eXBlICE9PSBPYmplY3QucHJvdG90eXBlKSB7XG4gICAgaWYgKHV0aWxzLmhhc093blByb3AocHJvdG90eXBlLCAndG9KU09OJykpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cblxuICAgIHByb3RvdHlwZSA9IE9iamVjdC5nZXRQcm90b3R5cGVPZihwcm90b3R5cGUpO1xuICB9XG5cbiAgcmV0dXJuIGZhbHNlO1xufVxuXG4vLyBCdWlsZCBhIHBsYWluLW9iamVjdCBzbmFwc2hvdCBvZiBgY29uZmlnYCBhbmQgcmVwbGFjZSB0aGUgdmFsdWUgb2YgYW55IGtleVxuLy8gKGNhc2UtaW5zZW5zaXRpdmUpIGxpc3RlZCBpbiBgcmVkYWN0S2V5c2Agd2l0aCBSRURBQ1RFRC4gV2Fsa3MgdGhyb3VnaCBhcnJheXNcbi8vIGFuZCBBeGlvc0hlYWRlcnMsIGFuZCBzaG9ydC1jaXJjdWl0cyBvbiBjaXJjdWxhciByZWZlcmVuY2VzLlxuZnVuY3Rpb24gcmVkYWN0Q29uZmlnKGNvbmZpZywgcmVkYWN0S2V5cykge1xuICBjb25zdCBsb3dlcktleXMgPSBuZXcgU2V0KHJlZGFjdEtleXMubWFwKChrKSA9PiBTdHJpbmcoaykudG9Mb3dlckNhc2UoKSkpO1xuICBjb25zdCBzZWVuID0gW107XG5cbiAgY29uc3QgdmlzaXQgPSAoc291cmNlKSA9PiB7XG4gICAgaWYgKHNvdXJjZSA9PT0gbnVsbCB8fCB0eXBlb2Ygc291cmNlICE9PSAnb2JqZWN0JykgcmV0dXJuIHNvdXJjZTtcbiAgICBpZiAodXRpbHMuaXNCdWZmZXIoc291cmNlKSkgcmV0dXJuIHNvdXJjZTtcbiAgICBpZiAoc2Vlbi5pbmRleE9mKHNvdXJjZSkgIT09IC0xKSByZXR1cm4gdW5kZWZpbmVkO1xuXG4gICAgaWYgKHNvdXJjZSBpbnN0YW5jZW9mIEF4aW9zSGVhZGVycykge1xuICAgICAgc291cmNlID0gc291cmNlLnRvSlNPTigpO1xuICAgIH1cblxuICAgIHNlZW4ucHVzaChzb3VyY2UpO1xuXG4gICAgbGV0IHJlc3VsdDtcbiAgICBpZiAodXRpbHMuaXNBcnJheShzb3VyY2UpKSB7XG4gICAgICByZXN1bHQgPSBbXTtcbiAgICAgIHNvdXJjZS5mb3JFYWNoKCh2LCBpKSA9PiB7XG4gICAgICAgIGNvbnN0IHJlZHVjZWRWYWx1ZSA9IHZpc2l0KHYpO1xuICAgICAgICBpZiAoIXV0aWxzLmlzVW5kZWZpbmVkKHJlZHVjZWRWYWx1ZSkpIHtcbiAgICAgICAgICByZXN1bHRbaV0gPSByZWR1Y2VkVmFsdWU7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICBpZiAoIXV0aWxzLmlzUGxhaW5PYmplY3Qoc291cmNlKSAmJiBoYXNPd25PclByb3RvdHlwZVRvSlNPTihzb3VyY2UpKSB7XG4gICAgICAgIHNlZW4ucG9wKCk7XG4gICAgICAgIHJldHVybiBzb3VyY2U7XG4gICAgICB9XG5cbiAgICAgIHJlc3VsdCA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gICAgICBmb3IgKGNvbnN0IFtrZXksIHZhbHVlXSBvZiBPYmplY3QuZW50cmllcyhzb3VyY2UpKSB7XG4gICAgICAgIGNvbnN0IHJlZHVjZWRWYWx1ZSA9IGxvd2VyS2V5cy5oYXMoa2V5LnRvTG93ZXJDYXNlKCkpID8gUkVEQUNURUQgOiB2aXNpdCh2YWx1ZSk7XG4gICAgICAgIGlmICghdXRpbHMuaXNVbmRlZmluZWQocmVkdWNlZFZhbHVlKSkge1xuICAgICAgICAgIHJlc3VsdFtrZXldID0gcmVkdWNlZFZhbHVlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgc2Vlbi5wb3AoKTtcbiAgICByZXR1cm4gcmVzdWx0O1xuICB9O1xuXG4gIHJldHVybiB2aXNpdChjb25maWcpO1xufVxuXG5jbGFzcyBBeGlvc0Vycm9yIGV4dGVuZHMgRXJyb3Ige1xuICBzdGF0aWMgZnJvbShlcnJvciwgY29kZSwgY29uZmlnLCByZXF1ZXN0LCByZXNwb25zZSwgY3VzdG9tUHJvcHMpIHtcbiAgICBjb25zdCBheGlvc0Vycm9yID0gbmV3IEF4aW9zRXJyb3IoZXJyb3IubWVzc2FnZSwgY29kZSB8fCBlcnJvci5jb2RlLCBjb25maWcsIHJlcXVlc3QsIHJlc3BvbnNlKTtcbiAgICBheGlvc0Vycm9yLmNhdXNlID0gZXJyb3I7XG4gICAgYXhpb3NFcnJvci5uYW1lID0gZXJyb3IubmFtZTtcblxuICAgIC8vIFByZXNlcnZlIHN0YXR1cyBmcm9tIHRoZSBvcmlnaW5hbCBlcnJvciBpZiBub3QgYWxyZWFkeSBzZXQgZnJvbSByZXNwb25zZVxuICAgIGlmIChlcnJvci5zdGF0dXMgIT0gbnVsbCAmJiBheGlvc0Vycm9yLnN0YXR1cyA9PSBudWxsKSB7XG4gICAgICBheGlvc0Vycm9yLnN0YXR1cyA9IGVycm9yLnN0YXR1cztcbiAgICB9XG5cbiAgICBjdXN0b21Qcm9wcyAmJiBPYmplY3QuYXNzaWduKGF4aW9zRXJyb3IsIGN1c3RvbVByb3BzKTtcbiAgICByZXR1cm4gYXhpb3NFcnJvcjtcbiAgfVxuXG4gIC8qKlxuICAgKiBDcmVhdGUgYW4gRXJyb3Igd2l0aCB0aGUgc3BlY2lmaWVkIG1lc3NhZ2UsIGNvbmZpZywgZXJyb3IgY29kZSwgcmVxdWVzdCBhbmQgcmVzcG9uc2UuXG4gICAqXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBtZXNzYWdlIFRoZSBlcnJvciBtZXNzYWdlLlxuICAgKiBAcGFyYW0ge3N0cmluZ30gW2NvZGVdIFRoZSBlcnJvciBjb2RlIChmb3IgZXhhbXBsZSwgJ0VDT05OQUJPUlRFRCcpLlxuICAgKiBAcGFyYW0ge09iamVjdH0gW2NvbmZpZ10gVGhlIGNvbmZpZy5cbiAgICogQHBhcmFtIHtPYmplY3R9IFtyZXF1ZXN0XSBUaGUgcmVxdWVzdC5cbiAgICogQHBhcmFtIHtPYmplY3R9IFtyZXNwb25zZV0gVGhlIHJlc3BvbnNlLlxuICAgKlxuICAgKiBAcmV0dXJucyB7RXJyb3J9IFRoZSBjcmVhdGVkIGVycm9yLlxuICAgKi9cbiAgY29uc3RydWN0b3IobWVzc2FnZSwgY29kZSwgY29uZmlnLCByZXF1ZXN0LCByZXNwb25zZSkge1xuICAgIHN1cGVyKG1lc3NhZ2UpO1xuXG4gICAgLy8gTWFrZSBtZXNzYWdlIGVudW1lcmFibGUgdG8gbWFpbnRhaW4gYmFja3dhcmQgY29tcGF0aWJpbGl0eVxuICAgIC8vIFRoZSBuYXRpdmUgRXJyb3IgY29uc3RydWN0b3Igc2V0cyBtZXNzYWdlIGFzIG5vbi1lbnVtZXJhYmxlLFxuICAgIC8vIGJ1dCBheGlvcyA8IHYxLjEzLjMgaGFkIGl0IGFzIGVudW1lcmFibGVcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGhpcywgJ21lc3NhZ2UnLCB7XG4gICAgICAvLyBOdWxsLXByb3RvIGRlc2NyaXB0b3Igc28gYSBwb2xsdXRlZCBPYmplY3QucHJvdG90eXBlLmdldCBjYW5ub3QgdHVyblxuICAgICAgLy8gdGhpcyBkYXRhIGRlc2NyaXB0b3IgaW50byBhbiBhY2Nlc3NvciBkZXNjcmlwdG9yIG9uIHRoZSB3YXkgaW4uXG4gICAgICBfX3Byb3RvX186IG51bGwsXG4gICAgICB2YWx1ZTogbWVzc2FnZSxcbiAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICB3cml0YWJsZTogdHJ1ZSxcbiAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICB9KTtcblxuICAgIHRoaXMubmFtZSA9ICdBeGlvc0Vycm9yJztcbiAgICB0aGlzLmlzQXhpb3NFcnJvciA9IHRydWU7XG4gICAgY29kZSAmJiAodGhpcy5jb2RlID0gY29kZSk7XG4gICAgY29uZmlnICYmICh0aGlzLmNvbmZpZyA9IGNvbmZpZyk7XG4gICAgcmVxdWVzdCAmJiAodGhpcy5yZXF1ZXN0ID0gcmVxdWVzdCk7XG4gICAgaWYgKHJlc3BvbnNlKSB7XG4gICAgICB0aGlzLnJlc3BvbnNlID0gcmVzcG9uc2U7XG4gICAgICB0aGlzLnN0YXR1cyA9IHJlc3BvbnNlLnN0YXR1cztcbiAgICB9XG4gIH1cblxuICB0b0pTT04oKSB7XG4gICAgLy8gT3B0LWluIHJlZGFjdGlvbjogd2hlbiB0aGUgcmVxdWVzdCBjb25maWcgY2FycmllcyBhIGByZWRhY3RgIGFycmF5LCB0aGVcbiAgICAvLyB2YWx1ZSBvZiBhbnkgbWF0Y2hpbmcga2V5IChjYXNlLWluc2Vuc2l0aXZlLCBhdCBhbnkgZGVwdGgpIGlzIHJlcGxhY2VkXG4gICAgLy8gd2l0aCBSRURBQ1RFRCBpbiB0aGUgc2VyaWFsaXplZCBzbmFwc2hvdC4gVW5kZWZpbmVkIG9yIGVtcHR5IGxlYXZlcyB0aGVcbiAgICAvLyBleGlzdGluZyBzZXJpYWxpemF0aW9uIGJlaGF2aW9yIHVuY2hhbmdlZC5cbiAgICBjb25zdCBjb25maWcgPSB0aGlzLmNvbmZpZztcbiAgICBjb25zdCByZWRhY3RLZXlzID0gY29uZmlnICYmIHV0aWxzLmhhc093blByb3AoY29uZmlnLCAncmVkYWN0JykgPyBjb25maWcucmVkYWN0IDogdW5kZWZpbmVkO1xuICAgIGNvbnN0IHNlcmlhbGl6ZWRDb25maWcgPVxuICAgICAgdXRpbHMuaXNBcnJheShyZWRhY3RLZXlzKSAmJiByZWRhY3RLZXlzLmxlbmd0aCA+IDBcbiAgICAgICAgPyByZWRhY3RDb25maWcoY29uZmlnLCByZWRhY3RLZXlzKVxuICAgICAgICA6IHV0aWxzLnRvSlNPTk9iamVjdChjb25maWcpO1xuXG4gICAgcmV0dXJuIHtcbiAgICAgIC8vIFN0YW5kYXJkXG4gICAgICBtZXNzYWdlOiB0aGlzLm1lc3NhZ2UsXG4gICAgICBuYW1lOiB0aGlzLm5hbWUsXG4gICAgICAvLyBNaWNyb3NvZnRcbiAgICAgIGRlc2NyaXB0aW9uOiB0aGlzLmRlc2NyaXB0aW9uLFxuICAgICAgbnVtYmVyOiB0aGlzLm51bWJlcixcbiAgICAgIC8vIE1vemlsbGFcbiAgICAgIGZpbGVOYW1lOiB0aGlzLmZpbGVOYW1lLFxuICAgICAgbGluZU51bWJlcjogdGhpcy5saW5lTnVtYmVyLFxuICAgICAgY29sdW1uTnVtYmVyOiB0aGlzLmNvbHVtbk51bWJlcixcbiAgICAgIHN0YWNrOiB0aGlzLnN0YWNrLFxuICAgICAgLy8gQXhpb3NcbiAgICAgIGNvbmZpZzogc2VyaWFsaXplZENvbmZpZyxcbiAgICAgIGNvZGU6IHRoaXMuY29kZSxcbiAgICAgIHN0YXR1czogdGhpcy5zdGF0dXMsXG4gICAgfTtcbiAgfVxufVxuXG4vLyBUaGlzIGNhbiBiZSBjaGFuZ2VkIHRvIHN0YXRpYyBwcm9wZXJ0aWVzIGFzIHNvb24gYXMgdGhlIHBhcnNlciBvcHRpb25zIGluIC5lc2xpbnQuY2pzIGFyZSB1cGRhdGVkLlxuQXhpb3NFcnJvci5FUlJfQkFEX09QVElPTl9WQUxVRSA9ICdFUlJfQkFEX09QVElPTl9WQUxVRSc7XG5BeGlvc0Vycm9yLkVSUl9CQURfT1BUSU9OID0gJ0VSUl9CQURfT1BUSU9OJztcbkF4aW9zRXJyb3IuRUNPTk5BQk9SVEVEID0gJ0VDT05OQUJPUlRFRCc7XG5BeGlvc0Vycm9yLkVUSU1FRE9VVCA9ICdFVElNRURPVVQnO1xuQXhpb3NFcnJvci5FQ09OTlJFRlVTRUQgPSAnRUNPTk5SRUZVU0VEJztcbkF4aW9zRXJyb3IuRVJSX05FVFdPUksgPSAnRVJSX05FVFdPUksnO1xuQXhpb3NFcnJvci5FUlJfRlJfVE9PX01BTllfUkVESVJFQ1RTID0gJ0VSUl9GUl9UT09fTUFOWV9SRURJUkVDVFMnO1xuQXhpb3NFcnJvci5FUlJfREVQUkVDQVRFRCA9ICdFUlJfREVQUkVDQVRFRCc7XG5BeGlvc0Vycm9yLkVSUl9CQURfUkVTUE9OU0UgPSAnRVJSX0JBRF9SRVNQT05TRSc7XG5BeGlvc0Vycm9yLkVSUl9CQURfUkVRVUVTVCA9ICdFUlJfQkFEX1JFUVVFU1QnO1xuQXhpb3NFcnJvci5FUlJfQ0FOQ0VMRUQgPSAnRVJSX0NBTkNFTEVEJztcbkF4aW9zRXJyb3IuRVJSX05PVF9TVVBQT1JUID0gJ0VSUl9OT1RfU1VQUE9SVCc7XG5BeGlvc0Vycm9yLkVSUl9JTlZBTElEX1VSTCA9ICdFUlJfSU5WQUxJRF9VUkwnO1xuQXhpb3NFcnJvci5FUlJfRk9STV9EQVRBX0RFUFRIX0VYQ0VFREVEID0gJ0VSUl9GT1JNX0RBVEFfREVQVEhfRVhDRUVERUQnO1xuXG5leHBvcnQgZGVmYXVsdCBBeGlvc0Vycm9yO1xuIiwiLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHN0cmljdFxuZXhwb3J0IGRlZmF1bHQgbnVsbDtcbiIsIid1c2Ugc3RyaWN0JztcblxuaW1wb3J0IHV0aWxzIGZyb20gJy4uL3V0aWxzLmpzJztcbmltcG9ydCBBeGlvc0Vycm9yIGZyb20gJy4uL2NvcmUvQXhpb3NFcnJvci5qcyc7XG4vLyB0ZW1wb3JhcnkgaG90Zml4IHRvIGF2b2lkIGNpcmN1bGFyIHJlZmVyZW5jZXMgdW50aWwgQXhpb3NVUkxTZWFyY2hQYXJhbXMgaXMgcmVmYWN0b3JlZFxuaW1wb3J0IFBsYXRmb3JtRm9ybURhdGEgZnJvbSAnLi4vcGxhdGZvcm0vbm9kZS9jbGFzc2VzL0Zvcm1EYXRhLmpzJztcblxuLyoqXG4gKiBEZXRlcm1pbmVzIGlmIHRoZSBnaXZlbiB0aGluZyBpcyBhIGFycmF5IG9yIGpzIG9iamVjdC5cbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gdGhpbmcgLSBUaGUgb2JqZWN0IG9yIGFycmF5IHRvIGJlIHZpc2l0ZWQuXG4gKlxuICogQHJldHVybnMge2Jvb2xlYW59XG4gKi9cbmZ1bmN0aW9uIGlzVmlzaXRhYmxlKHRoaW5nKSB7XG4gIHJldHVybiB1dGlscy5pc1BsYWluT2JqZWN0KHRoaW5nKSB8fCB1dGlscy5pc0FycmF5KHRoaW5nKTtcbn1cblxuLyoqXG4gKiBJdCByZW1vdmVzIHRoZSBicmFja2V0cyBmcm9tIHRoZSBlbmQgb2YgYSBzdHJpbmdcbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IC0gVGhlIGtleSBvZiB0aGUgcGFyYW1ldGVyLlxuICpcbiAqIEByZXR1cm5zIHtzdHJpbmd9IHRoZSBrZXkgd2l0aG91dCB0aGUgYnJhY2tldHMuXG4gKi9cbmZ1bmN0aW9uIHJlbW92ZUJyYWNrZXRzKGtleSkge1xuICByZXR1cm4gdXRpbHMuZW5kc1dpdGgoa2V5LCAnW10nKSA/IGtleS5zbGljZSgwLCAtMikgOiBrZXk7XG59XG5cbi8qKlxuICogSXQgdGFrZXMgYSBwYXRoLCBhIGtleSwgYW5kIGEgYm9vbGVhbiwgYW5kIHJldHVybnMgYSBzdHJpbmdcbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gcGF0aCAtIFRoZSBwYXRoIHRvIHRoZSBjdXJyZW50IGtleS5cbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgLSBUaGUga2V5IG9mIHRoZSBjdXJyZW50IG9iamVjdCBiZWluZyBpdGVyYXRlZCBvdmVyLlxuICogQHBhcmFtIHtzdHJpbmd9IGRvdHMgLSBJZiB0cnVlLCB0aGUga2V5IHdpbGwgYmUgcmVuZGVyZWQgd2l0aCBkb3RzIGluc3RlYWQgb2YgYnJhY2tldHMuXG4gKlxuICogQHJldHVybnMge3N0cmluZ30gVGhlIHBhdGggdG8gdGhlIGN1cnJlbnQga2V5LlxuICovXG5mdW5jdGlvbiByZW5kZXJLZXkocGF0aCwga2V5LCBkb3RzKSB7XG4gIGlmICghcGF0aCkgcmV0dXJuIGtleTtcbiAgcmV0dXJuIHBhdGhcbiAgICAuY29uY2F0KGtleSlcbiAgICAubWFwKGZ1bmN0aW9uIGVhY2godG9rZW4sIGkpIHtcbiAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1wYXJhbS1yZWFzc2lnblxuICAgICAgdG9rZW4gPSByZW1vdmVCcmFja2V0cyh0b2tlbik7XG4gICAgICByZXR1cm4gIWRvdHMgJiYgaSA/ICdbJyArIHRva2VuICsgJ10nIDogdG9rZW47XG4gICAgfSlcbiAgICAuam9pbihkb3RzID8gJy4nIDogJycpO1xufVxuXG4vKipcbiAqIElmIHRoZSBhcnJheSBpcyBhbiBhcnJheSBhbmQgbm9uZSBvZiBpdHMgZWxlbWVudHMgYXJlIHZpc2l0YWJsZSwgdGhlbiBpdCdzIGEgZmxhdCBhcnJheS5cbiAqXG4gKiBAcGFyYW0ge0FycmF5PGFueT59IGFyciAtIFRoZSBhcnJheSB0byBjaGVja1xuICpcbiAqIEByZXR1cm5zIHtib29sZWFufVxuICovXG5mdW5jdGlvbiBpc0ZsYXRBcnJheShhcnIpIHtcbiAgcmV0dXJuIHV0aWxzLmlzQXJyYXkoYXJyKSAmJiAhYXJyLnNvbWUoaXNWaXNpdGFibGUpO1xufVxuXG5jb25zdCBwcmVkaWNhdGVzID0gdXRpbHMudG9GbGF0T2JqZWN0KHV0aWxzLCB7fSwgbnVsbCwgZnVuY3Rpb24gZmlsdGVyKHByb3ApIHtcbiAgcmV0dXJuIC9eaXNbQS1aXS8udGVzdChwcm9wKTtcbn0pO1xuXG4vKipcbiAqIENvbnZlcnQgYSBkYXRhIG9iamVjdCB0byBGb3JtRGF0YVxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmpcbiAqIEBwYXJhbSB7P09iamVjdH0gW2Zvcm1EYXRhXVxuICogQHBhcmFtIHs/T2JqZWN0fSBbb3B0aW9uc11cbiAqIEBwYXJhbSB7RnVuY3Rpb259IFtvcHRpb25zLnZpc2l0b3JdXG4gKiBAcGFyYW0ge0Jvb2xlYW59IFtvcHRpb25zLm1ldGFUb2tlbnMgPSB0cnVlXVxuICogQHBhcmFtIHtCb29sZWFufSBbb3B0aW9ucy5kb3RzID0gZmFsc2VdXG4gKiBAcGFyYW0gez9Cb29sZWFufSBbb3B0aW9ucy5pbmRleGVzID0gZmFsc2VdXG4gKlxuICogQHJldHVybnMge09iamVjdH1cbiAqKi9cblxuLyoqXG4gKiBJdCBjb252ZXJ0cyBhbiBvYmplY3QgaW50byBhIEZvcm1EYXRhIG9iamVjdFxuICpcbiAqIEBwYXJhbSB7T2JqZWN0PGFueSwgYW55Pn0gb2JqIC0gVGhlIG9iamVjdCB0byBjb252ZXJ0IHRvIGZvcm0gZGF0YS5cbiAqIEBwYXJhbSB7c3RyaW5nfSBmb3JtRGF0YSAtIFRoZSBGb3JtRGF0YSBvYmplY3QgdG8gYXBwZW5kIHRvLlxuICogQHBhcmFtIHtPYmplY3Q8c3RyaW5nLCBhbnk+fSBvcHRpb25zXG4gKlxuICogQHJldHVybnNcbiAqL1xuZnVuY3Rpb24gdG9Gb3JtRGF0YShvYmosIGZvcm1EYXRhLCBvcHRpb25zKSB7XG4gIGlmICghdXRpbHMuaXNPYmplY3Qob2JqKSkge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ3RhcmdldCBtdXN0IGJlIGFuIG9iamVjdCcpO1xuICB9XG5cbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXBhcmFtLXJlYXNzaWduXG4gIGZvcm1EYXRhID0gZm9ybURhdGEgfHwgbmV3IChQbGF0Zm9ybUZvcm1EYXRhIHx8IEZvcm1EYXRhKSgpO1xuXG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1wYXJhbS1yZWFzc2lnblxuICBvcHRpb25zID0gdXRpbHMudG9GbGF0T2JqZWN0KFxuICAgIG9wdGlvbnMsXG4gICAge1xuICAgICAgbWV0YVRva2VuczogdHJ1ZSxcbiAgICAgIGRvdHM6IGZhbHNlLFxuICAgICAgaW5kZXhlczogZmFsc2UsXG4gICAgfSxcbiAgICBmYWxzZSxcbiAgICBmdW5jdGlvbiBkZWZpbmVkKG9wdGlvbiwgc291cmNlKSB7XG4gICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tZXEtbnVsbCxlcWVxZXFcbiAgICAgIHJldHVybiAhdXRpbHMuaXNVbmRlZmluZWQoc291cmNlW29wdGlvbl0pO1xuICAgIH1cbiAgKTtcblxuICBjb25zdCBtZXRhVG9rZW5zID0gb3B0aW9ucy5tZXRhVG9rZW5zO1xuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdXNlLWJlZm9yZS1kZWZpbmVcbiAgY29uc3QgdmlzaXRvciA9IG9wdGlvbnMudmlzaXRvciB8fCBkZWZhdWx0VmlzaXRvcjtcbiAgY29uc3QgZG90cyA9IG9wdGlvbnMuZG90cztcbiAgY29uc3QgaW5kZXhlcyA9IG9wdGlvbnMuaW5kZXhlcztcbiAgY29uc3QgX0Jsb2IgPSBvcHRpb25zLkJsb2IgfHwgKHR5cGVvZiBCbG9iICE9PSAndW5kZWZpbmVkJyAmJiBCbG9iKTtcbiAgY29uc3QgbWF4RGVwdGggPSBvcHRpb25zLm1heERlcHRoID09PSB1bmRlZmluZWQgPyAxMDAgOiBvcHRpb25zLm1heERlcHRoO1xuICBjb25zdCB1c2VCbG9iID0gX0Jsb2IgJiYgdXRpbHMuaXNTcGVjQ29tcGxpYW50Rm9ybShmb3JtRGF0YSk7XG5cbiAgaWYgKCF1dGlscy5pc0Z1bmN0aW9uKHZpc2l0b3IpKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcigndmlzaXRvciBtdXN0IGJlIGEgZnVuY3Rpb24nKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGNvbnZlcnRWYWx1ZSh2YWx1ZSkge1xuICAgIGlmICh2YWx1ZSA9PT0gbnVsbCkgcmV0dXJuICcnO1xuXG4gICAgaWYgKHV0aWxzLmlzRGF0ZSh2YWx1ZSkpIHtcbiAgICAgIHJldHVybiB2YWx1ZS50b0lTT1N0cmluZygpO1xuICAgIH1cblxuICAgIGlmICh1dGlscy5pc0Jvb2xlYW4odmFsdWUpKSB7XG4gICAgICByZXR1cm4gdmFsdWUudG9TdHJpbmcoKTtcbiAgICB9XG5cbiAgICBpZiAoIXVzZUJsb2IgJiYgdXRpbHMuaXNCbG9iKHZhbHVlKSkge1xuICAgICAgdGhyb3cgbmV3IEF4aW9zRXJyb3IoJ0Jsb2IgaXMgbm90IHN1cHBvcnRlZC4gVXNlIGEgQnVmZmVyIGluc3RlYWQuJyk7XG4gICAgfVxuXG4gICAgaWYgKHV0aWxzLmlzQXJyYXlCdWZmZXIodmFsdWUpIHx8IHV0aWxzLmlzVHlwZWRBcnJheSh2YWx1ZSkpIHtcbiAgICAgIHJldHVybiB1c2VCbG9iICYmIHR5cGVvZiBCbG9iID09PSAnZnVuY3Rpb24nID8gbmV3IEJsb2IoW3ZhbHVlXSkgOiBCdWZmZXIuZnJvbSh2YWx1ZSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHZhbHVlO1xuICB9XG5cbiAgLyoqXG4gICAqIERlZmF1bHQgdmlzaXRvci5cbiAgICpcbiAgICogQHBhcmFtIHsqfSB2YWx1ZVxuICAgKiBAcGFyYW0ge1N0cmluZ3xOdW1iZXJ9IGtleVxuICAgKiBAcGFyYW0ge0FycmF5PFN0cmluZ3xOdW1iZXI+fSBwYXRoXG4gICAqIEB0aGlzIHtGb3JtRGF0YX1cbiAgICpcbiAgICogQHJldHVybnMge2Jvb2xlYW59IHJldHVybiB0cnVlIHRvIHZpc2l0IHRoZSBlYWNoIHByb3Agb2YgdGhlIHZhbHVlIHJlY3Vyc2l2ZWx5XG4gICAqL1xuICBmdW5jdGlvbiBkZWZhdWx0VmlzaXRvcih2YWx1ZSwga2V5LCBwYXRoKSB7XG4gICAgbGV0IGFyciA9IHZhbHVlO1xuXG4gICAgaWYgKHV0aWxzLmlzUmVhY3ROYXRpdmUoZm9ybURhdGEpICYmIHV0aWxzLmlzUmVhY3ROYXRpdmVCbG9iKHZhbHVlKSkge1xuICAgICAgZm9ybURhdGEuYXBwZW5kKHJlbmRlcktleShwYXRoLCBrZXksIGRvdHMpLCBjb252ZXJ0VmFsdWUodmFsdWUpKTtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBpZiAodmFsdWUgJiYgIXBhdGggJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0Jykge1xuICAgICAgaWYgKHV0aWxzLmVuZHNXaXRoKGtleSwgJ3t9JykpIHtcbiAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXBhcmFtLXJlYXNzaWduXG4gICAgICAgIGtleSA9IG1ldGFUb2tlbnMgPyBrZXkgOiBrZXkuc2xpY2UoMCwgLTIpO1xuICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tcGFyYW0tcmVhc3NpZ25cbiAgICAgICAgdmFsdWUgPSBKU09OLnN0cmluZ2lmeSh2YWx1ZSk7XG4gICAgICB9IGVsc2UgaWYgKFxuICAgICAgICAodXRpbHMuaXNBcnJheSh2YWx1ZSkgJiYgaXNGbGF0QXJyYXkodmFsdWUpKSB8fFxuICAgICAgICAoKHV0aWxzLmlzRmlsZUxpc3QodmFsdWUpIHx8IHV0aWxzLmVuZHNXaXRoKGtleSwgJ1tdJykpICYmIChhcnIgPSB1dGlscy50b0FycmF5KHZhbHVlKSkpXG4gICAgICApIHtcbiAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXBhcmFtLXJlYXNzaWduXG4gICAgICAgIGtleSA9IHJlbW92ZUJyYWNrZXRzKGtleSk7XG5cbiAgICAgICAgYXJyLmZvckVhY2goZnVuY3Rpb24gZWFjaChlbCwgaW5kZXgpIHtcbiAgICAgICAgICAhKHV0aWxzLmlzVW5kZWZpbmVkKGVsKSB8fCBlbCA9PT0gbnVsbCkgJiZcbiAgICAgICAgICAgIGZvcm1EYXRhLmFwcGVuZChcbiAgICAgICAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLW5lc3RlZC10ZXJuYXJ5XG4gICAgICAgICAgICAgIGluZGV4ZXMgPT09IHRydWVcbiAgICAgICAgICAgICAgICA/IHJlbmRlcktleShba2V5XSwgaW5kZXgsIGRvdHMpXG4gICAgICAgICAgICAgICAgOiBpbmRleGVzID09PSBudWxsXG4gICAgICAgICAgICAgICAgICA/IGtleVxuICAgICAgICAgICAgICAgICAgOiBrZXkgKyAnW10nLFxuICAgICAgICAgICAgICBjb252ZXJ0VmFsdWUoZWwpXG4gICAgICAgICAgICApO1xuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChpc1Zpc2l0YWJsZSh2YWx1ZSkpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cblxuICAgIGZvcm1EYXRhLmFwcGVuZChyZW5kZXJLZXkocGF0aCwga2V5LCBkb3RzKSwgY29udmVydFZhbHVlKHZhbHVlKSk7XG5cbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBjb25zdCBzdGFjayA9IFtdO1xuXG4gIGNvbnN0IGV4cG9zZWRIZWxwZXJzID0gT2JqZWN0LmFzc2lnbihwcmVkaWNhdGVzLCB7XG4gICAgZGVmYXVsdFZpc2l0b3IsXG4gICAgY29udmVydFZhbHVlLFxuICAgIGlzVmlzaXRhYmxlLFxuICB9KTtcblxuICBmdW5jdGlvbiBidWlsZCh2YWx1ZSwgcGF0aCwgZGVwdGggPSAwKSB7XG4gICAgaWYgKHV0aWxzLmlzVW5kZWZpbmVkKHZhbHVlKSkgcmV0dXJuO1xuXG4gICAgaWYgKGRlcHRoID4gbWF4RGVwdGgpIHtcbiAgICAgIHRocm93IG5ldyBBeGlvc0Vycm9yKFxuICAgICAgICAnT2JqZWN0IGlzIHRvbyBkZWVwbHkgbmVzdGVkICgnICsgZGVwdGggKyAnIGxldmVscykuIE1heCBkZXB0aDogJyArIG1heERlcHRoLFxuICAgICAgICBBeGlvc0Vycm9yLkVSUl9GT1JNX0RBVEFfREVQVEhfRVhDRUVERURcbiAgICAgICk7XG4gICAgfVxuXG4gICAgaWYgKHN0YWNrLmluZGV4T2YodmFsdWUpICE9PSAtMSkge1xuICAgICAgdGhyb3cgRXJyb3IoJ0NpcmN1bGFyIHJlZmVyZW5jZSBkZXRlY3RlZCBpbiAnICsgcGF0aC5qb2luKCcuJykpO1xuICAgIH1cblxuICAgIHN0YWNrLnB1c2godmFsdWUpO1xuXG4gICAgdXRpbHMuZm9yRWFjaCh2YWx1ZSwgZnVuY3Rpb24gZWFjaChlbCwga2V5KSB7XG4gICAgICBjb25zdCByZXN1bHQgPVxuICAgICAgICAhKHV0aWxzLmlzVW5kZWZpbmVkKGVsKSB8fCBlbCA9PT0gbnVsbCkgJiZcbiAgICAgICAgdmlzaXRvci5jYWxsKGZvcm1EYXRhLCBlbCwgdXRpbHMuaXNTdHJpbmcoa2V5KSA/IGtleS50cmltKCkgOiBrZXksIHBhdGgsIGV4cG9zZWRIZWxwZXJzKTtcblxuICAgICAgaWYgKHJlc3VsdCA9PT0gdHJ1ZSkge1xuICAgICAgICBidWlsZChlbCwgcGF0aCA/IHBhdGguY29uY2F0KGtleSkgOiBba2V5XSwgZGVwdGggKyAxKTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIHN0YWNrLnBvcCgpO1xuICB9XG5cbiAgaWYgKCF1dGlscy5pc09iamVjdChvYmopKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcignZGF0YSBtdXN0IGJlIGFuIG9iamVjdCcpO1xuICB9XG5cbiAgYnVpbGQob2JqKTtcblxuICByZXR1cm4gZm9ybURhdGE7XG59XG5cbmV4cG9ydCBkZWZhdWx0IHRvRm9ybURhdGE7XG4iLCIndXNlIHN0cmljdCc7XG5cbmltcG9ydCB0b0Zvcm1EYXRhIGZyb20gJy4vdG9Gb3JtRGF0YS5qcyc7XG5cbi8qKlxuICogSXQgZW5jb2RlcyBhIHN0cmluZyBieSByZXBsYWNpbmcgYWxsIGNoYXJhY3RlcnMgdGhhdCBhcmUgbm90IGluIHRoZSB1bnJlc2VydmVkIHNldCB3aXRoXG4gKiB0aGVpciBwZXJjZW50LWVuY29kZWQgZXF1aXZhbGVudHNcbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gc3RyIC0gVGhlIHN0cmluZyB0byBlbmNvZGUuXG4gKlxuICogQHJldHVybnMge3N0cmluZ30gVGhlIGVuY29kZWQgc3RyaW5nLlxuICovXG5mdW5jdGlvbiBlbmNvZGUoc3RyKSB7XG4gIGNvbnN0IGNoYXJNYXAgPSB7XG4gICAgJyEnOiAnJTIxJyxcbiAgICBcIidcIjogJyUyNycsXG4gICAgJygnOiAnJTI4JyxcbiAgICAnKSc6ICclMjknLFxuICAgICd+JzogJyU3RScsXG4gICAgJyUyMCc6ICcrJyxcbiAgfTtcbiAgcmV0dXJuIGVuY29kZVVSSUNvbXBvbmVudChzdHIpLnJlcGxhY2UoL1shJygpfl18JTIwL2csIGZ1bmN0aW9uIHJlcGxhY2VyKG1hdGNoKSB7XG4gICAgcmV0dXJuIGNoYXJNYXBbbWF0Y2hdO1xuICB9KTtcbn1cblxuLyoqXG4gKiBJdCB0YWtlcyBhIHBhcmFtcyBvYmplY3QgYW5kIGNvbnZlcnRzIGl0IHRvIGEgRm9ybURhdGEgb2JqZWN0XG4gKlxuICogQHBhcmFtIHtPYmplY3Q8c3RyaW5nLCBhbnk+fSBwYXJhbXMgLSBUaGUgcGFyYW1ldGVycyB0byBiZSBjb252ZXJ0ZWQgdG8gYSBGb3JtRGF0YSBvYmplY3QuXG4gKiBAcGFyYW0ge09iamVjdDxzdHJpbmcsIGFueT59IG9wdGlvbnMgLSBUaGUgb3B0aW9ucyBvYmplY3QgcGFzc2VkIHRvIHRoZSBBeGlvcyBjb25zdHJ1Y3Rvci5cbiAqXG4gKiBAcmV0dXJucyB7dm9pZH1cbiAqL1xuZnVuY3Rpb24gQXhpb3NVUkxTZWFyY2hQYXJhbXMocGFyYW1zLCBvcHRpb25zKSB7XG4gIHRoaXMuX3BhaXJzID0gW107XG5cbiAgcGFyYW1zICYmIHRvRm9ybURhdGEocGFyYW1zLCB0aGlzLCBvcHRpb25zKTtcbn1cblxuY29uc3QgcHJvdG90eXBlID0gQXhpb3NVUkxTZWFyY2hQYXJhbXMucHJvdG90eXBlO1xuXG5wcm90b3R5cGUuYXBwZW5kID0gZnVuY3Rpb24gYXBwZW5kKG5hbWUsIHZhbHVlKSB7XG4gIHRoaXMuX3BhaXJzLnB1c2goW25hbWUsIHZhbHVlXSk7XG59O1xuXG5wcm90b3R5cGUudG9TdHJpbmcgPSBmdW5jdGlvbiB0b1N0cmluZyhlbmNvZGVyKSB7XG4gIGNvbnN0IF9lbmNvZGUgPSBlbmNvZGVyXG4gICAgPyBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgcmV0dXJuIGVuY29kZXIuY2FsbCh0aGlzLCB2YWx1ZSwgZW5jb2RlKTtcbiAgICAgIH1cbiAgICA6IGVuY29kZTtcblxuICByZXR1cm4gdGhpcy5fcGFpcnNcbiAgICAubWFwKGZ1bmN0aW9uIGVhY2gocGFpcikge1xuICAgICAgcmV0dXJuIF9lbmNvZGUocGFpclswXSkgKyAnPScgKyBfZW5jb2RlKHBhaXJbMV0pO1xuICAgIH0sICcnKVxuICAgIC5qb2luKCcmJyk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBBeGlvc1VSTFNlYXJjaFBhcmFtcztcbiIsIid1c2Ugc3RyaWN0JztcblxuaW1wb3J0IHV0aWxzIGZyb20gJy4uL3V0aWxzLmpzJztcbmltcG9ydCBBeGlvc1VSTFNlYXJjaFBhcmFtcyBmcm9tICcuLi9oZWxwZXJzL0F4aW9zVVJMU2VhcmNoUGFyYW1zLmpzJztcblxuLyoqXG4gKiBJdCByZXBsYWNlcyBVUkwtZW5jb2RlZCBmb3JtcyBvZiBgOmAsIGAkYCwgYCxgLCBhbmQgc3BhY2VzIHdpdGhcbiAqIHRoZWlyIHBsYWluIGNvdW50ZXJwYXJ0cyAoYDpgLCBgJGAsIGAsYCwgYCtgKS5cbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gdmFsIFRoZSB2YWx1ZSB0byBiZSBlbmNvZGVkLlxuICpcbiAqIEByZXR1cm5zIHtzdHJpbmd9IFRoZSBlbmNvZGVkIHZhbHVlLlxuICovXG5leHBvcnQgZnVuY3Rpb24gZW5jb2RlKHZhbCkge1xuICByZXR1cm4gZW5jb2RlVVJJQ29tcG9uZW50KHZhbClcbiAgICAucmVwbGFjZSgvJTNBL2dpLCAnOicpXG4gICAgLnJlcGxhY2UoLyUyNC9nLCAnJCcpXG4gICAgLnJlcGxhY2UoLyUyQy9naSwgJywnKVxuICAgIC5yZXBsYWNlKC8lMjAvZywgJysnKTtcbn1cblxuLyoqXG4gKiBCdWlsZCBhIFVSTCBieSBhcHBlbmRpbmcgcGFyYW1zIHRvIHRoZSBlbmRcbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gdXJsIFRoZSBiYXNlIG9mIHRoZSB1cmwgKGUuZy4sIGh0dHA6Ly93d3cuZ29vZ2xlLmNvbSlcbiAqIEBwYXJhbSB7b2JqZWN0fSBbcGFyYW1zXSBUaGUgcGFyYW1zIHRvIGJlIGFwcGVuZGVkXG4gKiBAcGFyYW0gez8ob2JqZWN0fEZ1bmN0aW9uKX0gb3B0aW9uc1xuICpcbiAqIEByZXR1cm5zIHtzdHJpbmd9IFRoZSBmb3JtYXR0ZWQgdXJsXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGJ1aWxkVVJMKHVybCwgcGFyYW1zLCBvcHRpb25zKSB7XG4gIGlmICghcGFyYW1zKSB7XG4gICAgcmV0dXJuIHVybDtcbiAgfVxuXG4gIGNvbnN0IF9lbmNvZGUgPSAob3B0aW9ucyAmJiBvcHRpb25zLmVuY29kZSkgfHwgZW5jb2RlO1xuXG4gIGNvbnN0IF9vcHRpb25zID0gdXRpbHMuaXNGdW5jdGlvbihvcHRpb25zKVxuICAgID8ge1xuICAgICAgICBzZXJpYWxpemU6IG9wdGlvbnMsXG4gICAgICB9XG4gICAgOiBvcHRpb25zO1xuXG4gIGNvbnN0IHNlcmlhbGl6ZUZuID0gX29wdGlvbnMgJiYgX29wdGlvbnMuc2VyaWFsaXplO1xuXG4gIGxldCBzZXJpYWxpemVkUGFyYW1zO1xuXG4gIGlmIChzZXJpYWxpemVGbikge1xuICAgIHNlcmlhbGl6ZWRQYXJhbXMgPSBzZXJpYWxpemVGbihwYXJhbXMsIF9vcHRpb25zKTtcbiAgfSBlbHNlIHtcbiAgICBzZXJpYWxpemVkUGFyYW1zID0gdXRpbHMuaXNVUkxTZWFyY2hQYXJhbXMocGFyYW1zKVxuICAgICAgPyBwYXJhbXMudG9TdHJpbmcoKVxuICAgICAgOiBuZXcgQXhpb3NVUkxTZWFyY2hQYXJhbXMocGFyYW1zLCBfb3B0aW9ucykudG9TdHJpbmcoX2VuY29kZSk7XG4gIH1cblxuICBpZiAoc2VyaWFsaXplZFBhcmFtcykge1xuICAgIGNvbnN0IGhhc2htYXJrSW5kZXggPSB1cmwuaW5kZXhPZignIycpO1xuXG4gICAgaWYgKGhhc2htYXJrSW5kZXggIT09IC0xKSB7XG4gICAgICB1cmwgPSB1cmwuc2xpY2UoMCwgaGFzaG1hcmtJbmRleCk7XG4gICAgfVxuICAgIHVybCArPSAodXJsLmluZGV4T2YoJz8nKSA9PT0gLTEgPyAnPycgOiAnJicpICsgc2VyaWFsaXplZFBhcmFtcztcbiAgfVxuXG4gIHJldHVybiB1cmw7XG59XG4iLCIndXNlIHN0cmljdCc7XG5cbmltcG9ydCB1dGlscyBmcm9tICcuLi91dGlscy5qcyc7XG5cbmNsYXNzIEludGVyY2VwdG9yTWFuYWdlciB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMuaGFuZGxlcnMgPSBbXTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBZGQgYSBuZXcgaW50ZXJjZXB0b3IgdG8gdGhlIHN0YWNrXG4gICAqXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IGZ1bGZpbGxlZCBUaGUgZnVuY3Rpb24gdG8gaGFuZGxlIGB0aGVuYCBmb3IgYSBgUHJvbWlzZWBcbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gcmVqZWN0ZWQgVGhlIGZ1bmN0aW9uIHRvIGhhbmRsZSBgcmVqZWN0YCBmb3IgYSBgUHJvbWlzZWBcbiAgICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnMgVGhlIG9wdGlvbnMgZm9yIHRoZSBpbnRlcmNlcHRvciwgc3luY2hyb25vdXMgYW5kIHJ1bldoZW5cbiAgICpcbiAgICogQHJldHVybiB7TnVtYmVyfSBBbiBJRCB1c2VkIHRvIHJlbW92ZSBpbnRlcmNlcHRvciBsYXRlclxuICAgKi9cbiAgdXNlKGZ1bGZpbGxlZCwgcmVqZWN0ZWQsIG9wdGlvbnMpIHtcbiAgICB0aGlzLmhhbmRsZXJzLnB1c2goe1xuICAgICAgZnVsZmlsbGVkLFxuICAgICAgcmVqZWN0ZWQsXG4gICAgICBzeW5jaHJvbm91czogb3B0aW9ucyA/IG9wdGlvbnMuc3luY2hyb25vdXMgOiBmYWxzZSxcbiAgICAgIHJ1bldoZW46IG9wdGlvbnMgPyBvcHRpb25zLnJ1bldoZW4gOiBudWxsLFxuICAgIH0pO1xuICAgIHJldHVybiB0aGlzLmhhbmRsZXJzLmxlbmd0aCAtIDE7XG4gIH1cblxuICAvKipcbiAgICogUmVtb3ZlIGFuIGludGVyY2VwdG9yIGZyb20gdGhlIHN0YWNrXG4gICAqXG4gICAqIEBwYXJhbSB7TnVtYmVyfSBpZCBUaGUgSUQgdGhhdCB3YXMgcmV0dXJuZWQgYnkgYHVzZWBcbiAgICpcbiAgICogQHJldHVybnMge3ZvaWR9XG4gICAqL1xuICBlamVjdChpZCkge1xuICAgIGlmICh0aGlzLmhhbmRsZXJzW2lkXSkge1xuICAgICAgdGhpcy5oYW5kbGVyc1tpZF0gPSBudWxsO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBDbGVhciBhbGwgaW50ZXJjZXB0b3JzIGZyb20gdGhlIHN0YWNrXG4gICAqXG4gICAqIEByZXR1cm5zIHt2b2lkfVxuICAgKi9cbiAgY2xlYXIoKSB7XG4gICAgaWYgKHRoaXMuaGFuZGxlcnMpIHtcbiAgICAgIHRoaXMuaGFuZGxlcnMgPSBbXTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogSXRlcmF0ZSBvdmVyIGFsbCB0aGUgcmVnaXN0ZXJlZCBpbnRlcmNlcHRvcnNcbiAgICpcbiAgICogVGhpcyBtZXRob2QgaXMgcGFydGljdWxhcmx5IHVzZWZ1bCBmb3Igc2tpcHBpbmcgb3ZlciBhbnlcbiAgICogaW50ZXJjZXB0b3JzIHRoYXQgbWF5IGhhdmUgYmVjb21lIGBudWxsYCBjYWxsaW5nIGBlamVjdGAuXG4gICAqXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IGZuIFRoZSBmdW5jdGlvbiB0byBjYWxsIGZvciBlYWNoIGludGVyY2VwdG9yXG4gICAqXG4gICAqIEByZXR1cm5zIHt2b2lkfVxuICAgKi9cbiAgZm9yRWFjaChmbikge1xuICAgIHV0aWxzLmZvckVhY2godGhpcy5oYW5kbGVycywgZnVuY3Rpb24gZm9yRWFjaEhhbmRsZXIoaCkge1xuICAgICAgaWYgKGggIT09IG51bGwpIHtcbiAgICAgICAgZm4oaCk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgSW50ZXJjZXB0b3JNYW5hZ2VyO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gIHNpbGVudEpTT05QYXJzaW5nOiB0cnVlLFxuICBmb3JjZWRKU09OUGFyc2luZzogdHJ1ZSxcbiAgY2xhcmlmeVRpbWVvdXRFcnJvcjogZmFsc2UsXG4gIGxlZ2FjeUludGVyY2VwdG9yUmVxUmVzT3JkZXJpbmc6IHRydWUsXG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQgQXhpb3NVUkxTZWFyY2hQYXJhbXMgZnJvbSAnLi4vLi4vLi4vaGVscGVycy9BeGlvc1VSTFNlYXJjaFBhcmFtcy5qcyc7XG5leHBvcnQgZGVmYXVsdCB0eXBlb2YgVVJMU2VhcmNoUGFyYW1zICE9PSAndW5kZWZpbmVkJyA/IFVSTFNlYXJjaFBhcmFtcyA6IEF4aW9zVVJMU2VhcmNoUGFyYW1zO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5leHBvcnQgZGVmYXVsdCB0eXBlb2YgRm9ybURhdGEgIT09ICd1bmRlZmluZWQnID8gRm9ybURhdGEgOiBudWxsO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5leHBvcnQgZGVmYXVsdCB0eXBlb2YgQmxvYiAhPT0gJ3VuZGVmaW5lZCcgPyBCbG9iIDogbnVsbDtcbiIsImltcG9ydCBVUkxTZWFyY2hQYXJhbXMgZnJvbSAnLi9jbGFzc2VzL1VSTFNlYXJjaFBhcmFtcy5qcyc7XG5pbXBvcnQgRm9ybURhdGEgZnJvbSAnLi9jbGFzc2VzL0Zvcm1EYXRhLmpzJztcbmltcG9ydCBCbG9iIGZyb20gJy4vY2xhc3Nlcy9CbG9iLmpzJztcblxuZXhwb3J0IGRlZmF1bHQge1xuICBpc0Jyb3dzZXI6IHRydWUsXG4gIGNsYXNzZXM6IHtcbiAgICBVUkxTZWFyY2hQYXJhbXMsXG4gICAgRm9ybURhdGEsXG4gICAgQmxvYixcbiAgfSxcbiAgcHJvdG9jb2xzOiBbJ2h0dHAnLCAnaHR0cHMnLCAnZmlsZScsICdibG9iJywgJ3VybCcsICdkYXRhJ10sXG59O1xuIiwiY29uc3QgaGFzQnJvd3NlckVudiA9IHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnICYmIHR5cGVvZiBkb2N1bWVudCAhPT0gJ3VuZGVmaW5lZCc7XG5cbmNvbnN0IF9uYXZpZ2F0b3IgPSAodHlwZW9mIG5hdmlnYXRvciA9PT0gJ29iamVjdCcgJiYgbmF2aWdhdG9yKSB8fCB1bmRlZmluZWQ7XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIHdlJ3JlIHJ1bm5pbmcgaW4gYSBzdGFuZGFyZCBicm93c2VyIGVudmlyb25tZW50XG4gKlxuICogVGhpcyBhbGxvd3MgYXhpb3MgdG8gcnVuIGluIGEgd2ViIHdvcmtlciwgYW5kIHJlYWN0LW5hdGl2ZS5cbiAqIEJvdGggZW52aXJvbm1lbnRzIHN1cHBvcnQgWE1MSHR0cFJlcXVlc3QsIGJ1dCBub3QgZnVsbHkgc3RhbmRhcmQgZ2xvYmFscy5cbiAqXG4gKiB3ZWIgd29ya2VyczpcbiAqICB0eXBlb2Ygd2luZG93IC0+IHVuZGVmaW5lZFxuICogIHR5cGVvZiBkb2N1bWVudCAtPiB1bmRlZmluZWRcbiAqXG4gKiByZWFjdC1uYXRpdmU6XG4gKiAgbmF2aWdhdG9yLnByb2R1Y3QgLT4gJ1JlYWN0TmF0aXZlJ1xuICogbmF0aXZlc2NyaXB0XG4gKiAgbmF2aWdhdG9yLnByb2R1Y3QgLT4gJ05hdGl2ZVNjcmlwdCcgb3IgJ05TJ1xuICpcbiAqIEByZXR1cm5zIHtib29sZWFufVxuICovXG5jb25zdCBoYXNTdGFuZGFyZEJyb3dzZXJFbnYgPVxuICBoYXNCcm93c2VyRW52ICYmXG4gICghX25hdmlnYXRvciB8fCBbJ1JlYWN0TmF0aXZlJywgJ05hdGl2ZVNjcmlwdCcsICdOUyddLmluZGV4T2YoX25hdmlnYXRvci5wcm9kdWN0KSA8IDApO1xuXG4vKipcbiAqIERldGVybWluZSBpZiB3ZSdyZSBydW5uaW5nIGluIGEgc3RhbmRhcmQgYnJvd3NlciB3ZWJXb3JrZXIgZW52aXJvbm1lbnRcbiAqXG4gKiBBbHRob3VnaCB0aGUgYGlzU3RhbmRhcmRCcm93c2VyRW52YCBtZXRob2QgaW5kaWNhdGVzIHRoYXRcbiAqIGBhbGxvd3MgYXhpb3MgdG8gcnVuIGluIGEgd2ViIHdvcmtlcmAsIHRoZSBXZWJXb3JrZXIgd2lsbCBzdGlsbCBiZVxuICogZmlsdGVyZWQgb3V0IGR1ZSB0byBpdHMganVkZ21lbnQgc3RhbmRhcmRcbiAqIGB0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJyAmJiB0eXBlb2YgZG9jdW1lbnQgIT09ICd1bmRlZmluZWQnYC5cbiAqIFRoaXMgbGVhZHMgdG8gYSBwcm9ibGVtIHdoZW4gYXhpb3MgcG9zdCBgRm9ybURhdGFgIGluIHdlYldvcmtlclxuICovXG5jb25zdCBoYXNTdGFuZGFyZEJyb3dzZXJXZWJXb3JrZXJFbnYgPSAoKCkgPT4ge1xuICByZXR1cm4gKFxuICAgIHR5cGVvZiBXb3JrZXJHbG9iYWxTY29wZSAhPT0gJ3VuZGVmaW5lZCcgJiZcbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW5kZWZcbiAgICBzZWxmIGluc3RhbmNlb2YgV29ya2VyR2xvYmFsU2NvcGUgJiZcbiAgICB0eXBlb2Ygc2VsZi5pbXBvcnRTY3JpcHRzID09PSAnZnVuY3Rpb24nXG4gICk7XG59KSgpO1xuXG5jb25zdCBvcmlnaW4gPSAoaGFzQnJvd3NlckVudiAmJiB3aW5kb3cubG9jYXRpb24uaHJlZikgfHwgJ2h0dHA6Ly9sb2NhbGhvc3QnO1xuXG5leHBvcnQge1xuICBoYXNCcm93c2VyRW52LFxuICBoYXNTdGFuZGFyZEJyb3dzZXJXZWJXb3JrZXJFbnYsXG4gIGhhc1N0YW5kYXJkQnJvd3NlckVudixcbiAgX25hdmlnYXRvciBhcyBuYXZpZ2F0b3IsXG4gIG9yaWdpbixcbn07XG4iLCJpbXBvcnQgcGxhdGZvcm0gZnJvbSAnLi9ub2RlL2luZGV4LmpzJztcbmltcG9ydCAqIGFzIHV0aWxzIGZyb20gJy4vY29tbW9uL3V0aWxzLmpzJztcblxuZXhwb3J0IGRlZmF1bHQge1xuICAuLi51dGlscyxcbiAgLi4ucGxhdGZvcm0sXG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQgdXRpbHMgZnJvbSAnLi4vdXRpbHMuanMnO1xuaW1wb3J0IHRvRm9ybURhdGEgZnJvbSAnLi90b0Zvcm1EYXRhLmpzJztcbmltcG9ydCBwbGF0Zm9ybSBmcm9tICcuLi9wbGF0Zm9ybS9pbmRleC5qcyc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHRvVVJMRW5jb2RlZEZvcm0oZGF0YSwgb3B0aW9ucykge1xuICByZXR1cm4gdG9Gb3JtRGF0YShkYXRhLCBuZXcgcGxhdGZvcm0uY2xhc3Nlcy5VUkxTZWFyY2hQYXJhbXMoKSwge1xuICAgIHZpc2l0b3I6IGZ1bmN0aW9uICh2YWx1ZSwga2V5LCBwYXRoLCBoZWxwZXJzKSB7XG4gICAgICBpZiAocGxhdGZvcm0uaXNOb2RlICYmIHV0aWxzLmlzQnVmZmVyKHZhbHVlKSkge1xuICAgICAgICB0aGlzLmFwcGVuZChrZXksIHZhbHVlLnRvU3RyaW5nKCdiYXNlNjQnKSk7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGhlbHBlcnMuZGVmYXVsdFZpc2l0b3IuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICB9LFxuICAgIC4uLm9wdGlvbnMsXG4gIH0pO1xufVxuIiwiJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQgdXRpbHMgZnJvbSAnLi4vdXRpbHMuanMnO1xuXG4vKipcbiAqIEl0IHRha2VzIGEgc3RyaW5nIGxpa2UgYGZvb1t4XVt5XVt6XWAgYW5kIHJldHVybnMgYW4gYXJyYXkgbGlrZSBgWydmb28nLCAneCcsICd5JywgJ3onXVxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lIC0gVGhlIG5hbWUgb2YgdGhlIHByb3BlcnR5IHRvIGdldC5cbiAqXG4gKiBAcmV0dXJucyBBbiBhcnJheSBvZiBzdHJpbmdzLlxuICovXG5mdW5jdGlvbiBwYXJzZVByb3BQYXRoKG5hbWUpIHtcbiAgLy8gZm9vW3hdW3ldW3pdXG4gIC8vIGZvby54LnkuelxuICAvLyBmb28teC15LXpcbiAgLy8gZm9vIHggeSB6XG4gIHJldHVybiB1dGlscy5tYXRjaEFsbCgvXFx3K3xcXFsoXFx3KildL2csIG5hbWUpLm1hcCgobWF0Y2gpID0+IHtcbiAgICByZXR1cm4gbWF0Y2hbMF0gPT09ICdbXScgPyAnJyA6IG1hdGNoWzFdIHx8IG1hdGNoWzBdO1xuICB9KTtcbn1cblxuLyoqXG4gKiBDb252ZXJ0IGFuIGFycmF5IHRvIGFuIG9iamVjdC5cbiAqXG4gKiBAcGFyYW0ge0FycmF5PGFueT59IGFyciAtIFRoZSBhcnJheSB0byBjb252ZXJ0IHRvIGFuIG9iamVjdC5cbiAqXG4gKiBAcmV0dXJucyBBbiBvYmplY3Qgd2l0aCB0aGUgc2FtZSBrZXlzIGFuZCB2YWx1ZXMgYXMgdGhlIGFycmF5LlxuICovXG5mdW5jdGlvbiBhcnJheVRvT2JqZWN0KGFycikge1xuICBjb25zdCBvYmogPSB7fTtcbiAgY29uc3Qga2V5cyA9IE9iamVjdC5rZXlzKGFycik7XG4gIGxldCBpO1xuICBjb25zdCBsZW4gPSBrZXlzLmxlbmd0aDtcbiAgbGV0IGtleTtcbiAgZm9yIChpID0gMDsgaSA8IGxlbjsgaSsrKSB7XG4gICAga2V5ID0ga2V5c1tpXTtcbiAgICBvYmpba2V5XSA9IGFycltrZXldO1xuICB9XG4gIHJldHVybiBvYmo7XG59XG5cbi8qKlxuICogSXQgdGFrZXMgYSBGb3JtRGF0YSBvYmplY3QgYW5kIHJldHVybnMgYSBKYXZhU2NyaXB0IG9iamVjdFxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBmb3JtRGF0YSBUaGUgRm9ybURhdGEgb2JqZWN0IHRvIGNvbnZlcnQgdG8gSlNPTi5cbiAqXG4gKiBAcmV0dXJucyB7T2JqZWN0PHN0cmluZywgYW55PiB8IG51bGx9IFRoZSBjb252ZXJ0ZWQgb2JqZWN0LlxuICovXG5mdW5jdGlvbiBmb3JtRGF0YVRvSlNPTihmb3JtRGF0YSkge1xuICBmdW5jdGlvbiBidWlsZFBhdGgocGF0aCwgdmFsdWUsIHRhcmdldCwgaW5kZXgpIHtcbiAgICBsZXQgbmFtZSA9IHBhdGhbaW5kZXgrK107XG5cbiAgICBpZiAobmFtZSA9PT0gJ19fcHJvdG9fXycpIHJldHVybiB0cnVlO1xuXG4gICAgY29uc3QgaXNOdW1lcmljS2V5ID0gTnVtYmVyLmlzRmluaXRlKCtuYW1lKTtcbiAgICBjb25zdCBpc0xhc3QgPSBpbmRleCA+PSBwYXRoLmxlbmd0aDtcbiAgICBuYW1lID0gIW5hbWUgJiYgdXRpbHMuaXNBcnJheSh0YXJnZXQpID8gdGFyZ2V0Lmxlbmd0aCA6IG5hbWU7XG5cbiAgICBpZiAoaXNMYXN0KSB7XG4gICAgICBpZiAodXRpbHMuaGFzT3duUHJvcCh0YXJnZXQsIG5hbWUpKSB7XG4gICAgICAgIHRhcmdldFtuYW1lXSA9IHV0aWxzLmlzQXJyYXkodGFyZ2V0W25hbWVdKVxuICAgICAgICAgID8gdGFyZ2V0W25hbWVdLmNvbmNhdCh2YWx1ZSlcbiAgICAgICAgICA6IFt0YXJnZXRbbmFtZV0sIHZhbHVlXTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRhcmdldFtuYW1lXSA9IHZhbHVlO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gIWlzTnVtZXJpY0tleTtcbiAgICB9XG5cbiAgICBpZiAoIXRhcmdldFtuYW1lXSB8fCAhdXRpbHMuaXNPYmplY3QodGFyZ2V0W25hbWVdKSkge1xuICAgICAgdGFyZ2V0W25hbWVdID0gW107XG4gICAgfVxuXG4gICAgY29uc3QgcmVzdWx0ID0gYnVpbGRQYXRoKHBhdGgsIHZhbHVlLCB0YXJnZXRbbmFtZV0sIGluZGV4KTtcblxuICAgIGlmIChyZXN1bHQgJiYgdXRpbHMuaXNBcnJheSh0YXJnZXRbbmFtZV0pKSB7XG4gICAgICB0YXJnZXRbbmFtZV0gPSBhcnJheVRvT2JqZWN0KHRhcmdldFtuYW1lXSk7XG4gICAgfVxuXG4gICAgcmV0dXJuICFpc051bWVyaWNLZXk7XG4gIH1cblxuICBpZiAodXRpbHMuaXNGb3JtRGF0YShmb3JtRGF0YSkgJiYgdXRpbHMuaXNGdW5jdGlvbihmb3JtRGF0YS5lbnRyaWVzKSkge1xuICAgIGNvbnN0IG9iaiA9IHt9O1xuXG4gICAgdXRpbHMuZm9yRWFjaEVudHJ5KGZvcm1EYXRhLCAobmFtZSwgdmFsdWUpID0+IHtcbiAgICAgIGJ1aWxkUGF0aChwYXJzZVByb3BQYXRoKG5hbWUpLCB2YWx1ZSwgb2JqLCAwKTtcbiAgICB9KTtcblxuICAgIHJldHVybiBvYmo7XG4gIH1cblxuICByZXR1cm4gbnVsbDtcbn1cblxuZXhwb3J0IGRlZmF1bHQgZm9ybURhdGFUb0pTT047XG4iLCIndXNlIHN0cmljdCc7XG5cbmltcG9ydCB1dGlscyBmcm9tICcuLi91dGlscy5qcyc7XG5pbXBvcnQgQXhpb3NFcnJvciBmcm9tICcuLi9jb3JlL0F4aW9zRXJyb3IuanMnO1xuaW1wb3J0IHRyYW5zaXRpb25hbERlZmF1bHRzIGZyb20gJy4vdHJhbnNpdGlvbmFsLmpzJztcbmltcG9ydCB0b0Zvcm1EYXRhIGZyb20gJy4uL2hlbHBlcnMvdG9Gb3JtRGF0YS5qcyc7XG5pbXBvcnQgdG9VUkxFbmNvZGVkRm9ybSBmcm9tICcuLi9oZWxwZXJzL3RvVVJMRW5jb2RlZEZvcm0uanMnO1xuaW1wb3J0IHBsYXRmb3JtIGZyb20gJy4uL3BsYXRmb3JtL2luZGV4LmpzJztcbmltcG9ydCBmb3JtRGF0YVRvSlNPTiBmcm9tICcuLi9oZWxwZXJzL2Zvcm1EYXRhVG9KU09OLmpzJztcblxuY29uc3Qgb3duID0gKG9iaiwga2V5KSA9PiAob2JqICE9IG51bGwgJiYgdXRpbHMuaGFzT3duUHJvcChvYmosIGtleSkgPyBvYmpba2V5XSA6IHVuZGVmaW5lZCk7XG5cbi8qKlxuICogSXQgdGFrZXMgYSBzdHJpbmcsIHRyaWVzIHRvIHBhcnNlIGl0LCBhbmQgaWYgaXQgZmFpbHMsIGl0IHJldHVybnMgdGhlIHN0cmluZ2lmaWVkIHZlcnNpb25cbiAqIG9mIHRoZSBpbnB1dFxuICpcbiAqIEBwYXJhbSB7YW55fSByYXdWYWx1ZSAtIFRoZSB2YWx1ZSB0byBiZSBzdHJpbmdpZmllZC5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IHBhcnNlciAtIEEgZnVuY3Rpb24gdGhhdCBwYXJzZXMgYSBzdHJpbmcgaW50byBhIEphdmFTY3JpcHQgb2JqZWN0LlxuICogQHBhcmFtIHtGdW5jdGlvbn0gZW5jb2RlciAtIEEgZnVuY3Rpb24gdGhhdCB0YWtlcyBhIHZhbHVlIGFuZCByZXR1cm5zIGEgc3RyaW5nLlxuICpcbiAqIEByZXR1cm5zIHtzdHJpbmd9IEEgc3RyaW5naWZpZWQgdmVyc2lvbiBvZiB0aGUgcmF3VmFsdWUuXG4gKi9cbmZ1bmN0aW9uIHN0cmluZ2lmeVNhZmVseShyYXdWYWx1ZSwgcGFyc2VyLCBlbmNvZGVyKSB7XG4gIGlmICh1dGlscy5pc1N0cmluZyhyYXdWYWx1ZSkpIHtcbiAgICB0cnkge1xuICAgICAgKHBhcnNlciB8fCBKU09OLnBhcnNlKShyYXdWYWx1ZSk7XG4gICAgICByZXR1cm4gdXRpbHMudHJpbShyYXdWYWx1ZSk7XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgaWYgKGUubmFtZSAhPT0gJ1N5bnRheEVycm9yJykge1xuICAgICAgICB0aHJvdyBlO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiAoZW5jb2RlciB8fCBKU09OLnN0cmluZ2lmeSkocmF3VmFsdWUpO1xufVxuXG5jb25zdCBkZWZhdWx0cyA9IHtcbiAgdHJhbnNpdGlvbmFsOiB0cmFuc2l0aW9uYWxEZWZhdWx0cyxcblxuICBhZGFwdGVyOiBbJ3hocicsICdodHRwJywgJ2ZldGNoJ10sXG5cbiAgdHJhbnNmb3JtUmVxdWVzdDogW1xuICAgIGZ1bmN0aW9uIHRyYW5zZm9ybVJlcXVlc3QoZGF0YSwgaGVhZGVycykge1xuICAgICAgY29uc3QgY29udGVudFR5cGUgPSBoZWFkZXJzLmdldENvbnRlbnRUeXBlKCkgfHwgJyc7XG4gICAgICBjb25zdCBoYXNKU09OQ29udGVudFR5cGUgPSBjb250ZW50VHlwZS5pbmRleE9mKCdhcHBsaWNhdGlvbi9qc29uJykgPiAtMTtcbiAgICAgIGNvbnN0IGlzT2JqZWN0UGF5bG9hZCA9IHV0aWxzLmlzT2JqZWN0KGRhdGEpO1xuXG4gICAgICBpZiAoaXNPYmplY3RQYXlsb2FkICYmIHV0aWxzLmlzSFRNTEZvcm0oZGF0YSkpIHtcbiAgICAgICAgZGF0YSA9IG5ldyBGb3JtRGF0YShkYXRhKTtcbiAgICAgIH1cblxuICAgICAgY29uc3QgaXNGb3JtRGF0YSA9IHV0aWxzLmlzRm9ybURhdGEoZGF0YSk7XG5cbiAgICAgIGlmIChpc0Zvcm1EYXRhKSB7XG4gICAgICAgIHJldHVybiBoYXNKU09OQ29udGVudFR5cGUgPyBKU09OLnN0cmluZ2lmeShmb3JtRGF0YVRvSlNPTihkYXRhKSkgOiBkYXRhO1xuICAgICAgfVxuXG4gICAgICBpZiAoXG4gICAgICAgIHV0aWxzLmlzQXJyYXlCdWZmZXIoZGF0YSkgfHxcbiAgICAgICAgdXRpbHMuaXNCdWZmZXIoZGF0YSkgfHxcbiAgICAgICAgdXRpbHMuaXNTdHJlYW0oZGF0YSkgfHxcbiAgICAgICAgdXRpbHMuaXNGaWxlKGRhdGEpIHx8XG4gICAgICAgIHV0aWxzLmlzQmxvYihkYXRhKSB8fFxuICAgICAgICB1dGlscy5pc1JlYWRhYmxlU3RyZWFtKGRhdGEpXG4gICAgICApIHtcbiAgICAgICAgcmV0dXJuIGRhdGE7XG4gICAgICB9XG4gICAgICBpZiAodXRpbHMuaXNBcnJheUJ1ZmZlclZpZXcoZGF0YSkpIHtcbiAgICAgICAgcmV0dXJuIGRhdGEuYnVmZmVyO1xuICAgICAgfVxuICAgICAgaWYgKHV0aWxzLmlzVVJMU2VhcmNoUGFyYW1zKGRhdGEpKSB7XG4gICAgICAgIGhlYWRlcnMuc2V0Q29udGVudFR5cGUoJ2FwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZDtjaGFyc2V0PXV0Zi04JywgZmFsc2UpO1xuICAgICAgICByZXR1cm4gZGF0YS50b1N0cmluZygpO1xuICAgICAgfVxuXG4gICAgICBsZXQgaXNGaWxlTGlzdDtcblxuICAgICAgaWYgKGlzT2JqZWN0UGF5bG9hZCkge1xuICAgICAgICBjb25zdCBmb3JtU2VyaWFsaXplciA9IG93bih0aGlzLCAnZm9ybVNlcmlhbGl6ZXInKTtcbiAgICAgICAgaWYgKGNvbnRlbnRUeXBlLmluZGV4T2YoJ2FwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZCcpID4gLTEpIHtcbiAgICAgICAgICByZXR1cm4gdG9VUkxFbmNvZGVkRm9ybShkYXRhLCBmb3JtU2VyaWFsaXplcikudG9TdHJpbmcoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChcbiAgICAgICAgICAoaXNGaWxlTGlzdCA9IHV0aWxzLmlzRmlsZUxpc3QoZGF0YSkpIHx8XG4gICAgICAgICAgY29udGVudFR5cGUuaW5kZXhPZignbXVsdGlwYXJ0L2Zvcm0tZGF0YScpID4gLTFcbiAgICAgICAgKSB7XG4gICAgICAgICAgY29uc3QgZW52ID0gb3duKHRoaXMsICdlbnYnKTtcbiAgICAgICAgICBjb25zdCBfRm9ybURhdGEgPSBlbnYgJiYgZW52LkZvcm1EYXRhO1xuXG4gICAgICAgICAgcmV0dXJuIHRvRm9ybURhdGEoXG4gICAgICAgICAgICBpc0ZpbGVMaXN0ID8geyAnZmlsZXNbXSc6IGRhdGEgfSA6IGRhdGEsXG4gICAgICAgICAgICBfRm9ybURhdGEgJiYgbmV3IF9Gb3JtRGF0YSgpLFxuICAgICAgICAgICAgZm9ybVNlcmlhbGl6ZXJcbiAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmIChpc09iamVjdFBheWxvYWQgfHwgaGFzSlNPTkNvbnRlbnRUeXBlKSB7XG4gICAgICAgIGhlYWRlcnMuc2V0Q29udGVudFR5cGUoJ2FwcGxpY2F0aW9uL2pzb24nLCBmYWxzZSk7XG4gICAgICAgIHJldHVybiBzdHJpbmdpZnlTYWZlbHkoZGF0YSk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBkYXRhO1xuICAgIH0sXG4gIF0sXG5cbiAgdHJhbnNmb3JtUmVzcG9uc2U6IFtcbiAgICBmdW5jdGlvbiB0cmFuc2Zvcm1SZXNwb25zZShkYXRhKSB7XG4gICAgICBjb25zdCB0cmFuc2l0aW9uYWwgPSBvd24odGhpcywgJ3RyYW5zaXRpb25hbCcpIHx8IGRlZmF1bHRzLnRyYW5zaXRpb25hbDtcbiAgICAgIGNvbnN0IGZvcmNlZEpTT05QYXJzaW5nID0gdHJhbnNpdGlvbmFsICYmIHRyYW5zaXRpb25hbC5mb3JjZWRKU09OUGFyc2luZztcbiAgICAgIGNvbnN0IHJlc3BvbnNlVHlwZSA9IG93bih0aGlzLCAncmVzcG9uc2VUeXBlJyk7XG4gICAgICBjb25zdCBKU09OUmVxdWVzdGVkID0gcmVzcG9uc2VUeXBlID09PSAnanNvbic7XG5cbiAgICAgIGlmICh1dGlscy5pc1Jlc3BvbnNlKGRhdGEpIHx8IHV0aWxzLmlzUmVhZGFibGVTdHJlYW0oZGF0YSkpIHtcbiAgICAgICAgcmV0dXJuIGRhdGE7XG4gICAgICB9XG5cbiAgICAgIGlmIChcbiAgICAgICAgZGF0YSAmJlxuICAgICAgICB1dGlscy5pc1N0cmluZyhkYXRhKSAmJlxuICAgICAgICAoKGZvcmNlZEpTT05QYXJzaW5nICYmICFyZXNwb25zZVR5cGUpIHx8IEpTT05SZXF1ZXN0ZWQpXG4gICAgICApIHtcbiAgICAgICAgY29uc3Qgc2lsZW50SlNPTlBhcnNpbmcgPSB0cmFuc2l0aW9uYWwgJiYgdHJhbnNpdGlvbmFsLnNpbGVudEpTT05QYXJzaW5nO1xuICAgICAgICBjb25zdCBzdHJpY3RKU09OUGFyc2luZyA9ICFzaWxlbnRKU09OUGFyc2luZyAmJiBKU09OUmVxdWVzdGVkO1xuXG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgcmV0dXJuIEpTT04ucGFyc2UoZGF0YSwgb3duKHRoaXMsICdwYXJzZVJldml2ZXInKSk7XG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICBpZiAoc3RyaWN0SlNPTlBhcnNpbmcpIHtcbiAgICAgICAgICAgIGlmIChlLm5hbWUgPT09ICdTeW50YXhFcnJvcicpIHtcbiAgICAgICAgICAgICAgdGhyb3cgQXhpb3NFcnJvci5mcm9tKGUsIEF4aW9zRXJyb3IuRVJSX0JBRF9SRVNQT05TRSwgdGhpcywgbnVsbCwgb3duKHRoaXMsICdyZXNwb25zZScpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRocm93IGU7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBkYXRhO1xuICAgIH0sXG4gIF0sXG5cbiAgLyoqXG4gICAqIEEgdGltZW91dCBpbiBtaWxsaXNlY29uZHMgdG8gYWJvcnQgYSByZXF1ZXN0LiBJZiBzZXQgdG8gMCAoZGVmYXVsdCkgYVxuICAgKiB0aW1lb3V0IGlzIG5vdCBjcmVhdGVkLlxuICAgKi9cbiAgdGltZW91dDogMCxcblxuICB4c3JmQ29va2llTmFtZTogJ1hTUkYtVE9LRU4nLFxuICB4c3JmSGVhZGVyTmFtZTogJ1gtWFNSRi1UT0tFTicsXG5cbiAgbWF4Q29udGVudExlbmd0aDogLTEsXG4gIG1heEJvZHlMZW5ndGg6IC0xLFxuXG4gIGVudjoge1xuICAgIEZvcm1EYXRhOiBwbGF0Zm9ybS5jbGFzc2VzLkZvcm1EYXRhLFxuICAgIEJsb2I6IHBsYXRmb3JtLmNsYXNzZXMuQmxvYixcbiAgfSxcblxuICB2YWxpZGF0ZVN0YXR1czogZnVuY3Rpb24gdmFsaWRhdGVTdGF0dXMoc3RhdHVzKSB7XG4gICAgcmV0dXJuIHN0YXR1cyA+PSAyMDAgJiYgc3RhdHVzIDwgMzAwO1xuICB9LFxuXG4gIGhlYWRlcnM6IHtcbiAgICBjb21tb246IHtcbiAgICAgIEFjY2VwdDogJ2FwcGxpY2F0aW9uL2pzb24sIHRleHQvcGxhaW4sICovKicsXG4gICAgICAnQ29udGVudC1UeXBlJzogdW5kZWZpbmVkLFxuICAgIH0sXG4gIH0sXG59O1xuXG51dGlscy5mb3JFYWNoKFsnZGVsZXRlJywgJ2dldCcsICdoZWFkJywgJ3Bvc3QnLCAncHV0JywgJ3BhdGNoJywgJ3F1ZXJ5J10sIChtZXRob2QpID0+IHtcbiAgZGVmYXVsdHMuaGVhZGVyc1ttZXRob2RdID0ge307XG59KTtcblxuZXhwb3J0IGRlZmF1bHQgZGVmYXVsdHM7XG4iLCIndXNlIHN0cmljdCc7XG5cbmltcG9ydCB1dGlscyBmcm9tICcuLi91dGlscy5qcyc7XG5pbXBvcnQgZGVmYXVsdHMgZnJvbSAnLi4vZGVmYXVsdHMvaW5kZXguanMnO1xuaW1wb3J0IEF4aW9zSGVhZGVycyBmcm9tICcuLi9jb3JlL0F4aW9zSGVhZGVycy5qcyc7XG5cbi8qKlxuICogVHJhbnNmb3JtIHRoZSBkYXRhIGZvciBhIHJlcXVlc3Qgb3IgYSByZXNwb25zZVxuICpcbiAqIEBwYXJhbSB7QXJyYXl8RnVuY3Rpb259IGZucyBBIHNpbmdsZSBmdW5jdGlvbiBvciBBcnJheSBvZiBmdW5jdGlvbnNcbiAqIEBwYXJhbSB7P09iamVjdH0gcmVzcG9uc2UgVGhlIHJlc3BvbnNlIG9iamVjdFxuICpcbiAqIEByZXR1cm5zIHsqfSBUaGUgcmVzdWx0aW5nIHRyYW5zZm9ybWVkIGRhdGFcbiAqL1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gdHJhbnNmb3JtRGF0YShmbnMsIHJlc3BvbnNlKSB7XG4gIGNvbnN0IGNvbmZpZyA9IHRoaXMgfHwgZGVmYXVsdHM7XG4gIGNvbnN0IGNvbnRleHQgPSByZXNwb25zZSB8fCBjb25maWc7XG4gIGNvbnN0IGhlYWRlcnMgPSBBeGlvc0hlYWRlcnMuZnJvbShjb250ZXh0LmhlYWRlcnMpO1xuICBsZXQgZGF0YSA9IGNvbnRleHQuZGF0YTtcblxuICB1dGlscy5mb3JFYWNoKGZucywgZnVuY3Rpb24gdHJhbnNmb3JtKGZuKSB7XG4gICAgZGF0YSA9IGZuLmNhbGwoY29uZmlnLCBkYXRhLCBoZWFkZXJzLm5vcm1hbGl6ZSgpLCByZXNwb25zZSA/IHJlc3BvbnNlLnN0YXR1cyA6IHVuZGVmaW5lZCk7XG4gIH0pO1xuXG4gIGhlYWRlcnMubm9ybWFsaXplKCk7XG5cbiAgcmV0dXJuIGRhdGE7XG59XG4iLCIndXNlIHN0cmljdCc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGlzQ2FuY2VsKHZhbHVlKSB7XG4gIHJldHVybiAhISh2YWx1ZSAmJiB2YWx1ZS5fX0NBTkNFTF9fKTtcbn1cbiIsIid1c2Ugc3RyaWN0JztcblxuaW1wb3J0IEF4aW9zRXJyb3IgZnJvbSAnLi4vY29yZS9BeGlvc0Vycm9yLmpzJztcblxuY2xhc3MgQ2FuY2VsZWRFcnJvciBleHRlbmRzIEF4aW9zRXJyb3Ige1xuICAvKipcbiAgICogQSBgQ2FuY2VsZWRFcnJvcmAgaXMgYW4gb2JqZWN0IHRoYXQgaXMgdGhyb3duIHdoZW4gYW4gb3BlcmF0aW9uIGlzIGNhbmNlbGVkLlxuICAgKlxuICAgKiBAcGFyYW0ge3N0cmluZz19IG1lc3NhZ2UgVGhlIG1lc3NhZ2UuXG4gICAqIEBwYXJhbSB7T2JqZWN0PX0gY29uZmlnIFRoZSBjb25maWcuXG4gICAqIEBwYXJhbSB7T2JqZWN0PX0gcmVxdWVzdCBUaGUgcmVxdWVzdC5cbiAgICpcbiAgICogQHJldHVybnMge0NhbmNlbGVkRXJyb3J9IFRoZSBjcmVhdGVkIGVycm9yLlxuICAgKi9cbiAgY29uc3RydWN0b3IobWVzc2FnZSwgY29uZmlnLCByZXF1ZXN0KSB7XG4gICAgc3VwZXIobWVzc2FnZSA9PSBudWxsID8gJ2NhbmNlbGVkJyA6IG1lc3NhZ2UsIEF4aW9zRXJyb3IuRVJSX0NBTkNFTEVELCBjb25maWcsIHJlcXVlc3QpO1xuICAgIHRoaXMubmFtZSA9ICdDYW5jZWxlZEVycm9yJztcbiAgICB0aGlzLl9fQ0FOQ0VMX18gPSB0cnVlO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IENhbmNlbGVkRXJyb3I7XG4iLCIndXNlIHN0cmljdCc7XG5cbmltcG9ydCBBeGlvc0Vycm9yIGZyb20gJy4vQXhpb3NFcnJvci5qcyc7XG5cbi8qKlxuICogUmVzb2x2ZSBvciByZWplY3QgYSBQcm9taXNlIGJhc2VkIG9uIHJlc3BvbnNlIHN0YXR1cy5cbiAqXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSByZXNvbHZlIEEgZnVuY3Rpb24gdGhhdCByZXNvbHZlcyB0aGUgcHJvbWlzZS5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IHJlamVjdCBBIGZ1bmN0aW9uIHRoYXQgcmVqZWN0cyB0aGUgcHJvbWlzZS5cbiAqIEBwYXJhbSB7b2JqZWN0fSByZXNwb25zZSBUaGUgcmVzcG9uc2UuXG4gKlxuICogQHJldHVybnMge29iamVjdH0gVGhlIHJlc3BvbnNlLlxuICovXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBzZXR0bGUocmVzb2x2ZSwgcmVqZWN0LCByZXNwb25zZSkge1xuICBjb25zdCB2YWxpZGF0ZVN0YXR1cyA9IHJlc3BvbnNlLmNvbmZpZy52YWxpZGF0ZVN0YXR1cztcbiAgaWYgKCFyZXNwb25zZS5zdGF0dXMgfHwgIXZhbGlkYXRlU3RhdHVzIHx8IHZhbGlkYXRlU3RhdHVzKHJlc3BvbnNlLnN0YXR1cykpIHtcbiAgICByZXNvbHZlKHJlc3BvbnNlKTtcbiAgfSBlbHNlIHtcbiAgICByZWplY3QobmV3IEF4aW9zRXJyb3IoXG4gICAgICAnUmVxdWVzdCBmYWlsZWQgd2l0aCBzdGF0dXMgY29kZSAnICsgcmVzcG9uc2Uuc3RhdHVzLFxuICAgICAgcmVzcG9uc2Uuc3RhdHVzID49IDQwMCAmJiByZXNwb25zZS5zdGF0dXMgPCA1MDAgPyBBeGlvc0Vycm9yLkVSUl9CQURfUkVRVUVTVCA6IEF4aW9zRXJyb3IuRVJSX0JBRF9SRVNQT05TRSxcbiAgICAgIHJlc3BvbnNlLmNvbmZpZyxcbiAgICAgIHJlc3BvbnNlLnJlcXVlc3QsXG4gICAgICByZXNwb25zZVxuICAgICkpO1xuICB9XG59XG4iLCIndXNlIHN0cmljdCc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHBhcnNlUHJvdG9jb2wodXJsKSB7XG4gIGNvbnN0IG1hdGNoID0gL14oWy0rXFx3XXsxLDI1fSk6KD86XFwvXFwvKT8vLmV4ZWModXJsKTtcbiAgcmV0dXJuIChtYXRjaCAmJiBtYXRjaFsxXSkgfHwgJyc7XG59XG4iLCIndXNlIHN0cmljdCc7XG5cbi8qKlxuICogQ2FsY3VsYXRlIGRhdGEgbWF4UmF0ZVxuICogQHBhcmFtIHtOdW1iZXJ9IFtzYW1wbGVzQ291bnQ9IDEwXVxuICogQHBhcmFtIHtOdW1iZXJ9IFttaW49IDEwMDBdXG4gKiBAcmV0dXJucyB7RnVuY3Rpb259XG4gKi9cbmZ1bmN0aW9uIHNwZWVkb21ldGVyKHNhbXBsZXNDb3VudCwgbWluKSB7XG4gIHNhbXBsZXNDb3VudCA9IHNhbXBsZXNDb3VudCB8fCAxMDtcbiAgY29uc3QgYnl0ZXMgPSBuZXcgQXJyYXkoc2FtcGxlc0NvdW50KTtcbiAgY29uc3QgdGltZXN0YW1wcyA9IG5ldyBBcnJheShzYW1wbGVzQ291bnQpO1xuICBsZXQgaGVhZCA9IDA7XG4gIGxldCB0YWlsID0gMDtcbiAgbGV0IGZpcnN0U2FtcGxlVFM7XG5cbiAgbWluID0gbWluICE9PSB1bmRlZmluZWQgPyBtaW4gOiAxMDAwO1xuXG4gIHJldHVybiBmdW5jdGlvbiBwdXNoKGNodW5rTGVuZ3RoKSB7XG4gICAgY29uc3Qgbm93ID0gRGF0ZS5ub3coKTtcblxuICAgIGNvbnN0IHN0YXJ0ZWRBdCA9IHRpbWVzdGFtcHNbdGFpbF07XG5cbiAgICBpZiAoIWZpcnN0U2FtcGxlVFMpIHtcbiAgICAgIGZpcnN0U2FtcGxlVFMgPSBub3c7XG4gICAgfVxuXG4gICAgYnl0ZXNbaGVhZF0gPSBjaHVua0xlbmd0aDtcbiAgICB0aW1lc3RhbXBzW2hlYWRdID0gbm93O1xuXG4gICAgbGV0IGkgPSB0YWlsO1xuICAgIGxldCBieXRlc0NvdW50ID0gMDtcblxuICAgIHdoaWxlIChpICE9PSBoZWFkKSB7XG4gICAgICBieXRlc0NvdW50ICs9IGJ5dGVzW2krK107XG4gICAgICBpID0gaSAlIHNhbXBsZXNDb3VudDtcbiAgICB9XG5cbiAgICBoZWFkID0gKGhlYWQgKyAxKSAlIHNhbXBsZXNDb3VudDtcblxuICAgIGlmIChoZWFkID09PSB0YWlsKSB7XG4gICAgICB0YWlsID0gKHRhaWwgKyAxKSAlIHNhbXBsZXNDb3VudDtcbiAgICB9XG5cbiAgICBpZiAobm93IC0gZmlyc3RTYW1wbGVUUyA8IG1pbikge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IHBhc3NlZCA9IHN0YXJ0ZWRBdCAmJiBub3cgLSBzdGFydGVkQXQ7XG5cbiAgICByZXR1cm4gcGFzc2VkID8gTWF0aC5yb3VuZCgoYnl0ZXNDb3VudCAqIDEwMDApIC8gcGFzc2VkKSA6IHVuZGVmaW5lZDtcbiAgfTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgc3BlZWRvbWV0ZXI7XG4iLCIvKipcbiAqIFRocm90dGxlIGRlY29yYXRvclxuICogQHBhcmFtIHtGdW5jdGlvbn0gZm5cbiAqIEBwYXJhbSB7TnVtYmVyfSBmcmVxXG4gKiBAcmV0dXJuIHtGdW5jdGlvbn1cbiAqL1xuZnVuY3Rpb24gdGhyb3R0bGUoZm4sIGZyZXEpIHtcbiAgbGV0IHRpbWVzdGFtcCA9IDA7XG4gIGxldCB0aHJlc2hvbGQgPSAxMDAwIC8gZnJlcTtcbiAgbGV0IGxhc3RBcmdzO1xuICBsZXQgdGltZXI7XG5cbiAgY29uc3QgaW52b2tlID0gKGFyZ3MsIG5vdyA9IERhdGUubm93KCkpID0+IHtcbiAgICB0aW1lc3RhbXAgPSBub3c7XG4gICAgbGFzdEFyZ3MgPSBudWxsO1xuICAgIGlmICh0aW1lcikge1xuICAgICAgY2xlYXJUaW1lb3V0KHRpbWVyKTtcbiAgICAgIHRpbWVyID0gbnVsbDtcbiAgICB9XG4gICAgZm4oLi4uYXJncyk7XG4gIH07XG5cbiAgY29uc3QgdGhyb3R0bGVkID0gKC4uLmFyZ3MpID0+IHtcbiAgICBjb25zdCBub3cgPSBEYXRlLm5vdygpO1xuICAgIGNvbnN0IHBhc3NlZCA9IG5vdyAtIHRpbWVzdGFtcDtcbiAgICBpZiAocGFzc2VkID49IHRocmVzaG9sZCkge1xuICAgICAgaW52b2tlKGFyZ3MsIG5vdyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGxhc3RBcmdzID0gYXJncztcbiAgICAgIGlmICghdGltZXIpIHtcbiAgICAgICAgdGltZXIgPSBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICB0aW1lciA9IG51bGw7XG4gICAgICAgICAgaW52b2tlKGxhc3RBcmdzKTtcbiAgICAgICAgfSwgdGhyZXNob2xkIC0gcGFzc2VkKTtcbiAgICAgIH1cbiAgICB9XG4gIH07XG5cbiAgY29uc3QgZmx1c2ggPSAoKSA9PiBsYXN0QXJncyAmJiBpbnZva2UobGFzdEFyZ3MpO1xuXG4gIHJldHVybiBbdGhyb3R0bGVkLCBmbHVzaF07XG59XG5cbmV4cG9ydCBkZWZhdWx0IHRocm90dGxlO1xuIiwiaW1wb3J0IHNwZWVkb21ldGVyIGZyb20gJy4vc3BlZWRvbWV0ZXIuanMnO1xuaW1wb3J0IHRocm90dGxlIGZyb20gJy4vdGhyb3R0bGUuanMnO1xuaW1wb3J0IHV0aWxzIGZyb20gJy4uL3V0aWxzLmpzJztcblxuZXhwb3J0IGNvbnN0IHByb2dyZXNzRXZlbnRSZWR1Y2VyID0gKGxpc3RlbmVyLCBpc0Rvd25sb2FkU3RyZWFtLCBmcmVxID0gMykgPT4ge1xuICBsZXQgYnl0ZXNOb3RpZmllZCA9IDA7XG4gIGNvbnN0IF9zcGVlZG9tZXRlciA9IHNwZWVkb21ldGVyKDUwLCAyNTApO1xuXG4gIHJldHVybiB0aHJvdHRsZSgoZSkgPT4ge1xuICAgIGNvbnN0IHJhd0xvYWRlZCA9IGUubG9hZGVkO1xuICAgIGNvbnN0IHRvdGFsID0gZS5sZW5ndGhDb21wdXRhYmxlID8gZS50b3RhbCA6IHVuZGVmaW5lZDtcbiAgICBjb25zdCBsb2FkZWQgPSB0b3RhbCAhPSBudWxsID8gTWF0aC5taW4ocmF3TG9hZGVkLCB0b3RhbCkgOiByYXdMb2FkZWQ7XG4gICAgY29uc3QgcHJvZ3Jlc3NCeXRlcyA9IE1hdGgubWF4KDAsIGxvYWRlZCAtIGJ5dGVzTm90aWZpZWQpO1xuICAgIGNvbnN0IHJhdGUgPSBfc3BlZWRvbWV0ZXIocHJvZ3Jlc3NCeXRlcyk7XG5cbiAgICBieXRlc05vdGlmaWVkID0gTWF0aC5tYXgoYnl0ZXNOb3RpZmllZCwgbG9hZGVkKTtcblxuICAgIGNvbnN0IGRhdGEgPSB7XG4gICAgICBsb2FkZWQsXG4gICAgICB0b3RhbCxcbiAgICAgIHByb2dyZXNzOiB0b3RhbCA/IGxvYWRlZCAvIHRvdGFsIDogdW5kZWZpbmVkLFxuICAgICAgYnl0ZXM6IHByb2dyZXNzQnl0ZXMsXG4gICAgICByYXRlOiByYXRlID8gcmF0ZSA6IHVuZGVmaW5lZCxcbiAgICAgIGVzdGltYXRlZDogcmF0ZSAmJiB0b3RhbCA/ICh0b3RhbCAtIGxvYWRlZCkgLyByYXRlIDogdW5kZWZpbmVkLFxuICAgICAgZXZlbnQ6IGUsXG4gICAgICBsZW5ndGhDb21wdXRhYmxlOiB0b3RhbCAhPSBudWxsLFxuICAgICAgW2lzRG93bmxvYWRTdHJlYW0gPyAnZG93bmxvYWQnIDogJ3VwbG9hZCddOiB0cnVlLFxuICAgIH07XG5cbiAgICBsaXN0ZW5lcihkYXRhKTtcbiAgfSwgZnJlcSk7XG59O1xuXG5leHBvcnQgY29uc3QgcHJvZ3Jlc3NFdmVudERlY29yYXRvciA9ICh0b3RhbCwgdGhyb3R0bGVkKSA9PiB7XG4gIGNvbnN0IGxlbmd0aENvbXB1dGFibGUgPSB0b3RhbCAhPSBudWxsO1xuXG4gIHJldHVybiBbXG4gICAgKGxvYWRlZCkgPT5cbiAgICAgIHRocm90dGxlZFswXSh7XG4gICAgICAgIGxlbmd0aENvbXB1dGFibGUsXG4gICAgICAgIHRvdGFsLFxuICAgICAgICBsb2FkZWQsXG4gICAgICB9KSxcbiAgICB0aHJvdHRsZWRbMV0sXG4gIF07XG59O1xuXG5leHBvcnQgY29uc3QgYXN5bmNEZWNvcmF0b3IgPVxuICAoZm4pID0+XG4gICguLi5hcmdzKSA9PlxuICAgIHV0aWxzLmFzYXAoKCkgPT4gZm4oLi4uYXJncykpO1xuIiwiaW1wb3J0IHBsYXRmb3JtIGZyb20gJy4uL3BsYXRmb3JtL2luZGV4LmpzJztcblxuZXhwb3J0IGRlZmF1bHQgcGxhdGZvcm0uaGFzU3RhbmRhcmRCcm93c2VyRW52XG4gID8gKChvcmlnaW4sIGlzTVNJRSkgPT4gKHVybCkgPT4ge1xuICAgICAgdXJsID0gbmV3IFVSTCh1cmwsIHBsYXRmb3JtLm9yaWdpbik7XG5cbiAgICAgIHJldHVybiAoXG4gICAgICAgIG9yaWdpbi5wcm90b2NvbCA9PT0gdXJsLnByb3RvY29sICYmXG4gICAgICAgIG9yaWdpbi5ob3N0ID09PSB1cmwuaG9zdCAmJlxuICAgICAgICAoaXNNU0lFIHx8IG9yaWdpbi5wb3J0ID09PSB1cmwucG9ydClcbiAgICAgICk7XG4gICAgfSkoXG4gICAgICBuZXcgVVJMKHBsYXRmb3JtLm9yaWdpbiksXG4gICAgICBwbGF0Zm9ybS5uYXZpZ2F0b3IgJiYgLyhtc2llfHRyaWRlbnQpL2kudGVzdChwbGF0Zm9ybS5uYXZpZ2F0b3IudXNlckFnZW50KVxuICAgIClcbiAgOiAoKSA9PiB0cnVlO1xuIiwiaW1wb3J0IHV0aWxzIGZyb20gJy4uL3V0aWxzLmpzJztcbmltcG9ydCBwbGF0Zm9ybSBmcm9tICcuLi9wbGF0Zm9ybS9pbmRleC5qcyc7XG5cbmV4cG9ydCBkZWZhdWx0IHBsYXRmb3JtLmhhc1N0YW5kYXJkQnJvd3NlckVudlxuICA/IC8vIFN0YW5kYXJkIGJyb3dzZXIgZW52cyBzdXBwb3J0IGRvY3VtZW50LmNvb2tpZVxuICAgIHtcbiAgICAgIHdyaXRlKG5hbWUsIHZhbHVlLCBleHBpcmVzLCBwYXRoLCBkb21haW4sIHNlY3VyZSwgc2FtZVNpdGUpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBkb2N1bWVudCA9PT0gJ3VuZGVmaW5lZCcpIHJldHVybjtcblxuICAgICAgICBjb25zdCBjb29raWUgPSBbYCR7bmFtZX09JHtlbmNvZGVVUklDb21wb25lbnQodmFsdWUpfWBdO1xuXG4gICAgICAgIGlmICh1dGlscy5pc051bWJlcihleHBpcmVzKSkge1xuICAgICAgICAgIGNvb2tpZS5wdXNoKGBleHBpcmVzPSR7bmV3IERhdGUoZXhwaXJlcykudG9VVENTdHJpbmcoKX1gKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodXRpbHMuaXNTdHJpbmcocGF0aCkpIHtcbiAgICAgICAgICBjb29raWUucHVzaChgcGF0aD0ke3BhdGh9YCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHV0aWxzLmlzU3RyaW5nKGRvbWFpbikpIHtcbiAgICAgICAgICBjb29raWUucHVzaChgZG9tYWluPSR7ZG9tYWlufWApO1xuICAgICAgICB9XG4gICAgICAgIGlmIChzZWN1cmUgPT09IHRydWUpIHtcbiAgICAgICAgICBjb29raWUucHVzaCgnc2VjdXJlJyk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHV0aWxzLmlzU3RyaW5nKHNhbWVTaXRlKSkge1xuICAgICAgICAgIGNvb2tpZS5wdXNoKGBTYW1lU2l0ZT0ke3NhbWVTaXRlfWApO1xuICAgICAgICB9XG5cbiAgICAgICAgZG9jdW1lbnQuY29va2llID0gY29va2llLmpvaW4oJzsgJyk7XG4gICAgICB9LFxuXG4gICAgICByZWFkKG5hbWUpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBkb2N1bWVudCA9PT0gJ3VuZGVmaW5lZCcpIHJldHVybiBudWxsO1xuICAgICAgICAvLyBNYXRjaCBuYW1lPXZhbHVlIGJ5IHNwbGl0dGluZyBvbiB0aGUgc2VtaWNvbG9uIHNlcGFyYXRvciBpbnN0ZWFkIG9mIGJ1aWxkaW5nIGFcbiAgICAgICAgLy8gUmVnRXhwIGZyb20gYG5hbWVgIOKAlCBpbnRlcnBvbGF0aW5nIGFuIHVuZXNjYXBlZCBzdHJpbmcgaW50byBhIFJlZ0V4cCB3b3VsZCBsZXRcbiAgICAgICAgLy8gbWV0YWNoYXJhY3RlcnMgKGUuZy4gYC4rP2AgaW4gYW4gYXR0YWNrZXItaW5mbHVlbmNlZCBjb29raWUgbmFtZSkgY2F1c2UgUmVEb1Mgb3JcbiAgICAgICAgLy8gbWF0Y2ggdGhlIHdyb25nIGNvb2tpZS4gQnJvd3NlcnMgbWF5IHNlcmlhbGl6ZSBjb29raWUgcGFpcnMgYXMgZWl0aGVyIFwiO1wiIG9yXG4gICAgICAgIC8vIFwiOyBcIiwgc28gaWdub3JlIG9wdGlvbmFsIHdoaXRlc3BhY2UgYmVmb3JlIGVhY2ggY29va2llIG5hbWUuXG4gICAgICAgIGNvbnN0IGNvb2tpZXMgPSBkb2N1bWVudC5jb29raWUuc3BsaXQoJzsnKTtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjb29raWVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgY29uc3QgY29va2llID0gY29va2llc1tpXS5yZXBsYWNlKC9eXFxzKy8sICcnKTtcbiAgICAgICAgICBjb25zdCBlcSA9IGNvb2tpZS5pbmRleE9mKCc9Jyk7XG4gICAgICAgICAgaWYgKGVxICE9PSAtMSAmJiBjb29raWUuc2xpY2UoMCwgZXEpID09PSBuYW1lKSB7XG4gICAgICAgICAgICByZXR1cm4gZGVjb2RlVVJJQ29tcG9uZW50KGNvb2tpZS5zbGljZShlcSArIDEpKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICB9LFxuXG4gICAgICByZW1vdmUobmFtZSkge1xuICAgICAgICB0aGlzLndyaXRlKG5hbWUsICcnLCBEYXRlLm5vdygpIC0gODY0MDAwMDAsICcvJyk7XG4gICAgICB9LFxuICAgIH1cbiAgOiAvLyBOb24tc3RhbmRhcmQgYnJvd3NlciBlbnYgKHdlYiB3b3JrZXJzLCByZWFjdC1uYXRpdmUpIGxhY2sgbmVlZGVkIHN1cHBvcnQuXG4gICAge1xuICAgICAgd3JpdGUoKSB7fSxcbiAgICAgIHJlYWQoKSB7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgICAgfSxcbiAgICAgIHJlbW92ZSgpIHt9LFxuICAgIH07XG4iLCIndXNlIHN0cmljdCc7XG5cbi8qKlxuICogRGV0ZXJtaW5lcyB3aGV0aGVyIHRoZSBzcGVjaWZpZWQgVVJMIGlzIGFic29sdXRlXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IHVybCBUaGUgVVJMIHRvIHRlc3RcbiAqXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB0aGUgc3BlY2lmaWVkIFVSTCBpcyBhYnNvbHV0ZSwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGlzQWJzb2x1dGVVUkwodXJsKSB7XG4gIC8vIEEgVVJMIGlzIGNvbnNpZGVyZWQgYWJzb2x1dGUgaWYgaXQgYmVnaW5zIHdpdGggXCI8c2NoZW1lPjovL1wiIG9yIFwiLy9cIiAocHJvdG9jb2wtcmVsYXRpdmUgVVJMKS5cbiAgLy8gUkZDIDM5ODYgZGVmaW5lcyBzY2hlbWUgbmFtZSBhcyBhIHNlcXVlbmNlIG9mIGNoYXJhY3RlcnMgYmVnaW5uaW5nIHdpdGggYSBsZXR0ZXIgYW5kIGZvbGxvd2VkXG4gIC8vIGJ5IGFueSBjb21iaW5hdGlvbiBvZiBsZXR0ZXJzLCBkaWdpdHMsIHBsdXMsIHBlcmlvZCwgb3IgaHlwaGVuLlxuICBpZiAodHlwZW9mIHVybCAhPT0gJ3N0cmluZycpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICByZXR1cm4gL14oW2Etel1bYS16XFxkK1xcLS5dKjopP1xcL1xcLy9pLnRlc3QodXJsKTtcbn1cbiIsIid1c2Ugc3RyaWN0JztcblxuLyoqXG4gKiBDcmVhdGVzIGEgbmV3IFVSTCBieSBjb21iaW5pbmcgdGhlIHNwZWNpZmllZCBVUkxzXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IGJhc2VVUkwgVGhlIGJhc2UgVVJMXG4gKiBAcGFyYW0ge3N0cmluZ30gcmVsYXRpdmVVUkwgVGhlIHJlbGF0aXZlIFVSTFxuICpcbiAqIEByZXR1cm5zIHtzdHJpbmd9IFRoZSBjb21iaW5lZCBVUkxcbiAqL1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY29tYmluZVVSTHMoYmFzZVVSTCwgcmVsYXRpdmVVUkwpIHtcbiAgcmV0dXJuIHJlbGF0aXZlVVJMXG4gICAgPyBiYXNlVVJMLnJlcGxhY2UoL1xcLz9cXC8kLywgJycpICsgJy8nICsgcmVsYXRpdmVVUkwucmVwbGFjZSgvXlxcLysvLCAnJylcbiAgICA6IGJhc2VVUkw7XG59XG4iLCIndXNlIHN0cmljdCc7XG5cbmltcG9ydCBpc0Fic29sdXRlVVJMIGZyb20gJy4uL2hlbHBlcnMvaXNBYnNvbHV0ZVVSTC5qcyc7XG5pbXBvcnQgY29tYmluZVVSTHMgZnJvbSAnLi4vaGVscGVycy9jb21iaW5lVVJMcy5qcyc7XG5cbi8qKlxuICogQ3JlYXRlcyBhIG5ldyBVUkwgYnkgY29tYmluaW5nIHRoZSBiYXNlVVJMIHdpdGggdGhlIHJlcXVlc3RlZFVSTCxcbiAqIG9ubHkgd2hlbiB0aGUgcmVxdWVzdGVkVVJMIGlzIG5vdCBhbHJlYWR5IGFuIGFic29sdXRlIFVSTC5cbiAqIElmIHRoZSByZXF1ZXN0VVJMIGlzIGFic29sdXRlLCB0aGlzIGZ1bmN0aW9uIHJldHVybnMgdGhlIHJlcXVlc3RlZFVSTCB1bnRvdWNoZWQuXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IGJhc2VVUkwgVGhlIGJhc2UgVVJMXG4gKiBAcGFyYW0ge3N0cmluZ30gcmVxdWVzdGVkVVJMIEFic29sdXRlIG9yIHJlbGF0aXZlIFVSTCB0byBjb21iaW5lXG4gKlxuICogQHJldHVybnMge3N0cmluZ30gVGhlIGNvbWJpbmVkIGZ1bGwgcGF0aFxuICovXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBidWlsZEZ1bGxQYXRoKGJhc2VVUkwsIHJlcXVlc3RlZFVSTCwgYWxsb3dBYnNvbHV0ZVVybHMpIHtcbiAgbGV0IGlzUmVsYXRpdmVVcmwgPSAhaXNBYnNvbHV0ZVVSTChyZXF1ZXN0ZWRVUkwpO1xuICBpZiAoYmFzZVVSTCAmJiAoaXNSZWxhdGl2ZVVybCB8fCBhbGxvd0Fic29sdXRlVXJscyA9PT0gZmFsc2UpKSB7XG4gICAgcmV0dXJuIGNvbWJpbmVVUkxzKGJhc2VVUkwsIHJlcXVlc3RlZFVSTCk7XG4gIH1cbiAgcmV0dXJuIHJlcXVlc3RlZFVSTDtcbn1cbiIsIid1c2Ugc3RyaWN0JztcblxuaW1wb3J0IHV0aWxzIGZyb20gJy4uL3V0aWxzLmpzJztcbmltcG9ydCBBeGlvc0hlYWRlcnMgZnJvbSAnLi9BeGlvc0hlYWRlcnMuanMnO1xuXG5jb25zdCBoZWFkZXJzVG9PYmplY3QgPSAodGhpbmcpID0+ICh0aGluZyBpbnN0YW5jZW9mIEF4aW9zSGVhZGVycyA/IHsgLi4udGhpbmcgfSA6IHRoaW5nKTtcblxuLyoqXG4gKiBDb25maWctc3BlY2lmaWMgbWVyZ2UtZnVuY3Rpb24gd2hpY2ggY3JlYXRlcyBhIG5ldyBjb25maWctb2JqZWN0XG4gKiBieSBtZXJnaW5nIHR3byBjb25maWd1cmF0aW9uIG9iamVjdHMgdG9nZXRoZXIuXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IGNvbmZpZzFcbiAqIEBwYXJhbSB7T2JqZWN0fSBjb25maWcyXG4gKlxuICogQHJldHVybnMge09iamVjdH0gTmV3IG9iamVjdCByZXN1bHRpbmcgZnJvbSBtZXJnaW5nIGNvbmZpZzIgdG8gY29uZmlnMVxuICovXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBtZXJnZUNvbmZpZyhjb25maWcxLCBjb25maWcyKSB7XG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1wYXJhbS1yZWFzc2lnblxuICBjb25maWcyID0gY29uZmlnMiB8fCB7fTtcblxuICAvLyBVc2UgYSBudWxsLXByb3RvdHlwZSBvYmplY3Qgc28gdGhhdCBkb3duc3RyZWFtIHJlYWRzIHN1Y2ggYXMgYGNvbmZpZy5hdXRoYFxuICAvLyBvciBgY29uZmlnLmJhc2VVUkxgIGNhbm5vdCBpbmhlcml0IHBvbGx1dGVkIHZhbHVlcyBmcm9tIE9iamVjdC5wcm90b3R5cGUuXG4gIC8vIGBoYXNPd25Qcm9wZXJ0eWAgaXMgcmVzdG9yZWQgYXMgYSBub24tZW51bWVyYWJsZSBvd24gc2xvdCB0byBwcmVzZXJ2ZVxuICAvLyBlcmdvbm9taWNzIGZvciB1c2VyIGNvZGUgdGhhdCByZWxpZXMgb24gaXQuXG4gIGNvbnN0IGNvbmZpZyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShjb25maWcsICdoYXNPd25Qcm9wZXJ0eScsIHtcbiAgICAvLyBOdWxsLXByb3RvIGRlc2NyaXB0b3Igc28gYSBwb2xsdXRlZCBPYmplY3QucHJvdG90eXBlLmdldCBjYW5ub3QgdHVyblxuICAgIC8vIHRoaXMgZGF0YSBkZXNjcmlwdG9yIGludG8gYW4gYWNjZXNzb3IgZGVzY3JpcHRvciBvbiB0aGUgd2F5IGluLlxuICAgIF9fcHJvdG9fXzogbnVsbCxcbiAgICB2YWx1ZTogT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eSxcbiAgICBlbnVtZXJhYmxlOiBmYWxzZSxcbiAgICB3cml0YWJsZTogdHJ1ZSxcbiAgICBjb25maWd1cmFibGU6IHRydWUsXG4gIH0pO1xuXG4gIGZ1bmN0aW9uIGdldE1lcmdlZFZhbHVlKHRhcmdldCwgc291cmNlLCBwcm9wLCBjYXNlbGVzcykge1xuICAgIGlmICh1dGlscy5pc1BsYWluT2JqZWN0KHRhcmdldCkgJiYgdXRpbHMuaXNQbGFpbk9iamVjdChzb3VyY2UpKSB7XG4gICAgICByZXR1cm4gdXRpbHMubWVyZ2UuY2FsbCh7IGNhc2VsZXNzIH0sIHRhcmdldCwgc291cmNlKTtcbiAgICB9IGVsc2UgaWYgKHV0aWxzLmlzUGxhaW5PYmplY3Qoc291cmNlKSkge1xuICAgICAgcmV0dXJuIHV0aWxzLm1lcmdlKHt9LCBzb3VyY2UpO1xuICAgIH0gZWxzZSBpZiAodXRpbHMuaXNBcnJheShzb3VyY2UpKSB7XG4gICAgICByZXR1cm4gc291cmNlLnNsaWNlKCk7XG4gICAgfVxuICAgIHJldHVybiBzb3VyY2U7XG4gIH1cblxuICBmdW5jdGlvbiBtZXJnZURlZXBQcm9wZXJ0aWVzKGEsIGIsIHByb3AsIGNhc2VsZXNzKSB7XG4gICAgaWYgKCF1dGlscy5pc1VuZGVmaW5lZChiKSkge1xuICAgICAgcmV0dXJuIGdldE1lcmdlZFZhbHVlKGEsIGIsIHByb3AsIGNhc2VsZXNzKTtcbiAgICB9IGVsc2UgaWYgKCF1dGlscy5pc1VuZGVmaW5lZChhKSkge1xuICAgICAgcmV0dXJuIGdldE1lcmdlZFZhbHVlKHVuZGVmaW5lZCwgYSwgcHJvcCwgY2FzZWxlc3MpO1xuICAgIH1cbiAgfVxuXG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBjb25zaXN0ZW50LXJldHVyblxuICBmdW5jdGlvbiB2YWx1ZUZyb21Db25maWcyKGEsIGIpIHtcbiAgICBpZiAoIXV0aWxzLmlzVW5kZWZpbmVkKGIpKSB7XG4gICAgICByZXR1cm4gZ2V0TWVyZ2VkVmFsdWUodW5kZWZpbmVkLCBiKTtcbiAgICB9XG4gIH1cblxuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgY29uc2lzdGVudC1yZXR1cm5cbiAgZnVuY3Rpb24gZGVmYXVsdFRvQ29uZmlnMihhLCBiKSB7XG4gICAgaWYgKCF1dGlscy5pc1VuZGVmaW5lZChiKSkge1xuICAgICAgcmV0dXJuIGdldE1lcmdlZFZhbHVlKHVuZGVmaW5lZCwgYik7XG4gICAgfSBlbHNlIGlmICghdXRpbHMuaXNVbmRlZmluZWQoYSkpIHtcbiAgICAgIHJldHVybiBnZXRNZXJnZWRWYWx1ZSh1bmRlZmluZWQsIGEpO1xuICAgIH1cbiAgfVxuXG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBjb25zaXN0ZW50LXJldHVyblxuICBmdW5jdGlvbiBtZXJnZURpcmVjdEtleXMoYSwgYiwgcHJvcCkge1xuICAgIGlmICh1dGlscy5oYXNPd25Qcm9wKGNvbmZpZzIsIHByb3ApKSB7XG4gICAgICByZXR1cm4gZ2V0TWVyZ2VkVmFsdWUoYSwgYik7XG4gICAgfSBlbHNlIGlmICh1dGlscy5oYXNPd25Qcm9wKGNvbmZpZzEsIHByb3ApKSB7XG4gICAgICByZXR1cm4gZ2V0TWVyZ2VkVmFsdWUodW5kZWZpbmVkLCBhKTtcbiAgICB9XG4gIH1cblxuICBjb25zdCBtZXJnZU1hcCA9IHtcbiAgICB1cmw6IHZhbHVlRnJvbUNvbmZpZzIsXG4gICAgbWV0aG9kOiB2YWx1ZUZyb21Db25maWcyLFxuICAgIGRhdGE6IHZhbHVlRnJvbUNvbmZpZzIsXG4gICAgYmFzZVVSTDogZGVmYXVsdFRvQ29uZmlnMixcbiAgICB0cmFuc2Zvcm1SZXF1ZXN0OiBkZWZhdWx0VG9Db25maWcyLFxuICAgIHRyYW5zZm9ybVJlc3BvbnNlOiBkZWZhdWx0VG9Db25maWcyLFxuICAgIHBhcmFtc1NlcmlhbGl6ZXI6IGRlZmF1bHRUb0NvbmZpZzIsXG4gICAgdGltZW91dDogZGVmYXVsdFRvQ29uZmlnMixcbiAgICB0aW1lb3V0TWVzc2FnZTogZGVmYXVsdFRvQ29uZmlnMixcbiAgICB3aXRoQ3JlZGVudGlhbHM6IGRlZmF1bHRUb0NvbmZpZzIsXG4gICAgd2l0aFhTUkZUb2tlbjogZGVmYXVsdFRvQ29uZmlnMixcbiAgICBhZGFwdGVyOiBkZWZhdWx0VG9Db25maWcyLFxuICAgIHJlc3BvbnNlVHlwZTogZGVmYXVsdFRvQ29uZmlnMixcbiAgICB4c3JmQ29va2llTmFtZTogZGVmYXVsdFRvQ29uZmlnMixcbiAgICB4c3JmSGVhZGVyTmFtZTogZGVmYXVsdFRvQ29uZmlnMixcbiAgICBvblVwbG9hZFByb2dyZXNzOiBkZWZhdWx0VG9Db25maWcyLFxuICAgIG9uRG93bmxvYWRQcm9ncmVzczogZGVmYXVsdFRvQ29uZmlnMixcbiAgICBkZWNvbXByZXNzOiBkZWZhdWx0VG9Db25maWcyLFxuICAgIG1heENvbnRlbnRMZW5ndGg6IGRlZmF1bHRUb0NvbmZpZzIsXG4gICAgbWF4Qm9keUxlbmd0aDogZGVmYXVsdFRvQ29uZmlnMixcbiAgICBiZWZvcmVSZWRpcmVjdDogZGVmYXVsdFRvQ29uZmlnMixcbiAgICB0cmFuc3BvcnQ6IGRlZmF1bHRUb0NvbmZpZzIsXG4gICAgaHR0cEFnZW50OiBkZWZhdWx0VG9Db25maWcyLFxuICAgIGh0dHBzQWdlbnQ6IGRlZmF1bHRUb0NvbmZpZzIsXG4gICAgY2FuY2VsVG9rZW46IGRlZmF1bHRUb0NvbmZpZzIsXG4gICAgc29ja2V0UGF0aDogZGVmYXVsdFRvQ29uZmlnMixcbiAgICBhbGxvd2VkU29ja2V0UGF0aHM6IGRlZmF1bHRUb0NvbmZpZzIsXG4gICAgcmVzcG9uc2VFbmNvZGluZzogZGVmYXVsdFRvQ29uZmlnMixcbiAgICB2YWxpZGF0ZVN0YXR1czogbWVyZ2VEaXJlY3RLZXlzLFxuICAgIGhlYWRlcnM6IChhLCBiLCBwcm9wKSA9PlxuICAgICAgbWVyZ2VEZWVwUHJvcGVydGllcyhoZWFkZXJzVG9PYmplY3QoYSksIGhlYWRlcnNUb09iamVjdChiKSwgcHJvcCwgdHJ1ZSksXG4gIH07XG5cbiAgdXRpbHMuZm9yRWFjaChPYmplY3Qua2V5cyh7IC4uLmNvbmZpZzEsIC4uLmNvbmZpZzIgfSksIGZ1bmN0aW9uIGNvbXB1dGVDb25maWdWYWx1ZShwcm9wKSB7XG4gICAgaWYgKHByb3AgPT09ICdfX3Byb3RvX18nIHx8IHByb3AgPT09ICdjb25zdHJ1Y3RvcicgfHwgcHJvcCA9PT0gJ3Byb3RvdHlwZScpIHJldHVybjtcbiAgICBjb25zdCBtZXJnZSA9IHV0aWxzLmhhc093blByb3AobWVyZ2VNYXAsIHByb3ApID8gbWVyZ2VNYXBbcHJvcF0gOiBtZXJnZURlZXBQcm9wZXJ0aWVzO1xuICAgIGNvbnN0IGEgPSB1dGlscy5oYXNPd25Qcm9wKGNvbmZpZzEsIHByb3ApID8gY29uZmlnMVtwcm9wXSA6IHVuZGVmaW5lZDtcbiAgICBjb25zdCBiID0gdXRpbHMuaGFzT3duUHJvcChjb25maWcyLCBwcm9wKSA/IGNvbmZpZzJbcHJvcF0gOiB1bmRlZmluZWQ7XG4gICAgY29uc3QgY29uZmlnVmFsdWUgPSBtZXJnZShhLCBiLCBwcm9wKTtcbiAgICAodXRpbHMuaXNVbmRlZmluZWQoY29uZmlnVmFsdWUpICYmIG1lcmdlICE9PSBtZXJnZURpcmVjdEtleXMpIHx8IChjb25maWdbcHJvcF0gPSBjb25maWdWYWx1ZSk7XG4gIH0pO1xuXG4gIHJldHVybiBjb25maWc7XG59XG4iLCJpbXBvcnQgcGxhdGZvcm0gZnJvbSAnLi4vcGxhdGZvcm0vaW5kZXguanMnO1xuaW1wb3J0IHV0aWxzIGZyb20gJy4uL3V0aWxzLmpzJztcbmltcG9ydCBpc1VSTFNhbWVPcmlnaW4gZnJvbSAnLi9pc1VSTFNhbWVPcmlnaW4uanMnO1xuaW1wb3J0IGNvb2tpZXMgZnJvbSAnLi9jb29raWVzLmpzJztcbmltcG9ydCBidWlsZEZ1bGxQYXRoIGZyb20gJy4uL2NvcmUvYnVpbGRGdWxsUGF0aC5qcyc7XG5pbXBvcnQgbWVyZ2VDb25maWcgZnJvbSAnLi4vY29yZS9tZXJnZUNvbmZpZy5qcyc7XG5pbXBvcnQgQXhpb3NIZWFkZXJzIGZyb20gJy4uL2NvcmUvQXhpb3NIZWFkZXJzLmpzJztcbmltcG9ydCBidWlsZFVSTCBmcm9tICcuL2J1aWxkVVJMLmpzJztcblxuY29uc3QgRk9STV9EQVRBX0NPTlRFTlRfSEVBREVSUyA9IFsnY29udGVudC10eXBlJywgJ2NvbnRlbnQtbGVuZ3RoJ107XG5cbmZ1bmN0aW9uIHNldEZvcm1EYXRhSGVhZGVycyhoZWFkZXJzLCBmb3JtSGVhZGVycywgcG9saWN5KSB7XG4gIGlmIChwb2xpY3kgIT09ICdjb250ZW50LW9ubHknKSB7XG4gICAgaGVhZGVycy5zZXQoZm9ybUhlYWRlcnMpO1xuICAgIHJldHVybjtcbiAgfVxuXG4gIE9iamVjdC5lbnRyaWVzKGZvcm1IZWFkZXJzKS5mb3JFYWNoKChba2V5LCB2YWxdKSA9PiB7XG4gICAgaWYgKEZPUk1fREFUQV9DT05URU5UX0hFQURFUlMuaW5jbHVkZXMoa2V5LnRvTG93ZXJDYXNlKCkpKSB7XG4gICAgICBoZWFkZXJzLnNldChrZXksIHZhbCk7XG4gICAgfVxuICB9KTtcbn1cblxuLyoqXG4gKiBFbmNvZGUgYSBVVEYtOCBzdHJpbmcgdG8gYSBMYXRpbi0xIGJ5dGUgc3RyaW5nIGZvciB1c2Ugd2l0aCBidG9hKCkuXG4gKiBUaGlzIGlzIGEgbW9kZXJuIHJlcGxhY2VtZW50IGZvciB0aGUgZGVwcmVjYXRlZCB1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoc3RyKSkgcGF0dGVybi5cbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gc3RyIFRoZSBzdHJpbmcgdG8gZW5jb2RlXG4gKlxuICogQHJldHVybnMge3N0cmluZ30gVVRGLTggYnl0ZXMgYXMgYSBMYXRpbi0xIHN0cmluZ1xuICovXG5jb25zdCBlbmNvZGVVVEY4ID0gKHN0cikgPT5cbiAgZW5jb2RlVVJJQ29tcG9uZW50KHN0cikucmVwbGFjZSgvJShbMC05QS1GXXsyfSkvZ2ksIChfLCBoZXgpID0+XG4gICAgU3RyaW5nLmZyb21DaGFyQ29kZShwYXJzZUludChoZXgsIDE2KSlcbiAgKTtcblxuZXhwb3J0IGRlZmF1bHQgKGNvbmZpZykgPT4ge1xuICBjb25zdCBuZXdDb25maWcgPSBtZXJnZUNvbmZpZyh7fSwgY29uZmlnKTtcblxuICAvLyBSZWFkIG9ubHkgb3duIHByb3BlcnRpZXMgdG8gcHJldmVudCBwcm90b3R5cGUgcG9sbHV0aW9uIGdhZGdldHNcbiAgLy8gKGUuZy4gT2JqZWN0LnByb3RvdHlwZS5iYXNlVVJMID0gJ2h0dHBzOi8vZXZpbC5jb20nKS5cbiAgY29uc3Qgb3duID0gKGtleSkgPT4gKHV0aWxzLmhhc093blByb3AobmV3Q29uZmlnLCBrZXkpID8gbmV3Q29uZmlnW2tleV0gOiB1bmRlZmluZWQpO1xuXG4gIGNvbnN0IGRhdGEgPSBvd24oJ2RhdGEnKTtcbiAgbGV0IHdpdGhYU1JGVG9rZW4gPSBvd24oJ3dpdGhYU1JGVG9rZW4nKTtcbiAgY29uc3QgeHNyZkhlYWRlck5hbWUgPSBvd24oJ3hzcmZIZWFkZXJOYW1lJyk7XG4gIGNvbnN0IHhzcmZDb29raWVOYW1lID0gb3duKCd4c3JmQ29va2llTmFtZScpO1xuICBsZXQgaGVhZGVycyA9IG93bignaGVhZGVycycpO1xuICBjb25zdCBhdXRoID0gb3duKCdhdXRoJyk7XG4gIGNvbnN0IGJhc2VVUkwgPSBvd24oJ2Jhc2VVUkwnKTtcbiAgY29uc3QgYWxsb3dBYnNvbHV0ZVVybHMgPSBvd24oJ2FsbG93QWJzb2x1dGVVcmxzJyk7XG4gIGNvbnN0IHVybCA9IG93bigndXJsJyk7XG5cbiAgbmV3Q29uZmlnLmhlYWRlcnMgPSBoZWFkZXJzID0gQXhpb3NIZWFkZXJzLmZyb20oaGVhZGVycyk7XG5cbiAgbmV3Q29uZmlnLnVybCA9IGJ1aWxkVVJMKFxuICAgIGJ1aWxkRnVsbFBhdGgoYmFzZVVSTCwgdXJsLCBhbGxvd0Fic29sdXRlVXJscyksXG4gICAgY29uZmlnLnBhcmFtcyxcbiAgICBjb25maWcucGFyYW1zU2VyaWFsaXplclxuICApO1xuXG4gIC8vIEhUVFAgYmFzaWMgYXV0aGVudGljYXRpb25cbiAgaWYgKGF1dGgpIHtcbiAgICBoZWFkZXJzLnNldChcbiAgICAgICdBdXRob3JpemF0aW9uJyxcbiAgICAgICdCYXNpYyAnICtcbiAgICAgICAgYnRvYSgoYXV0aC51c2VybmFtZSB8fCAnJykgKyAnOicgKyAoYXV0aC5wYXNzd29yZCA/IGVuY29kZVVURjgoYXV0aC5wYXNzd29yZCkgOiAnJykpXG4gICAgKTtcbiAgfVxuXG4gIGlmICh1dGlscy5pc0Zvcm1EYXRhKGRhdGEpKSB7XG4gICAgaWYgKHBsYXRmb3JtLmhhc1N0YW5kYXJkQnJvd3NlckVudiB8fCBwbGF0Zm9ybS5oYXNTdGFuZGFyZEJyb3dzZXJXZWJXb3JrZXJFbnYpIHtcbiAgICAgIGhlYWRlcnMuc2V0Q29udGVudFR5cGUodW5kZWZpbmVkKTsgLy8gYnJvd3NlciBoYW5kbGVzIGl0XG4gICAgfSBlbHNlIGlmICh1dGlscy5pc0Z1bmN0aW9uKGRhdGEuZ2V0SGVhZGVycykpIHtcbiAgICAgIC8vIE5vZGUuanMgRm9ybURhdGEgKGxpa2UgZm9ybS1kYXRhIHBhY2thZ2UpXG4gICAgICBzZXRGb3JtRGF0YUhlYWRlcnMoaGVhZGVycywgZGF0YS5nZXRIZWFkZXJzKCksIG93bignZm9ybURhdGFIZWFkZXJQb2xpY3knKSk7XG4gICAgfVxuICB9XG5cbiAgLy8gQWRkIHhzcmYgaGVhZGVyXG4gIC8vIFRoaXMgaXMgb25seSBkb25lIGlmIHJ1bm5pbmcgaW4gYSBzdGFuZGFyZCBicm93c2VyIGVudmlyb25tZW50LlxuICAvLyBTcGVjaWZpY2FsbHkgbm90IGlmIHdlJ3JlIGluIGEgd2ViIHdvcmtlciwgb3IgcmVhY3QtbmF0aXZlLlxuXG4gIGlmIChwbGF0Zm9ybS5oYXNTdGFuZGFyZEJyb3dzZXJFbnYpIHtcbiAgICBpZiAodXRpbHMuaXNGdW5jdGlvbih3aXRoWFNSRlRva2VuKSkge1xuICAgICAgd2l0aFhTUkZUb2tlbiA9IHdpdGhYU1JGVG9rZW4obmV3Q29uZmlnKTtcbiAgICB9XG5cbiAgICAvLyBTdHJpY3QgYm9vbGVhbiBjaGVjayDigJQgcHJldmVudHMgcHJvdG8tcG9sbHV0aW9uIGdhZGdldHMgKGUuZy4gT2JqZWN0LnByb3RvdHlwZS53aXRoWFNSRlRva2VuID0gMSlcbiAgICAvLyBhbmQgbWlzY29uZmlndXJhdGlvbnMgKGUuZy4gXCJmYWxzZVwiKSBmcm9tIHNob3J0LWNpcmN1aXRpbmcgdGhlIHNhbWUtb3JpZ2luIGNoZWNrIGFuZCBsZWFraW5nXG4gICAgLy8gdGhlIFhTUkYgdG9rZW4gY3Jvc3Mtb3JpZ2luLlxuICAgIGNvbnN0IHNob3VsZFNlbmRYU1JGID1cbiAgICAgIHdpdGhYU1JGVG9rZW4gPT09IHRydWUgfHwgKHdpdGhYU1JGVG9rZW4gPT0gbnVsbCAmJiBpc1VSTFNhbWVPcmlnaW4obmV3Q29uZmlnLnVybCkpO1xuXG4gICAgaWYgKHNob3VsZFNlbmRYU1JGKSB7XG4gICAgICBjb25zdCB4c3JmVmFsdWUgPSB4c3JmSGVhZGVyTmFtZSAmJiB4c3JmQ29va2llTmFtZSAmJiBjb29raWVzLnJlYWQoeHNyZkNvb2tpZU5hbWUpO1xuXG4gICAgICBpZiAoeHNyZlZhbHVlKSB7XG4gICAgICAgIGhlYWRlcnMuc2V0KHhzcmZIZWFkZXJOYW1lLCB4c3JmVmFsdWUpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiBuZXdDb25maWc7XG59O1xuIiwiaW1wb3J0IHV0aWxzIGZyb20gJy4uL3V0aWxzLmpzJztcbmltcG9ydCBzZXR0bGUgZnJvbSAnLi4vY29yZS9zZXR0bGUuanMnO1xuaW1wb3J0IHRyYW5zaXRpb25hbERlZmF1bHRzIGZyb20gJy4uL2RlZmF1bHRzL3RyYW5zaXRpb25hbC5qcyc7XG5pbXBvcnQgQXhpb3NFcnJvciBmcm9tICcuLi9jb3JlL0F4aW9zRXJyb3IuanMnO1xuaW1wb3J0IENhbmNlbGVkRXJyb3IgZnJvbSAnLi4vY2FuY2VsL0NhbmNlbGVkRXJyb3IuanMnO1xuaW1wb3J0IHBhcnNlUHJvdG9jb2wgZnJvbSAnLi4vaGVscGVycy9wYXJzZVByb3RvY29sLmpzJztcbmltcG9ydCBwbGF0Zm9ybSBmcm9tICcuLi9wbGF0Zm9ybS9pbmRleC5qcyc7XG5pbXBvcnQgQXhpb3NIZWFkZXJzIGZyb20gJy4uL2NvcmUvQXhpb3NIZWFkZXJzLmpzJztcbmltcG9ydCB7IHByb2dyZXNzRXZlbnRSZWR1Y2VyIH0gZnJvbSAnLi4vaGVscGVycy9wcm9ncmVzc0V2ZW50UmVkdWNlci5qcyc7XG5pbXBvcnQgcmVzb2x2ZUNvbmZpZyBmcm9tICcuLi9oZWxwZXJzL3Jlc29sdmVDb25maWcuanMnO1xuXG5jb25zdCBpc1hIUkFkYXB0ZXJTdXBwb3J0ZWQgPSB0eXBlb2YgWE1MSHR0cFJlcXVlc3QgIT09ICd1bmRlZmluZWQnO1xuXG5leHBvcnQgZGVmYXVsdCBpc1hIUkFkYXB0ZXJTdXBwb3J0ZWQgJiZcbiAgZnVuY3Rpb24gKGNvbmZpZykge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiBkaXNwYXRjaFhoclJlcXVlc3QocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICBjb25zdCBfY29uZmlnID0gcmVzb2x2ZUNvbmZpZyhjb25maWcpO1xuICAgICAgbGV0IHJlcXVlc3REYXRhID0gX2NvbmZpZy5kYXRhO1xuICAgICAgY29uc3QgcmVxdWVzdEhlYWRlcnMgPSBBeGlvc0hlYWRlcnMuZnJvbShfY29uZmlnLmhlYWRlcnMpLm5vcm1hbGl6ZSgpO1xuICAgICAgbGV0IHsgcmVzcG9uc2VUeXBlLCBvblVwbG9hZFByb2dyZXNzLCBvbkRvd25sb2FkUHJvZ3Jlc3MgfSA9IF9jb25maWc7XG4gICAgICBsZXQgb25DYW5jZWxlZDtcbiAgICAgIGxldCB1cGxvYWRUaHJvdHRsZWQsIGRvd25sb2FkVGhyb3R0bGVkO1xuICAgICAgbGV0IGZsdXNoVXBsb2FkLCBmbHVzaERvd25sb2FkO1xuXG4gICAgICBmdW5jdGlvbiBkb25lKCkge1xuICAgICAgICBmbHVzaFVwbG9hZCAmJiBmbHVzaFVwbG9hZCgpOyAvLyBmbHVzaCBldmVudHNcbiAgICAgICAgZmx1c2hEb3dubG9hZCAmJiBmbHVzaERvd25sb2FkKCk7IC8vIGZsdXNoIGV2ZW50c1xuXG4gICAgICAgIF9jb25maWcuY2FuY2VsVG9rZW4gJiYgX2NvbmZpZy5jYW5jZWxUb2tlbi51bnN1YnNjcmliZShvbkNhbmNlbGVkKTtcblxuICAgICAgICBfY29uZmlnLnNpZ25hbCAmJiBfY29uZmlnLnNpZ25hbC5yZW1vdmVFdmVudExpc3RlbmVyKCdhYm9ydCcsIG9uQ2FuY2VsZWQpO1xuICAgICAgfVxuXG4gICAgICBsZXQgcmVxdWVzdCA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xuXG4gICAgICByZXF1ZXN0Lm9wZW4oX2NvbmZpZy5tZXRob2QudG9VcHBlckNhc2UoKSwgX2NvbmZpZy51cmwsIHRydWUpO1xuXG4gICAgICAvLyBTZXQgdGhlIHJlcXVlc3QgdGltZW91dCBpbiBNU1xuICAgICAgcmVxdWVzdC50aW1lb3V0ID0gX2NvbmZpZy50aW1lb3V0O1xuXG4gICAgICBmdW5jdGlvbiBvbmxvYWRlbmQoKSB7XG4gICAgICAgIGlmICghcmVxdWVzdCkge1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICAvLyBQcmVwYXJlIHRoZSByZXNwb25zZVxuICAgICAgICBjb25zdCByZXNwb25zZUhlYWRlcnMgPSBBeGlvc0hlYWRlcnMuZnJvbShcbiAgICAgICAgICAnZ2V0QWxsUmVzcG9uc2VIZWFkZXJzJyBpbiByZXF1ZXN0ICYmIHJlcXVlc3QuZ2V0QWxsUmVzcG9uc2VIZWFkZXJzKClcbiAgICAgICAgKTtcbiAgICAgICAgY29uc3QgcmVzcG9uc2VEYXRhID1cbiAgICAgICAgICAhcmVzcG9uc2VUeXBlIHx8IHJlc3BvbnNlVHlwZSA9PT0gJ3RleHQnIHx8IHJlc3BvbnNlVHlwZSA9PT0gJ2pzb24nXG4gICAgICAgICAgICA/IHJlcXVlc3QucmVzcG9uc2VUZXh0XG4gICAgICAgICAgICA6IHJlcXVlc3QucmVzcG9uc2U7XG4gICAgICAgIGNvbnN0IHJlc3BvbnNlID0ge1xuICAgICAgICAgIGRhdGE6IHJlc3BvbnNlRGF0YSxcbiAgICAgICAgICBzdGF0dXM6IHJlcXVlc3Quc3RhdHVzLFxuICAgICAgICAgIHN0YXR1c1RleHQ6IHJlcXVlc3Quc3RhdHVzVGV4dCxcbiAgICAgICAgICBoZWFkZXJzOiByZXNwb25zZUhlYWRlcnMsXG4gICAgICAgICAgY29uZmlnLFxuICAgICAgICAgIHJlcXVlc3QsXG4gICAgICAgIH07XG5cbiAgICAgICAgc2V0dGxlKFxuICAgICAgICAgIGZ1bmN0aW9uIF9yZXNvbHZlKHZhbHVlKSB7XG4gICAgICAgICAgICByZXNvbHZlKHZhbHVlKTtcbiAgICAgICAgICAgIGRvbmUoKTtcbiAgICAgICAgICB9LFxuICAgICAgICAgIGZ1bmN0aW9uIF9yZWplY3QoZXJyKSB7XG4gICAgICAgICAgICByZWplY3QoZXJyKTtcbiAgICAgICAgICAgIGRvbmUoKTtcbiAgICAgICAgICB9LFxuICAgICAgICAgIHJlc3BvbnNlXG4gICAgICAgICk7XG5cbiAgICAgICAgLy8gQ2xlYW4gdXAgcmVxdWVzdFxuICAgICAgICByZXF1ZXN0ID0gbnVsbDtcbiAgICAgIH1cblxuICAgICAgaWYgKCdvbmxvYWRlbmQnIGluIHJlcXVlc3QpIHtcbiAgICAgICAgLy8gVXNlIG9ubG9hZGVuZCBpZiBhdmFpbGFibGVcbiAgICAgICAgcmVxdWVzdC5vbmxvYWRlbmQgPSBvbmxvYWRlbmQ7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyBMaXN0ZW4gZm9yIHJlYWR5IHN0YXRlIHRvIGVtdWxhdGUgb25sb2FkZW5kXG4gICAgICAgIHJlcXVlc3Qub25yZWFkeXN0YXRlY2hhbmdlID0gZnVuY3Rpb24gaGFuZGxlTG9hZCgpIHtcbiAgICAgICAgICBpZiAoIXJlcXVlc3QgfHwgcmVxdWVzdC5yZWFkeVN0YXRlICE9PSA0KSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgLy8gVGhlIHJlcXVlc3QgZXJyb3JlZCBvdXQgYW5kIHdlIGRpZG4ndCBnZXQgYSByZXNwb25zZSwgdGhpcyB3aWxsIGJlXG4gICAgICAgICAgLy8gaGFuZGxlZCBieSBvbmVycm9yIGluc3RlYWRcbiAgICAgICAgICAvLyBXaXRoIG9uZSBleGNlcHRpb246IHJlcXVlc3QgdGhhdCB1c2luZyBmaWxlOiBwcm90b2NvbCwgbW9zdCBicm93c2Vyc1xuICAgICAgICAgIC8vIHdpbGwgcmV0dXJuIHN0YXR1cyBhcyAwIGV2ZW4gdGhvdWdoIGl0J3MgYSBzdWNjZXNzZnVsIHJlcXVlc3RcbiAgICAgICAgICBpZiAoXG4gICAgICAgICAgICByZXF1ZXN0LnN0YXR1cyA9PT0gMCAmJlxuICAgICAgICAgICAgIShyZXF1ZXN0LnJlc3BvbnNlVVJMICYmIHJlcXVlc3QucmVzcG9uc2VVUkwuc3RhcnRzV2l0aCgnZmlsZTonKSlcbiAgICAgICAgICApIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICB9XG4gICAgICAgICAgLy8gcmVhZHlzdGF0ZSBoYW5kbGVyIGlzIGNhbGxpbmcgYmVmb3JlIG9uZXJyb3Igb3Igb250aW1lb3V0IGhhbmRsZXJzLFxuICAgICAgICAgIC8vIHNvIHdlIHNob3VsZCBjYWxsIG9ubG9hZGVuZCBvbiB0aGUgbmV4dCAndGljaydcbiAgICAgICAgICBzZXRUaW1lb3V0KG9ubG9hZGVuZCk7XG4gICAgICAgIH07XG4gICAgICB9XG5cbiAgICAgIC8vIEhhbmRsZSBicm93c2VyIHJlcXVlc3QgY2FuY2VsbGF0aW9uIChhcyBvcHBvc2VkIHRvIGEgbWFudWFsIGNhbmNlbGxhdGlvbilcbiAgICAgIHJlcXVlc3Qub25hYm9ydCA9IGZ1bmN0aW9uIGhhbmRsZUFib3J0KCkge1xuICAgICAgICBpZiAoIXJlcXVlc3QpIHtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICByZWplY3QobmV3IEF4aW9zRXJyb3IoJ1JlcXVlc3QgYWJvcnRlZCcsIEF4aW9zRXJyb3IuRUNPTk5BQk9SVEVELCBjb25maWcsIHJlcXVlc3QpKTtcbiAgICAgICAgZG9uZSgpO1xuXG4gICAgICAgIC8vIENsZWFuIHVwIHJlcXVlc3RcbiAgICAgICAgcmVxdWVzdCA9IG51bGw7XG4gICAgICB9O1xuXG4gICAgICAvLyBIYW5kbGUgbG93IGxldmVsIG5ldHdvcmsgZXJyb3JzXG4gICAgICByZXF1ZXN0Lm9uZXJyb3IgPSBmdW5jdGlvbiBoYW5kbGVFcnJvcihldmVudCkge1xuICAgICAgICAvLyBCcm93c2VycyBkZWxpdmVyIGEgUHJvZ3Jlc3NFdmVudCBpbiBYSFIgb25lcnJvclxuICAgICAgICAvLyAobWVzc2FnZSBtYXkgYmUgZW1wdHk7IHdoZW4gcHJlc2VudCwgc3VyZmFjZSBpdClcbiAgICAgICAgLy8gU2VlIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2RvY3MvV2ViL0FQSS9YTUxIdHRwUmVxdWVzdC9lcnJvcl9ldmVudFxuICAgICAgICBjb25zdCBtc2cgPSBldmVudCAmJiBldmVudC5tZXNzYWdlID8gZXZlbnQubWVzc2FnZSA6ICdOZXR3b3JrIEVycm9yJztcbiAgICAgICAgY29uc3QgZXJyID0gbmV3IEF4aW9zRXJyb3IobXNnLCBBeGlvc0Vycm9yLkVSUl9ORVRXT1JLLCBjb25maWcsIHJlcXVlc3QpO1xuICAgICAgICAvLyBhdHRhY2ggdGhlIHVuZGVybHlpbmcgZXZlbnQgZm9yIGNvbnN1bWVycyB3aG8gd2FudCBkZXRhaWxzXG4gICAgICAgIGVyci5ldmVudCA9IGV2ZW50IHx8IG51bGw7XG4gICAgICAgIHJlamVjdChlcnIpO1xuICAgICAgICBkb25lKCk7XG4gICAgICAgIHJlcXVlc3QgPSBudWxsO1xuICAgICAgfTtcblxuICAgICAgLy8gSGFuZGxlIHRpbWVvdXRcbiAgICAgIHJlcXVlc3Qub250aW1lb3V0ID0gZnVuY3Rpb24gaGFuZGxlVGltZW91dCgpIHtcbiAgICAgICAgbGV0IHRpbWVvdXRFcnJvck1lc3NhZ2UgPSBfY29uZmlnLnRpbWVvdXRcbiAgICAgICAgICA/ICd0aW1lb3V0IG9mICcgKyBfY29uZmlnLnRpbWVvdXQgKyAnbXMgZXhjZWVkZWQnXG4gICAgICAgICAgOiAndGltZW91dCBleGNlZWRlZCc7XG4gICAgICAgIGNvbnN0IHRyYW5zaXRpb25hbCA9IF9jb25maWcudHJhbnNpdGlvbmFsIHx8IHRyYW5zaXRpb25hbERlZmF1bHRzO1xuICAgICAgICBpZiAoX2NvbmZpZy50aW1lb3V0RXJyb3JNZXNzYWdlKSB7XG4gICAgICAgICAgdGltZW91dEVycm9yTWVzc2FnZSA9IF9jb25maWcudGltZW91dEVycm9yTWVzc2FnZTtcbiAgICAgICAgfVxuICAgICAgICByZWplY3QoXG4gICAgICAgICAgbmV3IEF4aW9zRXJyb3IoXG4gICAgICAgICAgICB0aW1lb3V0RXJyb3JNZXNzYWdlLFxuICAgICAgICAgICAgdHJhbnNpdGlvbmFsLmNsYXJpZnlUaW1lb3V0RXJyb3IgPyBBeGlvc0Vycm9yLkVUSU1FRE9VVCA6IEF4aW9zRXJyb3IuRUNPTk5BQk9SVEVELFxuICAgICAgICAgICAgY29uZmlnLFxuICAgICAgICAgICAgcmVxdWVzdFxuICAgICAgICAgIClcbiAgICAgICAgKTtcbiAgICAgICAgZG9uZSgpO1xuXG4gICAgICAgIC8vIENsZWFuIHVwIHJlcXVlc3RcbiAgICAgICAgcmVxdWVzdCA9IG51bGw7XG4gICAgICB9O1xuXG4gICAgICAvLyBSZW1vdmUgQ29udGVudC1UeXBlIGlmIGRhdGEgaXMgdW5kZWZpbmVkXG4gICAgICByZXF1ZXN0RGF0YSA9PT0gdW5kZWZpbmVkICYmIHJlcXVlc3RIZWFkZXJzLnNldENvbnRlbnRUeXBlKG51bGwpO1xuXG4gICAgICAvLyBBZGQgaGVhZGVycyB0byB0aGUgcmVxdWVzdFxuICAgICAgaWYgKCdzZXRSZXF1ZXN0SGVhZGVyJyBpbiByZXF1ZXN0KSB7XG4gICAgICAgIHV0aWxzLmZvckVhY2gocmVxdWVzdEhlYWRlcnMudG9KU09OKCksIGZ1bmN0aW9uIHNldFJlcXVlc3RIZWFkZXIodmFsLCBrZXkpIHtcbiAgICAgICAgICByZXF1ZXN0LnNldFJlcXVlc3RIZWFkZXIoa2V5LCB2YWwpO1xuICAgICAgICB9KTtcbiAgICAgIH1cblxuICAgICAgLy8gQWRkIHdpdGhDcmVkZW50aWFscyB0byByZXF1ZXN0IGlmIG5lZWRlZFxuICAgICAgaWYgKCF1dGlscy5pc1VuZGVmaW5lZChfY29uZmlnLndpdGhDcmVkZW50aWFscykpIHtcbiAgICAgICAgcmVxdWVzdC53aXRoQ3JlZGVudGlhbHMgPSAhIV9jb25maWcud2l0aENyZWRlbnRpYWxzO1xuICAgICAgfVxuXG4gICAgICAvLyBBZGQgcmVzcG9uc2VUeXBlIHRvIHJlcXVlc3QgaWYgbmVlZGVkXG4gICAgICBpZiAocmVzcG9uc2VUeXBlICYmIHJlc3BvbnNlVHlwZSAhPT0gJ2pzb24nKSB7XG4gICAgICAgIHJlcXVlc3QucmVzcG9uc2VUeXBlID0gX2NvbmZpZy5yZXNwb25zZVR5cGU7XG4gICAgICB9XG5cbiAgICAgIC8vIEhhbmRsZSBwcm9ncmVzcyBpZiBuZWVkZWRcbiAgICAgIGlmIChvbkRvd25sb2FkUHJvZ3Jlc3MpIHtcbiAgICAgICAgW2Rvd25sb2FkVGhyb3R0bGVkLCBmbHVzaERvd25sb2FkXSA9IHByb2dyZXNzRXZlbnRSZWR1Y2VyKG9uRG93bmxvYWRQcm9ncmVzcywgdHJ1ZSk7XG4gICAgICAgIHJlcXVlc3QuYWRkRXZlbnRMaXN0ZW5lcigncHJvZ3Jlc3MnLCBkb3dubG9hZFRocm90dGxlZCk7XG4gICAgICB9XG5cbiAgICAgIC8vIE5vdCBhbGwgYnJvd3NlcnMgc3VwcG9ydCB1cGxvYWQgZXZlbnRzXG4gICAgICBpZiAob25VcGxvYWRQcm9ncmVzcyAmJiByZXF1ZXN0LnVwbG9hZCkge1xuICAgICAgICBbdXBsb2FkVGhyb3R0bGVkLCBmbHVzaFVwbG9hZF0gPSBwcm9ncmVzc0V2ZW50UmVkdWNlcihvblVwbG9hZFByb2dyZXNzKTtcblxuICAgICAgICByZXF1ZXN0LnVwbG9hZC5hZGRFdmVudExpc3RlbmVyKCdwcm9ncmVzcycsIHVwbG9hZFRocm90dGxlZCk7XG5cbiAgICAgICAgcmVxdWVzdC51cGxvYWQuYWRkRXZlbnRMaXN0ZW5lcignbG9hZGVuZCcsIGZsdXNoVXBsb2FkKTtcbiAgICAgIH1cblxuICAgICAgaWYgKF9jb25maWcuY2FuY2VsVG9rZW4gfHwgX2NvbmZpZy5zaWduYWwpIHtcbiAgICAgICAgLy8gSGFuZGxlIGNhbmNlbGxhdGlvblxuICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgZnVuYy1uYW1lc1xuICAgICAgICBvbkNhbmNlbGVkID0gKGNhbmNlbCkgPT4ge1xuICAgICAgICAgIGlmICghcmVxdWVzdCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZWplY3QoIWNhbmNlbCB8fCBjYW5jZWwudHlwZSA/IG5ldyBDYW5jZWxlZEVycm9yKG51bGwsIGNvbmZpZywgcmVxdWVzdCkgOiBjYW5jZWwpO1xuICAgICAgICAgIHJlcXVlc3QuYWJvcnQoKTtcbiAgICAgICAgICBkb25lKCk7XG4gICAgICAgICAgcmVxdWVzdCA9IG51bGw7XG4gICAgICAgIH07XG5cbiAgICAgICAgX2NvbmZpZy5jYW5jZWxUb2tlbiAmJiBfY29uZmlnLmNhbmNlbFRva2VuLnN1YnNjcmliZShvbkNhbmNlbGVkKTtcbiAgICAgICAgaWYgKF9jb25maWcuc2lnbmFsKSB7XG4gICAgICAgICAgX2NvbmZpZy5zaWduYWwuYWJvcnRlZFxuICAgICAgICAgICAgPyBvbkNhbmNlbGVkKClcbiAgICAgICAgICAgIDogX2NvbmZpZy5zaWduYWwuYWRkRXZlbnRMaXN0ZW5lcignYWJvcnQnLCBvbkNhbmNlbGVkKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBjb25zdCBwcm90b2NvbCA9IHBhcnNlUHJvdG9jb2woX2NvbmZpZy51cmwpO1xuXG4gICAgICBpZiAocHJvdG9jb2wgJiYgIXBsYXRmb3JtLnByb3RvY29scy5pbmNsdWRlcyhwcm90b2NvbCkpIHtcbiAgICAgICAgcmVqZWN0KFxuICAgICAgICAgIG5ldyBBeGlvc0Vycm9yKFxuICAgICAgICAgICAgJ1Vuc3VwcG9ydGVkIHByb3RvY29sICcgKyBwcm90b2NvbCArICc6JyxcbiAgICAgICAgICAgIEF4aW9zRXJyb3IuRVJSX0JBRF9SRVFVRVNULFxuICAgICAgICAgICAgY29uZmlnXG4gICAgICAgICAgKVxuICAgICAgICApO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIC8vIFNlbmQgdGhlIHJlcXVlc3RcbiAgICAgIHJlcXVlc3Quc2VuZChyZXF1ZXN0RGF0YSB8fCBudWxsKTtcbiAgICB9KTtcbiAgfTtcbiIsImltcG9ydCBDYW5jZWxlZEVycm9yIGZyb20gJy4uL2NhbmNlbC9DYW5jZWxlZEVycm9yLmpzJztcbmltcG9ydCBBeGlvc0Vycm9yIGZyb20gJy4uL2NvcmUvQXhpb3NFcnJvci5qcyc7XG5pbXBvcnQgdXRpbHMgZnJvbSAnLi4vdXRpbHMuanMnO1xuXG5jb25zdCBjb21wb3NlU2lnbmFscyA9IChzaWduYWxzLCB0aW1lb3V0KSA9PiB7XG4gIGNvbnN0IHsgbGVuZ3RoIH0gPSAoc2lnbmFscyA9IHNpZ25hbHMgPyBzaWduYWxzLmZpbHRlcihCb29sZWFuKSA6IFtdKTtcblxuICBpZiAodGltZW91dCB8fCBsZW5ndGgpIHtcbiAgICBsZXQgY29udHJvbGxlciA9IG5ldyBBYm9ydENvbnRyb2xsZXIoKTtcblxuICAgIGxldCBhYm9ydGVkO1xuXG4gICAgY29uc3Qgb25hYm9ydCA9IGZ1bmN0aW9uIChyZWFzb24pIHtcbiAgICAgIGlmICghYWJvcnRlZCkge1xuICAgICAgICBhYm9ydGVkID0gdHJ1ZTtcbiAgICAgICAgdW5zdWJzY3JpYmUoKTtcbiAgICAgICAgY29uc3QgZXJyID0gcmVhc29uIGluc3RhbmNlb2YgRXJyb3IgPyByZWFzb24gOiB0aGlzLnJlYXNvbjtcbiAgICAgICAgY29udHJvbGxlci5hYm9ydChcbiAgICAgICAgICBlcnIgaW5zdGFuY2VvZiBBeGlvc0Vycm9yXG4gICAgICAgICAgICA/IGVyclxuICAgICAgICAgICAgOiBuZXcgQ2FuY2VsZWRFcnJvcihlcnIgaW5zdGFuY2VvZiBFcnJvciA/IGVyci5tZXNzYWdlIDogZXJyKVxuICAgICAgICApO1xuICAgICAgfVxuICAgIH07XG5cbiAgICBsZXQgdGltZXIgPVxuICAgICAgdGltZW91dCAmJlxuICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIHRpbWVyID0gbnVsbDtcbiAgICAgICAgb25hYm9ydChuZXcgQXhpb3NFcnJvcihgdGltZW91dCBvZiAke3RpbWVvdXR9bXMgZXhjZWVkZWRgLCBBeGlvc0Vycm9yLkVUSU1FRE9VVCkpO1xuICAgICAgfSwgdGltZW91dCk7XG5cbiAgICBjb25zdCB1bnN1YnNjcmliZSA9ICgpID0+IHtcbiAgICAgIGlmIChzaWduYWxzKSB7XG4gICAgICAgIHRpbWVyICYmIGNsZWFyVGltZW91dCh0aW1lcik7XG4gICAgICAgIHRpbWVyID0gbnVsbDtcbiAgICAgICAgc2lnbmFscy5mb3JFYWNoKChzaWduYWwpID0+IHtcbiAgICAgICAgICBzaWduYWwudW5zdWJzY3JpYmVcbiAgICAgICAgICAgID8gc2lnbmFsLnVuc3Vic2NyaWJlKG9uYWJvcnQpXG4gICAgICAgICAgICA6IHNpZ25hbC5yZW1vdmVFdmVudExpc3RlbmVyKCdhYm9ydCcsIG9uYWJvcnQpO1xuICAgICAgICB9KTtcbiAgICAgICAgc2lnbmFscyA9IG51bGw7XG4gICAgICB9XG4gICAgfTtcblxuICAgIHNpZ25hbHMuZm9yRWFjaCgoc2lnbmFsKSA9PiBzaWduYWwuYWRkRXZlbnRMaXN0ZW5lcignYWJvcnQnLCBvbmFib3J0KSk7XG5cbiAgICBjb25zdCB7IHNpZ25hbCB9ID0gY29udHJvbGxlcjtcblxuICAgIHNpZ25hbC51bnN1YnNjcmliZSA9ICgpID0+IHV0aWxzLmFzYXAodW5zdWJzY3JpYmUpO1xuXG4gICAgcmV0dXJuIHNpZ25hbDtcbiAgfVxufTtcblxuZXhwb3J0IGRlZmF1bHQgY29tcG9zZVNpZ25hbHM7XG4iLCJleHBvcnQgY29uc3Qgc3RyZWFtQ2h1bmsgPSBmdW5jdGlvbiogKGNodW5rLCBjaHVua1NpemUpIHtcbiAgbGV0IGxlbiA9IGNodW5rLmJ5dGVMZW5ndGg7XG5cbiAgaWYgKCFjaHVua1NpemUgfHwgbGVuIDwgY2h1bmtTaXplKSB7XG4gICAgeWllbGQgY2h1bms7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgbGV0IHBvcyA9IDA7XG4gIGxldCBlbmQ7XG5cbiAgd2hpbGUgKHBvcyA8IGxlbikge1xuICAgIGVuZCA9IHBvcyArIGNodW5rU2l6ZTtcbiAgICB5aWVsZCBjaHVuay5zbGljZShwb3MsIGVuZCk7XG4gICAgcG9zID0gZW5kO1xuICB9XG59O1xuXG5leHBvcnQgY29uc3QgcmVhZEJ5dGVzID0gYXN5bmMgZnVuY3Rpb24qIChpdGVyYWJsZSwgY2h1bmtTaXplKSB7XG4gIGZvciBhd2FpdCAoY29uc3QgY2h1bmsgb2YgcmVhZFN0cmVhbShpdGVyYWJsZSkpIHtcbiAgICB5aWVsZCogc3RyZWFtQ2h1bmsoY2h1bmssIGNodW5rU2l6ZSk7XG4gIH1cbn07XG5cbmNvbnN0IHJlYWRTdHJlYW0gPSBhc3luYyBmdW5jdGlvbiogKHN0cmVhbSkge1xuICBpZiAoc3RyZWFtW1N5bWJvbC5hc3luY0l0ZXJhdG9yXSkge1xuICAgIHlpZWxkKiBzdHJlYW07XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgY29uc3QgcmVhZGVyID0gc3RyZWFtLmdldFJlYWRlcigpO1xuICB0cnkge1xuICAgIGZvciAoOzspIHtcbiAgICAgIGNvbnN0IHsgZG9uZSwgdmFsdWUgfSA9IGF3YWl0IHJlYWRlci5yZWFkKCk7XG4gICAgICBpZiAoZG9uZSkge1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICAgIHlpZWxkIHZhbHVlO1xuICAgIH1cbiAgfSBmaW5hbGx5IHtcbiAgICBhd2FpdCByZWFkZXIuY2FuY2VsKCk7XG4gIH1cbn07XG5cbmV4cG9ydCBjb25zdCB0cmFja1N0cmVhbSA9IChzdHJlYW0sIGNodW5rU2l6ZSwgb25Qcm9ncmVzcywgb25GaW5pc2gpID0+IHtcbiAgY29uc3QgaXRlcmF0b3IgPSByZWFkQnl0ZXMoc3RyZWFtLCBjaHVua1NpemUpO1xuXG4gIGxldCBieXRlcyA9IDA7XG4gIGxldCBkb25lO1xuICBsZXQgX29uRmluaXNoID0gKGUpID0+IHtcbiAgICBpZiAoIWRvbmUpIHtcbiAgICAgIGRvbmUgPSB0cnVlO1xuICAgICAgb25GaW5pc2ggJiYgb25GaW5pc2goZSk7XG4gICAgfVxuICB9O1xuXG4gIHJldHVybiBuZXcgUmVhZGFibGVTdHJlYW0oXG4gICAge1xuICAgICAgYXN5bmMgcHVsbChjb250cm9sbGVyKSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgY29uc3QgeyBkb25lLCB2YWx1ZSB9ID0gYXdhaXQgaXRlcmF0b3IubmV4dCgpO1xuXG4gICAgICAgICAgaWYgKGRvbmUpIHtcbiAgICAgICAgICAgIF9vbkZpbmlzaCgpO1xuICAgICAgICAgICAgY29udHJvbGxlci5jbG9zZSgpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGxldCBsZW4gPSB2YWx1ZS5ieXRlTGVuZ3RoO1xuICAgICAgICAgIGlmIChvblByb2dyZXNzKSB7XG4gICAgICAgICAgICBsZXQgbG9hZGVkQnl0ZXMgPSAoYnl0ZXMgKz0gbGVuKTtcbiAgICAgICAgICAgIG9uUHJvZ3Jlc3MobG9hZGVkQnl0ZXMpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBjb250cm9sbGVyLmVucXVldWUobmV3IFVpbnQ4QXJyYXkodmFsdWUpKTtcbiAgICAgICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgICAgX29uRmluaXNoKGVycik7XG4gICAgICAgICAgdGhyb3cgZXJyO1xuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgY2FuY2VsKHJlYXNvbikge1xuICAgICAgICBfb25GaW5pc2gocmVhc29uKTtcbiAgICAgICAgcmV0dXJuIGl0ZXJhdG9yLnJldHVybigpO1xuICAgICAgfSxcbiAgICB9LFxuICAgIHtcbiAgICAgIGhpZ2hXYXRlck1hcms6IDIsXG4gICAgfVxuICApO1xufTtcbiIsIi8qKlxuICogRXN0aW1hdGUgZGVjb2RlZCBieXRlIGxlbmd0aCBvZiBhIGRhdGE6Ly8gVVJMICp3aXRob3V0KiBhbGxvY2F0aW5nIGxhcmdlIGJ1ZmZlcnMuXG4gKiAtIEZvciBiYXNlNjQ6IGNvbXB1dGUgZXhhY3QgZGVjb2RlZCBzaXplIHVzaW5nIGxlbmd0aCBhbmQgcGFkZGluZztcbiAqICAgICAgICAgICAgICAgaGFuZGxlICVYWCBhdCB0aGUgY2hhcmFjdGVyLWNvdW50IGxldmVsIChubyBzdHJpbmcgYWxsb2NhdGlvbikuXG4gKiAtIEZvciBub24tYmFzZTY0OiB1c2UgVVRGLTggYnl0ZUxlbmd0aCBvZiB0aGUgZW5jb2RlZCBib2R5IGFzIGEgc2FmZSB1cHBlciBib3VuZC5cbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gdXJsXG4gKiBAcmV0dXJucyB7bnVtYmVyfVxuICovXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBlc3RpbWF0ZURhdGFVUkxEZWNvZGVkQnl0ZXModXJsKSB7XG4gIGlmICghdXJsIHx8IHR5cGVvZiB1cmwgIT09ICdzdHJpbmcnKSByZXR1cm4gMDtcbiAgaWYgKCF1cmwuc3RhcnRzV2l0aCgnZGF0YTonKSkgcmV0dXJuIDA7XG5cbiAgY29uc3QgY29tbWEgPSB1cmwuaW5kZXhPZignLCcpO1xuICBpZiAoY29tbWEgPCAwKSByZXR1cm4gMDtcblxuICBjb25zdCBtZXRhID0gdXJsLnNsaWNlKDUsIGNvbW1hKTtcbiAgY29uc3QgYm9keSA9IHVybC5zbGljZShjb21tYSArIDEpO1xuICBjb25zdCBpc0Jhc2U2NCA9IC87YmFzZTY0L2kudGVzdChtZXRhKTtcblxuICBpZiAoaXNCYXNlNjQpIHtcbiAgICBsZXQgZWZmZWN0aXZlTGVuID0gYm9keS5sZW5ndGg7XG4gICAgY29uc3QgbGVuID0gYm9keS5sZW5ndGg7IC8vIGNhY2hlIGxlbmd0aFxuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW47IGkrKykge1xuICAgICAgaWYgKGJvZHkuY2hhckNvZGVBdChpKSA9PT0gMzcgLyogJyUnICovICYmIGkgKyAyIDwgbGVuKSB7XG4gICAgICAgIGNvbnN0IGEgPSBib2R5LmNoYXJDb2RlQXQoaSArIDEpO1xuICAgICAgICBjb25zdCBiID0gYm9keS5jaGFyQ29kZUF0KGkgKyAyKTtcbiAgICAgICAgY29uc3QgaXNIZXggPVxuICAgICAgICAgICgoYSA+PSA0OCAmJiBhIDw9IDU3KSB8fCAoYSA+PSA2NSAmJiBhIDw9IDcwKSB8fCAoYSA+PSA5NyAmJiBhIDw9IDEwMikpICYmXG4gICAgICAgICAgKChiID49IDQ4ICYmIGIgPD0gNTcpIHx8IChiID49IDY1ICYmIGIgPD0gNzApIHx8IChiID49IDk3ICYmIGIgPD0gMTAyKSk7XG5cbiAgICAgICAgaWYgKGlzSGV4KSB7XG4gICAgICAgICAgZWZmZWN0aXZlTGVuIC09IDI7XG4gICAgICAgICAgaSArPSAyO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgbGV0IHBhZCA9IDA7XG4gICAgbGV0IGlkeCA9IGxlbiAtIDE7XG5cbiAgICBjb25zdCB0YWlsSXNQY3QzRCA9IChqKSA9PlxuICAgICAgaiA+PSAyICYmXG4gICAgICBib2R5LmNoYXJDb2RlQXQoaiAtIDIpID09PSAzNyAmJiAvLyAnJSdcbiAgICAgIGJvZHkuY2hhckNvZGVBdChqIC0gMSkgPT09IDUxICYmIC8vICczJ1xuICAgICAgKGJvZHkuY2hhckNvZGVBdChqKSA9PT0gNjggfHwgYm9keS5jaGFyQ29kZUF0KGopID09PSAxMDApOyAvLyAnRCcgb3IgJ2QnXG5cbiAgICBpZiAoaWR4ID49IDApIHtcbiAgICAgIGlmIChib2R5LmNoYXJDb2RlQXQoaWR4KSA9PT0gNjEgLyogJz0nICovKSB7XG4gICAgICAgIHBhZCsrO1xuICAgICAgICBpZHgtLTtcbiAgICAgIH0gZWxzZSBpZiAodGFpbElzUGN0M0QoaWR4KSkge1xuICAgICAgICBwYWQrKztcbiAgICAgICAgaWR4IC09IDM7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKHBhZCA9PT0gMSAmJiBpZHggPj0gMCkge1xuICAgICAgaWYgKGJvZHkuY2hhckNvZGVBdChpZHgpID09PSA2MSAvKiAnPScgKi8pIHtcbiAgICAgICAgcGFkKys7XG4gICAgICB9IGVsc2UgaWYgKHRhaWxJc1BjdDNEKGlkeCkpIHtcbiAgICAgICAgcGFkKys7XG4gICAgICB9XG4gICAgfVxuXG4gICAgY29uc3QgZ3JvdXBzID0gTWF0aC5mbG9vcihlZmZlY3RpdmVMZW4gLyA0KTtcbiAgICBjb25zdCBieXRlcyA9IGdyb3VwcyAqIDMgLSAocGFkIHx8IDApO1xuICAgIHJldHVybiBieXRlcyA+IDAgPyBieXRlcyA6IDA7XG4gIH1cblxuICBpZiAodHlwZW9mIEJ1ZmZlciAhPT0gJ3VuZGVmaW5lZCcgJiYgdHlwZW9mIEJ1ZmZlci5ieXRlTGVuZ3RoID09PSAnZnVuY3Rpb24nKSB7XG4gICAgcmV0dXJuIEJ1ZmZlci5ieXRlTGVuZ3RoKGJvZHksICd1dGY4Jyk7XG4gIH1cblxuICAvLyBDb21wdXRlIFVURi04IGJ5dGUgbGVuZ3RoIGRpcmVjdGx5IGZyb20gVVRGLTE2IGNvZGUgdW5pdHMgd2l0aG91dCBhbGxvY2F0aW5nXG4gIC8vIGEgYnl0ZSBidWZmZXIgKFRleHRFbmNvZGVyLmVuY29kZSB3b3VsZCBkZWZlYXQgdGhlIERvUyBndWFyZCBvbiBsYXJnZSBib2RpZXMpLlxuICAvLyBVc2luZyBib2R5Lmxlbmd0aCBoZXJlIHdvdWxkIHVuZGVyY291bnQgbm9uLUFTQ0lJIChlLmcuICfigqwnIGlzIDEgY29kZSB1bml0XG4gIC8vIGJ1dCAzIFVURi04IGJ5dGVzKS5cbiAgbGV0IGJ5dGVzID0gMDtcbiAgZm9yIChsZXQgaSA9IDAsIGxlbiA9IGJvZHkubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcbiAgICBjb25zdCBjID0gYm9keS5jaGFyQ29kZUF0KGkpO1xuICAgIGlmIChjIDwgMHg4MCkge1xuICAgICAgYnl0ZXMgKz0gMTtcbiAgICB9IGVsc2UgaWYgKGMgPCAweDgwMCkge1xuICAgICAgYnl0ZXMgKz0gMjtcbiAgICB9IGVsc2UgaWYgKGMgPj0gMHhkODAwICYmIGMgPD0gMHhkYmZmICYmIGkgKyAxIDwgbGVuKSB7XG4gICAgICBjb25zdCBuZXh0ID0gYm9keS5jaGFyQ29kZUF0KGkgKyAxKTtcbiAgICAgIGlmIChuZXh0ID49IDB4ZGMwMCAmJiBuZXh0IDw9IDB4ZGZmZikge1xuICAgICAgICBieXRlcyArPSA0O1xuICAgICAgICBpKys7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBieXRlcyArPSAzO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBieXRlcyArPSAzO1xuICAgIH1cbiAgfVxuICByZXR1cm4gYnl0ZXM7XG59XG4iLCJleHBvcnQgY29uc3QgVkVSU0lPTiA9IFwiMS4xNi4wXCI7IiwiaW1wb3J0IHBsYXRmb3JtIGZyb20gJy4uL3BsYXRmb3JtL2luZGV4LmpzJztcbmltcG9ydCB1dGlscyBmcm9tICcuLi91dGlscy5qcyc7XG5pbXBvcnQgQXhpb3NFcnJvciBmcm9tICcuLi9jb3JlL0F4aW9zRXJyb3IuanMnO1xuaW1wb3J0IGNvbXBvc2VTaWduYWxzIGZyb20gJy4uL2hlbHBlcnMvY29tcG9zZVNpZ25hbHMuanMnO1xuaW1wb3J0IHsgdHJhY2tTdHJlYW0gfSBmcm9tICcuLi9oZWxwZXJzL3RyYWNrU3RyZWFtLmpzJztcbmltcG9ydCBBeGlvc0hlYWRlcnMgZnJvbSAnLi4vY29yZS9BeGlvc0hlYWRlcnMuanMnO1xuaW1wb3J0IHtcbiAgcHJvZ3Jlc3NFdmVudFJlZHVjZXIsXG4gIHByb2dyZXNzRXZlbnREZWNvcmF0b3IsXG4gIGFzeW5jRGVjb3JhdG9yLFxufSBmcm9tICcuLi9oZWxwZXJzL3Byb2dyZXNzRXZlbnRSZWR1Y2VyLmpzJztcbmltcG9ydCByZXNvbHZlQ29uZmlnIGZyb20gJy4uL2hlbHBlcnMvcmVzb2x2ZUNvbmZpZy5qcyc7XG5pbXBvcnQgc2V0dGxlIGZyb20gJy4uL2NvcmUvc2V0dGxlLmpzJztcbmltcG9ydCBlc3RpbWF0ZURhdGFVUkxEZWNvZGVkQnl0ZXMgZnJvbSAnLi4vaGVscGVycy9lc3RpbWF0ZURhdGFVUkxEZWNvZGVkQnl0ZXMuanMnO1xuaW1wb3J0IHsgVkVSU0lPTiB9IGZyb20gJy4uL2Vudi9kYXRhLmpzJztcblxuY29uc3QgREVGQVVMVF9DSFVOS19TSVpFID0gNjQgKiAxMDI0O1xuXG5jb25zdCB7IGlzRnVuY3Rpb24gfSA9IHV0aWxzO1xuXG5jb25zdCB0ZXN0ID0gKGZuLCAuLi5hcmdzKSA9PiB7XG4gIHRyeSB7XG4gICAgcmV0dXJuICEhZm4oLi4uYXJncyk7XG4gIH0gY2F0Y2ggKGUpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbn07XG5cbmNvbnN0IGZhY3RvcnkgPSAoZW52KSA9PiB7XG4gIGNvbnN0IGdsb2JhbE9iamVjdCA9IHV0aWxzLmdsb2JhbCA/PyBnbG9iYWxUaGlzO1xuICBjb25zdCB7IFJlYWRhYmxlU3RyZWFtLCBUZXh0RW5jb2RlciB9ID0gZ2xvYmFsT2JqZWN0O1xuXG4gIGVudiA9IHV0aWxzLm1lcmdlLmNhbGwoXG4gICAge1xuICAgICAgc2tpcFVuZGVmaW5lZDogdHJ1ZSxcbiAgICB9LFxuICAgIHtcbiAgICAgIFJlcXVlc3Q6IGdsb2JhbE9iamVjdC5SZXF1ZXN0LFxuICAgICAgUmVzcG9uc2U6IGdsb2JhbE9iamVjdC5SZXNwb25zZSxcbiAgICB9LFxuICAgIGVudlxuICApO1xuXG4gIGNvbnN0IHsgZmV0Y2g6IGVudkZldGNoLCBSZXF1ZXN0LCBSZXNwb25zZSB9ID0gZW52O1xuICBjb25zdCBpc0ZldGNoU3VwcG9ydGVkID0gZW52RmV0Y2ggPyBpc0Z1bmN0aW9uKGVudkZldGNoKSA6IHR5cGVvZiBmZXRjaCA9PT0gJ2Z1bmN0aW9uJztcbiAgY29uc3QgaXNSZXF1ZXN0U3VwcG9ydGVkID0gaXNGdW5jdGlvbihSZXF1ZXN0KTtcbiAgY29uc3QgaXNSZXNwb25zZVN1cHBvcnRlZCA9IGlzRnVuY3Rpb24oUmVzcG9uc2UpO1xuXG4gIGlmICghaXNGZXRjaFN1cHBvcnRlZCkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIGNvbnN0IGlzUmVhZGFibGVTdHJlYW1TdXBwb3J0ZWQgPSBpc0ZldGNoU3VwcG9ydGVkICYmIGlzRnVuY3Rpb24oUmVhZGFibGVTdHJlYW0pO1xuXG4gIGNvbnN0IGVuY29kZVRleHQgPVxuICAgIGlzRmV0Y2hTdXBwb3J0ZWQgJiZcbiAgICAodHlwZW9mIFRleHRFbmNvZGVyID09PSAnZnVuY3Rpb24nXG4gICAgICA/IChcbiAgICAgICAgICAoZW5jb2RlcikgPT4gKHN0cikgPT5cbiAgICAgICAgICAgIGVuY29kZXIuZW5jb2RlKHN0cilcbiAgICAgICAgKShuZXcgVGV4dEVuY29kZXIoKSlcbiAgICAgIDogYXN5bmMgKHN0cikgPT4gbmV3IFVpbnQ4QXJyYXkoYXdhaXQgbmV3IFJlcXVlc3Qoc3RyKS5hcnJheUJ1ZmZlcigpKSk7XG5cbiAgY29uc3Qgc3VwcG9ydHNSZXF1ZXN0U3RyZWFtID1cbiAgICBpc1JlcXVlc3RTdXBwb3J0ZWQgJiZcbiAgICBpc1JlYWRhYmxlU3RyZWFtU3VwcG9ydGVkICYmXG4gICAgdGVzdCgoKSA9PiB7XG4gICAgICBsZXQgZHVwbGV4QWNjZXNzZWQgPSBmYWxzZTtcblxuICAgICAgY29uc3QgcmVxdWVzdCA9IG5ldyBSZXF1ZXN0KHBsYXRmb3JtLm9yaWdpbiwge1xuICAgICAgICBib2R5OiBuZXcgUmVhZGFibGVTdHJlYW0oKSxcbiAgICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICAgIGdldCBkdXBsZXgoKSB7XG4gICAgICAgICAgZHVwbGV4QWNjZXNzZWQgPSB0cnVlO1xuICAgICAgICAgIHJldHVybiAnaGFsZic7XG4gICAgICAgIH0sXG4gICAgICB9KTtcblxuICAgICAgY29uc3QgaGFzQ29udGVudFR5cGUgPSByZXF1ZXN0LmhlYWRlcnMuaGFzKCdDb250ZW50LVR5cGUnKTtcblxuICAgICAgaWYgKHJlcXVlc3QuYm9keSAhPSBudWxsKSB7XG4gICAgICAgIHJlcXVlc3QuYm9keS5jYW5jZWwoKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGR1cGxleEFjY2Vzc2VkICYmICFoYXNDb250ZW50VHlwZTtcbiAgICB9KTtcblxuICBjb25zdCBzdXBwb3J0c1Jlc3BvbnNlU3RyZWFtID1cbiAgICBpc1Jlc3BvbnNlU3VwcG9ydGVkICYmXG4gICAgaXNSZWFkYWJsZVN0cmVhbVN1cHBvcnRlZCAmJlxuICAgIHRlc3QoKCkgPT4gdXRpbHMuaXNSZWFkYWJsZVN0cmVhbShuZXcgUmVzcG9uc2UoJycpLmJvZHkpKTtcblxuICBjb25zdCByZXNvbHZlcnMgPSB7XG4gICAgc3RyZWFtOiBzdXBwb3J0c1Jlc3BvbnNlU3RyZWFtICYmICgocmVzKSA9PiByZXMuYm9keSksXG4gIH07XG5cbiAgaXNGZXRjaFN1cHBvcnRlZCAmJlxuICAgICgoKSA9PiB7XG4gICAgICBbJ3RleHQnLCAnYXJyYXlCdWZmZXInLCAnYmxvYicsICdmb3JtRGF0YScsICdzdHJlYW0nXS5mb3JFYWNoKCh0eXBlKSA9PiB7XG4gICAgICAgICFyZXNvbHZlcnNbdHlwZV0gJiZcbiAgICAgICAgICAocmVzb2x2ZXJzW3R5cGVdID0gKHJlcywgY29uZmlnKSA9PiB7XG4gICAgICAgICAgICBsZXQgbWV0aG9kID0gcmVzICYmIHJlc1t0eXBlXTtcblxuICAgICAgICAgICAgaWYgKG1ldGhvZCkge1xuICAgICAgICAgICAgICByZXR1cm4gbWV0aG9kLmNhbGwocmVzKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhyb3cgbmV3IEF4aW9zRXJyb3IoXG4gICAgICAgICAgICAgIGBSZXNwb25zZSB0eXBlICcke3R5cGV9JyBpcyBub3Qgc3VwcG9ydGVkYCxcbiAgICAgICAgICAgICAgQXhpb3NFcnJvci5FUlJfTk9UX1NVUFBPUlQsXG4gICAgICAgICAgICAgIGNvbmZpZ1xuICAgICAgICAgICAgKTtcbiAgICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgIH0pKCk7XG5cbiAgY29uc3QgZ2V0Qm9keUxlbmd0aCA9IGFzeW5jIChib2R5KSA9PiB7XG4gICAgaWYgKGJvZHkgPT0gbnVsbCkge1xuICAgICAgcmV0dXJuIDA7XG4gICAgfVxuXG4gICAgaWYgKHV0aWxzLmlzQmxvYihib2R5KSkge1xuICAgICAgcmV0dXJuIGJvZHkuc2l6ZTtcbiAgICB9XG5cbiAgICBpZiAodXRpbHMuaXNTcGVjQ29tcGxpYW50Rm9ybShib2R5KSkge1xuICAgICAgY29uc3QgX3JlcXVlc3QgPSBuZXcgUmVxdWVzdChwbGF0Zm9ybS5vcmlnaW4sIHtcbiAgICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICAgIGJvZHksXG4gICAgICB9KTtcbiAgICAgIHJldHVybiAoYXdhaXQgX3JlcXVlc3QuYXJyYXlCdWZmZXIoKSkuYnl0ZUxlbmd0aDtcbiAgICB9XG5cbiAgICBpZiAodXRpbHMuaXNBcnJheUJ1ZmZlclZpZXcoYm9keSkgfHwgdXRpbHMuaXNBcnJheUJ1ZmZlcihib2R5KSkge1xuICAgICAgcmV0dXJuIGJvZHkuYnl0ZUxlbmd0aDtcbiAgICB9XG5cbiAgICBpZiAodXRpbHMuaXNVUkxTZWFyY2hQYXJhbXMoYm9keSkpIHtcbiAgICAgIGJvZHkgPSBib2R5ICsgJyc7XG4gICAgfVxuXG4gICAgaWYgKHV0aWxzLmlzU3RyaW5nKGJvZHkpKSB7XG4gICAgICByZXR1cm4gKGF3YWl0IGVuY29kZVRleHQoYm9keSkpLmJ5dGVMZW5ndGg7XG4gICAgfVxuICB9O1xuXG4gIGNvbnN0IHJlc29sdmVCb2R5TGVuZ3RoID0gYXN5bmMgKGhlYWRlcnMsIGJvZHkpID0+IHtcbiAgICBjb25zdCBsZW5ndGggPSB1dGlscy50b0Zpbml0ZU51bWJlcihoZWFkZXJzLmdldENvbnRlbnRMZW5ndGgoKSk7XG5cbiAgICByZXR1cm4gbGVuZ3RoID09IG51bGwgPyBnZXRCb2R5TGVuZ3RoKGJvZHkpIDogbGVuZ3RoO1xuICB9O1xuXG4gIHJldHVybiBhc3luYyAoY29uZmlnKSA9PiB7XG4gICAgbGV0IHtcbiAgICAgIHVybCxcbiAgICAgIG1ldGhvZCxcbiAgICAgIGRhdGEsXG4gICAgICBzaWduYWwsXG4gICAgICBjYW5jZWxUb2tlbixcbiAgICAgIHRpbWVvdXQsXG4gICAgICBvbkRvd25sb2FkUHJvZ3Jlc3MsXG4gICAgICBvblVwbG9hZFByb2dyZXNzLFxuICAgICAgcmVzcG9uc2VUeXBlLFxuICAgICAgaGVhZGVycyxcbiAgICAgIHdpdGhDcmVkZW50aWFscyA9ICdzYW1lLW9yaWdpbicsXG4gICAgICBmZXRjaE9wdGlvbnMsXG4gICAgICBtYXhDb250ZW50TGVuZ3RoLFxuICAgICAgbWF4Qm9keUxlbmd0aCxcbiAgICB9ID0gcmVzb2x2ZUNvbmZpZyhjb25maWcpO1xuXG4gICAgY29uc3QgaGFzTWF4Q29udGVudExlbmd0aCA9IHV0aWxzLmlzTnVtYmVyKG1heENvbnRlbnRMZW5ndGgpICYmIG1heENvbnRlbnRMZW5ndGggPiAtMTtcbiAgICBjb25zdCBoYXNNYXhCb2R5TGVuZ3RoID0gdXRpbHMuaXNOdW1iZXIobWF4Qm9keUxlbmd0aCkgJiYgbWF4Qm9keUxlbmd0aCA+IC0xO1xuXG4gICAgbGV0IF9mZXRjaCA9IGVudkZldGNoIHx8IGZldGNoO1xuXG4gICAgcmVzcG9uc2VUeXBlID0gcmVzcG9uc2VUeXBlID8gKHJlc3BvbnNlVHlwZSArICcnKS50b0xvd2VyQ2FzZSgpIDogJ3RleHQnO1xuXG4gICAgbGV0IGNvbXBvc2VkU2lnbmFsID0gY29tcG9zZVNpZ25hbHMoXG4gICAgICBbc2lnbmFsLCBjYW5jZWxUb2tlbiAmJiBjYW5jZWxUb2tlbi50b0Fib3J0U2lnbmFsKCldLFxuICAgICAgdGltZW91dFxuICAgICk7XG5cbiAgICBsZXQgcmVxdWVzdCA9IG51bGw7XG5cbiAgICBjb25zdCB1bnN1YnNjcmliZSA9XG4gICAgICBjb21wb3NlZFNpZ25hbCAmJlxuICAgICAgY29tcG9zZWRTaWduYWwudW5zdWJzY3JpYmUgJiZcbiAgICAgICgoKSA9PiB7XG4gICAgICAgIGNvbXBvc2VkU2lnbmFsLnVuc3Vic2NyaWJlKCk7XG4gICAgICB9KTtcblxuICAgIGxldCByZXF1ZXN0Q29udGVudExlbmd0aDtcblxuICAgIHRyeSB7XG4gICAgICAvLyBFbmZvcmNlIG1heENvbnRlbnRMZW5ndGggZm9yIGRhdGE6IFVSTHMgdXAtZnJvbnQgc28gd2UgbmV2ZXIgbWF0ZXJpYWxpemVcbiAgICAgIC8vIGFuIG92ZXJzaXplZCBwYXlsb2FkLiBUaGUgSFRUUCBhZGFwdGVyIGFwcGxpZXMgdGhlIHNhbWUgY2hlY2sgKHNlZSBodHRwLmpzXG4gICAgICAvLyBcImlmIChwcm90b2NvbCA9PT0gJ2RhdGE6JylcIiBicmFuY2gpLlxuICAgICAgaWYgKGhhc01heENvbnRlbnRMZW5ndGggJiYgdHlwZW9mIHVybCA9PT0gJ3N0cmluZycgJiYgdXJsLnN0YXJ0c1dpdGgoJ2RhdGE6JykpIHtcbiAgICAgICAgY29uc3QgZXN0aW1hdGVkID0gZXN0aW1hdGVEYXRhVVJMRGVjb2RlZEJ5dGVzKHVybCk7XG4gICAgICAgIGlmIChlc3RpbWF0ZWQgPiBtYXhDb250ZW50TGVuZ3RoKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IEF4aW9zRXJyb3IoXG4gICAgICAgICAgICAnbWF4Q29udGVudExlbmd0aCBzaXplIG9mICcgKyBtYXhDb250ZW50TGVuZ3RoICsgJyBleGNlZWRlZCcsXG4gICAgICAgICAgICBBeGlvc0Vycm9yLkVSUl9CQURfUkVTUE9OU0UsXG4gICAgICAgICAgICBjb25maWcsXG4gICAgICAgICAgICByZXF1ZXN0XG4gICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICAvLyBFbmZvcmNlIG1heEJvZHlMZW5ndGggYWdhaW5zdCB0aGUgb3V0Ym91bmQgcmVxdWVzdCBib2R5IGJlZm9yZSBkaXNwYXRjaC5cbiAgICAgIC8vIE1pcnJvcnMgaHR0cC5qcyBiZWhhdmlvciAoRVJSX0JBRF9SRVFVRVNUIC8gJ1JlcXVlc3QgYm9keSBsYXJnZXIgdGhhblxuICAgICAgLy8gbWF4Qm9keUxlbmd0aCBsaW1pdCcpLiBTa2lwIHdoZW4gdGhlIGJvZHkgbGVuZ3RoIGNhbm5vdCBiZSBkZXRlcm1pbmVkXG4gICAgICAvLyAoZS5nLiBhIGxpdmUgUmVhZGFibGVTdHJlYW0gc3VwcGxpZWQgYnkgdGhlIGNhbGxlcikuXG4gICAgICBpZiAoaGFzTWF4Qm9keUxlbmd0aCAmJiBtZXRob2QgIT09ICdnZXQnICYmIG1ldGhvZCAhPT0gJ2hlYWQnKSB7XG4gICAgICAgIGNvbnN0IG91dGJvdW5kTGVuZ3RoID0gYXdhaXQgcmVzb2x2ZUJvZHlMZW5ndGgoaGVhZGVycywgZGF0YSk7XG4gICAgICAgIGlmIChcbiAgICAgICAgICB0eXBlb2Ygb3V0Ym91bmRMZW5ndGggPT09ICdudW1iZXInICYmXG4gICAgICAgICAgaXNGaW5pdGUob3V0Ym91bmRMZW5ndGgpICYmXG4gICAgICAgICAgb3V0Ym91bmRMZW5ndGggPiBtYXhCb2R5TGVuZ3RoXG4gICAgICAgICkge1xuICAgICAgICAgIHRocm93IG5ldyBBeGlvc0Vycm9yKFxuICAgICAgICAgICAgJ1JlcXVlc3QgYm9keSBsYXJnZXIgdGhhbiBtYXhCb2R5TGVuZ3RoIGxpbWl0JyxcbiAgICAgICAgICAgIEF4aW9zRXJyb3IuRVJSX0JBRF9SRVFVRVNULFxuICAgICAgICAgICAgY29uZmlnLFxuICAgICAgICAgICAgcmVxdWVzdFxuICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKFxuICAgICAgICBvblVwbG9hZFByb2dyZXNzICYmXG4gICAgICAgIHN1cHBvcnRzUmVxdWVzdFN0cmVhbSAmJlxuICAgICAgICBtZXRob2QgIT09ICdnZXQnICYmXG4gICAgICAgIG1ldGhvZCAhPT0gJ2hlYWQnICYmXG4gICAgICAgIChyZXF1ZXN0Q29udGVudExlbmd0aCA9IGF3YWl0IHJlc29sdmVCb2R5TGVuZ3RoKGhlYWRlcnMsIGRhdGEpKSAhPT0gMFxuICAgICAgKSB7XG4gICAgICAgIGxldCBfcmVxdWVzdCA9IG5ldyBSZXF1ZXN0KHVybCwge1xuICAgICAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgICAgIGJvZHk6IGRhdGEsXG4gICAgICAgICAgZHVwbGV4OiAnaGFsZicsXG4gICAgICAgIH0pO1xuXG4gICAgICAgIGxldCBjb250ZW50VHlwZUhlYWRlcjtcblxuICAgICAgICBpZiAodXRpbHMuaXNGb3JtRGF0YShkYXRhKSAmJiAoY29udGVudFR5cGVIZWFkZXIgPSBfcmVxdWVzdC5oZWFkZXJzLmdldCgnY29udGVudC10eXBlJykpKSB7XG4gICAgICAgICAgaGVhZGVycy5zZXRDb250ZW50VHlwZShjb250ZW50VHlwZUhlYWRlcik7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoX3JlcXVlc3QuYm9keSkge1xuICAgICAgICAgIGNvbnN0IFtvblByb2dyZXNzLCBmbHVzaF0gPSBwcm9ncmVzc0V2ZW50RGVjb3JhdG9yKFxuICAgICAgICAgICAgcmVxdWVzdENvbnRlbnRMZW5ndGgsXG4gICAgICAgICAgICBwcm9ncmVzc0V2ZW50UmVkdWNlcihhc3luY0RlY29yYXRvcihvblVwbG9hZFByb2dyZXNzKSlcbiAgICAgICAgICApO1xuXG4gICAgICAgICAgZGF0YSA9IHRyYWNrU3RyZWFtKF9yZXF1ZXN0LmJvZHksIERFRkFVTFRfQ0hVTktfU0laRSwgb25Qcm9ncmVzcywgZmx1c2gpO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmICghdXRpbHMuaXNTdHJpbmcod2l0aENyZWRlbnRpYWxzKSkge1xuICAgICAgICB3aXRoQ3JlZGVudGlhbHMgPSB3aXRoQ3JlZGVudGlhbHMgPyAnaW5jbHVkZScgOiAnb21pdCc7XG4gICAgICB9XG5cbiAgICAgIC8vIENsb3VkZmxhcmUgV29ya2VycyB0aHJvd3Mgd2hlbiBjcmVkZW50aWFscyBhcmUgZGVmaW5lZFxuICAgICAgLy8gc2VlIGh0dHBzOi8vZ2l0aHViLmNvbS9jbG91ZGZsYXJlL3dvcmtlcmQvaXNzdWVzLzkwMlxuICAgICAgY29uc3QgaXNDcmVkZW50aWFsc1N1cHBvcnRlZCA9IGlzUmVxdWVzdFN1cHBvcnRlZCAmJiAnY3JlZGVudGlhbHMnIGluIFJlcXVlc3QucHJvdG90eXBlO1xuXG4gICAgICAvLyBJZiBkYXRhIGlzIEZvcm1EYXRhIGFuZCBDb250ZW50LVR5cGUgaXMgbXVsdGlwYXJ0L2Zvcm0tZGF0YSB3aXRob3V0IGJvdW5kYXJ5LFxuICAgICAgLy8gZGVsZXRlIGl0IHNvIGZldGNoIGNhbiBzZXQgaXQgY29ycmVjdGx5IHdpdGggdGhlIGJvdW5kYXJ5XG4gICAgICBpZiAodXRpbHMuaXNGb3JtRGF0YShkYXRhKSkge1xuICAgICAgICBjb25zdCBjb250ZW50VHlwZSA9IGhlYWRlcnMuZ2V0Q29udGVudFR5cGUoKTtcbiAgICAgICAgaWYgKFxuICAgICAgICAgIGNvbnRlbnRUeXBlICYmXG4gICAgICAgICAgL15tdWx0aXBhcnRcXC9mb3JtLWRhdGEvaS50ZXN0KGNvbnRlbnRUeXBlKSAmJlxuICAgICAgICAgICEvYm91bmRhcnk9L2kudGVzdChjb250ZW50VHlwZSlcbiAgICAgICAgKSB7XG4gICAgICAgICAgaGVhZGVycy5kZWxldGUoJ2NvbnRlbnQtdHlwZScpO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIC8vIFNldCBVc2VyLUFnZW50IGhlYWRlciBpZiBub3QgYWxyZWFkeSBzZXQgKGZldGNoIGRlZmF1bHRzIHRvICdub2RlJyBpbiBOb2RlLmpzKVxuICAgICAgaGVhZGVycy5zZXQoJ1VzZXItQWdlbnQnLCAnYXhpb3MvJyArIFZFUlNJT04sIGZhbHNlKTtcblxuICAgICAgY29uc3QgcmVzb2x2ZWRPcHRpb25zID0ge1xuICAgICAgICAuLi5mZXRjaE9wdGlvbnMsXG4gICAgICAgIHNpZ25hbDogY29tcG9zZWRTaWduYWwsXG4gICAgICAgIG1ldGhvZDogbWV0aG9kLnRvVXBwZXJDYXNlKCksXG4gICAgICAgIGhlYWRlcnM6IGhlYWRlcnMubm9ybWFsaXplKCkudG9KU09OKCksXG4gICAgICAgIGJvZHk6IGRhdGEsXG4gICAgICAgIGR1cGxleDogJ2hhbGYnLFxuICAgICAgICBjcmVkZW50aWFsczogaXNDcmVkZW50aWFsc1N1cHBvcnRlZCA/IHdpdGhDcmVkZW50aWFscyA6IHVuZGVmaW5lZCxcbiAgICAgIH07XG5cbiAgICAgIHJlcXVlc3QgPSBpc1JlcXVlc3RTdXBwb3J0ZWQgJiYgbmV3IFJlcXVlc3QodXJsLCByZXNvbHZlZE9wdGlvbnMpO1xuXG4gICAgICBsZXQgcmVzcG9uc2UgPSBhd2FpdCAoaXNSZXF1ZXN0U3VwcG9ydGVkXG4gICAgICAgID8gX2ZldGNoKHJlcXVlc3QsIGZldGNoT3B0aW9ucylcbiAgICAgICAgOiBfZmV0Y2godXJsLCByZXNvbHZlZE9wdGlvbnMpKTtcblxuICAgICAgLy8gQ2hlYXAgcHJlLWNoZWNrOiBpZiB0aGUgc2VydmVyIGhvbmVzdGx5IGRlY2xhcmVzIGEgY29udGVudC1sZW5ndGggdGhhdFxuICAgICAgLy8gYWxyZWFkeSBleGNlZWRzIHRoZSBjYXAsIHJlamVjdCBiZWZvcmUgd2Ugc3RhcnQgc3RyZWFtaW5nLlxuICAgICAgaWYgKGhhc01heENvbnRlbnRMZW5ndGgpIHtcbiAgICAgICAgY29uc3QgZGVjbGFyZWRMZW5ndGggPSB1dGlscy50b0Zpbml0ZU51bWJlcihyZXNwb25zZS5oZWFkZXJzLmdldCgnY29udGVudC1sZW5ndGgnKSk7XG4gICAgICAgIGlmIChkZWNsYXJlZExlbmd0aCAhPSBudWxsICYmIGRlY2xhcmVkTGVuZ3RoID4gbWF4Q29udGVudExlbmd0aCkge1xuICAgICAgICAgIHRocm93IG5ldyBBeGlvc0Vycm9yKFxuICAgICAgICAgICAgJ21heENvbnRlbnRMZW5ndGggc2l6ZSBvZiAnICsgbWF4Q29udGVudExlbmd0aCArICcgZXhjZWVkZWQnLFxuICAgICAgICAgICAgQXhpb3NFcnJvci5FUlJfQkFEX1JFU1BPTlNFLFxuICAgICAgICAgICAgY29uZmlnLFxuICAgICAgICAgICAgcmVxdWVzdFxuICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgY29uc3QgaXNTdHJlYW1SZXNwb25zZSA9XG4gICAgICAgIHN1cHBvcnRzUmVzcG9uc2VTdHJlYW0gJiYgKHJlc3BvbnNlVHlwZSA9PT0gJ3N0cmVhbScgfHwgcmVzcG9uc2VUeXBlID09PSAncmVzcG9uc2UnKTtcblxuICAgICAgaWYgKFxuICAgICAgICBzdXBwb3J0c1Jlc3BvbnNlU3RyZWFtICYmXG4gICAgICAgIHJlc3BvbnNlLmJvZHkgJiZcbiAgICAgICAgKG9uRG93bmxvYWRQcm9ncmVzcyB8fCBoYXNNYXhDb250ZW50TGVuZ3RoIHx8IChpc1N0cmVhbVJlc3BvbnNlICYmIHVuc3Vic2NyaWJlKSlcbiAgICAgICkge1xuICAgICAgICBjb25zdCBvcHRpb25zID0ge307XG5cbiAgICAgICAgWydzdGF0dXMnLCAnc3RhdHVzVGV4dCcsICdoZWFkZXJzJ10uZm9yRWFjaCgocHJvcCkgPT4ge1xuICAgICAgICAgIG9wdGlvbnNbcHJvcF0gPSByZXNwb25zZVtwcm9wXTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgY29uc3QgcmVzcG9uc2VDb250ZW50TGVuZ3RoID0gdXRpbHMudG9GaW5pdGVOdW1iZXIocmVzcG9uc2UuaGVhZGVycy5nZXQoJ2NvbnRlbnQtbGVuZ3RoJykpO1xuXG4gICAgICAgIGNvbnN0IFtvblByb2dyZXNzLCBmbHVzaF0gPVxuICAgICAgICAgIChvbkRvd25sb2FkUHJvZ3Jlc3MgJiZcbiAgICAgICAgICAgIHByb2dyZXNzRXZlbnREZWNvcmF0b3IoXG4gICAgICAgICAgICAgIHJlc3BvbnNlQ29udGVudExlbmd0aCxcbiAgICAgICAgICAgICAgcHJvZ3Jlc3NFdmVudFJlZHVjZXIoYXN5bmNEZWNvcmF0b3Iob25Eb3dubG9hZFByb2dyZXNzKSwgdHJ1ZSlcbiAgICAgICAgICAgICkpIHx8XG4gICAgICAgICAgW107XG5cbiAgICAgICAgbGV0IGJ5dGVzUmVhZCA9IDA7XG4gICAgICAgIGNvbnN0IG9uQ2h1bmtQcm9ncmVzcyA9IChsb2FkZWRCeXRlcykgPT4ge1xuICAgICAgICAgIGlmIChoYXNNYXhDb250ZW50TGVuZ3RoKSB7XG4gICAgICAgICAgICBieXRlc1JlYWQgPSBsb2FkZWRCeXRlcztcbiAgICAgICAgICAgIGlmIChieXRlc1JlYWQgPiBtYXhDb250ZW50TGVuZ3RoKSB7XG4gICAgICAgICAgICAgIHRocm93IG5ldyBBeGlvc0Vycm9yKFxuICAgICAgICAgICAgICAgICdtYXhDb250ZW50TGVuZ3RoIHNpemUgb2YgJyArIG1heENvbnRlbnRMZW5ndGggKyAnIGV4Y2VlZGVkJyxcbiAgICAgICAgICAgICAgICBBeGlvc0Vycm9yLkVSUl9CQURfUkVTUE9OU0UsXG4gICAgICAgICAgICAgICAgY29uZmlnLFxuICAgICAgICAgICAgICAgIHJlcXVlc3RcbiAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgb25Qcm9ncmVzcyAmJiBvblByb2dyZXNzKGxvYWRlZEJ5dGVzKTtcbiAgICAgICAgfTtcblxuICAgICAgICByZXNwb25zZSA9IG5ldyBSZXNwb25zZShcbiAgICAgICAgICB0cmFja1N0cmVhbShyZXNwb25zZS5ib2R5LCBERUZBVUxUX0NIVU5LX1NJWkUsIG9uQ2h1bmtQcm9ncmVzcywgKCkgPT4ge1xuICAgICAgICAgICAgZmx1c2ggJiYgZmx1c2goKTtcbiAgICAgICAgICAgIHVuc3Vic2NyaWJlICYmIHVuc3Vic2NyaWJlKCk7XG4gICAgICAgICAgfSksXG4gICAgICAgICAgb3B0aW9uc1xuICAgICAgICApO1xuICAgICAgfVxuXG4gICAgICByZXNwb25zZVR5cGUgPSByZXNwb25zZVR5cGUgfHwgJ3RleHQnO1xuXG4gICAgICBsZXQgcmVzcG9uc2VEYXRhID0gYXdhaXQgcmVzb2x2ZXJzW3V0aWxzLmZpbmRLZXkocmVzb2x2ZXJzLCByZXNwb25zZVR5cGUpIHx8ICd0ZXh0J10oXG4gICAgICAgIHJlc3BvbnNlLFxuICAgICAgICBjb25maWdcbiAgICAgICk7XG5cbiAgICAgIC8vIEZhbGxiYWNrIGVuZm9yY2VtZW50IGZvciBlbnZpcm9ubWVudHMgd2l0aG91dCBSZWFkYWJsZVN0cmVhbSBzdXBwb3J0XG4gICAgICAvLyAobGVnYWN5IHJ1bnRpbWVzKS4gRGV0ZWN0IG1hdGVyaWFsaXplZCBzaXplIGZyb20gdHlwZWQgb3V0cHV0OyBza2lwXG4gICAgICAvLyBzdHJlYW1zL1Jlc3BvbnNlIHBhc3N0aHJvdWdoIHNpbmNlIHRoZSB1c2VyIHdpbGwgcmVhZCB0aG9zZSB0aGVtc2VsdmVzLlxuICAgICAgaWYgKGhhc01heENvbnRlbnRMZW5ndGggJiYgIXN1cHBvcnRzUmVzcG9uc2VTdHJlYW0gJiYgIWlzU3RyZWFtUmVzcG9uc2UpIHtcbiAgICAgICAgbGV0IG1hdGVyaWFsaXplZFNpemU7XG4gICAgICAgIGlmIChyZXNwb25zZURhdGEgIT0gbnVsbCkge1xuICAgICAgICAgIGlmICh0eXBlb2YgcmVzcG9uc2VEYXRhLmJ5dGVMZW5ndGggPT09ICdudW1iZXInKSB7XG4gICAgICAgICAgICBtYXRlcmlhbGl6ZWRTaXplID0gcmVzcG9uc2VEYXRhLmJ5dGVMZW5ndGg7XG4gICAgICAgICAgfSBlbHNlIGlmICh0eXBlb2YgcmVzcG9uc2VEYXRhLnNpemUgPT09ICdudW1iZXInKSB7XG4gICAgICAgICAgICBtYXRlcmlhbGl6ZWRTaXplID0gcmVzcG9uc2VEYXRhLnNpemU7XG4gICAgICAgICAgfSBlbHNlIGlmICh0eXBlb2YgcmVzcG9uc2VEYXRhID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgbWF0ZXJpYWxpemVkU2l6ZSA9XG4gICAgICAgICAgICAgIHR5cGVvZiBUZXh0RW5jb2RlciA9PT0gJ2Z1bmN0aW9uJ1xuICAgICAgICAgICAgICAgID8gbmV3IFRleHRFbmNvZGVyKCkuZW5jb2RlKHJlc3BvbnNlRGF0YSkuYnl0ZUxlbmd0aFxuICAgICAgICAgICAgICAgIDogcmVzcG9uc2VEYXRhLmxlbmd0aDtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHR5cGVvZiBtYXRlcmlhbGl6ZWRTaXplID09PSAnbnVtYmVyJyAmJiBtYXRlcmlhbGl6ZWRTaXplID4gbWF4Q29udGVudExlbmd0aCkge1xuICAgICAgICAgIHRocm93IG5ldyBBeGlvc0Vycm9yKFxuICAgICAgICAgICAgJ21heENvbnRlbnRMZW5ndGggc2l6ZSBvZiAnICsgbWF4Q29udGVudExlbmd0aCArICcgZXhjZWVkZWQnLFxuICAgICAgICAgICAgQXhpb3NFcnJvci5FUlJfQkFEX1JFU1BPTlNFLFxuICAgICAgICAgICAgY29uZmlnLFxuICAgICAgICAgICAgcmVxdWVzdFxuICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgIWlzU3RyZWFtUmVzcG9uc2UgJiYgdW5zdWJzY3JpYmUgJiYgdW5zdWJzY3JpYmUoKTtcblxuICAgICAgcmV0dXJuIGF3YWl0IG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgc2V0dGxlKHJlc29sdmUsIHJlamVjdCwge1xuICAgICAgICAgIGRhdGE6IHJlc3BvbnNlRGF0YSxcbiAgICAgICAgICBoZWFkZXJzOiBBeGlvc0hlYWRlcnMuZnJvbShyZXNwb25zZS5oZWFkZXJzKSxcbiAgICAgICAgICBzdGF0dXM6IHJlc3BvbnNlLnN0YXR1cyxcbiAgICAgICAgICBzdGF0dXNUZXh0OiByZXNwb25zZS5zdGF0dXNUZXh0LFxuICAgICAgICAgIGNvbmZpZyxcbiAgICAgICAgICByZXF1ZXN0LFxuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgdW5zdWJzY3JpYmUgJiYgdW5zdWJzY3JpYmUoKTtcblxuICAgICAgLy8gU2FmYXJpIGNhbiBzdXJmYWNlIGZldGNoIGFib3J0cyBhcyBhIERPTUV4Y2VwdGlvbi1saWtlIG9iamVjdCB3aG9zZVxuICAgICAgLy8gYnJhbmRlZCBnZXR0ZXJzIHRocm93LiBQcmVmZXIgb3VyIGNvbXBvc2VkIHNpZ25hbCByZWFzb24gYmVmb3JlIHJlYWRpbmdcbiAgICAgIC8vIHRoZSBjYXVnaHQgZXJyb3IsIHByZXNlcnZpbmcgdGltZW91dCB2cyBjYW5jZWxsYXRpb24gc2VtYW50aWNzLlxuICAgICAgaWYgKGNvbXBvc2VkU2lnbmFsICYmIGNvbXBvc2VkU2lnbmFsLmFib3J0ZWQgJiYgY29tcG9zZWRTaWduYWwucmVhc29uIGluc3RhbmNlb2YgQXhpb3NFcnJvcikge1xuICAgICAgICBjb25zdCBjYW5jZWxlZEVycm9yID0gY29tcG9zZWRTaWduYWwucmVhc29uO1xuICAgICAgICBjYW5jZWxlZEVycm9yLmNvbmZpZyA9IGNvbmZpZztcbiAgICAgICAgcmVxdWVzdCAmJiAoY2FuY2VsZWRFcnJvci5yZXF1ZXN0ID0gcmVxdWVzdCk7XG4gICAgICAgIGVyciAhPT0gY2FuY2VsZWRFcnJvciAmJiAoY2FuY2VsZWRFcnJvci5jYXVzZSA9IGVycik7XG4gICAgICAgIHRocm93IGNhbmNlbGVkRXJyb3I7XG4gICAgICB9XG5cbiAgICAgIGlmIChlcnIgJiYgZXJyLm5hbWUgPT09ICdUeXBlRXJyb3InICYmIC9Mb2FkIGZhaWxlZHxmZXRjaC9pLnRlc3QoZXJyLm1lc3NhZ2UpKSB7XG4gICAgICAgIHRocm93IE9iamVjdC5hc3NpZ24oXG4gICAgICAgICAgbmV3IEF4aW9zRXJyb3IoXG4gICAgICAgICAgICAnTmV0d29yayBFcnJvcicsXG4gICAgICAgICAgICBBeGlvc0Vycm9yLkVSUl9ORVRXT1JLLFxuICAgICAgICAgICAgY29uZmlnLFxuICAgICAgICAgICAgcmVxdWVzdCxcbiAgICAgICAgICAgIGVyciAmJiBlcnIucmVzcG9uc2VcbiAgICAgICAgICApLFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIGNhdXNlOiBlcnIuY2F1c2UgfHwgZXJyLFxuICAgICAgICAgIH1cbiAgICAgICAgKTtcbiAgICAgIH1cblxuICAgICAgdGhyb3cgQXhpb3NFcnJvci5mcm9tKGVyciwgZXJyICYmIGVyci5jb2RlLCBjb25maWcsIHJlcXVlc3QsIGVyciAmJiBlcnIucmVzcG9uc2UpO1xuICAgIH1cbiAgfTtcbn07XG5cbmNvbnN0IHNlZWRDYWNoZSA9IG5ldyBNYXAoKTtcblxuZXhwb3J0IGNvbnN0IGdldEZldGNoID0gKGNvbmZpZykgPT4ge1xuICBsZXQgZW52ID0gKGNvbmZpZyAmJiBjb25maWcuZW52KSB8fCB7fTtcbiAgY29uc3QgeyBmZXRjaCwgUmVxdWVzdCwgUmVzcG9uc2UgfSA9IGVudjtcbiAgY29uc3Qgc2VlZHMgPSBbUmVxdWVzdCwgUmVzcG9uc2UsIGZldGNoXTtcblxuICBsZXQgbGVuID0gc2VlZHMubGVuZ3RoLFxuICAgIGkgPSBsZW4sXG4gICAgc2VlZCxcbiAgICB0YXJnZXQsXG4gICAgbWFwID0gc2VlZENhY2hlO1xuXG4gIHdoaWxlIChpLS0pIHtcbiAgICBzZWVkID0gc2VlZHNbaV07XG4gICAgdGFyZ2V0ID0gbWFwLmdldChzZWVkKTtcblxuICAgIHRhcmdldCA9PT0gdW5kZWZpbmVkICYmIG1hcC5zZXQoc2VlZCwgKHRhcmdldCA9IGkgPyBuZXcgTWFwKCkgOiBmYWN0b3J5KGVudikpKTtcblxuICAgIG1hcCA9IHRhcmdldDtcbiAgfVxuXG4gIHJldHVybiB0YXJnZXQ7XG59O1xuXG5jb25zdCBhZGFwdGVyID0gZ2V0RmV0Y2goKTtcblxuZXhwb3J0IGRlZmF1bHQgYWRhcHRlcjtcbiIsImltcG9ydCB1dGlscyBmcm9tICcuLi91dGlscy5qcyc7XG5pbXBvcnQgaHR0cEFkYXB0ZXIgZnJvbSAnLi9odHRwLmpzJztcbmltcG9ydCB4aHJBZGFwdGVyIGZyb20gJy4veGhyLmpzJztcbmltcG9ydCAqIGFzIGZldGNoQWRhcHRlciBmcm9tICcuL2ZldGNoLmpzJztcbmltcG9ydCBBeGlvc0Vycm9yIGZyb20gJy4uL2NvcmUvQXhpb3NFcnJvci5qcyc7XG5cbi8qKlxuICogS25vd24gYWRhcHRlcnMgbWFwcGluZy5cbiAqIFByb3ZpZGVzIGVudmlyb25tZW50LXNwZWNpZmljIGFkYXB0ZXJzIGZvciBBeGlvczpcbiAqIC0gYGh0dHBgIGZvciBOb2RlLmpzXG4gKiAtIGB4aHJgIGZvciBicm93c2Vyc1xuICogLSBgZmV0Y2hgIGZvciBmZXRjaCBBUEktYmFzZWQgcmVxdWVzdHNcbiAqXG4gKiBAdHlwZSB7T2JqZWN0PHN0cmluZywgRnVuY3Rpb258T2JqZWN0Pn1cbiAqL1xuY29uc3Qga25vd25BZGFwdGVycyA9IHtcbiAgaHR0cDogaHR0cEFkYXB0ZXIsXG4gIHhocjogeGhyQWRhcHRlcixcbiAgZmV0Y2g6IHtcbiAgICBnZXQ6IGZldGNoQWRhcHRlci5nZXRGZXRjaCxcbiAgfSxcbn07XG5cbi8vIEFzc2lnbiBhZGFwdGVyIG5hbWVzIGZvciBlYXNpZXIgZGVidWdnaW5nIGFuZCBpZGVudGlmaWNhdGlvblxudXRpbHMuZm9yRWFjaChrbm93bkFkYXB0ZXJzLCAoZm4sIHZhbHVlKSA9PiB7XG4gIGlmIChmbikge1xuICAgIHRyeSB7XG4gICAgICAvLyBOdWxsLXByb3RvIGRlc2NyaXB0b3JzIHNvIGEgcG9sbHV0ZWQgT2JqZWN0LnByb3RvdHlwZS5nZXQgY2Fubm90IHR1cm5cbiAgICAgIC8vIHRoZXNlIGRhdGEgZGVzY3JpcHRvcnMgaW50byBhY2Nlc3NvciBkZXNjcmlwdG9ycyBvbiB0aGUgd2F5IGluLlxuICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGZuLCAnbmFtZScsIHsgX19wcm90b19fOiBudWxsLCB2YWx1ZSB9KTtcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tZW1wdHlcbiAgICB9XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGZuLCAnYWRhcHRlck5hbWUnLCB7IF9fcHJvdG9fXzogbnVsbCwgdmFsdWUgfSk7XG4gIH1cbn0pO1xuXG4vKipcbiAqIFJlbmRlciBhIHJlamVjdGlvbiByZWFzb24gc3RyaW5nIGZvciB1bmtub3duIG9yIHVuc3VwcG9ydGVkIGFkYXB0ZXJzXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IHJlYXNvblxuICogQHJldHVybnMge3N0cmluZ31cbiAqL1xuY29uc3QgcmVuZGVyUmVhc29uID0gKHJlYXNvbikgPT4gYC0gJHtyZWFzb259YDtcblxuLyoqXG4gKiBDaGVjayBpZiB0aGUgYWRhcHRlciBpcyByZXNvbHZlZCAoZnVuY3Rpb24sIG51bGwsIG9yIGZhbHNlKVxuICpcbiAqIEBwYXJhbSB7RnVuY3Rpb258bnVsbHxmYWxzZX0gYWRhcHRlclxuICogQHJldHVybnMge2Jvb2xlYW59XG4gKi9cbmNvbnN0IGlzUmVzb2x2ZWRIYW5kbGUgPSAoYWRhcHRlcikgPT5cbiAgdXRpbHMuaXNGdW5jdGlvbihhZGFwdGVyKSB8fCBhZGFwdGVyID09PSBudWxsIHx8IGFkYXB0ZXIgPT09IGZhbHNlO1xuXG4vKipcbiAqIEdldCB0aGUgZmlyc3Qgc3VpdGFibGUgYWRhcHRlciBmcm9tIHRoZSBwcm92aWRlZCBsaXN0LlxuICogVHJpZXMgZWFjaCBhZGFwdGVyIGluIG9yZGVyIHVudGlsIGEgc3VwcG9ydGVkIG9uZSBpcyBmb3VuZC5cbiAqIFRocm93cyBhbiBBeGlvc0Vycm9yIGlmIG5vIGFkYXB0ZXIgaXMgc3VpdGFibGUuXG4gKlxuICogQHBhcmFtIHtBcnJheTxzdHJpbmd8RnVuY3Rpb24+fHN0cmluZ3xGdW5jdGlvbn0gYWRhcHRlcnMgLSBBZGFwdGVyKHMpIGJ5IG5hbWUgb3IgZnVuY3Rpb24uXG4gKiBAcGFyYW0ge09iamVjdH0gY29uZmlnIC0gQXhpb3MgcmVxdWVzdCBjb25maWd1cmF0aW9uXG4gKiBAdGhyb3dzIHtBeGlvc0Vycm9yfSBJZiBubyBzdWl0YWJsZSBhZGFwdGVyIGlzIGF2YWlsYWJsZVxuICogQHJldHVybnMge0Z1bmN0aW9ufSBUaGUgcmVzb2x2ZWQgYWRhcHRlciBmdW5jdGlvblxuICovXG5mdW5jdGlvbiBnZXRBZGFwdGVyKGFkYXB0ZXJzLCBjb25maWcpIHtcbiAgYWRhcHRlcnMgPSB1dGlscy5pc0FycmF5KGFkYXB0ZXJzKSA/IGFkYXB0ZXJzIDogW2FkYXB0ZXJzXTtcblxuICBjb25zdCB7IGxlbmd0aCB9ID0gYWRhcHRlcnM7XG4gIGxldCBuYW1lT3JBZGFwdGVyO1xuICBsZXQgYWRhcHRlcjtcblxuICBjb25zdCByZWplY3RlZFJlYXNvbnMgPSB7fTtcblxuICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgbmFtZU9yQWRhcHRlciA9IGFkYXB0ZXJzW2ldO1xuICAgIGxldCBpZDtcblxuICAgIGFkYXB0ZXIgPSBuYW1lT3JBZGFwdGVyO1xuXG4gICAgaWYgKCFpc1Jlc29sdmVkSGFuZGxlKG5hbWVPckFkYXB0ZXIpKSB7XG4gICAgICBhZGFwdGVyID0ga25vd25BZGFwdGVyc1soaWQgPSBTdHJpbmcobmFtZU9yQWRhcHRlcikpLnRvTG93ZXJDYXNlKCldO1xuXG4gICAgICBpZiAoYWRhcHRlciA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHRocm93IG5ldyBBeGlvc0Vycm9yKGBVbmtub3duIGFkYXB0ZXIgJyR7aWR9J2ApO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChhZGFwdGVyICYmICh1dGlscy5pc0Z1bmN0aW9uKGFkYXB0ZXIpIHx8IChhZGFwdGVyID0gYWRhcHRlci5nZXQoY29uZmlnKSkpKSB7XG4gICAgICBicmVhaztcbiAgICB9XG5cbiAgICByZWplY3RlZFJlYXNvbnNbaWQgfHwgJyMnICsgaV0gPSBhZGFwdGVyO1xuICB9XG5cbiAgaWYgKCFhZGFwdGVyKSB7XG4gICAgY29uc3QgcmVhc29ucyA9IE9iamVjdC5lbnRyaWVzKHJlamVjdGVkUmVhc29ucykubWFwKFxuICAgICAgKFtpZCwgc3RhdGVdKSA9PlxuICAgICAgICBgYWRhcHRlciAke2lkfSBgICtcbiAgICAgICAgKHN0YXRlID09PSBmYWxzZSA/ICdpcyBub3Qgc3VwcG9ydGVkIGJ5IHRoZSBlbnZpcm9ubWVudCcgOiAnaXMgbm90IGF2YWlsYWJsZSBpbiB0aGUgYnVpbGQnKVxuICAgICk7XG5cbiAgICBsZXQgcyA9IGxlbmd0aFxuICAgICAgPyByZWFzb25zLmxlbmd0aCA+IDFcbiAgICAgICAgPyAnc2luY2UgOlxcbicgKyByZWFzb25zLm1hcChyZW5kZXJSZWFzb24pLmpvaW4oJ1xcbicpXG4gICAgICAgIDogJyAnICsgcmVuZGVyUmVhc29uKHJlYXNvbnNbMF0pXG4gICAgICA6ICdhcyBubyBhZGFwdGVyIHNwZWNpZmllZCc7XG5cbiAgICB0aHJvdyBuZXcgQXhpb3NFcnJvcihcbiAgICAgIGBUaGVyZSBpcyBubyBzdWl0YWJsZSBhZGFwdGVyIHRvIGRpc3BhdGNoIHRoZSByZXF1ZXN0IGAgKyBzLFxuICAgICAgJ0VSUl9OT1RfU1VQUE9SVCdcbiAgICApO1xuICB9XG5cbiAgcmV0dXJuIGFkYXB0ZXI7XG59XG5cbi8qKlxuICogRXhwb3J0cyBBeGlvcyBhZGFwdGVycyBhbmQgdXRpbGl0eSB0byByZXNvbHZlIGFuIGFkYXB0ZXJcbiAqL1xuZXhwb3J0IGRlZmF1bHQge1xuICAvKipcbiAgICogUmVzb2x2ZSBhbiBhZGFwdGVyIGZyb20gYSBsaXN0IG9mIGFkYXB0ZXIgbmFtZXMgb3IgZnVuY3Rpb25zLlxuICAgKiBAdHlwZSB7RnVuY3Rpb259XG4gICAqL1xuICBnZXRBZGFwdGVyLFxuXG4gIC8qKlxuICAgKiBFeHBvc2VzIGFsbCBrbm93biBhZGFwdGVyc1xuICAgKiBAdHlwZSB7T2JqZWN0PHN0cmluZywgRnVuY3Rpb258T2JqZWN0Pn1cbiAgICovXG4gIGFkYXB0ZXJzOiBrbm93bkFkYXB0ZXJzLFxufTtcbiIsIid1c2Ugc3RyaWN0JztcblxuaW1wb3J0IHRyYW5zZm9ybURhdGEgZnJvbSAnLi90cmFuc2Zvcm1EYXRhLmpzJztcbmltcG9ydCBpc0NhbmNlbCBmcm9tICcuLi9jYW5jZWwvaXNDYW5jZWwuanMnO1xuaW1wb3J0IGRlZmF1bHRzIGZyb20gJy4uL2RlZmF1bHRzL2luZGV4LmpzJztcbmltcG9ydCBDYW5jZWxlZEVycm9yIGZyb20gJy4uL2NhbmNlbC9DYW5jZWxlZEVycm9yLmpzJztcbmltcG9ydCBBeGlvc0hlYWRlcnMgZnJvbSAnLi4vY29yZS9BeGlvc0hlYWRlcnMuanMnO1xuaW1wb3J0IGFkYXB0ZXJzIGZyb20gJy4uL2FkYXB0ZXJzL2FkYXB0ZXJzLmpzJztcblxuLyoqXG4gKiBUaHJvd3MgYSBgQ2FuY2VsZWRFcnJvcmAgaWYgY2FuY2VsbGF0aW9uIGhhcyBiZWVuIHJlcXVlc3RlZC5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gY29uZmlnIFRoZSBjb25maWcgdGhhdCBpcyB0byBiZSB1c2VkIGZvciB0aGUgcmVxdWVzdFxuICpcbiAqIEByZXR1cm5zIHt2b2lkfVxuICovXG5mdW5jdGlvbiB0aHJvd0lmQ2FuY2VsbGF0aW9uUmVxdWVzdGVkKGNvbmZpZykge1xuICBpZiAoY29uZmlnLmNhbmNlbFRva2VuKSB7XG4gICAgY29uZmlnLmNhbmNlbFRva2VuLnRocm93SWZSZXF1ZXN0ZWQoKTtcbiAgfVxuXG4gIGlmIChjb25maWcuc2lnbmFsICYmIGNvbmZpZy5zaWduYWwuYWJvcnRlZCkge1xuICAgIHRocm93IG5ldyBDYW5jZWxlZEVycm9yKG51bGwsIGNvbmZpZyk7XG4gIH1cbn1cblxuLyoqXG4gKiBEaXNwYXRjaCBhIHJlcXVlc3QgdG8gdGhlIHNlcnZlciB1c2luZyB0aGUgY29uZmlndXJlZCBhZGFwdGVyLlxuICpcbiAqIEBwYXJhbSB7b2JqZWN0fSBjb25maWcgVGhlIGNvbmZpZyB0aGF0IGlzIHRvIGJlIHVzZWQgZm9yIHRoZSByZXF1ZXN0XG4gKlxuICogQHJldHVybnMge1Byb21pc2V9IFRoZSBQcm9taXNlIHRvIGJlIGZ1bGZpbGxlZFxuICovXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBkaXNwYXRjaFJlcXVlc3QoY29uZmlnKSB7XG4gIHRocm93SWZDYW5jZWxsYXRpb25SZXF1ZXN0ZWQoY29uZmlnKTtcblxuICBjb25maWcuaGVhZGVycyA9IEF4aW9zSGVhZGVycy5mcm9tKGNvbmZpZy5oZWFkZXJzKTtcblxuICAvLyBUcmFuc2Zvcm0gcmVxdWVzdCBkYXRhXG4gIGNvbmZpZy5kYXRhID0gdHJhbnNmb3JtRGF0YS5jYWxsKGNvbmZpZywgY29uZmlnLnRyYW5zZm9ybVJlcXVlc3QpO1xuXG4gIGlmIChbJ3Bvc3QnLCAncHV0JywgJ3BhdGNoJ10uaW5kZXhPZihjb25maWcubWV0aG9kKSAhPT0gLTEpIHtcbiAgICBjb25maWcuaGVhZGVycy5zZXRDb250ZW50VHlwZSgnYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkJywgZmFsc2UpO1xuICB9XG5cbiAgY29uc3QgYWRhcHRlciA9IGFkYXB0ZXJzLmdldEFkYXB0ZXIoY29uZmlnLmFkYXB0ZXIgfHwgZGVmYXVsdHMuYWRhcHRlciwgY29uZmlnKTtcblxuICByZXR1cm4gYWRhcHRlcihjb25maWcpLnRoZW4oXG4gICAgZnVuY3Rpb24gb25BZGFwdGVyUmVzb2x1dGlvbihyZXNwb25zZSkge1xuICAgICAgdGhyb3dJZkNhbmNlbGxhdGlvblJlcXVlc3RlZChjb25maWcpO1xuXG4gICAgICAvLyBFeHBvc2UgdGhlIGN1cnJlbnQgcmVzcG9uc2Ugb24gY29uZmlnIHNvIHRoYXQgdHJhbnNmb3JtUmVzcG9uc2UgY2FuXG4gICAgICAvLyBhdHRhY2ggaXQgdG8gYW55IEF4aW9zRXJyb3IgaXQgdGhyb3dzIChlLmcuIG9uIEpTT04gcGFyc2UgZmFpbHVyZSkuXG4gICAgICAvLyBXZSBjbGVhbiBpdCB1cCBhZnRlcndhcmRzIHRvIGF2b2lkIHBvbGx1dGluZyB0aGUgY29uZmlnIG9iamVjdC5cbiAgICAgIGNvbmZpZy5yZXNwb25zZSA9IHJlc3BvbnNlO1xuICAgICAgdHJ5IHtcbiAgICAgICAgcmVzcG9uc2UuZGF0YSA9IHRyYW5zZm9ybURhdGEuY2FsbChjb25maWcsIGNvbmZpZy50cmFuc2Zvcm1SZXNwb25zZSwgcmVzcG9uc2UpO1xuICAgICAgfSBmaW5hbGx5IHtcbiAgICAgICAgZGVsZXRlIGNvbmZpZy5yZXNwb25zZTtcbiAgICAgIH1cblxuICAgICAgcmVzcG9uc2UuaGVhZGVycyA9IEF4aW9zSGVhZGVycy5mcm9tKHJlc3BvbnNlLmhlYWRlcnMpO1xuXG4gICAgICByZXR1cm4gcmVzcG9uc2U7XG4gICAgfSxcbiAgICBmdW5jdGlvbiBvbkFkYXB0ZXJSZWplY3Rpb24ocmVhc29uKSB7XG4gICAgICBpZiAoIWlzQ2FuY2VsKHJlYXNvbikpIHtcbiAgICAgICAgdGhyb3dJZkNhbmNlbGxhdGlvblJlcXVlc3RlZChjb25maWcpO1xuXG4gICAgICAgIC8vIFRyYW5zZm9ybSByZXNwb25zZSBkYXRhXG4gICAgICAgIGlmIChyZWFzb24gJiYgcmVhc29uLnJlc3BvbnNlKSB7XG4gICAgICAgICAgY29uZmlnLnJlc3BvbnNlID0gcmVhc29uLnJlc3BvbnNlO1xuICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICByZWFzb24ucmVzcG9uc2UuZGF0YSA9IHRyYW5zZm9ybURhdGEuY2FsbChcbiAgICAgICAgICAgICAgY29uZmlnLFxuICAgICAgICAgICAgICBjb25maWcudHJhbnNmb3JtUmVzcG9uc2UsXG4gICAgICAgICAgICAgIHJlYXNvbi5yZXNwb25zZVxuICAgICAgICAgICAgKTtcbiAgICAgICAgICB9IGZpbmFsbHkge1xuICAgICAgICAgICAgZGVsZXRlIGNvbmZpZy5yZXNwb25zZTtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmVhc29uLnJlc3BvbnNlLmhlYWRlcnMgPSBBeGlvc0hlYWRlcnMuZnJvbShyZWFzb24ucmVzcG9uc2UuaGVhZGVycyk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KHJlYXNvbik7XG4gICAgfVxuICApO1xufVxuIiwiJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQgeyBWRVJTSU9OIH0gZnJvbSAnLi4vZW52L2RhdGEuanMnO1xuaW1wb3J0IEF4aW9zRXJyb3IgZnJvbSAnLi4vY29yZS9BeGlvc0Vycm9yLmpzJztcblxuY29uc3QgdmFsaWRhdG9ycyA9IHt9O1xuXG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgZnVuYy1uYW1lc1xuWydvYmplY3QnLCAnYm9vbGVhbicsICdudW1iZXInLCAnZnVuY3Rpb24nLCAnc3RyaW5nJywgJ3N5bWJvbCddLmZvckVhY2goKHR5cGUsIGkpID0+IHtcbiAgdmFsaWRhdG9yc1t0eXBlXSA9IGZ1bmN0aW9uIHZhbGlkYXRvcih0aGluZykge1xuICAgIHJldHVybiB0eXBlb2YgdGhpbmcgPT09IHR5cGUgfHwgJ2EnICsgKGkgPCAxID8gJ24gJyA6ICcgJykgKyB0eXBlO1xuICB9O1xufSk7XG5cbmNvbnN0IGRlcHJlY2F0ZWRXYXJuaW5ncyA9IHt9O1xuXG4vKipcbiAqIFRyYW5zaXRpb25hbCBvcHRpb24gdmFsaWRhdG9yXG4gKlxuICogQHBhcmFtIHtmdW5jdGlvbnxib29sZWFuP30gdmFsaWRhdG9yIC0gc2V0IHRvIGZhbHNlIGlmIHRoZSB0cmFuc2l0aW9uYWwgb3B0aW9uIGhhcyBiZWVuIHJlbW92ZWRcbiAqIEBwYXJhbSB7c3RyaW5nP30gdmVyc2lvbiAtIGRlcHJlY2F0ZWQgdmVyc2lvbiAvIHJlbW92ZWQgc2luY2UgdmVyc2lvblxuICogQHBhcmFtIHtzdHJpbmc/fSBtZXNzYWdlIC0gc29tZSBtZXNzYWdlIHdpdGggYWRkaXRpb25hbCBpbmZvXG4gKlxuICogQHJldHVybnMge2Z1bmN0aW9ufVxuICovXG52YWxpZGF0b3JzLnRyYW5zaXRpb25hbCA9IGZ1bmN0aW9uIHRyYW5zaXRpb25hbCh2YWxpZGF0b3IsIHZlcnNpb24sIG1lc3NhZ2UpIHtcbiAgZnVuY3Rpb24gZm9ybWF0TWVzc2FnZShvcHQsIGRlc2MpIHtcbiAgICByZXR1cm4gKFxuICAgICAgJ1tBeGlvcyB2JyArXG4gICAgICBWRVJTSU9OICtcbiAgICAgIFwiXSBUcmFuc2l0aW9uYWwgb3B0aW9uICdcIiArXG4gICAgICBvcHQgK1xuICAgICAgXCInXCIgK1xuICAgICAgZGVzYyArXG4gICAgICAobWVzc2FnZSA/ICcuICcgKyBtZXNzYWdlIDogJycpXG4gICAgKTtcbiAgfVxuXG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBmdW5jLW5hbWVzXG4gIHJldHVybiAodmFsdWUsIG9wdCwgb3B0cykgPT4ge1xuICAgIGlmICh2YWxpZGF0b3IgPT09IGZhbHNlKSB7XG4gICAgICB0aHJvdyBuZXcgQXhpb3NFcnJvcihcbiAgICAgICAgZm9ybWF0TWVzc2FnZShvcHQsICcgaGFzIGJlZW4gcmVtb3ZlZCcgKyAodmVyc2lvbiA/ICcgaW4gJyArIHZlcnNpb24gOiAnJykpLFxuICAgICAgICBBeGlvc0Vycm9yLkVSUl9ERVBSRUNBVEVEXG4gICAgICApO1xuICAgIH1cblxuICAgIGlmICh2ZXJzaW9uICYmICFkZXByZWNhdGVkV2FybmluZ3Nbb3B0XSkge1xuICAgICAgZGVwcmVjYXRlZFdhcm5pbmdzW29wdF0gPSB0cnVlO1xuICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLWNvbnNvbGVcbiAgICAgIGNvbnNvbGUud2FybihcbiAgICAgICAgZm9ybWF0TWVzc2FnZShcbiAgICAgICAgICBvcHQsXG4gICAgICAgICAgJyBoYXMgYmVlbiBkZXByZWNhdGVkIHNpbmNlIHYnICsgdmVyc2lvbiArICcgYW5kIHdpbGwgYmUgcmVtb3ZlZCBpbiB0aGUgbmVhciBmdXR1cmUnXG4gICAgICAgIClcbiAgICAgICk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHZhbGlkYXRvciA/IHZhbGlkYXRvcih2YWx1ZSwgb3B0LCBvcHRzKSA6IHRydWU7XG4gIH07XG59O1xuXG52YWxpZGF0b3JzLnNwZWxsaW5nID0gZnVuY3Rpb24gc3BlbGxpbmcoY29ycmVjdFNwZWxsaW5nKSB7XG4gIHJldHVybiAodmFsdWUsIG9wdCkgPT4ge1xuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1jb25zb2xlXG4gICAgY29uc29sZS53YXJuKGAke29wdH0gaXMgbGlrZWx5IGEgbWlzc3BlbGxpbmcgb2YgJHtjb3JyZWN0U3BlbGxpbmd9YCk7XG4gICAgcmV0dXJuIHRydWU7XG4gIH07XG59O1xuXG4vKipcbiAqIEFzc2VydCBvYmplY3QncyBwcm9wZXJ0aWVzIHR5cGVcbiAqXG4gKiBAcGFyYW0ge29iamVjdH0gb3B0aW9uc1xuICogQHBhcmFtIHtvYmplY3R9IHNjaGVtYVxuICogQHBhcmFtIHtib29sZWFuP30gYWxsb3dVbmtub3duXG4gKlxuICogQHJldHVybnMge29iamVjdH1cbiAqL1xuXG5mdW5jdGlvbiBhc3NlcnRPcHRpb25zKG9wdGlvbnMsIHNjaGVtYSwgYWxsb3dVbmtub3duKSB7XG4gIGlmICh0eXBlb2Ygb3B0aW9ucyAhPT0gJ29iamVjdCcpIHtcbiAgICB0aHJvdyBuZXcgQXhpb3NFcnJvcignb3B0aW9ucyBtdXN0IGJlIGFuIG9iamVjdCcsIEF4aW9zRXJyb3IuRVJSX0JBRF9PUFRJT05fVkFMVUUpO1xuICB9XG4gIGNvbnN0IGtleXMgPSBPYmplY3Qua2V5cyhvcHRpb25zKTtcbiAgbGV0IGkgPSBrZXlzLmxlbmd0aDtcbiAgd2hpbGUgKGktLSA+IDApIHtcbiAgICBjb25zdCBvcHQgPSBrZXlzW2ldO1xuICAgIC8vIFVzZSBoYXNPd25Qcm9wZXJ0eSBzbyBhIHBvbGx1dGVkIE9iamVjdC5wcm90b3R5cGUuPG9wdD4gY2Fubm90IHN1cHBseVxuICAgIC8vIGEgbm9uLWZ1bmN0aW9uIHZhbGlkYXRvciBhbmQgY2F1c2UgYSBUeXBlRXJyb3IuXG4gICAgY29uc3QgdmFsaWRhdG9yID0gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHNjaGVtYSwgb3B0KSA/IHNjaGVtYVtvcHRdIDogdW5kZWZpbmVkO1xuICAgIGlmICh2YWxpZGF0b3IpIHtcbiAgICAgIGNvbnN0IHZhbHVlID0gb3B0aW9uc1tvcHRdO1xuICAgICAgY29uc3QgcmVzdWx0ID0gdmFsdWUgPT09IHVuZGVmaW5lZCB8fCB2YWxpZGF0b3IodmFsdWUsIG9wdCwgb3B0aW9ucyk7XG4gICAgICBpZiAocmVzdWx0ICE9PSB0cnVlKSB7XG4gICAgICAgIHRocm93IG5ldyBBeGlvc0Vycm9yKFxuICAgICAgICAgICdvcHRpb24gJyArIG9wdCArICcgbXVzdCBiZSAnICsgcmVzdWx0LFxuICAgICAgICAgIEF4aW9zRXJyb3IuRVJSX0JBRF9PUFRJT05fVkFMVUVcbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICAgIGNvbnRpbnVlO1xuICAgIH1cbiAgICBpZiAoYWxsb3dVbmtub3duICE9PSB0cnVlKSB7XG4gICAgICB0aHJvdyBuZXcgQXhpb3NFcnJvcignVW5rbm93biBvcHRpb24gJyArIG9wdCwgQXhpb3NFcnJvci5FUlJfQkFEX09QVElPTik7XG4gICAgfVxuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgYXNzZXJ0T3B0aW9ucyxcbiAgdmFsaWRhdG9ycyxcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbmltcG9ydCB1dGlscyBmcm9tICcuLi91dGlscy5qcyc7XG5pbXBvcnQgYnVpbGRVUkwgZnJvbSAnLi4vaGVscGVycy9idWlsZFVSTC5qcyc7XG5pbXBvcnQgSW50ZXJjZXB0b3JNYW5hZ2VyIGZyb20gJy4vSW50ZXJjZXB0b3JNYW5hZ2VyLmpzJztcbmltcG9ydCBkaXNwYXRjaFJlcXVlc3QgZnJvbSAnLi9kaXNwYXRjaFJlcXVlc3QuanMnO1xuaW1wb3J0IG1lcmdlQ29uZmlnIGZyb20gJy4vbWVyZ2VDb25maWcuanMnO1xuaW1wb3J0IGJ1aWxkRnVsbFBhdGggZnJvbSAnLi9idWlsZEZ1bGxQYXRoLmpzJztcbmltcG9ydCB2YWxpZGF0b3IgZnJvbSAnLi4vaGVscGVycy92YWxpZGF0b3IuanMnO1xuaW1wb3J0IEF4aW9zSGVhZGVycyBmcm9tICcuL0F4aW9zSGVhZGVycy5qcyc7XG5pbXBvcnQgdHJhbnNpdGlvbmFsRGVmYXVsdHMgZnJvbSAnLi4vZGVmYXVsdHMvdHJhbnNpdGlvbmFsLmpzJztcblxuY29uc3QgdmFsaWRhdG9ycyA9IHZhbGlkYXRvci52YWxpZGF0b3JzO1xuXG4vKipcbiAqIENyZWF0ZSBhIG5ldyBpbnN0YW5jZSBvZiBBeGlvc1xuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBpbnN0YW5jZUNvbmZpZyBUaGUgZGVmYXVsdCBjb25maWcgZm9yIHRoZSBpbnN0YW5jZVxuICpcbiAqIEByZXR1cm4ge0F4aW9zfSBBIG5ldyBpbnN0YW5jZSBvZiBBeGlvc1xuICovXG5jbGFzcyBBeGlvcyB7XG4gIGNvbnN0cnVjdG9yKGluc3RhbmNlQ29uZmlnKSB7XG4gICAgdGhpcy5kZWZhdWx0cyA9IGluc3RhbmNlQ29uZmlnIHx8IHt9O1xuICAgIHRoaXMuaW50ZXJjZXB0b3JzID0ge1xuICAgICAgcmVxdWVzdDogbmV3IEludGVyY2VwdG9yTWFuYWdlcigpLFxuICAgICAgcmVzcG9uc2U6IG5ldyBJbnRlcmNlcHRvck1hbmFnZXIoKSxcbiAgICB9O1xuICB9XG5cbiAgLyoqXG4gICAqIERpc3BhdGNoIGEgcmVxdWVzdFxuICAgKlxuICAgKiBAcGFyYW0ge1N0cmluZ3xPYmplY3R9IGNvbmZpZ09yVXJsIFRoZSBjb25maWcgc3BlY2lmaWMgZm9yIHRoaXMgcmVxdWVzdCAobWVyZ2VkIHdpdGggdGhpcy5kZWZhdWx0cylcbiAgICogQHBhcmFtIHs/T2JqZWN0fSBjb25maWdcbiAgICpcbiAgICogQHJldHVybnMge1Byb21pc2V9IFRoZSBQcm9taXNlIHRvIGJlIGZ1bGZpbGxlZFxuICAgKi9cbiAgYXN5bmMgcmVxdWVzdChjb25maWdPclVybCwgY29uZmlnKSB7XG4gICAgdHJ5IHtcbiAgICAgIHJldHVybiBhd2FpdCB0aGlzLl9yZXF1ZXN0KGNvbmZpZ09yVXJsLCBjb25maWcpO1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgaWYgKGVyciBpbnN0YW5jZW9mIEVycm9yKSB7XG4gICAgICAgIGxldCBkdW1teSA9IHt9O1xuXG4gICAgICAgIEVycm9yLmNhcHR1cmVTdGFja1RyYWNlID8gRXJyb3IuY2FwdHVyZVN0YWNrVHJhY2UoZHVtbXkpIDogKGR1bW15ID0gbmV3IEVycm9yKCkpO1xuXG4gICAgICAgIC8vIHNsaWNlIG9mZiB0aGUgRXJyb3I6IC4uLiBsaW5lXG4gICAgICAgIGNvbnN0IHN0YWNrID0gKCgpID0+IHtcbiAgICAgICAgICBpZiAoIWR1bW15LnN0YWNrKSB7XG4gICAgICAgICAgICByZXR1cm4gJyc7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgY29uc3QgZmlyc3ROZXdsaW5lSW5kZXggPSBkdW1teS5zdGFjay5pbmRleE9mKCdcXG4nKTtcblxuICAgICAgICAgIHJldHVybiBmaXJzdE5ld2xpbmVJbmRleCA9PT0gLTEgPyAnJyA6IGR1bW15LnN0YWNrLnNsaWNlKGZpcnN0TmV3bGluZUluZGV4ICsgMSk7XG4gICAgICAgIH0pKCk7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgaWYgKCFlcnIuc3RhY2spIHtcbiAgICAgICAgICAgIGVyci5zdGFjayA9IHN0YWNrO1xuICAgICAgICAgICAgLy8gbWF0Y2ggd2l0aG91dCB0aGUgMiB0b3Agc3RhY2sgbGluZXNcbiAgICAgICAgICB9IGVsc2UgaWYgKHN0YWNrKSB7XG4gICAgICAgICAgICBjb25zdCBmaXJzdE5ld2xpbmVJbmRleCA9IHN0YWNrLmluZGV4T2YoJ1xcbicpO1xuICAgICAgICAgICAgY29uc3Qgc2Vjb25kTmV3bGluZUluZGV4ID1cbiAgICAgICAgICAgICAgZmlyc3ROZXdsaW5lSW5kZXggPT09IC0xID8gLTEgOiBzdGFjay5pbmRleE9mKCdcXG4nLCBmaXJzdE5ld2xpbmVJbmRleCArIDEpO1xuICAgICAgICAgICAgY29uc3Qgc3RhY2tXaXRob3V0VHdvVG9wTGluZXMgPVxuICAgICAgICAgICAgICBzZWNvbmROZXdsaW5lSW5kZXggPT09IC0xID8gJycgOiBzdGFjay5zbGljZShzZWNvbmROZXdsaW5lSW5kZXggKyAxKTtcblxuICAgICAgICAgICAgaWYgKCFTdHJpbmcoZXJyLnN0YWNrKS5lbmRzV2l0aChzdGFja1dpdGhvdXRUd29Ub3BMaW5lcykpIHtcbiAgICAgICAgICAgICAgZXJyLnN0YWNrICs9ICdcXG4nICsgc3RhY2s7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgLy8gaWdub3JlIHRoZSBjYXNlIHdoZXJlIFwic3RhY2tcIiBpcyBhbiB1bi13cml0YWJsZSBwcm9wZXJ0eVxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHRocm93IGVycjtcbiAgICB9XG4gIH1cblxuICBfcmVxdWVzdChjb25maWdPclVybCwgY29uZmlnKSB7XG4gICAgLyplc2xpbnQgbm8tcGFyYW0tcmVhc3NpZ246MCovXG4gICAgLy8gQWxsb3cgZm9yIGF4aW9zKCdleGFtcGxlL3VybCdbLCBjb25maWddKSBhIGxhIGZldGNoIEFQSVxuICAgIGlmICh0eXBlb2YgY29uZmlnT3JVcmwgPT09ICdzdHJpbmcnKSB7XG4gICAgICBjb25maWcgPSBjb25maWcgfHwge307XG4gICAgICBjb25maWcudXJsID0gY29uZmlnT3JVcmw7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbmZpZyA9IGNvbmZpZ09yVXJsIHx8IHt9O1xuICAgIH1cblxuICAgIGNvbmZpZyA9IG1lcmdlQ29uZmlnKHRoaXMuZGVmYXVsdHMsIGNvbmZpZyk7XG5cbiAgICBjb25zdCB7IHRyYW5zaXRpb25hbCwgcGFyYW1zU2VyaWFsaXplciwgaGVhZGVycyB9ID0gY29uZmlnO1xuXG4gICAgaWYgKHRyYW5zaXRpb25hbCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICB2YWxpZGF0b3IuYXNzZXJ0T3B0aW9ucyhcbiAgICAgICAgdHJhbnNpdGlvbmFsLFxuICAgICAgICB7XG4gICAgICAgICAgc2lsZW50SlNPTlBhcnNpbmc6IHZhbGlkYXRvcnMudHJhbnNpdGlvbmFsKHZhbGlkYXRvcnMuYm9vbGVhbiksXG4gICAgICAgICAgZm9yY2VkSlNPTlBhcnNpbmc6IHZhbGlkYXRvcnMudHJhbnNpdGlvbmFsKHZhbGlkYXRvcnMuYm9vbGVhbiksXG4gICAgICAgICAgY2xhcmlmeVRpbWVvdXRFcnJvcjogdmFsaWRhdG9ycy50cmFuc2l0aW9uYWwodmFsaWRhdG9ycy5ib29sZWFuKSxcbiAgICAgICAgICBsZWdhY3lJbnRlcmNlcHRvclJlcVJlc09yZGVyaW5nOiB2YWxpZGF0b3JzLnRyYW5zaXRpb25hbCh2YWxpZGF0b3JzLmJvb2xlYW4pLFxuICAgICAgICB9LFxuICAgICAgICBmYWxzZVxuICAgICAgKTtcbiAgICB9XG5cbiAgICBpZiAocGFyYW1zU2VyaWFsaXplciAhPSBudWxsKSB7XG4gICAgICBpZiAodXRpbHMuaXNGdW5jdGlvbihwYXJhbXNTZXJpYWxpemVyKSkge1xuICAgICAgICBjb25maWcucGFyYW1zU2VyaWFsaXplciA9IHtcbiAgICAgICAgICBzZXJpYWxpemU6IHBhcmFtc1NlcmlhbGl6ZXIsXG4gICAgICAgIH07XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB2YWxpZGF0b3IuYXNzZXJ0T3B0aW9ucyhcbiAgICAgICAgICBwYXJhbXNTZXJpYWxpemVyLFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIGVuY29kZTogdmFsaWRhdG9ycy5mdW5jdGlvbixcbiAgICAgICAgICAgIHNlcmlhbGl6ZTogdmFsaWRhdG9ycy5mdW5jdGlvbixcbiAgICAgICAgICB9LFxuICAgICAgICAgIHRydWVcbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBTZXQgY29uZmlnLmFsbG93QWJzb2x1dGVVcmxzXG4gICAgaWYgKGNvbmZpZy5hbGxvd0Fic29sdXRlVXJscyAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAvLyBkbyBub3RoaW5nXG4gICAgfSBlbHNlIGlmICh0aGlzLmRlZmF1bHRzLmFsbG93QWJzb2x1dGVVcmxzICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIGNvbmZpZy5hbGxvd0Fic29sdXRlVXJscyA9IHRoaXMuZGVmYXVsdHMuYWxsb3dBYnNvbHV0ZVVybHM7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbmZpZy5hbGxvd0Fic29sdXRlVXJscyA9IHRydWU7XG4gICAgfVxuXG4gICAgdmFsaWRhdG9yLmFzc2VydE9wdGlvbnMoXG4gICAgICBjb25maWcsXG4gICAgICB7XG4gICAgICAgIGJhc2VVcmw6IHZhbGlkYXRvcnMuc3BlbGxpbmcoJ2Jhc2VVUkwnKSxcbiAgICAgICAgd2l0aFhzcmZUb2tlbjogdmFsaWRhdG9ycy5zcGVsbGluZygnd2l0aFhTUkZUb2tlbicpLFxuICAgICAgfSxcbiAgICAgIHRydWVcbiAgICApO1xuXG4gICAgLy8gU2V0IGNvbmZpZy5tZXRob2RcbiAgICBjb25maWcubWV0aG9kID0gKGNvbmZpZy5tZXRob2QgfHwgdGhpcy5kZWZhdWx0cy5tZXRob2QgfHwgJ2dldCcpLnRvTG93ZXJDYXNlKCk7XG5cbiAgICAvLyBGbGF0dGVuIGhlYWRlcnNcbiAgICBsZXQgY29udGV4dEhlYWRlcnMgPSBoZWFkZXJzICYmIHV0aWxzLm1lcmdlKGhlYWRlcnMuY29tbW9uLCBoZWFkZXJzW2NvbmZpZy5tZXRob2RdKTtcblxuICAgIGhlYWRlcnMgJiZcbiAgICAgIHV0aWxzLmZvckVhY2goWydkZWxldGUnLCAnZ2V0JywgJ2hlYWQnLCAncG9zdCcsICdwdXQnLCAncGF0Y2gnLCAncXVlcnknLCAnY29tbW9uJ10sIChtZXRob2QpID0+IHtcbiAgICAgICAgZGVsZXRlIGhlYWRlcnNbbWV0aG9kXTtcbiAgICAgIH0pO1xuXG4gICAgY29uZmlnLmhlYWRlcnMgPSBBeGlvc0hlYWRlcnMuY29uY2F0KGNvbnRleHRIZWFkZXJzLCBoZWFkZXJzKTtcblxuICAgIC8vIGZpbHRlciBvdXQgc2tpcHBlZCBpbnRlcmNlcHRvcnNcbiAgICBjb25zdCByZXF1ZXN0SW50ZXJjZXB0b3JDaGFpbiA9IFtdO1xuICAgIGxldCBzeW5jaHJvbm91c1JlcXVlc3RJbnRlcmNlcHRvcnMgPSB0cnVlO1xuICAgIHRoaXMuaW50ZXJjZXB0b3JzLnJlcXVlc3QuZm9yRWFjaChmdW5jdGlvbiB1bnNoaWZ0UmVxdWVzdEludGVyY2VwdG9ycyhpbnRlcmNlcHRvcikge1xuICAgICAgaWYgKHR5cGVvZiBpbnRlcmNlcHRvci5ydW5XaGVuID09PSAnZnVuY3Rpb24nICYmIGludGVyY2VwdG9yLnJ1bldoZW4oY29uZmlnKSA9PT0gZmFsc2UpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBzeW5jaHJvbm91c1JlcXVlc3RJbnRlcmNlcHRvcnMgPSBzeW5jaHJvbm91c1JlcXVlc3RJbnRlcmNlcHRvcnMgJiYgaW50ZXJjZXB0b3Iuc3luY2hyb25vdXM7XG5cbiAgICAgIGNvbnN0IHRyYW5zaXRpb25hbCA9IGNvbmZpZy50cmFuc2l0aW9uYWwgfHwgdHJhbnNpdGlvbmFsRGVmYXVsdHM7XG4gICAgICBjb25zdCBsZWdhY3lJbnRlcmNlcHRvclJlcVJlc09yZGVyaW5nID1cbiAgICAgICAgdHJhbnNpdGlvbmFsICYmIHRyYW5zaXRpb25hbC5sZWdhY3lJbnRlcmNlcHRvclJlcVJlc09yZGVyaW5nO1xuXG4gICAgICBpZiAobGVnYWN5SW50ZXJjZXB0b3JSZXFSZXNPcmRlcmluZykge1xuICAgICAgICByZXF1ZXN0SW50ZXJjZXB0b3JDaGFpbi51bnNoaWZ0KGludGVyY2VwdG9yLmZ1bGZpbGxlZCwgaW50ZXJjZXB0b3IucmVqZWN0ZWQpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmVxdWVzdEludGVyY2VwdG9yQ2hhaW4ucHVzaChpbnRlcmNlcHRvci5mdWxmaWxsZWQsIGludGVyY2VwdG9yLnJlamVjdGVkKTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIGNvbnN0IHJlc3BvbnNlSW50ZXJjZXB0b3JDaGFpbiA9IFtdO1xuICAgIHRoaXMuaW50ZXJjZXB0b3JzLnJlc3BvbnNlLmZvckVhY2goZnVuY3Rpb24gcHVzaFJlc3BvbnNlSW50ZXJjZXB0b3JzKGludGVyY2VwdG9yKSB7XG4gICAgICByZXNwb25zZUludGVyY2VwdG9yQ2hhaW4ucHVzaChpbnRlcmNlcHRvci5mdWxmaWxsZWQsIGludGVyY2VwdG9yLnJlamVjdGVkKTtcbiAgICB9KTtcblxuICAgIGxldCBwcm9taXNlO1xuICAgIGxldCBpID0gMDtcbiAgICBsZXQgbGVuO1xuXG4gICAgaWYgKCFzeW5jaHJvbm91c1JlcXVlc3RJbnRlcmNlcHRvcnMpIHtcbiAgICAgIGNvbnN0IGNoYWluID0gW2Rpc3BhdGNoUmVxdWVzdC5iaW5kKHRoaXMpLCB1bmRlZmluZWRdO1xuICAgICAgY2hhaW4udW5zaGlmdCguLi5yZXF1ZXN0SW50ZXJjZXB0b3JDaGFpbik7XG4gICAgICBjaGFpbi5wdXNoKC4uLnJlc3BvbnNlSW50ZXJjZXB0b3JDaGFpbik7XG4gICAgICBsZW4gPSBjaGFpbi5sZW5ndGg7XG5cbiAgICAgIHByb21pc2UgPSBQcm9taXNlLnJlc29sdmUoY29uZmlnKTtcblxuICAgICAgd2hpbGUgKGkgPCBsZW4pIHtcbiAgICAgICAgcHJvbWlzZSA9IHByb21pc2UudGhlbihjaGFpbltpKytdLCBjaGFpbltpKytdKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHByb21pc2U7XG4gICAgfVxuXG4gICAgbGVuID0gcmVxdWVzdEludGVyY2VwdG9yQ2hhaW4ubGVuZ3RoO1xuXG4gICAgbGV0IG5ld0NvbmZpZyA9IGNvbmZpZztcblxuICAgIHdoaWxlIChpIDwgbGVuKSB7XG4gICAgICBjb25zdCBvbkZ1bGZpbGxlZCA9IHJlcXVlc3RJbnRlcmNlcHRvckNoYWluW2krK107XG4gICAgICBjb25zdCBvblJlamVjdGVkID0gcmVxdWVzdEludGVyY2VwdG9yQ2hhaW5baSsrXTtcbiAgICAgIHRyeSB7XG4gICAgICAgIG5ld0NvbmZpZyA9IG9uRnVsZmlsbGVkKG5ld0NvbmZpZyk7XG4gICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICBvblJlamVjdGVkLmNhbGwodGhpcywgZXJyb3IpO1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9XG5cbiAgICB0cnkge1xuICAgICAgcHJvbWlzZSA9IGRpc3BhdGNoUmVxdWVzdC5jYWxsKHRoaXMsIG5ld0NvbmZpZyk7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChlcnJvcik7XG4gICAgfVxuXG4gICAgaSA9IDA7XG4gICAgbGVuID0gcmVzcG9uc2VJbnRlcmNlcHRvckNoYWluLmxlbmd0aDtcblxuICAgIHdoaWxlIChpIDwgbGVuKSB7XG4gICAgICBwcm9taXNlID0gcHJvbWlzZS50aGVuKHJlc3BvbnNlSW50ZXJjZXB0b3JDaGFpbltpKytdLCByZXNwb25zZUludGVyY2VwdG9yQ2hhaW5baSsrXSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHByb21pc2U7XG4gIH1cblxuICBnZXRVcmkoY29uZmlnKSB7XG4gICAgY29uZmlnID0gbWVyZ2VDb25maWcodGhpcy5kZWZhdWx0cywgY29uZmlnKTtcbiAgICBjb25zdCBmdWxsUGF0aCA9IGJ1aWxkRnVsbFBhdGgoY29uZmlnLmJhc2VVUkwsIGNvbmZpZy51cmwsIGNvbmZpZy5hbGxvd0Fic29sdXRlVXJscyk7XG4gICAgcmV0dXJuIGJ1aWxkVVJMKGZ1bGxQYXRoLCBjb25maWcucGFyYW1zLCBjb25maWcucGFyYW1zU2VyaWFsaXplcik7XG4gIH1cbn1cblxuLy8gUHJvdmlkZSBhbGlhc2VzIGZvciBzdXBwb3J0ZWQgcmVxdWVzdCBtZXRob2RzXG51dGlscy5mb3JFYWNoKFsnZGVsZXRlJywgJ2dldCcsICdoZWFkJywgJ29wdGlvbnMnXSwgZnVuY3Rpb24gZm9yRWFjaE1ldGhvZE5vRGF0YShtZXRob2QpIHtcbiAgLyplc2xpbnQgZnVuYy1uYW1lczowKi9cbiAgQXhpb3MucHJvdG90eXBlW21ldGhvZF0gPSBmdW5jdGlvbiAodXJsLCBjb25maWcpIHtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0KFxuICAgICAgbWVyZ2VDb25maWcoY29uZmlnIHx8IHt9LCB7XG4gICAgICAgIG1ldGhvZCxcbiAgICAgICAgdXJsLFxuICAgICAgICBkYXRhOiAoY29uZmlnIHx8IHt9KS5kYXRhLFxuICAgICAgfSlcbiAgICApO1xuICB9O1xufSk7XG5cbnV0aWxzLmZvckVhY2goWydwb3N0JywgJ3B1dCcsICdwYXRjaCcsICdxdWVyeSddLCBmdW5jdGlvbiBmb3JFYWNoTWV0aG9kV2l0aERhdGEobWV0aG9kKSB7XG4gIGZ1bmN0aW9uIGdlbmVyYXRlSFRUUE1ldGhvZChpc0Zvcm0pIHtcbiAgICByZXR1cm4gZnVuY3Rpb24gaHR0cE1ldGhvZCh1cmwsIGRhdGEsIGNvbmZpZykge1xuICAgICAgcmV0dXJuIHRoaXMucmVxdWVzdChcbiAgICAgICAgbWVyZ2VDb25maWcoY29uZmlnIHx8IHt9LCB7XG4gICAgICAgICAgbWV0aG9kLFxuICAgICAgICAgIGhlYWRlcnM6IGlzRm9ybVxuICAgICAgICAgICAgPyB7XG4gICAgICAgICAgICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdtdWx0aXBhcnQvZm9ybS1kYXRhJyxcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgOiB7fSxcbiAgICAgICAgICB1cmwsXG4gICAgICAgICAgZGF0YSxcbiAgICAgICAgfSlcbiAgICAgICk7XG4gICAgfTtcbiAgfVxuXG4gIEF4aW9zLnByb3RvdHlwZVttZXRob2RdID0gZ2VuZXJhdGVIVFRQTWV0aG9kKCk7XG5cbiAgLy8gUVVFUlkgaXMgYSBzYWZlL2lkZW1wb3RlbnQgcmVhZCBtZXRob2Q7IG11bHRpcGFydCBmb3JtIGJvZGllcyBkb24ndCBmaXRcbiAgLy8gaXRzIHNlbWFudGljcywgc28gbm8gcXVlcnlGb3JtIHNob3J0aGFuZCBpcyBnZW5lcmF0ZWQuXG4gIGlmIChtZXRob2QgIT09ICdxdWVyeScpIHtcbiAgICBBeGlvcy5wcm90b3R5cGVbbWV0aG9kICsgJ0Zvcm0nXSA9IGdlbmVyYXRlSFRUUE1ldGhvZCh0cnVlKTtcbiAgfVxufSk7XG5cbmV4cG9ydCBkZWZhdWx0IEF4aW9zO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQgQ2FuY2VsZWRFcnJvciBmcm9tICcuL0NhbmNlbGVkRXJyb3IuanMnO1xuXG4vKipcbiAqIEEgYENhbmNlbFRva2VuYCBpcyBhbiBvYmplY3QgdGhhdCBjYW4gYmUgdXNlZCB0byByZXF1ZXN0IGNhbmNlbGxhdGlvbiBvZiBhbiBvcGVyYXRpb24uXG4gKlxuICogQHBhcmFtIHtGdW5jdGlvbn0gZXhlY3V0b3IgVGhlIGV4ZWN1dG9yIGZ1bmN0aW9uLlxuICpcbiAqIEByZXR1cm5zIHtDYW5jZWxUb2tlbn1cbiAqL1xuY2xhc3MgQ2FuY2VsVG9rZW4ge1xuICBjb25zdHJ1Y3RvcihleGVjdXRvcikge1xuICAgIGlmICh0eXBlb2YgZXhlY3V0b3IgIT09ICdmdW5jdGlvbicpIHtcbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ2V4ZWN1dG9yIG11c3QgYmUgYSBmdW5jdGlvbi4nKTtcbiAgICB9XG5cbiAgICBsZXQgcmVzb2x2ZVByb21pc2U7XG5cbiAgICB0aGlzLnByb21pc2UgPSBuZXcgUHJvbWlzZShmdW5jdGlvbiBwcm9taXNlRXhlY3V0b3IocmVzb2x2ZSkge1xuICAgICAgcmVzb2x2ZVByb21pc2UgPSByZXNvbHZlO1xuICAgIH0pO1xuXG4gICAgY29uc3QgdG9rZW4gPSB0aGlzO1xuXG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGZ1bmMtbmFtZXNcbiAgICB0aGlzLnByb21pc2UudGhlbigoY2FuY2VsKSA9PiB7XG4gICAgICBpZiAoIXRva2VuLl9saXN0ZW5lcnMpIHJldHVybjtcblxuICAgICAgbGV0IGkgPSB0b2tlbi5fbGlzdGVuZXJzLmxlbmd0aDtcblxuICAgICAgd2hpbGUgKGktLSA+IDApIHtcbiAgICAgICAgdG9rZW4uX2xpc3RlbmVyc1tpXShjYW5jZWwpO1xuICAgICAgfVxuICAgICAgdG9rZW4uX2xpc3RlbmVycyA9IG51bGw7XG4gICAgfSk7XG5cbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgZnVuYy1uYW1lc1xuICAgIHRoaXMucHJvbWlzZS50aGVuID0gKG9uZnVsZmlsbGVkKSA9PiB7XG4gICAgICBsZXQgX3Jlc29sdmU7XG4gICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgZnVuYy1uYW1lc1xuICAgICAgY29uc3QgcHJvbWlzZSA9IG5ldyBQcm9taXNlKChyZXNvbHZlKSA9PiB7XG4gICAgICAgIHRva2VuLnN1YnNjcmliZShyZXNvbHZlKTtcbiAgICAgICAgX3Jlc29sdmUgPSByZXNvbHZlO1xuICAgICAgfSkudGhlbihvbmZ1bGZpbGxlZCk7XG5cbiAgICAgIHByb21pc2UuY2FuY2VsID0gZnVuY3Rpb24gcmVqZWN0KCkge1xuICAgICAgICB0b2tlbi51bnN1YnNjcmliZShfcmVzb2x2ZSk7XG4gICAgICB9O1xuXG4gICAgICByZXR1cm4gcHJvbWlzZTtcbiAgICB9O1xuXG4gICAgZXhlY3V0b3IoZnVuY3Rpb24gY2FuY2VsKG1lc3NhZ2UsIGNvbmZpZywgcmVxdWVzdCkge1xuICAgICAgaWYgKHRva2VuLnJlYXNvbikge1xuICAgICAgICAvLyBDYW5jZWxsYXRpb24gaGFzIGFscmVhZHkgYmVlbiByZXF1ZXN0ZWRcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICB0b2tlbi5yZWFzb24gPSBuZXcgQ2FuY2VsZWRFcnJvcihtZXNzYWdlLCBjb25maWcsIHJlcXVlc3QpO1xuICAgICAgcmVzb2x2ZVByb21pc2UodG9rZW4ucmVhc29uKTtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBUaHJvd3MgYSBgQ2FuY2VsZWRFcnJvcmAgaWYgY2FuY2VsbGF0aW9uIGhhcyBiZWVuIHJlcXVlc3RlZC5cbiAgICovXG4gIHRocm93SWZSZXF1ZXN0ZWQoKSB7XG4gICAgaWYgKHRoaXMucmVhc29uKSB7XG4gICAgICB0aHJvdyB0aGlzLnJlYXNvbjtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogU3Vic2NyaWJlIHRvIHRoZSBjYW5jZWwgc2lnbmFsXG4gICAqL1xuXG4gIHN1YnNjcmliZShsaXN0ZW5lcikge1xuICAgIGlmICh0aGlzLnJlYXNvbikge1xuICAgICAgbGlzdGVuZXIodGhpcy5yZWFzb24pO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGlmICh0aGlzLl9saXN0ZW5lcnMpIHtcbiAgICAgIHRoaXMuX2xpc3RlbmVycy5wdXNoKGxpc3RlbmVyKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5fbGlzdGVuZXJzID0gW2xpc3RlbmVyXTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogVW5zdWJzY3JpYmUgZnJvbSB0aGUgY2FuY2VsIHNpZ25hbFxuICAgKi9cblxuICB1bnN1YnNjcmliZShsaXN0ZW5lcikge1xuICAgIGlmICghdGhpcy5fbGlzdGVuZXJzKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGNvbnN0IGluZGV4ID0gdGhpcy5fbGlzdGVuZXJzLmluZGV4T2YobGlzdGVuZXIpO1xuICAgIGlmIChpbmRleCAhPT0gLTEpIHtcbiAgICAgIHRoaXMuX2xpc3RlbmVycy5zcGxpY2UoaW5kZXgsIDEpO1xuICAgIH1cbiAgfVxuXG4gIHRvQWJvcnRTaWduYWwoKSB7XG4gICAgY29uc3QgY29udHJvbGxlciA9IG5ldyBBYm9ydENvbnRyb2xsZXIoKTtcblxuICAgIGNvbnN0IGFib3J0ID0gKGVycikgPT4ge1xuICAgICAgY29udHJvbGxlci5hYm9ydChlcnIpO1xuICAgIH07XG5cbiAgICB0aGlzLnN1YnNjcmliZShhYm9ydCk7XG5cbiAgICBjb250cm9sbGVyLnNpZ25hbC51bnN1YnNjcmliZSA9ICgpID0+IHRoaXMudW5zdWJzY3JpYmUoYWJvcnQpO1xuXG4gICAgcmV0dXJuIGNvbnRyb2xsZXIuc2lnbmFsO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgYW4gb2JqZWN0IHRoYXQgY29udGFpbnMgYSBuZXcgYENhbmNlbFRva2VuYCBhbmQgYSBmdW5jdGlvbiB0aGF0LCB3aGVuIGNhbGxlZCxcbiAgICogY2FuY2VscyB0aGUgYENhbmNlbFRva2VuYC5cbiAgICovXG4gIHN0YXRpYyBzb3VyY2UoKSB7XG4gICAgbGV0IGNhbmNlbDtcbiAgICBjb25zdCB0b2tlbiA9IG5ldyBDYW5jZWxUb2tlbihmdW5jdGlvbiBleGVjdXRvcihjKSB7XG4gICAgICBjYW5jZWwgPSBjO1xuICAgIH0pO1xuICAgIHJldHVybiB7XG4gICAgICB0b2tlbixcbiAgICAgIGNhbmNlbCxcbiAgICB9O1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IENhbmNlbFRva2VuO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG4vKipcbiAqIFN5bnRhY3RpYyBzdWdhciBmb3IgaW52b2tpbmcgYSBmdW5jdGlvbiBhbmQgZXhwYW5kaW5nIGFuIGFycmF5IGZvciBhcmd1bWVudHMuXG4gKlxuICogQ29tbW9uIHVzZSBjYXNlIHdvdWxkIGJlIHRvIHVzZSBgRnVuY3Rpb24ucHJvdG90eXBlLmFwcGx5YC5cbiAqXG4gKiAgYGBganNcbiAqICBmdW5jdGlvbiBmKHgsIHksIHopIHt9XG4gKiAgY29uc3QgYXJncyA9IFsxLCAyLCAzXTtcbiAqICBmLmFwcGx5KG51bGwsIGFyZ3MpO1xuICogIGBgYFxuICpcbiAqIFdpdGggYHNwcmVhZGAgdGhpcyBleGFtcGxlIGNhbiBiZSByZS13cml0dGVuLlxuICpcbiAqICBgYGBqc1xuICogIHNwcmVhZChmdW5jdGlvbih4LCB5LCB6KSB7fSkoWzEsIDIsIDNdKTtcbiAqICBgYGBcbiAqXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYWxsYmFja1xuICpcbiAqIEByZXR1cm5zIHtGdW5jdGlvbn1cbiAqL1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gc3ByZWFkKGNhbGxiYWNrKSB7XG4gIHJldHVybiBmdW5jdGlvbiB3cmFwKGFycikge1xuICAgIHJldHVybiBjYWxsYmFjay5hcHBseShudWxsLCBhcnIpO1xuICB9O1xufVxuIiwiJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQgdXRpbHMgZnJvbSAnLi4vdXRpbHMuanMnO1xuXG4vKipcbiAqIERldGVybWluZXMgd2hldGhlciB0aGUgcGF5bG9hZCBpcyBhbiBlcnJvciB0aHJvd24gYnkgQXhpb3NcbiAqXG4gKiBAcGFyYW0geyp9IHBheWxvYWQgVGhlIHZhbHVlIHRvIHRlc3RcbiAqXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB0aGUgcGF5bG9hZCBpcyBhbiBlcnJvciB0aHJvd24gYnkgQXhpb3MsIG90aGVyd2lzZSBmYWxzZVxuICovXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBpc0F4aW9zRXJyb3IocGF5bG9hZCkge1xuICByZXR1cm4gdXRpbHMuaXNPYmplY3QocGF5bG9hZCkgJiYgcGF5bG9hZC5pc0F4aW9zRXJyb3IgPT09IHRydWU7XG59XG4iLCJjb25zdCBIdHRwU3RhdHVzQ29kZSA9IHtcbiAgQ29udGludWU6IDEwMCxcbiAgU3dpdGNoaW5nUHJvdG9jb2xzOiAxMDEsXG4gIFByb2Nlc3Npbmc6IDEwMixcbiAgRWFybHlIaW50czogMTAzLFxuICBPazogMjAwLFxuICBDcmVhdGVkOiAyMDEsXG4gIEFjY2VwdGVkOiAyMDIsXG4gIE5vbkF1dGhvcml0YXRpdmVJbmZvcm1hdGlvbjogMjAzLFxuICBOb0NvbnRlbnQ6IDIwNCxcbiAgUmVzZXRDb250ZW50OiAyMDUsXG4gIFBhcnRpYWxDb250ZW50OiAyMDYsXG4gIE11bHRpU3RhdHVzOiAyMDcsXG4gIEFscmVhZHlSZXBvcnRlZDogMjA4LFxuICBJbVVzZWQ6IDIyNixcbiAgTXVsdGlwbGVDaG9pY2VzOiAzMDAsXG4gIE1vdmVkUGVybWFuZW50bHk6IDMwMSxcbiAgRm91bmQ6IDMwMixcbiAgU2VlT3RoZXI6IDMwMyxcbiAgTm90TW9kaWZpZWQ6IDMwNCxcbiAgVXNlUHJveHk6IDMwNSxcbiAgVW51c2VkOiAzMDYsXG4gIFRlbXBvcmFyeVJlZGlyZWN0OiAzMDcsXG4gIFBlcm1hbmVudFJlZGlyZWN0OiAzMDgsXG4gIEJhZFJlcXVlc3Q6IDQwMCxcbiAgVW5hdXRob3JpemVkOiA0MDEsXG4gIFBheW1lbnRSZXF1aXJlZDogNDAyLFxuICBGb3JiaWRkZW46IDQwMyxcbiAgTm90Rm91bmQ6IDQwNCxcbiAgTWV0aG9kTm90QWxsb3dlZDogNDA1LFxuICBOb3RBY2NlcHRhYmxlOiA0MDYsXG4gIFByb3h5QXV0aGVudGljYXRpb25SZXF1aXJlZDogNDA3LFxuICBSZXF1ZXN0VGltZW91dDogNDA4LFxuICBDb25mbGljdDogNDA5LFxuICBHb25lOiA0MTAsXG4gIExlbmd0aFJlcXVpcmVkOiA0MTEsXG4gIFByZWNvbmRpdGlvbkZhaWxlZDogNDEyLFxuICBQYXlsb2FkVG9vTGFyZ2U6IDQxMyxcbiAgVXJpVG9vTG9uZzogNDE0LFxuICBVbnN1cHBvcnRlZE1lZGlhVHlwZTogNDE1LFxuICBSYW5nZU5vdFNhdGlzZmlhYmxlOiA0MTYsXG4gIEV4cGVjdGF0aW9uRmFpbGVkOiA0MTcsXG4gIEltQVRlYXBvdDogNDE4LFxuICBNaXNkaXJlY3RlZFJlcXVlc3Q6IDQyMSxcbiAgVW5wcm9jZXNzYWJsZUVudGl0eTogNDIyLFxuICBMb2NrZWQ6IDQyMyxcbiAgRmFpbGVkRGVwZW5kZW5jeTogNDI0LFxuICBUb29FYXJseTogNDI1LFxuICBVcGdyYWRlUmVxdWlyZWQ6IDQyNixcbiAgUHJlY29uZGl0aW9uUmVxdWlyZWQ6IDQyOCxcbiAgVG9vTWFueVJlcXVlc3RzOiA0MjksXG4gIFJlcXVlc3RIZWFkZXJGaWVsZHNUb29MYXJnZTogNDMxLFxuICBVbmF2YWlsYWJsZUZvckxlZ2FsUmVhc29uczogNDUxLFxuICBJbnRlcm5hbFNlcnZlckVycm9yOiA1MDAsXG4gIE5vdEltcGxlbWVudGVkOiA1MDEsXG4gIEJhZEdhdGV3YXk6IDUwMixcbiAgU2VydmljZVVuYXZhaWxhYmxlOiA1MDMsXG4gIEdhdGV3YXlUaW1lb3V0OiA1MDQsXG4gIEh0dHBWZXJzaW9uTm90U3VwcG9ydGVkOiA1MDUsXG4gIFZhcmlhbnRBbHNvTmVnb3RpYXRlczogNTA2LFxuICBJbnN1ZmZpY2llbnRTdG9yYWdlOiA1MDcsXG4gIExvb3BEZXRlY3RlZDogNTA4LFxuICBOb3RFeHRlbmRlZDogNTEwLFxuICBOZXR3b3JrQXV0aGVudGljYXRpb25SZXF1aXJlZDogNTExLFxuICBXZWJTZXJ2ZXJJc0Rvd246IDUyMSxcbiAgQ29ubmVjdGlvblRpbWVkT3V0OiA1MjIsXG4gIE9yaWdpbklzVW5yZWFjaGFibGU6IDUyMyxcbiAgVGltZW91dE9jY3VycmVkOiA1MjQsXG4gIFNzbEhhbmRzaGFrZUZhaWxlZDogNTI1LFxuICBJbnZhbGlkU3NsQ2VydGlmaWNhdGU6IDUyNixcbn07XG5cbk9iamVjdC5lbnRyaWVzKEh0dHBTdGF0dXNDb2RlKS5mb3JFYWNoKChba2V5LCB2YWx1ZV0pID0+IHtcbiAgSHR0cFN0YXR1c0NvZGVbdmFsdWVdID0ga2V5O1xufSk7XG5cbmV4cG9ydCBkZWZhdWx0IEh0dHBTdGF0dXNDb2RlO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQgdXRpbHMgZnJvbSAnLi91dGlscy5qcyc7XG5pbXBvcnQgYmluZCBmcm9tICcuL2hlbHBlcnMvYmluZC5qcyc7XG5pbXBvcnQgQXhpb3MgZnJvbSAnLi9jb3JlL0F4aW9zLmpzJztcbmltcG9ydCBtZXJnZUNvbmZpZyBmcm9tICcuL2NvcmUvbWVyZ2VDb25maWcuanMnO1xuaW1wb3J0IGRlZmF1bHRzIGZyb20gJy4vZGVmYXVsdHMvaW5kZXguanMnO1xuaW1wb3J0IGZvcm1EYXRhVG9KU09OIGZyb20gJy4vaGVscGVycy9mb3JtRGF0YVRvSlNPTi5qcyc7XG5pbXBvcnQgQ2FuY2VsZWRFcnJvciBmcm9tICcuL2NhbmNlbC9DYW5jZWxlZEVycm9yLmpzJztcbmltcG9ydCBDYW5jZWxUb2tlbiBmcm9tICcuL2NhbmNlbC9DYW5jZWxUb2tlbi5qcyc7XG5pbXBvcnQgaXNDYW5jZWwgZnJvbSAnLi9jYW5jZWwvaXNDYW5jZWwuanMnO1xuaW1wb3J0IHsgVkVSU0lPTiB9IGZyb20gJy4vZW52L2RhdGEuanMnO1xuaW1wb3J0IHRvRm9ybURhdGEgZnJvbSAnLi9oZWxwZXJzL3RvRm9ybURhdGEuanMnO1xuaW1wb3J0IEF4aW9zRXJyb3IgZnJvbSAnLi9jb3JlL0F4aW9zRXJyb3IuanMnO1xuaW1wb3J0IHNwcmVhZCBmcm9tICcuL2hlbHBlcnMvc3ByZWFkLmpzJztcbmltcG9ydCBpc0F4aW9zRXJyb3IgZnJvbSAnLi9oZWxwZXJzL2lzQXhpb3NFcnJvci5qcyc7XG5pbXBvcnQgQXhpb3NIZWFkZXJzIGZyb20gJy4vY29yZS9BeGlvc0hlYWRlcnMuanMnO1xuaW1wb3J0IGFkYXB0ZXJzIGZyb20gJy4vYWRhcHRlcnMvYWRhcHRlcnMuanMnO1xuaW1wb3J0IEh0dHBTdGF0dXNDb2RlIGZyb20gJy4vaGVscGVycy9IdHRwU3RhdHVzQ29kZS5qcyc7XG5cbi8qKlxuICogQ3JlYXRlIGFuIGluc3RhbmNlIG9mIEF4aW9zXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IGRlZmF1bHRDb25maWcgVGhlIGRlZmF1bHQgY29uZmlnIGZvciB0aGUgaW5zdGFuY2VcbiAqXG4gKiBAcmV0dXJucyB7QXhpb3N9IEEgbmV3IGluc3RhbmNlIG9mIEF4aW9zXG4gKi9cbmZ1bmN0aW9uIGNyZWF0ZUluc3RhbmNlKGRlZmF1bHRDb25maWcpIHtcbiAgY29uc3QgY29udGV4dCA9IG5ldyBBeGlvcyhkZWZhdWx0Q29uZmlnKTtcbiAgY29uc3QgaW5zdGFuY2UgPSBiaW5kKEF4aW9zLnByb3RvdHlwZS5yZXF1ZXN0LCBjb250ZXh0KTtcblxuICAvLyBDb3B5IGF4aW9zLnByb3RvdHlwZSB0byBpbnN0YW5jZVxuICB1dGlscy5leHRlbmQoaW5zdGFuY2UsIEF4aW9zLnByb3RvdHlwZSwgY29udGV4dCwgeyBhbGxPd25LZXlzOiB0cnVlIH0pO1xuXG4gIC8vIENvcHkgY29udGV4dCB0byBpbnN0YW5jZVxuICB1dGlscy5leHRlbmQoaW5zdGFuY2UsIGNvbnRleHQsIG51bGwsIHsgYWxsT3duS2V5czogdHJ1ZSB9KTtcblxuICAvLyBGYWN0b3J5IGZvciBjcmVhdGluZyBuZXcgaW5zdGFuY2VzXG4gIGluc3RhbmNlLmNyZWF0ZSA9IGZ1bmN0aW9uIGNyZWF0ZShpbnN0YW5jZUNvbmZpZykge1xuICAgIHJldHVybiBjcmVhdGVJbnN0YW5jZShtZXJnZUNvbmZpZyhkZWZhdWx0Q29uZmlnLCBpbnN0YW5jZUNvbmZpZykpO1xuICB9O1xuXG4gIHJldHVybiBpbnN0YW5jZTtcbn1cblxuLy8gQ3JlYXRlIHRoZSBkZWZhdWx0IGluc3RhbmNlIHRvIGJlIGV4cG9ydGVkXG5jb25zdCBheGlvcyA9IGNyZWF0ZUluc3RhbmNlKGRlZmF1bHRzKTtcblxuLy8gRXhwb3NlIEF4aW9zIGNsYXNzIHRvIGFsbG93IGNsYXNzIGluaGVyaXRhbmNlXG5heGlvcy5BeGlvcyA9IEF4aW9zO1xuXG4vLyBFeHBvc2UgQ2FuY2VsICYgQ2FuY2VsVG9rZW5cbmF4aW9zLkNhbmNlbGVkRXJyb3IgPSBDYW5jZWxlZEVycm9yO1xuYXhpb3MuQ2FuY2VsVG9rZW4gPSBDYW5jZWxUb2tlbjtcbmF4aW9zLmlzQ2FuY2VsID0gaXNDYW5jZWw7XG5heGlvcy5WRVJTSU9OID0gVkVSU0lPTjtcbmF4aW9zLnRvRm9ybURhdGEgPSB0b0Zvcm1EYXRhO1xuXG4vLyBFeHBvc2UgQXhpb3NFcnJvciBjbGFzc1xuYXhpb3MuQXhpb3NFcnJvciA9IEF4aW9zRXJyb3I7XG5cbi8vIGFsaWFzIGZvciBDYW5jZWxlZEVycm9yIGZvciBiYWNrd2FyZCBjb21wYXRpYmlsaXR5XG5heGlvcy5DYW5jZWwgPSBheGlvcy5DYW5jZWxlZEVycm9yO1xuXG4vLyBFeHBvc2UgYWxsL3NwcmVhZFxuYXhpb3MuYWxsID0gZnVuY3Rpb24gYWxsKHByb21pc2VzKSB7XG4gIHJldHVybiBQcm9taXNlLmFsbChwcm9taXNlcyk7XG59O1xuXG5heGlvcy5zcHJlYWQgPSBzcHJlYWQ7XG5cbi8vIEV4cG9zZSBpc0F4aW9zRXJyb3JcbmF4aW9zLmlzQXhpb3NFcnJvciA9IGlzQXhpb3NFcnJvcjtcblxuLy8gRXhwb3NlIG1lcmdlQ29uZmlnXG5heGlvcy5tZXJnZUNvbmZpZyA9IG1lcmdlQ29uZmlnO1xuXG5heGlvcy5BeGlvc0hlYWRlcnMgPSBBeGlvc0hlYWRlcnM7XG5cbmF4aW9zLmZvcm1Ub0pTT04gPSAodGhpbmcpID0+IGZvcm1EYXRhVG9KU09OKHV0aWxzLmlzSFRNTEZvcm0odGhpbmcpID8gbmV3IEZvcm1EYXRhKHRoaW5nKSA6IHRoaW5nKTtcblxuYXhpb3MuZ2V0QWRhcHRlciA9IGFkYXB0ZXJzLmdldEFkYXB0ZXI7XG5cbmF4aW9zLkh0dHBTdGF0dXNDb2RlID0gSHR0cFN0YXR1c0NvZGU7XG5cbmF4aW9zLmRlZmF1bHQgPSBheGlvcztcblxuLy8gdGhpcyBtb2R1bGUgc2hvdWxkIG9ubHkgaGF2ZSBhIGRlZmF1bHQgZXhwb3J0XG5leHBvcnQgZGVmYXVsdCBheGlvcztcbiIsImltcG9ydCBheGlvcyBmcm9tICcuL2xpYi9heGlvcy5qcyc7XG5cbi8vIFRoaXMgbW9kdWxlIGlzIGludGVuZGVkIHRvIHVud3JhcCBBeGlvcyBkZWZhdWx0IGV4cG9ydCBhcyBuYW1lZC5cbi8vIEtlZXAgdG9wLWxldmVsIGV4cG9ydCBzYW1lIHdpdGggc3RhdGljIHByb3BlcnRpZXNcbi8vIHNvIHRoYXQgaXQgY2FuIGtlZXAgc2FtZSB3aXRoIGVzIG1vZHVsZSBvciBjanNcbmNvbnN0IHtcbiAgQXhpb3MsXG4gIEF4aW9zRXJyb3IsXG4gIENhbmNlbGVkRXJyb3IsXG4gIGlzQ2FuY2VsLFxuICBDYW5jZWxUb2tlbixcbiAgVkVSU0lPTixcbiAgYWxsLFxuICBDYW5jZWwsXG4gIGlzQXhpb3NFcnJvcixcbiAgc3ByZWFkLFxuICB0b0Zvcm1EYXRhLFxuICBBeGlvc0hlYWRlcnMsXG4gIEh0dHBTdGF0dXNDb2RlLFxuICBmb3JtVG9KU09OLFxuICBnZXRBZGFwdGVyLFxuICBtZXJnZUNvbmZpZyxcbiAgY3JlYXRlLFxufSA9IGF4aW9zO1xuXG5leHBvcnQge1xuICBheGlvcyBhcyBkZWZhdWx0LFxuICBjcmVhdGUsXG4gIEF4aW9zLFxuICBBeGlvc0Vycm9yLFxuICBDYW5jZWxlZEVycm9yLFxuICBpc0NhbmNlbCxcbiAgQ2FuY2VsVG9rZW4sXG4gIFZFUlNJT04sXG4gIGFsbCxcbiAgQ2FuY2VsLFxuICBpc0F4aW9zRXJyb3IsXG4gIHNwcmVhZCxcbiAgdG9Gb3JtRGF0YSxcbiAgQXhpb3NIZWFkZXJzLFxuICBIdHRwU3RhdHVzQ29kZSxcbiAgZm9ybVRvSlNPTixcbiAgZ2V0QWRhcHRlcixcbiAgbWVyZ2VDb25maWcsXG59O1xuIiwiaW1wb3J0IFJlYWN0LCB7IENoYW5nZUV2ZW50LCBGb3JtRXZlbnQsIFN5bnRoZXRpY0V2ZW50IH0gZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgeyBBcGlDbGllbnQsIHVzZU5vdGljZSB9IGZyb20gJ2FkbWluanMnO1xyXG5pbXBvcnQgeyB1c2VOYXZpZ2F0ZSB9IGZyb20gJ3JlYWN0LXJvdXRlci1kb20nO1xyXG5pbXBvcnQgYXhpb3MgZnJvbSAnYXhpb3MnO1xyXG5pbXBvcnQgeyBCb3gsIEJ1dHRvbiwgSW5wdXQsIExhYmVsLCBUZXh0LCBUZXh0QXJlYSB9IGZyb20gJ0BhZG1pbmpzL2Rlc2lnbi1zeXN0ZW0nO1xyXG5pbXBvcnQgeyBCYXNlUHJvcGVydHlQcm9wcywgQWN0aW9uUHJvcHMgfSBmcm9tICdhZG1pbmpzJztcclxuXHJcbmNvbnN0IEltYWdlVXBsb2FkID0gKHByb3BzOiBBY3Rpb25Qcm9wcykgPT4ge1xyXG4gIGNvbnN0IHsgcmVjb3JkIH0gPSBwcm9wcztcclxuICBjb25zdCBbc2VsZWN0ZWRGaWxlLCBzZXRTZWxlY3RlZEZpbGVdID0gUmVhY3QudXNlU3RhdGU8RmlsZSB8IG51bGw+KG51bGwpO1xyXG4gIGNvbnN0IFt0aXRsZSwgc2V0VGl0bGVdID0gUmVhY3QudXNlU3RhdGUoJycpO1xyXG4gIGNvbnN0IFtkZXNjcmlwdGlvbiwgc2V0RGVzY3JpcHRpb25dID0gUmVhY3QudXNlU3RhdGUoJycpO1xyXG4gIGNvbnN0IFtsb2FkaW5nLCBzZXRMb2FkaW5nXSA9IFJlYWN0LnVzZVN0YXRlKGZhbHNlKTtcclxuICBjb25zdCBbZXJyb3IsIHNldEVycm9yXSA9IFJlYWN0LnVzZVN0YXRlPHN0cmluZyB8IG51bGw+KCcnKTtcclxuICBjb25zdCBbc3VjY2Vzcywgc2V0U3VjY2Vzc10gPSBSZWFjdC51c2VTdGF0ZTxzdHJpbmcgfCBudWxsPignJyk7XHJcbiAgY29uc3Qgc2VuZE5vdGljZSA9IHVzZU5vdGljZSgpO1xyXG4gIGNvbnN0IG5hdmlnYXRlID0gdXNlTmF2aWdhdGUoKTtcclxuICBjb25zdCBhcGkgPSBuZXcgQXBpQ2xpZW50KCk7XHJcblxyXG4gIGNvbnN0IGhhbmRsZUZpbGVDaGFuZ2UgPSAoZXZlbnQ6IENoYW5nZUV2ZW50PEhUTUxJbnB1dEVsZW1lbnQ+KSA9PiB7XHJcbiAgICBjb25zdCBmaWxlID0gZXZlbnQudGFyZ2V0LmZpbGVzPy5bMF07XHJcblxyXG4gICAgaWYgKGZpbGUpIHtcclxuICAgICAgc2V0U2VsZWN0ZWRGaWxlKGZpbGUpO1xyXG5cclxuICAgICAgLy8gLy8gU2F2ZSBmaWxlIGludG8gQWRtaW5KUyBmb3JtIHN0YXRlXHJcbiAgICB9XHJcbiAgfTtcclxuICBjb25zdCBoYW5kbGVUaXRsZUNoYW5nZSA9IChldmVudDogQ2hhbmdlRXZlbnQ8SFRNTElucHV0RWxlbWVudD4pID0+IHtcclxuICAgIHNldFRpdGxlKGV2ZW50LnRhcmdldC52YWx1ZSk7XHJcbiAgfTtcclxuXHJcbiAgY29uc3QgaGFuZGxlRGVzY3JpcHRpb25DaGFuZ2UgPSAoZXZlbnQ6IENoYW5nZUV2ZW50PEhUTUxUZXh0QXJlYUVsZW1lbnQ+KSA9PiB7XHJcbiAgICBzZXREZXNjcmlwdGlvbihldmVudC50YXJnZXQudmFsdWUpO1xyXG4gIH07XHJcblxyXG4gIGNvbnN0IGhhbmRsZVVwbG9hZCA9IGFzeW5jIChldmVudDogU3ludGhldGljRXZlbnQpID0+IHtcclxuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcblxyXG4gICAgc2V0RXJyb3IoJycpO1xyXG4gICAgc2V0U3VjY2VzcygnJyk7XHJcblxyXG4gICAgaWYgKCFzZWxlY3RlZEZpbGUpIHJldHVybjtcclxuXHJcbiAgICB0cnkge1xyXG4gICAgICBzZXRMb2FkaW5nKHRydWUpO1xyXG5cclxuICAgICAgY29uc3QgZm9ybURhdGEgPSBuZXcgRm9ybURhdGEoKTtcclxuXHJcbiAgICAgIGZvcm1EYXRhLmFwcGVuZCgnaW1hZ2UnLCBzZWxlY3RlZEZpbGUpO1xyXG5cclxuICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBheGlvcy5wb3N0KCcvZ2FsbGVyeScsIGZvcm1EYXRhLCB7XHJcbiAgICAgICAgaGVhZGVyczoge1xyXG4gICAgICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdtdWx0aXBhcnQvZm9ybS1kYXRhJyxcclxuICAgICAgICB9LFxyXG4gICAgICB9KTtcclxuICAgICAgY29uc29sZS5sb2coJ1VwbG9hZCBzdWNjZXNzZnVsOicsIHJlc3BvbnNlLmRhdGEpO1xyXG4gICAgICBhd2FpdCBhcGkucmVzb3VyY2VBY3Rpb24oe1xyXG4gICAgICAgIHJlc291cmNlSWQ6ICdHYWxsZXJ5JyxcclxuICAgICAgICBhY3Rpb25OYW1lOiAnbmV3JyxcclxuICAgICAgICBkYXRhOiB7XHJcbiAgICAgICAgICB0aXRsZSxcclxuICAgICAgICAgIGRlc2NyaXB0aW9uLFxyXG4gICAgICAgICAgaW1hZ2VVcmw6IHJlc3BvbnNlLmRhdGEudXJsLFxyXG4gICAgICAgICAgY2xvdWRpbmFyeVB1YmxpY0lkOiByZXNwb25zZS5kYXRhLnB1YmxpY19pZCxcclxuICAgICAgICB9LFxyXG4gICAgICB9KTtcclxuICAgICAgc2VuZE5vdGljZSh7XHJcbiAgICAgICAgbWVzc2FnZTogJ0ltYWdlIHVwbG9hZGVkIHN1Y2Nlc3NmdWxseScsXHJcbiAgICAgICAgdHlwZTogJ3N1Y2Nlc3MnLFxyXG4gICAgICB9KTtcclxuXHJcbiAgICAgIG5hdmlnYXRlKCcvYWRtaW4vcmVzb3VyY2VzL0dhbGxlcnknKTtcclxuICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgIGNvbnNvbGUuZXJyb3IoJ1VwbG9hZCBmYWlsZWQ6JywgZXJyb3IpO1xyXG4gICAgICBzZXRFcnJvcignRmFpbGVkIHRvIHVwbG9hZCBpbWFnZS4gUGxlYXNlIHRyeSBhZ2Fpbi4nKTtcclxuICAgIH0gZmluYWxseSB7XHJcbiAgICAgIHNldExvYWRpbmcoZmFsc2UpO1xyXG4gICAgfVxyXG4gIH07XHJcblxyXG4gIHJldHVybiAoXHJcbiAgICA8Qm94IGJhY2tncm91bmRDb2xvcj1cIndoaXRlXCIgcD17MzJ9IGJvcmRlclJhZGl1cz17NH0gYm94U2hhZG93PVwiY2FyZFwiPlxyXG4gICAgICA8Zm9ybSBzdHlsZT17eyBkaXNwbGF5OiAnZmxleCcsIGZsZXhEaXJlY3Rpb246ICdjb2x1bW4nLCBhbGlnbkl0ZW1zOiAnY2VudGVyJywgZ2FwOiAxNiB9fSBvblN1Ym1pdD17aGFuZGxlVXBsb2FkfT5cclxuICAgICAgICA8Qm94XHJcbiAgICAgICAgICB3aWR0aD17MX1cclxuICAgICAgICAgIGJvcmRlcj1cIjFweCBkYXNoZWQgI2JiYlwiXHJcbiAgICAgICAgICBib3JkZXJSYWRpdXM9XCIxMnB4XCJcclxuICAgICAgICAgIGhlaWdodD1cIjM1MHB4XCJcclxuICAgICAgICAgIGRpc3BsYXk9XCJmbGV4XCJcclxuICAgICAgICAgIGFsaWduSXRlbXM9XCJjZW50ZXJcIlxyXG4gICAgICAgICAganVzdGlmeUNvbnRlbnQ9XCJjZW50ZXJcIlxyXG4gICAgICAgICAgYmFja2dyb3VuZENvbG9yPVwiI2ZhZmFmYVwiXHJcbiAgICAgICAgICBwPXs4fVxyXG4gICAgICAgID5cclxuICAgICAgICAgIDxMYWJlbFxyXG4gICAgICAgICAgICBodG1sRm9yPVwiaW1hZ2UtdXBsb2FkXCJcclxuICAgICAgICAgICAgc3R5bGU9e3tcclxuICAgICAgICAgICAgICB3aWR0aDogJzEwMCUnLFxyXG4gICAgICAgICAgICAgIGhlaWdodDogJzEwMCUnLFxyXG4gICAgICAgICAgICAgIGN1cnNvcjogJ3BvaW50ZXInLFxyXG4gICAgICAgICAgICAgIGRpc3BsYXk6ICdmbGV4JyxcclxuICAgICAgICAgICAgICBhbGlnbkl0ZW1zOiAnY2VudGVyJyxcclxuICAgICAgICAgICAgICBqdXN0aWZ5Q29udGVudDogJ2NlbnRlcicsXHJcbiAgICAgICAgICAgIH19XHJcbiAgICAgICAgICA+XHJcbiAgICAgICAgICAgIHtzZWxlY3RlZEZpbGUgPyAoXHJcbiAgICAgICAgICAgICAgPD5cclxuICAgICAgICAgICAgICAgIDxpbWdcclxuICAgICAgICAgICAgICAgICAgc3JjPXtVUkwuY3JlYXRlT2JqZWN0VVJMKHNlbGVjdGVkRmlsZSl9XHJcbiAgICAgICAgICAgICAgICAgIGFsdD1cIlByZXZpZXdcIlxyXG4gICAgICAgICAgICAgICAgICBzdHlsZT17eyB3aWR0aDogJzEwMCUnLCBoZWlnaHQ6ICcxMDAlJywgb2JqZWN0Rml0OiAnY29udGFpbicgfX1cclxuICAgICAgICAgICAgICAgIC8+XHJcbiAgICAgICAgICAgICAgPC8+XHJcbiAgICAgICAgICAgICkgOiAoXHJcbiAgICAgICAgICAgICAgPFRleHQ+VXBsb2FkIEltYWdlPC9UZXh0PlxyXG4gICAgICAgICAgICApfVxyXG4gICAgICAgICAgPC9MYWJlbD5cclxuXHJcbiAgICAgICAgICA8SW5wdXRcclxuICAgICAgICAgICAgaWQ9XCJpbWFnZS11cGxvYWRcIlxyXG4gICAgICAgICAgICB0eXBlPVwiZmlsZVwiXHJcbiAgICAgICAgICAgIGFjY2VwdD1cImltYWdlLypcIlxyXG4gICAgICAgICAgICBvbkNoYW5nZT17aGFuZGxlRmlsZUNoYW5nZX1cclxuICAgICAgICAgICAgc3R5bGU9e3sgZGlzcGxheTogJ25vbmUnIH19XHJcbiAgICAgICAgICAgIHJlcXVpcmVkXHJcbiAgICAgICAgICAvPlxyXG4gICAgICAgIDwvQm94PlxyXG5cclxuICAgICAgICA8Qm94IHdpZHRoPXsxfT5cclxuICAgICAgICAgIDxMYWJlbCBodG1sRm9yPVwidGl0bGVcIiBzdHlsZT17eyBkaXNwbGF5OiAnZmxleCcsIGFsaWduSXRlbXM6ICdjZW50ZXInLCBnYXA6IDIgfX0+XHJcbiAgICAgICAgICAgIDxUZXh0IHZhcmlhbnQ9XCJwcmltYXJ5XCIgY29sb3I9XCJwcmltYXJ5MTAwXCI+XHJcbiAgICAgICAgICAgICAgKlxyXG4gICAgICAgICAgICA8L1RleHQ+XHJcbiAgICAgICAgICAgIFRpdGxlXHJcbiAgICAgICAgICA8L0xhYmVsPlxyXG4gICAgICAgICAgPElucHV0XHJcbiAgICAgICAgICAgIHdpZHRoPXsxfVxyXG4gICAgICAgICAgICB2YXJpYW50PVwiZGVmYXVsdFwiXHJcbiAgICAgICAgICAgIHR5cGU9XCJ0ZXh0XCJcclxuICAgICAgICAgICAgaWQ9XCJ0aXRsZVwiXHJcbiAgICAgICAgICAgIHZhbHVlPXt0aXRsZX1cclxuICAgICAgICAgICAgb25DaGFuZ2U9e2hhbmRsZVRpdGxlQ2hhbmdlfVxyXG4gICAgICAgICAgICByZXF1aXJlZFxyXG4gICAgICAgICAgLz5cclxuICAgICAgICA8L0JveD5cclxuICAgICAgICA8Qm94IHdpZHRoPXsxfT5cclxuICAgICAgICAgIDxMYWJlbCBodG1sRm9yPVwiZGVzY3JpcHRpb25cIj5EZXNjcmlwdGlvbjwvTGFiZWw+XHJcbiAgICAgICAgICA8VGV4dEFyZWFcclxuICAgICAgICAgICAgd2lkdGg9ezF9XHJcbiAgICAgICAgICAgIHZhcmlhbnQ9XCJkZWZhdWx0XCJcclxuICAgICAgICAgICAgdHlwZT1cInRleHRcIlxyXG4gICAgICAgICAgICBpZD1cImRlc2NyaXB0aW9uXCJcclxuICAgICAgICAgICAgdmFsdWU9e2Rlc2NyaXB0aW9ufVxyXG4gICAgICAgICAgICBvbkNoYW5nZT17aGFuZGxlRGVzY3JpcHRpb25DaGFuZ2V9XHJcbiAgICAgICAgICAvPlxyXG4gICAgICAgIDwvQm94PlxyXG4gICAgICAgIDxCdXR0b24gdHlwZT1cInN1Ym1pdFwiIHZhcmlhbnQ9XCJjb250YWluZWRcIiBsYWJlbD17bG9hZGluZyA/ICdVcGxvYWRpbmcuLi4nIDogJ1VwbG9hZCd9IGRpc2FibGVkPXtsb2FkaW5nfSAvPlxyXG4gICAgICA8L2Zvcm0+XHJcbiAgICA8L0JveD5cclxuICApO1xyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgSW1hZ2VVcGxvYWQ7XHJcbiIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCB7IEJveCwgQnV0dG9uLCBIMyB9IGZyb20gJ0BhZG1pbmpzL2Rlc2lnbi1zeXN0ZW0nO1xyXG5pbXBvcnQgeyBTaG93UHJvcGVydHlQcm9wcyB9IGZyb20gJ2FkbWluanMnO1xyXG5cclxuY29uc3QgQ3VzdG9tU2hvdyA9IChwcm9wczogU2hvd1Byb3BlcnR5UHJvcHMpID0+IHtcclxuICBjb25zdCB7IHJlY29yZCB9ID0gcHJvcHM7XHJcbiAgcmV0dXJuIChcclxuICAgIDxpbWdcclxuICAgICAgc3JjPXtyZWNvcmQucGFyYW1zLmltYWdlVXJsfVxyXG4gICAgICBhbHQ9e3JlY29yZC5wYXJhbXMudGl0bGV9XHJcbiAgICAgIHN0eWxlPXt7IHdpZHRoOiAnNTAwcHgnLCBoZWlnaHQ6ICc1MDBweCcsIG9iamVjdEZpdDogJ2NvbnRhaW4nIH19XHJcbiAgICAvPlxyXG4gICk7XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBDdXN0b21TaG93O1xyXG4iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgeyBTaG93UHJvcGVydHlQcm9wcyB9IGZyb20gJ2FkbWluanMnO1xyXG5pbXBvcnQgeyBCb3ggfSBmcm9tICdAYWRtaW5qcy9kZXNpZ24tc3lzdGVtJztcclxuXHJcbmNvbnN0IFJhbmRvbVBpY3R1cmU6IFJlYWN0LkZDPFNob3dQcm9wZXJ0eVByb3BzPiA9IChwcm9wcykgPT4ge1xyXG4gIGNvbnN0IHsgcmVjb3JkIH0gPSBwcm9wcztcclxuXHJcbiAgcmV0dXJuIChcclxuICAgIDxpbWdcclxuICAgICAgc3JjPXtyZWNvcmQucGFyYW1zLmltYWdlVXJsfVxyXG4gICAgICBhbHQ9e3JlY29yZC5wYXJhbXMudGl0bGV9XHJcbiAgICAgIHN0eWxlPXt7IHdpZHRoOiAyMDAsIGhlaWdodDogMjAwLCBvYmplY3RGaXQ6ICdjb3ZlcicgfX1cclxuICAgIC8+XHJcbiAgKTtcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IFJhbmRvbVBpY3R1cmU7XHJcbiIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCB7IEJveCwgTGFiZWwsIFRleHQsIElucHV0IH0gZnJvbSAnQGFkbWluanMvZGVzaWduLXN5c3RlbSc7XHJcbmltcG9ydCB7IEFjdGlvblByb3BzIH0gZnJvbSAnYWRtaW5qcyc7XHJcblxyXG5jb25zdCBDdXN0b21JbWFnZVVwbG9hZENvbXBvbmVudCA9IChwcm9wczogQWN0aW9uUHJvcHMpID0+IHtcclxuICBjb25zdCB7IHJlY29yZCB9ID0gcHJvcHM7XHJcbiAgY29uc3QgW3NlbGVjdGVkRmlsZSwgc2V0U2VsZWN0ZWRGaWxlXSA9IFJlYWN0LnVzZVN0YXRlPEZpbGUgfCBudWxsPihudWxsKTtcclxuICBjb25zdCBoYW5kbGVGaWxlQ2hhbmdlID0gKGV2ZW50OiBSZWFjdC5DaGFuZ2VFdmVudDxIVE1MSW5wdXRFbGVtZW50PikgPT4ge1xyXG4gICAgY29uc3QgZmlsZSA9IGV2ZW50LnRhcmdldC5maWxlcz8uWzBdO1xyXG4gICAgaWYgKGZpbGUpIHtcclxuICAgICAgc2V0U2VsZWN0ZWRGaWxlKGZpbGUpO1xyXG4gICAgfVxyXG4gIH07XHJcbiAgcmV0dXJuIChcclxuICAgIDxCb3hcclxuICAgICAgd2lkdGg9ezF9XHJcbiAgICAgIGJvcmRlcj1cIjFweCBkYXNoZWQgI2JiYlwiXHJcbiAgICAgIGJvcmRlclJhZGl1cz1cIjEycHhcIlxyXG4gICAgICBoZWlnaHQ9XCIzNTBweFwiXHJcbiAgICAgIGRpc3BsYXk9XCJmbGV4XCJcclxuICAgICAgYWxpZ25JdGVtcz1cImNlbnRlclwiXHJcbiAgICAgIGp1c3RpZnlDb250ZW50PVwiY2VudGVyXCJcclxuICAgICAgYmFja2dyb3VuZENvbG9yPVwiI2ZhZmFmYVwiXHJcbiAgICAgIHA9ezh9XHJcbiAgICAgIG1hcmdpbkJvdHRvbT17MzJ9XHJcbiAgICA+XHJcbiAgICAgIDxMYWJlbFxyXG4gICAgICAgIGh0bWxGb3I9XCJpbWFnZS11cGxvYWRcIlxyXG4gICAgICAgIHN0eWxlPXt7XHJcbiAgICAgICAgICB3aWR0aDogJzEwMCUnLFxyXG4gICAgICAgICAgaGVpZ2h0OiAnMTAwJScsXHJcbiAgICAgICAgICBjdXJzb3I6ICdwb2ludGVyJyxcclxuICAgICAgICAgIGRpc3BsYXk6ICdmbGV4JyxcclxuICAgICAgICAgIGFsaWduSXRlbXM6ICdjZW50ZXInLFxyXG4gICAgICAgICAganVzdGlmeUNvbnRlbnQ6ICdjZW50ZXInLFxyXG4gICAgICAgIH19XHJcbiAgICAgID5cclxuICAgICAgICB7cmVjb3JkPy5wYXJhbXMuaW1hZ2VVcmwgPyAoXHJcbiAgICAgICAgICA8PlxyXG4gICAgICAgICAgICA8aW1nXHJcbiAgICAgICAgICAgICAgc3JjPXtyZWNvcmQ/LnBhcmFtcy5pbWFnZVVybH1cclxuICAgICAgICAgICAgICBhbHQ9XCJQcmV2aWV3XCJcclxuICAgICAgICAgICAgICBzdHlsZT17eyB3aWR0aDogJzEwMCUnLCBoZWlnaHQ6ICcxMDAlJywgb2JqZWN0Rml0OiAnY29udGFpbicgfX1cclxuICAgICAgICAgICAgLz5cclxuICAgICAgICAgIDwvPlxyXG4gICAgICAgICkgOiAoXHJcbiAgICAgICAgICA8VGV4dD5VcGxvYWQgSW1hZ2U8L1RleHQ+XHJcbiAgICAgICAgKX1cclxuICAgICAgPC9MYWJlbD5cclxuICAgIDwvQm94PlxyXG4gICk7XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBDdXN0b21JbWFnZVVwbG9hZENvbXBvbmVudDtcclxuIiwiaW1wb3J0IFJlYWN0LCB7IENoYW5nZUV2ZW50LCBGb3JtRXZlbnQsIFN5bnRoZXRpY0V2ZW50IH0gZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgeyBBcGlDbGllbnQsIHVzZU5vdGljZSB9IGZyb20gJ2FkbWluanMnO1xyXG5pbXBvcnQgeyB1c2VOYXZpZ2F0ZSB9IGZyb20gJ3JlYWN0LXJvdXRlci1kb20nO1xyXG5pbXBvcnQgYXhpb3MgZnJvbSAnYXhpb3MnO1xyXG5pbXBvcnQgeyBCb3gsIEJ1dHRvbiwgSW5wdXQsIExhYmVsLCBUZXh0LCBDaGVja0JveCB9IGZyb20gJ0BhZG1pbmpzL2Rlc2lnbi1zeXN0ZW0nO1xyXG5pbXBvcnQgeyBCYXNlUHJvcGVydHlQcm9wcywgQWN0aW9uUHJvcHMgfSBmcm9tICdhZG1pbmpzJztcclxuXHJcbmNvbnN0IEltYWdlVXBsb2FkID0gKHByb3BzOiBBY3Rpb25Qcm9wcykgPT4ge1xyXG4gIGNvbnN0IHsgcmVjb3JkIH0gPSBwcm9wcztcclxuICBjb25zdCBbc2VsZWN0ZWRGaWxlLCBzZXRTZWxlY3RlZEZpbGVdID0gUmVhY3QudXNlU3RhdGU8RmlsZSB8IG51bGw+KG51bGwpO1xyXG4gIGNvbnN0IFt0aXRsZSwgc2V0VGl0bGVdID0gUmVhY3QudXNlU3RhdGUoJycpO1xyXG4gIGNvbnN0IFtsaW5rVXJsLCBzZXRMaW5rVXJsXSA9IFJlYWN0LnVzZVN0YXRlKCcnKTtcclxuICBjb25zdCBbaXNBY3RpdmUsIHNldElzQWN0aXZlXSA9IFJlYWN0LnVzZVN0YXRlKHRydWUpO1xyXG4gIGNvbnN0IFtsb2FkaW5nLCBzZXRMb2FkaW5nXSA9IFJlYWN0LnVzZVN0YXRlKGZhbHNlKTtcclxuICBjb25zdCBbZXJyb3IsIHNldEVycm9yXSA9IFJlYWN0LnVzZVN0YXRlPHN0cmluZyB8IG51bGw+KCcnKTtcclxuICBjb25zdCBbc3VjY2Vzcywgc2V0U3VjY2Vzc10gPSBSZWFjdC51c2VTdGF0ZTxzdHJpbmcgfCBudWxsPignJyk7XHJcbiAgY29uc3Qgc2VuZE5vdGljZSA9IHVzZU5vdGljZSgpO1xyXG4gIGNvbnN0IG5hdmlnYXRlID0gdXNlTmF2aWdhdGUoKTtcclxuICBjb25zdCBhcGkgPSBuZXcgQXBpQ2xpZW50KCk7XHJcblxyXG4gIGNvbnN0IGhhbmRsZUZpbGVDaGFuZ2UgPSAoZXZlbnQ6IENoYW5nZUV2ZW50PEhUTUxJbnB1dEVsZW1lbnQ+KSA9PiB7XHJcbiAgICBjb25zdCBmaWxlID0gZXZlbnQudGFyZ2V0LmZpbGVzPy5bMF07XHJcblxyXG4gICAgaWYgKGZpbGUpIHtcclxuICAgICAgc2V0U2VsZWN0ZWRGaWxlKGZpbGUpO1xyXG5cclxuICAgICAgLy8gLy8gU2F2ZSBmaWxlIGludG8gQWRtaW5KUyBmb3JtIHN0YXRlXHJcbiAgICB9XHJcbiAgfTtcclxuICBjb25zdCBoYW5kbGVMaW5rVXJsQ2hhbmdlID0gKGV2ZW50OiBDaGFuZ2VFdmVudDxIVE1MSW5wdXRFbGVtZW50PikgPT4ge1xyXG4gICAgc2V0TGlua1VybChldmVudC50YXJnZXQudmFsdWUpO1xyXG4gIH07XHJcblxyXG4gIGNvbnN0IGhhbmRsZVRpdGxlQ2hhbmdlID0gKGV2ZW50OiBDaGFuZ2VFdmVudDxIVE1MSW5wdXRFbGVtZW50PikgPT4ge1xyXG4gICAgc2V0VGl0bGUoZXZlbnQudGFyZ2V0LnZhbHVlKTtcclxuICB9O1xyXG5cclxuICBjb25zdCBoYW5kbGVVcGxvYWQgPSBhc3luYyAoZXZlbnQ6IFN5bnRoZXRpY0V2ZW50KSA9PiB7XHJcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cclxuICAgIHNldEVycm9yKCcnKTtcclxuICAgIHNldFN1Y2Nlc3MoJycpO1xyXG5cclxuICAgIGlmICghc2VsZWN0ZWRGaWxlKSByZXR1cm47XHJcblxyXG4gICAgdHJ5IHtcclxuICAgICAgc2V0TG9hZGluZyh0cnVlKTtcclxuXHJcbiAgICAgIGNvbnN0IGZvcm1EYXRhID0gbmV3IEZvcm1EYXRhKCk7XHJcblxyXG4gICAgICBmb3JtRGF0YS5hcHBlbmQoJ2ltYWdlJywgc2VsZWN0ZWRGaWxlKTtcclxuXHJcbiAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgYXhpb3MucG9zdCgnL3BvcHVwJywgZm9ybURhdGEsIHtcclxuICAgICAgICBoZWFkZXJzOiB7XHJcbiAgICAgICAgICAnQ29udGVudC1UeXBlJzogJ211bHRpcGFydC9mb3JtLWRhdGEnLFxyXG4gICAgICAgIH0sXHJcbiAgICAgIH0pO1xyXG4gICAgICBjb25zb2xlLmxvZygnVXBsb2FkIHN1Y2Nlc3NmdWw6JywgcmVzcG9uc2UuZGF0YSk7XHJcbiAgICAgIGF3YWl0IGFwaS5yZXNvdXJjZUFjdGlvbih7XHJcbiAgICAgICAgcmVzb3VyY2VJZDogJ1BvcHVwJyxcclxuICAgICAgICBhY3Rpb25OYW1lOiAnbmV3JyxcclxuICAgICAgICBkYXRhOiB7XHJcbiAgICAgICAgICB0aXRsZSxcclxuICAgICAgICAgIGxpbmtVcmw6IGxpbmtVcmwsXHJcbiAgICAgICAgICBpbWFnZVVybDogcmVzcG9uc2UuZGF0YS51cmwsXHJcbiAgICAgICAgICBjbG91ZGluYXJ5UHVibGljSWQ6IHJlc3BvbnNlLmRhdGEucHVibGljX2lkLFxyXG4gICAgICAgICAgaXNBY3RpdmUsXHJcbiAgICAgICAgfSxcclxuICAgICAgfSk7XHJcbiAgICAgIHNlbmROb3RpY2Uoe1xyXG4gICAgICAgIG1lc3NhZ2U6ICdJbWFnZSB1cGxvYWRlZCBzdWNjZXNzZnVsbHknLFxyXG4gICAgICAgIHR5cGU6ICdzdWNjZXNzJyxcclxuICAgICAgfSk7XHJcblxyXG4gICAgICBuYXZpZ2F0ZSgnL2FkbWluL3Jlc291cmNlcy9Qb3B1cCcpO1xyXG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgY29uc29sZS5lcnJvcignVXBsb2FkIGZhaWxlZDonLCBlcnJvcik7XHJcbiAgICAgIHNldEVycm9yKCdGYWlsZWQgdG8gdXBsb2FkIGltYWdlLiBQbGVhc2UgdHJ5IGFnYWluLicpO1xyXG4gICAgfSBmaW5hbGx5IHtcclxuICAgICAgc2V0TG9hZGluZyhmYWxzZSk7XHJcbiAgICB9XHJcbiAgfTtcclxuXHJcbiAgcmV0dXJuIChcclxuICAgIDxCb3ggYmFja2dyb3VuZENvbG9yPVwid2hpdGVcIiBwPXszMn0gYm9yZGVyUmFkaXVzPXs0fSBib3hTaGFkb3c9XCJjYXJkXCI+XHJcbiAgICAgIDxmb3JtIHN0eWxlPXt7IGRpc3BsYXk6ICdmbGV4JywgZmxleERpcmVjdGlvbjogJ2NvbHVtbicsIGFsaWduSXRlbXM6ICdjZW50ZXInLCBnYXA6IDE2IH19IG9uU3VibWl0PXtoYW5kbGVVcGxvYWR9PlxyXG4gICAgICAgIDxCb3hcclxuICAgICAgICAgIHdpZHRoPXsxfVxyXG4gICAgICAgICAgYm9yZGVyPVwiMXB4IGRhc2hlZCAjYmJiXCJcclxuICAgICAgICAgIGJvcmRlclJhZGl1cz1cIjEycHhcIlxyXG4gICAgICAgICAgaGVpZ2h0PVwiMzUwcHhcIlxyXG4gICAgICAgICAgZGlzcGxheT1cImZsZXhcIlxyXG4gICAgICAgICAgYWxpZ25JdGVtcz1cImNlbnRlclwiXHJcbiAgICAgICAgICBqdXN0aWZ5Q29udGVudD1cImNlbnRlclwiXHJcbiAgICAgICAgICBiYWNrZ3JvdW5kQ29sb3I9XCIjZmFmYWZhXCJcclxuICAgICAgICAgIHA9ezh9XHJcbiAgICAgICAgPlxyXG4gICAgICAgICAgPExhYmVsXHJcbiAgICAgICAgICAgIGh0bWxGb3I9XCJpbWFnZS11cGxvYWRcIlxyXG4gICAgICAgICAgICBzdHlsZT17e1xyXG4gICAgICAgICAgICAgIHdpZHRoOiAnMTAwJScsXHJcbiAgICAgICAgICAgICAgaGVpZ2h0OiAnMTAwJScsXHJcbiAgICAgICAgICAgICAgY3Vyc29yOiAncG9pbnRlcicsXHJcbiAgICAgICAgICAgICAgZGlzcGxheTogJ2ZsZXgnLFxyXG4gICAgICAgICAgICAgIGFsaWduSXRlbXM6ICdjZW50ZXInLFxyXG4gICAgICAgICAgICAgIGp1c3RpZnlDb250ZW50OiAnY2VudGVyJyxcclxuICAgICAgICAgICAgfX1cclxuICAgICAgICAgID5cclxuICAgICAgICAgICAge3NlbGVjdGVkRmlsZSA/IChcclxuICAgICAgICAgICAgICA8PlxyXG4gICAgICAgICAgICAgICAgPGltZ1xyXG4gICAgICAgICAgICAgICAgICBzcmM9e1VSTC5jcmVhdGVPYmplY3RVUkwoc2VsZWN0ZWRGaWxlKX1cclxuICAgICAgICAgICAgICAgICAgYWx0PVwiUHJldmlld1wiXHJcbiAgICAgICAgICAgICAgICAgIHN0eWxlPXt7IHdpZHRoOiAnMTAwJScsIGhlaWdodDogJzEwMCUnLCBvYmplY3RGaXQ6ICdjb250YWluJyB9fVxyXG4gICAgICAgICAgICAgICAgLz5cclxuICAgICAgICAgICAgICA8Lz5cclxuICAgICAgICAgICAgKSA6IChcclxuICAgICAgICAgICAgICA8VGV4dD5VcGxvYWQgSW1hZ2U8L1RleHQ+XHJcbiAgICAgICAgICAgICl9XHJcbiAgICAgICAgICA8L0xhYmVsPlxyXG5cclxuICAgICAgICAgIDxJbnB1dFxyXG4gICAgICAgICAgICBpZD1cImltYWdlLXVwbG9hZFwiXHJcbiAgICAgICAgICAgIHR5cGU9XCJmaWxlXCJcclxuICAgICAgICAgICAgYWNjZXB0PVwiaW1hZ2UvKlwiXHJcbiAgICAgICAgICAgIG9uQ2hhbmdlPXtoYW5kbGVGaWxlQ2hhbmdlfVxyXG4gICAgICAgICAgICBzdHlsZT17eyBkaXNwbGF5OiAnbm9uZScgfX1cclxuICAgICAgICAgICAgcmVxdWlyZWRcclxuICAgICAgICAgIC8+XHJcbiAgICAgICAgPC9Cb3g+XHJcblxyXG4gICAgICAgIDxCb3ggd2lkdGg9ezF9PlxyXG4gICAgICAgICAgPExhYmVsIGh0bWxGb3I9XCJ0aXRsZVwiIHN0eWxlPXt7IGRpc3BsYXk6ICdmbGV4JywgYWxpZ25JdGVtczogJ2NlbnRlcicsIGdhcDogMiB9fT5cclxuICAgICAgICAgICAgPFRleHQgdmFyaWFudD1cInByaW1hcnlcIiBjb2xvcj1cInByaW1hcnkxMDBcIj5cclxuICAgICAgICAgICAgICAqXHJcbiAgICAgICAgICAgIDwvVGV4dD5cclxuICAgICAgICAgICAgVGl0bGVcclxuICAgICAgICAgIDwvTGFiZWw+XHJcbiAgICAgICAgICA8SW5wdXRcclxuICAgICAgICAgICAgd2lkdGg9ezF9XHJcbiAgICAgICAgICAgIHZhcmlhbnQ9XCJkZWZhdWx0XCJcclxuICAgICAgICAgICAgdHlwZT1cInRleHRcIlxyXG4gICAgICAgICAgICBpZD1cInRpdGxlXCJcclxuICAgICAgICAgICAgdmFsdWU9e3RpdGxlfVxyXG4gICAgICAgICAgICBvbkNoYW5nZT17aGFuZGxlVGl0bGVDaGFuZ2V9XHJcbiAgICAgICAgICAgIHJlcXVpcmVkXHJcbiAgICAgICAgICAvPlxyXG4gICAgICAgIDwvQm94PlxyXG5cclxuICAgICAgICA8Qm94IHdpZHRoPXsxfT5cclxuICAgICAgICAgIDxMYWJlbCBodG1sRm9yPVwibGlua1VybFwiIHN0eWxlPXt7IGRpc3BsYXk6ICdmbGV4JywgYWxpZ25JdGVtczogJ2NlbnRlcicsIGdhcDogMiB9fT5cclxuICAgICAgICAgICAgTGluayBVcmxcclxuICAgICAgICAgIDwvTGFiZWw+XHJcbiAgICAgICAgICA8SW5wdXQgd2lkdGg9ezF9IHZhcmlhbnQ9XCJkZWZhdWx0XCIgdHlwZT1cInRleHRcIiBpZD1cImxpbmtVcmxcIiB2YWx1ZT17bGlua1VybH0gb25DaGFuZ2U9e2hhbmRsZUxpbmtVcmxDaGFuZ2V9IC8+XHJcbiAgICAgICAgPC9Cb3g+XHJcbiAgICAgICAgPEJveCB3aWR0aD17MX0gZGlzcGxheT1cImZsZXhcIiBhbGlnbkl0ZW1zPVwiY2VudGVyXCIgZ2FwPXsyfT5cclxuICAgICAgICAgIDxDaGVja0JveCBpZD1cImlzQWN0aXZlXCIgY2hlY2tlZD17aXNBY3RpdmV9IG9uQ2xpY2s9eygpID0+IHNldElzQWN0aXZlKCFpc0FjdGl2ZSl9IC8+XHJcbiAgICAgICAgICA8TGFiZWwgaHRtbEZvcj1cImlzQWN0aXZlXCI+SXMgQWN0aXZlPC9MYWJlbD5cclxuICAgICAgICA8L0JveD5cclxuICAgICAgICA8QnV0dG9uIHR5cGU9XCJzdWJtaXRcIiB2YXJpYW50PVwiY29udGFpbmVkXCIgbGFiZWw9e2xvYWRpbmcgPyAnVXBsb2FkaW5nLi4uJyA6ICdVcGxvYWQnfSBkaXNhYmxlZD17bG9hZGluZ30gLz5cclxuICAgICAgPC9mb3JtPlxyXG4gICAgPC9Cb3g+XHJcbiAgKTtcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IEltYWdlVXBsb2FkO1xyXG4iLCJpbXBvcnQgUmVhY3QsIHsgdXNlU3RhdGUsIHVzZUVmZmVjdCB9IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0IHsgQm94LCBCdXR0b24sIExhYmVsLCBJbnB1dCB9IGZyb20gJ0BhZG1pbmpzL2Rlc2lnbi1zeXN0ZW0nO1xyXG5pbXBvcnQgeyBCYXNlUHJvcGVydHlQcm9wcyB9IGZyb20gJ2FkbWluanMnO1xyXG5cclxuY29uc3QgQ2hhbmdlQWRtaW5QYXNzd29yZCA9IChwcm9wczogQmFzZVByb3BlcnR5UHJvcHMpID0+IHtcclxuICBjb25zdCB7IG9uQ2hhbmdlLCB3aGVyZSwgcmVjb3JkIH0gPSBwcm9wcztcclxuICBjb25zdCBpc0VkaXQgPSByZWNvcmQ/LnBhcmFtcy5lbWFpbCA/IHRydWUgOiBmYWxzZTsgLy8gQXNzdW1pbmcgZW1haWwgaXMgYWx3YXlzIHByZXNlbnQgZm9yIGV4aXN0aW5nIHJlY29yZHNcclxuICBjb25zdCBbc2hvd0Zvcm0sIHNldFNob3dGb3JtXSA9IHVzZVN0YXRlKCFpc0VkaXQpO1xyXG4gIGNvbnN0IFtvbGRQYXNzd29yZCwgc2V0T2xkUGFzc3dvcmRdID0gdXNlU3RhdGUoJycpO1xyXG4gIGNvbnN0IFtuZXdQYXNzd29yZCwgc2V0TmV3UGFzc3dvcmRdID0gdXNlU3RhdGUoJycpO1xyXG4gIGNvbnN0IFtjb25maXJtUGFzc3dvcmQsIHNldENvbmZpcm1QYXNzd29yZF0gPSB1c2VTdGF0ZSgnJyk7XHJcblxyXG4gIGNvbnN0IGhhbmRsZUNoYW5nZVBhc3N3b3JkQ2hhbmdlID0gKGU6IFJlYWN0LkNoYW5nZUV2ZW50PEhUTUxJbnB1dEVsZW1lbnQ+KSA9PiB7XHJcbiAgICBzZXROZXdQYXNzd29yZChlLnRhcmdldC52YWx1ZSk7XHJcbiAgfTtcclxuXHJcbiAgY29uc3QgaGFuZGxlQ2hhbmdlUGFzc3dvcmRDbGljayA9IChlOiBSZWFjdC5Nb3VzZUV2ZW50KSA9PiB7XHJcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgc2V0U2hvd0Zvcm0oIXNob3dGb3JtKTtcclxuICB9O1xyXG5cclxuICBjb25zdCBoYW5kbGVDYW5jZWwgPSAoZTogUmVhY3QuTW91c2VFdmVudCkgPT4ge1xyXG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgIHNldFNob3dGb3JtKGZhbHNlKTtcclxuICAgIHNldE5ld1Bhc3N3b3JkKCcnKTtcclxuICB9O1xyXG5cclxuICB1c2VFZmZlY3QoKCkgPT4ge1xyXG4gICAgY29uc3QgdGltZW91dCA9IHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICBpZiAob25DaGFuZ2UpIHtcclxuICAgICAgICBvbkNoYW5nZSgncGFzc3dvcmQnLCBuZXdQYXNzd29yZCk7XHJcbiAgICAgIH1cclxuICAgIH0sIDQwMDApO1xyXG5cclxuICAgIHJldHVybiAoKSA9PiBjbGVhclRpbWVvdXQodGltZW91dCk7XHJcbiAgfSwgW25ld1Bhc3N3b3JkXSk7XHJcbiAgcmV0dXJuIChcclxuICAgIDxCb3ggd2lkdGg9ezF9IGZsZXggZmxleERpcmVjdGlvbj1cImNvbHVtblwiIGFsaWduSXRlbXM9XCJjZW50ZXJcIiBnYXA9ezJ9PlxyXG4gICAgICB7c2hvd0Zvcm0gJiYgKFxyXG4gICAgICAgIDxCb3ggd2lkdGg9ezF9IGZsZXggZmxleERpcmVjdGlvbj1cImNvbHVtblwiIGFsaWduSXRlbXM9XCJjZW50ZXJcIiBnYXA9ezJ9PlxyXG4gICAgICAgICAgey8qIDxCb3ggd2lkdGg9ezF9IG1hcmdpbkJvdHRvbT17MzJ9PlxyXG4gICAgICAgICAgICA8TGFiZWwgaHRtbEZvcj1cIm9sZFBhc3N3b3JkXCI+T2xkIFBhc3N3b3JkPC9MYWJlbD5cclxuICAgICAgICAgICAgPGlucHV0XHJcbiAgICAgICAgICAgICAgaWQ9XCJvbGRQYXNzd29yZFwiXHJcbiAgICAgICAgICAgICAgdHlwZT1cInBhc3N3b3JkXCJcclxuICAgICAgICAgICAgICB2YWx1ZT17b2xkUGFzc3dvcmR9XHJcbiAgICAgICAgICAgICAgb25DaGFuZ2U9eyhlKSA9PiBzZXRPbGRQYXNzd29yZChlLnRhcmdldC52YWx1ZSl9XHJcbiAgICAgICAgICAgICAgcmVxdWlyZWRcclxuICAgICAgICAgICAgICBzdHlsZT17e1xyXG4gICAgICAgICAgICAgICAgd2lkdGg6ICcxMDAlJyxcclxuICAgICAgICAgICAgICAgIHBhZGRpbmc6ICc4cHgnLFxyXG4gICAgICAgICAgICAgICAgYm9yZGVyUmFkaXVzOiAnNHB4JyxcclxuICAgICAgICAgICAgICAgIGJvcmRlcjogJzFweCBzb2xpZCAjZGRkJyxcclxuICAgICAgICAgICAgICAgIGJveFNpemluZzogJ2JvcmRlci1ib3gnLFxyXG4gICAgICAgICAgICAgIH19XHJcbiAgICAgICAgICAgIC8+XHJcbiAgICAgICAgICA8L0JveD4gKi99XHJcblxyXG4gICAgICAgICAgPEJveCB3aWR0aD17MX0gbWFyZ2luQm90dG9tPXszMn0+XHJcbiAgICAgICAgICAgIDxMYWJlbCBodG1sRm9yPVwibmV3UGFzc3dvcmRcIiByZXF1aXJlZD5cclxuICAgICAgICAgICAgICBOZXcgUGFzc3dvcmRcclxuICAgICAgICAgICAgPC9MYWJlbD5cclxuICAgICAgICAgICAgPElucHV0XHJcbiAgICAgICAgICAgICAgaWQ9XCJuZXdQYXNzd29yZFwiXHJcbiAgICAgICAgICAgICAgdHlwZT1cInBhc3N3b3JkXCJcclxuICAgICAgICAgICAgICB2YWx1ZT17bmV3UGFzc3dvcmR9XHJcbiAgICAgICAgICAgICAgb25DaGFuZ2U9e2hhbmRsZUNoYW5nZVBhc3N3b3JkQ2hhbmdlfVxyXG4gICAgICAgICAgICAgIHZhcmlhbnQ9XCJkZWZhdWx0XCJcclxuICAgICAgICAgICAgICB3aWR0aD17MX1cclxuICAgICAgICAgICAgICByZXF1aXJlZFxyXG4gICAgICAgICAgICAvPlxyXG4gICAgICAgICAgPC9Cb3g+XHJcblxyXG4gICAgICAgICAgey8qIC8vIDxCb3ggd2lkdGg9ezF9IG1hcmdpbkJvdHRvbT17MzJ9PlxyXG4gICAgICAgICAgLy8gICA8TGFiZWwgaHRtbEZvcj1cImNvbmZpcm1QYXNzd29yZFwiPkNvbmZpcm0gUGFzc3dvcmQ8L0xhYmVsPlxyXG4gICAgICAgICAgLy8gICA8aW5wdXRcclxuICAgICAgICAgIC8vICAgICBpZD1cImNvbmZpcm1QYXNzd29yZFwiXHJcbiAgICAgICAgICAvLyAgICAgdHlwZT1cInBhc3N3b3JkXCJcclxuICAgICAgICAgIC8vICAgICB2YWx1ZT17Y29uZmlybVBhc3N3b3JkfVxyXG4gICAgICAgICAgLy8gICAgIG9uQ2hhbmdlPXsoZSkgPT4gc2V0Q29uZmlybVBhc3N3b3JkKGUudGFyZ2V0LnZhbHVlKX1cclxuICAgICAgICAgIC8vICAgICByZXF1aXJlZFxyXG4gICAgICAgICAgLy8gICAgIHN0eWxlPXt7XHJcbiAgICAgICAgICAvLyAgICAgICB3aWR0aDogJzEwMCUnLFxyXG4gICAgICAgICAgLy8gICAgICAgcGFkZGluZzogJzhweCcsXHJcbiAgICAgICAgICAvLyAgICAgICBib3JkZXJSYWRpdXM6ICc0cHgnLFxyXG4gICAgICAgICAgLy8gICAgICAgYm9yZGVyOiAnMXB4IHNvbGlkICNkZGQnLFxyXG4gICAgICAgICAgLy8gICAgICAgYm94U2l6aW5nOiAnYm9yZGVyLWJveCcsXHJcbiAgICAgICAgICAvLyAgICAgfX1cclxuICAgICAgICAgIC8vICAgLz5cclxuICAgICAgICAgIC8vIDwvQm94PiAqL31cclxuICAgICAgICAgIHtpc0VkaXQgJiYgKFxyXG4gICAgICAgICAgICA8QnV0dG9uIHR5cGU9XCJidXR0b25cIiBvbkNsaWNrPXtoYW5kbGVDYW5jZWx9IHZhcmlhbnQ9XCJkZWZhdWx0XCI+XHJcbiAgICAgICAgICAgICAgQ2FuY2VsXHJcbiAgICAgICAgICAgIDwvQnV0dG9uPlxyXG4gICAgICAgICAgKX1cclxuICAgICAgICA8L0JveD5cclxuICAgICAgKX1cclxuICAgICAgeyFzaG93Rm9ybSAmJiAoXHJcbiAgICAgICAgPEJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgbWFyZ2luQm90dG9tPXszMn0gb25DbGljaz17aGFuZGxlQ2hhbmdlUGFzc3dvcmRDbGlja30+XHJcbiAgICAgICAgICBDaGFuZ2UgUGFzc3dvcmRcclxuICAgICAgICA8L0J1dHRvbj5cclxuICAgICAgKX1cclxuICAgIDwvQm94PlxyXG4gICk7XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBDaGFuZ2VBZG1pblBhc3N3b3JkO1xyXG4iLCJBZG1pbkpTLlVzZXJDb21wb25lbnRzID0ge31cbmltcG9ydCBEYXNoYm9hcmQgZnJvbSAnLi4vc3JjL2NvbXBvbmVudHMvQ3VzdG9tRGFzaGJvYXJkJ1xuQWRtaW5KUy5Vc2VyQ29tcG9uZW50cy5EYXNoYm9hcmQgPSBEYXNoYm9hcmRcbmltcG9ydCBDdXN0b21HYWxsZXJ5VXBsb2FkQ29tcG9uZW50IGZyb20gJy4uL3NyYy9jb21wb25lbnRzL0N1c3RvbUdhbGxlcnlVcGxvYWRDb21wb25lbnQnXG5BZG1pbkpTLlVzZXJDb21wb25lbnRzLkN1c3RvbUdhbGxlcnlVcGxvYWRDb21wb25lbnQgPSBDdXN0b21HYWxsZXJ5VXBsb2FkQ29tcG9uZW50XG5pbXBvcnQgQ3VzdG9tU2hvdyBmcm9tICcuLi9zcmMvY29tcG9uZW50cy9DdXN0b21TaG93J1xuQWRtaW5KUy5Vc2VyQ29tcG9uZW50cy5DdXN0b21TaG93ID0gQ3VzdG9tU2hvd1xuaW1wb3J0IFJhbmRvbVBpY3R1cmUgZnJvbSAnLi4vc3JjL2NvbXBvbmVudHMvUmFuZG9tUGljdHVyZSdcbkFkbWluSlMuVXNlckNvbXBvbmVudHMuUmFuZG9tUGljdHVyZSA9IFJhbmRvbVBpY3R1cmVcbmltcG9ydCBDdXN0b21JbWFnZVVwbG9hZENvbXBvbmVudCBmcm9tICcuLi9zcmMvY29tcG9uZW50cy9DdXN0b21JbWFnZVVwbG9hZENvbXBvbmVudCdcbkFkbWluSlMuVXNlckNvbXBvbmVudHMuQ3VzdG9tSW1hZ2VVcGxvYWRDb21wb25lbnQgPSBDdXN0b21JbWFnZVVwbG9hZENvbXBvbmVudFxuaW1wb3J0IEN1c3RvbVBvcHVwVXBsb2FkQ29tcG9uZW50IGZyb20gJy4uL3NyYy9jb21wb25lbnRzL0N1c3RvbVBvcHVwVXBsb2FkQ29tcG9uZW50J1xuQWRtaW5KUy5Vc2VyQ29tcG9uZW50cy5DdXN0b21Qb3B1cFVwbG9hZENvbXBvbmVudCA9IEN1c3RvbVBvcHVwVXBsb2FkQ29tcG9uZW50XG5pbXBvcnQgQ3VzdG9tUGFzc3dvcmRFZGl0Q29tcG9uZW50IGZyb20gJy4uL3NyYy9jb21wb25lbnRzL0N1c3RvbUFkbWluUGFzc3dvcmRDb21wb25lbnQnXG5BZG1pbkpTLlVzZXJDb21wb25lbnRzLkN1c3RvbVBhc3N3b3JkRWRpdENvbXBvbmVudCA9IEN1c3RvbVBhc3N3b3JkRWRpdENvbXBvbmVudCJdLCJuYW1lcyI6WyJDdXN0b21EYXNoYm9hcmQiLCJ0cmFuc2xhdGUiLCJ1c2VUcmFuc2xhdGlvbiIsIlJlYWN0IiwiY3JlYXRlRWxlbWVudCIsIkJveCIsIndpZHRoIiwidGV4dEFsaWduIiwicGFkZGluZyIsImJnIiwiaXNGdW5jdGlvbiIsInV0aWxzIiwiQXhpb3NIZWFkZXJzIiwiQXhpb3NFcnJvciIsInRvRm9ybURhdGEiLCJlbmNvZGUiLCJVUkxTZWFyY2hQYXJhbXMiLCJGb3JtRGF0YSIsIkJsb2IiLCJwbGF0Zm9ybSIsImlzQ2FuY2VsIiwibWVyZ2VDb25maWciLCJDYW5jZWxlZEVycm9yIiwiVkVSU0lPTiIsImZldGNoQWRhcHRlci5nZXRGZXRjaCIsImdldEFkYXB0ZXIiLCJ2YWxpZGF0b3JzIiwiQXhpb3MiLCJzcHJlYWQiLCJpc0F4aW9zRXJyb3IiLCJIdHRwU3RhdHVzQ29kZSIsIkNhbmNlbFRva2VuIiwiSW1hZ2VVcGxvYWQiLCJwcm9wcyIsInJlY29yZCIsInNlbGVjdGVkRmlsZSIsInNldFNlbGVjdGVkRmlsZSIsInVzZVN0YXRlIiwidGl0bGUiLCJzZXRUaXRsZSIsImRlc2NyaXB0aW9uIiwic2V0RGVzY3JpcHRpb24iLCJsb2FkaW5nIiwic2V0TG9hZGluZyIsImVycm9yIiwic2V0RXJyb3IiLCJzdWNjZXNzIiwic2V0U3VjY2VzcyIsInNlbmROb3RpY2UiLCJ1c2VOb3RpY2UiLCJuYXZpZ2F0ZSIsInVzZU5hdmlnYXRlIiwiYXBpIiwiQXBpQ2xpZW50IiwiaGFuZGxlRmlsZUNoYW5nZSIsImV2ZW50IiwiZmlsZSIsInRhcmdldCIsImZpbGVzIiwiaGFuZGxlVGl0bGVDaGFuZ2UiLCJ2YWx1ZSIsImhhbmRsZURlc2NyaXB0aW9uQ2hhbmdlIiwiaGFuZGxlVXBsb2FkIiwicHJldmVudERlZmF1bHQiLCJmb3JtRGF0YSIsImFwcGVuZCIsInJlc3BvbnNlIiwiYXhpb3MiLCJwb3N0IiwiaGVhZGVycyIsImNvbnNvbGUiLCJsb2ciLCJkYXRhIiwicmVzb3VyY2VBY3Rpb24iLCJyZXNvdXJjZUlkIiwiYWN0aW9uTmFtZSIsImltYWdlVXJsIiwidXJsIiwiY2xvdWRpbmFyeVB1YmxpY0lkIiwicHVibGljX2lkIiwibWVzc2FnZSIsInR5cGUiLCJiYWNrZ3JvdW5kQ29sb3IiLCJwIiwiYm9yZGVyUmFkaXVzIiwiYm94U2hhZG93Iiwic3R5bGUiLCJkaXNwbGF5IiwiZmxleERpcmVjdGlvbiIsImFsaWduSXRlbXMiLCJnYXAiLCJvblN1Ym1pdCIsImJvcmRlciIsImhlaWdodCIsImp1c3RpZnlDb250ZW50IiwiTGFiZWwiLCJodG1sRm9yIiwiY3Vyc29yIiwiRnJhZ21lbnQiLCJzcmMiLCJVUkwiLCJjcmVhdGVPYmplY3RVUkwiLCJhbHQiLCJvYmplY3RGaXQiLCJUZXh0IiwiSW5wdXQiLCJpZCIsImFjY2VwdCIsIm9uQ2hhbmdlIiwicmVxdWlyZWQiLCJ2YXJpYW50IiwiY29sb3IiLCJUZXh0QXJlYSIsIkJ1dHRvbiIsImxhYmVsIiwiZGlzYWJsZWQiLCJDdXN0b21TaG93IiwicGFyYW1zIiwiUmFuZG9tUGljdHVyZSIsIkN1c3RvbUltYWdlVXBsb2FkQ29tcG9uZW50IiwibWFyZ2luQm90dG9tIiwibGlua1VybCIsInNldExpbmtVcmwiLCJpc0FjdGl2ZSIsInNldElzQWN0aXZlIiwiaGFuZGxlTGlua1VybENoYW5nZSIsIkNoZWNrQm94IiwiY2hlY2tlZCIsIm9uQ2xpY2siLCJDaGFuZ2VBZG1pblBhc3N3b3JkIiwid2hlcmUiLCJpc0VkaXQiLCJlbWFpbCIsInNob3dGb3JtIiwic2V0U2hvd0Zvcm0iLCJvbGRQYXNzd29yZCIsInNldE9sZFBhc3N3b3JkIiwibmV3UGFzc3dvcmQiLCJzZXROZXdQYXNzd29yZCIsImNvbmZpcm1QYXNzd29yZCIsInNldENvbmZpcm1QYXNzd29yZCIsImhhbmRsZUNoYW5nZVBhc3N3b3JkQ2hhbmdlIiwiZSIsImhhbmRsZUNoYW5nZVBhc3N3b3JkQ2xpY2siLCJzdG9wUHJvcGFnYXRpb24iLCJoYW5kbGVDYW5jZWwiLCJ1c2VFZmZlY3QiLCJ0aW1lb3V0Iiwic2V0VGltZW91dCIsImNsZWFyVGltZW91dCIsImZsZXgiLCJBZG1pbkpTIiwiVXNlckNvbXBvbmVudHMiLCJEYXNoYm9hcmQiLCJDdXN0b21HYWxsZXJ5VXBsb2FkQ29tcG9uZW50IiwiQ3VzdG9tUG9wdXBVcGxvYWRDb21wb25lbnQiLCJDdXN0b21QYXNzd29yZEVkaXRDb21wb25lbnQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7RUFJQSxNQUFNQSxlQUFlLEdBQUdBLE1BQU07SUFDNUIsTUFBTTtFQUFFQyxJQUFBQTtLQUFXLEdBQUdDLHNCQUFjLEVBQUU7RUFFdEMsRUFBQSxvQkFBT0Msc0JBQUEsQ0FBQUMsYUFBQSxDQUFDQyxnQkFBRyxFQUFBO0VBQUNDLElBQUFBLEtBQUssRUFBRSxDQUFFO0VBQUNDLElBQUFBLFNBQVMsRUFBQyxRQUFRO0VBQUNDLElBQUFBLE9BQU8sRUFBRSxDQUFFO0VBQUNDLElBQUFBLEVBQUUsRUFBQztFQUFPLEdBQU0sQ0FBQztFQUN4RSxDQUFDOztFQ05EO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ2UsU0FBUyxJQUFJLENBQUMsRUFBRSxFQUFFLE9BQU8sRUFBRTtFQUMxQyxFQUFFLE9BQU8sU0FBUyxJQUFJLEdBQUc7RUFDekIsSUFBSSxPQUFPLEVBQUUsQ0FBQyxLQUFLLENBQUMsT0FBTyxFQUFFLFNBQVMsQ0FBQztFQUN2QyxFQUFFLENBQUM7RUFDSDs7RUNUQTs7RUFFQSxNQUFNLEVBQUUsUUFBUSxFQUFFLEdBQUcsTUFBTSxDQUFDLFNBQVM7RUFDckMsTUFBTSxFQUFFLGNBQWMsRUFBRSxHQUFHLE1BQU07RUFDakMsTUFBTSxFQUFFLFFBQVEsRUFBRSxXQUFXLEVBQUUsR0FBRyxNQUFNOztFQUV4QyxNQUFNLE1BQU0sR0FBRyxDQUFDLENBQUMsS0FBSyxLQUFLLENBQUMsS0FBSyxLQUFLO0VBQ3RDLEVBQUUsTUFBTSxHQUFHLEdBQUcsUUFBUSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUM7RUFDbEMsRUFBRSxPQUFPLEtBQUssQ0FBQyxHQUFHLENBQUMsS0FBSyxLQUFLLENBQUMsR0FBRyxDQUFDLEdBQUcsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFD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UUFBUTtFQUFDK0MsSUFBQUEsT0FBTyxFQUFFaUIsWUFBYTtFQUFDbkMsSUFBQUEsT0FBTyxFQUFDO0tBQVMsRUFBQyxRQUV2RCxDQUVQLENBQ04sRUFDQSxDQUFDdUIsUUFBUSxpQkFDUmxJLHNCQUFBLENBQUFDLGFBQUEsQ0FBQzZHLG1CQUFNLEVBQUE7RUFBQ2hDLElBQUFBLElBQUksRUFBQyxRQUFRO0VBQUN1QyxJQUFBQSxZQUFZLEVBQUUsRUFBRztFQUFDUSxJQUFBQSxPQUFPLEVBQUVlO0tBQTBCLEVBQUMsaUJBRXBFLENBRVAsQ0FBQztFQUVWLENBQUM7O0VDMUdEUSxPQUFPLENBQUNDLGNBQWMsR0FBRyxFQUFFO0VBRTNCRCxPQUFPLENBQUNDLGNBQWMsQ0FBQ0MsU0FBUyxHQUFHQSxlQUFTO0VBRTVDRixPQUFPLENBQUNDLGNBQWMsQ0FBQ0UsNEJBQTRCLEdBQUdBLGFBQTRCO0VBRWxGSCxPQUFPLENBQUNDLGNBQWMsQ0FBQ3BDLFVBQVUsR0FBR0EsVUFBVTtFQUU5Q21DLE9BQU8sQ0FBQ0MsY0FBYyxDQUFDbEMsYUFBYSxHQUFHQSxhQUFhO0VBRXBEaUMsT0FBTyxDQUFDQyxjQUFjLENBQUNqQywwQkFBMEIsR0FBR0EsMEJBQTBCO0VBRTlFZ0MsT0FBTyxDQUFDQyxjQUFjLENBQUNHLDBCQUEwQixHQUFHQSxXQUEwQjtFQUU5RUosT0FBTyxDQUFDQyxjQUFjLENBQUNJLDJCQUEyQixHQUFHQSxtQkFBMkI7Ozs7OzsiLCJ4X2dvb2dsZV9pZ25vcmVMaXN0IjpbMSwyLDMsNCw1LDYsNyw4LDksMTAsMTEsMTIsMTMsMTQsMTUsMTYsMTcsMTgsMTksMjAsMjEsMjIsMjMsMjQsMjUsMjYsMjcsMjgsMjksMzAsMzEsMzIsMzMsMzQsMzUsMzYsMzcsMzgsMzksNDAsNDEsNDIsNDMsNDQsNDUsNDYsNDcsNDgsNDksNTAsNTFdfQ==
