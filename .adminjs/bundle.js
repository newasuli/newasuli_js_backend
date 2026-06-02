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
    return /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
      width: 1,
      flex: true,
      flexDirection: "column",
      alignItems: "center",
      gap: 2,
      marginBlock: 24
    }, /*#__PURE__*/React__default.default.createElement("img", {
      src: record.params.imageUrl,
      alt: record.params.title,
      style: {
        height: '500px',
        objectFit: 'contain',
        marginInline: 'auto'
      }
    }));
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
      property,
      record
    } = props;
    const isEdit = !!record?.id;
    const [showForm, setShowForm] = React.useState(!isEdit);
    const [password, setPassword] = React.useState('');
    const handleChangePasswordChange = e => {
      const value = e.target.value;
      setPassword(value);
      onChange?.(property.name, e.target.value);
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
      onChange?.(property.name, '');
    };
    React.useEffect(() => {
      if (!isEdit) {
        setPassword(record?.params?.[property.name] || '');
      } else {
        setPassword('');
      }
    }, [record?.id]);
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
    }, /*#__PURE__*/React__default.default.createElement(designSystem.FormGroup, {
      width: 1,
      marginBottom: 32
    }, /*#__PURE__*/React__default.default.createElement(designSystem.Label, {
      htmlFor: "newPassword",
      required: true
    }, "New Password"), /*#__PURE__*/React__default.default.createElement(designSystem.Input, {
      id: "newPassword",
      type: "password",
      value: password,
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVuZGxlLmpzIiwic291cmNlcyI6WyIuLi9zcmMvY29tcG9uZW50cy9DdXN0b21EYXNoYm9hcmQudHN4IiwiLi4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9oZWxwZXJzL2JpbmQuanMiLCIuLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL3V0aWxzLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9oZWxwZXJzL3BhcnNlSGVhZGVycy5qcyIsIi4uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvY29yZS9BeGlvc0hlYWRlcnMuanMiLCIuLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2NvcmUvQXhpb3NFcnJvci5qcyIsIi4uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvaGVscGVycy9udWxsLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9oZWxwZXJzL3RvRm9ybURhdGEuanMiLCIuLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2hlbHBlcnMvQXhpb3NVUkxTZWFyY2hQYXJhbXMuanMiLCIuLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2hlbHBlcnMvYnVpbGRVUkwuanMiLCIuLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2NvcmUvSW50ZXJjZXB0b3JNYW5hZ2VyLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9kZWZhdWx0cy90cmFuc2l0aW9uYWwuanMiLCIuLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL3BsYXRmb3JtL2Jyb3dzZXIvY2xhc3Nlcy9VUkxTZWFyY2hQYXJhbXMuanMiLCIuLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL3BsYXRmb3JtL2Jyb3dzZXIvY2xhc3Nlcy9Gb3JtRGF0YS5qcyIsIi4uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvcGxhdGZvcm0vYnJvd3Nlci9jbGFzc2VzL0Jsb2IuanMiLCIuLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL3BsYXRmb3JtL2Jyb3dzZXIvaW5kZXguanMiLCIuLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL3BsYXRmb3JtL2NvbW1vbi91dGlscy5qcyIsIi4uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvcGxhdGZvcm0vaW5kZXguanMiLCIuLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2hlbHBlcnMvdG9VUkxFbmNvZGVkRm9ybS5qcyIsIi4uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvaGVscGVycy9mb3JtRGF0YVRvSlNPTi5qcyIsIi4uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvZGVmYXVsdHMvaW5kZXguanMiLCIuLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2NvcmUvdHJhbnNmb3JtRGF0YS5qcyIsIi4uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvY2FuY2VsL2lzQ2FuY2VsLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9jYW5jZWwvQ2FuY2VsZWRFcnJvci5qcyIsIi4uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvY29yZS9zZXR0bGUuanMiLCIuLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2hlbHBlcnMvcGFyc2VQcm90b2NvbC5qcyIsIi4uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvaGVscGVycy9zcGVlZG9tZXRlci5qcyIsIi4uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvaGVscGVycy90aHJvdHRsZS5qcyIsIi4uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvaGVscGVycy9wcm9ncmVzc0V2ZW50UmVkdWNlci5qcyIsIi4uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvaGVscGVycy9pc1VSTFNhbWVPcmlnaW4uanMiLCIuLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2hlbHBlcnMvY29va2llcy5qcyIsIi4uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvaGVscGVycy9pc0Fic29sdXRlVVJMLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9oZWxwZXJzL2NvbWJpbmVVUkxzLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9jb3JlL2J1aWxkRnVsbFBhdGguanMiLCIuLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2NvcmUvbWVyZ2VDb25maWcuanMiLCIuLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2hlbHBlcnMvcmVzb2x2ZUNvbmZpZy5qcyIsIi4uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvYWRhcHRlcnMveGhyLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9oZWxwZXJzL2NvbXBvc2VTaWduYWxzLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9oZWxwZXJzL3RyYWNrU3RyZWFtLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9oZWxwZXJzL2VzdGltYXRlRGF0YVVSTERlY29kZWRCeXRlcy5qcyIsIi4uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvZW52L2RhdGEuanMiLCIuLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2FkYXB0ZXJzL2ZldGNoLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9hZGFwdGVycy9hZGFwdGVycy5qcyIsIi4uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvY29yZS9kaXNwYXRjaFJlcXVlc3QuanMiLCIuLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2hlbHBlcnMvdmFsaWRhdG9yLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9jb3JlL0F4aW9zLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9jYW5jZWwvQ2FuY2VsVG9rZW4uanMiLCIuLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2hlbHBlcnMvc3ByZWFkLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9oZWxwZXJzL2lzQXhpb3NFcnJvci5qcyIsIi4uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvaGVscGVycy9IdHRwU3RhdHVzQ29kZS5qcyIsIi4uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvYXhpb3MuanMiLCIuLi9ub2RlX21vZHVsZXMvYXhpb3MvaW5kZXguanMiLCIuLi9zcmMvY29tcG9uZW50cy9DdXN0b21HYWxsZXJ5VXBsb2FkQ29tcG9uZW50LnRzeCIsIi4uL3NyYy9jb21wb25lbnRzL0N1c3RvbVNob3cudHN4IiwiLi4vc3JjL2NvbXBvbmVudHMvUmFuZG9tUGljdHVyZS50c3giLCIuLi9zcmMvY29tcG9uZW50cy9DdXN0b21JbWFnZVVwbG9hZENvbXBvbmVudC50c3giLCIuLi9zcmMvY29tcG9uZW50cy9DdXN0b21Qb3B1cFVwbG9hZENvbXBvbmVudC50c3giLCIuLi9zcmMvY29tcG9uZW50cy9DdXN0b21BZG1pblBhc3N3b3JkQ29tcG9uZW50LnRzeCIsImVudHJ5LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCB7IHVzZVRyYW5zbGF0aW9uIH0gZnJvbSAnYWRtaW5qcyc7XHJcbmltcG9ydCB7IEJveCwgVGV4dCwgSDEgfSBmcm9tICdAYWRtaW5qcy9kZXNpZ24tc3lzdGVtJztcclxuXHJcbmNvbnN0IEN1c3RvbURhc2hib2FyZCA9ICgpID0+IHtcclxuICBjb25zdCB7IHRyYW5zbGF0ZSB9ID0gdXNlVHJhbnNsYXRpb24oKTtcclxuXHJcbiAgcmV0dXJuIDxCb3ggd2lkdGg9ezF9IHRleHRBbGlnbj1cImNlbnRlclwiIHBhZGRpbmc9ezV9IGJnPVwid2hpdGVcIj48L0JveD47XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBDdXN0b21EYXNoYm9hcmQ7XHJcbiIsIid1c2Ugc3RyaWN0JztcblxuLyoqXG4gKiBDcmVhdGUgYSBib3VuZCB2ZXJzaW9uIG9mIGEgZnVuY3Rpb24gd2l0aCBhIHNwZWNpZmllZCBgdGhpc2AgY29udGV4dFxuICpcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZuIC0gVGhlIGZ1bmN0aW9uIHRvIGJpbmRcbiAqIEBwYXJhbSB7Kn0gdGhpc0FyZyAtIFRoZSB2YWx1ZSB0byBiZSBwYXNzZWQgYXMgdGhlIGB0aGlzYCBwYXJhbWV0ZXJcbiAqIEByZXR1cm5zIHtGdW5jdGlvbn0gQSBuZXcgZnVuY3Rpb24gdGhhdCB3aWxsIGNhbGwgdGhlIG9yaWdpbmFsIGZ1bmN0aW9uIHdpdGggdGhlIHNwZWNpZmllZCBgdGhpc2AgY29udGV4dFxuICovXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBiaW5kKGZuLCB0aGlzQXJnKSB7XG4gIHJldHVybiBmdW5jdGlvbiB3cmFwKCkge1xuICAgIHJldHVybiBmbi5hcHBseSh0aGlzQXJnLCBhcmd1bWVudHMpO1xuICB9O1xufVxuIiwiJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQgYmluZCBmcm9tICcuL2hlbHBlcnMvYmluZC5qcyc7XG5cbi8vIHV0aWxzIGlzIGEgbGlicmFyeSBvZiBnZW5lcmljIGhlbHBlciBmdW5jdGlvbnMgbm9uLXNwZWNpZmljIHRvIGF4aW9zXG5cbmNvbnN0IHsgdG9TdHJpbmcgfSA9IE9iamVjdC5wcm90b3R5cGU7XG5jb25zdCB7IGdldFByb3RvdHlwZU9mIH0gPSBPYmplY3Q7XG5jb25zdCB7IGl0ZXJhdG9yLCB0b1N0cmluZ1RhZyB9ID0gU3ltYm9sO1xuXG5jb25zdCBraW5kT2YgPSAoKGNhY2hlKSA9PiAodGhpbmcpID0+IHtcbiAgY29uc3Qgc3RyID0gdG9TdHJpbmcuY2FsbCh0aGluZyk7XG4gIHJldHVybiBjYWNoZVtzdHJdIHx8IChjYWNoZVtzdHJdID0gc3RyLnNsaWNlKDgsIC0xKS50b0xvd2VyQ2FzZSgpKTtcbn0pKE9iamVjdC5jcmVhdGUobnVsbCkpO1xuXG5jb25zdCBraW5kT2ZUZXN0ID0gKHR5cGUpID0+IHtcbiAgdHlwZSA9IHR5cGUudG9Mb3dlckNhc2UoKTtcbiAgcmV0dXJuICh0aGluZykgPT4ga2luZE9mKHRoaW5nKSA9PT0gdHlwZTtcbn07XG5cbmNvbnN0IHR5cGVPZlRlc3QgPSAodHlwZSkgPT4gKHRoaW5nKSA9PiB0eXBlb2YgdGhpbmcgPT09IHR5cGU7XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYSBub24tbnVsbCBvYmplY3RcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKlxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYW4gQXJyYXksIG90aGVyd2lzZSBmYWxzZVxuICovXG5jb25zdCB7IGlzQXJyYXkgfSA9IEFycmF5O1xuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIHVuZGVmaW5lZFxuICpcbiAqIEBwYXJhbSB7Kn0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKlxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdGhlIHZhbHVlIGlzIHVuZGVmaW5lZCwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmNvbnN0IGlzVW5kZWZpbmVkID0gdHlwZU9mVGVzdCgndW5kZWZpbmVkJyk7XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYSBCdWZmZXJcbiAqXG4gKiBAcGFyYW0geyp9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICpcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGEgQnVmZmVyLCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNCdWZmZXIodmFsKSB7XG4gIHJldHVybiAoXG4gICAgdmFsICE9PSBudWxsICYmXG4gICAgIWlzVW5kZWZpbmVkKHZhbCkgJiZcbiAgICB2YWwuY29uc3RydWN0b3IgIT09IG51bGwgJiZcbiAgICAhaXNVbmRlZmluZWQodmFsLmNvbnN0cnVjdG9yKSAmJlxuICAgIGlzRnVuY3Rpb24odmFsLmNvbnN0cnVjdG9yLmlzQnVmZmVyKSAmJlxuICAgIHZhbC5jb25zdHJ1Y3Rvci5pc0J1ZmZlcih2YWwpXG4gICk7XG59XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYW4gQXJyYXlCdWZmZXJcbiAqXG4gKiBAcGFyYW0geyp9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICpcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGFuIEFycmF5QnVmZmVyLCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuY29uc3QgaXNBcnJheUJ1ZmZlciA9IGtpbmRPZlRlc3QoJ0FycmF5QnVmZmVyJyk7XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYSB2aWV3IG9uIGFuIEFycmF5QnVmZmVyXG4gKlxuICogQHBhcmFtIHsqfSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhIHZpZXcgb24gYW4gQXJyYXlCdWZmZXIsIG90aGVyd2lzZSBmYWxzZVxuICovXG5mdW5jdGlvbiBpc0FycmF5QnVmZmVyVmlldyh2YWwpIHtcbiAgbGV0IHJlc3VsdDtcbiAgaWYgKHR5cGVvZiBBcnJheUJ1ZmZlciAhPT0gJ3VuZGVmaW5lZCcgJiYgQXJyYXlCdWZmZXIuaXNWaWV3KSB7XG4gICAgcmVzdWx0ID0gQXJyYXlCdWZmZXIuaXNWaWV3KHZhbCk7XG4gIH0gZWxzZSB7XG4gICAgcmVzdWx0ID0gdmFsICYmIHZhbC5idWZmZXIgJiYgaXNBcnJheUJ1ZmZlcih2YWwuYnVmZmVyKTtcbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufVxuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGEgU3RyaW5nXG4gKlxuICogQHBhcmFtIHsqfSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhIFN0cmluZywgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmNvbnN0IGlzU3RyaW5nID0gdHlwZU9mVGVzdCgnc3RyaW5nJyk7XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYSBGdW5jdGlvblxuICpcbiAqIEBwYXJhbSB7Kn0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhIEZ1bmN0aW9uLCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuY29uc3QgaXNGdW5jdGlvbiA9IHR5cGVPZlRlc3QoJ2Z1bmN0aW9uJyk7XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYSBOdW1iZXJcbiAqXG4gKiBAcGFyYW0geyp9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICpcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGEgTnVtYmVyLCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuY29uc3QgaXNOdW1iZXIgPSB0eXBlT2ZUZXN0KCdudW1iZXInKTtcblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhbiBPYmplY3RcbiAqXG4gKiBAcGFyYW0geyp9IHRoaW5nIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKlxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYW4gT2JqZWN0LCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuY29uc3QgaXNPYmplY3QgPSAodGhpbmcpID0+IHRoaW5nICE9PSBudWxsICYmIHR5cGVvZiB0aGluZyA9PT0gJ29iamVjdCc7XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYSBCb29sZWFuXG4gKlxuICogQHBhcmFtIHsqfSB0aGluZyBUaGUgdmFsdWUgdG8gdGVzdFxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYSBCb29sZWFuLCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuY29uc3QgaXNCb29sZWFuID0gKHRoaW5nKSA9PiB0aGluZyA9PT0gdHJ1ZSB8fCB0aGluZyA9PT0gZmFsc2U7XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYSBwbGFpbiBPYmplY3RcbiAqXG4gKiBAcGFyYW0geyp9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICpcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGEgcGxhaW4gT2JqZWN0LCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuY29uc3QgaXNQbGFpbk9iamVjdCA9ICh2YWwpID0+IHtcbiAgaWYgKGtpbmRPZih2YWwpICE9PSAnb2JqZWN0Jykge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIGNvbnN0IHByb3RvdHlwZSA9IGdldFByb3RvdHlwZU9mKHZhbCk7XG4gIHJldHVybiAoXG4gICAgKHByb3RvdHlwZSA9PT0gbnVsbCB8fFxuICAgICAgcHJvdG90eXBlID09PSBPYmplY3QucHJvdG90eXBlIHx8XG4gICAgICBPYmplY3QuZ2V0UHJvdG90eXBlT2YocHJvdG90eXBlKSA9PT0gbnVsbCkgJiZcbiAgICAhKHRvU3RyaW5nVGFnIGluIHZhbCkgJiZcbiAgICAhKGl0ZXJhdG9yIGluIHZhbClcbiAgKTtcbn07XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYW4gZW1wdHkgb2JqZWN0IChzYWZlbHkgaGFuZGxlcyBCdWZmZXJzKVxuICpcbiAqIEBwYXJhbSB7Kn0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKlxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYW4gZW1wdHkgb2JqZWN0LCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuY29uc3QgaXNFbXB0eU9iamVjdCA9ICh2YWwpID0+IHtcbiAgLy8gRWFybHkgcmV0dXJuIGZvciBub24tb2JqZWN0cyBvciBCdWZmZXJzIHRvIHByZXZlbnQgUmFuZ2VFcnJvclxuICBpZiAoIWlzT2JqZWN0KHZhbCkgfHwgaXNCdWZmZXIodmFsKSkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIHRyeSB7XG4gICAgcmV0dXJuIE9iamVjdC5rZXlzKHZhbCkubGVuZ3RoID09PSAwICYmIE9iamVjdC5nZXRQcm90b3R5cGVPZih2YWwpID09PSBPYmplY3QucHJvdG90eXBlO1xuICB9IGNhdGNoIChlKSB7XG4gICAgLy8gRmFsbGJhY2sgZm9yIGFueSBvdGhlciBvYmplY3RzIHRoYXQgbWlnaHQgY2F1c2UgUmFuZ2VFcnJvciB3aXRoIE9iamVjdC5rZXlzKClcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbn07XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYSBEYXRlXG4gKlxuICogQHBhcmFtIHsqfSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhIERhdGUsIG90aGVyd2lzZSBmYWxzZVxuICovXG5jb25zdCBpc0RhdGUgPSBraW5kT2ZUZXN0KCdEYXRlJyk7XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYSBGaWxlXG4gKlxuICogQHBhcmFtIHsqfSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhIEZpbGUsIG90aGVyd2lzZSBmYWxzZVxuICovXG5jb25zdCBpc0ZpbGUgPSBraW5kT2ZUZXN0KCdGaWxlJyk7XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYSBSZWFjdCBOYXRpdmUgQmxvYlxuICogUmVhY3QgTmF0aXZlIFwiYmxvYlwiOiBhbiBvYmplY3Qgd2l0aCBhIGB1cmlgIGF0dHJpYnV0ZS4gT3B0aW9uYWxseSwgaXQgY2FuXG4gKiBhbHNvIGhhdmUgYSBgbmFtZWAgYW5kIGB0eXBlYCBhdHRyaWJ1dGUgdG8gc3BlY2lmeSBmaWxlbmFtZSBhbmQgY29udGVudCB0eXBlXG4gKlxuICogQHNlZSBodHRwczovL2dpdGh1Yi5jb20vZmFjZWJvb2svcmVhY3QtbmF0aXZlL2Jsb2IvMjY2ODRjZjNhZGY0MDk0ZWI2YzQwNWQzNDVhNzViZjhjN2MwYmY4OC9MaWJyYXJpZXMvTmV0d29yay9Gb3JtRGF0YS5qcyNMNjgtTDcxXG4gKlxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gdGVzdFxuICpcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGEgUmVhY3QgTmF0aXZlIEJsb2IsIG90aGVyd2lzZSBmYWxzZVxuICovXG5jb25zdCBpc1JlYWN0TmF0aXZlQmxvYiA9ICh2YWx1ZSkgPT4ge1xuICByZXR1cm4gISEodmFsdWUgJiYgdHlwZW9mIHZhbHVlLnVyaSAhPT0gJ3VuZGVmaW5lZCcpO1xufTtcblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgZW52aXJvbm1lbnQgaXMgUmVhY3QgTmF0aXZlXG4gKiBSZWFjdE5hdGl2ZSBgRm9ybURhdGFgIGhhcyBhIG5vbi1zdGFuZGFyZCBgZ2V0UGFydHMoKWAgbWV0aG9kXG4gKlxuICogQHBhcmFtIHsqfSBmb3JtRGF0YSBUaGUgZm9ybURhdGEgdG8gdGVzdFxuICpcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIGVudmlyb25tZW50IGlzIFJlYWN0IE5hdGl2ZSwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmNvbnN0IGlzUmVhY3ROYXRpdmUgPSAoZm9ybURhdGEpID0+IGZvcm1EYXRhICYmIHR5cGVvZiBmb3JtRGF0YS5nZXRQYXJ0cyAhPT0gJ3VuZGVmaW5lZCc7XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYSBCbG9iXG4gKlxuICogQHBhcmFtIHsqfSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhIEJsb2IsIG90aGVyd2lzZSBmYWxzZVxuICovXG5jb25zdCBpc0Jsb2IgPSBraW5kT2ZUZXN0KCdCbG9iJyk7XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYSBGaWxlTGlzdFxuICpcbiAqIEBwYXJhbSB7Kn0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKlxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYSBGaWxlTGlzdCwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmNvbnN0IGlzRmlsZUxpc3QgPSBraW5kT2ZUZXN0KCdGaWxlTGlzdCcpO1xuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGEgU3RyZWFtXG4gKlxuICogQHBhcmFtIHsqfSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhIFN0cmVhbSwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmNvbnN0IGlzU3RyZWFtID0gKHZhbCkgPT4gaXNPYmplY3QodmFsKSAmJiBpc0Z1bmN0aW9uKHZhbC5waXBlKTtcblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhIEZvcm1EYXRhXG4gKlxuICogQHBhcmFtIHsqfSB0aGluZyBUaGUgdmFsdWUgdG8gdGVzdFxuICpcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGFuIEZvcm1EYXRhLCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuZnVuY3Rpb24gZ2V0R2xvYmFsKCkge1xuICBpZiAodHlwZW9mIGdsb2JhbFRoaXMgIT09ICd1bmRlZmluZWQnKSByZXR1cm4gZ2xvYmFsVGhpcztcbiAgaWYgKHR5cGVvZiBzZWxmICE9PSAndW5kZWZpbmVkJykgcmV0dXJuIHNlbGY7XG4gIGlmICh0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJykgcmV0dXJuIHdpbmRvdztcbiAgaWYgKHR5cGVvZiBnbG9iYWwgIT09ICd1bmRlZmluZWQnKSByZXR1cm4gZ2xvYmFsO1xuICByZXR1cm4ge307XG59XG5cbmNvbnN0IEcgPSBnZXRHbG9iYWwoKTtcbmNvbnN0IEZvcm1EYXRhQ3RvciA9IHR5cGVvZiBHLkZvcm1EYXRhICE9PSAndW5kZWZpbmVkJyA/IEcuRm9ybURhdGEgOiB1bmRlZmluZWQ7XG5cbmNvbnN0IGlzRm9ybURhdGEgPSAodGhpbmcpID0+IHtcbiAgaWYgKCF0aGluZykgcmV0dXJuIGZhbHNlO1xuICBpZiAoRm9ybURhdGFDdG9yICYmIHRoaW5nIGluc3RhbmNlb2YgRm9ybURhdGFDdG9yKSByZXR1cm4gdHJ1ZTtcbiAgLy8gUmVqZWN0IHBsYWluIG9iamVjdHMgaW5oZXJpdGluZyBkaXJlY3RseSBmcm9tIE9iamVjdC5wcm90b3R5cGUgc28gcHJvdG90eXBlLXBvbGx1dGlvbiBnYWRnZXRzIGNhbid0IHNwb29mIEZvcm1EYXRhLlxuICBjb25zdCBwcm90byA9IGdldFByb3RvdHlwZU9mKHRoaW5nKTtcbiAgaWYgKCFwcm90byB8fCBwcm90byA9PT0gT2JqZWN0LnByb3RvdHlwZSkgcmV0dXJuIGZhbHNlO1xuICBpZiAoIWlzRnVuY3Rpb24odGhpbmcuYXBwZW5kKSkgcmV0dXJuIGZhbHNlO1xuICBjb25zdCBraW5kID0ga2luZE9mKHRoaW5nKTtcbiAgcmV0dXJuIChcbiAgICBraW5kID09PSAnZm9ybWRhdGEnIHx8XG4gICAgLy8gZGV0ZWN0IGZvcm0tZGF0YSBpbnN0YW5jZVxuICAgIChraW5kID09PSAnb2JqZWN0JyAmJiBpc0Z1bmN0aW9uKHRoaW5nLnRvU3RyaW5nKSAmJiB0aGluZy50b1N0cmluZygpID09PSAnW29iamVjdCBGb3JtRGF0YV0nKVxuICApO1xufTtcblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhIFVSTFNlYXJjaFBhcmFtcyBvYmplY3RcbiAqXG4gKiBAcGFyYW0geyp9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICpcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGEgVVJMU2VhcmNoUGFyYW1zIG9iamVjdCwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmNvbnN0IGlzVVJMU2VhcmNoUGFyYW1zID0ga2luZE9mVGVzdCgnVVJMU2VhcmNoUGFyYW1zJyk7XG5cbmNvbnN0IFtpc1JlYWRhYmxlU3RyZWFtLCBpc1JlcXVlc3QsIGlzUmVzcG9uc2UsIGlzSGVhZGVyc10gPSBbXG4gICdSZWFkYWJsZVN0cmVhbScsXG4gICdSZXF1ZXN0JyxcbiAgJ1Jlc3BvbnNlJyxcbiAgJ0hlYWRlcnMnLFxuXS5tYXAoa2luZE9mVGVzdCk7XG5cbi8qKlxuICogVHJpbSBleGNlc3Mgd2hpdGVzcGFjZSBvZmYgdGhlIGJlZ2lubmluZyBhbmQgZW5kIG9mIGEgc3RyaW5nXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IHN0ciBUaGUgU3RyaW5nIHRvIHRyaW1cbiAqXG4gKiBAcmV0dXJucyB7U3RyaW5nfSBUaGUgU3RyaW5nIGZyZWVkIG9mIGV4Y2VzcyB3aGl0ZXNwYWNlXG4gKi9cbmNvbnN0IHRyaW0gPSAoc3RyKSA9PiB7XG4gIHJldHVybiBzdHIudHJpbSA/IHN0ci50cmltKCkgOiBzdHIucmVwbGFjZSgvXltcXHNcXHVGRUZGXFx4QTBdK3xbXFxzXFx1RkVGRlxceEEwXSskL2csICcnKTtcbn07XG4vKipcbiAqIEl0ZXJhdGUgb3ZlciBhbiBBcnJheSBvciBhbiBPYmplY3QgaW52b2tpbmcgYSBmdW5jdGlvbiBmb3IgZWFjaCBpdGVtLlxuICpcbiAqIElmIGBvYmpgIGlzIGFuIEFycmF5IGNhbGxiYWNrIHdpbGwgYmUgY2FsbGVkIHBhc3NpbmdcbiAqIHRoZSB2YWx1ZSwgaW5kZXgsIGFuZCBjb21wbGV0ZSBhcnJheSBmb3IgZWFjaCBpdGVtLlxuICpcbiAqIElmICdvYmonIGlzIGFuIE9iamVjdCBjYWxsYmFjayB3aWxsIGJlIGNhbGxlZCBwYXNzaW5nXG4gKiB0aGUgdmFsdWUsIGtleSwgYW5kIGNvbXBsZXRlIG9iamVjdCBmb3IgZWFjaCBwcm9wZXJ0eS5cbiAqXG4gKiBAcGFyYW0ge09iamVjdHxBcnJheTx1bmtub3duPn0gb2JqIFRoZSBvYmplY3QgdG8gaXRlcmF0ZVxuICogQHBhcmFtIHtGdW5jdGlvbn0gZm4gVGhlIGNhbGxiYWNrIHRvIGludm9rZSBmb3IgZWFjaCBpdGVtXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IFtvcHRpb25zXVxuICogQHBhcmFtIHtCb29sZWFufSBbb3B0aW9ucy5hbGxPd25LZXlzID0gZmFsc2VdXG4gKiBAcmV0dXJucyB7YW55fVxuICovXG5mdW5jdGlvbiBmb3JFYWNoKG9iaiwgZm4sIHsgYWxsT3duS2V5cyA9IGZhbHNlIH0gPSB7fSkge1xuICAvLyBEb24ndCBib3RoZXIgaWYgbm8gdmFsdWUgcHJvdmlkZWRcbiAgaWYgKG9iaiA9PT0gbnVsbCB8fCB0eXBlb2Ygb2JqID09PSAndW5kZWZpbmVkJykge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIGxldCBpO1xuICBsZXQgbDtcblxuICAvLyBGb3JjZSBhbiBhcnJheSBpZiBub3QgYWxyZWFkeSBzb21ldGhpbmcgaXRlcmFibGVcbiAgaWYgKHR5cGVvZiBvYmogIT09ICdvYmplY3QnKSB7XG4gICAgLyplc2xpbnQgbm8tcGFyYW0tcmVhc3NpZ246MCovXG4gICAgb2JqID0gW29ial07XG4gIH1cblxuICBpZiAoaXNBcnJheShvYmopKSB7XG4gICAgLy8gSXRlcmF0ZSBvdmVyIGFycmF5IHZhbHVlc1xuICAgIGZvciAoaSA9IDAsIGwgPSBvYmoubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG4gICAgICBmbi5jYWxsKG51bGwsIG9ialtpXSwgaSwgb2JqKTtcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgLy8gQnVmZmVyIGNoZWNrXG4gICAgaWYgKGlzQnVmZmVyKG9iaikpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICAvLyBJdGVyYXRlIG92ZXIgb2JqZWN0IGtleXNcbiAgICBjb25zdCBrZXlzID0gYWxsT3duS2V5cyA/IE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKG9iaikgOiBPYmplY3Qua2V5cyhvYmopO1xuICAgIGNvbnN0IGxlbiA9IGtleXMubGVuZ3RoO1xuICAgIGxldCBrZXk7XG5cbiAgICBmb3IgKGkgPSAwOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgIGtleSA9IGtleXNbaV07XG4gICAgICBmbi5jYWxsKG51bGwsIG9ialtrZXldLCBrZXksIG9iaik7XG4gICAgfVxuICB9XG59XG5cbi8qKlxuICogRmluZHMgYSBrZXkgaW4gYW4gb2JqZWN0LCBjYXNlLWluc2Vuc2l0aXZlLCByZXR1cm5pbmcgdGhlIGFjdHVhbCBrZXkgbmFtZS5cbiAqIFJldHVybnMgbnVsbCBpZiB0aGUgb2JqZWN0IGlzIGEgQnVmZmVyIG9yIGlmIG5vIG1hdGNoIGlzIGZvdW5kLlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmogLSBUaGUgb2JqZWN0IHRvIHNlYXJjaC5cbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgLSBUaGUga2V5IHRvIGZpbmQgKGNhc2UtaW5zZW5zaXRpdmUpLlxuICogQHJldHVybnMgez9zdHJpbmd9IFRoZSBhY3R1YWwga2V5IG5hbWUgaWYgZm91bmQsIG90aGVyd2lzZSBudWxsLlxuICovXG5mdW5jdGlvbiBmaW5kS2V5KG9iaiwga2V5KSB7XG4gIGlmIChpc0J1ZmZlcihvYmopKSB7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICBrZXkgPSBrZXkudG9Mb3dlckNhc2UoKTtcbiAgY29uc3Qga2V5cyA9IE9iamVjdC5rZXlzKG9iaik7XG4gIGxldCBpID0ga2V5cy5sZW5ndGg7XG4gIGxldCBfa2V5O1xuICB3aGlsZSAoaS0tID4gMCkge1xuICAgIF9rZXkgPSBrZXlzW2ldO1xuICAgIGlmIChrZXkgPT09IF9rZXkudG9Mb3dlckNhc2UoKSkge1xuICAgICAgcmV0dXJuIF9rZXk7XG4gICAgfVxuICB9XG4gIHJldHVybiBudWxsO1xufVxuXG5jb25zdCBfZ2xvYmFsID0gKCgpID0+IHtcbiAgLyplc2xpbnQgbm8tdW5kZWY6MCovXG4gIGlmICh0eXBlb2YgZ2xvYmFsVGhpcyAhPT0gJ3VuZGVmaW5lZCcpIHJldHVybiBnbG9iYWxUaGlzO1xuICByZXR1cm4gdHlwZW9mIHNlbGYgIT09ICd1bmRlZmluZWQnID8gc2VsZiA6IHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnID8gd2luZG93IDogZ2xvYmFsO1xufSkoKTtcblxuY29uc3QgaXNDb250ZXh0RGVmaW5lZCA9IChjb250ZXh0KSA9PiAhaXNVbmRlZmluZWQoY29udGV4dCkgJiYgY29udGV4dCAhPT0gX2dsb2JhbDtcblxuLyoqXG4gKiBBY2NlcHRzIHZhcmFyZ3MgZXhwZWN0aW5nIGVhY2ggYXJndW1lbnQgdG8gYmUgYW4gb2JqZWN0LCB0aGVuXG4gKiBpbW11dGFibHkgbWVyZ2VzIHRoZSBwcm9wZXJ0aWVzIG9mIGVhY2ggb2JqZWN0IGFuZCByZXR1cm5zIHJlc3VsdC5cbiAqXG4gKiBXaGVuIG11bHRpcGxlIG9iamVjdHMgY29udGFpbiB0aGUgc2FtZSBrZXkgdGhlIGxhdGVyIG9iamVjdCBpblxuICogdGhlIGFyZ3VtZW50cyBsaXN0IHdpbGwgdGFrZSBwcmVjZWRlbmNlLlxuICpcbiAqIEV4YW1wbGU6XG4gKlxuICogYGBganNcbiAqIGNvbnN0IHJlc3VsdCA9IG1lcmdlKHtmb286IDEyM30sIHtmb286IDQ1Nn0pO1xuICogY29uc29sZS5sb2cocmVzdWx0LmZvbyk7IC8vIG91dHB1dHMgNDU2XG4gKiBgYGBcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqMSBPYmplY3QgdG8gbWVyZ2VcbiAqXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBSZXN1bHQgb2YgYWxsIG1lcmdlIHByb3BlcnRpZXNcbiAqL1xuZnVuY3Rpb24gbWVyZ2UoLi4ub2Jqcykge1xuICBjb25zdCB7IGNhc2VsZXNzLCBza2lwVW5kZWZpbmVkIH0gPSAoaXNDb250ZXh0RGVmaW5lZCh0aGlzKSAmJiB0aGlzKSB8fCB7fTtcbiAgY29uc3QgcmVzdWx0ID0ge307XG4gIGNvbnN0IGFzc2lnblZhbHVlID0gKHZhbCwga2V5KSA9PiB7XG4gICAgLy8gU2tpcCBkYW5nZXJvdXMgcHJvcGVydHkgbmFtZXMgdG8gcHJldmVudCBwcm90b3R5cGUgcG9sbHV0aW9uXG4gICAgaWYgKGtleSA9PT0gJ19fcHJvdG9fXycgfHwga2V5ID09PSAnY29uc3RydWN0b3InIHx8IGtleSA9PT0gJ3Byb3RvdHlwZScpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCB0YXJnZXRLZXkgPSAoY2FzZWxlc3MgJiYgZmluZEtleShyZXN1bHQsIGtleSkpIHx8IGtleTtcbiAgICAvLyBSZWFkIHZpYSBvd24tcHJvcCBvbmx5IOKAlCBhIGJhcmUgYHJlc3VsdFt0YXJnZXRLZXldYCB3YWxrcyB0aGUgcHJvdG90eXBlXG4gICAgLy8gY2hhaW4sIHNvIGEgcG9sbHV0ZWQgT2JqZWN0LnByb3RvdHlwZSB2YWx1ZSBjb3VsZCBzdXJmYWNlIGhlcmUgYW5kIGdldFxuICAgIC8vIGNvcGllZCBpbnRvIHRoZSBtZXJnZWQgcmVzdWx0LlxuICAgIGNvbnN0IGV4aXN0aW5nID0gaGFzT3duUHJvcGVydHkocmVzdWx0LCB0YXJnZXRLZXkpID8gcmVzdWx0W3RhcmdldEtleV0gOiB1bmRlZmluZWQ7XG4gICAgaWYgKGlzUGxhaW5PYmplY3QoZXhpc3RpbmcpICYmIGlzUGxhaW5PYmplY3QodmFsKSkge1xuICAgICAgcmVzdWx0W3RhcmdldEtleV0gPSBtZXJnZShleGlzdGluZywgdmFsKTtcbiAgICB9IGVsc2UgaWYgKGlzUGxhaW5PYmplY3QodmFsKSkge1xuICAgICAgcmVzdWx0W3RhcmdldEtleV0gPSBtZXJnZSh7fSwgdmFsKTtcbiAgICB9IGVsc2UgaWYgKGlzQXJyYXkodmFsKSkge1xuICAgICAgcmVzdWx0W3RhcmdldEtleV0gPSB2YWwuc2xpY2UoKTtcbiAgICB9IGVsc2UgaWYgKCFza2lwVW5kZWZpbmVkIHx8ICFpc1VuZGVmaW5lZCh2YWwpKSB7XG4gICAgICByZXN1bHRbdGFyZ2V0S2V5XSA9IHZhbDtcbiAgICB9XG4gIH07XG5cbiAgZm9yIChsZXQgaSA9IDAsIGwgPSBvYmpzLmxlbmd0aDsgaSA8IGw7IGkrKykge1xuICAgIG9ianNbaV0gJiYgZm9yRWFjaChvYmpzW2ldLCBhc3NpZ25WYWx1ZSk7XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuLyoqXG4gKiBFeHRlbmRzIG9iamVjdCBhIGJ5IG11dGFibHkgYWRkaW5nIHRvIGl0IHRoZSBwcm9wZXJ0aWVzIG9mIG9iamVjdCBiLlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBhIFRoZSBvYmplY3QgdG8gYmUgZXh0ZW5kZWRcbiAqIEBwYXJhbSB7T2JqZWN0fSBiIFRoZSBvYmplY3QgdG8gY29weSBwcm9wZXJ0aWVzIGZyb21cbiAqIEBwYXJhbSB7T2JqZWN0fSB0aGlzQXJnIFRoZSBvYmplY3QgdG8gYmluZCBmdW5jdGlvbiB0b1xuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBbb3B0aW9uc11cbiAqIEBwYXJhbSB7Qm9vbGVhbn0gW29wdGlvbnMuYWxsT3duS2V5c11cbiAqIEByZXR1cm5zIHtPYmplY3R9IFRoZSByZXN1bHRpbmcgdmFsdWUgb2Ygb2JqZWN0IGFcbiAqL1xuY29uc3QgZXh0ZW5kID0gKGEsIGIsIHRoaXNBcmcsIHsgYWxsT3duS2V5cyB9ID0ge30pID0+IHtcbiAgZm9yRWFjaChcbiAgICBiLFxuICAgICh2YWwsIGtleSkgPT4ge1xuICAgICAgaWYgKHRoaXNBcmcgJiYgaXNGdW5jdGlvbih2YWwpKSB7XG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShhLCBrZXksIHtcbiAgICAgICAgICAvLyBOdWxsLXByb3RvIGRlc2NyaXB0b3Igc28gYSBwb2xsdXRlZCBPYmplY3QucHJvdG90eXBlLmdldCBjYW5ub3RcbiAgICAgICAgICAvLyBoaWphY2sgZGVmaW5lUHJvcGVydHkncyBhY2Nlc3Nvci12cy1kYXRhIHJlc29sdXRpb24uXG4gICAgICAgICAgX19wcm90b19fOiBudWxsLFxuICAgICAgICAgIHZhbHVlOiBiaW5kKHZhbCwgdGhpc0FyZyksXG4gICAgICAgICAgd3JpdGFibGU6IHRydWUsXG4gICAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgICAgICBjb25maWd1cmFibGU6IHRydWUsXG4gICAgICAgIH0pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGEsIGtleSwge1xuICAgICAgICAgIF9fcHJvdG9fXzogbnVsbCxcbiAgICAgICAgICB2YWx1ZTogdmFsLFxuICAgICAgICAgIHdyaXRhYmxlOiB0cnVlLFxuICAgICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9LFxuICAgIHsgYWxsT3duS2V5cyB9XG4gICk7XG4gIHJldHVybiBhO1xufTtcblxuLyoqXG4gKiBSZW1vdmUgYnl0ZSBvcmRlciBtYXJrZXIuIFRoaXMgY2F0Y2hlcyBFRiBCQiBCRiAodGhlIFVURi04IEJPTSlcbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gY29udGVudCB3aXRoIEJPTVxuICpcbiAqIEByZXR1cm5zIHtzdHJpbmd9IGNvbnRlbnQgdmFsdWUgd2l0aG91dCBCT01cbiAqL1xuY29uc3Qgc3RyaXBCT00gPSAoY29udGVudCkgPT4ge1xuICBpZiAoY29udGVudC5jaGFyQ29kZUF0KDApID09PSAweGZlZmYpIHtcbiAgICBjb250ZW50ID0gY29udGVudC5zbGljZSgxKTtcbiAgfVxuICByZXR1cm4gY29udGVudDtcbn07XG5cbi8qKlxuICogSW5oZXJpdCB0aGUgcHJvdG90eXBlIG1ldGhvZHMgZnJvbSBvbmUgY29uc3RydWN0b3IgaW50byBhbm90aGVyXG4gKiBAcGFyYW0ge2Z1bmN0aW9ufSBjb25zdHJ1Y3RvclxuICogQHBhcmFtIHtmdW5jdGlvbn0gc3VwZXJDb25zdHJ1Y3RvclxuICogQHBhcmFtIHtvYmplY3R9IFtwcm9wc11cbiAqIEBwYXJhbSB7b2JqZWN0fSBbZGVzY3JpcHRvcnNdXG4gKlxuICogQHJldHVybnMge3ZvaWR9XG4gKi9cbmNvbnN0IGluaGVyaXRzID0gKGNvbnN0cnVjdG9yLCBzdXBlckNvbnN0cnVjdG9yLCBwcm9wcywgZGVzY3JpcHRvcnMpID0+IHtcbiAgY29uc3RydWN0b3IucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShzdXBlckNvbnN0cnVjdG9yLnByb3RvdHlwZSwgZGVzY3JpcHRvcnMpO1xuICBPYmplY3QuZGVmaW5lUHJvcGVydHkoY29uc3RydWN0b3IucHJvdG90eXBlLCAnY29uc3RydWN0b3InLCB7XG4gICAgX19wcm90b19fOiBudWxsLFxuICAgIHZhbHVlOiBjb25zdHJ1Y3RvcixcbiAgICB3cml0YWJsZTogdHJ1ZSxcbiAgICBlbnVtZXJhYmxlOiBmYWxzZSxcbiAgICBjb25maWd1cmFibGU6IHRydWUsXG4gIH0pO1xuICBPYmplY3QuZGVmaW5lUHJvcGVydHkoY29uc3RydWN0b3IsICdzdXBlcicsIHtcbiAgICBfX3Byb3RvX186IG51bGwsXG4gICAgdmFsdWU6IHN1cGVyQ29uc3RydWN0b3IucHJvdG90eXBlLFxuICB9KTtcbiAgcHJvcHMgJiYgT2JqZWN0LmFzc2lnbihjb25zdHJ1Y3Rvci5wcm90b3R5cGUsIHByb3BzKTtcbn07XG5cbi8qKlxuICogUmVzb2x2ZSBvYmplY3Qgd2l0aCBkZWVwIHByb3RvdHlwZSBjaGFpbiB0byBhIGZsYXQgb2JqZWN0XG4gKiBAcGFyYW0ge09iamVjdH0gc291cmNlT2JqIHNvdXJjZSBvYmplY3RcbiAqIEBwYXJhbSB7T2JqZWN0fSBbZGVzdE9ial1cbiAqIEBwYXJhbSB7RnVuY3Rpb258Qm9vbGVhbn0gW2ZpbHRlcl1cbiAqIEBwYXJhbSB7RnVuY3Rpb259IFtwcm9wRmlsdGVyXVxuICpcbiAqIEByZXR1cm5zIHtPYmplY3R9XG4gKi9cbmNvbnN0IHRvRmxhdE9iamVjdCA9IChzb3VyY2VPYmosIGRlc3RPYmosIGZpbHRlciwgcHJvcEZpbHRlcikgPT4ge1xuICBsZXQgcHJvcHM7XG4gIGxldCBpO1xuICBsZXQgcHJvcDtcbiAgY29uc3QgbWVyZ2VkID0ge307XG5cbiAgZGVzdE9iaiA9IGRlc3RPYmogfHwge307XG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1lcS1udWxsLGVxZXFlcVxuICBpZiAoc291cmNlT2JqID09IG51bGwpIHJldHVybiBkZXN0T2JqO1xuXG4gIGRvIHtcbiAgICBwcm9wcyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKHNvdXJjZU9iaik7XG4gICAgaSA9IHByb3BzLmxlbmd0aDtcbiAgICB3aGlsZSAoaS0tID4gMCkge1xuICAgICAgcHJvcCA9IHByb3BzW2ldO1xuICAgICAgaWYgKCghcHJvcEZpbHRlciB8fCBwcm9wRmlsdGVyKHByb3AsIHNvdXJjZU9iaiwgZGVzdE9iaikpICYmICFtZXJnZWRbcHJvcF0pIHtcbiAgICAgICAgZGVzdE9ialtwcm9wXSA9IHNvdXJjZU9ialtwcm9wXTtcbiAgICAgICAgbWVyZ2VkW3Byb3BdID0gdHJ1ZTtcbiAgICAgIH1cbiAgICB9XG4gICAgc291cmNlT2JqID0gZmlsdGVyICE9PSBmYWxzZSAmJiBnZXRQcm90b3R5cGVPZihzb3VyY2VPYmopO1xuICB9IHdoaWxlIChzb3VyY2VPYmogJiYgKCFmaWx0ZXIgfHwgZmlsdGVyKHNvdXJjZU9iaiwgZGVzdE9iaikpICYmIHNvdXJjZU9iaiAhPT0gT2JqZWN0LnByb3RvdHlwZSk7XG5cbiAgcmV0dXJuIGRlc3RPYmo7XG59O1xuXG4vKipcbiAqIERldGVybWluZXMgd2hldGhlciBhIHN0cmluZyBlbmRzIHdpdGggdGhlIGNoYXJhY3RlcnMgb2YgYSBzcGVjaWZpZWQgc3RyaW5nXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IHN0clxuICogQHBhcmFtIHtTdHJpbmd9IHNlYXJjaFN0cmluZ1xuICogQHBhcmFtIHtOdW1iZXJ9IFtwb3NpdGlvbj0gMF1cbiAqXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAqL1xuY29uc3QgZW5kc1dpdGggPSAoc3RyLCBzZWFyY2hTdHJpbmcsIHBvc2l0aW9uKSA9PiB7XG4gIHN0ciA9IFN0cmluZyhzdHIpO1xuICBpZiAocG9zaXRpb24gPT09IHVuZGVmaW5lZCB8fCBwb3NpdGlvbiA+IHN0ci5sZW5ndGgpIHtcbiAgICBwb3NpdGlvbiA9IHN0ci5sZW5ndGg7XG4gIH1cbiAgcG9zaXRpb24gLT0gc2VhcmNoU3RyaW5nLmxlbmd0aDtcbiAgY29uc3QgbGFzdEluZGV4ID0gc3RyLmluZGV4T2Yoc2VhcmNoU3RyaW5nLCBwb3NpdGlvbik7XG4gIHJldHVybiBsYXN0SW5kZXggIT09IC0xICYmIGxhc3RJbmRleCA9PT0gcG9zaXRpb247XG59O1xuXG4vKipcbiAqIFJldHVybnMgbmV3IGFycmF5IGZyb20gYXJyYXkgbGlrZSBvYmplY3Qgb3IgbnVsbCBpZiBmYWlsZWRcbiAqXG4gKiBAcGFyYW0geyp9IFt0aGluZ11cbiAqXG4gKiBAcmV0dXJucyB7P0FycmF5fVxuICovXG5jb25zdCB0b0FycmF5ID0gKHRoaW5nKSA9PiB7XG4gIGlmICghdGhpbmcpIHJldHVybiBudWxsO1xuICBpZiAoaXNBcnJheSh0aGluZykpIHJldHVybiB0aGluZztcbiAgbGV0IGkgPSB0aGluZy5sZW5ndGg7XG4gIGlmICghaXNOdW1iZXIoaSkpIHJldHVybiBudWxsO1xuICBjb25zdCBhcnIgPSBuZXcgQXJyYXkoaSk7XG4gIHdoaWxlIChpLS0gPiAwKSB7XG4gICAgYXJyW2ldID0gdGhpbmdbaV07XG4gIH1cbiAgcmV0dXJuIGFycjtcbn07XG5cbi8qKlxuICogQ2hlY2tpbmcgaWYgdGhlIFVpbnQ4QXJyYXkgZXhpc3RzIGFuZCBpZiBpdCBkb2VzLCBpdCByZXR1cm5zIGEgZnVuY3Rpb24gdGhhdCBjaGVja3MgaWYgdGhlXG4gKiB0aGluZyBwYXNzZWQgaW4gaXMgYW4gaW5zdGFuY2Ugb2YgVWludDhBcnJheVxuICpcbiAqIEBwYXJhbSB7VHlwZWRBcnJheX1cbiAqXG4gKiBAcmV0dXJucyB7QXJyYXl9XG4gKi9cbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBmdW5jLW5hbWVzXG5jb25zdCBpc1R5cGVkQXJyYXkgPSAoKFR5cGVkQXJyYXkpID0+IHtcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGZ1bmMtbmFtZXNcbiAgcmV0dXJuICh0aGluZykgPT4ge1xuICAgIHJldHVybiBUeXBlZEFycmF5ICYmIHRoaW5nIGluc3RhbmNlb2YgVHlwZWRBcnJheTtcbiAgfTtcbn0pKHR5cGVvZiBVaW50OEFycmF5ICE9PSAndW5kZWZpbmVkJyAmJiBnZXRQcm90b3R5cGVPZihVaW50OEFycmF5KSk7XG5cbi8qKlxuICogRm9yIGVhY2ggZW50cnkgaW4gdGhlIG9iamVjdCwgY2FsbCB0aGUgZnVuY3Rpb24gd2l0aCB0aGUga2V5IGFuZCB2YWx1ZS5cbiAqXG4gKiBAcGFyYW0ge09iamVjdDxhbnksIGFueT59IG9iaiAtIFRoZSBvYmplY3QgdG8gaXRlcmF0ZSBvdmVyLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gZm4gLSBUaGUgZnVuY3Rpb24gdG8gY2FsbCBmb3IgZWFjaCBlbnRyeS5cbiAqXG4gKiBAcmV0dXJucyB7dm9pZH1cbiAqL1xuY29uc3QgZm9yRWFjaEVudHJ5ID0gKG9iaiwgZm4pID0+IHtcbiAgY29uc3QgZ2VuZXJhdG9yID0gb2JqICYmIG9ialtpdGVyYXRvcl07XG5cbiAgY29uc3QgX2l0ZXJhdG9yID0gZ2VuZXJhdG9yLmNhbGwob2JqKTtcblxuICBsZXQgcmVzdWx0O1xuXG4gIHdoaWxlICgocmVzdWx0ID0gX2l0ZXJhdG9yLm5leHQoKSkgJiYgIXJlc3VsdC5kb25lKSB7XG4gICAgY29uc3QgcGFpciA9IHJlc3VsdC52YWx1ZTtcbiAgICBmbi5jYWxsKG9iaiwgcGFpclswXSwgcGFpclsxXSk7XG4gIH1cbn07XG5cbi8qKlxuICogSXQgdGFrZXMgYSByZWd1bGFyIGV4cHJlc3Npb24gYW5kIGEgc3RyaW5nLCBhbmQgcmV0dXJucyBhbiBhcnJheSBvZiBhbGwgdGhlIG1hdGNoZXNcbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gcmVnRXhwIC0gVGhlIHJlZ3VsYXIgZXhwcmVzc2lvbiB0byBtYXRjaCBhZ2FpbnN0LlxuICogQHBhcmFtIHtzdHJpbmd9IHN0ciAtIFRoZSBzdHJpbmcgdG8gc2VhcmNoLlxuICpcbiAqIEByZXR1cm5zIHtBcnJheTxib29sZWFuPn1cbiAqL1xuY29uc3QgbWF0Y2hBbGwgPSAocmVnRXhwLCBzdHIpID0+IHtcbiAgbGV0IG1hdGNoZXM7XG4gIGNvbnN0IGFyciA9IFtdO1xuXG4gIHdoaWxlICgobWF0Y2hlcyA9IHJlZ0V4cC5leGVjKHN0cikpICE9PSBudWxsKSB7XG4gICAgYXJyLnB1c2gobWF0Y2hlcyk7XG4gIH1cblxuICByZXR1cm4gYXJyO1xufTtcblxuLyogQ2hlY2tpbmcgaWYgdGhlIGtpbmRPZlRlc3QgZnVuY3Rpb24gcmV0dXJucyB0cnVlIHdoZW4gcGFzc2VkIGFuIEhUTUxGb3JtRWxlbWVudC4gKi9cbmNvbnN0IGlzSFRNTEZvcm0gPSBraW5kT2ZUZXN0KCdIVE1MRm9ybUVsZW1lbnQnKTtcblxuY29uc3QgdG9DYW1lbENhc2UgPSAoc3RyKSA9PiB7XG4gIHJldHVybiBzdHIudG9Mb3dlckNhc2UoKS5yZXBsYWNlKC9bLV9cXHNdKFthLXpcXGRdKShcXHcqKS9nLCBmdW5jdGlvbiByZXBsYWNlcihtLCBwMSwgcDIpIHtcbiAgICByZXR1cm4gcDEudG9VcHBlckNhc2UoKSArIHAyO1xuICB9KTtcbn07XG5cbi8qIENyZWF0aW5nIGEgZnVuY3Rpb24gdGhhdCB3aWxsIGNoZWNrIGlmIGFuIG9iamVjdCBoYXMgYSBwcm9wZXJ0eS4gKi9cbmNvbnN0IGhhc093blByb3BlcnR5ID0gKFxuICAoeyBoYXNPd25Qcm9wZXJ0eSB9KSA9PlxuICAob2JqLCBwcm9wKSA9PlxuICAgIGhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKVxuKShPYmplY3QucHJvdG90eXBlKTtcblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhIFJlZ0V4cCBvYmplY3RcbiAqXG4gKiBAcGFyYW0geyp9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICpcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGEgUmVnRXhwIG9iamVjdCwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmNvbnN0IGlzUmVnRXhwID0ga2luZE9mVGVzdCgnUmVnRXhwJyk7XG5cbmNvbnN0IHJlZHVjZURlc2NyaXB0b3JzID0gKG9iaiwgcmVkdWNlcikgPT4ge1xuICBjb25zdCBkZXNjcmlwdG9ycyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3JzKG9iaik7XG4gIGNvbnN0IHJlZHVjZWREZXNjcmlwdG9ycyA9IHt9O1xuXG4gIGZvckVhY2goZGVzY3JpcHRvcnMsIChkZXNjcmlwdG9yLCBuYW1lKSA9PiB7XG4gICAgbGV0IHJldDtcbiAgICBpZiAoKHJldCA9IHJlZHVjZXIoZGVzY3JpcHRvciwgbmFtZSwgb2JqKSkgIT09IGZhbHNlKSB7XG4gICAgICByZWR1Y2VkRGVzY3JpcHRvcnNbbmFtZV0gPSByZXQgfHwgZGVzY3JpcHRvcjtcbiAgICB9XG4gIH0pO1xuXG4gIE9iamVjdC5kZWZpbmVQcm9wZXJ0aWVzKG9iaiwgcmVkdWNlZERlc2NyaXB0b3JzKTtcbn07XG5cbi8qKlxuICogTWFrZXMgYWxsIG1ldGhvZHMgcmVhZC1vbmx5XG4gKiBAcGFyYW0ge09iamVjdH0gb2JqXG4gKi9cblxuY29uc3QgZnJlZXplTWV0aG9kcyA9IChvYmopID0+IHtcbiAgcmVkdWNlRGVzY3JpcHRvcnMob2JqLCAoZGVzY3JpcHRvciwgbmFtZSkgPT4ge1xuICAgIC8vIHNraXAgcmVzdHJpY3RlZCBwcm9wcyBpbiBzdHJpY3QgbW9kZVxuICAgIGlmIChpc0Z1bmN0aW9uKG9iaikgJiYgWydhcmd1bWVudHMnLCAnY2FsbGVyJywgJ2NhbGxlZSddLmluY2x1ZGVzKG5hbWUpKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgY29uc3QgdmFsdWUgPSBvYmpbbmFtZV07XG5cbiAgICBpZiAoIWlzRnVuY3Rpb24odmFsdWUpKSByZXR1cm47XG5cbiAgICBkZXNjcmlwdG9yLmVudW1lcmFibGUgPSBmYWxzZTtcblxuICAgIGlmICgnd3JpdGFibGUnIGluIGRlc2NyaXB0b3IpIHtcbiAgICAgIGRlc2NyaXB0b3Iud3JpdGFibGUgPSBmYWxzZTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpZiAoIWRlc2NyaXB0b3Iuc2V0KSB7XG4gICAgICBkZXNjcmlwdG9yLnNldCA9ICgpID0+IHtcbiAgICAgICAgdGhyb3cgRXJyb3IoXCJDYW4gbm90IHJld3JpdGUgcmVhZC1vbmx5IG1ldGhvZCAnXCIgKyBuYW1lICsgXCInXCIpO1xuICAgICAgfTtcbiAgICB9XG4gIH0pO1xufTtcblxuLyoqXG4gKiBDb252ZXJ0cyBhbiBhcnJheSBvciBhIGRlbGltaXRlZCBzdHJpbmcgaW50byBhbiBvYmplY3Qgc2V0IHdpdGggdmFsdWVzIGFzIGtleXMgYW5kIHRydWUgYXMgdmFsdWVzLlxuICogVXNlZnVsIGZvciBmYXN0IG1lbWJlcnNoaXAgY2hlY2tzLlxuICpcbiAqIEBwYXJhbSB7QXJyYXl8c3RyaW5nfSBhcnJheU9yU3RyaW5nIC0gVGhlIGFycmF5IG9yIHN0cmluZyB0byBjb252ZXJ0LlxuICogQHBhcmFtIHtzdHJpbmd9IGRlbGltaXRlciAtIFRoZSBkZWxpbWl0ZXIgdG8gdXNlIGlmIGlucHV0IGlzIGEgc3RyaW5nLlxuICogQHJldHVybnMge09iamVjdH0gQW4gb2JqZWN0IHdpdGgga2V5cyBmcm9tIHRoZSBhcnJheSBvciBzdHJpbmcsIHZhbHVlcyBzZXQgdG8gdHJ1ZS5cbiAqL1xuY29uc3QgdG9PYmplY3RTZXQgPSAoYXJyYXlPclN0cmluZywgZGVsaW1pdGVyKSA9PiB7XG4gIGNvbnN0IG9iaiA9IHt9O1xuXG4gIGNvbnN0IGRlZmluZSA9IChhcnIpID0+IHtcbiAgICBhcnIuZm9yRWFjaCgodmFsdWUpID0+IHtcbiAgICAgIG9ialt2YWx1ZV0gPSB0cnVlO1xuICAgIH0pO1xuICB9O1xuXG4gIGlzQXJyYXkoYXJyYXlPclN0cmluZykgPyBkZWZpbmUoYXJyYXlPclN0cmluZykgOiBkZWZpbmUoU3RyaW5nKGFycmF5T3JTdHJpbmcpLnNwbGl0KGRlbGltaXRlcikpO1xuXG4gIHJldHVybiBvYmo7XG59O1xuXG5jb25zdCBub29wID0gKCkgPT4ge307XG5cbmNvbnN0IHRvRmluaXRlTnVtYmVyID0gKHZhbHVlLCBkZWZhdWx0VmFsdWUpID0+IHtcbiAgcmV0dXJuIHZhbHVlICE9IG51bGwgJiYgTnVtYmVyLmlzRmluaXRlKCh2YWx1ZSA9ICt2YWx1ZSkpID8gdmFsdWUgOiBkZWZhdWx0VmFsdWU7XG59O1xuXG4vKipcbiAqIElmIHRoZSB0aGluZyBpcyBhIEZvcm1EYXRhIG9iamVjdCwgcmV0dXJuIHRydWUsIG90aGVyd2lzZSByZXR1cm4gZmFsc2UuXG4gKlxuICogQHBhcmFtIHt1bmtub3dufSB0aGluZyAtIFRoZSB0aGluZyB0byBjaGVjay5cbiAqXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAqL1xuZnVuY3Rpb24gaXNTcGVjQ29tcGxpYW50Rm9ybSh0aGluZykge1xuICByZXR1cm4gISEoXG4gICAgdGhpbmcgJiZcbiAgICBpc0Z1bmN0aW9uKHRoaW5nLmFwcGVuZCkgJiZcbiAgICB0aGluZ1t0b1N0cmluZ1RhZ10gPT09ICdGb3JtRGF0YScgJiZcbiAgICB0aGluZ1tpdGVyYXRvcl1cbiAgKTtcbn1cblxuLyoqXG4gKiBSZWN1cnNpdmVseSBjb252ZXJ0cyBhbiBvYmplY3QgdG8gYSBKU09OLWNvbXBhdGlibGUgb2JqZWN0LCBoYW5kbGluZyBjaXJjdWxhciByZWZlcmVuY2VzIGFuZCBCdWZmZXJzLlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmogLSBUaGUgb2JqZWN0IHRvIGNvbnZlcnQuXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBUaGUgSlNPTi1jb21wYXRpYmxlIG9iamVjdC5cbiAqL1xuY29uc3QgdG9KU09OT2JqZWN0ID0gKG9iaikgPT4ge1xuICBjb25zdCBzdGFjayA9IG5ldyBBcnJheSgxMCk7XG5cbiAgY29uc3QgdmlzaXQgPSAoc291cmNlLCBpKSA9PiB7XG4gICAgaWYgKGlzT2JqZWN0KHNvdXJjZSkpIHtcbiAgICAgIGlmIChzdGFjay5pbmRleE9mKHNvdXJjZSkgPj0gMCkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIC8vQnVmZmVyIGNoZWNrXG4gICAgICBpZiAoaXNCdWZmZXIoc291cmNlKSkge1xuICAgICAgICByZXR1cm4gc291cmNlO1xuICAgICAgfVxuXG4gICAgICBpZiAoISgndG9KU09OJyBpbiBzb3VyY2UpKSB7XG4gICAgICAgIHN0YWNrW2ldID0gc291cmNlO1xuICAgICAgICBjb25zdCB0YXJnZXQgPSBpc0FycmF5KHNvdXJjZSkgPyBbXSA6IHt9O1xuXG4gICAgICAgIGZvckVhY2goc291cmNlLCAodmFsdWUsIGtleSkgPT4ge1xuICAgICAgICAgIGNvbnN0IHJlZHVjZWRWYWx1ZSA9IHZpc2l0KHZhbHVlLCBpICsgMSk7XG4gICAgICAgICAgIWlzVW5kZWZpbmVkKHJlZHVjZWRWYWx1ZSkgJiYgKHRhcmdldFtrZXldID0gcmVkdWNlZFZhbHVlKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgc3RhY2tbaV0gPSB1bmRlZmluZWQ7XG5cbiAgICAgICAgcmV0dXJuIHRhcmdldDtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gc291cmNlO1xuICB9O1xuXG4gIHJldHVybiB2aXNpdChvYmosIDApO1xufTtcblxuLyoqXG4gKiBEZXRlcm1pbmVzIGlmIGEgdmFsdWUgaXMgYW4gYXN5bmMgZnVuY3Rpb24uXG4gKlxuICogQHBhcmFtIHsqfSB0aGluZyAtIFRoZSB2YWx1ZSB0byB0ZXN0LlxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYW4gYXN5bmMgZnVuY3Rpb24sIG90aGVyd2lzZSBmYWxzZS5cbiAqL1xuY29uc3QgaXNBc3luY0ZuID0ga2luZE9mVGVzdCgnQXN5bmNGdW5jdGlvbicpO1xuXG4vKipcbiAqIERldGVybWluZXMgaWYgYSB2YWx1ZSBpcyB0aGVuYWJsZSAoaGFzIHRoZW4gYW5kIGNhdGNoIG1ldGhvZHMpLlxuICpcbiAqIEBwYXJhbSB7Kn0gdGhpbmcgLSBUaGUgdmFsdWUgdG8gdGVzdC5cbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIHRoZW5hYmxlLCBvdGhlcndpc2UgZmFsc2UuXG4gKi9cbmNvbnN0IGlzVGhlbmFibGUgPSAodGhpbmcpID0+XG4gIHRoaW5nICYmXG4gIChpc09iamVjdCh0aGluZykgfHwgaXNGdW5jdGlvbih0aGluZykpICYmXG4gIGlzRnVuY3Rpb24odGhpbmcudGhlbikgJiZcbiAgaXNGdW5jdGlvbih0aGluZy5jYXRjaCk7XG5cbi8vIG9yaWdpbmFsIGNvZGVcbi8vIGh0dHBzOi8vZ2l0aHViLmNvbS9EaWdpdGFsQnJhaW5KUy9BeGlvc1Byb21pc2UvYmxvYi8xNmRlYWIxMzcxMGVjMDk3Nzk5MjIxMzFmM2ZhNTk1NDMyMGY4M2FiL2xpYi91dGlscy5qcyNMMTEtTDM0XG5cbi8qKlxuICogUHJvdmlkZXMgYSBjcm9zcy1wbGF0Zm9ybSBzZXRJbW1lZGlhdGUgaW1wbGVtZW50YXRpb24uXG4gKiBVc2VzIG5hdGl2ZSBzZXRJbW1lZGlhdGUgaWYgYXZhaWxhYmxlLCBvdGhlcndpc2UgZmFsbHMgYmFjayB0byBwb3N0TWVzc2FnZSBvciBzZXRUaW1lb3V0LlxuICpcbiAqIEBwYXJhbSB7Ym9vbGVhbn0gc2V0SW1tZWRpYXRlU3VwcG9ydGVkIC0gV2hldGhlciBzZXRJbW1lZGlhdGUgaXMgc3VwcG9ydGVkLlxuICogQHBhcmFtIHtib29sZWFufSBwb3N0TWVzc2FnZVN1cHBvcnRlZCAtIFdoZXRoZXIgcG9zdE1lc3NhZ2UgaXMgc3VwcG9ydGVkLlxuICogQHJldHVybnMge0Z1bmN0aW9ufSBBIGZ1bmN0aW9uIHRvIHNjaGVkdWxlIGEgY2FsbGJhY2sgYXN5bmNocm9ub3VzbHkuXG4gKi9cbmNvbnN0IF9zZXRJbW1lZGlhdGUgPSAoKHNldEltbWVkaWF0ZVN1cHBvcnRlZCwgcG9zdE1lc3NhZ2VTdXBwb3J0ZWQpID0+IHtcbiAgaWYgKHNldEltbWVkaWF0ZVN1cHBvcnRlZCkge1xuICAgIHJldHVybiBzZXRJbW1lZGlhdGU7XG4gIH1cblxuICByZXR1cm4gcG9zdE1lc3NhZ2VTdXBwb3J0ZWRcbiAgICA/ICgodG9rZW4sIGNhbGxiYWNrcykgPT4ge1xuICAgICAgICBfZ2xvYmFsLmFkZEV2ZW50TGlzdGVuZXIoXG4gICAgICAgICAgJ21lc3NhZ2UnLFxuICAgICAgICAgICh7IHNvdXJjZSwgZGF0YSB9KSA9PiB7XG4gICAgICAgICAgICBpZiAoc291cmNlID09PSBfZ2xvYmFsICYmIGRhdGEgPT09IHRva2VuKSB7XG4gICAgICAgICAgICAgIGNhbGxiYWNrcy5sZW5ndGggJiYgY2FsbGJhY2tzLnNoaWZ0KCkoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9LFxuICAgICAgICAgIGZhbHNlXG4gICAgICAgICk7XG5cbiAgICAgICAgcmV0dXJuIChjYikgPT4ge1xuICAgICAgICAgIGNhbGxiYWNrcy5wdXNoKGNiKTtcbiAgICAgICAgICBfZ2xvYmFsLnBvc3RNZXNzYWdlKHRva2VuLCAnKicpO1xuICAgICAgICB9O1xuICAgICAgfSkoYGF4aW9zQCR7TWF0aC5yYW5kb20oKX1gLCBbXSlcbiAgICA6IChjYikgPT4gc2V0VGltZW91dChjYik7XG59KSh0eXBlb2Ygc2V0SW1tZWRpYXRlID09PSAnZnVuY3Rpb24nLCBpc0Z1bmN0aW9uKF9nbG9iYWwucG9zdE1lc3NhZ2UpKTtcblxuLyoqXG4gKiBTY2hlZHVsZXMgYSBtaWNyb3Rhc2sgb3IgYXN5bmNocm9ub3VzIGNhbGxiYWNrIGFzIHNvb24gYXMgcG9zc2libGUuXG4gKiBVc2VzIHF1ZXVlTWljcm90YXNrIGlmIGF2YWlsYWJsZSwgb3RoZXJ3aXNlIGZhbGxzIGJhY2sgdG8gcHJvY2Vzcy5uZXh0VGljayBvciBfc2V0SW1tZWRpYXRlLlxuICpcbiAqIEB0eXBlIHtGdW5jdGlvbn1cbiAqL1xuY29uc3QgYXNhcCA9XG4gIHR5cGVvZiBxdWV1ZU1pY3JvdGFzayAhPT0gJ3VuZGVmaW5lZCdcbiAgICA/IHF1ZXVlTWljcm90YXNrLmJpbmQoX2dsb2JhbClcbiAgICA6ICh0eXBlb2YgcHJvY2VzcyAhPT0gJ3VuZGVmaW5lZCcgJiYgcHJvY2Vzcy5uZXh0VGljaykgfHwgX3NldEltbWVkaWF0ZTtcblxuLy8gKioqKioqKioqKioqKioqKioqKioqXG5cbmNvbnN0IGlzSXRlcmFibGUgPSAodGhpbmcpID0+IHRoaW5nICE9IG51bGwgJiYgaXNGdW5jdGlvbih0aGluZ1tpdGVyYXRvcl0pO1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gIGlzQXJyYXksXG4gIGlzQXJyYXlCdWZmZXIsXG4gIGlzQnVmZmVyLFxuICBpc0Zvcm1EYXRhLFxuICBpc0FycmF5QnVmZmVyVmlldyxcbiAgaXNTdHJpbmcsXG4gIGlzTnVtYmVyLFxuICBpc0Jvb2xlYW4sXG4gIGlzT2JqZWN0LFxuICBpc1BsYWluT2JqZWN0LFxuICBpc0VtcHR5T2JqZWN0LFxuICBpc1JlYWRhYmxlU3RyZWFtLFxuICBpc1JlcXVlc3QsXG4gIGlzUmVzcG9uc2UsXG4gIGlzSGVhZGVycyxcbiAgaXNVbmRlZmluZWQsXG4gIGlzRGF0ZSxcbiAgaXNGaWxlLFxuICBpc1JlYWN0TmF0aXZlQmxvYixcbiAgaXNSZWFjdE5hdGl2ZSxcbiAgaXNCbG9iLFxuICBpc1JlZ0V4cCxcbiAgaXNGdW5jdGlvbixcbiAgaXNTdHJlYW0sXG4gIGlzVVJMU2VhcmNoUGFyYW1zLFxuICBpc1R5cGVkQXJyYXksXG4gIGlzRmlsZUxpc3QsXG4gIGZvckVhY2gsXG4gIG1lcmdlLFxuICBleHRlbmQsXG4gIHRyaW0sXG4gIHN0cmlwQk9NLFxuICBpbmhlcml0cyxcbiAgdG9GbGF0T2JqZWN0LFxuICBraW5kT2YsXG4gIGtpbmRPZlRlc3QsXG4gIGVuZHNXaXRoLFxuICB0b0FycmF5LFxuICBmb3JFYWNoRW50cnksXG4gIG1hdGNoQWxsLFxuICBpc0hUTUxGb3JtLFxuICBoYXNPd25Qcm9wZXJ0eSxcbiAgaGFzT3duUHJvcDogaGFzT3duUHJvcGVydHksIC8vIGFuIGFsaWFzIHRvIGF2b2lkIEVTTGludCBuby1wcm90b3R5cGUtYnVpbHRpbnMgZGV0ZWN0aW9uXG4gIHJlZHVjZURlc2NyaXB0b3JzLFxuICBmcmVlemVNZXRob2RzLFxuICB0b09iamVjdFNldCxcbiAgdG9DYW1lbENhc2UsXG4gIG5vb3AsXG4gIHRvRmluaXRlTnVtYmVyLFxuICBmaW5kS2V5LFxuICBnbG9iYWw6IF9nbG9iYWwsXG4gIGlzQ29udGV4dERlZmluZWQsXG4gIGlzU3BlY0NvbXBsaWFudEZvcm0sXG4gIHRvSlNPTk9iamVjdCxcbiAgaXNBc3luY0ZuLFxuICBpc1RoZW5hYmxlLFxuICBzZXRJbW1lZGlhdGU6IF9zZXRJbW1lZGlhdGUsXG4gIGFzYXAsXG4gIGlzSXRlcmFibGUsXG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQgdXRpbHMgZnJvbSAnLi4vdXRpbHMuanMnO1xuXG4vLyBSYXdBeGlvc0hlYWRlcnMgd2hvc2UgZHVwbGljYXRlcyBhcmUgaWdub3JlZCBieSBub2RlXG4vLyBjLmYuIGh0dHBzOi8vbm9kZWpzLm9yZy9hcGkvaHR0cC5odG1sI2h0dHBfbWVzc2FnZV9oZWFkZXJzXG5jb25zdCBpZ25vcmVEdXBsaWNhdGVPZiA9IHV0aWxzLnRvT2JqZWN0U2V0KFtcbiAgJ2FnZScsXG4gICdhdXRob3JpemF0aW9uJyxcbiAgJ2NvbnRlbnQtbGVuZ3RoJyxcbiAgJ2NvbnRlbnQtdHlwZScsXG4gICdldGFnJyxcbiAgJ2V4cGlyZXMnLFxuICAnZnJvbScsXG4gICdob3N0JyxcbiAgJ2lmLW1vZGlmaWVkLXNpbmNlJyxcbiAgJ2lmLXVubW9kaWZpZWQtc2luY2UnLFxuICAnbGFzdC1tb2RpZmllZCcsXG4gICdsb2NhdGlvbicsXG4gICdtYXgtZm9yd2FyZHMnLFxuICAncHJveHktYXV0aG9yaXphdGlvbicsXG4gICdyZWZlcmVyJyxcbiAgJ3JldHJ5LWFmdGVyJyxcbiAgJ3VzZXItYWdlbnQnLFxuXSk7XG5cbi8qKlxuICogUGFyc2UgaGVhZGVycyBpbnRvIGFuIG9iamVjdFxuICpcbiAqIGBgYFxuICogRGF0ZTogV2VkLCAyNyBBdWcgMjAxNCAwODo1ODo0OSBHTVRcbiAqIENvbnRlbnQtVHlwZTogYXBwbGljYXRpb24vanNvblxuICogQ29ubmVjdGlvbjoga2VlcC1hbGl2ZVxuICogVHJhbnNmZXItRW5jb2Rpbmc6IGNodW5rZWRcbiAqIGBgYFxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSByYXdIZWFkZXJzIEhlYWRlcnMgbmVlZGluZyB0byBiZSBwYXJzZWRcbiAqXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBIZWFkZXJzIHBhcnNlZCBpbnRvIGFuIG9iamVjdFxuICovXG5leHBvcnQgZGVmYXVsdCAocmF3SGVhZGVycykgPT4ge1xuICBjb25zdCBwYXJzZWQgPSB7fTtcbiAgbGV0IGtleTtcbiAgbGV0IHZhbDtcbiAgbGV0IGk7XG5cbiAgcmF3SGVhZGVycyAmJlxuICAgIHJhd0hlYWRlcnMuc3BsaXQoJ1xcbicpLmZvckVhY2goZnVuY3Rpb24gcGFyc2VyKGxpbmUpIHtcbiAgICAgIGkgPSBsaW5lLmluZGV4T2YoJzonKTtcbiAgICAgIGtleSA9IGxpbmUuc3Vic3RyaW5nKDAsIGkpLnRyaW0oKS50b0xvd2VyQ2FzZSgpO1xuICAgICAgdmFsID0gbGluZS5zdWJzdHJpbmcoaSArIDEpLnRyaW0oKTtcblxuICAgICAgaWYgKCFrZXkgfHwgKHBhcnNlZFtrZXldICYmIGlnbm9yZUR1cGxpY2F0ZU9mW2tleV0pKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgaWYgKGtleSA9PT0gJ3NldC1jb29raWUnKSB7XG4gICAgICAgIGlmIChwYXJzZWRba2V5XSkge1xuICAgICAgICAgIHBhcnNlZFtrZXldLnB1c2godmFsKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBwYXJzZWRba2V5XSA9IFt2YWxdO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBwYXJzZWRba2V5XSA9IHBhcnNlZFtrZXldID8gcGFyc2VkW2tleV0gKyAnLCAnICsgdmFsIDogdmFsO1xuICAgICAgfVxuICAgIH0pO1xuXG4gIHJldHVybiBwYXJzZWQ7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQgdXRpbHMgZnJvbSAnLi4vdXRpbHMuanMnO1xuaW1wb3J0IHBhcnNlSGVhZGVycyBmcm9tICcuLi9oZWxwZXJzL3BhcnNlSGVhZGVycy5qcyc7XG5cbmNvbnN0ICRpbnRlcm5hbHMgPSBTeW1ib2woJ2ludGVybmFscycpO1xuXG5jb25zdCBJTlZBTElEX0hFQURFUl9WQUxVRV9DSEFSU19SRSA9IC9bXlxceDA5XFx4MjAtXFx4N0VcXHg4MC1cXHhGRl0vZztcblxuZnVuY3Rpb24gdHJpbVNQb3JIVEFCKHN0cikge1xuICBsZXQgc3RhcnQgPSAwO1xuICBsZXQgZW5kID0gc3RyLmxlbmd0aDtcblxuICB3aGlsZSAoc3RhcnQgPCBlbmQpIHtcbiAgICBjb25zdCBjb2RlID0gc3RyLmNoYXJDb2RlQXQoc3RhcnQpO1xuXG4gICAgaWYgKGNvZGUgIT09IDB4MDkgJiYgY29kZSAhPT0gMHgyMCkge1xuICAgICAgYnJlYWs7XG4gICAgfVxuXG4gICAgc3RhcnQgKz0gMTtcbiAgfVxuXG4gIHdoaWxlIChlbmQgPiBzdGFydCkge1xuICAgIGNvbnN0IGNvZGUgPSBzdHIuY2hhckNvZGVBdChlbmQgLSAxKTtcblxuICAgIGlmIChjb2RlICE9PSAweDA5ICYmIGNvZGUgIT09IDB4MjApIHtcbiAgICAgIGJyZWFrO1xuICAgIH1cblxuICAgIGVuZCAtPSAxO1xuICB9XG5cbiAgcmV0dXJuIHN0YXJ0ID09PSAwICYmIGVuZCA9PT0gc3RyLmxlbmd0aCA/IHN0ciA6IHN0ci5zbGljZShzdGFydCwgZW5kKTtcbn1cblxuZnVuY3Rpb24gbm9ybWFsaXplSGVhZGVyKGhlYWRlcikge1xuICByZXR1cm4gaGVhZGVyICYmIFN0cmluZyhoZWFkZXIpLnRyaW0oKS50b0xvd2VyQ2FzZSgpO1xufVxuXG5mdW5jdGlvbiBzYW5pdGl6ZUhlYWRlclZhbHVlKHN0cikge1xuICByZXR1cm4gdHJpbVNQb3JIVEFCKHN0ci5yZXBsYWNlKElOVkFMSURfSEVBREVSX1ZBTFVFX0NIQVJTX1JFLCAnJykpO1xufVxuXG5mdW5jdGlvbiBub3JtYWxpemVWYWx1ZSh2YWx1ZSkge1xuICBpZiAodmFsdWUgPT09IGZhbHNlIHx8IHZhbHVlID09IG51bGwpIHtcbiAgICByZXR1cm4gdmFsdWU7XG4gIH1cblxuICByZXR1cm4gdXRpbHMuaXNBcnJheSh2YWx1ZSkgPyB2YWx1ZS5tYXAobm9ybWFsaXplVmFsdWUpIDogc2FuaXRpemVIZWFkZXJWYWx1ZShTdHJpbmcodmFsdWUpKTtcbn1cblxuZnVuY3Rpb24gcGFyc2VUb2tlbnMoc3RyKSB7XG4gIGNvbnN0IHRva2VucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gIGNvbnN0IHRva2Vuc1JFID0gLyhbXlxccyw7PV0rKVxccyooPzo9XFxzKihbXiw7XSspKT8vZztcbiAgbGV0IG1hdGNoO1xuXG4gIHdoaWxlICgobWF0Y2ggPSB0b2tlbnNSRS5leGVjKHN0cikpKSB7XG4gICAgdG9rZW5zW21hdGNoWzFdXSA9IG1hdGNoWzJdO1xuICB9XG5cbiAgcmV0dXJuIHRva2Vucztcbn1cblxuY29uc3QgaXNWYWxpZEhlYWRlck5hbWUgPSAoc3RyKSA9PiAvXlstX2EtekEtWjAtOV5gfH4sISMkJSYnKisuXSskLy50ZXN0KHN0ci50cmltKCkpO1xuXG5mdW5jdGlvbiBtYXRjaEhlYWRlclZhbHVlKGNvbnRleHQsIHZhbHVlLCBoZWFkZXIsIGZpbHRlciwgaXNIZWFkZXJOYW1lRmlsdGVyKSB7XG4gIGlmICh1dGlscy5pc0Z1bmN0aW9uKGZpbHRlcikpIHtcbiAgICByZXR1cm4gZmlsdGVyLmNhbGwodGhpcywgdmFsdWUsIGhlYWRlcik7XG4gIH1cblxuICBpZiAoaXNIZWFkZXJOYW1lRmlsdGVyKSB7XG4gICAgdmFsdWUgPSBoZWFkZXI7XG4gIH1cblxuICBpZiAoIXV0aWxzLmlzU3RyaW5nKHZhbHVlKSkgcmV0dXJuO1xuXG4gIGlmICh1dGlscy5pc1N0cmluZyhmaWx0ZXIpKSB7XG4gICAgcmV0dXJuIHZhbHVlLmluZGV4T2YoZmlsdGVyKSAhPT0gLTE7XG4gIH1cblxuICBpZiAodXRpbHMuaXNSZWdFeHAoZmlsdGVyKSkge1xuICAgIHJldHVybiBmaWx0ZXIudGVzdCh2YWx1ZSk7XG4gIH1cbn1cblxuZnVuY3Rpb24gZm9ybWF0SGVhZGVyKGhlYWRlcikge1xuICByZXR1cm4gaGVhZGVyXG4gICAgLnRyaW0oKVxuICAgIC50b0xvd2VyQ2FzZSgpXG4gICAgLnJlcGxhY2UoLyhbYS16XFxkXSkoXFx3KikvZywgKHcsIGNoYXIsIHN0cikgPT4ge1xuICAgICAgcmV0dXJuIGNoYXIudG9VcHBlckNhc2UoKSArIHN0cjtcbiAgICB9KTtcbn1cblxuZnVuY3Rpb24gYnVpbGRBY2Nlc3NvcnMob2JqLCBoZWFkZXIpIHtcbiAgY29uc3QgYWNjZXNzb3JOYW1lID0gdXRpbHMudG9DYW1lbENhc2UoJyAnICsgaGVhZGVyKTtcblxuICBbJ2dldCcsICdzZXQnLCAnaGFzJ10uZm9yRWFjaCgobWV0aG9kTmFtZSkgPT4ge1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvYmosIG1ldGhvZE5hbWUgKyBhY2Nlc3Nvck5hbWUsIHtcbiAgICAgIC8vIE51bGwtcHJvdG8gZGVzY3JpcHRvciBzbyBhIHBvbGx1dGVkIE9iamVjdC5wcm90b3R5cGUuZ2V0IGNhbm5vdCB0dXJuXG4gICAgICAvLyB0aGlzIGRhdGEgZGVzY3JpcHRvciBpbnRvIGFuIGFjY2Vzc29yIGRlc2NyaXB0b3Igb24gdGhlIHdheSBpbi5cbiAgICAgIF9fcHJvdG9fXzogbnVsbCxcbiAgICAgIHZhbHVlOiBmdW5jdGlvbiAoYXJnMSwgYXJnMiwgYXJnMykge1xuICAgICAgICByZXR1cm4gdGhpc1ttZXRob2ROYW1lXS5jYWxsKHRoaXMsIGhlYWRlciwgYXJnMSwgYXJnMiwgYXJnMyk7XG4gICAgICB9LFxuICAgICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICAgIH0pO1xuICB9KTtcbn1cblxuY2xhc3MgQXhpb3NIZWFkZXJzIHtcbiAgY29uc3RydWN0b3IoaGVhZGVycykge1xuICAgIGhlYWRlcnMgJiYgdGhpcy5zZXQoaGVhZGVycyk7XG4gIH1cblxuICBzZXQoaGVhZGVyLCB2YWx1ZU9yUmV3cml0ZSwgcmV3cml0ZSkge1xuICAgIGNvbnN0IHNlbGYgPSB0aGlzO1xuXG4gICAgZnVuY3Rpb24gc2V0SGVhZGVyKF92YWx1ZSwgX2hlYWRlciwgX3Jld3JpdGUpIHtcbiAgICAgIGNvbnN0IGxIZWFkZXIgPSBub3JtYWxpemVIZWFkZXIoX2hlYWRlcik7XG5cbiAgICAgIGlmICghbEhlYWRlcikge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ2hlYWRlciBuYW1lIG11c3QgYmUgYSBub24tZW1wdHkgc3RyaW5nJyk7XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IGtleSA9IHV0aWxzLmZpbmRLZXkoc2VsZiwgbEhlYWRlcik7XG5cbiAgICAgIGlmIChcbiAgICAgICAgIWtleSB8fFxuICAgICAgICBzZWxmW2tleV0gPT09IHVuZGVmaW5lZCB8fFxuICAgICAgICBfcmV3cml0ZSA9PT0gdHJ1ZSB8fFxuICAgICAgICAoX3Jld3JpdGUgPT09IHVuZGVmaW5lZCAmJiBzZWxmW2tleV0gIT09IGZhbHNlKVxuICAgICAgKSB7XG4gICAgICAgIHNlbGZba2V5IHx8IF9oZWFkZXJdID0gbm9ybWFsaXplVmFsdWUoX3ZhbHVlKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBjb25zdCBzZXRIZWFkZXJzID0gKGhlYWRlcnMsIF9yZXdyaXRlKSA9PlxuICAgICAgdXRpbHMuZm9yRWFjaChoZWFkZXJzLCAoX3ZhbHVlLCBfaGVhZGVyKSA9PiBzZXRIZWFkZXIoX3ZhbHVlLCBfaGVhZGVyLCBfcmV3cml0ZSkpO1xuXG4gICAgaWYgKHV0aWxzLmlzUGxhaW5PYmplY3QoaGVhZGVyKSB8fCBoZWFkZXIgaW5zdGFuY2VvZiB0aGlzLmNvbnN0cnVjdG9yKSB7XG4gICAgICBzZXRIZWFkZXJzKGhlYWRlciwgdmFsdWVPclJld3JpdGUpO1xuICAgIH0gZWxzZSBpZiAodXRpbHMuaXNTdHJpbmcoaGVhZGVyKSAmJiAoaGVhZGVyID0gaGVhZGVyLnRyaW0oKSkgJiYgIWlzVmFsaWRIZWFkZXJOYW1lKGhlYWRlcikpIHtcbiAgICAgIHNldEhlYWRlcnMocGFyc2VIZWFkZXJzKGhlYWRlciksIHZhbHVlT3JSZXdyaXRlKTtcbiAgICB9IGVsc2UgaWYgKHV0aWxzLmlzT2JqZWN0KGhlYWRlcikgJiYgdXRpbHMuaXNJdGVyYWJsZShoZWFkZXIpKSB7XG4gICAgICBsZXQgb2JqID0ge30sXG4gICAgICAgIGRlc3QsXG4gICAgICAgIGtleTtcbiAgICAgIGZvciAoY29uc3QgZW50cnkgb2YgaGVhZGVyKSB7XG4gICAgICAgIGlmICghdXRpbHMuaXNBcnJheShlbnRyeSkpIHtcbiAgICAgICAgICB0aHJvdyBUeXBlRXJyb3IoJ09iamVjdCBpdGVyYXRvciBtdXN0IHJldHVybiBhIGtleS12YWx1ZSBwYWlyJyk7XG4gICAgICAgIH1cblxuICAgICAgICBvYmpbKGtleSA9IGVudHJ5WzBdKV0gPSAoZGVzdCA9IG9ialtrZXldKVxuICAgICAgICAgID8gdXRpbHMuaXNBcnJheShkZXN0KVxuICAgICAgICAgICAgPyBbLi4uZGVzdCwgZW50cnlbMV1dXG4gICAgICAgICAgICA6IFtkZXN0LCBlbnRyeVsxXV1cbiAgICAgICAgICA6IGVudHJ5WzFdO1xuICAgICAgfVxuXG4gICAgICBzZXRIZWFkZXJzKG9iaiwgdmFsdWVPclJld3JpdGUpO1xuICAgIH0gZWxzZSB7XG4gICAgICBoZWFkZXIgIT0gbnVsbCAmJiBzZXRIZWFkZXIodmFsdWVPclJld3JpdGUsIGhlYWRlciwgcmV3cml0ZSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICBnZXQoaGVhZGVyLCBwYXJzZXIpIHtcbiAgICBoZWFkZXIgPSBub3JtYWxpemVIZWFkZXIoaGVhZGVyKTtcblxuICAgIGlmIChoZWFkZXIpIHtcbiAgICAgIGNvbnN0IGtleSA9IHV0aWxzLmZpbmRLZXkodGhpcywgaGVhZGVyKTtcblxuICAgICAgaWYgKGtleSkge1xuICAgICAgICBjb25zdCB2YWx1ZSA9IHRoaXNba2V5XTtcblxuICAgICAgICBpZiAoIXBhcnNlcikge1xuICAgICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChwYXJzZXIgPT09IHRydWUpIHtcbiAgICAgICAgICByZXR1cm4gcGFyc2VUb2tlbnModmFsdWUpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHV0aWxzLmlzRnVuY3Rpb24ocGFyc2VyKSkge1xuICAgICAgICAgIHJldHVybiBwYXJzZXIuY2FsbCh0aGlzLCB2YWx1ZSwga2V5KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh1dGlscy5pc1JlZ0V4cChwYXJzZXIpKSB7XG4gICAgICAgICAgcmV0dXJuIHBhcnNlci5leGVjKHZhbHVlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ3BhcnNlciBtdXN0IGJlIGJvb2xlYW58cmVnZXhwfGZ1bmN0aW9uJyk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgaGFzKGhlYWRlciwgbWF0Y2hlcikge1xuICAgIGhlYWRlciA9IG5vcm1hbGl6ZUhlYWRlcihoZWFkZXIpO1xuXG4gICAgaWYgKGhlYWRlcikge1xuICAgICAgY29uc3Qga2V5ID0gdXRpbHMuZmluZEtleSh0aGlzLCBoZWFkZXIpO1xuXG4gICAgICByZXR1cm4gISEoXG4gICAgICAgIGtleSAmJlxuICAgICAgICB0aGlzW2tleV0gIT09IHVuZGVmaW5lZCAmJlxuICAgICAgICAoIW1hdGNoZXIgfHwgbWF0Y2hIZWFkZXJWYWx1ZSh0aGlzLCB0aGlzW2tleV0sIGtleSwgbWF0Y2hlcikpXG4gICAgICApO1xuICAgIH1cblxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIGRlbGV0ZShoZWFkZXIsIG1hdGNoZXIpIHtcbiAgICBjb25zdCBzZWxmID0gdGhpcztcbiAgICBsZXQgZGVsZXRlZCA9IGZhbHNlO1xuXG4gICAgZnVuY3Rpb24gZGVsZXRlSGVhZGVyKF9oZWFkZXIpIHtcbiAgICAgIF9oZWFkZXIgPSBub3JtYWxpemVIZWFkZXIoX2hlYWRlcik7XG5cbiAgICAgIGlmIChfaGVhZGVyKSB7XG4gICAgICAgIGNvbnN0IGtleSA9IHV0aWxzLmZpbmRLZXkoc2VsZiwgX2hlYWRlcik7XG5cbiAgICAgICAgaWYgKGtleSAmJiAoIW1hdGNoZXIgfHwgbWF0Y2hIZWFkZXJWYWx1ZShzZWxmLCBzZWxmW2tleV0sIGtleSwgbWF0Y2hlcikpKSB7XG4gICAgICAgICAgZGVsZXRlIHNlbGZba2V5XTtcblxuICAgICAgICAgIGRlbGV0ZWQgPSB0cnVlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKHV0aWxzLmlzQXJyYXkoaGVhZGVyKSkge1xuICAgICAgaGVhZGVyLmZvckVhY2goZGVsZXRlSGVhZGVyKTtcbiAgICB9IGVsc2Uge1xuICAgICAgZGVsZXRlSGVhZGVyKGhlYWRlcik7XG4gICAgfVxuXG4gICAgcmV0dXJuIGRlbGV0ZWQ7XG4gIH1cblxuICBjbGVhcihtYXRjaGVyKSB7XG4gICAgY29uc3Qga2V5cyA9IE9iamVjdC5rZXlzKHRoaXMpO1xuICAgIGxldCBpID0ga2V5cy5sZW5ndGg7XG4gICAgbGV0IGRlbGV0ZWQgPSBmYWxzZTtcblxuICAgIHdoaWxlIChpLS0pIHtcbiAgICAgIGNvbnN0IGtleSA9IGtleXNbaV07XG4gICAgICBpZiAoIW1hdGNoZXIgfHwgbWF0Y2hIZWFkZXJWYWx1ZSh0aGlzLCB0aGlzW2tleV0sIGtleSwgbWF0Y2hlciwgdHJ1ZSkpIHtcbiAgICAgICAgZGVsZXRlIHRoaXNba2V5XTtcbiAgICAgICAgZGVsZXRlZCA9IHRydWU7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIGRlbGV0ZWQ7XG4gIH1cblxuICBub3JtYWxpemUoZm9ybWF0KSB7XG4gICAgY29uc3Qgc2VsZiA9IHRoaXM7XG4gICAgY29uc3QgaGVhZGVycyA9IHt9O1xuXG4gICAgdXRpbHMuZm9yRWFjaCh0aGlzLCAodmFsdWUsIGhlYWRlcikgPT4ge1xuICAgICAgY29uc3Qga2V5ID0gdXRpbHMuZmluZEtleShoZWFkZXJzLCBoZWFkZXIpO1xuXG4gICAgICBpZiAoa2V5KSB7XG4gICAgICAgIHNlbGZba2V5XSA9IG5vcm1hbGl6ZVZhbHVlKHZhbHVlKTtcbiAgICAgICAgZGVsZXRlIHNlbGZbaGVhZGVyXTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBjb25zdCBub3JtYWxpemVkID0gZm9ybWF0ID8gZm9ybWF0SGVhZGVyKGhlYWRlcikgOiBTdHJpbmcoaGVhZGVyKS50cmltKCk7XG5cbiAgICAgIGlmIChub3JtYWxpemVkICE9PSBoZWFkZXIpIHtcbiAgICAgICAgZGVsZXRlIHNlbGZbaGVhZGVyXTtcbiAgICAgIH1cblxuICAgICAgc2VsZltub3JtYWxpemVkXSA9IG5vcm1hbGl6ZVZhbHVlKHZhbHVlKTtcblxuICAgICAgaGVhZGVyc1tub3JtYWxpemVkXSA9IHRydWU7XG4gICAgfSk7XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIGNvbmNhdCguLi50YXJnZXRzKSB7XG4gICAgcmV0dXJuIHRoaXMuY29uc3RydWN0b3IuY29uY2F0KHRoaXMsIC4uLnRhcmdldHMpO1xuICB9XG5cbiAgdG9KU09OKGFzU3RyaW5ncykge1xuICAgIGNvbnN0IG9iaiA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG5cbiAgICB1dGlscy5mb3JFYWNoKHRoaXMsICh2YWx1ZSwgaGVhZGVyKSA9PiB7XG4gICAgICB2YWx1ZSAhPSBudWxsICYmXG4gICAgICAgIHZhbHVlICE9PSBmYWxzZSAmJlxuICAgICAgICAob2JqW2hlYWRlcl0gPSBhc1N0cmluZ3MgJiYgdXRpbHMuaXNBcnJheSh2YWx1ZSkgPyB2YWx1ZS5qb2luKCcsICcpIDogdmFsdWUpO1xuICAgIH0pO1xuXG4gICAgcmV0dXJuIG9iajtcbiAgfVxuXG4gIFtTeW1ib2wuaXRlcmF0b3JdKCkge1xuICAgIHJldHVybiBPYmplY3QuZW50cmllcyh0aGlzLnRvSlNPTigpKVtTeW1ib2wuaXRlcmF0b3JdKCk7XG4gIH1cblxuICB0b1N0cmluZygpIHtcbiAgICByZXR1cm4gT2JqZWN0LmVudHJpZXModGhpcy50b0pTT04oKSlcbiAgICAgIC5tYXAoKFtoZWFkZXIsIHZhbHVlXSkgPT4gaGVhZGVyICsgJzogJyArIHZhbHVlKVxuICAgICAgLmpvaW4oJ1xcbicpO1xuICB9XG5cbiAgZ2V0U2V0Q29va2llKCkge1xuICAgIHJldHVybiB0aGlzLmdldCgnc2V0LWNvb2tpZScpIHx8IFtdO1xuICB9XG5cbiAgZ2V0IFtTeW1ib2wudG9TdHJpbmdUYWddKCkge1xuICAgIHJldHVybiAnQXhpb3NIZWFkZXJzJztcbiAgfVxuXG4gIHN0YXRpYyBmcm9tKHRoaW5nKSB7XG4gICAgcmV0dXJuIHRoaW5nIGluc3RhbmNlb2YgdGhpcyA/IHRoaW5nIDogbmV3IHRoaXModGhpbmcpO1xuICB9XG5cbiAgc3RhdGljIGNvbmNhdChmaXJzdCwgLi4udGFyZ2V0cykge1xuICAgIGNvbnN0IGNvbXB1dGVkID0gbmV3IHRoaXMoZmlyc3QpO1xuXG4gICAgdGFyZ2V0cy5mb3JFYWNoKCh0YXJnZXQpID0+IGNvbXB1dGVkLnNldCh0YXJnZXQpKTtcblxuICAgIHJldHVybiBjb21wdXRlZDtcbiAgfVxuXG4gIHN0YXRpYyBhY2Nlc3NvcihoZWFkZXIpIHtcbiAgICBjb25zdCBpbnRlcm5hbHMgPVxuICAgICAgKHRoaXNbJGludGVybmFsc10gPVxuICAgICAgdGhpc1skaW50ZXJuYWxzXSA9XG4gICAgICAgIHtcbiAgICAgICAgICBhY2Nlc3NvcnM6IHt9LFxuICAgICAgICB9KTtcblxuICAgIGNvbnN0IGFjY2Vzc29ycyA9IGludGVybmFscy5hY2Nlc3NvcnM7XG4gICAgY29uc3QgcHJvdG90eXBlID0gdGhpcy5wcm90b3R5cGU7XG5cbiAgICBmdW5jdGlvbiBkZWZpbmVBY2Nlc3NvcihfaGVhZGVyKSB7XG4gICAgICBjb25zdCBsSGVhZGVyID0gbm9ybWFsaXplSGVhZGVyKF9oZWFkZXIpO1xuXG4gICAgICBpZiAoIWFjY2Vzc29yc1tsSGVhZGVyXSkge1xuICAgICAgICBidWlsZEFjY2Vzc29ycyhwcm90b3R5cGUsIF9oZWFkZXIpO1xuICAgICAgICBhY2Nlc3NvcnNbbEhlYWRlcl0gPSB0cnVlO1xuICAgICAgfVxuICAgIH1cblxuICAgIHV0aWxzLmlzQXJyYXkoaGVhZGVyKSA/IGhlYWRlci5mb3JFYWNoKGRlZmluZUFjY2Vzc29yKSA6IGRlZmluZUFjY2Vzc29yKGhlYWRlcik7XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfVxufVxuXG5BeGlvc0hlYWRlcnMuYWNjZXNzb3IoW1xuICAnQ29udGVudC1UeXBlJyxcbiAgJ0NvbnRlbnQtTGVuZ3RoJyxcbiAgJ0FjY2VwdCcsXG4gICdBY2NlcHQtRW5jb2RpbmcnLFxuICAnVXNlci1BZ2VudCcsXG4gICdBdXRob3JpemF0aW9uJyxcbl0pO1xuXG4vLyByZXNlcnZlZCBuYW1lcyBob3RmaXhcbnV0aWxzLnJlZHVjZURlc2NyaXB0b3JzKEF4aW9zSGVhZGVycy5wcm90b3R5cGUsICh7IHZhbHVlIH0sIGtleSkgPT4ge1xuICBsZXQgbWFwcGVkID0ga2V5WzBdLnRvVXBwZXJDYXNlKCkgKyBrZXkuc2xpY2UoMSk7IC8vIG1hcCBgc2V0YCA9PiBgU2V0YFxuICByZXR1cm4ge1xuICAgIGdldDogKCkgPT4gdmFsdWUsXG4gICAgc2V0KGhlYWRlclZhbHVlKSB7XG4gICAgICB0aGlzW21hcHBlZF0gPSBoZWFkZXJWYWx1ZTtcbiAgICB9LFxuICB9O1xufSk7XG5cbnV0aWxzLmZyZWV6ZU1ldGhvZHMoQXhpb3NIZWFkZXJzKTtcblxuZXhwb3J0IGRlZmF1bHQgQXhpb3NIZWFkZXJzO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQgdXRpbHMgZnJvbSAnLi4vdXRpbHMuanMnO1xuaW1wb3J0IEF4aW9zSGVhZGVycyBmcm9tICcuL0F4aW9zSGVhZGVycy5qcyc7XG5cbmNvbnN0IFJFREFDVEVEID0gJ1tSRURBQ1RFRCAqKioqXSc7XG5cbmZ1bmN0aW9uIGhhc093bk9yUHJvdG90eXBlVG9KU09OKHNvdXJjZSkge1xuICBpZiAodXRpbHMuaGFzT3duUHJvcChzb3VyY2UsICd0b0pTT04nKSkge1xuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgbGV0IHByb3RvdHlwZSA9IE9iamVjdC5nZXRQcm90b3R5cGVPZihzb3VyY2UpO1xuXG4gIHdoaWxlIChwcm90b3R5cGUgJiYgcHJvdG90eXBlICE9PSBPYmplY3QucHJvdG90eXBlKSB7XG4gICAgaWYgKHV0aWxzLmhhc093blByb3AocHJvdG90eXBlLCAndG9KU09OJykpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cblxuICAgIHByb3RvdHlwZSA9IE9iamVjdC5nZXRQcm90b3R5cGVPZihwcm90b3R5cGUpO1xuICB9XG5cbiAgcmV0dXJuIGZhbHNlO1xufVxuXG4vLyBCdWlsZCBhIHBsYWluLW9iamVjdCBzbmFwc2hvdCBvZiBgY29uZmlnYCBhbmQgcmVwbGFjZSB0aGUgdmFsdWUgb2YgYW55IGtleVxuLy8gKGNhc2UtaW5zZW5zaXRpdmUpIGxpc3RlZCBpbiBgcmVkYWN0S2V5c2Agd2l0aCBSRURBQ1RFRC4gV2Fsa3MgdGhyb3VnaCBhcnJheXNcbi8vIGFuZCBBeGlvc0hlYWRlcnMsIGFuZCBzaG9ydC1jaXJjdWl0cyBvbiBjaXJjdWxhciByZWZlcmVuY2VzLlxuZnVuY3Rpb24gcmVkYWN0Q29uZmlnKGNvbmZpZywgcmVkYWN0S2V5cykge1xuICBjb25zdCBsb3dlcktleXMgPSBuZXcgU2V0KHJlZGFjdEtleXMubWFwKChrKSA9PiBTdHJpbmcoaykudG9Mb3dlckNhc2UoKSkpO1xuICBjb25zdCBzZWVuID0gW107XG5cbiAgY29uc3QgdmlzaXQgPSAoc291cmNlKSA9PiB7XG4gICAgaWYgKHNvdXJjZSA9PT0gbnVsbCB8fCB0eXBlb2Ygc291cmNlICE9PSAnb2JqZWN0JykgcmV0dXJuIHNvdXJjZTtcbiAgICBpZiAodXRpbHMuaXNCdWZmZXIoc291cmNlKSkgcmV0dXJuIHNvdXJjZTtcbiAgICBpZiAoc2Vlbi5pbmRleE9mKHNvdXJjZSkgIT09IC0xKSByZXR1cm4gdW5kZWZpbmVkO1xuXG4gICAgaWYgKHNvdXJjZSBpbnN0YW5jZW9mIEF4aW9zSGVhZGVycykge1xuICAgICAgc291cmNlID0gc291cmNlLnRvSlNPTigpO1xuICAgIH1cblxuICAgIHNlZW4ucHVzaChzb3VyY2UpO1xuXG4gICAgbGV0IHJlc3VsdDtcbiAgICBpZiAodXRpbHMuaXNBcnJheShzb3VyY2UpKSB7XG4gICAgICByZXN1bHQgPSBbXTtcbiAgICAgIHNvdXJjZS5mb3JFYWNoKCh2LCBpKSA9PiB7XG4gICAgICAgIGNvbnN0IHJlZHVjZWRWYWx1ZSA9IHZpc2l0KHYpO1xuICAgICAgICBpZiAoIXV0aWxzLmlzVW5kZWZpbmVkKHJlZHVjZWRWYWx1ZSkpIHtcbiAgICAgICAgICByZXN1bHRbaV0gPSByZWR1Y2VkVmFsdWU7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICBpZiAoIXV0aWxzLmlzUGxhaW5PYmplY3Qoc291cmNlKSAmJiBoYXNPd25PclByb3RvdHlwZVRvSlNPTihzb3VyY2UpKSB7XG4gICAgICAgIHNlZW4ucG9wKCk7XG4gICAgICAgIHJldHVybiBzb3VyY2U7XG4gICAgICB9XG5cbiAgICAgIHJlc3VsdCA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gICAgICBmb3IgKGNvbnN0IFtrZXksIHZhbHVlXSBvZiBPYmplY3QuZW50cmllcyhzb3VyY2UpKSB7XG4gICAgICAgIGNvbnN0IHJlZHVjZWRWYWx1ZSA9IGxvd2VyS2V5cy5oYXMoa2V5LnRvTG93ZXJDYXNlKCkpID8gUkVEQUNURUQgOiB2aXNpdCh2YWx1ZSk7XG4gICAgICAgIGlmICghdXRpbHMuaXNVbmRlZmluZWQocmVkdWNlZFZhbHVlKSkge1xuICAgICAgICAgIHJlc3VsdFtrZXldID0gcmVkdWNlZFZhbHVlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgc2Vlbi5wb3AoKTtcbiAgICByZXR1cm4gcmVzdWx0O1xuICB9O1xuXG4gIHJldHVybiB2aXNpdChjb25maWcpO1xufVxuXG5jbGFzcyBBeGlvc0Vycm9yIGV4dGVuZHMgRXJyb3Ige1xuICBzdGF0aWMgZnJvbShlcnJvciwgY29kZSwgY29uZmlnLCByZXF1ZXN0LCByZXNwb25zZSwgY3VzdG9tUHJvcHMpIHtcbiAgICBjb25zdCBheGlvc0Vycm9yID0gbmV3IEF4aW9zRXJyb3IoZXJyb3IubWVzc2FnZSwgY29kZSB8fCBlcnJvci5jb2RlLCBjb25maWcsIHJlcXVlc3QsIHJlc3BvbnNlKTtcbiAgICBheGlvc0Vycm9yLmNhdXNlID0gZXJyb3I7XG4gICAgYXhpb3NFcnJvci5uYW1lID0gZXJyb3IubmFtZTtcblxuICAgIC8vIFByZXNlcnZlIHN0YXR1cyBmcm9tIHRoZSBvcmlnaW5hbCBlcnJvciBpZiBub3QgYWxyZWFkeSBzZXQgZnJvbSByZXNwb25zZVxuICAgIGlmIChlcnJvci5zdGF0dXMgIT0gbnVsbCAmJiBheGlvc0Vycm9yLnN0YXR1cyA9PSBudWxsKSB7XG4gICAgICBheGlvc0Vycm9yLnN0YXR1cyA9IGVycm9yLnN0YXR1cztcbiAgICB9XG5cbiAgICBjdXN0b21Qcm9wcyAmJiBPYmplY3QuYXNzaWduKGF4aW9zRXJyb3IsIGN1c3RvbVByb3BzKTtcbiAgICByZXR1cm4gYXhpb3NFcnJvcjtcbiAgfVxuXG4gIC8qKlxuICAgKiBDcmVhdGUgYW4gRXJyb3Igd2l0aCB0aGUgc3BlY2lmaWVkIG1lc3NhZ2UsIGNvbmZpZywgZXJyb3IgY29kZSwgcmVxdWVzdCBhbmQgcmVzcG9uc2UuXG4gICAqXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBtZXNzYWdlIFRoZSBlcnJvciBtZXNzYWdlLlxuICAgKiBAcGFyYW0ge3N0cmluZ30gW2NvZGVdIFRoZSBlcnJvciBjb2RlIChmb3IgZXhhbXBsZSwgJ0VDT05OQUJPUlRFRCcpLlxuICAgKiBAcGFyYW0ge09iamVjdH0gW2NvbmZpZ10gVGhlIGNvbmZpZy5cbiAgICogQHBhcmFtIHtPYmplY3R9IFtyZXF1ZXN0XSBUaGUgcmVxdWVzdC5cbiAgICogQHBhcmFtIHtPYmplY3R9IFtyZXNwb25zZV0gVGhlIHJlc3BvbnNlLlxuICAgKlxuICAgKiBAcmV0dXJucyB7RXJyb3J9IFRoZSBjcmVhdGVkIGVycm9yLlxuICAgKi9cbiAgY29uc3RydWN0b3IobWVzc2FnZSwgY29kZSwgY29uZmlnLCByZXF1ZXN0LCByZXNwb25zZSkge1xuICAgIHN1cGVyKG1lc3NhZ2UpO1xuXG4gICAgLy8gTWFrZSBtZXNzYWdlIGVudW1lcmFibGUgdG8gbWFpbnRhaW4gYmFja3dhcmQgY29tcGF0aWJpbGl0eVxuICAgIC8vIFRoZSBuYXRpdmUgRXJyb3IgY29uc3RydWN0b3Igc2V0cyBtZXNzYWdlIGFzIG5vbi1lbnVtZXJhYmxlLFxuICAgIC8vIGJ1dCBheGlvcyA8IHYxLjEzLjMgaGFkIGl0IGFzIGVudW1lcmFibGVcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGhpcywgJ21lc3NhZ2UnLCB7XG4gICAgICAvLyBOdWxsLXByb3RvIGRlc2NyaXB0b3Igc28gYSBwb2xsdXRlZCBPYmplY3QucHJvdG90eXBlLmdldCBjYW5ub3QgdHVyblxuICAgICAgLy8gdGhpcyBkYXRhIGRlc2NyaXB0b3IgaW50byBhbiBhY2Nlc3NvciBkZXNjcmlwdG9yIG9uIHRoZSB3YXkgaW4uXG4gICAgICBfX3Byb3RvX186IG51bGwsXG4gICAgICB2YWx1ZTogbWVzc2FnZSxcbiAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICB3cml0YWJsZTogdHJ1ZSxcbiAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICB9KTtcblxuICAgIHRoaXMubmFtZSA9ICdBeGlvc0Vycm9yJztcbiAgICB0aGlzLmlzQXhpb3NFcnJvciA9IHRydWU7XG4gICAgY29kZSAmJiAodGhpcy5jb2RlID0gY29kZSk7XG4gICAgY29uZmlnICYmICh0aGlzLmNvbmZpZyA9IGNvbmZpZyk7XG4gICAgcmVxdWVzdCAmJiAodGhpcy5yZXF1ZXN0ID0gcmVxdWVzdCk7XG4gICAgaWYgKHJlc3BvbnNlKSB7XG4gICAgICB0aGlzLnJlc3BvbnNlID0gcmVzcG9uc2U7XG4gICAgICB0aGlzLnN0YXR1cyA9IHJlc3BvbnNlLnN0YXR1cztcbiAgICB9XG4gIH1cblxuICB0b0pTT04oKSB7XG4gICAgLy8gT3B0LWluIHJlZGFjdGlvbjogd2hlbiB0aGUgcmVxdWVzdCBjb25maWcgY2FycmllcyBhIGByZWRhY3RgIGFycmF5LCB0aGVcbiAgICAvLyB2YWx1ZSBvZiBhbnkgbWF0Y2hpbmcga2V5IChjYXNlLWluc2Vuc2l0aXZlLCBhdCBhbnkgZGVwdGgpIGlzIHJlcGxhY2VkXG4gICAgLy8gd2l0aCBSRURBQ1RFRCBpbiB0aGUgc2VyaWFsaXplZCBzbmFwc2hvdC4gVW5kZWZpbmVkIG9yIGVtcHR5IGxlYXZlcyB0aGVcbiAgICAvLyBleGlzdGluZyBzZXJpYWxpemF0aW9uIGJlaGF2aW9yIHVuY2hhbmdlZC5cbiAgICBjb25zdCBjb25maWcgPSB0aGlzLmNvbmZpZztcbiAgICBjb25zdCByZWRhY3RLZXlzID0gY29uZmlnICYmIHV0aWxzLmhhc093blByb3AoY29uZmlnLCAncmVkYWN0JykgPyBjb25maWcucmVkYWN0IDogdW5kZWZpbmVkO1xuICAgIGNvbnN0IHNlcmlhbGl6ZWRDb25maWcgPVxuICAgICAgdXRpbHMuaXNBcnJheShyZWRhY3RLZXlzKSAmJiByZWRhY3RLZXlzLmxlbmd0aCA+IDBcbiAgICAgICAgPyByZWRhY3RDb25maWcoY29uZmlnLCByZWRhY3RLZXlzKVxuICAgICAgICA6IHV0aWxzLnRvSlNPTk9iamVjdChjb25maWcpO1xuXG4gICAgcmV0dXJuIHtcbiAgICAgIC8vIFN0YW5kYXJkXG4gICAgICBtZXNzYWdlOiB0aGlzLm1lc3NhZ2UsXG4gICAgICBuYW1lOiB0aGlzLm5hbWUsXG4gICAgICAvLyBNaWNyb3NvZnRcbiAgICAgIGRlc2NyaXB0aW9uOiB0aGlzLmRlc2NyaXB0aW9uLFxuICAgICAgbnVtYmVyOiB0aGlzLm51bWJlcixcbiAgICAgIC8vIE1vemlsbGFcbiAgICAgIGZpbGVOYW1lOiB0aGlzLmZpbGVOYW1lLFxuICAgICAgbGluZU51bWJlcjogdGhpcy5saW5lTnVtYmVyLFxuICAgICAgY29sdW1uTnVtYmVyOiB0aGlzLmNvbHVtbk51bWJlcixcbiAgICAgIHN0YWNrOiB0aGlzLnN0YWNrLFxuICAgICAgLy8gQXhpb3NcbiAgICAgIGNvbmZpZzogc2VyaWFsaXplZENvbmZpZyxcbiAgICAgIGNvZGU6IHRoaXMuY29kZSxcbiAgICAgIHN0YXR1czogdGhpcy5zdGF0dXMsXG4gICAgfTtcbiAgfVxufVxuXG4vLyBUaGlzIGNhbiBiZSBjaGFuZ2VkIHRvIHN0YXRpYyBwcm9wZXJ0aWVzIGFzIHNvb24gYXMgdGhlIHBhcnNlciBvcHRpb25zIGluIC5lc2xpbnQuY2pzIGFyZSB1cGRhdGVkLlxuQXhpb3NFcnJvci5FUlJfQkFEX09QVElPTl9WQUxVRSA9ICdFUlJfQkFEX09QVElPTl9WQUxVRSc7XG5BeGlvc0Vycm9yLkVSUl9CQURfT1BUSU9OID0gJ0VSUl9CQURfT1BUSU9OJztcbkF4aW9zRXJyb3IuRUNPTk5BQk9SVEVEID0gJ0VDT05OQUJPUlRFRCc7XG5BeGlvc0Vycm9yLkVUSU1FRE9VVCA9ICdFVElNRURPVVQnO1xuQXhpb3NFcnJvci5FQ09OTlJFRlVTRUQgPSAnRUNPTk5SRUZVU0VEJztcbkF4aW9zRXJyb3IuRVJSX05FVFdPUksgPSAnRVJSX05FVFdPUksnO1xuQXhpb3NFcnJvci5FUlJfRlJfVE9PX01BTllfUkVESVJFQ1RTID0gJ0VSUl9GUl9UT09fTUFOWV9SRURJUkVDVFMnO1xuQXhpb3NFcnJvci5FUlJfREVQUkVDQVRFRCA9ICdFUlJfREVQUkVDQVRFRCc7XG5BeGlvc0Vycm9yLkVSUl9CQURfUkVTUE9OU0UgPSAnRVJSX0JBRF9SRVNQT05TRSc7XG5BeGlvc0Vycm9yLkVSUl9CQURfUkVRVUVTVCA9ICdFUlJfQkFEX1JFUVVFU1QnO1xuQXhpb3NFcnJvci5FUlJfQ0FOQ0VMRUQgPSAnRVJSX0NBTkNFTEVEJztcbkF4aW9zRXJyb3IuRVJSX05PVF9TVVBQT1JUID0gJ0VSUl9OT1RfU1VQUE9SVCc7XG5BeGlvc0Vycm9yLkVSUl9JTlZBTElEX1VSTCA9ICdFUlJfSU5WQUxJRF9VUkwnO1xuQXhpb3NFcnJvci5FUlJfRk9STV9EQVRBX0RFUFRIX0VYQ0VFREVEID0gJ0VSUl9GT1JNX0RBVEFfREVQVEhfRVhDRUVERUQnO1xuXG5leHBvcnQgZGVmYXVsdCBBeGlvc0Vycm9yO1xuIiwiLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHN0cmljdFxuZXhwb3J0IGRlZmF1bHQgbnVsbDtcbiIsIid1c2Ugc3RyaWN0JztcblxuaW1wb3J0IHV0aWxzIGZyb20gJy4uL3V0aWxzLmpzJztcbmltcG9ydCBBeGlvc0Vycm9yIGZyb20gJy4uL2NvcmUvQXhpb3NFcnJvci5qcyc7XG4vLyB0ZW1wb3JhcnkgaG90Zml4IHRvIGF2b2lkIGNpcmN1bGFyIHJlZmVyZW5jZXMgdW50aWwgQXhpb3NVUkxTZWFyY2hQYXJhbXMgaXMgcmVmYWN0b3JlZFxuaW1wb3J0IFBsYXRmb3JtRm9ybURhdGEgZnJvbSAnLi4vcGxhdGZvcm0vbm9kZS9jbGFzc2VzL0Zvcm1EYXRhLmpzJztcblxuLyoqXG4gKiBEZXRlcm1pbmVzIGlmIHRoZSBnaXZlbiB0aGluZyBpcyBhIGFycmF5IG9yIGpzIG9iamVjdC5cbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gdGhpbmcgLSBUaGUgb2JqZWN0IG9yIGFycmF5IHRvIGJlIHZpc2l0ZWQuXG4gKlxuICogQHJldHVybnMge2Jvb2xlYW59XG4gKi9cbmZ1bmN0aW9uIGlzVmlzaXRhYmxlKHRoaW5nKSB7XG4gIHJldHVybiB1dGlscy5pc1BsYWluT2JqZWN0KHRoaW5nKSB8fCB1dGlscy5pc0FycmF5KHRoaW5nKTtcbn1cblxuLyoqXG4gKiBJdCByZW1vdmVzIHRoZSBicmFja2V0cyBmcm9tIHRoZSBlbmQgb2YgYSBzdHJpbmdcbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IC0gVGhlIGtleSBvZiB0aGUgcGFyYW1ldGVyLlxuICpcbiAqIEByZXR1cm5zIHtzdHJpbmd9IHRoZSBrZXkgd2l0aG91dCB0aGUgYnJhY2tldHMuXG4gKi9cbmZ1bmN0aW9uIHJlbW92ZUJyYWNrZXRzKGtleSkge1xuICByZXR1cm4gdXRpbHMuZW5kc1dpdGgoa2V5LCAnW10nKSA/IGtleS5zbGljZSgwLCAtMikgOiBrZXk7XG59XG5cbi8qKlxuICogSXQgdGFrZXMgYSBwYXRoLCBhIGtleSwgYW5kIGEgYm9vbGVhbiwgYW5kIHJldHVybnMgYSBzdHJpbmdcbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gcGF0aCAtIFRoZSBwYXRoIHRvIHRoZSBjdXJyZW50IGtleS5cbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgLSBUaGUga2V5IG9mIHRoZSBjdXJyZW50IG9iamVjdCBiZWluZyBpdGVyYXRlZCBvdmVyLlxuICogQHBhcmFtIHtzdHJpbmd9IGRvdHMgLSBJZiB0cnVlLCB0aGUga2V5IHdpbGwgYmUgcmVuZGVyZWQgd2l0aCBkb3RzIGluc3RlYWQgb2YgYnJhY2tldHMuXG4gKlxuICogQHJldHVybnMge3N0cmluZ30gVGhlIHBhdGggdG8gdGhlIGN1cnJlbnQga2V5LlxuICovXG5mdW5jdGlvbiByZW5kZXJLZXkocGF0aCwga2V5LCBkb3RzKSB7XG4gIGlmICghcGF0aCkgcmV0dXJuIGtleTtcbiAgcmV0dXJuIHBhdGhcbiAgICAuY29uY2F0KGtleSlcbiAgICAubWFwKGZ1bmN0aW9uIGVhY2godG9rZW4sIGkpIHtcbiAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1wYXJhbS1yZWFzc2lnblxuICAgICAgdG9rZW4gPSByZW1vdmVCcmFja2V0cyh0b2tlbik7XG4gICAgICByZXR1cm4gIWRvdHMgJiYgaSA/ICdbJyArIHRva2VuICsgJ10nIDogdG9rZW47XG4gICAgfSlcbiAgICAuam9pbihkb3RzID8gJy4nIDogJycpO1xufVxuXG4vKipcbiAqIElmIHRoZSBhcnJheSBpcyBhbiBhcnJheSBhbmQgbm9uZSBvZiBpdHMgZWxlbWVudHMgYXJlIHZpc2l0YWJsZSwgdGhlbiBpdCdzIGEgZmxhdCBhcnJheS5cbiAqXG4gKiBAcGFyYW0ge0FycmF5PGFueT59IGFyciAtIFRoZSBhcnJheSB0byBjaGVja1xuICpcbiAqIEByZXR1cm5zIHtib29sZWFufVxuICovXG5mdW5jdGlvbiBpc0ZsYXRBcnJheShhcnIpIHtcbiAgcmV0dXJuIHV0aWxzLmlzQXJyYXkoYXJyKSAmJiAhYXJyLnNvbWUoaXNWaXNpdGFibGUpO1xufVxuXG5jb25zdCBwcmVkaWNhdGVzID0gdXRpbHMudG9GbGF0T2JqZWN0KHV0aWxzLCB7fSwgbnVsbCwgZnVuY3Rpb24gZmlsdGVyKHByb3ApIHtcbiAgcmV0dXJuIC9eaXNbQS1aXS8udGVzdChwcm9wKTtcbn0pO1xuXG4vKipcbiAqIENvbnZlcnQgYSBkYXRhIG9iamVjdCB0byBGb3JtRGF0YVxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmpcbiAqIEBwYXJhbSB7P09iamVjdH0gW2Zvcm1EYXRhXVxuICogQHBhcmFtIHs/T2JqZWN0fSBbb3B0aW9uc11cbiAqIEBwYXJhbSB7RnVuY3Rpb259IFtvcHRpb25zLnZpc2l0b3JdXG4gKiBAcGFyYW0ge0Jvb2xlYW59IFtvcHRpb25zLm1ldGFUb2tlbnMgPSB0cnVlXVxuICogQHBhcmFtIHtCb29sZWFufSBbb3B0aW9ucy5kb3RzID0gZmFsc2VdXG4gKiBAcGFyYW0gez9Cb29sZWFufSBbb3B0aW9ucy5pbmRleGVzID0gZmFsc2VdXG4gKlxuICogQHJldHVybnMge09iamVjdH1cbiAqKi9cblxuLyoqXG4gKiBJdCBjb252ZXJ0cyBhbiBvYmplY3QgaW50byBhIEZvcm1EYXRhIG9iamVjdFxuICpcbiAqIEBwYXJhbSB7T2JqZWN0PGFueSwgYW55Pn0gb2JqIC0gVGhlIG9iamVjdCB0byBjb252ZXJ0IHRvIGZvcm0gZGF0YS5cbiAqIEBwYXJhbSB7c3RyaW5nfSBmb3JtRGF0YSAtIFRoZSBGb3JtRGF0YSBvYmplY3QgdG8gYXBwZW5kIHRvLlxuICogQHBhcmFtIHtPYmplY3Q8c3RyaW5nLCBhbnk+fSBvcHRpb25zXG4gKlxuICogQHJldHVybnNcbiAqL1xuZnVuY3Rpb24gdG9Gb3JtRGF0YShvYmosIGZvcm1EYXRhLCBvcHRpb25zKSB7XG4gIGlmICghdXRpbHMuaXNPYmplY3Qob2JqKSkge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ3RhcmdldCBtdXN0IGJlIGFuIG9iamVjdCcpO1xuICB9XG5cbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXBhcmFtLXJlYXNzaWduXG4gIGZvcm1EYXRhID0gZm9ybURhdGEgfHwgbmV3IChQbGF0Zm9ybUZvcm1EYXRhIHx8IEZvcm1EYXRhKSgpO1xuXG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1wYXJhbS1yZWFzc2lnblxuICBvcHRpb25zID0gdXRpbHMudG9GbGF0T2JqZWN0KFxuICAgIG9wdGlvbnMsXG4gICAge1xuICAgICAgbWV0YVRva2VuczogdHJ1ZSxcbiAgICAgIGRvdHM6IGZhbHNlLFxuICAgICAgaW5kZXhlczogZmFsc2UsXG4gICAgfSxcbiAgICBmYWxzZSxcbiAgICBmdW5jdGlvbiBkZWZpbmVkKG9wdGlvbiwgc291cmNlKSB7XG4gICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tZXEtbnVsbCxlcWVxZXFcbiAgICAgIHJldHVybiAhdXRpbHMuaXNVbmRlZmluZWQoc291cmNlW29wdGlvbl0pO1xuICAgIH1cbiAgKTtcblxuICBjb25zdCBtZXRhVG9rZW5zID0gb3B0aW9ucy5tZXRhVG9rZW5zO1xuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdXNlLWJlZm9yZS1kZWZpbmVcbiAgY29uc3QgdmlzaXRvciA9IG9wdGlvbnMudmlzaXRvciB8fCBkZWZhdWx0VmlzaXRvcjtcbiAgY29uc3QgZG90cyA9IG9wdGlvbnMuZG90cztcbiAgY29uc3QgaW5kZXhlcyA9IG9wdGlvbnMuaW5kZXhlcztcbiAgY29uc3QgX0Jsb2IgPSBvcHRpb25zLkJsb2IgfHwgKHR5cGVvZiBCbG9iICE9PSAndW5kZWZpbmVkJyAmJiBCbG9iKTtcbiAgY29uc3QgbWF4RGVwdGggPSBvcHRpb25zLm1heERlcHRoID09PSB1bmRlZmluZWQgPyAxMDAgOiBvcHRpb25zLm1heERlcHRoO1xuICBjb25zdCB1c2VCbG9iID0gX0Jsb2IgJiYgdXRpbHMuaXNTcGVjQ29tcGxpYW50Rm9ybShmb3JtRGF0YSk7XG5cbiAgaWYgKCF1dGlscy5pc0Z1bmN0aW9uKHZpc2l0b3IpKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcigndmlzaXRvciBtdXN0IGJlIGEgZnVuY3Rpb24nKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGNvbnZlcnRWYWx1ZSh2YWx1ZSkge1xuICAgIGlmICh2YWx1ZSA9PT0gbnVsbCkgcmV0dXJuICcnO1xuXG4gICAgaWYgKHV0aWxzLmlzRGF0ZSh2YWx1ZSkpIHtcbiAgICAgIHJldHVybiB2YWx1ZS50b0lTT1N0cmluZygpO1xuICAgIH1cblxuICAgIGlmICh1dGlscy5pc0Jvb2xlYW4odmFsdWUpKSB7XG4gICAgICByZXR1cm4gdmFsdWUudG9TdHJpbmcoKTtcbiAgICB9XG5cbiAgICBpZiAoIXVzZUJsb2IgJiYgdXRpbHMuaXNCbG9iKHZhbHVlKSkge1xuICAgICAgdGhyb3cgbmV3IEF4aW9zRXJyb3IoJ0Jsb2IgaXMgbm90IHN1cHBvcnRlZC4gVXNlIGEgQnVmZmVyIGluc3RlYWQuJyk7XG4gICAgfVxuXG4gICAgaWYgKHV0aWxzLmlzQXJyYXlCdWZmZXIodmFsdWUpIHx8IHV0aWxzLmlzVHlwZWRBcnJheSh2YWx1ZSkpIHtcbiAgICAgIHJldHVybiB1c2VCbG9iICYmIHR5cGVvZiBCbG9iID09PSAnZnVuY3Rpb24nID8gbmV3IEJsb2IoW3ZhbHVlXSkgOiBCdWZmZXIuZnJvbSh2YWx1ZSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHZhbHVlO1xuICB9XG5cbiAgLyoqXG4gICAqIERlZmF1bHQgdmlzaXRvci5cbiAgICpcbiAgICogQHBhcmFtIHsqfSB2YWx1ZVxuICAgKiBAcGFyYW0ge1N0cmluZ3xOdW1iZXJ9IGtleVxuICAgKiBAcGFyYW0ge0FycmF5PFN0cmluZ3xOdW1iZXI+fSBwYXRoXG4gICAqIEB0aGlzIHtGb3JtRGF0YX1cbiAgICpcbiAgICogQHJldHVybnMge2Jvb2xlYW59IHJldHVybiB0cnVlIHRvIHZpc2l0IHRoZSBlYWNoIHByb3Agb2YgdGhlIHZhbHVlIHJlY3Vyc2l2ZWx5XG4gICAqL1xuICBmdW5jdGlvbiBkZWZhdWx0VmlzaXRvcih2YWx1ZSwga2V5LCBwYXRoKSB7XG4gICAgbGV0IGFyciA9IHZhbHVlO1xuXG4gICAgaWYgKHV0aWxzLmlzUmVhY3ROYXRpdmUoZm9ybURhdGEpICYmIHV0aWxzLmlzUmVhY3ROYXRpdmVCbG9iKHZhbHVlKSkge1xuICAgICAgZm9ybURhdGEuYXBwZW5kKHJlbmRlcktleShwYXRoLCBrZXksIGRvdHMpLCBjb252ZXJ0VmFsdWUodmFsdWUpKTtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBpZiAodmFsdWUgJiYgIXBhdGggJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0Jykge1xuICAgICAgaWYgKHV0aWxzLmVuZHNXaXRoKGtleSwgJ3t9JykpIHtcbiAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXBhcmFtLXJlYXNzaWduXG4gICAgICAgIGtleSA9IG1ldGFUb2tlbnMgPyBrZXkgOiBrZXkuc2xpY2UoMCwgLTIpO1xuICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tcGFyYW0tcmVhc3NpZ25cbiAgICAgICAgdmFsdWUgPSBKU09OLnN0cmluZ2lmeSh2YWx1ZSk7XG4gICAgICB9IGVsc2UgaWYgKFxuICAgICAgICAodXRpbHMuaXNBcnJheSh2YWx1ZSkgJiYgaXNGbGF0QXJyYXkodmFsdWUpKSB8fFxuICAgICAgICAoKHV0aWxzLmlzRmlsZUxpc3QodmFsdWUpIHx8IHV0aWxzLmVuZHNXaXRoKGtleSwgJ1tdJykpICYmIChhcnIgPSB1dGlscy50b0FycmF5KHZhbHVlKSkpXG4gICAgICApIHtcbiAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXBhcmFtLXJlYXNzaWduXG4gICAgICAgIGtleSA9IHJlbW92ZUJyYWNrZXRzKGtleSk7XG5cbiAgICAgICAgYXJyLmZvckVhY2goZnVuY3Rpb24gZWFjaChlbCwgaW5kZXgpIHtcbiAgICAgICAgICAhKHV0aWxzLmlzVW5kZWZpbmVkKGVsKSB8fCBlbCA9PT0gbnVsbCkgJiZcbiAgICAgICAgICAgIGZvcm1EYXRhLmFwcGVuZChcbiAgICAgICAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLW5lc3RlZC10ZXJuYXJ5XG4gICAgICAgICAgICAgIGluZGV4ZXMgPT09IHRydWVcbiAgICAgICAgICAgICAgICA/IHJlbmRlcktleShba2V5XSwgaW5kZXgsIGRvdHMpXG4gICAgICAgICAgICAgICAgOiBpbmRleGVzID09PSBudWxsXG4gICAgICAgICAgICAgICAgICA/IGtleVxuICAgICAgICAgICAgICAgICAgOiBrZXkgKyAnW10nLFxuICAgICAgICAgICAgICBjb252ZXJ0VmFsdWUoZWwpXG4gICAgICAgICAgICApO1xuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChpc1Zpc2l0YWJsZSh2YWx1ZSkpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cblxuICAgIGZvcm1EYXRhLmFwcGVuZChyZW5kZXJLZXkocGF0aCwga2V5LCBkb3RzKSwgY29udmVydFZhbHVlKHZhbHVlKSk7XG5cbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBjb25zdCBzdGFjayA9IFtdO1xuXG4gIGNvbnN0IGV4cG9zZWRIZWxwZXJzID0gT2JqZWN0LmFzc2lnbihwcmVkaWNhdGVzLCB7XG4gICAgZGVmYXVsdFZpc2l0b3IsXG4gICAgY29udmVydFZhbHVlLFxuICAgIGlzVmlzaXRhYmxlLFxuICB9KTtcblxuICBmdW5jdGlvbiBidWlsZCh2YWx1ZSwgcGF0aCwgZGVwdGggPSAwKSB7XG4gICAgaWYgKHV0aWxzLmlzVW5kZWZpbmVkKHZhbHVlKSkgcmV0dXJuO1xuXG4gICAgaWYgKGRlcHRoID4gbWF4RGVwdGgpIHtcbiAgICAgIHRocm93IG5ldyBBeGlvc0Vycm9yKFxuICAgICAgICAnT2JqZWN0IGlzIHRvbyBkZWVwbHkgbmVzdGVkICgnICsgZGVwdGggKyAnIGxldmVscykuIE1heCBkZXB0aDogJyArIG1heERlcHRoLFxuICAgICAgICBBeGlvc0Vycm9yLkVSUl9GT1JNX0RBVEFfREVQVEhfRVhDRUVERURcbiAgICAgICk7XG4gICAgfVxuXG4gICAgaWYgKHN0YWNrLmluZGV4T2YodmFsdWUpICE9PSAtMSkge1xuICAgICAgdGhyb3cgRXJyb3IoJ0NpcmN1bGFyIHJlZmVyZW5jZSBkZXRlY3RlZCBpbiAnICsgcGF0aC5qb2luKCcuJykpO1xuICAgIH1cblxuICAgIHN0YWNrLnB1c2godmFsdWUpO1xuXG4gICAgdXRpbHMuZm9yRWFjaCh2YWx1ZSwgZnVuY3Rpb24gZWFjaChlbCwga2V5KSB7XG4gICAgICBjb25zdCByZXN1bHQgPVxuICAgICAgICAhKHV0aWxzLmlzVW5kZWZpbmVkKGVsKSB8fCBlbCA9PT0gbnVsbCkgJiZcbiAgICAgICAgdmlzaXRvci5jYWxsKGZvcm1EYXRhLCBlbCwgdXRpbHMuaXNTdHJpbmcoa2V5KSA/IGtleS50cmltKCkgOiBrZXksIHBhdGgsIGV4cG9zZWRIZWxwZXJzKTtcblxuICAgICAgaWYgKHJlc3VsdCA9PT0gdHJ1ZSkge1xuICAgICAgICBidWlsZChlbCwgcGF0aCA/IHBhdGguY29uY2F0KGtleSkgOiBba2V5XSwgZGVwdGggKyAxKTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIHN0YWNrLnBvcCgpO1xuICB9XG5cbiAgaWYgKCF1dGlscy5pc09iamVjdChvYmopKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcignZGF0YSBtdXN0IGJlIGFuIG9iamVjdCcpO1xuICB9XG5cbiAgYnVpbGQob2JqKTtcblxuICByZXR1cm4gZm9ybURhdGE7XG59XG5cbmV4cG9ydCBkZWZhdWx0IHRvRm9ybURhdGE7XG4iLCIndXNlIHN0cmljdCc7XG5cbmltcG9ydCB0b0Zvcm1EYXRhIGZyb20gJy4vdG9Gb3JtRGF0YS5qcyc7XG5cbi8qKlxuICogSXQgZW5jb2RlcyBhIHN0cmluZyBieSByZXBsYWNpbmcgYWxsIGNoYXJhY3RlcnMgdGhhdCBhcmUgbm90IGluIHRoZSB1bnJlc2VydmVkIHNldCB3aXRoXG4gKiB0aGVpciBwZXJjZW50LWVuY29kZWQgZXF1aXZhbGVudHNcbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gc3RyIC0gVGhlIHN0cmluZyB0byBlbmNvZGUuXG4gKlxuICogQHJldHVybnMge3N0cmluZ30gVGhlIGVuY29kZWQgc3RyaW5nLlxuICovXG5mdW5jdGlvbiBlbmNvZGUoc3RyKSB7XG4gIGNvbnN0IGNoYXJNYXAgPSB7XG4gICAgJyEnOiAnJTIxJyxcbiAgICBcIidcIjogJyUyNycsXG4gICAgJygnOiAnJTI4JyxcbiAgICAnKSc6ICclMjknLFxuICAgICd+JzogJyU3RScsXG4gICAgJyUyMCc6ICcrJyxcbiAgfTtcbiAgcmV0dXJuIGVuY29kZVVSSUNvbXBvbmVudChzdHIpLnJlcGxhY2UoL1shJygpfl18JTIwL2csIGZ1bmN0aW9uIHJlcGxhY2VyKG1hdGNoKSB7XG4gICAgcmV0dXJuIGNoYXJNYXBbbWF0Y2hdO1xuICB9KTtcbn1cblxuLyoqXG4gKiBJdCB0YWtlcyBhIHBhcmFtcyBvYmplY3QgYW5kIGNvbnZlcnRzIGl0IHRvIGEgRm9ybURhdGEgb2JqZWN0XG4gKlxuICogQHBhcmFtIHtPYmplY3Q8c3RyaW5nLCBhbnk+fSBwYXJhbXMgLSBUaGUgcGFyYW1ldGVycyB0byBiZSBjb252ZXJ0ZWQgdG8gYSBGb3JtRGF0YSBvYmplY3QuXG4gKiBAcGFyYW0ge09iamVjdDxzdHJpbmcsIGFueT59IG9wdGlvbnMgLSBUaGUgb3B0aW9ucyBvYmplY3QgcGFzc2VkIHRvIHRoZSBBeGlvcyBjb25zdHJ1Y3Rvci5cbiAqXG4gKiBAcmV0dXJucyB7dm9pZH1cbiAqL1xuZnVuY3Rpb24gQXhpb3NVUkxTZWFyY2hQYXJhbXMocGFyYW1zLCBvcHRpb25zKSB7XG4gIHRoaXMuX3BhaXJzID0gW107XG5cbiAgcGFyYW1zICYmIHRvRm9ybURhdGEocGFyYW1zLCB0aGlzLCBvcHRpb25zKTtcbn1cblxuY29uc3QgcHJvdG90eXBlID0gQXhpb3NVUkxTZWFyY2hQYXJhbXMucHJvdG90eXBlO1xuXG5wcm90b3R5cGUuYXBwZW5kID0gZnVuY3Rpb24gYXBwZW5kKG5hbWUsIHZhbHVlKSB7XG4gIHRoaXMuX3BhaXJzLnB1c2goW25hbWUsIHZhbHVlXSk7XG59O1xuXG5wcm90b3R5cGUudG9TdHJpbmcgPSBmdW5jdGlvbiB0b1N0cmluZyhlbmNvZGVyKSB7XG4gIGNvbnN0IF9lbmNvZGUgPSBlbmNvZGVyXG4gICAgPyBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgcmV0dXJuIGVuY29kZXIuY2FsbCh0aGlzLCB2YWx1ZSwgZW5jb2RlKTtcbiAgICAgIH1cbiAgICA6IGVuY29kZTtcblxuICByZXR1cm4gdGhpcy5fcGFpcnNcbiAgICAubWFwKGZ1bmN0aW9uIGVhY2gocGFpcikge1xuICAgICAgcmV0dXJuIF9lbmNvZGUocGFpclswXSkgKyAnPScgKyBfZW5jb2RlKHBhaXJbMV0pO1xuICAgIH0sICcnKVxuICAgIC5qb2luKCcmJyk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBBeGlvc1VSTFNlYXJjaFBhcmFtcztcbiIsIid1c2Ugc3RyaWN0JztcblxuaW1wb3J0IHV0aWxzIGZyb20gJy4uL3V0aWxzLmpzJztcbmltcG9ydCBBeGlvc1VSTFNlYXJjaFBhcmFtcyBmcm9tICcuLi9oZWxwZXJzL0F4aW9zVVJMU2VhcmNoUGFyYW1zLmpzJztcblxuLyoqXG4gKiBJdCByZXBsYWNlcyBVUkwtZW5jb2RlZCBmb3JtcyBvZiBgOmAsIGAkYCwgYCxgLCBhbmQgc3BhY2VzIHdpdGhcbiAqIHRoZWlyIHBsYWluIGNvdW50ZXJwYXJ0cyAoYDpgLCBgJGAsIGAsYCwgYCtgKS5cbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gdmFsIFRoZSB2YWx1ZSB0byBiZSBlbmNvZGVkLlxuICpcbiAqIEByZXR1cm5zIHtzdHJpbmd9IFRoZSBlbmNvZGVkIHZhbHVlLlxuICovXG5leHBvcnQgZnVuY3Rpb24gZW5jb2RlKHZhbCkge1xuICByZXR1cm4gZW5jb2RlVVJJQ29tcG9uZW50KHZhbClcbiAgICAucmVwbGFjZSgvJTNBL2dpLCAnOicpXG4gICAgLnJlcGxhY2UoLyUyNC9nLCAnJCcpXG4gICAgLnJlcGxhY2UoLyUyQy9naSwgJywnKVxuICAgIC5yZXBsYWNlKC8lMjAvZywgJysnKTtcbn1cblxuLyoqXG4gKiBCdWlsZCBhIFVSTCBieSBhcHBlbmRpbmcgcGFyYW1zIHRvIHRoZSBlbmRcbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gdXJsIFRoZSBiYXNlIG9mIHRoZSB1cmwgKGUuZy4sIGh0dHA6Ly93d3cuZ29vZ2xlLmNvbSlcbiAqIEBwYXJhbSB7b2JqZWN0fSBbcGFyYW1zXSBUaGUgcGFyYW1zIHRvIGJlIGFwcGVuZGVkXG4gKiBAcGFyYW0gez8ob2JqZWN0fEZ1bmN0aW9uKX0gb3B0aW9uc1xuICpcbiAqIEByZXR1cm5zIHtzdHJpbmd9IFRoZSBmb3JtYXR0ZWQgdXJsXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGJ1aWxkVVJMKHVybCwgcGFyYW1zLCBvcHRpb25zKSB7XG4gIGlmICghcGFyYW1zKSB7XG4gICAgcmV0dXJuIHVybDtcbiAgfVxuXG4gIGNvbnN0IF9lbmNvZGUgPSAob3B0aW9ucyAmJiBvcHRpb25zLmVuY29kZSkgfHwgZW5jb2RlO1xuXG4gIGNvbnN0IF9vcHRpb25zID0gdXRpbHMuaXNGdW5jdGlvbihvcHRpb25zKVxuICAgID8ge1xuICAgICAgICBzZXJpYWxpemU6IG9wdGlvbnMsXG4gICAgICB9XG4gICAgOiBvcHRpb25zO1xuXG4gIGNvbnN0IHNlcmlhbGl6ZUZuID0gX29wdGlvbnMgJiYgX29wdGlvbnMuc2VyaWFsaXplO1xuXG4gIGxldCBzZXJpYWxpemVkUGFyYW1zO1xuXG4gIGlmIChzZXJpYWxpemVGbikge1xuICAgIHNlcmlhbGl6ZWRQYXJhbXMgPSBzZXJpYWxpemVGbihwYXJhbXMsIF9vcHRpb25zKTtcbiAgfSBlbHNlIHtcbiAgICBzZXJpYWxpemVkUGFyYW1zID0gdXRpbHMuaXNVUkxTZWFyY2hQYXJhbXMocGFyYW1zKVxuICAgICAgPyBwYXJhbXMudG9TdHJpbmcoKVxuICAgICAgOiBuZXcgQXhpb3NVUkxTZWFyY2hQYXJhbXMocGFyYW1zLCBfb3B0aW9ucykudG9TdHJpbmcoX2VuY29kZSk7XG4gIH1cblxuICBpZiAoc2VyaWFsaXplZFBhcmFtcykge1xuICAgIGNvbnN0IGhhc2htYXJrSW5kZXggPSB1cmwuaW5kZXhPZignIycpO1xuXG4gICAgaWYgKGhhc2htYXJrSW5kZXggIT09IC0xKSB7XG4gICAgICB1cmwgPSB1cmwuc2xpY2UoMCwgaGFzaG1hcmtJbmRleCk7XG4gICAgfVxuICAgIHVybCArPSAodXJsLmluZGV4T2YoJz8nKSA9PT0gLTEgPyAnPycgOiAnJicpICsgc2VyaWFsaXplZFBhcmFtcztcbiAgfVxuXG4gIHJldHVybiB1cmw7XG59XG4iLCIndXNlIHN0cmljdCc7XG5cbmltcG9ydCB1dGlscyBmcm9tICcuLi91dGlscy5qcyc7XG5cbmNsYXNzIEludGVyY2VwdG9yTWFuYWdlciB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMuaGFuZGxlcnMgPSBbXTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBZGQgYSBuZXcgaW50ZXJjZXB0b3IgdG8gdGhlIHN0YWNrXG4gICAqXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IGZ1bGZpbGxlZCBUaGUgZnVuY3Rpb24gdG8gaGFuZGxlIGB0aGVuYCBmb3IgYSBgUHJvbWlzZWBcbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gcmVqZWN0ZWQgVGhlIGZ1bmN0aW9uIHRvIGhhbmRsZSBgcmVqZWN0YCBmb3IgYSBgUHJvbWlzZWBcbiAgICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnMgVGhlIG9wdGlvbnMgZm9yIHRoZSBpbnRlcmNlcHRvciwgc3luY2hyb25vdXMgYW5kIHJ1bldoZW5cbiAgICpcbiAgICogQHJldHVybiB7TnVtYmVyfSBBbiBJRCB1c2VkIHRvIHJlbW92ZSBpbnRlcmNlcHRvciBsYXRlclxuICAgKi9cbiAgdXNlKGZ1bGZpbGxlZCwgcmVqZWN0ZWQsIG9wdGlvbnMpIHtcbiAgICB0aGlzLmhhbmRsZXJzLnB1c2goe1xuICAgICAgZnVsZmlsbGVkLFxuICAgICAgcmVqZWN0ZWQsXG4gICAgICBzeW5jaHJvbm91czogb3B0aW9ucyA/IG9wdGlvbnMuc3luY2hyb25vdXMgOiBmYWxzZSxcbiAgICAgIHJ1bldoZW46IG9wdGlvbnMgPyBvcHRpb25zLnJ1bldoZW4gOiBudWxsLFxuICAgIH0pO1xuICAgIHJldHVybiB0aGlzLmhhbmRsZXJzLmxlbmd0aCAtIDE7XG4gIH1cblxuICAvKipcbiAgICogUmVtb3ZlIGFuIGludGVyY2VwdG9yIGZyb20gdGhlIHN0YWNrXG4gICAqXG4gICAqIEBwYXJhbSB7TnVtYmVyfSBpZCBUaGUgSUQgdGhhdCB3YXMgcmV0dXJuZWQgYnkgYHVzZWBcbiAgICpcbiAgICogQHJldHVybnMge3ZvaWR9XG4gICAqL1xuICBlamVjdChpZCkge1xuICAgIGlmICh0aGlzLmhhbmRsZXJzW2lkXSkge1xuICAgICAgdGhpcy5oYW5kbGVyc1tpZF0gPSBudWxsO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBDbGVhciBhbGwgaW50ZXJjZXB0b3JzIGZyb20gdGhlIHN0YWNrXG4gICAqXG4gICAqIEByZXR1cm5zIHt2b2lkfVxuICAgKi9cbiAgY2xlYXIoKSB7XG4gICAgaWYgKHRoaXMuaGFuZGxlcnMpIHtcbiAgICAgIHRoaXMuaGFuZGxlcnMgPSBbXTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogSXRlcmF0ZSBvdmVyIGFsbCB0aGUgcmVnaXN0ZXJlZCBpbnRlcmNlcHRvcnNcbiAgICpcbiAgICogVGhpcyBtZXRob2QgaXMgcGFydGljdWxhcmx5IHVzZWZ1bCBmb3Igc2tpcHBpbmcgb3ZlciBhbnlcbiAgICogaW50ZXJjZXB0b3JzIHRoYXQgbWF5IGhhdmUgYmVjb21lIGBudWxsYCBjYWxsaW5nIGBlamVjdGAuXG4gICAqXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IGZuIFRoZSBmdW5jdGlvbiB0byBjYWxsIGZvciBlYWNoIGludGVyY2VwdG9yXG4gICAqXG4gICAqIEByZXR1cm5zIHt2b2lkfVxuICAgKi9cbiAgZm9yRWFjaChmbikge1xuICAgIHV0aWxzLmZvckVhY2godGhpcy5oYW5kbGVycywgZnVuY3Rpb24gZm9yRWFjaEhhbmRsZXIoaCkge1xuICAgICAgaWYgKGggIT09IG51bGwpIHtcbiAgICAgICAgZm4oaCk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgSW50ZXJjZXB0b3JNYW5hZ2VyO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gIHNpbGVudEpTT05QYXJzaW5nOiB0cnVlLFxuICBmb3JjZWRKU09OUGFyc2luZzogdHJ1ZSxcbiAgY2xhcmlmeVRpbWVvdXRFcnJvcjogZmFsc2UsXG4gIGxlZ2FjeUludGVyY2VwdG9yUmVxUmVzT3JkZXJpbmc6IHRydWUsXG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQgQXhpb3NVUkxTZWFyY2hQYXJhbXMgZnJvbSAnLi4vLi4vLi4vaGVscGVycy9BeGlvc1VSTFNlYXJjaFBhcmFtcy5qcyc7XG5leHBvcnQgZGVmYXVsdCB0eXBlb2YgVVJMU2VhcmNoUGFyYW1zICE9PSAndW5kZWZpbmVkJyA/IFVSTFNlYXJjaFBhcmFtcyA6IEF4aW9zVVJMU2VhcmNoUGFyYW1zO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5leHBvcnQgZGVmYXVsdCB0eXBlb2YgRm9ybURhdGEgIT09ICd1bmRlZmluZWQnID8gRm9ybURhdGEgOiBudWxsO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5leHBvcnQgZGVmYXVsdCB0eXBlb2YgQmxvYiAhPT0gJ3VuZGVmaW5lZCcgPyBCbG9iIDogbnVsbDtcbiIsImltcG9ydCBVUkxTZWFyY2hQYXJhbXMgZnJvbSAnLi9jbGFzc2VzL1VSTFNlYXJjaFBhcmFtcy5qcyc7XG5pbXBvcnQgRm9ybURhdGEgZnJvbSAnLi9jbGFzc2VzL0Zvcm1EYXRhLmpzJztcbmltcG9ydCBCbG9iIGZyb20gJy4vY2xhc3Nlcy9CbG9iLmpzJztcblxuZXhwb3J0IGRlZmF1bHQge1xuICBpc0Jyb3dzZXI6IHRydWUsXG4gIGNsYXNzZXM6IHtcbiAgICBVUkxTZWFyY2hQYXJhbXMsXG4gICAgRm9ybURhdGEsXG4gICAgQmxvYixcbiAgfSxcbiAgcHJvdG9jb2xzOiBbJ2h0dHAnLCAnaHR0cHMnLCAnZmlsZScsICdibG9iJywgJ3VybCcsICdkYXRhJ10sXG59O1xuIiwiY29uc3QgaGFzQnJvd3NlckVudiA9IHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnICYmIHR5cGVvZiBkb2N1bWVudCAhPT0gJ3VuZGVmaW5lZCc7XG5cbmNvbnN0IF9uYXZpZ2F0b3IgPSAodHlwZW9mIG5hdmlnYXRvciA9PT0gJ29iamVjdCcgJiYgbmF2aWdhdG9yKSB8fCB1bmRlZmluZWQ7XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIHdlJ3JlIHJ1bm5pbmcgaW4gYSBzdGFuZGFyZCBicm93c2VyIGVudmlyb25tZW50XG4gKlxuICogVGhpcyBhbGxvd3MgYXhpb3MgdG8gcnVuIGluIGEgd2ViIHdvcmtlciwgYW5kIHJlYWN0LW5hdGl2ZS5cbiAqIEJvdGggZW52aXJvbm1lbnRzIHN1cHBvcnQgWE1MSHR0cFJlcXVlc3QsIGJ1dCBub3QgZnVsbHkgc3RhbmRhcmQgZ2xvYmFscy5cbiAqXG4gKiB3ZWIgd29ya2VyczpcbiAqICB0eXBlb2Ygd2luZG93IC0+IHVuZGVmaW5lZFxuICogIHR5cGVvZiBkb2N1bWVudCAtPiB1bmRlZmluZWRcbiAqXG4gKiByZWFjdC1uYXRpdmU6XG4gKiAgbmF2aWdhdG9yLnByb2R1Y3QgLT4gJ1JlYWN0TmF0aXZlJ1xuICogbmF0aXZlc2NyaXB0XG4gKiAgbmF2aWdhdG9yLnByb2R1Y3QgLT4gJ05hdGl2ZVNjcmlwdCcgb3IgJ05TJ1xuICpcbiAqIEByZXR1cm5zIHtib29sZWFufVxuICovXG5jb25zdCBoYXNTdGFuZGFyZEJyb3dzZXJFbnYgPVxuICBoYXNCcm93c2VyRW52ICYmXG4gICghX25hdmlnYXRvciB8fCBbJ1JlYWN0TmF0aXZlJywgJ05hdGl2ZVNjcmlwdCcsICdOUyddLmluZGV4T2YoX25hdmlnYXRvci5wcm9kdWN0KSA8IDApO1xuXG4vKipcbiAqIERldGVybWluZSBpZiB3ZSdyZSBydW5uaW5nIGluIGEgc3RhbmRhcmQgYnJvd3NlciB3ZWJXb3JrZXIgZW52aXJvbm1lbnRcbiAqXG4gKiBBbHRob3VnaCB0aGUgYGlzU3RhbmRhcmRCcm93c2VyRW52YCBtZXRob2QgaW5kaWNhdGVzIHRoYXRcbiAqIGBhbGxvd3MgYXhpb3MgdG8gcnVuIGluIGEgd2ViIHdvcmtlcmAsIHRoZSBXZWJXb3JrZXIgd2lsbCBzdGlsbCBiZVxuICogZmlsdGVyZWQgb3V0IGR1ZSB0byBpdHMganVkZ21lbnQgc3RhbmRhcmRcbiAqIGB0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJyAmJiB0eXBlb2YgZG9jdW1lbnQgIT09ICd1bmRlZmluZWQnYC5cbiAqIFRoaXMgbGVhZHMgdG8gYSBwcm9ibGVtIHdoZW4gYXhpb3MgcG9zdCBgRm9ybURhdGFgIGluIHdlYldvcmtlclxuICovXG5jb25zdCBoYXNTdGFuZGFyZEJyb3dzZXJXZWJXb3JrZXJFbnYgPSAoKCkgPT4ge1xuICByZXR1cm4gKFxuICAgIHR5cGVvZiBXb3JrZXJHbG9iYWxTY29wZSAhPT0gJ3VuZGVmaW5lZCcgJiZcbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW5kZWZcbiAgICBzZWxmIGluc3RhbmNlb2YgV29ya2VyR2xvYmFsU2NvcGUgJiZcbiAgICB0eXBlb2Ygc2VsZi5pbXBvcnRTY3JpcHRzID09PSAnZnVuY3Rpb24nXG4gICk7XG59KSgpO1xuXG5jb25zdCBvcmlnaW4gPSAoaGFzQnJvd3NlckVudiAmJiB3aW5kb3cubG9jYXRpb24uaHJlZikgfHwgJ2h0dHA6Ly9sb2NhbGhvc3QnO1xuXG5leHBvcnQge1xuICBoYXNCcm93c2VyRW52LFxuICBoYXNTdGFuZGFyZEJyb3dzZXJXZWJXb3JrZXJFbnYsXG4gIGhhc1N0YW5kYXJkQnJvd3NlckVudixcbiAgX25hdmlnYXRvciBhcyBuYXZpZ2F0b3IsXG4gIG9yaWdpbixcbn07XG4iLCJpbXBvcnQgcGxhdGZvcm0gZnJvbSAnLi9ub2RlL2luZGV4LmpzJztcbmltcG9ydCAqIGFzIHV0aWxzIGZyb20gJy4vY29tbW9uL3V0aWxzLmpzJztcblxuZXhwb3J0IGRlZmF1bHQge1xuICAuLi51dGlscyxcbiAgLi4ucGxhdGZvcm0sXG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQgdXRpbHMgZnJvbSAnLi4vdXRpbHMuanMnO1xuaW1wb3J0IHRvRm9ybURhdGEgZnJvbSAnLi90b0Zvcm1EYXRhLmpzJztcbmltcG9ydCBwbGF0Zm9ybSBmcm9tICcuLi9wbGF0Zm9ybS9pbmRleC5qcyc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHRvVVJMRW5jb2RlZEZvcm0oZGF0YSwgb3B0aW9ucykge1xuICByZXR1cm4gdG9Gb3JtRGF0YShkYXRhLCBuZXcgcGxhdGZvcm0uY2xhc3Nlcy5VUkxTZWFyY2hQYXJhbXMoKSwge1xuICAgIHZpc2l0b3I6IGZ1bmN0aW9uICh2YWx1ZSwga2V5LCBwYXRoLCBoZWxwZXJzKSB7XG4gICAgICBpZiAocGxhdGZvcm0uaXNOb2RlICYmIHV0aWxzLmlzQnVmZmVyKHZhbHVlKSkge1xuICAgICAgICB0aGlzLmFwcGVuZChrZXksIHZhbHVlLnRvU3RyaW5nKCdiYXNlNjQnKSk7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGhlbHBlcnMuZGVmYXVsdFZpc2l0b3IuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICB9LFxuICAgIC4uLm9wdGlvbnMsXG4gIH0pO1xufVxuIiwiJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQgdXRpbHMgZnJvbSAnLi4vdXRpbHMuanMnO1xuXG4vKipcbiAqIEl0IHRha2VzIGEgc3RyaW5nIGxpa2UgYGZvb1t4XVt5XVt6XWAgYW5kIHJldHVybnMgYW4gYXJyYXkgbGlrZSBgWydmb28nLCAneCcsICd5JywgJ3onXVxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lIC0gVGhlIG5hbWUgb2YgdGhlIHByb3BlcnR5IHRvIGdldC5cbiAqXG4gKiBAcmV0dXJucyBBbiBhcnJheSBvZiBzdHJpbmdzLlxuICovXG5mdW5jdGlvbiBwYXJzZVByb3BQYXRoKG5hbWUpIHtcbiAgLy8gZm9vW3hdW3ldW3pdXG4gIC8vIGZvby54LnkuelxuICAvLyBmb28teC15LXpcbiAgLy8gZm9vIHggeSB6XG4gIHJldHVybiB1dGlscy5tYXRjaEFsbCgvXFx3K3xcXFsoXFx3KildL2csIG5hbWUpLm1hcCgobWF0Y2gpID0+IHtcbiAgICByZXR1cm4gbWF0Y2hbMF0gPT09ICdbXScgPyAnJyA6IG1hdGNoWzFdIHx8IG1hdGNoWzBdO1xuICB9KTtcbn1cblxuLyoqXG4gKiBDb252ZXJ0IGFuIGFycmF5IHRvIGFuIG9iamVjdC5cbiAqXG4gKiBAcGFyYW0ge0FycmF5PGFueT59IGFyciAtIFRoZSBhcnJheSB0byBjb252ZXJ0IHRvIGFuIG9iamVjdC5cbiAqXG4gKiBAcmV0dXJucyBBbiBvYmplY3Qgd2l0aCB0aGUgc2FtZSBrZXlzIGFuZCB2YWx1ZXMgYXMgdGhlIGFycmF5LlxuICovXG5mdW5jdGlvbiBhcnJheVRvT2JqZWN0KGFycikge1xuICBjb25zdCBvYmogPSB7fTtcbiAgY29uc3Qga2V5cyA9IE9iamVjdC5rZXlzKGFycik7XG4gIGxldCBpO1xuICBjb25zdCBsZW4gPSBrZXlzLmxlbmd0aDtcbiAgbGV0IGtleTtcbiAgZm9yIChpID0gMDsgaSA8IGxlbjsgaSsrKSB7XG4gICAga2V5ID0ga2V5c1tpXTtcbiAgICBvYmpba2V5XSA9IGFycltrZXldO1xuICB9XG4gIHJldHVybiBvYmo7XG59XG5cbi8qKlxuICogSXQgdGFrZXMgYSBGb3JtRGF0YSBvYmplY3QgYW5kIHJldHVybnMgYSBKYXZhU2NyaXB0IG9iamVjdFxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBmb3JtRGF0YSBUaGUgRm9ybURhdGEgb2JqZWN0IHRvIGNvbnZlcnQgdG8gSlNPTi5cbiAqXG4gKiBAcmV0dXJucyB7T2JqZWN0PHN0cmluZywgYW55PiB8IG51bGx9IFRoZSBjb252ZXJ0ZWQgb2JqZWN0LlxuICovXG5mdW5jdGlvbiBmb3JtRGF0YVRvSlNPTihmb3JtRGF0YSkge1xuICBmdW5jdGlvbiBidWlsZFBhdGgocGF0aCwgdmFsdWUsIHRhcmdldCwgaW5kZXgpIHtcbiAgICBsZXQgbmFtZSA9IHBhdGhbaW5kZXgrK107XG5cbiAgICBpZiAobmFtZSA9PT0gJ19fcHJvdG9fXycpIHJldHVybiB0cnVlO1xuXG4gICAgY29uc3QgaXNOdW1lcmljS2V5ID0gTnVtYmVyLmlzRmluaXRlKCtuYW1lKTtcbiAgICBjb25zdCBpc0xhc3QgPSBpbmRleCA+PSBwYXRoLmxlbmd0aDtcbiAgICBuYW1lID0gIW5hbWUgJiYgdXRpbHMuaXNBcnJheSh0YXJnZXQpID8gdGFyZ2V0Lmxlbmd0aCA6IG5hbWU7XG5cbiAgICBpZiAoaXNMYXN0KSB7XG4gICAgICBpZiAodXRpbHMuaGFzT3duUHJvcCh0YXJnZXQsIG5hbWUpKSB7XG4gICAgICAgIHRhcmdldFtuYW1lXSA9IHV0aWxzLmlzQXJyYXkodGFyZ2V0W25hbWVdKVxuICAgICAgICAgID8gdGFyZ2V0W25hbWVdLmNvbmNhdCh2YWx1ZSlcbiAgICAgICAgICA6IFt0YXJnZXRbbmFtZV0sIHZhbHVlXTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRhcmdldFtuYW1lXSA9IHZhbHVlO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gIWlzTnVtZXJpY0tleTtcbiAgICB9XG5cbiAgICBpZiAoIXRhcmdldFtuYW1lXSB8fCAhdXRpbHMuaXNPYmplY3QodGFyZ2V0W25hbWVdKSkge1xuICAgICAgdGFyZ2V0W25hbWVdID0gW107XG4gICAgfVxuXG4gICAgY29uc3QgcmVzdWx0ID0gYnVpbGRQYXRoKHBhdGgsIHZhbHVlLCB0YXJnZXRbbmFtZV0sIGluZGV4KTtcblxuICAgIGlmIChyZXN1bHQgJiYgdXRpbHMuaXNBcnJheSh0YXJnZXRbbmFtZV0pKSB7XG4gICAgICB0YXJnZXRbbmFtZV0gPSBhcnJheVRvT2JqZWN0KHRhcmdldFtuYW1lXSk7XG4gICAgfVxuXG4gICAgcmV0dXJuICFpc051bWVyaWNLZXk7XG4gIH1cblxuICBpZiAodXRpbHMuaXNGb3JtRGF0YShmb3JtRGF0YSkgJiYgdXRpbHMuaXNGdW5jdGlvbihmb3JtRGF0YS5lbnRyaWVzKSkge1xuICAgIGNvbnN0IG9iaiA9IHt9O1xuXG4gICAgdXRpbHMuZm9yRWFjaEVudHJ5KGZvcm1EYXRhLCAobmFtZSwgdmFsdWUpID0+IHtcbiAgICAgIGJ1aWxkUGF0aChwYXJzZVByb3BQYXRoKG5hbWUpLCB2YWx1ZSwgb2JqLCAwKTtcbiAgICB9KTtcblxuICAgIHJldHVybiBvYmo7XG4gIH1cblxuICByZXR1cm4gbnVsbDtcbn1cblxuZXhwb3J0IGRlZmF1bHQgZm9ybURhdGFUb0pTT047XG4iLCIndXNlIHN0cmljdCc7XG5cbmltcG9ydCB1dGlscyBmcm9tICcuLi91dGlscy5qcyc7XG5pbXBvcnQgQXhpb3NFcnJvciBmcm9tICcuLi9jb3JlL0F4aW9zRXJyb3IuanMnO1xuaW1wb3J0IHRyYW5zaXRpb25hbERlZmF1bHRzIGZyb20gJy4vdHJhbnNpdGlvbmFsLmpzJztcbmltcG9ydCB0b0Zvcm1EYXRhIGZyb20gJy4uL2hlbHBlcnMvdG9Gb3JtRGF0YS5qcyc7XG5pbXBvcnQgdG9VUkxFbmNvZGVkRm9ybSBmcm9tICcuLi9oZWxwZXJzL3RvVVJMRW5jb2RlZEZvcm0uanMnO1xuaW1wb3J0IHBsYXRmb3JtIGZyb20gJy4uL3BsYXRmb3JtL2luZGV4LmpzJztcbmltcG9ydCBmb3JtRGF0YVRvSlNPTiBmcm9tICcuLi9oZWxwZXJzL2Zvcm1EYXRhVG9KU09OLmpzJztcblxuY29uc3Qgb3duID0gKG9iaiwga2V5KSA9PiAob2JqICE9IG51bGwgJiYgdXRpbHMuaGFzT3duUHJvcChvYmosIGtleSkgPyBvYmpba2V5XSA6IHVuZGVmaW5lZCk7XG5cbi8qKlxuICogSXQgdGFrZXMgYSBzdHJpbmcsIHRyaWVzIHRvIHBhcnNlIGl0LCBhbmQgaWYgaXQgZmFpbHMsIGl0IHJldHVybnMgdGhlIHN0cmluZ2lmaWVkIHZlcnNpb25cbiAqIG9mIHRoZSBpbnB1dFxuICpcbiAqIEBwYXJhbSB7YW55fSByYXdWYWx1ZSAtIFRoZSB2YWx1ZSB0byBiZSBzdHJpbmdpZmllZC5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IHBhcnNlciAtIEEgZnVuY3Rpb24gdGhhdCBwYXJzZXMgYSBzdHJpbmcgaW50byBhIEphdmFTY3JpcHQgb2JqZWN0LlxuICogQHBhcmFtIHtGdW5jdGlvbn0gZW5jb2RlciAtIEEgZnVuY3Rpb24gdGhhdCB0YWtlcyBhIHZhbHVlIGFuZCByZXR1cm5zIGEgc3RyaW5nLlxuICpcbiAqIEByZXR1cm5zIHtzdHJpbmd9IEEgc3RyaW5naWZpZWQgdmVyc2lvbiBvZiB0aGUgcmF3VmFsdWUuXG4gKi9cbmZ1bmN0aW9uIHN0cmluZ2lmeVNhZmVseShyYXdWYWx1ZSwgcGFyc2VyLCBlbmNvZGVyKSB7XG4gIGlmICh1dGlscy5pc1N0cmluZyhyYXdWYWx1ZSkpIHtcbiAgICB0cnkge1xuICAgICAgKHBhcnNlciB8fCBKU09OLnBhcnNlKShyYXdWYWx1ZSk7XG4gICAgICByZXR1cm4gdXRpbHMudHJpbShyYXdWYWx1ZSk7XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgaWYgKGUubmFtZSAhPT0gJ1N5bnRheEVycm9yJykge1xuICAgICAgICB0aHJvdyBlO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiAoZW5jb2RlciB8fCBKU09OLnN0cmluZ2lmeSkocmF3VmFsdWUpO1xufVxuXG5jb25zdCBkZWZhdWx0cyA9IHtcbiAgdHJhbnNpdGlvbmFsOiB0cmFuc2l0aW9uYWxEZWZhdWx0cyxcblxuICBhZGFwdGVyOiBbJ3hocicsICdodHRwJywgJ2ZldGNoJ10sXG5cbiAgdHJhbnNmb3JtUmVxdWVzdDogW1xuICAgIGZ1bmN0aW9uIHRyYW5zZm9ybVJlcXVlc3QoZGF0YSwgaGVhZGVycykge1xuICAgICAgY29uc3QgY29udGVudFR5cGUgPSBoZWFkZXJzLmdldENvbnRlbnRUeXBlKCkgfHwgJyc7XG4gICAgICBjb25zdCBoYXNKU09OQ29udGVudFR5cGUgPSBjb250ZW50VHlwZS5pbmRleE9mKCdhcHBsaWNhdGlvbi9qc29uJykgPiAtMTtcbiAgICAgIGNvbnN0IGlzT2JqZWN0UGF5bG9hZCA9IHV0aWxzLmlzT2JqZWN0KGRhdGEpO1xuXG4gICAgICBpZiAoaXNPYmplY3RQYXlsb2FkICYmIHV0aWxzLmlzSFRNTEZvcm0oZGF0YSkpIHtcbiAgICAgICAgZGF0YSA9IG5ldyBGb3JtRGF0YShkYXRhKTtcbiAgICAgIH1cblxuICAgICAgY29uc3QgaXNGb3JtRGF0YSA9IHV0aWxzLmlzRm9ybURhdGEoZGF0YSk7XG5cbiAgICAgIGlmIChpc0Zvcm1EYXRhKSB7XG4gICAgICAgIHJldHVybiBoYXNKU09OQ29udGVudFR5cGUgPyBKU09OLnN0cmluZ2lmeShmb3JtRGF0YVRvSlNPTihkYXRhKSkgOiBkYXRhO1xuICAgICAgfVxuXG4gICAgICBpZiAoXG4gICAgICAgIHV0aWxzLmlzQXJyYXlCdWZmZXIoZGF0YSkgfHxcbiAgICAgICAgdXRpbHMuaXNCdWZmZXIoZGF0YSkgfHxcbiAgICAgICAgdXRpbHMuaXNTdHJlYW0oZGF0YSkgfHxcbiAgICAgICAgdXRpbHMuaXNGaWxlKGRhdGEpIHx8XG4gICAgICAgIHV0aWxzLmlzQmxvYihkYXRhKSB8fFxuICAgICAgICB1dGlscy5pc1JlYWRhYmxlU3RyZWFtKGRhdGEpXG4gICAgICApIHtcbiAgICAgICAgcmV0dXJuIGRhdGE7XG4gICAgICB9XG4gICAgICBpZiAodXRpbHMuaXNBcnJheUJ1ZmZlclZpZXcoZGF0YSkpIHtcbiAgICAgICAgcmV0dXJuIGRhdGEuYnVmZmVyO1xuICAgICAgfVxuICAgICAgaWYgKHV0aWxzLmlzVVJMU2VhcmNoUGFyYW1zKGRhdGEpKSB7XG4gICAgICAgIGhlYWRlcnMuc2V0Q29udGVudFR5cGUoJ2FwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZDtjaGFyc2V0PXV0Zi04JywgZmFsc2UpO1xuICAgICAgICByZXR1cm4gZGF0YS50b1N0cmluZygpO1xuICAgICAgfVxuXG4gICAgICBsZXQgaXNGaWxlTGlzdDtcblxuICAgICAgaWYgKGlzT2JqZWN0UGF5bG9hZCkge1xuICAgICAgICBjb25zdCBmb3JtU2VyaWFsaXplciA9IG93bih0aGlzLCAnZm9ybVNlcmlhbGl6ZXInKTtcbiAgICAgICAgaWYgKGNvbnRlbnRUeXBlLmluZGV4T2YoJ2FwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZCcpID4gLTEpIHtcbiAgICAgICAgICByZXR1cm4gdG9VUkxFbmNvZGVkRm9ybShkYXRhLCBmb3JtU2VyaWFsaXplcikudG9TdHJpbmcoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChcbiAgICAgICAgICAoaXNGaWxlTGlzdCA9IHV0aWxzLmlzRmlsZUxpc3QoZGF0YSkpIHx8XG4gICAgICAgICAgY29udGVudFR5cGUuaW5kZXhPZignbXVsdGlwYXJ0L2Zvcm0tZGF0YScpID4gLTFcbiAgICAgICAgKSB7XG4gICAgICAgICAgY29uc3QgZW52ID0gb3duKHRoaXMsICdlbnYnKTtcbiAgICAgICAgICBjb25zdCBfRm9ybURhdGEgPSBlbnYgJiYgZW52LkZvcm1EYXRhO1xuXG4gICAgICAgICAgcmV0dXJuIHRvRm9ybURhdGEoXG4gICAgICAgICAgICBpc0ZpbGVMaXN0ID8geyAnZmlsZXNbXSc6IGRhdGEgfSA6IGRhdGEsXG4gICAgICAgICAgICBfRm9ybURhdGEgJiYgbmV3IF9Gb3JtRGF0YSgpLFxuICAgICAgICAgICAgZm9ybVNlcmlhbGl6ZXJcbiAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmIChpc09iamVjdFBheWxvYWQgfHwgaGFzSlNPTkNvbnRlbnRUeXBlKSB7XG4gICAgICAgIGhlYWRlcnMuc2V0Q29udGVudFR5cGUoJ2FwcGxpY2F0aW9uL2pzb24nLCBmYWxzZSk7XG4gICAgICAgIHJldHVybiBzdHJpbmdpZnlTYWZlbHkoZGF0YSk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBkYXRhO1xuICAgIH0sXG4gIF0sXG5cbiAgdHJhbnNmb3JtUmVzcG9uc2U6IFtcbiAgICBmdW5jdGlvbiB0cmFuc2Zvcm1SZXNwb25zZShkYXRhKSB7XG4gICAgICBjb25zdCB0cmFuc2l0aW9uYWwgPSBvd24odGhpcywgJ3RyYW5zaXRpb25hbCcpIHx8IGRlZmF1bHRzLnRyYW5zaXRpb25hbDtcbiAgICAgIGNvbnN0IGZvcmNlZEpTT05QYXJzaW5nID0gdHJhbnNpdGlvbmFsICYmIHRyYW5zaXRpb25hbC5mb3JjZWRKU09OUGFyc2luZztcbiAgICAgIGNvbnN0IHJlc3BvbnNlVHlwZSA9IG93bih0aGlzLCAncmVzcG9uc2VUeXBlJyk7XG4gICAgICBjb25zdCBKU09OUmVxdWVzdGVkID0gcmVzcG9uc2VUeXBlID09PSAnanNvbic7XG5cbiAgICAgIGlmICh1dGlscy5pc1Jlc3BvbnNlKGRhdGEpIHx8IHV0aWxzLmlzUmVhZGFibGVTdHJlYW0oZGF0YSkpIHtcbiAgICAgICAgcmV0dXJuIGRhdGE7XG4gICAgICB9XG5cbiAgICAgIGlmIChcbiAgICAgICAgZGF0YSAmJlxuICAgICAgICB1dGlscy5pc1N0cmluZyhkYXRhKSAmJlxuICAgICAgICAoKGZvcmNlZEpTT05QYXJzaW5nICYmICFyZXNwb25zZVR5cGUpIHx8IEpTT05SZXF1ZXN0ZWQpXG4gICAgICApIHtcbiAgICAgICAgY29uc3Qgc2lsZW50SlNPTlBhcnNpbmcgPSB0cmFuc2l0aW9uYWwgJiYgdHJhbnNpdGlvbmFsLnNpbGVudEpTT05QYXJzaW5nO1xuICAgICAgICBjb25zdCBzdHJpY3RKU09OUGFyc2luZyA9ICFzaWxlbnRKU09OUGFyc2luZyAmJiBKU09OUmVxdWVzdGVkO1xuXG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgcmV0dXJuIEpTT04ucGFyc2UoZGF0YSwgb3duKHRoaXMsICdwYXJzZVJldml2ZXInKSk7XG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICBpZiAoc3RyaWN0SlNPTlBhcnNpbmcpIHtcbiAgICAgICAgICAgIGlmIChlLm5hbWUgPT09ICdTeW50YXhFcnJvcicpIHtcbiAgICAgICAgICAgICAgdGhyb3cgQXhpb3NFcnJvci5mcm9tKGUsIEF4aW9zRXJyb3IuRVJSX0JBRF9SRVNQT05TRSwgdGhpcywgbnVsbCwgb3duKHRoaXMsICdyZXNwb25zZScpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRocm93IGU7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBkYXRhO1xuICAgIH0sXG4gIF0sXG5cbiAgLyoqXG4gICAqIEEgdGltZW91dCBpbiBtaWxsaXNlY29uZHMgdG8gYWJvcnQgYSByZXF1ZXN0LiBJZiBzZXQgdG8gMCAoZGVmYXVsdCkgYVxuICAgKiB0aW1lb3V0IGlzIG5vdCBjcmVhdGVkLlxuICAgKi9cbiAgdGltZW91dDogMCxcblxuICB4c3JmQ29va2llTmFtZTogJ1hTUkYtVE9LRU4nLFxuICB4c3JmSGVhZGVyTmFtZTogJ1gtWFNSRi1UT0tFTicsXG5cbiAgbWF4Q29udGVudExlbmd0aDogLTEsXG4gIG1heEJvZHlMZW5ndGg6IC0xLFxuXG4gIGVudjoge1xuICAgIEZvcm1EYXRhOiBwbGF0Zm9ybS5jbGFzc2VzLkZvcm1EYXRhLFxuICAgIEJsb2I6IHBsYXRmb3JtLmNsYXNzZXMuQmxvYixcbiAgfSxcblxuICB2YWxpZGF0ZVN0YXR1czogZnVuY3Rpb24gdmFsaWRhdGVTdGF0dXMoc3RhdHVzKSB7XG4gICAgcmV0dXJuIHN0YXR1cyA+PSAyMDAgJiYgc3RhdHVzIDwgMzAwO1xuICB9LFxuXG4gIGhlYWRlcnM6IHtcbiAgICBjb21tb246IHtcbiAgICAgIEFjY2VwdDogJ2FwcGxpY2F0aW9uL2pzb24sIHRleHQvcGxhaW4sICovKicsXG4gICAgICAnQ29udGVudC1UeXBlJzogdW5kZWZpbmVkLFxuICAgIH0sXG4gIH0sXG59O1xuXG51dGlscy5mb3JFYWNoKFsnZGVsZXRlJywgJ2dldCcsICdoZWFkJywgJ3Bvc3QnLCAncHV0JywgJ3BhdGNoJywgJ3F1ZXJ5J10sIChtZXRob2QpID0+IHtcbiAgZGVmYXVsdHMuaGVhZGVyc1ttZXRob2RdID0ge307XG59KTtcblxuZXhwb3J0IGRlZmF1bHQgZGVmYXVsdHM7XG4iLCIndXNlIHN0cmljdCc7XG5cbmltcG9ydCB1dGlscyBmcm9tICcuLi91dGlscy5qcyc7XG5pbXBvcnQgZGVmYXVsdHMgZnJvbSAnLi4vZGVmYXVsdHMvaW5kZXguanMnO1xuaW1wb3J0IEF4aW9zSGVhZGVycyBmcm9tICcuLi9jb3JlL0F4aW9zSGVhZGVycy5qcyc7XG5cbi8qKlxuICogVHJhbnNmb3JtIHRoZSBkYXRhIGZvciBhIHJlcXVlc3Qgb3IgYSByZXNwb25zZVxuICpcbiAqIEBwYXJhbSB7QXJyYXl8RnVuY3Rpb259IGZucyBBIHNpbmdsZSBmdW5jdGlvbiBvciBBcnJheSBvZiBmdW5jdGlvbnNcbiAqIEBwYXJhbSB7P09iamVjdH0gcmVzcG9uc2UgVGhlIHJlc3BvbnNlIG9iamVjdFxuICpcbiAqIEByZXR1cm5zIHsqfSBUaGUgcmVzdWx0aW5nIHRyYW5zZm9ybWVkIGRhdGFcbiAqL1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gdHJhbnNmb3JtRGF0YShmbnMsIHJlc3BvbnNlKSB7XG4gIGNvbnN0IGNvbmZpZyA9IHRoaXMgfHwgZGVmYXVsdHM7XG4gIGNvbnN0IGNvbnRleHQgPSByZXNwb25zZSB8fCBjb25maWc7XG4gIGNvbnN0IGhlYWRlcnMgPSBBeGlvc0hlYWRlcnMuZnJvbShjb250ZXh0LmhlYWRlcnMpO1xuICBsZXQgZGF0YSA9IGNvbnRleHQuZGF0YTtcblxuICB1dGlscy5mb3JFYWNoKGZucywgZnVuY3Rpb24gdHJhbnNmb3JtKGZuKSB7XG4gICAgZGF0YSA9IGZuLmNhbGwoY29uZmlnLCBkYXRhLCBoZWFkZXJzLm5vcm1hbGl6ZSgpLCByZXNwb25zZSA/IHJlc3BvbnNlLnN0YXR1cyA6IHVuZGVmaW5lZCk7XG4gIH0pO1xuXG4gIGhlYWRlcnMubm9ybWFsaXplKCk7XG5cbiAgcmV0dXJuIGRhdGE7XG59XG4iLCIndXNlIHN0cmljdCc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGlzQ2FuY2VsKHZhbHVlKSB7XG4gIHJldHVybiAhISh2YWx1ZSAmJiB2YWx1ZS5fX0NBTkNFTF9fKTtcbn1cbiIsIid1c2Ugc3RyaWN0JztcblxuaW1wb3J0IEF4aW9zRXJyb3IgZnJvbSAnLi4vY29yZS9BeGlvc0Vycm9yLmpzJztcblxuY2xhc3MgQ2FuY2VsZWRFcnJvciBleHRlbmRzIEF4aW9zRXJyb3Ige1xuICAvKipcbiAgICogQSBgQ2FuY2VsZWRFcnJvcmAgaXMgYW4gb2JqZWN0IHRoYXQgaXMgdGhyb3duIHdoZW4gYW4gb3BlcmF0aW9uIGlzIGNhbmNlbGVkLlxuICAgKlxuICAgKiBAcGFyYW0ge3N0cmluZz19IG1lc3NhZ2UgVGhlIG1lc3NhZ2UuXG4gICAqIEBwYXJhbSB7T2JqZWN0PX0gY29uZmlnIFRoZSBjb25maWcuXG4gICAqIEBwYXJhbSB7T2JqZWN0PX0gcmVxdWVzdCBUaGUgcmVxdWVzdC5cbiAgICpcbiAgICogQHJldHVybnMge0NhbmNlbGVkRXJyb3J9IFRoZSBjcmVhdGVkIGVycm9yLlxuICAgKi9cbiAgY29uc3RydWN0b3IobWVzc2FnZSwgY29uZmlnLCByZXF1ZXN0KSB7XG4gICAgc3VwZXIobWVzc2FnZSA9PSBudWxsID8gJ2NhbmNlbGVkJyA6IG1lc3NhZ2UsIEF4aW9zRXJyb3IuRVJSX0NBTkNFTEVELCBjb25maWcsIHJlcXVlc3QpO1xuICAgIHRoaXMubmFtZSA9ICdDYW5jZWxlZEVycm9yJztcbiAgICB0aGlzLl9fQ0FOQ0VMX18gPSB0cnVlO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IENhbmNlbGVkRXJyb3I7XG4iLCIndXNlIHN0cmljdCc7XG5cbmltcG9ydCBBeGlvc0Vycm9yIGZyb20gJy4vQXhpb3NFcnJvci5qcyc7XG5cbi8qKlxuICogUmVzb2x2ZSBvciByZWplY3QgYSBQcm9taXNlIGJhc2VkIG9uIHJlc3BvbnNlIHN0YXR1cy5cbiAqXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSByZXNvbHZlIEEgZnVuY3Rpb24gdGhhdCByZXNvbHZlcyB0aGUgcHJvbWlzZS5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IHJlamVjdCBBIGZ1bmN0aW9uIHRoYXQgcmVqZWN0cyB0aGUgcHJvbWlzZS5cbiAqIEBwYXJhbSB7b2JqZWN0fSByZXNwb25zZSBUaGUgcmVzcG9uc2UuXG4gKlxuICogQHJldHVybnMge29iamVjdH0gVGhlIHJlc3BvbnNlLlxuICovXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBzZXR0bGUocmVzb2x2ZSwgcmVqZWN0LCByZXNwb25zZSkge1xuICBjb25zdCB2YWxpZGF0ZVN0YXR1cyA9IHJlc3BvbnNlLmNvbmZpZy52YWxpZGF0ZVN0YXR1cztcbiAgaWYgKCFyZXNwb25zZS5zdGF0dXMgfHwgIXZhbGlkYXRlU3RhdHVzIHx8IHZhbGlkYXRlU3RhdHVzKHJlc3BvbnNlLnN0YXR1cykpIHtcbiAgICByZXNvbHZlKHJlc3BvbnNlKTtcbiAgfSBlbHNlIHtcbiAgICByZWplY3QobmV3IEF4aW9zRXJyb3IoXG4gICAgICAnUmVxdWVzdCBmYWlsZWQgd2l0aCBzdGF0dXMgY29kZSAnICsgcmVzcG9uc2Uuc3RhdHVzLFxuICAgICAgcmVzcG9uc2Uuc3RhdHVzID49IDQwMCAmJiByZXNwb25zZS5zdGF0dXMgPCA1MDAgPyBBeGlvc0Vycm9yLkVSUl9CQURfUkVRVUVTVCA6IEF4aW9zRXJyb3IuRVJSX0JBRF9SRVNQT05TRSxcbiAgICAgIHJlc3BvbnNlLmNvbmZpZyxcbiAgICAgIHJlc3BvbnNlLnJlcXVlc3QsXG4gICAgICByZXNwb25zZVxuICAgICkpO1xuICB9XG59XG4iLCIndXNlIHN0cmljdCc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHBhcnNlUHJvdG9jb2wodXJsKSB7XG4gIGNvbnN0IG1hdGNoID0gL14oWy0rXFx3XXsxLDI1fSk6KD86XFwvXFwvKT8vLmV4ZWModXJsKTtcbiAgcmV0dXJuIChtYXRjaCAmJiBtYXRjaFsxXSkgfHwgJyc7XG59XG4iLCIndXNlIHN0cmljdCc7XG5cbi8qKlxuICogQ2FsY3VsYXRlIGRhdGEgbWF4UmF0ZVxuICogQHBhcmFtIHtOdW1iZXJ9IFtzYW1wbGVzQ291bnQ9IDEwXVxuICogQHBhcmFtIHtOdW1iZXJ9IFttaW49IDEwMDBdXG4gKiBAcmV0dXJucyB7RnVuY3Rpb259XG4gKi9cbmZ1bmN0aW9uIHNwZWVkb21ldGVyKHNhbXBsZXNDb3VudCwgbWluKSB7XG4gIHNhbXBsZXNDb3VudCA9IHNhbXBsZXNDb3VudCB8fCAxMDtcbiAgY29uc3QgYnl0ZXMgPSBuZXcgQXJyYXkoc2FtcGxlc0NvdW50KTtcbiAgY29uc3QgdGltZXN0YW1wcyA9IG5ldyBBcnJheShzYW1wbGVzQ291bnQpO1xuICBsZXQgaGVhZCA9IDA7XG4gIGxldCB0YWlsID0gMDtcbiAgbGV0IGZpcnN0U2FtcGxlVFM7XG5cbiAgbWluID0gbWluICE9PSB1bmRlZmluZWQgPyBtaW4gOiAxMDAwO1xuXG4gIHJldHVybiBmdW5jdGlvbiBwdXNoKGNodW5rTGVuZ3RoKSB7XG4gICAgY29uc3Qgbm93ID0gRGF0ZS5ub3coKTtcblxuICAgIGNvbnN0IHN0YXJ0ZWRBdCA9IHRpbWVzdGFtcHNbdGFpbF07XG5cbiAgICBpZiAoIWZpcnN0U2FtcGxlVFMpIHtcbiAgICAgIGZpcnN0U2FtcGxlVFMgPSBub3c7XG4gICAgfVxuXG4gICAgYnl0ZXNbaGVhZF0gPSBjaHVua0xlbmd0aDtcbiAgICB0aW1lc3RhbXBzW2hlYWRdID0gbm93O1xuXG4gICAgbGV0IGkgPSB0YWlsO1xuICAgIGxldCBieXRlc0NvdW50ID0gMDtcblxuICAgIHdoaWxlIChpICE9PSBoZWFkKSB7XG4gICAgICBieXRlc0NvdW50ICs9IGJ5dGVzW2krK107XG4gICAgICBpID0gaSAlIHNhbXBsZXNDb3VudDtcbiAgICB9XG5cbiAgICBoZWFkID0gKGhlYWQgKyAxKSAlIHNhbXBsZXNDb3VudDtcblxuICAgIGlmIChoZWFkID09PSB0YWlsKSB7XG4gICAgICB0YWlsID0gKHRhaWwgKyAxKSAlIHNhbXBsZXNDb3VudDtcbiAgICB9XG5cbiAgICBpZiAobm93IC0gZmlyc3RTYW1wbGVUUyA8IG1pbikge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IHBhc3NlZCA9IHN0YXJ0ZWRBdCAmJiBub3cgLSBzdGFydGVkQXQ7XG5cbiAgICByZXR1cm4gcGFzc2VkID8gTWF0aC5yb3VuZCgoYnl0ZXNDb3VudCAqIDEwMDApIC8gcGFzc2VkKSA6IHVuZGVmaW5lZDtcbiAgfTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgc3BlZWRvbWV0ZXI7XG4iLCIvKipcbiAqIFRocm90dGxlIGRlY29yYXRvclxuICogQHBhcmFtIHtGdW5jdGlvbn0gZm5cbiAqIEBwYXJhbSB7TnVtYmVyfSBmcmVxXG4gKiBAcmV0dXJuIHtGdW5jdGlvbn1cbiAqL1xuZnVuY3Rpb24gdGhyb3R0bGUoZm4sIGZyZXEpIHtcbiAgbGV0IHRpbWVzdGFtcCA9IDA7XG4gIGxldCB0aHJlc2hvbGQgPSAxMDAwIC8gZnJlcTtcbiAgbGV0IGxhc3RBcmdzO1xuICBsZXQgdGltZXI7XG5cbiAgY29uc3QgaW52b2tlID0gKGFyZ3MsIG5vdyA9IERhdGUubm93KCkpID0+IHtcbiAgICB0aW1lc3RhbXAgPSBub3c7XG4gICAgbGFzdEFyZ3MgPSBudWxsO1xuICAgIGlmICh0aW1lcikge1xuICAgICAgY2xlYXJUaW1lb3V0KHRpbWVyKTtcbiAgICAgIHRpbWVyID0gbnVsbDtcbiAgICB9XG4gICAgZm4oLi4uYXJncyk7XG4gIH07XG5cbiAgY29uc3QgdGhyb3R0bGVkID0gKC4uLmFyZ3MpID0+IHtcbiAgICBjb25zdCBub3cgPSBEYXRlLm5vdygpO1xuICAgIGNvbnN0IHBhc3NlZCA9IG5vdyAtIHRpbWVzdGFtcDtcbiAgICBpZiAocGFzc2VkID49IHRocmVzaG9sZCkge1xuICAgICAgaW52b2tlKGFyZ3MsIG5vdyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGxhc3RBcmdzID0gYXJncztcbiAgICAgIGlmICghdGltZXIpIHtcbiAgICAgICAgdGltZXIgPSBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICB0aW1lciA9IG51bGw7XG4gICAgICAgICAgaW52b2tlKGxhc3RBcmdzKTtcbiAgICAgICAgfSwgdGhyZXNob2xkIC0gcGFzc2VkKTtcbiAgICAgIH1cbiAgICB9XG4gIH07XG5cbiAgY29uc3QgZmx1c2ggPSAoKSA9PiBsYXN0QXJncyAmJiBpbnZva2UobGFzdEFyZ3MpO1xuXG4gIHJldHVybiBbdGhyb3R0bGVkLCBmbHVzaF07XG59XG5cbmV4cG9ydCBkZWZhdWx0IHRocm90dGxlO1xuIiwiaW1wb3J0IHNwZWVkb21ldGVyIGZyb20gJy4vc3BlZWRvbWV0ZXIuanMnO1xuaW1wb3J0IHRocm90dGxlIGZyb20gJy4vdGhyb3R0bGUuanMnO1xuaW1wb3J0IHV0aWxzIGZyb20gJy4uL3V0aWxzLmpzJztcblxuZXhwb3J0IGNvbnN0IHByb2dyZXNzRXZlbnRSZWR1Y2VyID0gKGxpc3RlbmVyLCBpc0Rvd25sb2FkU3RyZWFtLCBmcmVxID0gMykgPT4ge1xuICBsZXQgYnl0ZXNOb3RpZmllZCA9IDA7XG4gIGNvbnN0IF9zcGVlZG9tZXRlciA9IHNwZWVkb21ldGVyKDUwLCAyNTApO1xuXG4gIHJldHVybiB0aHJvdHRsZSgoZSkgPT4ge1xuICAgIGNvbnN0IHJhd0xvYWRlZCA9IGUubG9hZGVkO1xuICAgIGNvbnN0IHRvdGFsID0gZS5sZW5ndGhDb21wdXRhYmxlID8gZS50b3RhbCA6IHVuZGVmaW5lZDtcbiAgICBjb25zdCBsb2FkZWQgPSB0b3RhbCAhPSBudWxsID8gTWF0aC5taW4ocmF3TG9hZGVkLCB0b3RhbCkgOiByYXdMb2FkZWQ7XG4gICAgY29uc3QgcHJvZ3Jlc3NCeXRlcyA9IE1hdGgubWF4KDAsIGxvYWRlZCAtIGJ5dGVzTm90aWZpZWQpO1xuICAgIGNvbnN0IHJhdGUgPSBfc3BlZWRvbWV0ZXIocHJvZ3Jlc3NCeXRlcyk7XG5cbiAgICBieXRlc05vdGlmaWVkID0gTWF0aC5tYXgoYnl0ZXNOb3RpZmllZCwgbG9hZGVkKTtcblxuICAgIGNvbnN0IGRhdGEgPSB7XG4gICAgICBsb2FkZWQsXG4gICAgICB0b3RhbCxcbiAgICAgIHByb2dyZXNzOiB0b3RhbCA/IGxvYWRlZCAvIHRvdGFsIDogdW5kZWZpbmVkLFxuICAgICAgYnl0ZXM6IHByb2dyZXNzQnl0ZXMsXG4gICAgICByYXRlOiByYXRlID8gcmF0ZSA6IHVuZGVmaW5lZCxcbiAgICAgIGVzdGltYXRlZDogcmF0ZSAmJiB0b3RhbCA/ICh0b3RhbCAtIGxvYWRlZCkgLyByYXRlIDogdW5kZWZpbmVkLFxuICAgICAgZXZlbnQ6IGUsXG4gICAgICBsZW5ndGhDb21wdXRhYmxlOiB0b3RhbCAhPSBudWxsLFxuICAgICAgW2lzRG93bmxvYWRTdHJlYW0gPyAnZG93bmxvYWQnIDogJ3VwbG9hZCddOiB0cnVlLFxuICAgIH07XG5cbiAgICBsaXN0ZW5lcihkYXRhKTtcbiAgfSwgZnJlcSk7XG59O1xuXG5leHBvcnQgY29uc3QgcHJvZ3Jlc3NFdmVudERlY29yYXRvciA9ICh0b3RhbCwgdGhyb3R0bGVkKSA9PiB7XG4gIGNvbnN0IGxlbmd0aENvbXB1dGFibGUgPSB0b3RhbCAhPSBudWxsO1xuXG4gIHJldHVybiBbXG4gICAgKGxvYWRlZCkgPT5cbiAgICAgIHRocm90dGxlZFswXSh7XG4gICAgICAgIGxlbmd0aENvbXB1dGFibGUsXG4gICAgICAgIHRvdGFsLFxuICAgICAgICBsb2FkZWQsXG4gICAgICB9KSxcbiAgICB0aHJvdHRsZWRbMV0sXG4gIF07XG59O1xuXG5leHBvcnQgY29uc3QgYXN5bmNEZWNvcmF0b3IgPVxuICAoZm4pID0+XG4gICguLi5hcmdzKSA9PlxuICAgIHV0aWxzLmFzYXAoKCkgPT4gZm4oLi4uYXJncykpO1xuIiwiaW1wb3J0IHBsYXRmb3JtIGZyb20gJy4uL3BsYXRmb3JtL2luZGV4LmpzJztcblxuZXhwb3J0IGRlZmF1bHQgcGxhdGZvcm0uaGFzU3RhbmRhcmRCcm93c2VyRW52XG4gID8gKChvcmlnaW4sIGlzTVNJRSkgPT4gKHVybCkgPT4ge1xuICAgICAgdXJsID0gbmV3IFVSTCh1cmwsIHBsYXRmb3JtLm9yaWdpbik7XG5cbiAgICAgIHJldHVybiAoXG4gICAgICAgIG9yaWdpbi5wcm90b2NvbCA9PT0gdXJsLnByb3RvY29sICYmXG4gICAgICAgIG9yaWdpbi5ob3N0ID09PSB1cmwuaG9zdCAmJlxuICAgICAgICAoaXNNU0lFIHx8IG9yaWdpbi5wb3J0ID09PSB1cmwucG9ydClcbiAgICAgICk7XG4gICAgfSkoXG4gICAgICBuZXcgVVJMKHBsYXRmb3JtLm9yaWdpbiksXG4gICAgICBwbGF0Zm9ybS5uYXZpZ2F0b3IgJiYgLyhtc2llfHRyaWRlbnQpL2kudGVzdChwbGF0Zm9ybS5uYXZpZ2F0b3IudXNlckFnZW50KVxuICAgIClcbiAgOiAoKSA9PiB0cnVlO1xuIiwiaW1wb3J0IHV0aWxzIGZyb20gJy4uL3V0aWxzLmpzJztcbmltcG9ydCBwbGF0Zm9ybSBmcm9tICcuLi9wbGF0Zm9ybS9pbmRleC5qcyc7XG5cbmV4cG9ydCBkZWZhdWx0IHBsYXRmb3JtLmhhc1N0YW5kYXJkQnJvd3NlckVudlxuICA/IC8vIFN0YW5kYXJkIGJyb3dzZXIgZW52cyBzdXBwb3J0IGRvY3VtZW50LmNvb2tpZVxuICAgIHtcbiAgICAgIHdyaXRlKG5hbWUsIHZhbHVlLCBleHBpcmVzLCBwYXRoLCBkb21haW4sIHNlY3VyZSwgc2FtZVNpdGUpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBkb2N1bWVudCA9PT0gJ3VuZGVmaW5lZCcpIHJldHVybjtcblxuICAgICAgICBjb25zdCBjb29raWUgPSBbYCR7bmFtZX09JHtlbmNvZGVVUklDb21wb25lbnQodmFsdWUpfWBdO1xuXG4gICAgICAgIGlmICh1dGlscy5pc051bWJlcihleHBpcmVzKSkge1xuICAgICAgICAgIGNvb2tpZS5wdXNoKGBleHBpcmVzPSR7bmV3IERhdGUoZXhwaXJlcykudG9VVENTdHJpbmcoKX1gKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodXRpbHMuaXNTdHJpbmcocGF0aCkpIHtcbiAgICAgICAgICBjb29raWUucHVzaChgcGF0aD0ke3BhdGh9YCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHV0aWxzLmlzU3RyaW5nKGRvbWFpbikpIHtcbiAgICAgICAgICBjb29raWUucHVzaChgZG9tYWluPSR7ZG9tYWlufWApO1xuICAgICAgICB9XG4gICAgICAgIGlmIChzZWN1cmUgPT09IHRydWUpIHtcbiAgICAgICAgICBjb29raWUucHVzaCgnc2VjdXJlJyk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHV0aWxzLmlzU3RyaW5nKHNhbWVTaXRlKSkge1xuICAgICAgICAgIGNvb2tpZS5wdXNoKGBTYW1lU2l0ZT0ke3NhbWVTaXRlfWApO1xuICAgICAgICB9XG5cbiAgICAgICAgZG9jdW1lbnQuY29va2llID0gY29va2llLmpvaW4oJzsgJyk7XG4gICAgICB9LFxuXG4gICAgICByZWFkKG5hbWUpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBkb2N1bWVudCA9PT0gJ3VuZGVmaW5lZCcpIHJldHVybiBudWxsO1xuICAgICAgICAvLyBNYXRjaCBuYW1lPXZhbHVlIGJ5IHNwbGl0dGluZyBvbiB0aGUgc2VtaWNvbG9uIHNlcGFyYXRvciBpbnN0ZWFkIG9mIGJ1aWxkaW5nIGFcbiAgICAgICAgLy8gUmVnRXhwIGZyb20gYG5hbWVgIOKAlCBpbnRlcnBvbGF0aW5nIGFuIHVuZXNjYXBlZCBzdHJpbmcgaW50byBhIFJlZ0V4cCB3b3VsZCBsZXRcbiAgICAgICAgLy8gbWV0YWNoYXJhY3RlcnMgKGUuZy4gYC4rP2AgaW4gYW4gYXR0YWNrZXItaW5mbHVlbmNlZCBjb29raWUgbmFtZSkgY2F1c2UgUmVEb1Mgb3JcbiAgICAgICAgLy8gbWF0Y2ggdGhlIHdyb25nIGNvb2tpZS4gQnJvd3NlcnMgbWF5IHNlcmlhbGl6ZSBjb29raWUgcGFpcnMgYXMgZWl0aGVyIFwiO1wiIG9yXG4gICAgICAgIC8vIFwiOyBcIiwgc28gaWdub3JlIG9wdGlvbmFsIHdoaXRlc3BhY2UgYmVmb3JlIGVhY2ggY29va2llIG5hbWUuXG4gICAgICAgIGNvbnN0IGNvb2tpZXMgPSBkb2N1bWVudC5jb29raWUuc3BsaXQoJzsnKTtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjb29raWVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgY29uc3QgY29va2llID0gY29va2llc1tpXS5yZXBsYWNlKC9eXFxzKy8sICcnKTtcbiAgICAgICAgICBjb25zdCBlcSA9IGNvb2tpZS5pbmRleE9mKCc9Jyk7XG4gICAgICAgICAgaWYgKGVxICE9PSAtMSAmJiBjb29raWUuc2xpY2UoMCwgZXEpID09PSBuYW1lKSB7XG4gICAgICAgICAgICByZXR1cm4gZGVjb2RlVVJJQ29tcG9uZW50KGNvb2tpZS5zbGljZShlcSArIDEpKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICB9LFxuXG4gICAgICByZW1vdmUobmFtZSkge1xuICAgICAgICB0aGlzLndyaXRlKG5hbWUsICcnLCBEYXRlLm5vdygpIC0gODY0MDAwMDAsICcvJyk7XG4gICAgICB9LFxuICAgIH1cbiAgOiAvLyBOb24tc3RhbmRhcmQgYnJvd3NlciBlbnYgKHdlYiB3b3JrZXJzLCByZWFjdC1uYXRpdmUpIGxhY2sgbmVlZGVkIHN1cHBvcnQuXG4gICAge1xuICAgICAgd3JpdGUoKSB7fSxcbiAgICAgIHJlYWQoKSB7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgICAgfSxcbiAgICAgIHJlbW92ZSgpIHt9LFxuICAgIH07XG4iLCIndXNlIHN0cmljdCc7XG5cbi8qKlxuICogRGV0ZXJtaW5lcyB3aGV0aGVyIHRoZSBzcGVjaWZpZWQgVVJMIGlzIGFic29sdXRlXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IHVybCBUaGUgVVJMIHRvIHRlc3RcbiAqXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB0aGUgc3BlY2lmaWVkIFVSTCBpcyBhYnNvbHV0ZSwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGlzQWJzb2x1dGVVUkwodXJsKSB7XG4gIC8vIEEgVVJMIGlzIGNvbnNpZGVyZWQgYWJzb2x1dGUgaWYgaXQgYmVnaW5zIHdpdGggXCI8c2NoZW1lPjovL1wiIG9yIFwiLy9cIiAocHJvdG9jb2wtcmVsYXRpdmUgVVJMKS5cbiAgLy8gUkZDIDM5ODYgZGVmaW5lcyBzY2hlbWUgbmFtZSBhcyBhIHNlcXVlbmNlIG9mIGNoYXJhY3RlcnMgYmVnaW5uaW5nIHdpdGggYSBsZXR0ZXIgYW5kIGZvbGxvd2VkXG4gIC8vIGJ5IGFueSBjb21iaW5hdGlvbiBvZiBsZXR0ZXJzLCBkaWdpdHMsIHBsdXMsIHBlcmlvZCwgb3IgaHlwaGVuLlxuICBpZiAodHlwZW9mIHVybCAhPT0gJ3N0cmluZycpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICByZXR1cm4gL14oW2Etel1bYS16XFxkK1xcLS5dKjopP1xcL1xcLy9pLnRlc3QodXJsKTtcbn1cbiIsIid1c2Ugc3RyaWN0JztcblxuLyoqXG4gKiBDcmVhdGVzIGEgbmV3IFVSTCBieSBjb21iaW5pbmcgdGhlIHNwZWNpZmllZCBVUkxzXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IGJhc2VVUkwgVGhlIGJhc2UgVVJMXG4gKiBAcGFyYW0ge3N0cmluZ30gcmVsYXRpdmVVUkwgVGhlIHJlbGF0aXZlIFVSTFxuICpcbiAqIEByZXR1cm5zIHtzdHJpbmd9IFRoZSBjb21iaW5lZCBVUkxcbiAqL1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY29tYmluZVVSTHMoYmFzZVVSTCwgcmVsYXRpdmVVUkwpIHtcbiAgcmV0dXJuIHJlbGF0aXZlVVJMXG4gICAgPyBiYXNlVVJMLnJlcGxhY2UoL1xcLz9cXC8kLywgJycpICsgJy8nICsgcmVsYXRpdmVVUkwucmVwbGFjZSgvXlxcLysvLCAnJylcbiAgICA6IGJhc2VVUkw7XG59XG4iLCIndXNlIHN0cmljdCc7XG5cbmltcG9ydCBpc0Fic29sdXRlVVJMIGZyb20gJy4uL2hlbHBlcnMvaXNBYnNvbHV0ZVVSTC5qcyc7XG5pbXBvcnQgY29tYmluZVVSTHMgZnJvbSAnLi4vaGVscGVycy9jb21iaW5lVVJMcy5qcyc7XG5cbi8qKlxuICogQ3JlYXRlcyBhIG5ldyBVUkwgYnkgY29tYmluaW5nIHRoZSBiYXNlVVJMIHdpdGggdGhlIHJlcXVlc3RlZFVSTCxcbiAqIG9ubHkgd2hlbiB0aGUgcmVxdWVzdGVkVVJMIGlzIG5vdCBhbHJlYWR5IGFuIGFic29sdXRlIFVSTC5cbiAqIElmIHRoZSByZXF1ZXN0VVJMIGlzIGFic29sdXRlLCB0aGlzIGZ1bmN0aW9uIHJldHVybnMgdGhlIHJlcXVlc3RlZFVSTCB1bnRvdWNoZWQuXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IGJhc2VVUkwgVGhlIGJhc2UgVVJMXG4gKiBAcGFyYW0ge3N0cmluZ30gcmVxdWVzdGVkVVJMIEFic29sdXRlIG9yIHJlbGF0aXZlIFVSTCB0byBjb21iaW5lXG4gKlxuICogQHJldHVybnMge3N0cmluZ30gVGhlIGNvbWJpbmVkIGZ1bGwgcGF0aFxuICovXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBidWlsZEZ1bGxQYXRoKGJhc2VVUkwsIHJlcXVlc3RlZFVSTCwgYWxsb3dBYnNvbHV0ZVVybHMpIHtcbiAgbGV0IGlzUmVsYXRpdmVVcmwgPSAhaXNBYnNvbHV0ZVVSTChyZXF1ZXN0ZWRVUkwpO1xuICBpZiAoYmFzZVVSTCAmJiAoaXNSZWxhdGl2ZVVybCB8fCBhbGxvd0Fic29sdXRlVXJscyA9PT0gZmFsc2UpKSB7XG4gICAgcmV0dXJuIGNvbWJpbmVVUkxzKGJhc2VVUkwsIHJlcXVlc3RlZFVSTCk7XG4gIH1cbiAgcmV0dXJuIHJlcXVlc3RlZFVSTDtcbn1cbiIsIid1c2Ugc3RyaWN0JztcblxuaW1wb3J0IHV0aWxzIGZyb20gJy4uL3V0aWxzLmpzJztcbmltcG9ydCBBeGlvc0hlYWRlcnMgZnJvbSAnLi9BeGlvc0hlYWRlcnMuanMnO1xuXG5jb25zdCBoZWFkZXJzVG9PYmplY3QgPSAodGhpbmcpID0+ICh0aGluZyBpbnN0YW5jZW9mIEF4aW9zSGVhZGVycyA/IHsgLi4udGhpbmcgfSA6IHRoaW5nKTtcblxuLyoqXG4gKiBDb25maWctc3BlY2lmaWMgbWVyZ2UtZnVuY3Rpb24gd2hpY2ggY3JlYXRlcyBhIG5ldyBjb25maWctb2JqZWN0XG4gKiBieSBtZXJnaW5nIHR3byBjb25maWd1cmF0aW9uIG9iamVjdHMgdG9nZXRoZXIuXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IGNvbmZpZzFcbiAqIEBwYXJhbSB7T2JqZWN0fSBjb25maWcyXG4gKlxuICogQHJldHVybnMge09iamVjdH0gTmV3IG9iamVjdCByZXN1bHRpbmcgZnJvbSBtZXJnaW5nIGNvbmZpZzIgdG8gY29uZmlnMVxuICovXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBtZXJnZUNvbmZpZyhjb25maWcxLCBjb25maWcyKSB7XG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1wYXJhbS1yZWFzc2lnblxuICBjb25maWcyID0gY29uZmlnMiB8fCB7fTtcblxuICAvLyBVc2UgYSBudWxsLXByb3RvdHlwZSBvYmplY3Qgc28gdGhhdCBkb3duc3RyZWFtIHJlYWRzIHN1Y2ggYXMgYGNvbmZpZy5hdXRoYFxuICAvLyBvciBgY29uZmlnLmJhc2VVUkxgIGNhbm5vdCBpbmhlcml0IHBvbGx1dGVkIHZhbHVlcyBmcm9tIE9iamVjdC5wcm90b3R5cGUuXG4gIC8vIGBoYXNPd25Qcm9wZXJ0eWAgaXMgcmVzdG9yZWQgYXMgYSBub24tZW51bWVyYWJsZSBvd24gc2xvdCB0byBwcmVzZXJ2ZVxuICAvLyBlcmdvbm9taWNzIGZvciB1c2VyIGNvZGUgdGhhdCByZWxpZXMgb24gaXQuXG4gIGNvbnN0IGNvbmZpZyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShjb25maWcsICdoYXNPd25Qcm9wZXJ0eScsIHtcbiAgICAvLyBOdWxsLXByb3RvIGRlc2NyaXB0b3Igc28gYSBwb2xsdXRlZCBPYmplY3QucHJvdG90eXBlLmdldCBjYW5ub3QgdHVyblxuICAgIC8vIHRoaXMgZGF0YSBkZXNjcmlwdG9yIGludG8gYW4gYWNjZXNzb3IgZGVzY3JpcHRvciBvbiB0aGUgd2F5IGluLlxuICAgIF9fcHJvdG9fXzogbnVsbCxcbiAgICB2YWx1ZTogT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eSxcbiAgICBlbnVtZXJhYmxlOiBmYWxzZSxcbiAgICB3cml0YWJsZTogdHJ1ZSxcbiAgICBjb25maWd1cmFibGU6IHRydWUsXG4gIH0pO1xuXG4gIGZ1bmN0aW9uIGdldE1lcmdlZFZhbHVlKHRhcmdldCwgc291cmNlLCBwcm9wLCBjYXNlbGVzcykge1xuICAgIGlmICh1dGlscy5pc1BsYWluT2JqZWN0KHRhcmdldCkgJiYgdXRpbHMuaXNQbGFpbk9iamVjdChzb3VyY2UpKSB7XG4gICAgICByZXR1cm4gdXRpbHMubWVyZ2UuY2FsbCh7IGNhc2VsZXNzIH0sIHRhcmdldCwgc291cmNlKTtcbiAgICB9IGVsc2UgaWYgKHV0aWxzLmlzUGxhaW5PYmplY3Qoc291cmNlKSkge1xuICAgICAgcmV0dXJuIHV0aWxzLm1lcmdlKHt9LCBzb3VyY2UpO1xuICAgIH0gZWxzZSBpZiAodXRpbHMuaXNBcnJheShzb3VyY2UpKSB7XG4gICAgICByZXR1cm4gc291cmNlLnNsaWNlKCk7XG4gICAgfVxuICAgIHJldHVybiBzb3VyY2U7XG4gIH1cblxuICBmdW5jdGlvbiBtZXJnZURlZXBQcm9wZXJ0aWVzKGEsIGIsIHByb3AsIGNhc2VsZXNzKSB7XG4gICAgaWYgKCF1dGlscy5pc1VuZGVmaW5lZChiKSkge1xuICAgICAgcmV0dXJuIGdldE1lcmdlZFZhbHVlKGEsIGIsIHByb3AsIGNhc2VsZXNzKTtcbiAgICB9IGVsc2UgaWYgKCF1dGlscy5pc1VuZGVmaW5lZChhKSkge1xuICAgICAgcmV0dXJuIGdldE1lcmdlZFZhbHVlKHVuZGVmaW5lZCwgYSwgcHJvcCwgY2FzZWxlc3MpO1xuICAgIH1cbiAgfVxuXG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBjb25zaXN0ZW50LXJldHVyblxuICBmdW5jdGlvbiB2YWx1ZUZyb21Db25maWcyKGEsIGIpIHtcbiAgICBpZiAoIXV0aWxzLmlzVW5kZWZpbmVkKGIpKSB7XG4gICAgICByZXR1cm4gZ2V0TWVyZ2VkVmFsdWUodW5kZWZpbmVkLCBiKTtcbiAgICB9XG4gIH1cblxuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgY29uc2lzdGVudC1yZXR1cm5cbiAgZnVuY3Rpb24gZGVmYXVsdFRvQ29uZmlnMihhLCBiKSB7XG4gICAgaWYgKCF1dGlscy5pc1VuZGVmaW5lZChiKSkge1xuICAgICAgcmV0dXJuIGdldE1lcmdlZFZhbHVlKHVuZGVmaW5lZCwgYik7XG4gICAgfSBlbHNlIGlmICghdXRpbHMuaXNVbmRlZmluZWQoYSkpIHtcbiAgICAgIHJldHVybiBnZXRNZXJnZWRWYWx1ZSh1bmRlZmluZWQsIGEpO1xuICAgIH1cbiAgfVxuXG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBjb25zaXN0ZW50LXJldHVyblxuICBmdW5jdGlvbiBtZXJnZURpcmVjdEtleXMoYSwgYiwgcHJvcCkge1xuICAgIGlmICh1dGlscy5oYXNPd25Qcm9wKGNvbmZpZzIsIHByb3ApKSB7XG4gICAgICByZXR1cm4gZ2V0TWVyZ2VkVmFsdWUoYSwgYik7XG4gICAgfSBlbHNlIGlmICh1dGlscy5oYXNPd25Qcm9wKGNvbmZpZzEsIHByb3ApKSB7XG4gICAgICByZXR1cm4gZ2V0TWVyZ2VkVmFsdWUodW5kZWZpbmVkLCBhKTtcbiAgICB9XG4gIH1cblxuICBjb25zdCBtZXJnZU1hcCA9IHtcbiAgICB1cmw6IHZhbHVlRnJvbUNvbmZpZzIsXG4gICAgbWV0aG9kOiB2YWx1ZUZyb21Db25maWcyLFxuICAgIGRhdGE6IHZhbHVlRnJvbUNvbmZpZzIsXG4gICAgYmFzZVVSTDogZGVmYXVsdFRvQ29uZmlnMixcbiAgICB0cmFuc2Zvcm1SZXF1ZXN0OiBkZWZhdWx0VG9Db25maWcyLFxuICAgIHRyYW5zZm9ybVJlc3BvbnNlOiBkZWZhdWx0VG9Db25maWcyLFxuICAgIHBhcmFtc1NlcmlhbGl6ZXI6IGRlZmF1bHRUb0NvbmZpZzIsXG4gICAgdGltZW91dDogZGVmYXVsdFRvQ29uZmlnMixcbiAgICB0aW1lb3V0TWVzc2FnZTogZGVmYXVsdFRvQ29uZmlnMixcbiAgICB3aXRoQ3JlZGVudGlhbHM6IGRlZmF1bHRUb0NvbmZpZzIsXG4gICAgd2l0aFhTUkZUb2tlbjogZGVmYXVsdFRvQ29uZmlnMixcbiAgICBhZGFwdGVyOiBkZWZhdWx0VG9Db25maWcyLFxuICAgIHJlc3BvbnNlVHlwZTogZGVmYXVsdFRvQ29uZmlnMixcbiAgICB4c3JmQ29va2llTmFtZTogZGVmYXVsdFRvQ29uZmlnMixcbiAgICB4c3JmSGVhZGVyTmFtZTogZGVmYXVsdFRvQ29uZmlnMixcbiAgICBvblVwbG9hZFByb2dyZXNzOiBkZWZhdWx0VG9Db25maWcyLFxuICAgIG9uRG93bmxvYWRQcm9ncmVzczogZGVmYXVsdFRvQ29uZmlnMixcbiAgICBkZWNvbXByZXNzOiBkZWZhdWx0VG9Db25maWcyLFxuICAgIG1heENvbnRlbnRMZW5ndGg6IGRlZmF1bHRUb0NvbmZpZzIsXG4gICAgbWF4Qm9keUxlbmd0aDogZGVmYXVsdFRvQ29uZmlnMixcbiAgICBiZWZvcmVSZWRpcmVjdDogZGVmYXVsdFRvQ29uZmlnMixcbiAgICB0cmFuc3BvcnQ6IGRlZmF1bHRUb0NvbmZpZzIsXG4gICAgaHR0cEFnZW50OiBkZWZhdWx0VG9Db25maWcyLFxuICAgIGh0dHBzQWdlbnQ6IGRlZmF1bHRUb0NvbmZpZzIsXG4gICAgY2FuY2VsVG9rZW46IGRlZmF1bHRUb0NvbmZpZzIsXG4gICAgc29ja2V0UGF0aDogZGVmYXVsdFRvQ29uZmlnMixcbiAgICBhbGxvd2VkU29ja2V0UGF0aHM6IGRlZmF1bHRUb0NvbmZpZzIsXG4gICAgcmVzcG9uc2VFbmNvZGluZzogZGVmYXVsdFRvQ29uZmlnMixcbiAgICB2YWxpZGF0ZVN0YXR1czogbWVyZ2VEaXJlY3RLZXlzLFxuICAgIGhlYWRlcnM6IChhLCBiLCBwcm9wKSA9PlxuICAgICAgbWVyZ2VEZWVwUHJvcGVydGllcyhoZWFkZXJzVG9PYmplY3QoYSksIGhlYWRlcnNUb09iamVjdChiKSwgcHJvcCwgdHJ1ZSksXG4gIH07XG5cbiAgdXRpbHMuZm9yRWFjaChPYmplY3Qua2V5cyh7IC4uLmNvbmZpZzEsIC4uLmNvbmZpZzIgfSksIGZ1bmN0aW9uIGNvbXB1dGVDb25maWdWYWx1ZShwcm9wKSB7XG4gICAgaWYgKHByb3AgPT09ICdfX3Byb3RvX18nIHx8IHByb3AgPT09ICdjb25zdHJ1Y3RvcicgfHwgcHJvcCA9PT0gJ3Byb3RvdHlwZScpIHJldHVybjtcbiAgICBjb25zdCBtZXJnZSA9IHV0aWxzLmhhc093blByb3AobWVyZ2VNYXAsIHByb3ApID8gbWVyZ2VNYXBbcHJvcF0gOiBtZXJnZURlZXBQcm9wZXJ0aWVzO1xuICAgIGNvbnN0IGEgPSB1dGlscy5oYXNPd25Qcm9wKGNvbmZpZzEsIHByb3ApID8gY29uZmlnMVtwcm9wXSA6IHVuZGVmaW5lZDtcbiAgICBjb25zdCBiID0gdXRpbHMuaGFzT3duUHJvcChjb25maWcyLCBwcm9wKSA/IGNvbmZpZzJbcHJvcF0gOiB1bmRlZmluZWQ7XG4gICAgY29uc3QgY29uZmlnVmFsdWUgPSBtZXJnZShhLCBiLCBwcm9wKTtcbiAgICAodXRpbHMuaXNVbmRlZmluZWQoY29uZmlnVmFsdWUpICYmIG1lcmdlICE9PSBtZXJnZURpcmVjdEtleXMpIHx8IChjb25maWdbcHJvcF0gPSBjb25maWdWYWx1ZSk7XG4gIH0pO1xuXG4gIHJldHVybiBjb25maWc7XG59XG4iLCJpbXBvcnQgcGxhdGZvcm0gZnJvbSAnLi4vcGxhdGZvcm0vaW5kZXguanMnO1xuaW1wb3J0IHV0aWxzIGZyb20gJy4uL3V0aWxzLmpzJztcbmltcG9ydCBpc1VSTFNhbWVPcmlnaW4gZnJvbSAnLi9pc1VSTFNhbWVPcmlnaW4uanMnO1xuaW1wb3J0IGNvb2tpZXMgZnJvbSAnLi9jb29raWVzLmpzJztcbmltcG9ydCBidWlsZEZ1bGxQYXRoIGZyb20gJy4uL2NvcmUvYnVpbGRGdWxsUGF0aC5qcyc7XG5pbXBvcnQgbWVyZ2VDb25maWcgZnJvbSAnLi4vY29yZS9tZXJnZUNvbmZpZy5qcyc7XG5pbXBvcnQgQXhpb3NIZWFkZXJzIGZyb20gJy4uL2NvcmUvQXhpb3NIZWFkZXJzLmpzJztcbmltcG9ydCBidWlsZFVSTCBmcm9tICcuL2J1aWxkVVJMLmpzJztcblxuY29uc3QgRk9STV9EQVRBX0NPTlRFTlRfSEVBREVSUyA9IFsnY29udGVudC10eXBlJywgJ2NvbnRlbnQtbGVuZ3RoJ107XG5cbmZ1bmN0aW9uIHNldEZvcm1EYXRhSGVhZGVycyhoZWFkZXJzLCBmb3JtSGVhZGVycywgcG9saWN5KSB7XG4gIGlmIChwb2xpY3kgIT09ICdjb250ZW50LW9ubHknKSB7XG4gICAgaGVhZGVycy5zZXQoZm9ybUhlYWRlcnMpO1xuICAgIHJldHVybjtcbiAgfVxuXG4gIE9iamVjdC5lbnRyaWVzKGZvcm1IZWFkZXJzKS5mb3JFYWNoKChba2V5LCB2YWxdKSA9PiB7XG4gICAgaWYgKEZPUk1fREFUQV9DT05URU5UX0hFQURFUlMuaW5jbHVkZXMoa2V5LnRvTG93ZXJDYXNlKCkpKSB7XG4gICAgICBoZWFkZXJzLnNldChrZXksIHZhbCk7XG4gICAgfVxuICB9KTtcbn1cblxuLyoqXG4gKiBFbmNvZGUgYSBVVEYtOCBzdHJpbmcgdG8gYSBMYXRpbi0xIGJ5dGUgc3RyaW5nIGZvciB1c2Ugd2l0aCBidG9hKCkuXG4gKiBUaGlzIGlzIGEgbW9kZXJuIHJlcGxhY2VtZW50IGZvciB0aGUgZGVwcmVjYXRlZCB1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoc3RyKSkgcGF0dGVybi5cbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gc3RyIFRoZSBzdHJpbmcgdG8gZW5jb2RlXG4gKlxuICogQHJldHVybnMge3N0cmluZ30gVVRGLTggYnl0ZXMgYXMgYSBMYXRpbi0xIHN0cmluZ1xuICovXG5jb25zdCBlbmNvZGVVVEY4ID0gKHN0cikgPT5cbiAgZW5jb2RlVVJJQ29tcG9uZW50KHN0cikucmVwbGFjZSgvJShbMC05QS1GXXsyfSkvZ2ksIChfLCBoZXgpID0+XG4gICAgU3RyaW5nLmZyb21DaGFyQ29kZShwYXJzZUludChoZXgsIDE2KSlcbiAgKTtcblxuZXhwb3J0IGRlZmF1bHQgKGNvbmZpZykgPT4ge1xuICBjb25zdCBuZXdDb25maWcgPSBtZXJnZUNvbmZpZyh7fSwgY29uZmlnKTtcblxuICAvLyBSZWFkIG9ubHkgb3duIHByb3BlcnRpZXMgdG8gcHJldmVudCBwcm90b3R5cGUgcG9sbHV0aW9uIGdhZGdldHNcbiAgLy8gKGUuZy4gT2JqZWN0LnByb3RvdHlwZS5iYXNlVVJMID0gJ2h0dHBzOi8vZXZpbC5jb20nKS5cbiAgY29uc3Qgb3duID0gKGtleSkgPT4gKHV0aWxzLmhhc093blByb3AobmV3Q29uZmlnLCBrZXkpID8gbmV3Q29uZmlnW2tleV0gOiB1bmRlZmluZWQpO1xuXG4gIGNvbnN0IGRhdGEgPSBvd24oJ2RhdGEnKTtcbiAgbGV0IHdpdGhYU1JGVG9rZW4gPSBvd24oJ3dpdGhYU1JGVG9rZW4nKTtcbiAgY29uc3QgeHNyZkhlYWRlck5hbWUgPSBvd24oJ3hzcmZIZWFkZXJOYW1lJyk7XG4gIGNvbnN0IHhzcmZDb29raWVOYW1lID0gb3duKCd4c3JmQ29va2llTmFtZScpO1xuICBsZXQgaGVhZGVycyA9IG93bignaGVhZGVycycpO1xuICBjb25zdCBhdXRoID0gb3duKCdhdXRoJyk7XG4gIGNvbnN0IGJhc2VVUkwgPSBvd24oJ2Jhc2VVUkwnKTtcbiAgY29uc3QgYWxsb3dBYnNvbHV0ZVVybHMgPSBvd24oJ2FsbG93QWJzb2x1dGVVcmxzJyk7XG4gIGNvbnN0IHVybCA9IG93bigndXJsJyk7XG5cbiAgbmV3Q29uZmlnLmhlYWRlcnMgPSBoZWFkZXJzID0gQXhpb3NIZWFkZXJzLmZyb20oaGVhZGVycyk7XG5cbiAgbmV3Q29uZmlnLnVybCA9IGJ1aWxkVVJMKFxuICAgIGJ1aWxkRnVsbFBhdGgoYmFzZVVSTCwgdXJsLCBhbGxvd0Fic29sdXRlVXJscyksXG4gICAgY29uZmlnLnBhcmFtcyxcbiAgICBjb25maWcucGFyYW1zU2VyaWFsaXplclxuICApO1xuXG4gIC8vIEhUVFAgYmFzaWMgYXV0aGVudGljYXRpb25cbiAgaWYgKGF1dGgpIHtcbiAgICBoZWFkZXJzLnNldChcbiAgICAgICdBdXRob3JpemF0aW9uJyxcbiAgICAgICdCYXNpYyAnICtcbiAgICAgICAgYnRvYSgoYXV0aC51c2VybmFtZSB8fCAnJykgKyAnOicgKyAoYXV0aC5wYXNzd29yZCA/IGVuY29kZVVURjgoYXV0aC5wYXNzd29yZCkgOiAnJykpXG4gICAgKTtcbiAgfVxuXG4gIGlmICh1dGlscy5pc0Zvcm1EYXRhKGRhdGEpKSB7XG4gICAgaWYgKHBsYXRmb3JtLmhhc1N0YW5kYXJkQnJvd3NlckVudiB8fCBwbGF0Zm9ybS5oYXNTdGFuZGFyZEJyb3dzZXJXZWJXb3JrZXJFbnYpIHtcbiAgICAgIGhlYWRlcnMuc2V0Q29udGVudFR5cGUodW5kZWZpbmVkKTsgLy8gYnJvd3NlciBoYW5kbGVzIGl0XG4gICAgfSBlbHNlIGlmICh1dGlscy5pc0Z1bmN0aW9uKGRhdGEuZ2V0SGVhZGVycykpIHtcbiAgICAgIC8vIE5vZGUuanMgRm9ybURhdGEgKGxpa2UgZm9ybS1kYXRhIHBhY2thZ2UpXG4gICAgICBzZXRGb3JtRGF0YUhlYWRlcnMoaGVhZGVycywgZGF0YS5nZXRIZWFkZXJzKCksIG93bignZm9ybURhdGFIZWFkZXJQb2xpY3knKSk7XG4gICAgfVxuICB9XG5cbiAgLy8gQWRkIHhzcmYgaGVhZGVyXG4gIC8vIFRoaXMgaXMgb25seSBkb25lIGlmIHJ1bm5pbmcgaW4gYSBzdGFuZGFyZCBicm93c2VyIGVudmlyb25tZW50LlxuICAvLyBTcGVjaWZpY2FsbHkgbm90IGlmIHdlJ3JlIGluIGEgd2ViIHdvcmtlciwgb3IgcmVhY3QtbmF0aXZlLlxuXG4gIGlmIChwbGF0Zm9ybS5oYXNTdGFuZGFyZEJyb3dzZXJFbnYpIHtcbiAgICBpZiAodXRpbHMuaXNGdW5jdGlvbih3aXRoWFNSRlRva2VuKSkge1xuICAgICAgd2l0aFhTUkZUb2tlbiA9IHdpdGhYU1JGVG9rZW4obmV3Q29uZmlnKTtcbiAgICB9XG5cbiAgICAvLyBTdHJpY3QgYm9vbGVhbiBjaGVjayDigJQgcHJldmVudHMgcHJvdG8tcG9sbHV0aW9uIGdhZGdldHMgKGUuZy4gT2JqZWN0LnByb3RvdHlwZS53aXRoWFNSRlRva2VuID0gMSlcbiAgICAvLyBhbmQgbWlzY29uZmlndXJhdGlvbnMgKGUuZy4gXCJmYWxzZVwiKSBmcm9tIHNob3J0LWNpcmN1aXRpbmcgdGhlIHNhbWUtb3JpZ2luIGNoZWNrIGFuZCBsZWFraW5nXG4gICAgLy8gdGhlIFhTUkYgdG9rZW4gY3Jvc3Mtb3JpZ2luLlxuICAgIGNvbnN0IHNob3VsZFNlbmRYU1JGID1cbiAgICAgIHdpdGhYU1JGVG9rZW4gPT09IHRydWUgfHwgKHdpdGhYU1JGVG9rZW4gPT0gbnVsbCAmJiBpc1VSTFNhbWVPcmlnaW4obmV3Q29uZmlnLnVybCkpO1xuXG4gICAgaWYgKHNob3VsZFNlbmRYU1JGKSB7XG4gICAgICBjb25zdCB4c3JmVmFsdWUgPSB4c3JmSGVhZGVyTmFtZSAmJiB4c3JmQ29va2llTmFtZSAmJiBjb29raWVzLnJlYWQoeHNyZkNvb2tpZU5hbWUpO1xuXG4gICAgICBpZiAoeHNyZlZhbHVlKSB7XG4gICAgICAgIGhlYWRlcnMuc2V0KHhzcmZIZWFkZXJOYW1lLCB4c3JmVmFsdWUpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiBuZXdDb25maWc7XG59O1xuIiwiaW1wb3J0IHV0aWxzIGZyb20gJy4uL3V0aWxzLmpzJztcbmltcG9ydCBzZXR0bGUgZnJvbSAnLi4vY29yZS9zZXR0bGUuanMnO1xuaW1wb3J0IHRyYW5zaXRpb25hbERlZmF1bHRzIGZyb20gJy4uL2RlZmF1bHRzL3RyYW5zaXRpb25hbC5qcyc7XG5pbXBvcnQgQXhpb3NFcnJvciBmcm9tICcuLi9jb3JlL0F4aW9zRXJyb3IuanMnO1xuaW1wb3J0IENhbmNlbGVkRXJyb3IgZnJvbSAnLi4vY2FuY2VsL0NhbmNlbGVkRXJyb3IuanMnO1xuaW1wb3J0IHBhcnNlUHJvdG9jb2wgZnJvbSAnLi4vaGVscGVycy9wYXJzZVByb3RvY29sLmpzJztcbmltcG9ydCBwbGF0Zm9ybSBmcm9tICcuLi9wbGF0Zm9ybS9pbmRleC5qcyc7XG5pbXBvcnQgQXhpb3NIZWFkZXJzIGZyb20gJy4uL2NvcmUvQXhpb3NIZWFkZXJzLmpzJztcbmltcG9ydCB7IHByb2dyZXNzRXZlbnRSZWR1Y2VyIH0gZnJvbSAnLi4vaGVscGVycy9wcm9ncmVzc0V2ZW50UmVkdWNlci5qcyc7XG5pbXBvcnQgcmVzb2x2ZUNvbmZpZyBmcm9tICcuLi9oZWxwZXJzL3Jlc29sdmVDb25maWcuanMnO1xuXG5jb25zdCBpc1hIUkFkYXB0ZXJTdXBwb3J0ZWQgPSB0eXBlb2YgWE1MSHR0cFJlcXVlc3QgIT09ICd1bmRlZmluZWQnO1xuXG5leHBvcnQgZGVmYXVsdCBpc1hIUkFkYXB0ZXJTdXBwb3J0ZWQgJiZcbiAgZnVuY3Rpb24gKGNvbmZpZykge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiBkaXNwYXRjaFhoclJlcXVlc3QocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICBjb25zdCBfY29uZmlnID0gcmVzb2x2ZUNvbmZpZyhjb25maWcpO1xuICAgICAgbGV0IHJlcXVlc3REYXRhID0gX2NvbmZpZy5kYXRhO1xuICAgICAgY29uc3QgcmVxdWVzdEhlYWRlcnMgPSBBeGlvc0hlYWRlcnMuZnJvbShfY29uZmlnLmhlYWRlcnMpLm5vcm1hbGl6ZSgpO1xuICAgICAgbGV0IHsgcmVzcG9uc2VUeXBlLCBvblVwbG9hZFByb2dyZXNzLCBvbkRvd25sb2FkUHJvZ3Jlc3MgfSA9IF9jb25maWc7XG4gICAgICBsZXQgb25DYW5jZWxlZDtcbiAgICAgIGxldCB1cGxvYWRUaHJvdHRsZWQsIGRvd25sb2FkVGhyb3R0bGVkO1xuICAgICAgbGV0IGZsdXNoVXBsb2FkLCBmbHVzaERvd25sb2FkO1xuXG4gICAgICBmdW5jdGlvbiBkb25lKCkge1xuICAgICAgICBmbHVzaFVwbG9hZCAmJiBmbHVzaFVwbG9hZCgpOyAvLyBmbHVzaCBldmVudHNcbiAgICAgICAgZmx1c2hEb3dubG9hZCAmJiBmbHVzaERvd25sb2FkKCk7IC8vIGZsdXNoIGV2ZW50c1xuXG4gICAgICAgIF9jb25maWcuY2FuY2VsVG9rZW4gJiYgX2NvbmZpZy5jYW5jZWxUb2tlbi51bnN1YnNjcmliZShvbkNhbmNlbGVkKTtcblxuICAgICAgICBfY29uZmlnLnNpZ25hbCAmJiBfY29uZmlnLnNpZ25hbC5yZW1vdmVFdmVudExpc3RlbmVyKCdhYm9ydCcsIG9uQ2FuY2VsZWQpO1xuICAgICAgfVxuXG4gICAgICBsZXQgcmVxdWVzdCA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xuXG4gICAgICByZXF1ZXN0Lm9wZW4oX2NvbmZpZy5tZXRob2QudG9VcHBlckNhc2UoKSwgX2NvbmZpZy51cmwsIHRydWUpO1xuXG4gICAgICAvLyBTZXQgdGhlIHJlcXVlc3QgdGltZW91dCBpbiBNU1xuICAgICAgcmVxdWVzdC50aW1lb3V0ID0gX2NvbmZpZy50aW1lb3V0O1xuXG4gICAgICBmdW5jdGlvbiBvbmxvYWRlbmQoKSB7XG4gICAgICAgIGlmICghcmVxdWVzdCkge1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICAvLyBQcmVwYXJlIHRoZSByZXNwb25zZVxuICAgICAgICBjb25zdCByZXNwb25zZUhlYWRlcnMgPSBBeGlvc0hlYWRlcnMuZnJvbShcbiAgICAgICAgICAnZ2V0QWxsUmVzcG9uc2VIZWFkZXJzJyBpbiByZXF1ZXN0ICYmIHJlcXVlc3QuZ2V0QWxsUmVzcG9uc2VIZWFkZXJzKClcbiAgICAgICAgKTtcbiAgICAgICAgY29uc3QgcmVzcG9uc2VEYXRhID1cbiAgICAgICAgICAhcmVzcG9uc2VUeXBlIHx8IHJlc3BvbnNlVHlwZSA9PT0gJ3RleHQnIHx8IHJlc3BvbnNlVHlwZSA9PT0gJ2pzb24nXG4gICAgICAgICAgICA/IHJlcXVlc3QucmVzcG9uc2VUZXh0XG4gICAgICAgICAgICA6IHJlcXVlc3QucmVzcG9uc2U7XG4gICAgICAgIGNvbnN0IHJlc3BvbnNlID0ge1xuICAgICAgICAgIGRhdGE6IHJlc3BvbnNlRGF0YSxcbiAgICAgICAgICBzdGF0dXM6IHJlcXVlc3Quc3RhdHVzLFxuICAgICAgICAgIHN0YXR1c1RleHQ6IHJlcXVlc3Quc3RhdHVzVGV4dCxcbiAgICAgICAgICBoZWFkZXJzOiByZXNwb25zZUhlYWRlcnMsXG4gICAgICAgICAgY29uZmlnLFxuICAgICAgICAgIHJlcXVlc3QsXG4gICAgICAgIH07XG5cbiAgICAgICAgc2V0dGxlKFxuICAgICAgICAgIGZ1bmN0aW9uIF9yZXNvbHZlKHZhbHVlKSB7XG4gICAgICAgICAgICByZXNvbHZlKHZhbHVlKTtcbiAgICAgICAgICAgIGRvbmUoKTtcbiAgICAgICAgICB9LFxuICAgICAgICAgIGZ1bmN0aW9uIF9yZWplY3QoZXJyKSB7XG4gICAgICAgICAgICByZWplY3QoZXJyKTtcbiAgICAgICAgICAgIGRvbmUoKTtcbiAgICAgICAgICB9LFxuICAgICAgICAgIHJlc3BvbnNlXG4gICAgICAgICk7XG5cbiAgICAgICAgLy8gQ2xlYW4gdXAgcmVxdWVzdFxuICAgICAgICByZXF1ZXN0ID0gbnVsbDtcbiAgICAgIH1cblxuICAgICAgaWYgKCdvbmxvYWRlbmQnIGluIHJlcXVlc3QpIHtcbiAgICAgICAgLy8gVXNlIG9ubG9hZGVuZCBpZiBhdmFpbGFibGVcbiAgICAgICAgcmVxdWVzdC5vbmxvYWRlbmQgPSBvbmxvYWRlbmQ7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyBMaXN0ZW4gZm9yIHJlYWR5IHN0YXRlIHRvIGVtdWxhdGUgb25sb2FkZW5kXG4gICAgICAgIHJlcXVlc3Qub25yZWFkeXN0YXRlY2hhbmdlID0gZnVuY3Rpb24gaGFuZGxlTG9hZCgpIHtcbiAgICAgICAgICBpZiAoIXJlcXVlc3QgfHwgcmVxdWVzdC5yZWFkeVN0YXRlICE9PSA0KSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgLy8gVGhlIHJlcXVlc3QgZXJyb3JlZCBvdXQgYW5kIHdlIGRpZG4ndCBnZXQgYSByZXNwb25zZSwgdGhpcyB3aWxsIGJlXG4gICAgICAgICAgLy8gaGFuZGxlZCBieSBvbmVycm9yIGluc3RlYWRcbiAgICAgICAgICAvLyBXaXRoIG9uZSBleGNlcHRpb246IHJlcXVlc3QgdGhhdCB1c2luZyBmaWxlOiBwcm90b2NvbCwgbW9zdCBicm93c2Vyc1xuICAgICAgICAgIC8vIHdpbGwgcmV0dXJuIHN0YXR1cyBhcyAwIGV2ZW4gdGhvdWdoIGl0J3MgYSBzdWNjZXNzZnVsIHJlcXVlc3RcbiAgICAgICAgICBpZiAoXG4gICAgICAgICAgICByZXF1ZXN0LnN0YXR1cyA9PT0gMCAmJlxuICAgICAgICAgICAgIShyZXF1ZXN0LnJlc3BvbnNlVVJMICYmIHJlcXVlc3QucmVzcG9uc2VVUkwuc3RhcnRzV2l0aCgnZmlsZTonKSlcbiAgICAgICAgICApIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICB9XG4gICAgICAgICAgLy8gcmVhZHlzdGF0ZSBoYW5kbGVyIGlzIGNhbGxpbmcgYmVmb3JlIG9uZXJyb3Igb3Igb250aW1lb3V0IGhhbmRsZXJzLFxuICAgICAgICAgIC8vIHNvIHdlIHNob3VsZCBjYWxsIG9ubG9hZGVuZCBvbiB0aGUgbmV4dCAndGljaydcbiAgICAgICAgICBzZXRUaW1lb3V0KG9ubG9hZGVuZCk7XG4gICAgICAgIH07XG4gICAgICB9XG5cbiAgICAgIC8vIEhhbmRsZSBicm93c2VyIHJlcXVlc3QgY2FuY2VsbGF0aW9uIChhcyBvcHBvc2VkIHRvIGEgbWFudWFsIGNhbmNlbGxhdGlvbilcbiAgICAgIHJlcXVlc3Qub25hYm9ydCA9IGZ1bmN0aW9uIGhhbmRsZUFib3J0KCkge1xuICAgICAgICBpZiAoIXJlcXVlc3QpIHtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICByZWplY3QobmV3IEF4aW9zRXJyb3IoJ1JlcXVlc3QgYWJvcnRlZCcsIEF4aW9zRXJyb3IuRUNPTk5BQk9SVEVELCBjb25maWcsIHJlcXVlc3QpKTtcbiAgICAgICAgZG9uZSgpO1xuXG4gICAgICAgIC8vIENsZWFuIHVwIHJlcXVlc3RcbiAgICAgICAgcmVxdWVzdCA9IG51bGw7XG4gICAgICB9O1xuXG4gICAgICAvLyBIYW5kbGUgbG93IGxldmVsIG5ldHdvcmsgZXJyb3JzXG4gICAgICByZXF1ZXN0Lm9uZXJyb3IgPSBmdW5jdGlvbiBoYW5kbGVFcnJvcihldmVudCkge1xuICAgICAgICAvLyBCcm93c2VycyBkZWxpdmVyIGEgUHJvZ3Jlc3NFdmVudCBpbiBYSFIgb25lcnJvclxuICAgICAgICAvLyAobWVzc2FnZSBtYXkgYmUgZW1wdHk7IHdoZW4gcHJlc2VudCwgc3VyZmFjZSBpdClcbiAgICAgICAgLy8gU2VlIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2RvY3MvV2ViL0FQSS9YTUxIdHRwUmVxdWVzdC9lcnJvcl9ldmVudFxuICAgICAgICBjb25zdCBtc2cgPSBldmVudCAmJiBldmVudC5tZXNzYWdlID8gZXZlbnQubWVzc2FnZSA6ICdOZXR3b3JrIEVycm9yJztcbiAgICAgICAgY29uc3QgZXJyID0gbmV3IEF4aW9zRXJyb3IobXNnLCBBeGlvc0Vycm9yLkVSUl9ORVRXT1JLLCBjb25maWcsIHJlcXVlc3QpO1xuICAgICAgICAvLyBhdHRhY2ggdGhlIHVuZGVybHlpbmcgZXZlbnQgZm9yIGNvbnN1bWVycyB3aG8gd2FudCBkZXRhaWxzXG4gICAgICAgIGVyci5ldmVudCA9IGV2ZW50IHx8IG51bGw7XG4gICAgICAgIHJlamVjdChlcnIpO1xuICAgICAgICBkb25lKCk7XG4gICAgICAgIHJlcXVlc3QgPSBudWxsO1xuICAgICAgfTtcblxuICAgICAgLy8gSGFuZGxlIHRpbWVvdXRcbiAgICAgIHJlcXVlc3Qub250aW1lb3V0ID0gZnVuY3Rpb24gaGFuZGxlVGltZW91dCgpIHtcbiAgICAgICAgbGV0IHRpbWVvdXRFcnJvck1lc3NhZ2UgPSBfY29uZmlnLnRpbWVvdXRcbiAgICAgICAgICA/ICd0aW1lb3V0IG9mICcgKyBfY29uZmlnLnRpbWVvdXQgKyAnbXMgZXhjZWVkZWQnXG4gICAgICAgICAgOiAndGltZW91dCBleGNlZWRlZCc7XG4gICAgICAgIGNvbnN0IHRyYW5zaXRpb25hbCA9IF9jb25maWcudHJhbnNpdGlvbmFsIHx8IHRyYW5zaXRpb25hbERlZmF1bHRzO1xuICAgICAgICBpZiAoX2NvbmZpZy50aW1lb3V0RXJyb3JNZXNzYWdlKSB7XG4gICAgICAgICAgdGltZW91dEVycm9yTWVzc2FnZSA9IF9jb25maWcudGltZW91dEVycm9yTWVzc2FnZTtcbiAgICAgICAgfVxuICAgICAgICByZWplY3QoXG4gICAgICAgICAgbmV3IEF4aW9zRXJyb3IoXG4gICAgICAgICAgICB0aW1lb3V0RXJyb3JNZXNzYWdlLFxuICAgICAgICAgICAgdHJhbnNpdGlvbmFsLmNsYXJpZnlUaW1lb3V0RXJyb3IgPyBBeGlvc0Vycm9yLkVUSU1FRE9VVCA6IEF4aW9zRXJyb3IuRUNPTk5BQk9SVEVELFxuICAgICAgICAgICAgY29uZmlnLFxuICAgICAgICAgICAgcmVxdWVzdFxuICAgICAgICAgIClcbiAgICAgICAgKTtcbiAgICAgICAgZG9uZSgpO1xuXG4gICAgICAgIC8vIENsZWFuIHVwIHJlcXVlc3RcbiAgICAgICAgcmVxdWVzdCA9IG51bGw7XG4gICAgICB9O1xuXG4gICAgICAvLyBSZW1vdmUgQ29udGVudC1UeXBlIGlmIGRhdGEgaXMgdW5kZWZpbmVkXG4gICAgICByZXF1ZXN0RGF0YSA9PT0gdW5kZWZpbmVkICYmIHJlcXVlc3RIZWFkZXJzLnNldENvbnRlbnRUeXBlKG51bGwpO1xuXG4gICAgICAvLyBBZGQgaGVhZGVycyB0byB0aGUgcmVxdWVzdFxuICAgICAgaWYgKCdzZXRSZXF1ZXN0SGVhZGVyJyBpbiByZXF1ZXN0KSB7XG4gICAgICAgIHV0aWxzLmZvckVhY2gocmVxdWVzdEhlYWRlcnMudG9KU09OKCksIGZ1bmN0aW9uIHNldFJlcXVlc3RIZWFkZXIodmFsLCBrZXkpIHtcbiAgICAgICAgICByZXF1ZXN0LnNldFJlcXVlc3RIZWFkZXIoa2V5LCB2YWwpO1xuICAgICAgICB9KTtcbiAgICAgIH1cblxuICAgICAgLy8gQWRkIHdpdGhDcmVkZW50aWFscyB0byByZXF1ZXN0IGlmIG5lZWRlZFxuICAgICAgaWYgKCF1dGlscy5pc1VuZGVmaW5lZChfY29uZmlnLndpdGhDcmVkZW50aWFscykpIHtcbiAgICAgICAgcmVxdWVzdC53aXRoQ3JlZGVudGlhbHMgPSAhIV9jb25maWcud2l0aENyZWRlbnRpYWxzO1xuICAgICAgfVxuXG4gICAgICAvLyBBZGQgcmVzcG9uc2VUeXBlIHRvIHJlcXVlc3QgaWYgbmVlZGVkXG4gICAgICBpZiAocmVzcG9uc2VUeXBlICYmIHJlc3BvbnNlVHlwZSAhPT0gJ2pzb24nKSB7XG4gICAgICAgIHJlcXVlc3QucmVzcG9uc2VUeXBlID0gX2NvbmZpZy5yZXNwb25zZVR5cGU7XG4gICAgICB9XG5cbiAgICAgIC8vIEhhbmRsZSBwcm9ncmVzcyBpZiBuZWVkZWRcbiAgICAgIGlmIChvbkRvd25sb2FkUHJvZ3Jlc3MpIHtcbiAgICAgICAgW2Rvd25sb2FkVGhyb3R0bGVkLCBmbHVzaERvd25sb2FkXSA9IHByb2dyZXNzRXZlbnRSZWR1Y2VyKG9uRG93bmxvYWRQcm9ncmVzcywgdHJ1ZSk7XG4gICAgICAgIHJlcXVlc3QuYWRkRXZlbnRMaXN0ZW5lcigncHJvZ3Jlc3MnLCBkb3dubG9hZFRocm90dGxlZCk7XG4gICAgICB9XG5cbiAgICAgIC8vIE5vdCBhbGwgYnJvd3NlcnMgc3VwcG9ydCB1cGxvYWQgZXZlbnRzXG4gICAgICBpZiAob25VcGxvYWRQcm9ncmVzcyAmJiByZXF1ZXN0LnVwbG9hZCkge1xuICAgICAgICBbdXBsb2FkVGhyb3R0bGVkLCBmbHVzaFVwbG9hZF0gPSBwcm9ncmVzc0V2ZW50UmVkdWNlcihvblVwbG9hZFByb2dyZXNzKTtcblxuICAgICAgICByZXF1ZXN0LnVwbG9hZC5hZGRFdmVudExpc3RlbmVyKCdwcm9ncmVzcycsIHVwbG9hZFRocm90dGxlZCk7XG5cbiAgICAgICAgcmVxdWVzdC51cGxvYWQuYWRkRXZlbnRMaXN0ZW5lcignbG9hZGVuZCcsIGZsdXNoVXBsb2FkKTtcbiAgICAgIH1cblxuICAgICAgaWYgKF9jb25maWcuY2FuY2VsVG9rZW4gfHwgX2NvbmZpZy5zaWduYWwpIHtcbiAgICAgICAgLy8gSGFuZGxlIGNhbmNlbGxhdGlvblxuICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgZnVuYy1uYW1lc1xuICAgICAgICBvbkNhbmNlbGVkID0gKGNhbmNlbCkgPT4ge1xuICAgICAgICAgIGlmICghcmVxdWVzdCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZWplY3QoIWNhbmNlbCB8fCBjYW5jZWwudHlwZSA/IG5ldyBDYW5jZWxlZEVycm9yKG51bGwsIGNvbmZpZywgcmVxdWVzdCkgOiBjYW5jZWwpO1xuICAgICAgICAgIHJlcXVlc3QuYWJvcnQoKTtcbiAgICAgICAgICBkb25lKCk7XG4gICAgICAgICAgcmVxdWVzdCA9IG51bGw7XG4gICAgICAgIH07XG5cbiAgICAgICAgX2NvbmZpZy5jYW5jZWxUb2tlbiAmJiBfY29uZmlnLmNhbmNlbFRva2VuLnN1YnNjcmliZShvbkNhbmNlbGVkKTtcbiAgICAgICAgaWYgKF9jb25maWcuc2lnbmFsKSB7XG4gICAgICAgICAgX2NvbmZpZy5zaWduYWwuYWJvcnRlZFxuICAgICAgICAgICAgPyBvbkNhbmNlbGVkKClcbiAgICAgICAgICAgIDogX2NvbmZpZy5zaWduYWwuYWRkRXZlbnRMaXN0ZW5lcignYWJvcnQnLCBvbkNhbmNlbGVkKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBjb25zdCBwcm90b2NvbCA9IHBhcnNlUHJvdG9jb2woX2NvbmZpZy51cmwpO1xuXG4gICAgICBpZiAocHJvdG9jb2wgJiYgIXBsYXRmb3JtLnByb3RvY29scy5pbmNsdWRlcyhwcm90b2NvbCkpIHtcbiAgICAgICAgcmVqZWN0KFxuICAgICAgICAgIG5ldyBBeGlvc0Vycm9yKFxuICAgICAgICAgICAgJ1Vuc3VwcG9ydGVkIHByb3RvY29sICcgKyBwcm90b2NvbCArICc6JyxcbiAgICAgICAgICAgIEF4aW9zRXJyb3IuRVJSX0JBRF9SRVFVRVNULFxuICAgICAgICAgICAgY29uZmlnXG4gICAgICAgICAgKVxuICAgICAgICApO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIC8vIFNlbmQgdGhlIHJlcXVlc3RcbiAgICAgIHJlcXVlc3Quc2VuZChyZXF1ZXN0RGF0YSB8fCBudWxsKTtcbiAgICB9KTtcbiAgfTtcbiIsImltcG9ydCBDYW5jZWxlZEVycm9yIGZyb20gJy4uL2NhbmNlbC9DYW5jZWxlZEVycm9yLmpzJztcbmltcG9ydCBBeGlvc0Vycm9yIGZyb20gJy4uL2NvcmUvQXhpb3NFcnJvci5qcyc7XG5pbXBvcnQgdXRpbHMgZnJvbSAnLi4vdXRpbHMuanMnO1xuXG5jb25zdCBjb21wb3NlU2lnbmFscyA9IChzaWduYWxzLCB0aW1lb3V0KSA9PiB7XG4gIGNvbnN0IHsgbGVuZ3RoIH0gPSAoc2lnbmFscyA9IHNpZ25hbHMgPyBzaWduYWxzLmZpbHRlcihCb29sZWFuKSA6IFtdKTtcblxuICBpZiAodGltZW91dCB8fCBsZW5ndGgpIHtcbiAgICBsZXQgY29udHJvbGxlciA9IG5ldyBBYm9ydENvbnRyb2xsZXIoKTtcblxuICAgIGxldCBhYm9ydGVkO1xuXG4gICAgY29uc3Qgb25hYm9ydCA9IGZ1bmN0aW9uIChyZWFzb24pIHtcbiAgICAgIGlmICghYWJvcnRlZCkge1xuICAgICAgICBhYm9ydGVkID0gdHJ1ZTtcbiAgICAgICAgdW5zdWJzY3JpYmUoKTtcbiAgICAgICAgY29uc3QgZXJyID0gcmVhc29uIGluc3RhbmNlb2YgRXJyb3IgPyByZWFzb24gOiB0aGlzLnJlYXNvbjtcbiAgICAgICAgY29udHJvbGxlci5hYm9ydChcbiAgICAgICAgICBlcnIgaW5zdGFuY2VvZiBBeGlvc0Vycm9yXG4gICAgICAgICAgICA/IGVyclxuICAgICAgICAgICAgOiBuZXcgQ2FuY2VsZWRFcnJvcihlcnIgaW5zdGFuY2VvZiBFcnJvciA/IGVyci5tZXNzYWdlIDogZXJyKVxuICAgICAgICApO1xuICAgICAgfVxuICAgIH07XG5cbiAgICBsZXQgdGltZXIgPVxuICAgICAgdGltZW91dCAmJlxuICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIHRpbWVyID0gbnVsbDtcbiAgICAgICAgb25hYm9ydChuZXcgQXhpb3NFcnJvcihgdGltZW91dCBvZiAke3RpbWVvdXR9bXMgZXhjZWVkZWRgLCBBeGlvc0Vycm9yLkVUSU1FRE9VVCkpO1xuICAgICAgfSwgdGltZW91dCk7XG5cbiAgICBjb25zdCB1bnN1YnNjcmliZSA9ICgpID0+IHtcbiAgICAgIGlmIChzaWduYWxzKSB7XG4gICAgICAgIHRpbWVyICYmIGNsZWFyVGltZW91dCh0aW1lcik7XG4gICAgICAgIHRpbWVyID0gbnVsbDtcbiAgICAgICAgc2lnbmFscy5mb3JFYWNoKChzaWduYWwpID0+IHtcbiAgICAgICAgICBzaWduYWwudW5zdWJzY3JpYmVcbiAgICAgICAgICAgID8gc2lnbmFsLnVuc3Vic2NyaWJlKG9uYWJvcnQpXG4gICAgICAgICAgICA6IHNpZ25hbC5yZW1vdmVFdmVudExpc3RlbmVyKCdhYm9ydCcsIG9uYWJvcnQpO1xuICAgICAgICB9KTtcbiAgICAgICAgc2lnbmFscyA9IG51bGw7XG4gICAgICB9XG4gICAgfTtcblxuICAgIHNpZ25hbHMuZm9yRWFjaCgoc2lnbmFsKSA9PiBzaWduYWwuYWRkRXZlbnRMaXN0ZW5lcignYWJvcnQnLCBvbmFib3J0KSk7XG5cbiAgICBjb25zdCB7IHNpZ25hbCB9ID0gY29udHJvbGxlcjtcblxuICAgIHNpZ25hbC51bnN1YnNjcmliZSA9ICgpID0+IHV0aWxzLmFzYXAodW5zdWJzY3JpYmUpO1xuXG4gICAgcmV0dXJuIHNpZ25hbDtcbiAgfVxufTtcblxuZXhwb3J0IGRlZmF1bHQgY29tcG9zZVNpZ25hbHM7XG4iLCJleHBvcnQgY29uc3Qgc3RyZWFtQ2h1bmsgPSBmdW5jdGlvbiogKGNodW5rLCBjaHVua1NpemUpIHtcbiAgbGV0IGxlbiA9IGNodW5rLmJ5dGVMZW5ndGg7XG5cbiAgaWYgKCFjaHVua1NpemUgfHwgbGVuIDwgY2h1bmtTaXplKSB7XG4gICAgeWllbGQgY2h1bms7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgbGV0IHBvcyA9IDA7XG4gIGxldCBlbmQ7XG5cbiAgd2hpbGUgKHBvcyA8IGxlbikge1xuICAgIGVuZCA9IHBvcyArIGNodW5rU2l6ZTtcbiAgICB5aWVsZCBjaHVuay5zbGljZShwb3MsIGVuZCk7XG4gICAgcG9zID0gZW5kO1xuICB9XG59O1xuXG5leHBvcnQgY29uc3QgcmVhZEJ5dGVzID0gYXN5bmMgZnVuY3Rpb24qIChpdGVyYWJsZSwgY2h1bmtTaXplKSB7XG4gIGZvciBhd2FpdCAoY29uc3QgY2h1bmsgb2YgcmVhZFN0cmVhbShpdGVyYWJsZSkpIHtcbiAgICB5aWVsZCogc3RyZWFtQ2h1bmsoY2h1bmssIGNodW5rU2l6ZSk7XG4gIH1cbn07XG5cbmNvbnN0IHJlYWRTdHJlYW0gPSBhc3luYyBmdW5jdGlvbiogKHN0cmVhbSkge1xuICBpZiAoc3RyZWFtW1N5bWJvbC5hc3luY0l0ZXJhdG9yXSkge1xuICAgIHlpZWxkKiBzdHJlYW07XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgY29uc3QgcmVhZGVyID0gc3RyZWFtLmdldFJlYWRlcigpO1xuICB0cnkge1xuICAgIGZvciAoOzspIHtcbiAgICAgIGNvbnN0IHsgZG9uZSwgdmFsdWUgfSA9IGF3YWl0IHJlYWRlci5yZWFkKCk7XG4gICAgICBpZiAoZG9uZSkge1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICAgIHlpZWxkIHZhbHVlO1xuICAgIH1cbiAgfSBmaW5hbGx5IHtcbiAgICBhd2FpdCByZWFkZXIuY2FuY2VsKCk7XG4gIH1cbn07XG5cbmV4cG9ydCBjb25zdCB0cmFja1N0cmVhbSA9IChzdHJlYW0sIGNodW5rU2l6ZSwgb25Qcm9ncmVzcywgb25GaW5pc2gpID0+IHtcbiAgY29uc3QgaXRlcmF0b3IgPSByZWFkQnl0ZXMoc3RyZWFtLCBjaHVua1NpemUpO1xuXG4gIGxldCBieXRlcyA9IDA7XG4gIGxldCBkb25lO1xuICBsZXQgX29uRmluaXNoID0gKGUpID0+IHtcbiAgICBpZiAoIWRvbmUpIHtcbiAgICAgIGRvbmUgPSB0cnVlO1xuICAgICAgb25GaW5pc2ggJiYgb25GaW5pc2goZSk7XG4gICAgfVxuICB9O1xuXG4gIHJldHVybiBuZXcgUmVhZGFibGVTdHJlYW0oXG4gICAge1xuICAgICAgYXN5bmMgcHVsbChjb250cm9sbGVyKSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgY29uc3QgeyBkb25lLCB2YWx1ZSB9ID0gYXdhaXQgaXRlcmF0b3IubmV4dCgpO1xuXG4gICAgICAgICAgaWYgKGRvbmUpIHtcbiAgICAgICAgICAgIF9vbkZpbmlzaCgpO1xuICAgICAgICAgICAgY29udHJvbGxlci5jbG9zZSgpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGxldCBsZW4gPSB2YWx1ZS5ieXRlTGVuZ3RoO1xuICAgICAgICAgIGlmIChvblByb2dyZXNzKSB7XG4gICAgICAgICAgICBsZXQgbG9hZGVkQnl0ZXMgPSAoYnl0ZXMgKz0gbGVuKTtcbiAgICAgICAgICAgIG9uUHJvZ3Jlc3MobG9hZGVkQnl0ZXMpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBjb250cm9sbGVyLmVucXVldWUobmV3IFVpbnQ4QXJyYXkodmFsdWUpKTtcbiAgICAgICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgICAgX29uRmluaXNoKGVycik7XG4gICAgICAgICAgdGhyb3cgZXJyO1xuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgY2FuY2VsKHJlYXNvbikge1xuICAgICAgICBfb25GaW5pc2gocmVhc29uKTtcbiAgICAgICAgcmV0dXJuIGl0ZXJhdG9yLnJldHVybigpO1xuICAgICAgfSxcbiAgICB9LFxuICAgIHtcbiAgICAgIGhpZ2hXYXRlck1hcms6IDIsXG4gICAgfVxuICApO1xufTtcbiIsIi8qKlxuICogRXN0aW1hdGUgZGVjb2RlZCBieXRlIGxlbmd0aCBvZiBhIGRhdGE6Ly8gVVJMICp3aXRob3V0KiBhbGxvY2F0aW5nIGxhcmdlIGJ1ZmZlcnMuXG4gKiAtIEZvciBiYXNlNjQ6IGNvbXB1dGUgZXhhY3QgZGVjb2RlZCBzaXplIHVzaW5nIGxlbmd0aCBhbmQgcGFkZGluZztcbiAqICAgICAgICAgICAgICAgaGFuZGxlICVYWCBhdCB0aGUgY2hhcmFjdGVyLWNvdW50IGxldmVsIChubyBzdHJpbmcgYWxsb2NhdGlvbikuXG4gKiAtIEZvciBub24tYmFzZTY0OiB1c2UgVVRGLTggYnl0ZUxlbmd0aCBvZiB0aGUgZW5jb2RlZCBib2R5IGFzIGEgc2FmZSB1cHBlciBib3VuZC5cbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gdXJsXG4gKiBAcmV0dXJucyB7bnVtYmVyfVxuICovXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBlc3RpbWF0ZURhdGFVUkxEZWNvZGVkQnl0ZXModXJsKSB7XG4gIGlmICghdXJsIHx8IHR5cGVvZiB1cmwgIT09ICdzdHJpbmcnKSByZXR1cm4gMDtcbiAgaWYgKCF1cmwuc3RhcnRzV2l0aCgnZGF0YTonKSkgcmV0dXJuIDA7XG5cbiAgY29uc3QgY29tbWEgPSB1cmwuaW5kZXhPZignLCcpO1xuICBpZiAoY29tbWEgPCAwKSByZXR1cm4gMDtcblxuICBjb25zdCBtZXRhID0gdXJsLnNsaWNlKDUsIGNvbW1hKTtcbiAgY29uc3QgYm9keSA9IHVybC5zbGljZShjb21tYSArIDEpO1xuICBjb25zdCBpc0Jhc2U2NCA9IC87YmFzZTY0L2kudGVzdChtZXRhKTtcblxuICBpZiAoaXNCYXNlNjQpIHtcbiAgICBsZXQgZWZmZWN0aXZlTGVuID0gYm9keS5sZW5ndGg7XG4gICAgY29uc3QgbGVuID0gYm9keS5sZW5ndGg7IC8vIGNhY2hlIGxlbmd0aFxuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW47IGkrKykge1xuICAgICAgaWYgKGJvZHkuY2hhckNvZGVBdChpKSA9PT0gMzcgLyogJyUnICovICYmIGkgKyAyIDwgbGVuKSB7XG4gICAgICAgIGNvbnN0IGEgPSBib2R5LmNoYXJDb2RlQXQoaSArIDEpO1xuICAgICAgICBjb25zdCBiID0gYm9keS5jaGFyQ29kZUF0KGkgKyAyKTtcbiAgICAgICAgY29uc3QgaXNIZXggPVxuICAgICAgICAgICgoYSA+PSA0OCAmJiBhIDw9IDU3KSB8fCAoYSA+PSA2NSAmJiBhIDw9IDcwKSB8fCAoYSA+PSA5NyAmJiBhIDw9IDEwMikpICYmXG4gICAgICAgICAgKChiID49IDQ4ICYmIGIgPD0gNTcpIHx8IChiID49IDY1ICYmIGIgPD0gNzApIHx8IChiID49IDk3ICYmIGIgPD0gMTAyKSk7XG5cbiAgICAgICAgaWYgKGlzSGV4KSB7XG4gICAgICAgICAgZWZmZWN0aXZlTGVuIC09IDI7XG4gICAgICAgICAgaSArPSAyO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgbGV0IHBhZCA9IDA7XG4gICAgbGV0IGlkeCA9IGxlbiAtIDE7XG5cbiAgICBjb25zdCB0YWlsSXNQY3QzRCA9IChqKSA9PlxuICAgICAgaiA+PSAyICYmXG4gICAgICBib2R5LmNoYXJDb2RlQXQoaiAtIDIpID09PSAzNyAmJiAvLyAnJSdcbiAgICAgIGJvZHkuY2hhckNvZGVBdChqIC0gMSkgPT09IDUxICYmIC8vICczJ1xuICAgICAgKGJvZHkuY2hhckNvZGVBdChqKSA9PT0gNjggfHwgYm9keS5jaGFyQ29kZUF0KGopID09PSAxMDApOyAvLyAnRCcgb3IgJ2QnXG5cbiAgICBpZiAoaWR4ID49IDApIHtcbiAgICAgIGlmIChib2R5LmNoYXJDb2RlQXQoaWR4KSA9PT0gNjEgLyogJz0nICovKSB7XG4gICAgICAgIHBhZCsrO1xuICAgICAgICBpZHgtLTtcbiAgICAgIH0gZWxzZSBpZiAodGFpbElzUGN0M0QoaWR4KSkge1xuICAgICAgICBwYWQrKztcbiAgICAgICAgaWR4IC09IDM7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKHBhZCA9PT0gMSAmJiBpZHggPj0gMCkge1xuICAgICAgaWYgKGJvZHkuY2hhckNvZGVBdChpZHgpID09PSA2MSAvKiAnPScgKi8pIHtcbiAgICAgICAgcGFkKys7XG4gICAgICB9IGVsc2UgaWYgKHRhaWxJc1BjdDNEKGlkeCkpIHtcbiAgICAgICAgcGFkKys7XG4gICAgICB9XG4gICAgfVxuXG4gICAgY29uc3QgZ3JvdXBzID0gTWF0aC5mbG9vcihlZmZlY3RpdmVMZW4gLyA0KTtcbiAgICBjb25zdCBieXRlcyA9IGdyb3VwcyAqIDMgLSAocGFkIHx8IDApO1xuICAgIHJldHVybiBieXRlcyA+IDAgPyBieXRlcyA6IDA7XG4gIH1cblxuICBpZiAodHlwZW9mIEJ1ZmZlciAhPT0gJ3VuZGVmaW5lZCcgJiYgdHlwZW9mIEJ1ZmZlci5ieXRlTGVuZ3RoID09PSAnZnVuY3Rpb24nKSB7XG4gICAgcmV0dXJuIEJ1ZmZlci5ieXRlTGVuZ3RoKGJvZHksICd1dGY4Jyk7XG4gIH1cblxuICAvLyBDb21wdXRlIFVURi04IGJ5dGUgbGVuZ3RoIGRpcmVjdGx5IGZyb20gVVRGLTE2IGNvZGUgdW5pdHMgd2l0aG91dCBhbGxvY2F0aW5nXG4gIC8vIGEgYnl0ZSBidWZmZXIgKFRleHRFbmNvZGVyLmVuY29kZSB3b3VsZCBkZWZlYXQgdGhlIERvUyBndWFyZCBvbiBsYXJnZSBib2RpZXMpLlxuICAvLyBVc2luZyBib2R5Lmxlbmd0aCBoZXJlIHdvdWxkIHVuZGVyY291bnQgbm9uLUFTQ0lJIChlLmcuICfigqwnIGlzIDEgY29kZSB1bml0XG4gIC8vIGJ1dCAzIFVURi04IGJ5dGVzKS5cbiAgbGV0IGJ5dGVzID0gMDtcbiAgZm9yIChsZXQgaSA9IDAsIGxlbiA9IGJvZHkubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcbiAgICBjb25zdCBjID0gYm9keS5jaGFyQ29kZUF0KGkpO1xuICAgIGlmIChjIDwgMHg4MCkge1xuICAgICAgYnl0ZXMgKz0gMTtcbiAgICB9IGVsc2UgaWYgKGMgPCAweDgwMCkge1xuICAgICAgYnl0ZXMgKz0gMjtcbiAgICB9IGVsc2UgaWYgKGMgPj0gMHhkODAwICYmIGMgPD0gMHhkYmZmICYmIGkgKyAxIDwgbGVuKSB7XG4gICAgICBjb25zdCBuZXh0ID0gYm9keS5jaGFyQ29kZUF0KGkgKyAxKTtcbiAgICAgIGlmIChuZXh0ID49IDB4ZGMwMCAmJiBuZXh0IDw9IDB4ZGZmZikge1xuICAgICAgICBieXRlcyArPSA0O1xuICAgICAgICBpKys7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBieXRlcyArPSAzO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBieXRlcyArPSAzO1xuICAgIH1cbiAgfVxuICByZXR1cm4gYnl0ZXM7XG59XG4iLCJleHBvcnQgY29uc3QgVkVSU0lPTiA9IFwiMS4xNi4wXCI7IiwiaW1wb3J0IHBsYXRmb3JtIGZyb20gJy4uL3BsYXRmb3JtL2luZGV4LmpzJztcbmltcG9ydCB1dGlscyBmcm9tICcuLi91dGlscy5qcyc7XG5pbXBvcnQgQXhpb3NFcnJvciBmcm9tICcuLi9jb3JlL0F4aW9zRXJyb3IuanMnO1xuaW1wb3J0IGNvbXBvc2VTaWduYWxzIGZyb20gJy4uL2hlbHBlcnMvY29tcG9zZVNpZ25hbHMuanMnO1xuaW1wb3J0IHsgdHJhY2tTdHJlYW0gfSBmcm9tICcuLi9oZWxwZXJzL3RyYWNrU3RyZWFtLmpzJztcbmltcG9ydCBBeGlvc0hlYWRlcnMgZnJvbSAnLi4vY29yZS9BeGlvc0hlYWRlcnMuanMnO1xuaW1wb3J0IHtcbiAgcHJvZ3Jlc3NFdmVudFJlZHVjZXIsXG4gIHByb2dyZXNzRXZlbnREZWNvcmF0b3IsXG4gIGFzeW5jRGVjb3JhdG9yLFxufSBmcm9tICcuLi9oZWxwZXJzL3Byb2dyZXNzRXZlbnRSZWR1Y2VyLmpzJztcbmltcG9ydCByZXNvbHZlQ29uZmlnIGZyb20gJy4uL2hlbHBlcnMvcmVzb2x2ZUNvbmZpZy5qcyc7XG5pbXBvcnQgc2V0dGxlIGZyb20gJy4uL2NvcmUvc2V0dGxlLmpzJztcbmltcG9ydCBlc3RpbWF0ZURhdGFVUkxEZWNvZGVkQnl0ZXMgZnJvbSAnLi4vaGVscGVycy9lc3RpbWF0ZURhdGFVUkxEZWNvZGVkQnl0ZXMuanMnO1xuaW1wb3J0IHsgVkVSU0lPTiB9IGZyb20gJy4uL2Vudi9kYXRhLmpzJztcblxuY29uc3QgREVGQVVMVF9DSFVOS19TSVpFID0gNjQgKiAxMDI0O1xuXG5jb25zdCB7IGlzRnVuY3Rpb24gfSA9IHV0aWxzO1xuXG5jb25zdCB0ZXN0ID0gKGZuLCAuLi5hcmdzKSA9PiB7XG4gIHRyeSB7XG4gICAgcmV0dXJuICEhZm4oLi4uYXJncyk7XG4gIH0gY2F0Y2ggKGUpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbn07XG5cbmNvbnN0IGZhY3RvcnkgPSAoZW52KSA9PiB7XG4gIGNvbnN0IGdsb2JhbE9iamVjdCA9IHV0aWxzLmdsb2JhbCA/PyBnbG9iYWxUaGlzO1xuICBjb25zdCB7IFJlYWRhYmxlU3RyZWFtLCBUZXh0RW5jb2RlciB9ID0gZ2xvYmFsT2JqZWN0O1xuXG4gIGVudiA9IHV0aWxzLm1lcmdlLmNhbGwoXG4gICAge1xuICAgICAgc2tpcFVuZGVmaW5lZDogdHJ1ZSxcbiAgICB9LFxuICAgIHtcbiAgICAgIFJlcXVlc3Q6IGdsb2JhbE9iamVjdC5SZXF1ZXN0LFxuICAgICAgUmVzcG9uc2U6IGdsb2JhbE9iamVjdC5SZXNwb25zZSxcbiAgICB9LFxuICAgIGVudlxuICApO1xuXG4gIGNvbnN0IHsgZmV0Y2g6IGVudkZldGNoLCBSZXF1ZXN0LCBSZXNwb25zZSB9ID0gZW52O1xuICBjb25zdCBpc0ZldGNoU3VwcG9ydGVkID0gZW52RmV0Y2ggPyBpc0Z1bmN0aW9uKGVudkZldGNoKSA6IHR5cGVvZiBmZXRjaCA9PT0gJ2Z1bmN0aW9uJztcbiAgY29uc3QgaXNSZXF1ZXN0U3VwcG9ydGVkID0gaXNGdW5jdGlvbihSZXF1ZXN0KTtcbiAgY29uc3QgaXNSZXNwb25zZVN1cHBvcnRlZCA9IGlzRnVuY3Rpb24oUmVzcG9uc2UpO1xuXG4gIGlmICghaXNGZXRjaFN1cHBvcnRlZCkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIGNvbnN0IGlzUmVhZGFibGVTdHJlYW1TdXBwb3J0ZWQgPSBpc0ZldGNoU3VwcG9ydGVkICYmIGlzRnVuY3Rpb24oUmVhZGFibGVTdHJlYW0pO1xuXG4gIGNvbnN0IGVuY29kZVRleHQgPVxuICAgIGlzRmV0Y2hTdXBwb3J0ZWQgJiZcbiAgICAodHlwZW9mIFRleHRFbmNvZGVyID09PSAnZnVuY3Rpb24nXG4gICAgICA/IChcbiAgICAgICAgICAoZW5jb2RlcikgPT4gKHN0cikgPT5cbiAgICAgICAgICAgIGVuY29kZXIuZW5jb2RlKHN0cilcbiAgICAgICAgKShuZXcgVGV4dEVuY29kZXIoKSlcbiAgICAgIDogYXN5bmMgKHN0cikgPT4gbmV3IFVpbnQ4QXJyYXkoYXdhaXQgbmV3IFJlcXVlc3Qoc3RyKS5hcnJheUJ1ZmZlcigpKSk7XG5cbiAgY29uc3Qgc3VwcG9ydHNSZXF1ZXN0U3RyZWFtID1cbiAgICBpc1JlcXVlc3RTdXBwb3J0ZWQgJiZcbiAgICBpc1JlYWRhYmxlU3RyZWFtU3VwcG9ydGVkICYmXG4gICAgdGVzdCgoKSA9PiB7XG4gICAgICBsZXQgZHVwbGV4QWNjZXNzZWQgPSBmYWxzZTtcblxuICAgICAgY29uc3QgcmVxdWVzdCA9IG5ldyBSZXF1ZXN0KHBsYXRmb3JtLm9yaWdpbiwge1xuICAgICAgICBib2R5OiBuZXcgUmVhZGFibGVTdHJlYW0oKSxcbiAgICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICAgIGdldCBkdXBsZXgoKSB7XG4gICAgICAgICAgZHVwbGV4QWNjZXNzZWQgPSB0cnVlO1xuICAgICAgICAgIHJldHVybiAnaGFsZic7XG4gICAgICAgIH0sXG4gICAgICB9KTtcblxuICAgICAgY29uc3QgaGFzQ29udGVudFR5cGUgPSByZXF1ZXN0LmhlYWRlcnMuaGFzKCdDb250ZW50LVR5cGUnKTtcblxuICAgICAgaWYgKHJlcXVlc3QuYm9keSAhPSBudWxsKSB7XG4gICAgICAgIHJlcXVlc3QuYm9keS5jYW5jZWwoKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGR1cGxleEFjY2Vzc2VkICYmICFoYXNDb250ZW50VHlwZTtcbiAgICB9KTtcblxuICBjb25zdCBzdXBwb3J0c1Jlc3BvbnNlU3RyZWFtID1cbiAgICBpc1Jlc3BvbnNlU3VwcG9ydGVkICYmXG4gICAgaXNSZWFkYWJsZVN0cmVhbVN1cHBvcnRlZCAmJlxuICAgIHRlc3QoKCkgPT4gdXRpbHMuaXNSZWFkYWJsZVN0cmVhbShuZXcgUmVzcG9uc2UoJycpLmJvZHkpKTtcblxuICBjb25zdCByZXNvbHZlcnMgPSB7XG4gICAgc3RyZWFtOiBzdXBwb3J0c1Jlc3BvbnNlU3RyZWFtICYmICgocmVzKSA9PiByZXMuYm9keSksXG4gIH07XG5cbiAgaXNGZXRjaFN1cHBvcnRlZCAmJlxuICAgICgoKSA9PiB7XG4gICAgICBbJ3RleHQnLCAnYXJyYXlCdWZmZXInLCAnYmxvYicsICdmb3JtRGF0YScsICdzdHJlYW0nXS5mb3JFYWNoKCh0eXBlKSA9PiB7XG4gICAgICAgICFyZXNvbHZlcnNbdHlwZV0gJiZcbiAgICAgICAgICAocmVzb2x2ZXJzW3R5cGVdID0gKHJlcywgY29uZmlnKSA9PiB7XG4gICAgICAgICAgICBsZXQgbWV0aG9kID0gcmVzICYmIHJlc1t0eXBlXTtcblxuICAgICAgICAgICAgaWYgKG1ldGhvZCkge1xuICAgICAgICAgICAgICByZXR1cm4gbWV0aG9kLmNhbGwocmVzKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhyb3cgbmV3IEF4aW9zRXJyb3IoXG4gICAgICAgICAgICAgIGBSZXNwb25zZSB0eXBlICcke3R5cGV9JyBpcyBub3Qgc3VwcG9ydGVkYCxcbiAgICAgICAgICAgICAgQXhpb3NFcnJvci5FUlJfTk9UX1NVUFBPUlQsXG4gICAgICAgICAgICAgIGNvbmZpZ1xuICAgICAgICAgICAgKTtcbiAgICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgIH0pKCk7XG5cbiAgY29uc3QgZ2V0Qm9keUxlbmd0aCA9IGFzeW5jIChib2R5KSA9PiB7XG4gICAgaWYgKGJvZHkgPT0gbnVsbCkge1xuICAgICAgcmV0dXJuIDA7XG4gICAgfVxuXG4gICAgaWYgKHV0aWxzLmlzQmxvYihib2R5KSkge1xuICAgICAgcmV0dXJuIGJvZHkuc2l6ZTtcbiAgICB9XG5cbiAgICBpZiAodXRpbHMuaXNTcGVjQ29tcGxpYW50Rm9ybShib2R5KSkge1xuICAgICAgY29uc3QgX3JlcXVlc3QgPSBuZXcgUmVxdWVzdChwbGF0Zm9ybS5vcmlnaW4sIHtcbiAgICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICAgIGJvZHksXG4gICAgICB9KTtcbiAgICAgIHJldHVybiAoYXdhaXQgX3JlcXVlc3QuYXJyYXlCdWZmZXIoKSkuYnl0ZUxlbmd0aDtcbiAgICB9XG5cbiAgICBpZiAodXRpbHMuaXNBcnJheUJ1ZmZlclZpZXcoYm9keSkgfHwgdXRpbHMuaXNBcnJheUJ1ZmZlcihib2R5KSkge1xuICAgICAgcmV0dXJuIGJvZHkuYnl0ZUxlbmd0aDtcbiAgICB9XG5cbiAgICBpZiAodXRpbHMuaXNVUkxTZWFyY2hQYXJhbXMoYm9keSkpIHtcbiAgICAgIGJvZHkgPSBib2R5ICsgJyc7XG4gICAgfVxuXG4gICAgaWYgKHV0aWxzLmlzU3RyaW5nKGJvZHkpKSB7XG4gICAgICByZXR1cm4gKGF3YWl0IGVuY29kZVRleHQoYm9keSkpLmJ5dGVMZW5ndGg7XG4gICAgfVxuICB9O1xuXG4gIGNvbnN0IHJlc29sdmVCb2R5TGVuZ3RoID0gYXN5bmMgKGhlYWRlcnMsIGJvZHkpID0+IHtcbiAgICBjb25zdCBsZW5ndGggPSB1dGlscy50b0Zpbml0ZU51bWJlcihoZWFkZXJzLmdldENvbnRlbnRMZW5ndGgoKSk7XG5cbiAgICByZXR1cm4gbGVuZ3RoID09IG51bGwgPyBnZXRCb2R5TGVuZ3RoKGJvZHkpIDogbGVuZ3RoO1xuICB9O1xuXG4gIHJldHVybiBhc3luYyAoY29uZmlnKSA9PiB7XG4gICAgbGV0IHtcbiAgICAgIHVybCxcbiAgICAgIG1ldGhvZCxcbiAgICAgIGRhdGEsXG4gICAgICBzaWduYWwsXG4gICAgICBjYW5jZWxUb2tlbixcbiAgICAgIHRpbWVvdXQsXG4gICAgICBvbkRvd25sb2FkUHJvZ3Jlc3MsXG4gICAgICBvblVwbG9hZFByb2dyZXNzLFxuICAgICAgcmVzcG9uc2VUeXBlLFxuICAgICAgaGVhZGVycyxcbiAgICAgIHdpdGhDcmVkZW50aWFscyA9ICdzYW1lLW9yaWdpbicsXG4gICAgICBmZXRjaE9wdGlvbnMsXG4gICAgICBtYXhDb250ZW50TGVuZ3RoLFxuICAgICAgbWF4Qm9keUxlbmd0aCxcbiAgICB9ID0gcmVzb2x2ZUNvbmZpZyhjb25maWcpO1xuXG4gICAgY29uc3QgaGFzTWF4Q29udGVudExlbmd0aCA9IHV0aWxzLmlzTnVtYmVyKG1heENvbnRlbnRMZW5ndGgpICYmIG1heENvbnRlbnRMZW5ndGggPiAtMTtcbiAgICBjb25zdCBoYXNNYXhCb2R5TGVuZ3RoID0gdXRpbHMuaXNOdW1iZXIobWF4Qm9keUxlbmd0aCkgJiYgbWF4Qm9keUxlbmd0aCA+IC0xO1xuXG4gICAgbGV0IF9mZXRjaCA9IGVudkZldGNoIHx8IGZldGNoO1xuXG4gICAgcmVzcG9uc2VUeXBlID0gcmVzcG9uc2VUeXBlID8gKHJlc3BvbnNlVHlwZSArICcnKS50b0xvd2VyQ2FzZSgpIDogJ3RleHQnO1xuXG4gICAgbGV0IGNvbXBvc2VkU2lnbmFsID0gY29tcG9zZVNpZ25hbHMoXG4gICAgICBbc2lnbmFsLCBjYW5jZWxUb2tlbiAmJiBjYW5jZWxUb2tlbi50b0Fib3J0U2lnbmFsKCldLFxuICAgICAgdGltZW91dFxuICAgICk7XG5cbiAgICBsZXQgcmVxdWVzdCA9IG51bGw7XG5cbiAgICBjb25zdCB1bnN1YnNjcmliZSA9XG4gICAgICBjb21wb3NlZFNpZ25hbCAmJlxuICAgICAgY29tcG9zZWRTaWduYWwudW5zdWJzY3JpYmUgJiZcbiAgICAgICgoKSA9PiB7XG4gICAgICAgIGNvbXBvc2VkU2lnbmFsLnVuc3Vic2NyaWJlKCk7XG4gICAgICB9KTtcblxuICAgIGxldCByZXF1ZXN0Q29udGVudExlbmd0aDtcblxuICAgIHRyeSB7XG4gICAgICAvLyBFbmZvcmNlIG1heENvbnRlbnRMZW5ndGggZm9yIGRhdGE6IFVSTHMgdXAtZnJvbnQgc28gd2UgbmV2ZXIgbWF0ZXJpYWxpemVcbiAgICAgIC8vIGFuIG92ZXJzaXplZCBwYXlsb2FkLiBUaGUgSFRUUCBhZGFwdGVyIGFwcGxpZXMgdGhlIHNhbWUgY2hlY2sgKHNlZSBodHRwLmpzXG4gICAgICAvLyBcImlmIChwcm90b2NvbCA9PT0gJ2RhdGE6JylcIiBicmFuY2gpLlxuICAgICAgaWYgKGhhc01heENvbnRlbnRMZW5ndGggJiYgdHlwZW9mIHVybCA9PT0gJ3N0cmluZycgJiYgdXJsLnN0YXJ0c1dpdGgoJ2RhdGE6JykpIHtcbiAgICAgICAgY29uc3QgZXN0aW1hdGVkID0gZXN0aW1hdGVEYXRhVVJMRGVjb2RlZEJ5dGVzKHVybCk7XG4gICAgICAgIGlmIChlc3RpbWF0ZWQgPiBtYXhDb250ZW50TGVuZ3RoKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IEF4aW9zRXJyb3IoXG4gICAgICAgICAgICAnbWF4Q29udGVudExlbmd0aCBzaXplIG9mICcgKyBtYXhDb250ZW50TGVuZ3RoICsgJyBleGNlZWRlZCcsXG4gICAgICAgICAgICBBeGlvc0Vycm9yLkVSUl9CQURfUkVTUE9OU0UsXG4gICAgICAgICAgICBjb25maWcsXG4gICAgICAgICAgICByZXF1ZXN0XG4gICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICAvLyBFbmZvcmNlIG1heEJvZHlMZW5ndGggYWdhaW5zdCB0aGUgb3V0Ym91bmQgcmVxdWVzdCBib2R5IGJlZm9yZSBkaXNwYXRjaC5cbiAgICAgIC8vIE1pcnJvcnMgaHR0cC5qcyBiZWhhdmlvciAoRVJSX0JBRF9SRVFVRVNUIC8gJ1JlcXVlc3QgYm9keSBsYXJnZXIgdGhhblxuICAgICAgLy8gbWF4Qm9keUxlbmd0aCBsaW1pdCcpLiBTa2lwIHdoZW4gdGhlIGJvZHkgbGVuZ3RoIGNhbm5vdCBiZSBkZXRlcm1pbmVkXG4gICAgICAvLyAoZS5nLiBhIGxpdmUgUmVhZGFibGVTdHJlYW0gc3VwcGxpZWQgYnkgdGhlIGNhbGxlcikuXG4gICAgICBpZiAoaGFzTWF4Qm9keUxlbmd0aCAmJiBtZXRob2QgIT09ICdnZXQnICYmIG1ldGhvZCAhPT0gJ2hlYWQnKSB7XG4gICAgICAgIGNvbnN0IG91dGJvdW5kTGVuZ3RoID0gYXdhaXQgcmVzb2x2ZUJvZHlMZW5ndGgoaGVhZGVycywgZGF0YSk7XG4gICAgICAgIGlmIChcbiAgICAgICAgICB0eXBlb2Ygb3V0Ym91bmRMZW5ndGggPT09ICdudW1iZXInICYmXG4gICAgICAgICAgaXNGaW5pdGUob3V0Ym91bmRMZW5ndGgpICYmXG4gICAgICAgICAgb3V0Ym91bmRMZW5ndGggPiBtYXhCb2R5TGVuZ3RoXG4gICAgICAgICkge1xuICAgICAgICAgIHRocm93IG5ldyBBeGlvc0Vycm9yKFxuICAgICAgICAgICAgJ1JlcXVlc3QgYm9keSBsYXJnZXIgdGhhbiBtYXhCb2R5TGVuZ3RoIGxpbWl0JyxcbiAgICAgICAgICAgIEF4aW9zRXJyb3IuRVJSX0JBRF9SRVFVRVNULFxuICAgICAgICAgICAgY29uZmlnLFxuICAgICAgICAgICAgcmVxdWVzdFxuICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKFxuICAgICAgICBvblVwbG9hZFByb2dyZXNzICYmXG4gICAgICAgIHN1cHBvcnRzUmVxdWVzdFN0cmVhbSAmJlxuICAgICAgICBtZXRob2QgIT09ICdnZXQnICYmXG4gICAgICAgIG1ldGhvZCAhPT0gJ2hlYWQnICYmXG4gICAgICAgIChyZXF1ZXN0Q29udGVudExlbmd0aCA9IGF3YWl0IHJlc29sdmVCb2R5TGVuZ3RoKGhlYWRlcnMsIGRhdGEpKSAhPT0gMFxuICAgICAgKSB7XG4gICAgICAgIGxldCBfcmVxdWVzdCA9IG5ldyBSZXF1ZXN0KHVybCwge1xuICAgICAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgICAgIGJvZHk6IGRhdGEsXG4gICAgICAgICAgZHVwbGV4OiAnaGFsZicsXG4gICAgICAgIH0pO1xuXG4gICAgICAgIGxldCBjb250ZW50VHlwZUhlYWRlcjtcblxuICAgICAgICBpZiAodXRpbHMuaXNGb3JtRGF0YShkYXRhKSAmJiAoY29udGVudFR5cGVIZWFkZXIgPSBfcmVxdWVzdC5oZWFkZXJzLmdldCgnY29udGVudC10eXBlJykpKSB7XG4gICAgICAgICAgaGVhZGVycy5zZXRDb250ZW50VHlwZShjb250ZW50VHlwZUhlYWRlcik7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoX3JlcXVlc3QuYm9keSkge1xuICAgICAgICAgIGNvbnN0IFtvblByb2dyZXNzLCBmbHVzaF0gPSBwcm9ncmVzc0V2ZW50RGVjb3JhdG9yKFxuICAgICAgICAgICAgcmVxdWVzdENvbnRlbnRMZW5ndGgsXG4gICAgICAgICAgICBwcm9ncmVzc0V2ZW50UmVkdWNlcihhc3luY0RlY29yYXRvcihvblVwbG9hZFByb2dyZXNzKSlcbiAgICAgICAgICApO1xuXG4gICAgICAgICAgZGF0YSA9IHRyYWNrU3RyZWFtKF9yZXF1ZXN0LmJvZHksIERFRkFVTFRfQ0hVTktfU0laRSwgb25Qcm9ncmVzcywgZmx1c2gpO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmICghdXRpbHMuaXNTdHJpbmcod2l0aENyZWRlbnRpYWxzKSkge1xuICAgICAgICB3aXRoQ3JlZGVudGlhbHMgPSB3aXRoQ3JlZGVudGlhbHMgPyAnaW5jbHVkZScgOiAnb21pdCc7XG4gICAgICB9XG5cbiAgICAgIC8vIENsb3VkZmxhcmUgV29ya2VycyB0aHJvd3Mgd2hlbiBjcmVkZW50aWFscyBhcmUgZGVmaW5lZFxuICAgICAgLy8gc2VlIGh0dHBzOi8vZ2l0aHViLmNvbS9jbG91ZGZsYXJlL3dvcmtlcmQvaXNzdWVzLzkwMlxuICAgICAgY29uc3QgaXNDcmVkZW50aWFsc1N1cHBvcnRlZCA9IGlzUmVxdWVzdFN1cHBvcnRlZCAmJiAnY3JlZGVudGlhbHMnIGluIFJlcXVlc3QucHJvdG90eXBlO1xuXG4gICAgICAvLyBJZiBkYXRhIGlzIEZvcm1EYXRhIGFuZCBDb250ZW50LVR5cGUgaXMgbXVsdGlwYXJ0L2Zvcm0tZGF0YSB3aXRob3V0IGJvdW5kYXJ5LFxuICAgICAgLy8gZGVsZXRlIGl0IHNvIGZldGNoIGNhbiBzZXQgaXQgY29ycmVjdGx5IHdpdGggdGhlIGJvdW5kYXJ5XG4gICAgICBpZiAodXRpbHMuaXNGb3JtRGF0YShkYXRhKSkge1xuICAgICAgICBjb25zdCBjb250ZW50VHlwZSA9IGhlYWRlcnMuZ2V0Q29udGVudFR5cGUoKTtcbiAgICAgICAgaWYgKFxuICAgICAgICAgIGNvbnRlbnRUeXBlICYmXG4gICAgICAgICAgL15tdWx0aXBhcnRcXC9mb3JtLWRhdGEvaS50ZXN0KGNvbnRlbnRUeXBlKSAmJlxuICAgICAgICAgICEvYm91bmRhcnk9L2kudGVzdChjb250ZW50VHlwZSlcbiAgICAgICAgKSB7XG4gICAgICAgICAgaGVhZGVycy5kZWxldGUoJ2NvbnRlbnQtdHlwZScpO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIC8vIFNldCBVc2VyLUFnZW50IGhlYWRlciBpZiBub3QgYWxyZWFkeSBzZXQgKGZldGNoIGRlZmF1bHRzIHRvICdub2RlJyBpbiBOb2RlLmpzKVxuICAgICAgaGVhZGVycy5zZXQoJ1VzZXItQWdlbnQnLCAnYXhpb3MvJyArIFZFUlNJT04sIGZhbHNlKTtcblxuICAgICAgY29uc3QgcmVzb2x2ZWRPcHRpb25zID0ge1xuICAgICAgICAuLi5mZXRjaE9wdGlvbnMsXG4gICAgICAgIHNpZ25hbDogY29tcG9zZWRTaWduYWwsXG4gICAgICAgIG1ldGhvZDogbWV0aG9kLnRvVXBwZXJDYXNlKCksXG4gICAgICAgIGhlYWRlcnM6IGhlYWRlcnMubm9ybWFsaXplKCkudG9KU09OKCksXG4gICAgICAgIGJvZHk6IGRhdGEsXG4gICAgICAgIGR1cGxleDogJ2hhbGYnLFxuICAgICAgICBjcmVkZW50aWFsczogaXNDcmVkZW50aWFsc1N1cHBvcnRlZCA/IHdpdGhDcmVkZW50aWFscyA6IHVuZGVmaW5lZCxcbiAgICAgIH07XG5cbiAgICAgIHJlcXVlc3QgPSBpc1JlcXVlc3RTdXBwb3J0ZWQgJiYgbmV3IFJlcXVlc3QodXJsLCByZXNvbHZlZE9wdGlvbnMpO1xuXG4gICAgICBsZXQgcmVzcG9uc2UgPSBhd2FpdCAoaXNSZXF1ZXN0U3VwcG9ydGVkXG4gICAgICAgID8gX2ZldGNoKHJlcXVlc3QsIGZldGNoT3B0aW9ucylcbiAgICAgICAgOiBfZmV0Y2godXJsLCByZXNvbHZlZE9wdGlvbnMpKTtcblxuICAgICAgLy8gQ2hlYXAgcHJlLWNoZWNrOiBpZiB0aGUgc2VydmVyIGhvbmVzdGx5IGRlY2xhcmVzIGEgY29udGVudC1sZW5ndGggdGhhdFxuICAgICAgLy8gYWxyZWFkeSBleGNlZWRzIHRoZSBjYXAsIHJlamVjdCBiZWZvcmUgd2Ugc3RhcnQgc3RyZWFtaW5nLlxuICAgICAgaWYgKGhhc01heENvbnRlbnRMZW5ndGgpIHtcbiAgICAgICAgY29uc3QgZGVjbGFyZWRMZW5ndGggPSB1dGlscy50b0Zpbml0ZU51bWJlcihyZXNwb25zZS5oZWFkZXJzLmdldCgnY29udGVudC1sZW5ndGgnKSk7XG4gICAgICAgIGlmIChkZWNsYXJlZExlbmd0aCAhPSBudWxsICYmIGRlY2xhcmVkTGVuZ3RoID4gbWF4Q29udGVudExlbmd0aCkge1xuICAgICAgICAgIHRocm93IG5ldyBBeGlvc0Vycm9yKFxuICAgICAgICAgICAgJ21heENvbnRlbnRMZW5ndGggc2l6ZSBvZiAnICsgbWF4Q29udGVudExlbmd0aCArICcgZXhjZWVkZWQnLFxuICAgICAgICAgICAgQXhpb3NFcnJvci5FUlJfQkFEX1JFU1BPTlNFLFxuICAgICAgICAgICAgY29uZmlnLFxuICAgICAgICAgICAgcmVxdWVzdFxuICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgY29uc3QgaXNTdHJlYW1SZXNwb25zZSA9XG4gICAgICAgIHN1cHBvcnRzUmVzcG9uc2VTdHJlYW0gJiYgKHJlc3BvbnNlVHlwZSA9PT0gJ3N0cmVhbScgfHwgcmVzcG9uc2VUeXBlID09PSAncmVzcG9uc2UnKTtcblxuICAgICAgaWYgKFxuICAgICAgICBzdXBwb3J0c1Jlc3BvbnNlU3RyZWFtICYmXG4gICAgICAgIHJlc3BvbnNlLmJvZHkgJiZcbiAgICAgICAgKG9uRG93bmxvYWRQcm9ncmVzcyB8fCBoYXNNYXhDb250ZW50TGVuZ3RoIHx8IChpc1N0cmVhbVJlc3BvbnNlICYmIHVuc3Vic2NyaWJlKSlcbiAgICAgICkge1xuICAgICAgICBjb25zdCBvcHRpb25zID0ge307XG5cbiAgICAgICAgWydzdGF0dXMnLCAnc3RhdHVzVGV4dCcsICdoZWFkZXJzJ10uZm9yRWFjaCgocHJvcCkgPT4ge1xuICAgICAgICAgIG9wdGlvbnNbcHJvcF0gPSByZXNwb25zZVtwcm9wXTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgY29uc3QgcmVzcG9uc2VDb250ZW50TGVuZ3RoID0gdXRpbHMudG9GaW5pdGVOdW1iZXIocmVzcG9uc2UuaGVhZGVycy5nZXQoJ2NvbnRlbnQtbGVuZ3RoJykpO1xuXG4gICAgICAgIGNvbnN0IFtvblByb2dyZXNzLCBmbHVzaF0gPVxuICAgICAgICAgIChvbkRvd25sb2FkUHJvZ3Jlc3MgJiZcbiAgICAgICAgICAgIHByb2dyZXNzRXZlbnREZWNvcmF0b3IoXG4gICAgICAgICAgICAgIHJlc3BvbnNlQ29udGVudExlbmd0aCxcbiAgICAgICAgICAgICAgcHJvZ3Jlc3NFdmVudFJlZHVjZXIoYXN5bmNEZWNvcmF0b3Iob25Eb3dubG9hZFByb2dyZXNzKSwgdHJ1ZSlcbiAgICAgICAgICAgICkpIHx8XG4gICAgICAgICAgW107XG5cbiAgICAgICAgbGV0IGJ5dGVzUmVhZCA9IDA7XG4gICAgICAgIGNvbnN0IG9uQ2h1bmtQcm9ncmVzcyA9IChsb2FkZWRCeXRlcykgPT4ge1xuICAgICAgICAgIGlmIChoYXNNYXhDb250ZW50TGVuZ3RoKSB7XG4gICAgICAgICAgICBieXRlc1JlYWQgPSBsb2FkZWRCeXRlcztcbiAgICAgICAgICAgIGlmIChieXRlc1JlYWQgPiBtYXhDb250ZW50TGVuZ3RoKSB7XG4gICAgICAgICAgICAgIHRocm93IG5ldyBBeGlvc0Vycm9yKFxuICAgICAgICAgICAgICAgICdtYXhDb250ZW50TGVuZ3RoIHNpemUgb2YgJyArIG1heENvbnRlbnRMZW5ndGggKyAnIGV4Y2VlZGVkJyxcbiAgICAgICAgICAgICAgICBBeGlvc0Vycm9yLkVSUl9CQURfUkVTUE9OU0UsXG4gICAgICAgICAgICAgICAgY29uZmlnLFxuICAgICAgICAgICAgICAgIHJlcXVlc3RcbiAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgb25Qcm9ncmVzcyAmJiBvblByb2dyZXNzKGxvYWRlZEJ5dGVzKTtcbiAgICAgICAgfTtcblxuICAgICAgICByZXNwb25zZSA9IG5ldyBSZXNwb25zZShcbiAgICAgICAgICB0cmFja1N0cmVhbShyZXNwb25zZS5ib2R5LCBERUZBVUxUX0NIVU5LX1NJWkUsIG9uQ2h1bmtQcm9ncmVzcywgKCkgPT4ge1xuICAgICAgICAgICAgZmx1c2ggJiYgZmx1c2goKTtcbiAgICAgICAgICAgIHVuc3Vic2NyaWJlICYmIHVuc3Vic2NyaWJlKCk7XG4gICAgICAgICAgfSksXG4gICAgICAgICAgb3B0aW9uc1xuICAgICAgICApO1xuICAgICAgfVxuXG4gICAgICByZXNwb25zZVR5cGUgPSByZXNwb25zZVR5cGUgfHwgJ3RleHQnO1xuXG4gICAgICBsZXQgcmVzcG9uc2VEYXRhID0gYXdhaXQgcmVzb2x2ZXJzW3V0aWxzLmZpbmRLZXkocmVzb2x2ZXJzLCByZXNwb25zZVR5cGUpIHx8ICd0ZXh0J10oXG4gICAgICAgIHJlc3BvbnNlLFxuICAgICAgICBjb25maWdcbiAgICAgICk7XG5cbiAgICAgIC8vIEZhbGxiYWNrIGVuZm9yY2VtZW50IGZvciBlbnZpcm9ubWVudHMgd2l0aG91dCBSZWFkYWJsZVN0cmVhbSBzdXBwb3J0XG4gICAgICAvLyAobGVnYWN5IHJ1bnRpbWVzKS4gRGV0ZWN0IG1hdGVyaWFsaXplZCBzaXplIGZyb20gdHlwZWQgb3V0cHV0OyBza2lwXG4gICAgICAvLyBzdHJlYW1zL1Jlc3BvbnNlIHBhc3N0aHJvdWdoIHNpbmNlIHRoZSB1c2VyIHdpbGwgcmVhZCB0aG9zZSB0aGVtc2VsdmVzLlxuICAgICAgaWYgKGhhc01heENvbnRlbnRMZW5ndGggJiYgIXN1cHBvcnRzUmVzcG9uc2VTdHJlYW0gJiYgIWlzU3RyZWFtUmVzcG9uc2UpIHtcbiAgICAgICAgbGV0IG1hdGVyaWFsaXplZFNpemU7XG4gICAgICAgIGlmIChyZXNwb25zZURhdGEgIT0gbnVsbCkge1xuICAgICAgICAgIGlmICh0eXBlb2YgcmVzcG9uc2VEYXRhLmJ5dGVMZW5ndGggPT09ICdudW1iZXInKSB7XG4gICAgICAgICAgICBtYXRlcmlhbGl6ZWRTaXplID0gcmVzcG9uc2VEYXRhLmJ5dGVMZW5ndGg7XG4gICAgICAgICAgfSBlbHNlIGlmICh0eXBlb2YgcmVzcG9uc2VEYXRhLnNpemUgPT09ICdudW1iZXInKSB7XG4gICAgICAgICAgICBtYXRlcmlhbGl6ZWRTaXplID0gcmVzcG9uc2VEYXRhLnNpemU7XG4gICAgICAgICAgfSBlbHNlIGlmICh0eXBlb2YgcmVzcG9uc2VEYXRhID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgbWF0ZXJpYWxpemVkU2l6ZSA9XG4gICAgICAgICAgICAgIHR5cGVvZiBUZXh0RW5jb2RlciA9PT0gJ2Z1bmN0aW9uJ1xuICAgICAgICAgICAgICAgID8gbmV3IFRleHRFbmNvZGVyKCkuZW5jb2RlKHJlc3BvbnNlRGF0YSkuYnl0ZUxlbmd0aFxuICAgICAgICAgICAgICAgIDogcmVzcG9uc2VEYXRhLmxlbmd0aDtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHR5cGVvZiBtYXRlcmlhbGl6ZWRTaXplID09PSAnbnVtYmVyJyAmJiBtYXRlcmlhbGl6ZWRTaXplID4gbWF4Q29udGVudExlbmd0aCkge1xuICAgICAgICAgIHRocm93IG5ldyBBeGlvc0Vycm9yKFxuICAgICAgICAgICAgJ21heENvbnRlbnRMZW5ndGggc2l6ZSBvZiAnICsgbWF4Q29udGVudExlbmd0aCArICcgZXhjZWVkZWQnLFxuICAgICAgICAgICAgQXhpb3NFcnJvci5FUlJfQkFEX1JFU1BPTlNFLFxuICAgICAgICAgICAgY29uZmlnLFxuICAgICAgICAgICAgcmVxdWVzdFxuICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgIWlzU3RyZWFtUmVzcG9uc2UgJiYgdW5zdWJzY3JpYmUgJiYgdW5zdWJzY3JpYmUoKTtcblxuICAgICAgcmV0dXJuIGF3YWl0IG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgc2V0dGxlKHJlc29sdmUsIHJlamVjdCwge1xuICAgICAgICAgIGRhdGE6IHJlc3BvbnNlRGF0YSxcbiAgICAgICAgICBoZWFkZXJzOiBBeGlvc0hlYWRlcnMuZnJvbShyZXNwb25zZS5oZWFkZXJzKSxcbiAgICAgICAgICBzdGF0dXM6IHJlc3BvbnNlLnN0YXR1cyxcbiAgICAgICAgICBzdGF0dXNUZXh0OiByZXNwb25zZS5zdGF0dXNUZXh0LFxuICAgICAgICAgIGNvbmZpZyxcbiAgICAgICAgICByZXF1ZXN0LFxuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgdW5zdWJzY3JpYmUgJiYgdW5zdWJzY3JpYmUoKTtcblxuICAgICAgLy8gU2FmYXJpIGNhbiBzdXJmYWNlIGZldGNoIGFib3J0cyBhcyBhIERPTUV4Y2VwdGlvbi1saWtlIG9iamVjdCB3aG9zZVxuICAgICAgLy8gYnJhbmRlZCBnZXR0ZXJzIHRocm93LiBQcmVmZXIgb3VyIGNvbXBvc2VkIHNpZ25hbCByZWFzb24gYmVmb3JlIHJlYWRpbmdcbiAgICAgIC8vIHRoZSBjYXVnaHQgZXJyb3IsIHByZXNlcnZpbmcgdGltZW91dCB2cyBjYW5jZWxsYXRpb24gc2VtYW50aWNzLlxuICAgICAgaWYgKGNvbXBvc2VkU2lnbmFsICYmIGNvbXBvc2VkU2lnbmFsLmFib3J0ZWQgJiYgY29tcG9zZWRTaWduYWwucmVhc29uIGluc3RhbmNlb2YgQXhpb3NFcnJvcikge1xuICAgICAgICBjb25zdCBjYW5jZWxlZEVycm9yID0gY29tcG9zZWRTaWduYWwucmVhc29uO1xuICAgICAgICBjYW5jZWxlZEVycm9yLmNvbmZpZyA9IGNvbmZpZztcbiAgICAgICAgcmVxdWVzdCAmJiAoY2FuY2VsZWRFcnJvci5yZXF1ZXN0ID0gcmVxdWVzdCk7XG4gICAgICAgIGVyciAhPT0gY2FuY2VsZWRFcnJvciAmJiAoY2FuY2VsZWRFcnJvci5jYXVzZSA9IGVycik7XG4gICAgICAgIHRocm93IGNhbmNlbGVkRXJyb3I7XG4gICAgICB9XG5cbiAgICAgIGlmIChlcnIgJiYgZXJyLm5hbWUgPT09ICdUeXBlRXJyb3InICYmIC9Mb2FkIGZhaWxlZHxmZXRjaC9pLnRlc3QoZXJyLm1lc3NhZ2UpKSB7XG4gICAgICAgIHRocm93IE9iamVjdC5hc3NpZ24oXG4gICAgICAgICAgbmV3IEF4aW9zRXJyb3IoXG4gICAgICAgICAgICAnTmV0d29yayBFcnJvcicsXG4gICAgICAgICAgICBBeGlvc0Vycm9yLkVSUl9ORVRXT1JLLFxuICAgICAgICAgICAgY29uZmlnLFxuICAgICAgICAgICAgcmVxdWVzdCxcbiAgICAgICAgICAgIGVyciAmJiBlcnIucmVzcG9uc2VcbiAgICAgICAgICApLFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIGNhdXNlOiBlcnIuY2F1c2UgfHwgZXJyLFxuICAgICAgICAgIH1cbiAgICAgICAgKTtcbiAgICAgIH1cblxuICAgICAgdGhyb3cgQXhpb3NFcnJvci5mcm9tKGVyciwgZXJyICYmIGVyci5jb2RlLCBjb25maWcsIHJlcXVlc3QsIGVyciAmJiBlcnIucmVzcG9uc2UpO1xuICAgIH1cbiAgfTtcbn07XG5cbmNvbnN0IHNlZWRDYWNoZSA9IG5ldyBNYXAoKTtcblxuZXhwb3J0IGNvbnN0IGdldEZldGNoID0gKGNvbmZpZykgPT4ge1xuICBsZXQgZW52ID0gKGNvbmZpZyAmJiBjb25maWcuZW52KSB8fCB7fTtcbiAgY29uc3QgeyBmZXRjaCwgUmVxdWVzdCwgUmVzcG9uc2UgfSA9IGVudjtcbiAgY29uc3Qgc2VlZHMgPSBbUmVxdWVzdCwgUmVzcG9uc2UsIGZldGNoXTtcblxuICBsZXQgbGVuID0gc2VlZHMubGVuZ3RoLFxuICAgIGkgPSBsZW4sXG4gICAgc2VlZCxcbiAgICB0YXJnZXQsXG4gICAgbWFwID0gc2VlZENhY2hlO1xuXG4gIHdoaWxlIChpLS0pIHtcbiAgICBzZWVkID0gc2VlZHNbaV07XG4gICAgdGFyZ2V0ID0gbWFwLmdldChzZWVkKTtcblxuICAgIHRhcmdldCA9PT0gdW5kZWZpbmVkICYmIG1hcC5zZXQoc2VlZCwgKHRhcmdldCA9IGkgPyBuZXcgTWFwKCkgOiBmYWN0b3J5KGVudikpKTtcblxuICAgIG1hcCA9IHRhcmdldDtcbiAgfVxuXG4gIHJldHVybiB0YXJnZXQ7XG59O1xuXG5jb25zdCBhZGFwdGVyID0gZ2V0RmV0Y2goKTtcblxuZXhwb3J0IGRlZmF1bHQgYWRhcHRlcjtcbiIsImltcG9ydCB1dGlscyBmcm9tICcuLi91dGlscy5qcyc7XG5pbXBvcnQgaHR0cEFkYXB0ZXIgZnJvbSAnLi9odHRwLmpzJztcbmltcG9ydCB4aHJBZGFwdGVyIGZyb20gJy4veGhyLmpzJztcbmltcG9ydCAqIGFzIGZldGNoQWRhcHRlciBmcm9tICcuL2ZldGNoLmpzJztcbmltcG9ydCBBeGlvc0Vycm9yIGZyb20gJy4uL2NvcmUvQXhpb3NFcnJvci5qcyc7XG5cbi8qKlxuICogS25vd24gYWRhcHRlcnMgbWFwcGluZy5cbiAqIFByb3ZpZGVzIGVudmlyb25tZW50LXNwZWNpZmljIGFkYXB0ZXJzIGZvciBBeGlvczpcbiAqIC0gYGh0dHBgIGZvciBOb2RlLmpzXG4gKiAtIGB4aHJgIGZvciBicm93c2Vyc1xuICogLSBgZmV0Y2hgIGZvciBmZXRjaCBBUEktYmFzZWQgcmVxdWVzdHNcbiAqXG4gKiBAdHlwZSB7T2JqZWN0PHN0cmluZywgRnVuY3Rpb258T2JqZWN0Pn1cbiAqL1xuY29uc3Qga25vd25BZGFwdGVycyA9IHtcbiAgaHR0cDogaHR0cEFkYXB0ZXIsXG4gIHhocjogeGhyQWRhcHRlcixcbiAgZmV0Y2g6IHtcbiAgICBnZXQ6IGZldGNoQWRhcHRlci5nZXRGZXRjaCxcbiAgfSxcbn07XG5cbi8vIEFzc2lnbiBhZGFwdGVyIG5hbWVzIGZvciBlYXNpZXIgZGVidWdnaW5nIGFuZCBpZGVudGlmaWNhdGlvblxudXRpbHMuZm9yRWFjaChrbm93bkFkYXB0ZXJzLCAoZm4sIHZhbHVlKSA9PiB7XG4gIGlmIChmbikge1xuICAgIHRyeSB7XG4gICAgICAvLyBOdWxsLXByb3RvIGRlc2NyaXB0b3JzIHNvIGEgcG9sbHV0ZWQgT2JqZWN0LnByb3RvdHlwZS5nZXQgY2Fubm90IHR1cm5cbiAgICAgIC8vIHRoZXNlIGRhdGEgZGVzY3JpcHRvcnMgaW50byBhY2Nlc3NvciBkZXNjcmlwdG9ycyBvbiB0aGUgd2F5IGluLlxuICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGZuLCAnbmFtZScsIHsgX19wcm90b19fOiBudWxsLCB2YWx1ZSB9KTtcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tZW1wdHlcbiAgICB9XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGZuLCAnYWRhcHRlck5hbWUnLCB7IF9fcHJvdG9fXzogbnVsbCwgdmFsdWUgfSk7XG4gIH1cbn0pO1xuXG4vKipcbiAqIFJlbmRlciBhIHJlamVjdGlvbiByZWFzb24gc3RyaW5nIGZvciB1bmtub3duIG9yIHVuc3VwcG9ydGVkIGFkYXB0ZXJzXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IHJlYXNvblxuICogQHJldHVybnMge3N0cmluZ31cbiAqL1xuY29uc3QgcmVuZGVyUmVhc29uID0gKHJlYXNvbikgPT4gYC0gJHtyZWFzb259YDtcblxuLyoqXG4gKiBDaGVjayBpZiB0aGUgYWRhcHRlciBpcyByZXNvbHZlZCAoZnVuY3Rpb24sIG51bGwsIG9yIGZhbHNlKVxuICpcbiAqIEBwYXJhbSB7RnVuY3Rpb258bnVsbHxmYWxzZX0gYWRhcHRlclxuICogQHJldHVybnMge2Jvb2xlYW59XG4gKi9cbmNvbnN0IGlzUmVzb2x2ZWRIYW5kbGUgPSAoYWRhcHRlcikgPT5cbiAgdXRpbHMuaXNGdW5jdGlvbihhZGFwdGVyKSB8fCBhZGFwdGVyID09PSBudWxsIHx8IGFkYXB0ZXIgPT09IGZhbHNlO1xuXG4vKipcbiAqIEdldCB0aGUgZmlyc3Qgc3VpdGFibGUgYWRhcHRlciBmcm9tIHRoZSBwcm92aWRlZCBsaXN0LlxuICogVHJpZXMgZWFjaCBhZGFwdGVyIGluIG9yZGVyIHVudGlsIGEgc3VwcG9ydGVkIG9uZSBpcyBmb3VuZC5cbiAqIFRocm93cyBhbiBBeGlvc0Vycm9yIGlmIG5vIGFkYXB0ZXIgaXMgc3VpdGFibGUuXG4gKlxuICogQHBhcmFtIHtBcnJheTxzdHJpbmd8RnVuY3Rpb24+fHN0cmluZ3xGdW5jdGlvbn0gYWRhcHRlcnMgLSBBZGFwdGVyKHMpIGJ5IG5hbWUgb3IgZnVuY3Rpb24uXG4gKiBAcGFyYW0ge09iamVjdH0gY29uZmlnIC0gQXhpb3MgcmVxdWVzdCBjb25maWd1cmF0aW9uXG4gKiBAdGhyb3dzIHtBeGlvc0Vycm9yfSBJZiBubyBzdWl0YWJsZSBhZGFwdGVyIGlzIGF2YWlsYWJsZVxuICogQHJldHVybnMge0Z1bmN0aW9ufSBUaGUgcmVzb2x2ZWQgYWRhcHRlciBmdW5jdGlvblxuICovXG5mdW5jdGlvbiBnZXRBZGFwdGVyKGFkYXB0ZXJzLCBjb25maWcpIHtcbiAgYWRhcHRlcnMgPSB1dGlscy5pc0FycmF5KGFkYXB0ZXJzKSA/IGFkYXB0ZXJzIDogW2FkYXB0ZXJzXTtcblxuICBjb25zdCB7IGxlbmd0aCB9ID0gYWRhcHRlcnM7XG4gIGxldCBuYW1lT3JBZGFwdGVyO1xuICBsZXQgYWRhcHRlcjtcblxuICBjb25zdCByZWplY3RlZFJlYXNvbnMgPSB7fTtcblxuICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgbmFtZU9yQWRhcHRlciA9IGFkYXB0ZXJzW2ldO1xuICAgIGxldCBpZDtcblxuICAgIGFkYXB0ZXIgPSBuYW1lT3JBZGFwdGVyO1xuXG4gICAgaWYgKCFpc1Jlc29sdmVkSGFuZGxlKG5hbWVPckFkYXB0ZXIpKSB7XG4gICAgICBhZGFwdGVyID0ga25vd25BZGFwdGVyc1soaWQgPSBTdHJpbmcobmFtZU9yQWRhcHRlcikpLnRvTG93ZXJDYXNlKCldO1xuXG4gICAgICBpZiAoYWRhcHRlciA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHRocm93IG5ldyBBeGlvc0Vycm9yKGBVbmtub3duIGFkYXB0ZXIgJyR7aWR9J2ApO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChhZGFwdGVyICYmICh1dGlscy5pc0Z1bmN0aW9uKGFkYXB0ZXIpIHx8IChhZGFwdGVyID0gYWRhcHRlci5nZXQoY29uZmlnKSkpKSB7XG4gICAgICBicmVhaztcbiAgICB9XG5cbiAgICByZWplY3RlZFJlYXNvbnNbaWQgfHwgJyMnICsgaV0gPSBhZGFwdGVyO1xuICB9XG5cbiAgaWYgKCFhZGFwdGVyKSB7XG4gICAgY29uc3QgcmVhc29ucyA9IE9iamVjdC5lbnRyaWVzKHJlamVjdGVkUmVhc29ucykubWFwKFxuICAgICAgKFtpZCwgc3RhdGVdKSA9PlxuICAgICAgICBgYWRhcHRlciAke2lkfSBgICtcbiAgICAgICAgKHN0YXRlID09PSBmYWxzZSA/ICdpcyBub3Qgc3VwcG9ydGVkIGJ5IHRoZSBlbnZpcm9ubWVudCcgOiAnaXMgbm90IGF2YWlsYWJsZSBpbiB0aGUgYnVpbGQnKVxuICAgICk7XG5cbiAgICBsZXQgcyA9IGxlbmd0aFxuICAgICAgPyByZWFzb25zLmxlbmd0aCA+IDFcbiAgICAgICAgPyAnc2luY2UgOlxcbicgKyByZWFzb25zLm1hcChyZW5kZXJSZWFzb24pLmpvaW4oJ1xcbicpXG4gICAgICAgIDogJyAnICsgcmVuZGVyUmVhc29uKHJlYXNvbnNbMF0pXG4gICAgICA6ICdhcyBubyBhZGFwdGVyIHNwZWNpZmllZCc7XG5cbiAgICB0aHJvdyBuZXcgQXhpb3NFcnJvcihcbiAgICAgIGBUaGVyZSBpcyBubyBzdWl0YWJsZSBhZGFwdGVyIHRvIGRpc3BhdGNoIHRoZSByZXF1ZXN0IGAgKyBzLFxuICAgICAgJ0VSUl9OT1RfU1VQUE9SVCdcbiAgICApO1xuICB9XG5cbiAgcmV0dXJuIGFkYXB0ZXI7XG59XG5cbi8qKlxuICogRXhwb3J0cyBBeGlvcyBhZGFwdGVycyBhbmQgdXRpbGl0eSB0byByZXNvbHZlIGFuIGFkYXB0ZXJcbiAqL1xuZXhwb3J0IGRlZmF1bHQge1xuICAvKipcbiAgICogUmVzb2x2ZSBhbiBhZGFwdGVyIGZyb20gYSBsaXN0IG9mIGFkYXB0ZXIgbmFtZXMgb3IgZnVuY3Rpb25zLlxuICAgKiBAdHlwZSB7RnVuY3Rpb259XG4gICAqL1xuICBnZXRBZGFwdGVyLFxuXG4gIC8qKlxuICAgKiBFeHBvc2VzIGFsbCBrbm93biBhZGFwdGVyc1xuICAgKiBAdHlwZSB7T2JqZWN0PHN0cmluZywgRnVuY3Rpb258T2JqZWN0Pn1cbiAgICovXG4gIGFkYXB0ZXJzOiBrbm93bkFkYXB0ZXJzLFxufTtcbiIsIid1c2Ugc3RyaWN0JztcblxuaW1wb3J0IHRyYW5zZm9ybURhdGEgZnJvbSAnLi90cmFuc2Zvcm1EYXRhLmpzJztcbmltcG9ydCBpc0NhbmNlbCBmcm9tICcuLi9jYW5jZWwvaXNDYW5jZWwuanMnO1xuaW1wb3J0IGRlZmF1bHRzIGZyb20gJy4uL2RlZmF1bHRzL2luZGV4LmpzJztcbmltcG9ydCBDYW5jZWxlZEVycm9yIGZyb20gJy4uL2NhbmNlbC9DYW5jZWxlZEVycm9yLmpzJztcbmltcG9ydCBBeGlvc0hlYWRlcnMgZnJvbSAnLi4vY29yZS9BeGlvc0hlYWRlcnMuanMnO1xuaW1wb3J0IGFkYXB0ZXJzIGZyb20gJy4uL2FkYXB0ZXJzL2FkYXB0ZXJzLmpzJztcblxuLyoqXG4gKiBUaHJvd3MgYSBgQ2FuY2VsZWRFcnJvcmAgaWYgY2FuY2VsbGF0aW9uIGhhcyBiZWVuIHJlcXVlc3RlZC5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gY29uZmlnIFRoZSBjb25maWcgdGhhdCBpcyB0byBiZSB1c2VkIGZvciB0aGUgcmVxdWVzdFxuICpcbiAqIEByZXR1cm5zIHt2b2lkfVxuICovXG5mdW5jdGlvbiB0aHJvd0lmQ2FuY2VsbGF0aW9uUmVxdWVzdGVkKGNvbmZpZykge1xuICBpZiAoY29uZmlnLmNhbmNlbFRva2VuKSB7XG4gICAgY29uZmlnLmNhbmNlbFRva2VuLnRocm93SWZSZXF1ZXN0ZWQoKTtcbiAgfVxuXG4gIGlmIChjb25maWcuc2lnbmFsICYmIGNvbmZpZy5zaWduYWwuYWJvcnRlZCkge1xuICAgIHRocm93IG5ldyBDYW5jZWxlZEVycm9yKG51bGwsIGNvbmZpZyk7XG4gIH1cbn1cblxuLyoqXG4gKiBEaXNwYXRjaCBhIHJlcXVlc3QgdG8gdGhlIHNlcnZlciB1c2luZyB0aGUgY29uZmlndXJlZCBhZGFwdGVyLlxuICpcbiAqIEBwYXJhbSB7b2JqZWN0fSBjb25maWcgVGhlIGNvbmZpZyB0aGF0IGlzIHRvIGJlIHVzZWQgZm9yIHRoZSByZXF1ZXN0XG4gKlxuICogQHJldHVybnMge1Byb21pc2V9IFRoZSBQcm9taXNlIHRvIGJlIGZ1bGZpbGxlZFxuICovXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBkaXNwYXRjaFJlcXVlc3QoY29uZmlnKSB7XG4gIHRocm93SWZDYW5jZWxsYXRpb25SZXF1ZXN0ZWQoY29uZmlnKTtcblxuICBjb25maWcuaGVhZGVycyA9IEF4aW9zSGVhZGVycy5mcm9tKGNvbmZpZy5oZWFkZXJzKTtcblxuICAvLyBUcmFuc2Zvcm0gcmVxdWVzdCBkYXRhXG4gIGNvbmZpZy5kYXRhID0gdHJhbnNmb3JtRGF0YS5jYWxsKGNvbmZpZywgY29uZmlnLnRyYW5zZm9ybVJlcXVlc3QpO1xuXG4gIGlmIChbJ3Bvc3QnLCAncHV0JywgJ3BhdGNoJ10uaW5kZXhPZihjb25maWcubWV0aG9kKSAhPT0gLTEpIHtcbiAgICBjb25maWcuaGVhZGVycy5zZXRDb250ZW50VHlwZSgnYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkJywgZmFsc2UpO1xuICB9XG5cbiAgY29uc3QgYWRhcHRlciA9IGFkYXB0ZXJzLmdldEFkYXB0ZXIoY29uZmlnLmFkYXB0ZXIgfHwgZGVmYXVsdHMuYWRhcHRlciwgY29uZmlnKTtcblxuICByZXR1cm4gYWRhcHRlcihjb25maWcpLnRoZW4oXG4gICAgZnVuY3Rpb24gb25BZGFwdGVyUmVzb2x1dGlvbihyZXNwb25zZSkge1xuICAgICAgdGhyb3dJZkNhbmNlbGxhdGlvblJlcXVlc3RlZChjb25maWcpO1xuXG4gICAgICAvLyBFeHBvc2UgdGhlIGN1cnJlbnQgcmVzcG9uc2Ugb24gY29uZmlnIHNvIHRoYXQgdHJhbnNmb3JtUmVzcG9uc2UgY2FuXG4gICAgICAvLyBhdHRhY2ggaXQgdG8gYW55IEF4aW9zRXJyb3IgaXQgdGhyb3dzIChlLmcuIG9uIEpTT04gcGFyc2UgZmFpbHVyZSkuXG4gICAgICAvLyBXZSBjbGVhbiBpdCB1cCBhZnRlcndhcmRzIHRvIGF2b2lkIHBvbGx1dGluZyB0aGUgY29uZmlnIG9iamVjdC5cbiAgICAgIGNvbmZpZy5yZXNwb25zZSA9IHJlc3BvbnNlO1xuICAgICAgdHJ5IHtcbiAgICAgICAgcmVzcG9uc2UuZGF0YSA9IHRyYW5zZm9ybURhdGEuY2FsbChjb25maWcsIGNvbmZpZy50cmFuc2Zvcm1SZXNwb25zZSwgcmVzcG9uc2UpO1xuICAgICAgfSBmaW5hbGx5IHtcbiAgICAgICAgZGVsZXRlIGNvbmZpZy5yZXNwb25zZTtcbiAgICAgIH1cblxuICAgICAgcmVzcG9uc2UuaGVhZGVycyA9IEF4aW9zSGVhZGVycy5mcm9tKHJlc3BvbnNlLmhlYWRlcnMpO1xuXG4gICAgICByZXR1cm4gcmVzcG9uc2U7XG4gICAgfSxcbiAgICBmdW5jdGlvbiBvbkFkYXB0ZXJSZWplY3Rpb24ocmVhc29uKSB7XG4gICAgICBpZiAoIWlzQ2FuY2VsKHJlYXNvbikpIHtcbiAgICAgICAgdGhyb3dJZkNhbmNlbGxhdGlvblJlcXVlc3RlZChjb25maWcpO1xuXG4gICAgICAgIC8vIFRyYW5zZm9ybSByZXNwb25zZSBkYXRhXG4gICAgICAgIGlmIChyZWFzb24gJiYgcmVhc29uLnJlc3BvbnNlKSB7XG4gICAgICAgICAgY29uZmlnLnJlc3BvbnNlID0gcmVhc29uLnJlc3BvbnNlO1xuICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICByZWFzb24ucmVzcG9uc2UuZGF0YSA9IHRyYW5zZm9ybURhdGEuY2FsbChcbiAgICAgICAgICAgICAgY29uZmlnLFxuICAgICAgICAgICAgICBjb25maWcudHJhbnNmb3JtUmVzcG9uc2UsXG4gICAgICAgICAgICAgIHJlYXNvbi5yZXNwb25zZVxuICAgICAgICAgICAgKTtcbiAgICAgICAgICB9IGZpbmFsbHkge1xuICAgICAgICAgICAgZGVsZXRlIGNvbmZpZy5yZXNwb25zZTtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmVhc29uLnJlc3BvbnNlLmhlYWRlcnMgPSBBeGlvc0hlYWRlcnMuZnJvbShyZWFzb24ucmVzcG9uc2UuaGVhZGVycyk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KHJlYXNvbik7XG4gICAgfVxuICApO1xufVxuIiwiJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQgeyBWRVJTSU9OIH0gZnJvbSAnLi4vZW52L2RhdGEuanMnO1xuaW1wb3J0IEF4aW9zRXJyb3IgZnJvbSAnLi4vY29yZS9BeGlvc0Vycm9yLmpzJztcblxuY29uc3QgdmFsaWRhdG9ycyA9IHt9O1xuXG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgZnVuYy1uYW1lc1xuWydvYmplY3QnLCAnYm9vbGVhbicsICdudW1iZXInLCAnZnVuY3Rpb24nLCAnc3RyaW5nJywgJ3N5bWJvbCddLmZvckVhY2goKHR5cGUsIGkpID0+IHtcbiAgdmFsaWRhdG9yc1t0eXBlXSA9IGZ1bmN0aW9uIHZhbGlkYXRvcih0aGluZykge1xuICAgIHJldHVybiB0eXBlb2YgdGhpbmcgPT09IHR5cGUgfHwgJ2EnICsgKGkgPCAxID8gJ24gJyA6ICcgJykgKyB0eXBlO1xuICB9O1xufSk7XG5cbmNvbnN0IGRlcHJlY2F0ZWRXYXJuaW5ncyA9IHt9O1xuXG4vKipcbiAqIFRyYW5zaXRpb25hbCBvcHRpb24gdmFsaWRhdG9yXG4gKlxuICogQHBhcmFtIHtmdW5jdGlvbnxib29sZWFuP30gdmFsaWRhdG9yIC0gc2V0IHRvIGZhbHNlIGlmIHRoZSB0cmFuc2l0aW9uYWwgb3B0aW9uIGhhcyBiZWVuIHJlbW92ZWRcbiAqIEBwYXJhbSB7c3RyaW5nP30gdmVyc2lvbiAtIGRlcHJlY2F0ZWQgdmVyc2lvbiAvIHJlbW92ZWQgc2luY2UgdmVyc2lvblxuICogQHBhcmFtIHtzdHJpbmc/fSBtZXNzYWdlIC0gc29tZSBtZXNzYWdlIHdpdGggYWRkaXRpb25hbCBpbmZvXG4gKlxuICogQHJldHVybnMge2Z1bmN0aW9ufVxuICovXG52YWxpZGF0b3JzLnRyYW5zaXRpb25hbCA9IGZ1bmN0aW9uIHRyYW5zaXRpb25hbCh2YWxpZGF0b3IsIHZlcnNpb24sIG1lc3NhZ2UpIHtcbiAgZnVuY3Rpb24gZm9ybWF0TWVzc2FnZShvcHQsIGRlc2MpIHtcbiAgICByZXR1cm4gKFxuICAgICAgJ1tBeGlvcyB2JyArXG4gICAgICBWRVJTSU9OICtcbiAgICAgIFwiXSBUcmFuc2l0aW9uYWwgb3B0aW9uICdcIiArXG4gICAgICBvcHQgK1xuICAgICAgXCInXCIgK1xuICAgICAgZGVzYyArXG4gICAgICAobWVzc2FnZSA/ICcuICcgKyBtZXNzYWdlIDogJycpXG4gICAgKTtcbiAgfVxuXG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBmdW5jLW5hbWVzXG4gIHJldHVybiAodmFsdWUsIG9wdCwgb3B0cykgPT4ge1xuICAgIGlmICh2YWxpZGF0b3IgPT09IGZhbHNlKSB7XG4gICAgICB0aHJvdyBuZXcgQXhpb3NFcnJvcihcbiAgICAgICAgZm9ybWF0TWVzc2FnZShvcHQsICcgaGFzIGJlZW4gcmVtb3ZlZCcgKyAodmVyc2lvbiA/ICcgaW4gJyArIHZlcnNpb24gOiAnJykpLFxuICAgICAgICBBeGlvc0Vycm9yLkVSUl9ERVBSRUNBVEVEXG4gICAgICApO1xuICAgIH1cblxuICAgIGlmICh2ZXJzaW9uICYmICFkZXByZWNhdGVkV2FybmluZ3Nbb3B0XSkge1xuICAgICAgZGVwcmVjYXRlZFdhcm5pbmdzW29wdF0gPSB0cnVlO1xuICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLWNvbnNvbGVcbiAgICAgIGNvbnNvbGUud2FybihcbiAgICAgICAgZm9ybWF0TWVzc2FnZShcbiAgICAgICAgICBvcHQsXG4gICAgICAgICAgJyBoYXMgYmVlbiBkZXByZWNhdGVkIHNpbmNlIHYnICsgdmVyc2lvbiArICcgYW5kIHdpbGwgYmUgcmVtb3ZlZCBpbiB0aGUgbmVhciBmdXR1cmUnXG4gICAgICAgIClcbiAgICAgICk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHZhbGlkYXRvciA/IHZhbGlkYXRvcih2YWx1ZSwgb3B0LCBvcHRzKSA6IHRydWU7XG4gIH07XG59O1xuXG52YWxpZGF0b3JzLnNwZWxsaW5nID0gZnVuY3Rpb24gc3BlbGxpbmcoY29ycmVjdFNwZWxsaW5nKSB7XG4gIHJldHVybiAodmFsdWUsIG9wdCkgPT4ge1xuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1jb25zb2xlXG4gICAgY29uc29sZS53YXJuKGAke29wdH0gaXMgbGlrZWx5IGEgbWlzc3BlbGxpbmcgb2YgJHtjb3JyZWN0U3BlbGxpbmd9YCk7XG4gICAgcmV0dXJuIHRydWU7XG4gIH07XG59O1xuXG4vKipcbiAqIEFzc2VydCBvYmplY3QncyBwcm9wZXJ0aWVzIHR5cGVcbiAqXG4gKiBAcGFyYW0ge29iamVjdH0gb3B0aW9uc1xuICogQHBhcmFtIHtvYmplY3R9IHNjaGVtYVxuICogQHBhcmFtIHtib29sZWFuP30gYWxsb3dVbmtub3duXG4gKlxuICogQHJldHVybnMge29iamVjdH1cbiAqL1xuXG5mdW5jdGlvbiBhc3NlcnRPcHRpb25zKG9wdGlvbnMsIHNjaGVtYSwgYWxsb3dVbmtub3duKSB7XG4gIGlmICh0eXBlb2Ygb3B0aW9ucyAhPT0gJ29iamVjdCcpIHtcbiAgICB0aHJvdyBuZXcgQXhpb3NFcnJvcignb3B0aW9ucyBtdXN0IGJlIGFuIG9iamVjdCcsIEF4aW9zRXJyb3IuRVJSX0JBRF9PUFRJT05fVkFMVUUpO1xuICB9XG4gIGNvbnN0IGtleXMgPSBPYmplY3Qua2V5cyhvcHRpb25zKTtcbiAgbGV0IGkgPSBrZXlzLmxlbmd0aDtcbiAgd2hpbGUgKGktLSA+IDApIHtcbiAgICBjb25zdCBvcHQgPSBrZXlzW2ldO1xuICAgIC8vIFVzZSBoYXNPd25Qcm9wZXJ0eSBzbyBhIHBvbGx1dGVkIE9iamVjdC5wcm90b3R5cGUuPG9wdD4gY2Fubm90IHN1cHBseVxuICAgIC8vIGEgbm9uLWZ1bmN0aW9uIHZhbGlkYXRvciBhbmQgY2F1c2UgYSBUeXBlRXJyb3IuXG4gICAgY29uc3QgdmFsaWRhdG9yID0gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHNjaGVtYSwgb3B0KSA/IHNjaGVtYVtvcHRdIDogdW5kZWZpbmVkO1xuICAgIGlmICh2YWxpZGF0b3IpIHtcbiAgICAgIGNvbnN0IHZhbHVlID0gb3B0aW9uc1tvcHRdO1xuICAgICAgY29uc3QgcmVzdWx0ID0gdmFsdWUgPT09IHVuZGVmaW5lZCB8fCB2YWxpZGF0b3IodmFsdWUsIG9wdCwgb3B0aW9ucyk7XG4gICAgICBpZiAocmVzdWx0ICE9PSB0cnVlKSB7XG4gICAgICAgIHRocm93IG5ldyBBeGlvc0Vycm9yKFxuICAgICAgICAgICdvcHRpb24gJyArIG9wdCArICcgbXVzdCBiZSAnICsgcmVzdWx0LFxuICAgICAgICAgIEF4aW9zRXJyb3IuRVJSX0JBRF9PUFRJT05fVkFMVUVcbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICAgIGNvbnRpbnVlO1xuICAgIH1cbiAgICBpZiAoYWxsb3dVbmtub3duICE9PSB0cnVlKSB7XG4gICAgICB0aHJvdyBuZXcgQXhpb3NFcnJvcignVW5rbm93biBvcHRpb24gJyArIG9wdCwgQXhpb3NFcnJvci5FUlJfQkFEX09QVElPTik7XG4gICAgfVxuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgYXNzZXJ0T3B0aW9ucyxcbiAgdmFsaWRhdG9ycyxcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbmltcG9ydCB1dGlscyBmcm9tICcuLi91dGlscy5qcyc7XG5pbXBvcnQgYnVpbGRVUkwgZnJvbSAnLi4vaGVscGVycy9idWlsZFVSTC5qcyc7XG5pbXBvcnQgSW50ZXJjZXB0b3JNYW5hZ2VyIGZyb20gJy4vSW50ZXJjZXB0b3JNYW5hZ2VyLmpzJztcbmltcG9ydCBkaXNwYXRjaFJlcXVlc3QgZnJvbSAnLi9kaXNwYXRjaFJlcXVlc3QuanMnO1xuaW1wb3J0IG1lcmdlQ29uZmlnIGZyb20gJy4vbWVyZ2VDb25maWcuanMnO1xuaW1wb3J0IGJ1aWxkRnVsbFBhdGggZnJvbSAnLi9idWlsZEZ1bGxQYXRoLmpzJztcbmltcG9ydCB2YWxpZGF0b3IgZnJvbSAnLi4vaGVscGVycy92YWxpZGF0b3IuanMnO1xuaW1wb3J0IEF4aW9zSGVhZGVycyBmcm9tICcuL0F4aW9zSGVhZGVycy5qcyc7XG5pbXBvcnQgdHJhbnNpdGlvbmFsRGVmYXVsdHMgZnJvbSAnLi4vZGVmYXVsdHMvdHJhbnNpdGlvbmFsLmpzJztcblxuY29uc3QgdmFsaWRhdG9ycyA9IHZhbGlkYXRvci52YWxpZGF0b3JzO1xuXG4vKipcbiAqIENyZWF0ZSBhIG5ldyBpbnN0YW5jZSBvZiBBeGlvc1xuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBpbnN0YW5jZUNvbmZpZyBUaGUgZGVmYXVsdCBjb25maWcgZm9yIHRoZSBpbnN0YW5jZVxuICpcbiAqIEByZXR1cm4ge0F4aW9zfSBBIG5ldyBpbnN0YW5jZSBvZiBBeGlvc1xuICovXG5jbGFzcyBBeGlvcyB7XG4gIGNvbnN0cnVjdG9yKGluc3RhbmNlQ29uZmlnKSB7XG4gICAgdGhpcy5kZWZhdWx0cyA9IGluc3RhbmNlQ29uZmlnIHx8IHt9O1xuICAgIHRoaXMuaW50ZXJjZXB0b3JzID0ge1xuICAgICAgcmVxdWVzdDogbmV3IEludGVyY2VwdG9yTWFuYWdlcigpLFxuICAgICAgcmVzcG9uc2U6IG5ldyBJbnRlcmNlcHRvck1hbmFnZXIoKSxcbiAgICB9O1xuICB9XG5cbiAgLyoqXG4gICAqIERpc3BhdGNoIGEgcmVxdWVzdFxuICAgKlxuICAgKiBAcGFyYW0ge1N0cmluZ3xPYmplY3R9IGNvbmZpZ09yVXJsIFRoZSBjb25maWcgc3BlY2lmaWMgZm9yIHRoaXMgcmVxdWVzdCAobWVyZ2VkIHdpdGggdGhpcy5kZWZhdWx0cylcbiAgICogQHBhcmFtIHs/T2JqZWN0fSBjb25maWdcbiAgICpcbiAgICogQHJldHVybnMge1Byb21pc2V9IFRoZSBQcm9taXNlIHRvIGJlIGZ1bGZpbGxlZFxuICAgKi9cbiAgYXN5bmMgcmVxdWVzdChjb25maWdPclVybCwgY29uZmlnKSB7XG4gICAgdHJ5IHtcbiAgICAgIHJldHVybiBhd2FpdCB0aGlzLl9yZXF1ZXN0KGNvbmZpZ09yVXJsLCBjb25maWcpO1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgaWYgKGVyciBpbnN0YW5jZW9mIEVycm9yKSB7XG4gICAgICAgIGxldCBkdW1teSA9IHt9O1xuXG4gICAgICAgIEVycm9yLmNhcHR1cmVTdGFja1RyYWNlID8gRXJyb3IuY2FwdHVyZVN0YWNrVHJhY2UoZHVtbXkpIDogKGR1bW15ID0gbmV3IEVycm9yKCkpO1xuXG4gICAgICAgIC8vIHNsaWNlIG9mZiB0aGUgRXJyb3I6IC4uLiBsaW5lXG4gICAgICAgIGNvbnN0IHN0YWNrID0gKCgpID0+IHtcbiAgICAgICAgICBpZiAoIWR1bW15LnN0YWNrKSB7XG4gICAgICAgICAgICByZXR1cm4gJyc7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgY29uc3QgZmlyc3ROZXdsaW5lSW5kZXggPSBkdW1teS5zdGFjay5pbmRleE9mKCdcXG4nKTtcblxuICAgICAgICAgIHJldHVybiBmaXJzdE5ld2xpbmVJbmRleCA9PT0gLTEgPyAnJyA6IGR1bW15LnN0YWNrLnNsaWNlKGZpcnN0TmV3bGluZUluZGV4ICsgMSk7XG4gICAgICAgIH0pKCk7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgaWYgKCFlcnIuc3RhY2spIHtcbiAgICAgICAgICAgIGVyci5zdGFjayA9IHN0YWNrO1xuICAgICAgICAgICAgLy8gbWF0Y2ggd2l0aG91dCB0aGUgMiB0b3Agc3RhY2sgbGluZXNcbiAgICAgICAgICB9IGVsc2UgaWYgKHN0YWNrKSB7XG4gICAgICAgICAgICBjb25zdCBmaXJzdE5ld2xpbmVJbmRleCA9IHN0YWNrLmluZGV4T2YoJ1xcbicpO1xuICAgICAgICAgICAgY29uc3Qgc2Vjb25kTmV3bGluZUluZGV4ID1cbiAgICAgICAgICAgICAgZmlyc3ROZXdsaW5lSW5kZXggPT09IC0xID8gLTEgOiBzdGFjay5pbmRleE9mKCdcXG4nLCBmaXJzdE5ld2xpbmVJbmRleCArIDEpO1xuICAgICAgICAgICAgY29uc3Qgc3RhY2tXaXRob3V0VHdvVG9wTGluZXMgPVxuICAgICAgICAgICAgICBzZWNvbmROZXdsaW5lSW5kZXggPT09IC0xID8gJycgOiBzdGFjay5zbGljZShzZWNvbmROZXdsaW5lSW5kZXggKyAxKTtcblxuICAgICAgICAgICAgaWYgKCFTdHJpbmcoZXJyLnN0YWNrKS5lbmRzV2l0aChzdGFja1dpdGhvdXRUd29Ub3BMaW5lcykpIHtcbiAgICAgICAgICAgICAgZXJyLnN0YWNrICs9ICdcXG4nICsgc3RhY2s7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgLy8gaWdub3JlIHRoZSBjYXNlIHdoZXJlIFwic3RhY2tcIiBpcyBhbiB1bi13cml0YWJsZSBwcm9wZXJ0eVxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHRocm93IGVycjtcbiAgICB9XG4gIH1cblxuICBfcmVxdWVzdChjb25maWdPclVybCwgY29uZmlnKSB7XG4gICAgLyplc2xpbnQgbm8tcGFyYW0tcmVhc3NpZ246MCovXG4gICAgLy8gQWxsb3cgZm9yIGF4aW9zKCdleGFtcGxlL3VybCdbLCBjb25maWddKSBhIGxhIGZldGNoIEFQSVxuICAgIGlmICh0eXBlb2YgY29uZmlnT3JVcmwgPT09ICdzdHJpbmcnKSB7XG4gICAgICBjb25maWcgPSBjb25maWcgfHwge307XG4gICAgICBjb25maWcudXJsID0gY29uZmlnT3JVcmw7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbmZpZyA9IGNvbmZpZ09yVXJsIHx8IHt9O1xuICAgIH1cblxuICAgIGNvbmZpZyA9IG1lcmdlQ29uZmlnKHRoaXMuZGVmYXVsdHMsIGNvbmZpZyk7XG5cbiAgICBjb25zdCB7IHRyYW5zaXRpb25hbCwgcGFyYW1zU2VyaWFsaXplciwgaGVhZGVycyB9ID0gY29uZmlnO1xuXG4gICAgaWYgKHRyYW5zaXRpb25hbCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICB2YWxpZGF0b3IuYXNzZXJ0T3B0aW9ucyhcbiAgICAgICAgdHJhbnNpdGlvbmFsLFxuICAgICAgICB7XG4gICAgICAgICAgc2lsZW50SlNPTlBhcnNpbmc6IHZhbGlkYXRvcnMudHJhbnNpdGlvbmFsKHZhbGlkYXRvcnMuYm9vbGVhbiksXG4gICAgICAgICAgZm9yY2VkSlNPTlBhcnNpbmc6IHZhbGlkYXRvcnMudHJhbnNpdGlvbmFsKHZhbGlkYXRvcnMuYm9vbGVhbiksXG4gICAgICAgICAgY2xhcmlmeVRpbWVvdXRFcnJvcjogdmFsaWRhdG9ycy50cmFuc2l0aW9uYWwodmFsaWRhdG9ycy5ib29sZWFuKSxcbiAgICAgICAgICBsZWdhY3lJbnRlcmNlcHRvclJlcVJlc09yZGVyaW5nOiB2YWxpZGF0b3JzLnRyYW5zaXRpb25hbCh2YWxpZGF0b3JzLmJvb2xlYW4pLFxuICAgICAgICB9LFxuICAgICAgICBmYWxzZVxuICAgICAgKTtcbiAgICB9XG5cbiAgICBpZiAocGFyYW1zU2VyaWFsaXplciAhPSBudWxsKSB7XG4gICAgICBpZiAodXRpbHMuaXNGdW5jdGlvbihwYXJhbXNTZXJpYWxpemVyKSkge1xuICAgICAgICBjb25maWcucGFyYW1zU2VyaWFsaXplciA9IHtcbiAgICAgICAgICBzZXJpYWxpemU6IHBhcmFtc1NlcmlhbGl6ZXIsXG4gICAgICAgIH07XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB2YWxpZGF0b3IuYXNzZXJ0T3B0aW9ucyhcbiAgICAgICAgICBwYXJhbXNTZXJpYWxpemVyLFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIGVuY29kZTogdmFsaWRhdG9ycy5mdW5jdGlvbixcbiAgICAgICAgICAgIHNlcmlhbGl6ZTogdmFsaWRhdG9ycy5mdW5jdGlvbixcbiAgICAgICAgICB9LFxuICAgICAgICAgIHRydWVcbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBTZXQgY29uZmlnLmFsbG93QWJzb2x1dGVVcmxzXG4gICAgaWYgKGNvbmZpZy5hbGxvd0Fic29sdXRlVXJscyAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAvLyBkbyBub3RoaW5nXG4gICAgfSBlbHNlIGlmICh0aGlzLmRlZmF1bHRzLmFsbG93QWJzb2x1dGVVcmxzICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIGNvbmZpZy5hbGxvd0Fic29sdXRlVXJscyA9IHRoaXMuZGVmYXVsdHMuYWxsb3dBYnNvbHV0ZVVybHM7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbmZpZy5hbGxvd0Fic29sdXRlVXJscyA9IHRydWU7XG4gICAgfVxuXG4gICAgdmFsaWRhdG9yLmFzc2VydE9wdGlvbnMoXG4gICAgICBjb25maWcsXG4gICAgICB7XG4gICAgICAgIGJhc2VVcmw6IHZhbGlkYXRvcnMuc3BlbGxpbmcoJ2Jhc2VVUkwnKSxcbiAgICAgICAgd2l0aFhzcmZUb2tlbjogdmFsaWRhdG9ycy5zcGVsbGluZygnd2l0aFhTUkZUb2tlbicpLFxuICAgICAgfSxcbiAgICAgIHRydWVcbiAgICApO1xuXG4gICAgLy8gU2V0IGNvbmZpZy5tZXRob2RcbiAgICBjb25maWcubWV0aG9kID0gKGNvbmZpZy5tZXRob2QgfHwgdGhpcy5kZWZhdWx0cy5tZXRob2QgfHwgJ2dldCcpLnRvTG93ZXJDYXNlKCk7XG5cbiAgICAvLyBGbGF0dGVuIGhlYWRlcnNcbiAgICBsZXQgY29udGV4dEhlYWRlcnMgPSBoZWFkZXJzICYmIHV0aWxzLm1lcmdlKGhlYWRlcnMuY29tbW9uLCBoZWFkZXJzW2NvbmZpZy5tZXRob2RdKTtcblxuICAgIGhlYWRlcnMgJiZcbiAgICAgIHV0aWxzLmZvckVhY2goWydkZWxldGUnLCAnZ2V0JywgJ2hlYWQnLCAncG9zdCcsICdwdXQnLCAncGF0Y2gnLCAncXVlcnknLCAnY29tbW9uJ10sIChtZXRob2QpID0+IHtcbiAgICAgICAgZGVsZXRlIGhlYWRlcnNbbWV0aG9kXTtcbiAgICAgIH0pO1xuXG4gICAgY29uZmlnLmhlYWRlcnMgPSBBeGlvc0hlYWRlcnMuY29uY2F0KGNvbnRleHRIZWFkZXJzLCBoZWFkZXJzKTtcblxuICAgIC8vIGZpbHRlciBvdXQgc2tpcHBlZCBpbnRlcmNlcHRvcnNcbiAgICBjb25zdCByZXF1ZXN0SW50ZXJjZXB0b3JDaGFpbiA9IFtdO1xuICAgIGxldCBzeW5jaHJvbm91c1JlcXVlc3RJbnRlcmNlcHRvcnMgPSB0cnVlO1xuICAgIHRoaXMuaW50ZXJjZXB0b3JzLnJlcXVlc3QuZm9yRWFjaChmdW5jdGlvbiB1bnNoaWZ0UmVxdWVzdEludGVyY2VwdG9ycyhpbnRlcmNlcHRvcikge1xuICAgICAgaWYgKHR5cGVvZiBpbnRlcmNlcHRvci5ydW5XaGVuID09PSAnZnVuY3Rpb24nICYmIGludGVyY2VwdG9yLnJ1bldoZW4oY29uZmlnKSA9PT0gZmFsc2UpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBzeW5jaHJvbm91c1JlcXVlc3RJbnRlcmNlcHRvcnMgPSBzeW5jaHJvbm91c1JlcXVlc3RJbnRlcmNlcHRvcnMgJiYgaW50ZXJjZXB0b3Iuc3luY2hyb25vdXM7XG5cbiAgICAgIGNvbnN0IHRyYW5zaXRpb25hbCA9IGNvbmZpZy50cmFuc2l0aW9uYWwgfHwgdHJhbnNpdGlvbmFsRGVmYXVsdHM7XG4gICAgICBjb25zdCBsZWdhY3lJbnRlcmNlcHRvclJlcVJlc09yZGVyaW5nID1cbiAgICAgICAgdHJhbnNpdGlvbmFsICYmIHRyYW5zaXRpb25hbC5sZWdhY3lJbnRlcmNlcHRvclJlcVJlc09yZGVyaW5nO1xuXG4gICAgICBpZiAobGVnYWN5SW50ZXJjZXB0b3JSZXFSZXNPcmRlcmluZykge1xuICAgICAgICByZXF1ZXN0SW50ZXJjZXB0b3JDaGFpbi51bnNoaWZ0KGludGVyY2VwdG9yLmZ1bGZpbGxlZCwgaW50ZXJjZXB0b3IucmVqZWN0ZWQpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmVxdWVzdEludGVyY2VwdG9yQ2hhaW4ucHVzaChpbnRlcmNlcHRvci5mdWxmaWxsZWQsIGludGVyY2VwdG9yLnJlamVjdGVkKTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIGNvbnN0IHJlc3BvbnNlSW50ZXJjZXB0b3JDaGFpbiA9IFtdO1xuICAgIHRoaXMuaW50ZXJjZXB0b3JzLnJlc3BvbnNlLmZvckVhY2goZnVuY3Rpb24gcHVzaFJlc3BvbnNlSW50ZXJjZXB0b3JzKGludGVyY2VwdG9yKSB7XG4gICAgICByZXNwb25zZUludGVyY2VwdG9yQ2hhaW4ucHVzaChpbnRlcmNlcHRvci5mdWxmaWxsZWQsIGludGVyY2VwdG9yLnJlamVjdGVkKTtcbiAgICB9KTtcblxuICAgIGxldCBwcm9taXNlO1xuICAgIGxldCBpID0gMDtcbiAgICBsZXQgbGVuO1xuXG4gICAgaWYgKCFzeW5jaHJvbm91c1JlcXVlc3RJbnRlcmNlcHRvcnMpIHtcbiAgICAgIGNvbnN0IGNoYWluID0gW2Rpc3BhdGNoUmVxdWVzdC5iaW5kKHRoaXMpLCB1bmRlZmluZWRdO1xuICAgICAgY2hhaW4udW5zaGlmdCguLi5yZXF1ZXN0SW50ZXJjZXB0b3JDaGFpbik7XG4gICAgICBjaGFpbi5wdXNoKC4uLnJlc3BvbnNlSW50ZXJjZXB0b3JDaGFpbik7XG4gICAgICBsZW4gPSBjaGFpbi5sZW5ndGg7XG5cbiAgICAgIHByb21pc2UgPSBQcm9taXNlLnJlc29sdmUoY29uZmlnKTtcblxuICAgICAgd2hpbGUgKGkgPCBsZW4pIHtcbiAgICAgICAgcHJvbWlzZSA9IHByb21pc2UudGhlbihjaGFpbltpKytdLCBjaGFpbltpKytdKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHByb21pc2U7XG4gICAgfVxuXG4gICAgbGVuID0gcmVxdWVzdEludGVyY2VwdG9yQ2hhaW4ubGVuZ3RoO1xuXG4gICAgbGV0IG5ld0NvbmZpZyA9IGNvbmZpZztcblxuICAgIHdoaWxlIChpIDwgbGVuKSB7XG4gICAgICBjb25zdCBvbkZ1bGZpbGxlZCA9IHJlcXVlc3RJbnRlcmNlcHRvckNoYWluW2krK107XG4gICAgICBjb25zdCBvblJlamVjdGVkID0gcmVxdWVzdEludGVyY2VwdG9yQ2hhaW5baSsrXTtcbiAgICAgIHRyeSB7XG4gICAgICAgIG5ld0NvbmZpZyA9IG9uRnVsZmlsbGVkKG5ld0NvbmZpZyk7XG4gICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICBvblJlamVjdGVkLmNhbGwodGhpcywgZXJyb3IpO1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9XG5cbiAgICB0cnkge1xuICAgICAgcHJvbWlzZSA9IGRpc3BhdGNoUmVxdWVzdC5jYWxsKHRoaXMsIG5ld0NvbmZpZyk7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChlcnJvcik7XG4gICAgfVxuXG4gICAgaSA9IDA7XG4gICAgbGVuID0gcmVzcG9uc2VJbnRlcmNlcHRvckNoYWluLmxlbmd0aDtcblxuICAgIHdoaWxlIChpIDwgbGVuKSB7XG4gICAgICBwcm9taXNlID0gcHJvbWlzZS50aGVuKHJlc3BvbnNlSW50ZXJjZXB0b3JDaGFpbltpKytdLCByZXNwb25zZUludGVyY2VwdG9yQ2hhaW5baSsrXSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHByb21pc2U7XG4gIH1cblxuICBnZXRVcmkoY29uZmlnKSB7XG4gICAgY29uZmlnID0gbWVyZ2VDb25maWcodGhpcy5kZWZhdWx0cywgY29uZmlnKTtcbiAgICBjb25zdCBmdWxsUGF0aCA9IGJ1aWxkRnVsbFBhdGgoY29uZmlnLmJhc2VVUkwsIGNvbmZpZy51cmwsIGNvbmZpZy5hbGxvd0Fic29sdXRlVXJscyk7XG4gICAgcmV0dXJuIGJ1aWxkVVJMKGZ1bGxQYXRoLCBjb25maWcucGFyYW1zLCBjb25maWcucGFyYW1zU2VyaWFsaXplcik7XG4gIH1cbn1cblxuLy8gUHJvdmlkZSBhbGlhc2VzIGZvciBzdXBwb3J0ZWQgcmVxdWVzdCBtZXRob2RzXG51dGlscy5mb3JFYWNoKFsnZGVsZXRlJywgJ2dldCcsICdoZWFkJywgJ29wdGlvbnMnXSwgZnVuY3Rpb24gZm9yRWFjaE1ldGhvZE5vRGF0YShtZXRob2QpIHtcbiAgLyplc2xpbnQgZnVuYy1uYW1lczowKi9cbiAgQXhpb3MucHJvdG90eXBlW21ldGhvZF0gPSBmdW5jdGlvbiAodXJsLCBjb25maWcpIHtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0KFxuICAgICAgbWVyZ2VDb25maWcoY29uZmlnIHx8IHt9LCB7XG4gICAgICAgIG1ldGhvZCxcbiAgICAgICAgdXJsLFxuICAgICAgICBkYXRhOiAoY29uZmlnIHx8IHt9KS5kYXRhLFxuICAgICAgfSlcbiAgICApO1xuICB9O1xufSk7XG5cbnV0aWxzLmZvckVhY2goWydwb3N0JywgJ3B1dCcsICdwYXRjaCcsICdxdWVyeSddLCBmdW5jdGlvbiBmb3JFYWNoTWV0aG9kV2l0aERhdGEobWV0aG9kKSB7XG4gIGZ1bmN0aW9uIGdlbmVyYXRlSFRUUE1ldGhvZChpc0Zvcm0pIHtcbiAgICByZXR1cm4gZnVuY3Rpb24gaHR0cE1ldGhvZCh1cmwsIGRhdGEsIGNvbmZpZykge1xuICAgICAgcmV0dXJuIHRoaXMucmVxdWVzdChcbiAgICAgICAgbWVyZ2VDb25maWcoY29uZmlnIHx8IHt9LCB7XG4gICAgICAgICAgbWV0aG9kLFxuICAgICAgICAgIGhlYWRlcnM6IGlzRm9ybVxuICAgICAgICAgICAgPyB7XG4gICAgICAgICAgICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdtdWx0aXBhcnQvZm9ybS1kYXRhJyxcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgOiB7fSxcbiAgICAgICAgICB1cmwsXG4gICAgICAgICAgZGF0YSxcbiAgICAgICAgfSlcbiAgICAgICk7XG4gICAgfTtcbiAgfVxuXG4gIEF4aW9zLnByb3RvdHlwZVttZXRob2RdID0gZ2VuZXJhdGVIVFRQTWV0aG9kKCk7XG5cbiAgLy8gUVVFUlkgaXMgYSBzYWZlL2lkZW1wb3RlbnQgcmVhZCBtZXRob2Q7IG11bHRpcGFydCBmb3JtIGJvZGllcyBkb24ndCBmaXRcbiAgLy8gaXRzIHNlbWFudGljcywgc28gbm8gcXVlcnlGb3JtIHNob3J0aGFuZCBpcyBnZW5lcmF0ZWQuXG4gIGlmIChtZXRob2QgIT09ICdxdWVyeScpIHtcbiAgICBBeGlvcy5wcm90b3R5cGVbbWV0aG9kICsgJ0Zvcm0nXSA9IGdlbmVyYXRlSFRUUE1ldGhvZCh0cnVlKTtcbiAgfVxufSk7XG5cbmV4cG9ydCBkZWZhdWx0IEF4aW9zO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQgQ2FuY2VsZWRFcnJvciBmcm9tICcuL0NhbmNlbGVkRXJyb3IuanMnO1xuXG4vKipcbiAqIEEgYENhbmNlbFRva2VuYCBpcyBhbiBvYmplY3QgdGhhdCBjYW4gYmUgdXNlZCB0byByZXF1ZXN0IGNhbmNlbGxhdGlvbiBvZiBhbiBvcGVyYXRpb24uXG4gKlxuICogQHBhcmFtIHtGdW5jdGlvbn0gZXhlY3V0b3IgVGhlIGV4ZWN1dG9yIGZ1bmN0aW9uLlxuICpcbiAqIEByZXR1cm5zIHtDYW5jZWxUb2tlbn1cbiAqL1xuY2xhc3MgQ2FuY2VsVG9rZW4ge1xuICBjb25zdHJ1Y3RvcihleGVjdXRvcikge1xuICAgIGlmICh0eXBlb2YgZXhlY3V0b3IgIT09ICdmdW5jdGlvbicpIHtcbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ2V4ZWN1dG9yIG11c3QgYmUgYSBmdW5jdGlvbi4nKTtcbiAgICB9XG5cbiAgICBsZXQgcmVzb2x2ZVByb21pc2U7XG5cbiAgICB0aGlzLnByb21pc2UgPSBuZXcgUHJvbWlzZShmdW5jdGlvbiBwcm9taXNlRXhlY3V0b3IocmVzb2x2ZSkge1xuICAgICAgcmVzb2x2ZVByb21pc2UgPSByZXNvbHZlO1xuICAgIH0pO1xuXG4gICAgY29uc3QgdG9rZW4gPSB0aGlzO1xuXG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGZ1bmMtbmFtZXNcbiAgICB0aGlzLnByb21pc2UudGhlbigoY2FuY2VsKSA9PiB7XG4gICAgICBpZiAoIXRva2VuLl9saXN0ZW5lcnMpIHJldHVybjtcblxuICAgICAgbGV0IGkgPSB0b2tlbi5fbGlzdGVuZXJzLmxlbmd0aDtcblxuICAgICAgd2hpbGUgKGktLSA+IDApIHtcbiAgICAgICAgdG9rZW4uX2xpc3RlbmVyc1tpXShjYW5jZWwpO1xuICAgICAgfVxuICAgICAgdG9rZW4uX2xpc3RlbmVycyA9IG51bGw7XG4gICAgfSk7XG5cbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgZnVuYy1uYW1lc1xuICAgIHRoaXMucHJvbWlzZS50aGVuID0gKG9uZnVsZmlsbGVkKSA9PiB7XG4gICAgICBsZXQgX3Jlc29sdmU7XG4gICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgZnVuYy1uYW1lc1xuICAgICAgY29uc3QgcHJvbWlzZSA9IG5ldyBQcm9taXNlKChyZXNvbHZlKSA9PiB7XG4gICAgICAgIHRva2VuLnN1YnNjcmliZShyZXNvbHZlKTtcbiAgICAgICAgX3Jlc29sdmUgPSByZXNvbHZlO1xuICAgICAgfSkudGhlbihvbmZ1bGZpbGxlZCk7XG5cbiAgICAgIHByb21pc2UuY2FuY2VsID0gZnVuY3Rpb24gcmVqZWN0KCkge1xuICAgICAgICB0b2tlbi51bnN1YnNjcmliZShfcmVzb2x2ZSk7XG4gICAgICB9O1xuXG4gICAgICByZXR1cm4gcHJvbWlzZTtcbiAgICB9O1xuXG4gICAgZXhlY3V0b3IoZnVuY3Rpb24gY2FuY2VsKG1lc3NhZ2UsIGNvbmZpZywgcmVxdWVzdCkge1xuICAgICAgaWYgKHRva2VuLnJlYXNvbikge1xuICAgICAgICAvLyBDYW5jZWxsYXRpb24gaGFzIGFscmVhZHkgYmVlbiByZXF1ZXN0ZWRcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICB0b2tlbi5yZWFzb24gPSBuZXcgQ2FuY2VsZWRFcnJvcihtZXNzYWdlLCBjb25maWcsIHJlcXVlc3QpO1xuICAgICAgcmVzb2x2ZVByb21pc2UodG9rZW4ucmVhc29uKTtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBUaHJvd3MgYSBgQ2FuY2VsZWRFcnJvcmAgaWYgY2FuY2VsbGF0aW9uIGhhcyBiZWVuIHJlcXVlc3RlZC5cbiAgICovXG4gIHRocm93SWZSZXF1ZXN0ZWQoKSB7XG4gICAgaWYgKHRoaXMucmVhc29uKSB7XG4gICAgICB0aHJvdyB0aGlzLnJlYXNvbjtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogU3Vic2NyaWJlIHRvIHRoZSBjYW5jZWwgc2lnbmFsXG4gICAqL1xuXG4gIHN1YnNjcmliZShsaXN0ZW5lcikge1xuICAgIGlmICh0aGlzLnJlYXNvbikge1xuICAgICAgbGlzdGVuZXIodGhpcy5yZWFzb24pO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGlmICh0aGlzLl9saXN0ZW5lcnMpIHtcbiAgICAgIHRoaXMuX2xpc3RlbmVycy5wdXNoKGxpc3RlbmVyKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5fbGlzdGVuZXJzID0gW2xpc3RlbmVyXTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogVW5zdWJzY3JpYmUgZnJvbSB0aGUgY2FuY2VsIHNpZ25hbFxuICAgKi9cblxuICB1bnN1YnNjcmliZShsaXN0ZW5lcikge1xuICAgIGlmICghdGhpcy5fbGlzdGVuZXJzKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGNvbnN0IGluZGV4ID0gdGhpcy5fbGlzdGVuZXJzLmluZGV4T2YobGlzdGVuZXIpO1xuICAgIGlmIChpbmRleCAhPT0gLTEpIHtcbiAgICAgIHRoaXMuX2xpc3RlbmVycy5zcGxpY2UoaW5kZXgsIDEpO1xuICAgIH1cbiAgfVxuXG4gIHRvQWJvcnRTaWduYWwoKSB7XG4gICAgY29uc3QgY29udHJvbGxlciA9IG5ldyBBYm9ydENvbnRyb2xsZXIoKTtcblxuICAgIGNvbnN0IGFib3J0ID0gKGVycikgPT4ge1xuICAgICAgY29udHJvbGxlci5hYm9ydChlcnIpO1xuICAgIH07XG5cbiAgICB0aGlzLnN1YnNjcmliZShhYm9ydCk7XG5cbiAgICBjb250cm9sbGVyLnNpZ25hbC51bnN1YnNjcmliZSA9ICgpID0+IHRoaXMudW5zdWJzY3JpYmUoYWJvcnQpO1xuXG4gICAgcmV0dXJuIGNvbnRyb2xsZXIuc2lnbmFsO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgYW4gb2JqZWN0IHRoYXQgY29udGFpbnMgYSBuZXcgYENhbmNlbFRva2VuYCBhbmQgYSBmdW5jdGlvbiB0aGF0LCB3aGVuIGNhbGxlZCxcbiAgICogY2FuY2VscyB0aGUgYENhbmNlbFRva2VuYC5cbiAgICovXG4gIHN0YXRpYyBzb3VyY2UoKSB7XG4gICAgbGV0IGNhbmNlbDtcbiAgICBjb25zdCB0b2tlbiA9IG5ldyBDYW5jZWxUb2tlbihmdW5jdGlvbiBleGVjdXRvcihjKSB7XG4gICAgICBjYW5jZWwgPSBjO1xuICAgIH0pO1xuICAgIHJldHVybiB7XG4gICAgICB0b2tlbixcbiAgICAgIGNhbmNlbCxcbiAgICB9O1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IENhbmNlbFRva2VuO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG4vKipcbiAqIFN5bnRhY3RpYyBzdWdhciBmb3IgaW52b2tpbmcgYSBmdW5jdGlvbiBhbmQgZXhwYW5kaW5nIGFuIGFycmF5IGZvciBhcmd1bWVudHMuXG4gKlxuICogQ29tbW9uIHVzZSBjYXNlIHdvdWxkIGJlIHRvIHVzZSBgRnVuY3Rpb24ucHJvdG90eXBlLmFwcGx5YC5cbiAqXG4gKiAgYGBganNcbiAqICBmdW5jdGlvbiBmKHgsIHksIHopIHt9XG4gKiAgY29uc3QgYXJncyA9IFsxLCAyLCAzXTtcbiAqICBmLmFwcGx5KG51bGwsIGFyZ3MpO1xuICogIGBgYFxuICpcbiAqIFdpdGggYHNwcmVhZGAgdGhpcyBleGFtcGxlIGNhbiBiZSByZS13cml0dGVuLlxuICpcbiAqICBgYGBqc1xuICogIHNwcmVhZChmdW5jdGlvbih4LCB5LCB6KSB7fSkoWzEsIDIsIDNdKTtcbiAqICBgYGBcbiAqXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYWxsYmFja1xuICpcbiAqIEByZXR1cm5zIHtGdW5jdGlvbn1cbiAqL1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gc3ByZWFkKGNhbGxiYWNrKSB7XG4gIHJldHVybiBmdW5jdGlvbiB3cmFwKGFycikge1xuICAgIHJldHVybiBjYWxsYmFjay5hcHBseShudWxsLCBhcnIpO1xuICB9O1xufVxuIiwiJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQgdXRpbHMgZnJvbSAnLi4vdXRpbHMuanMnO1xuXG4vKipcbiAqIERldGVybWluZXMgd2hldGhlciB0aGUgcGF5bG9hZCBpcyBhbiBlcnJvciB0aHJvd24gYnkgQXhpb3NcbiAqXG4gKiBAcGFyYW0geyp9IHBheWxvYWQgVGhlIHZhbHVlIHRvIHRlc3RcbiAqXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB0aGUgcGF5bG9hZCBpcyBhbiBlcnJvciB0aHJvd24gYnkgQXhpb3MsIG90aGVyd2lzZSBmYWxzZVxuICovXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBpc0F4aW9zRXJyb3IocGF5bG9hZCkge1xuICByZXR1cm4gdXRpbHMuaXNPYmplY3QocGF5bG9hZCkgJiYgcGF5bG9hZC5pc0F4aW9zRXJyb3IgPT09IHRydWU7XG59XG4iLCJjb25zdCBIdHRwU3RhdHVzQ29kZSA9IHtcbiAgQ29udGludWU6IDEwMCxcbiAgU3dpdGNoaW5nUHJvdG9jb2xzOiAxMDEsXG4gIFByb2Nlc3Npbmc6IDEwMixcbiAgRWFybHlIaW50czogMTAzLFxuICBPazogMjAwLFxuICBDcmVhdGVkOiAyMDEsXG4gIEFjY2VwdGVkOiAyMDIsXG4gIE5vbkF1dGhvcml0YXRpdmVJbmZvcm1hdGlvbjogMjAzLFxuICBOb0NvbnRlbnQ6IDIwNCxcbiAgUmVzZXRDb250ZW50OiAyMDUsXG4gIFBhcnRpYWxDb250ZW50OiAyMDYsXG4gIE11bHRpU3RhdHVzOiAyMDcsXG4gIEFscmVhZHlSZXBvcnRlZDogMjA4LFxuICBJbVVzZWQ6IDIyNixcbiAgTXVsdGlwbGVDaG9pY2VzOiAzMDAsXG4gIE1vdmVkUGVybWFuZW50bHk6IDMwMSxcbiAgRm91bmQ6IDMwMixcbiAgU2VlT3RoZXI6IDMwMyxcbiAgTm90TW9kaWZpZWQ6IDMwNCxcbiAgVXNlUHJveHk6IDMwNSxcbiAgVW51c2VkOiAzMDYsXG4gIFRlbXBvcmFyeVJlZGlyZWN0OiAzMDcsXG4gIFBlcm1hbmVudFJlZGlyZWN0OiAzMDgsXG4gIEJhZFJlcXVlc3Q6IDQwMCxcbiAgVW5hdXRob3JpemVkOiA0MDEsXG4gIFBheW1lbnRSZXF1aXJlZDogNDAyLFxuICBGb3JiaWRkZW46IDQwMyxcbiAgTm90Rm91bmQ6IDQwNCxcbiAgTWV0aG9kTm90QWxsb3dlZDogNDA1LFxuICBOb3RBY2NlcHRhYmxlOiA0MDYsXG4gIFByb3h5QXV0aGVudGljYXRpb25SZXF1aXJlZDogNDA3LFxuICBSZXF1ZXN0VGltZW91dDogNDA4LFxuICBDb25mbGljdDogNDA5LFxuICBHb25lOiA0MTAsXG4gIExlbmd0aFJlcXVpcmVkOiA0MTEsXG4gIFByZWNvbmRpdGlvbkZhaWxlZDogNDEyLFxuICBQYXlsb2FkVG9vTGFyZ2U6IDQxMyxcbiAgVXJpVG9vTG9uZzogNDE0LFxuICBVbnN1cHBvcnRlZE1lZGlhVHlwZTogNDE1LFxuICBSYW5nZU5vdFNhdGlzZmlhYmxlOiA0MTYsXG4gIEV4cGVjdGF0aW9uRmFpbGVkOiA0MTcsXG4gIEltQVRlYXBvdDogNDE4LFxuICBNaXNkaXJlY3RlZFJlcXVlc3Q6IDQyMSxcbiAgVW5wcm9jZXNzYWJsZUVudGl0eTogNDIyLFxuICBMb2NrZWQ6IDQyMyxcbiAgRmFpbGVkRGVwZW5kZW5jeTogNDI0LFxuICBUb29FYXJseTogNDI1LFxuICBVcGdyYWRlUmVxdWlyZWQ6IDQyNixcbiAgUHJlY29uZGl0aW9uUmVxdWlyZWQ6IDQyOCxcbiAgVG9vTWFueVJlcXVlc3RzOiA0MjksXG4gIFJlcXVlc3RIZWFkZXJGaWVsZHNUb29MYXJnZTogNDMxLFxuICBVbmF2YWlsYWJsZUZvckxlZ2FsUmVhc29uczogNDUxLFxuICBJbnRlcm5hbFNlcnZlckVycm9yOiA1MDAsXG4gIE5vdEltcGxlbWVudGVkOiA1MDEsXG4gIEJhZEdhdGV3YXk6IDUwMixcbiAgU2VydmljZVVuYXZhaWxhYmxlOiA1MDMsXG4gIEdhdGV3YXlUaW1lb3V0OiA1MDQsXG4gIEh0dHBWZXJzaW9uTm90U3VwcG9ydGVkOiA1MDUsXG4gIFZhcmlhbnRBbHNvTmVnb3RpYXRlczogNTA2LFxuICBJbnN1ZmZpY2llbnRTdG9yYWdlOiA1MDcsXG4gIExvb3BEZXRlY3RlZDogNTA4LFxuICBOb3RFeHRlbmRlZDogNTEwLFxuICBOZXR3b3JrQXV0aGVudGljYXRpb25SZXF1aXJlZDogNTExLFxuICBXZWJTZXJ2ZXJJc0Rvd246IDUyMSxcbiAgQ29ubmVjdGlvblRpbWVkT3V0OiA1MjIsXG4gIE9yaWdpbklzVW5yZWFjaGFibGU6IDUyMyxcbiAgVGltZW91dE9jY3VycmVkOiA1MjQsXG4gIFNzbEhhbmRzaGFrZUZhaWxlZDogNTI1LFxuICBJbnZhbGlkU3NsQ2VydGlmaWNhdGU6IDUyNixcbn07XG5cbk9iamVjdC5lbnRyaWVzKEh0dHBTdGF0dXNDb2RlKS5mb3JFYWNoKChba2V5LCB2YWx1ZV0pID0+IHtcbiAgSHR0cFN0YXR1c0NvZGVbdmFsdWVdID0ga2V5O1xufSk7XG5cbmV4cG9ydCBkZWZhdWx0IEh0dHBTdGF0dXNDb2RlO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQgdXRpbHMgZnJvbSAnLi91dGlscy5qcyc7XG5pbXBvcnQgYmluZCBmcm9tICcuL2hlbHBlcnMvYmluZC5qcyc7XG5pbXBvcnQgQXhpb3MgZnJvbSAnLi9jb3JlL0F4aW9zLmpzJztcbmltcG9ydCBtZXJnZUNvbmZpZyBmcm9tICcuL2NvcmUvbWVyZ2VDb25maWcuanMnO1xuaW1wb3J0IGRlZmF1bHRzIGZyb20gJy4vZGVmYXVsdHMvaW5kZXguanMnO1xuaW1wb3J0IGZvcm1EYXRhVG9KU09OIGZyb20gJy4vaGVscGVycy9mb3JtRGF0YVRvSlNPTi5qcyc7XG5pbXBvcnQgQ2FuY2VsZWRFcnJvciBmcm9tICcuL2NhbmNlbC9DYW5jZWxlZEVycm9yLmpzJztcbmltcG9ydCBDYW5jZWxUb2tlbiBmcm9tICcuL2NhbmNlbC9DYW5jZWxUb2tlbi5qcyc7XG5pbXBvcnQgaXNDYW5jZWwgZnJvbSAnLi9jYW5jZWwvaXNDYW5jZWwuanMnO1xuaW1wb3J0IHsgVkVSU0lPTiB9IGZyb20gJy4vZW52L2RhdGEuanMnO1xuaW1wb3J0IHRvRm9ybURhdGEgZnJvbSAnLi9oZWxwZXJzL3RvRm9ybURhdGEuanMnO1xuaW1wb3J0IEF4aW9zRXJyb3IgZnJvbSAnLi9jb3JlL0F4aW9zRXJyb3IuanMnO1xuaW1wb3J0IHNwcmVhZCBmcm9tICcuL2hlbHBlcnMvc3ByZWFkLmpzJztcbmltcG9ydCBpc0F4aW9zRXJyb3IgZnJvbSAnLi9oZWxwZXJzL2lzQXhpb3NFcnJvci5qcyc7XG5pbXBvcnQgQXhpb3NIZWFkZXJzIGZyb20gJy4vY29yZS9BeGlvc0hlYWRlcnMuanMnO1xuaW1wb3J0IGFkYXB0ZXJzIGZyb20gJy4vYWRhcHRlcnMvYWRhcHRlcnMuanMnO1xuaW1wb3J0IEh0dHBTdGF0dXNDb2RlIGZyb20gJy4vaGVscGVycy9IdHRwU3RhdHVzQ29kZS5qcyc7XG5cbi8qKlxuICogQ3JlYXRlIGFuIGluc3RhbmNlIG9mIEF4aW9zXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IGRlZmF1bHRDb25maWcgVGhlIGRlZmF1bHQgY29uZmlnIGZvciB0aGUgaW5zdGFuY2VcbiAqXG4gKiBAcmV0dXJucyB7QXhpb3N9IEEgbmV3IGluc3RhbmNlIG9mIEF4aW9zXG4gKi9cbmZ1bmN0aW9uIGNyZWF0ZUluc3RhbmNlKGRlZmF1bHRDb25maWcpIHtcbiAgY29uc3QgY29udGV4dCA9IG5ldyBBeGlvcyhkZWZhdWx0Q29uZmlnKTtcbiAgY29uc3QgaW5zdGFuY2UgPSBiaW5kKEF4aW9zLnByb3RvdHlwZS5yZXF1ZXN0LCBjb250ZXh0KTtcblxuICAvLyBDb3B5IGF4aW9zLnByb3RvdHlwZSB0byBpbnN0YW5jZVxuICB1dGlscy5leHRlbmQoaW5zdGFuY2UsIEF4aW9zLnByb3RvdHlwZSwgY29udGV4dCwgeyBhbGxPd25LZXlzOiB0cnVlIH0pO1xuXG4gIC8vIENvcHkgY29udGV4dCB0byBpbnN0YW5jZVxuICB1dGlscy5leHRlbmQoaW5zdGFuY2UsIGNvbnRleHQsIG51bGwsIHsgYWxsT3duS2V5czogdHJ1ZSB9KTtcblxuICAvLyBGYWN0b3J5IGZvciBjcmVhdGluZyBuZXcgaW5zdGFuY2VzXG4gIGluc3RhbmNlLmNyZWF0ZSA9IGZ1bmN0aW9uIGNyZWF0ZShpbnN0YW5jZUNvbmZpZykge1xuICAgIHJldHVybiBjcmVhdGVJbnN0YW5jZShtZXJnZUNvbmZpZyhkZWZhdWx0Q29uZmlnLCBpbnN0YW5jZUNvbmZpZykpO1xuICB9O1xuXG4gIHJldHVybiBpbnN0YW5jZTtcbn1cblxuLy8gQ3JlYXRlIHRoZSBkZWZhdWx0IGluc3RhbmNlIHRvIGJlIGV4cG9ydGVkXG5jb25zdCBheGlvcyA9IGNyZWF0ZUluc3RhbmNlKGRlZmF1bHRzKTtcblxuLy8gRXhwb3NlIEF4aW9zIGNsYXNzIHRvIGFsbG93IGNsYXNzIGluaGVyaXRhbmNlXG5heGlvcy5BeGlvcyA9IEF4aW9zO1xuXG4vLyBFeHBvc2UgQ2FuY2VsICYgQ2FuY2VsVG9rZW5cbmF4aW9zLkNhbmNlbGVkRXJyb3IgPSBDYW5jZWxlZEVycm9yO1xuYXhpb3MuQ2FuY2VsVG9rZW4gPSBDYW5jZWxUb2tlbjtcbmF4aW9zLmlzQ2FuY2VsID0gaXNDYW5jZWw7XG5heGlvcy5WRVJTSU9OID0gVkVSU0lPTjtcbmF4aW9zLnRvRm9ybURhdGEgPSB0b0Zvcm1EYXRhO1xuXG4vLyBFeHBvc2UgQXhpb3NFcnJvciBjbGFzc1xuYXhpb3MuQXhpb3NFcnJvciA9IEF4aW9zRXJyb3I7XG5cbi8vIGFsaWFzIGZvciBDYW5jZWxlZEVycm9yIGZvciBiYWNrd2FyZCBjb21wYXRpYmlsaXR5XG5heGlvcy5DYW5jZWwgPSBheGlvcy5DYW5jZWxlZEVycm9yO1xuXG4vLyBFeHBvc2UgYWxsL3NwcmVhZFxuYXhpb3MuYWxsID0gZnVuY3Rpb24gYWxsKHByb21pc2VzKSB7XG4gIHJldHVybiBQcm9taXNlLmFsbChwcm9taXNlcyk7XG59O1xuXG5heGlvcy5zcHJlYWQgPSBzcHJlYWQ7XG5cbi8vIEV4cG9zZSBpc0F4aW9zRXJyb3JcbmF4aW9zLmlzQXhpb3NFcnJvciA9IGlzQXhpb3NFcnJvcjtcblxuLy8gRXhwb3NlIG1lcmdlQ29uZmlnXG5heGlvcy5tZXJnZUNvbmZpZyA9IG1lcmdlQ29uZmlnO1xuXG5heGlvcy5BeGlvc0hlYWRlcnMgPSBBeGlvc0hlYWRlcnM7XG5cbmF4aW9zLmZvcm1Ub0pTT04gPSAodGhpbmcpID0+IGZvcm1EYXRhVG9KU09OKHV0aWxzLmlzSFRNTEZvcm0odGhpbmcpID8gbmV3IEZvcm1EYXRhKHRoaW5nKSA6IHRoaW5nKTtcblxuYXhpb3MuZ2V0QWRhcHRlciA9IGFkYXB0ZXJzLmdldEFkYXB0ZXI7XG5cbmF4aW9zLkh0dHBTdGF0dXNDb2RlID0gSHR0cFN0YXR1c0NvZGU7XG5cbmF4aW9zLmRlZmF1bHQgPSBheGlvcztcblxuLy8gdGhpcyBtb2R1bGUgc2hvdWxkIG9ubHkgaGF2ZSBhIGRlZmF1bHQgZXhwb3J0XG5leHBvcnQgZGVmYXVsdCBheGlvcztcbiIsImltcG9ydCBheGlvcyBmcm9tICcuL2xpYi9heGlvcy5qcyc7XG5cbi8vIFRoaXMgbW9kdWxlIGlzIGludGVuZGVkIHRvIHVud3JhcCBBeGlvcyBkZWZhdWx0IGV4cG9ydCBhcyBuYW1lZC5cbi8vIEtlZXAgdG9wLWxldmVsIGV4cG9ydCBzYW1lIHdpdGggc3RhdGljIHByb3BlcnRpZXNcbi8vIHNvIHRoYXQgaXQgY2FuIGtlZXAgc2FtZSB3aXRoIGVzIG1vZHVsZSBvciBjanNcbmNvbnN0IHtcbiAgQXhpb3MsXG4gIEF4aW9zRXJyb3IsXG4gIENhbmNlbGVkRXJyb3IsXG4gIGlzQ2FuY2VsLFxuICBDYW5jZWxUb2tlbixcbiAgVkVSU0lPTixcbiAgYWxsLFxuICBDYW5jZWwsXG4gIGlzQXhpb3NFcnJvcixcbiAgc3ByZWFkLFxuICB0b0Zvcm1EYXRhLFxuICBBeGlvc0hlYWRlcnMsXG4gIEh0dHBTdGF0dXNDb2RlLFxuICBmb3JtVG9KU09OLFxuICBnZXRBZGFwdGVyLFxuICBtZXJnZUNvbmZpZyxcbiAgY3JlYXRlLFxufSA9IGF4aW9zO1xuXG5leHBvcnQge1xuICBheGlvcyBhcyBkZWZhdWx0LFxuICBjcmVhdGUsXG4gIEF4aW9zLFxuICBBeGlvc0Vycm9yLFxuICBDYW5jZWxlZEVycm9yLFxuICBpc0NhbmNlbCxcbiAgQ2FuY2VsVG9rZW4sXG4gIFZFUlNJT04sXG4gIGFsbCxcbiAgQ2FuY2VsLFxuICBpc0F4aW9zRXJyb3IsXG4gIHNwcmVhZCxcbiAgdG9Gb3JtRGF0YSxcbiAgQXhpb3NIZWFkZXJzLFxuICBIdHRwU3RhdHVzQ29kZSxcbiAgZm9ybVRvSlNPTixcbiAgZ2V0QWRhcHRlcixcbiAgbWVyZ2VDb25maWcsXG59O1xuIiwiaW1wb3J0IFJlYWN0LCB7IENoYW5nZUV2ZW50LCBGb3JtRXZlbnQsIFN5bnRoZXRpY0V2ZW50IH0gZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgeyBBcGlDbGllbnQsIHVzZU5vdGljZSB9IGZyb20gJ2FkbWluanMnO1xyXG5pbXBvcnQgeyB1c2VOYXZpZ2F0ZSB9IGZyb20gJ3JlYWN0LXJvdXRlci1kb20nO1xyXG5pbXBvcnQgYXhpb3MgZnJvbSAnYXhpb3MnO1xyXG5pbXBvcnQgeyBCb3gsIEJ1dHRvbiwgSW5wdXQsIExhYmVsLCBUZXh0LCBUZXh0QXJlYSB9IGZyb20gJ0BhZG1pbmpzL2Rlc2lnbi1zeXN0ZW0nO1xyXG5pbXBvcnQgeyBCYXNlUHJvcGVydHlQcm9wcywgQWN0aW9uUHJvcHMgfSBmcm9tICdhZG1pbmpzJztcclxuXHJcbmNvbnN0IEltYWdlVXBsb2FkID0gKHByb3BzOiBBY3Rpb25Qcm9wcykgPT4ge1xyXG4gIGNvbnN0IHsgcmVjb3JkIH0gPSBwcm9wcztcclxuICBjb25zdCBbc2VsZWN0ZWRGaWxlLCBzZXRTZWxlY3RlZEZpbGVdID0gUmVhY3QudXNlU3RhdGU8RmlsZSB8IG51bGw+KG51bGwpO1xyXG4gIGNvbnN0IFt0aXRsZSwgc2V0VGl0bGVdID0gUmVhY3QudXNlU3RhdGUoJycpO1xyXG4gIGNvbnN0IFtkZXNjcmlwdGlvbiwgc2V0RGVzY3JpcHRpb25dID0gUmVhY3QudXNlU3RhdGUoJycpO1xyXG4gIGNvbnN0IFtsb2FkaW5nLCBzZXRMb2FkaW5nXSA9IFJlYWN0LnVzZVN0YXRlKGZhbHNlKTtcclxuICBjb25zdCBbZXJyb3IsIHNldEVycm9yXSA9IFJlYWN0LnVzZVN0YXRlPHN0cmluZyB8IG51bGw+KCcnKTtcclxuICBjb25zdCBbc3VjY2Vzcywgc2V0U3VjY2Vzc10gPSBSZWFjdC51c2VTdGF0ZTxzdHJpbmcgfCBudWxsPignJyk7XHJcbiAgY29uc3Qgc2VuZE5vdGljZSA9IHVzZU5vdGljZSgpO1xyXG4gIGNvbnN0IG5hdmlnYXRlID0gdXNlTmF2aWdhdGUoKTtcclxuICBjb25zdCBhcGkgPSBuZXcgQXBpQ2xpZW50KCk7XHJcblxyXG4gIGNvbnN0IGhhbmRsZUZpbGVDaGFuZ2UgPSAoZXZlbnQ6IENoYW5nZUV2ZW50PEhUTUxJbnB1dEVsZW1lbnQ+KSA9PiB7XHJcbiAgICBjb25zdCBmaWxlID0gZXZlbnQudGFyZ2V0LmZpbGVzPy5bMF07XHJcblxyXG4gICAgaWYgKGZpbGUpIHtcclxuICAgICAgc2V0U2VsZWN0ZWRGaWxlKGZpbGUpO1xyXG5cclxuICAgICAgLy8gLy8gU2F2ZSBmaWxlIGludG8gQWRtaW5KUyBmb3JtIHN0YXRlXHJcbiAgICB9XHJcbiAgfTtcclxuICBjb25zdCBoYW5kbGVUaXRsZUNoYW5nZSA9IChldmVudDogQ2hhbmdlRXZlbnQ8SFRNTElucHV0RWxlbWVudD4pID0+IHtcclxuICAgIHNldFRpdGxlKGV2ZW50LnRhcmdldC52YWx1ZSk7XHJcbiAgfTtcclxuXHJcbiAgY29uc3QgaGFuZGxlRGVzY3JpcHRpb25DaGFuZ2UgPSAoZXZlbnQ6IENoYW5nZUV2ZW50PEhUTUxUZXh0QXJlYUVsZW1lbnQ+KSA9PiB7XHJcbiAgICBzZXREZXNjcmlwdGlvbihldmVudC50YXJnZXQudmFsdWUpO1xyXG4gIH07XHJcblxyXG4gIGNvbnN0IGhhbmRsZVVwbG9hZCA9IGFzeW5jIChldmVudDogU3ludGhldGljRXZlbnQpID0+IHtcclxuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcblxyXG4gICAgc2V0RXJyb3IoJycpO1xyXG4gICAgc2V0U3VjY2VzcygnJyk7XHJcblxyXG4gICAgaWYgKCFzZWxlY3RlZEZpbGUpIHJldHVybjtcclxuXHJcbiAgICB0cnkge1xyXG4gICAgICBzZXRMb2FkaW5nKHRydWUpO1xyXG5cclxuICAgICAgY29uc3QgZm9ybURhdGEgPSBuZXcgRm9ybURhdGEoKTtcclxuXHJcbiAgICAgIGZvcm1EYXRhLmFwcGVuZCgnaW1hZ2UnLCBzZWxlY3RlZEZpbGUpO1xyXG5cclxuICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBheGlvcy5wb3N0KCcvZ2FsbGVyeScsIGZvcm1EYXRhLCB7XHJcbiAgICAgICAgaGVhZGVyczoge1xyXG4gICAgICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdtdWx0aXBhcnQvZm9ybS1kYXRhJyxcclxuICAgICAgICB9LFxyXG4gICAgICB9KTtcclxuICAgICAgY29uc29sZS5sb2coJ1VwbG9hZCBzdWNjZXNzZnVsOicsIHJlc3BvbnNlLmRhdGEpO1xyXG4gICAgICBhd2FpdCBhcGkucmVzb3VyY2VBY3Rpb24oe1xyXG4gICAgICAgIHJlc291cmNlSWQ6ICdHYWxsZXJ5JyxcclxuICAgICAgICBhY3Rpb25OYW1lOiAnbmV3JyxcclxuICAgICAgICBkYXRhOiB7XHJcbiAgICAgICAgICB0aXRsZSxcclxuICAgICAgICAgIGRlc2NyaXB0aW9uLFxyXG4gICAgICAgICAgaW1hZ2VVcmw6IHJlc3BvbnNlLmRhdGEudXJsLFxyXG4gICAgICAgICAgY2xvdWRpbmFyeVB1YmxpY0lkOiByZXNwb25zZS5kYXRhLnB1YmxpY19pZCxcclxuICAgICAgICB9LFxyXG4gICAgICB9KTtcclxuICAgICAgc2VuZE5vdGljZSh7XHJcbiAgICAgICAgbWVzc2FnZTogJ0ltYWdlIHVwbG9hZGVkIHN1Y2Nlc3NmdWxseScsXHJcbiAgICAgICAgdHlwZTogJ3N1Y2Nlc3MnLFxyXG4gICAgICB9KTtcclxuXHJcbiAgICAgIG5hdmlnYXRlKCcvYWRtaW4vcmVzb3VyY2VzL0dhbGxlcnknKTtcclxuICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgIGNvbnNvbGUuZXJyb3IoJ1VwbG9hZCBmYWlsZWQ6JywgZXJyb3IpO1xyXG4gICAgICBzZXRFcnJvcignRmFpbGVkIHRvIHVwbG9hZCBpbWFnZS4gUGxlYXNlIHRyeSBhZ2Fpbi4nKTtcclxuICAgIH0gZmluYWxseSB7XHJcbiAgICAgIHNldExvYWRpbmcoZmFsc2UpO1xyXG4gICAgfVxyXG4gIH07XHJcblxyXG4gIHJldHVybiAoXHJcbiAgICA8Qm94IGJhY2tncm91bmRDb2xvcj1cIndoaXRlXCIgcD17MzJ9IGJvcmRlclJhZGl1cz17NH0gYm94U2hhZG93PVwiY2FyZFwiPlxyXG4gICAgICA8Zm9ybSBzdHlsZT17eyBkaXNwbGF5OiAnZmxleCcsIGZsZXhEaXJlY3Rpb246ICdjb2x1bW4nLCBhbGlnbkl0ZW1zOiAnY2VudGVyJywgZ2FwOiAxNiB9fSBvblN1Ym1pdD17aGFuZGxlVXBsb2FkfT5cclxuICAgICAgICA8Qm94XHJcbiAgICAgICAgICB3aWR0aD17MX1cclxuICAgICAgICAgIGJvcmRlcj1cIjFweCBkYXNoZWQgI2JiYlwiXHJcbiAgICAgICAgICBib3JkZXJSYWRpdXM9XCIxMnB4XCJcclxuICAgICAgICAgIGhlaWdodD1cIjM1MHB4XCJcclxuICAgICAgICAgIGRpc3BsYXk9XCJmbGV4XCJcclxuICAgICAgICAgIGFsaWduSXRlbXM9XCJjZW50ZXJcIlxyXG4gICAgICAgICAganVzdGlmeUNvbnRlbnQ9XCJjZW50ZXJcIlxyXG4gICAgICAgICAgYmFja2dyb3VuZENvbG9yPVwiI2ZhZmFmYVwiXHJcbiAgICAgICAgICBwPXs4fVxyXG4gICAgICAgID5cclxuICAgICAgICAgIDxMYWJlbFxyXG4gICAgICAgICAgICBodG1sRm9yPVwiaW1hZ2UtdXBsb2FkXCJcclxuICAgICAgICAgICAgc3R5bGU9e3tcclxuICAgICAgICAgICAgICB3aWR0aDogJzEwMCUnLFxyXG4gICAgICAgICAgICAgIGhlaWdodDogJzEwMCUnLFxyXG4gICAgICAgICAgICAgIGN1cnNvcjogJ3BvaW50ZXInLFxyXG4gICAgICAgICAgICAgIGRpc3BsYXk6ICdmbGV4JyxcclxuICAgICAgICAgICAgICBhbGlnbkl0ZW1zOiAnY2VudGVyJyxcclxuICAgICAgICAgICAgICBqdXN0aWZ5Q29udGVudDogJ2NlbnRlcicsXHJcbiAgICAgICAgICAgIH19XHJcbiAgICAgICAgICA+XHJcbiAgICAgICAgICAgIHtzZWxlY3RlZEZpbGUgPyAoXHJcbiAgICAgICAgICAgICAgPD5cclxuICAgICAgICAgICAgICAgIDxpbWdcclxuICAgICAgICAgICAgICAgICAgc3JjPXtVUkwuY3JlYXRlT2JqZWN0VVJMKHNlbGVjdGVkRmlsZSl9XHJcbiAgICAgICAgICAgICAgICAgIGFsdD1cIlByZXZpZXdcIlxyXG4gICAgICAgICAgICAgICAgICBzdHlsZT17eyB3aWR0aDogJzEwMCUnLCBoZWlnaHQ6ICcxMDAlJywgb2JqZWN0Rml0OiAnY29udGFpbicgfX1cclxuICAgICAgICAgICAgICAgIC8+XHJcbiAgICAgICAgICAgICAgPC8+XHJcbiAgICAgICAgICAgICkgOiAoXHJcbiAgICAgICAgICAgICAgPFRleHQ+VXBsb2FkIEltYWdlPC9UZXh0PlxyXG4gICAgICAgICAgICApfVxyXG4gICAgICAgICAgPC9MYWJlbD5cclxuXHJcbiAgICAgICAgICA8SW5wdXRcclxuICAgICAgICAgICAgaWQ9XCJpbWFnZS11cGxvYWRcIlxyXG4gICAgICAgICAgICB0eXBlPVwiZmlsZVwiXHJcbiAgICAgICAgICAgIGFjY2VwdD1cImltYWdlLypcIlxyXG4gICAgICAgICAgICBvbkNoYW5nZT17aGFuZGxlRmlsZUNoYW5nZX1cclxuICAgICAgICAgICAgc3R5bGU9e3sgZGlzcGxheTogJ25vbmUnIH19XHJcbiAgICAgICAgICAgIHJlcXVpcmVkXHJcbiAgICAgICAgICAvPlxyXG4gICAgICAgIDwvQm94PlxyXG5cclxuICAgICAgICA8Qm94IHdpZHRoPXsxfT5cclxuICAgICAgICAgIDxMYWJlbCBodG1sRm9yPVwidGl0bGVcIiBzdHlsZT17eyBkaXNwbGF5OiAnZmxleCcsIGFsaWduSXRlbXM6ICdjZW50ZXInLCBnYXA6IDIgfX0+XHJcbiAgICAgICAgICAgIDxUZXh0IHZhcmlhbnQ9XCJwcmltYXJ5XCIgY29sb3I9XCJwcmltYXJ5MTAwXCI+XHJcbiAgICAgICAgICAgICAgKlxyXG4gICAgICAgICAgICA8L1RleHQ+XHJcbiAgICAgICAgICAgIFRpdGxlXHJcbiAgICAgICAgICA8L0xhYmVsPlxyXG4gICAgICAgICAgPElucHV0XHJcbiAgICAgICAgICAgIHdpZHRoPXsxfVxyXG4gICAgICAgICAgICB2YXJpYW50PVwiZGVmYXVsdFwiXHJcbiAgICAgICAgICAgIHR5cGU9XCJ0ZXh0XCJcclxuICAgICAgICAgICAgaWQ9XCJ0aXRsZVwiXHJcbiAgICAgICAgICAgIHZhbHVlPXt0aXRsZX1cclxuICAgICAgICAgICAgb25DaGFuZ2U9e2hhbmRsZVRpdGxlQ2hhbmdlfVxyXG4gICAgICAgICAgICByZXF1aXJlZFxyXG4gICAgICAgICAgLz5cclxuICAgICAgICA8L0JveD5cclxuICAgICAgICA8Qm94IHdpZHRoPXsxfT5cclxuICAgICAgICAgIDxMYWJlbCBodG1sRm9yPVwiZGVzY3JpcHRpb25cIj5EZXNjcmlwdGlvbjwvTGFiZWw+XHJcbiAgICAgICAgICA8VGV4dEFyZWFcclxuICAgICAgICAgICAgd2lkdGg9ezF9XHJcbiAgICAgICAgICAgIHZhcmlhbnQ9XCJkZWZhdWx0XCJcclxuICAgICAgICAgICAgdHlwZT1cInRleHRcIlxyXG4gICAgICAgICAgICBpZD1cImRlc2NyaXB0aW9uXCJcclxuICAgICAgICAgICAgdmFsdWU9e2Rlc2NyaXB0aW9ufVxyXG4gICAgICAgICAgICBvbkNoYW5nZT17aGFuZGxlRGVzY3JpcHRpb25DaGFuZ2V9XHJcbiAgICAgICAgICAvPlxyXG4gICAgICAgIDwvQm94PlxyXG4gICAgICAgIDxCdXR0b24gdHlwZT1cInN1Ym1pdFwiIHZhcmlhbnQ9XCJjb250YWluZWRcIiBsYWJlbD17bG9hZGluZyA/ICdVcGxvYWRpbmcuLi4nIDogJ1VwbG9hZCd9IGRpc2FibGVkPXtsb2FkaW5nfSAvPlxyXG4gICAgICA8L2Zvcm0+XHJcbiAgICA8L0JveD5cclxuICApO1xyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgSW1hZ2VVcGxvYWQ7XHJcbiIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCB7IEJveCwgQnV0dG9uLCBIMyB9IGZyb20gJ0BhZG1pbmpzL2Rlc2lnbi1zeXN0ZW0nO1xyXG5pbXBvcnQgeyBTaG93UHJvcGVydHlQcm9wcyB9IGZyb20gJ2FkbWluanMnO1xyXG5cclxuY29uc3QgQ3VzdG9tU2hvdyA9IChwcm9wczogU2hvd1Byb3BlcnR5UHJvcHMpID0+IHtcclxuICBjb25zdCB7IHJlY29yZCB9ID0gcHJvcHM7XHJcbiAgcmV0dXJuIChcclxuICAgIDxCb3ggd2lkdGg9ezF9IGZsZXggZmxleERpcmVjdGlvbj1cImNvbHVtblwiIGFsaWduSXRlbXM9XCJjZW50ZXJcIiBnYXA9ezJ9IG1hcmdpbkJsb2NrPXsyNH0+XHJcbiAgICAgIDxpbWdcclxuICAgICAgICBzcmM9e3JlY29yZC5wYXJhbXMuaW1hZ2VVcmx9XHJcbiAgICAgICAgYWx0PXtyZWNvcmQucGFyYW1zLnRpdGxlfVxyXG4gICAgICAgIHN0eWxlPXt7IGhlaWdodDogJzUwMHB4Jywgb2JqZWN0Rml0OiAnY29udGFpbicsIG1hcmdpbklubGluZTogJ2F1dG8nIH19XHJcbiAgICAgIC8+XHJcbiAgICA8L0JveD5cclxuICApO1xyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgQ3VzdG9tU2hvdztcclxuIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0IHsgU2hvd1Byb3BlcnR5UHJvcHMgfSBmcm9tICdhZG1pbmpzJztcclxuaW1wb3J0IHsgQm94IH0gZnJvbSAnQGFkbWluanMvZGVzaWduLXN5c3RlbSc7XHJcblxyXG5jb25zdCBSYW5kb21QaWN0dXJlOiBSZWFjdC5GQzxTaG93UHJvcGVydHlQcm9wcz4gPSAocHJvcHMpID0+IHtcclxuICBjb25zdCB7IHJlY29yZCB9ID0gcHJvcHM7XHJcblxyXG4gIHJldHVybiAoXHJcbiAgICA8aW1nXHJcbiAgICAgIHNyYz17cmVjb3JkLnBhcmFtcy5pbWFnZVVybH1cclxuICAgICAgYWx0PXtyZWNvcmQucGFyYW1zLnRpdGxlfVxyXG4gICAgICBzdHlsZT17eyB3aWR0aDogMjAwLCBoZWlnaHQ6IDIwMCwgb2JqZWN0Rml0OiAnY292ZXInIH19XHJcbiAgICAvPlxyXG4gICk7XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBSYW5kb21QaWN0dXJlO1xyXG4iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgeyBCb3gsIExhYmVsLCBUZXh0LCBJbnB1dCB9IGZyb20gJ0BhZG1pbmpzL2Rlc2lnbi1zeXN0ZW0nO1xyXG5pbXBvcnQgeyBBY3Rpb25Qcm9wcyB9IGZyb20gJ2FkbWluanMnO1xyXG5cclxuY29uc3QgQ3VzdG9tSW1hZ2VVcGxvYWRDb21wb25lbnQgPSAocHJvcHM6IEFjdGlvblByb3BzKSA9PiB7XHJcbiAgY29uc3QgeyByZWNvcmQgfSA9IHByb3BzO1xyXG4gIGNvbnN0IFtzZWxlY3RlZEZpbGUsIHNldFNlbGVjdGVkRmlsZV0gPSBSZWFjdC51c2VTdGF0ZTxGaWxlIHwgbnVsbD4obnVsbCk7XHJcbiAgY29uc3QgaGFuZGxlRmlsZUNoYW5nZSA9IChldmVudDogUmVhY3QuQ2hhbmdlRXZlbnQ8SFRNTElucHV0RWxlbWVudD4pID0+IHtcclxuICAgIGNvbnN0IGZpbGUgPSBldmVudC50YXJnZXQuZmlsZXM/LlswXTtcclxuICAgIGlmIChmaWxlKSB7XHJcbiAgICAgIHNldFNlbGVjdGVkRmlsZShmaWxlKTtcclxuICAgIH1cclxuICB9O1xyXG4gIHJldHVybiAoXHJcbiAgICA8Qm94XHJcbiAgICAgIHdpZHRoPXsxfVxyXG4gICAgICBib3JkZXI9XCIxcHggZGFzaGVkICNiYmJcIlxyXG4gICAgICBib3JkZXJSYWRpdXM9XCIxMnB4XCJcclxuICAgICAgaGVpZ2h0PVwiMzUwcHhcIlxyXG4gICAgICBkaXNwbGF5PVwiZmxleFwiXHJcbiAgICAgIGFsaWduSXRlbXM9XCJjZW50ZXJcIlxyXG4gICAgICBqdXN0aWZ5Q29udGVudD1cImNlbnRlclwiXHJcbiAgICAgIGJhY2tncm91bmRDb2xvcj1cIiNmYWZhZmFcIlxyXG4gICAgICBwPXs4fVxyXG4gICAgICBtYXJnaW5Cb3R0b209ezMyfVxyXG4gICAgPlxyXG4gICAgICA8TGFiZWxcclxuICAgICAgICBodG1sRm9yPVwiaW1hZ2UtdXBsb2FkXCJcclxuICAgICAgICBzdHlsZT17e1xyXG4gICAgICAgICAgd2lkdGg6ICcxMDAlJyxcclxuICAgICAgICAgIGhlaWdodDogJzEwMCUnLFxyXG4gICAgICAgICAgY3Vyc29yOiAncG9pbnRlcicsXHJcbiAgICAgICAgICBkaXNwbGF5OiAnZmxleCcsXHJcbiAgICAgICAgICBhbGlnbkl0ZW1zOiAnY2VudGVyJyxcclxuICAgICAgICAgIGp1c3RpZnlDb250ZW50OiAnY2VudGVyJyxcclxuICAgICAgICB9fVxyXG4gICAgICA+XHJcbiAgICAgICAge3JlY29yZD8ucGFyYW1zLmltYWdlVXJsID8gKFxyXG4gICAgICAgICAgPD5cclxuICAgICAgICAgICAgPGltZ1xyXG4gICAgICAgICAgICAgIHNyYz17cmVjb3JkPy5wYXJhbXMuaW1hZ2VVcmx9XHJcbiAgICAgICAgICAgICAgYWx0PVwiUHJldmlld1wiXHJcbiAgICAgICAgICAgICAgc3R5bGU9e3sgd2lkdGg6ICcxMDAlJywgaGVpZ2h0OiAnMTAwJScsIG9iamVjdEZpdDogJ2NvbnRhaW4nIH19XHJcbiAgICAgICAgICAgIC8+XHJcbiAgICAgICAgICA8Lz5cclxuICAgICAgICApIDogKFxyXG4gICAgICAgICAgPFRleHQ+VXBsb2FkIEltYWdlPC9UZXh0PlxyXG4gICAgICAgICl9XHJcbiAgICAgIDwvTGFiZWw+XHJcbiAgICA8L0JveD5cclxuICApO1xyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgQ3VzdG9tSW1hZ2VVcGxvYWRDb21wb25lbnQ7XHJcbiIsImltcG9ydCBSZWFjdCwgeyBDaGFuZ2VFdmVudCwgRm9ybUV2ZW50LCBTeW50aGV0aWNFdmVudCB9IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0IHsgQXBpQ2xpZW50LCB1c2VOb3RpY2UgfSBmcm9tICdhZG1pbmpzJztcclxuaW1wb3J0IHsgdXNlTmF2aWdhdGUgfSBmcm9tICdyZWFjdC1yb3V0ZXItZG9tJztcclxuaW1wb3J0IGF4aW9zIGZyb20gJ2F4aW9zJztcclxuaW1wb3J0IHsgQm94LCBCdXR0b24sIElucHV0LCBMYWJlbCwgVGV4dCwgQ2hlY2tCb3ggfSBmcm9tICdAYWRtaW5qcy9kZXNpZ24tc3lzdGVtJztcclxuaW1wb3J0IHsgQmFzZVByb3BlcnR5UHJvcHMsIEFjdGlvblByb3BzIH0gZnJvbSAnYWRtaW5qcyc7XHJcblxyXG5jb25zdCBJbWFnZVVwbG9hZCA9IChwcm9wczogQWN0aW9uUHJvcHMpID0+IHtcclxuICBjb25zdCB7IHJlY29yZCB9ID0gcHJvcHM7XHJcbiAgY29uc3QgW3NlbGVjdGVkRmlsZSwgc2V0U2VsZWN0ZWRGaWxlXSA9IFJlYWN0LnVzZVN0YXRlPEZpbGUgfCBudWxsPihudWxsKTtcclxuICBjb25zdCBbdGl0bGUsIHNldFRpdGxlXSA9IFJlYWN0LnVzZVN0YXRlKCcnKTtcclxuICBjb25zdCBbbGlua1VybCwgc2V0TGlua1VybF0gPSBSZWFjdC51c2VTdGF0ZSgnJyk7XHJcbiAgY29uc3QgW2lzQWN0aXZlLCBzZXRJc0FjdGl2ZV0gPSBSZWFjdC51c2VTdGF0ZSh0cnVlKTtcclxuICBjb25zdCBbbG9hZGluZywgc2V0TG9hZGluZ10gPSBSZWFjdC51c2VTdGF0ZShmYWxzZSk7XHJcbiAgY29uc3QgW2Vycm9yLCBzZXRFcnJvcl0gPSBSZWFjdC51c2VTdGF0ZTxzdHJpbmcgfCBudWxsPignJyk7XHJcbiAgY29uc3QgW3N1Y2Nlc3MsIHNldFN1Y2Nlc3NdID0gUmVhY3QudXNlU3RhdGU8c3RyaW5nIHwgbnVsbD4oJycpO1xyXG4gIGNvbnN0IHNlbmROb3RpY2UgPSB1c2VOb3RpY2UoKTtcclxuICBjb25zdCBuYXZpZ2F0ZSA9IHVzZU5hdmlnYXRlKCk7XHJcbiAgY29uc3QgYXBpID0gbmV3IEFwaUNsaWVudCgpO1xyXG5cclxuICBjb25zdCBoYW5kbGVGaWxlQ2hhbmdlID0gKGV2ZW50OiBDaGFuZ2VFdmVudDxIVE1MSW5wdXRFbGVtZW50PikgPT4ge1xyXG4gICAgY29uc3QgZmlsZSA9IGV2ZW50LnRhcmdldC5maWxlcz8uWzBdO1xyXG5cclxuICAgIGlmIChmaWxlKSB7XHJcbiAgICAgIHNldFNlbGVjdGVkRmlsZShmaWxlKTtcclxuXHJcbiAgICAgIC8vIC8vIFNhdmUgZmlsZSBpbnRvIEFkbWluSlMgZm9ybSBzdGF0ZVxyXG4gICAgfVxyXG4gIH07XHJcbiAgY29uc3QgaGFuZGxlTGlua1VybENoYW5nZSA9IChldmVudDogQ2hhbmdlRXZlbnQ8SFRNTElucHV0RWxlbWVudD4pID0+IHtcclxuICAgIHNldExpbmtVcmwoZXZlbnQudGFyZ2V0LnZhbHVlKTtcclxuICB9O1xyXG5cclxuICBjb25zdCBoYW5kbGVUaXRsZUNoYW5nZSA9IChldmVudDogQ2hhbmdlRXZlbnQ8SFRNTElucHV0RWxlbWVudD4pID0+IHtcclxuICAgIHNldFRpdGxlKGV2ZW50LnRhcmdldC52YWx1ZSk7XHJcbiAgfTtcclxuXHJcbiAgY29uc3QgaGFuZGxlVXBsb2FkID0gYXN5bmMgKGV2ZW50OiBTeW50aGV0aWNFdmVudCkgPT4ge1xyXG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuXHJcbiAgICBzZXRFcnJvcignJyk7XHJcbiAgICBzZXRTdWNjZXNzKCcnKTtcclxuXHJcbiAgICBpZiAoIXNlbGVjdGVkRmlsZSkgcmV0dXJuO1xyXG5cclxuICAgIHRyeSB7XHJcbiAgICAgIHNldExvYWRpbmcodHJ1ZSk7XHJcblxyXG4gICAgICBjb25zdCBmb3JtRGF0YSA9IG5ldyBGb3JtRGF0YSgpO1xyXG5cclxuICAgICAgZm9ybURhdGEuYXBwZW5kKCdpbWFnZScsIHNlbGVjdGVkRmlsZSk7XHJcblxyXG4gICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGF4aW9zLnBvc3QoJy9wb3B1cCcsIGZvcm1EYXRhLCB7XHJcbiAgICAgICAgaGVhZGVyczoge1xyXG4gICAgICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdtdWx0aXBhcnQvZm9ybS1kYXRhJyxcclxuICAgICAgICB9LFxyXG4gICAgICB9KTtcclxuICAgICAgY29uc29sZS5sb2coJ1VwbG9hZCBzdWNjZXNzZnVsOicsIHJlc3BvbnNlLmRhdGEpO1xyXG4gICAgICBhd2FpdCBhcGkucmVzb3VyY2VBY3Rpb24oe1xyXG4gICAgICAgIHJlc291cmNlSWQ6ICdQb3B1cCcsXHJcbiAgICAgICAgYWN0aW9uTmFtZTogJ25ldycsXHJcbiAgICAgICAgZGF0YToge1xyXG4gICAgICAgICAgdGl0bGUsXHJcbiAgICAgICAgICBsaW5rVXJsOiBsaW5rVXJsLFxyXG4gICAgICAgICAgaW1hZ2VVcmw6IHJlc3BvbnNlLmRhdGEudXJsLFxyXG4gICAgICAgICAgY2xvdWRpbmFyeVB1YmxpY0lkOiByZXNwb25zZS5kYXRhLnB1YmxpY19pZCxcclxuICAgICAgICAgIGlzQWN0aXZlLFxyXG4gICAgICAgIH0sXHJcbiAgICAgIH0pO1xyXG4gICAgICBzZW5kTm90aWNlKHtcclxuICAgICAgICBtZXNzYWdlOiAnSW1hZ2UgdXBsb2FkZWQgc3VjY2Vzc2Z1bGx5JyxcclxuICAgICAgICB0eXBlOiAnc3VjY2VzcycsXHJcbiAgICAgIH0pO1xyXG5cclxuICAgICAgbmF2aWdhdGUoJy9hZG1pbi9yZXNvdXJjZXMvUG9wdXAnKTtcclxuICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgIGNvbnNvbGUuZXJyb3IoJ1VwbG9hZCBmYWlsZWQ6JywgZXJyb3IpO1xyXG4gICAgICBzZXRFcnJvcignRmFpbGVkIHRvIHVwbG9hZCBpbWFnZS4gUGxlYXNlIHRyeSBhZ2Fpbi4nKTtcclxuICAgIH0gZmluYWxseSB7XHJcbiAgICAgIHNldExvYWRpbmcoZmFsc2UpO1xyXG4gICAgfVxyXG4gIH07XHJcblxyXG4gIHJldHVybiAoXHJcbiAgICA8Qm94IGJhY2tncm91bmRDb2xvcj1cIndoaXRlXCIgcD17MzJ9IGJvcmRlclJhZGl1cz17NH0gYm94U2hhZG93PVwiY2FyZFwiPlxyXG4gICAgICA8Zm9ybSBzdHlsZT17eyBkaXNwbGF5OiAnZmxleCcsIGZsZXhEaXJlY3Rpb246ICdjb2x1bW4nLCBhbGlnbkl0ZW1zOiAnY2VudGVyJywgZ2FwOiAxNiB9fSBvblN1Ym1pdD17aGFuZGxlVXBsb2FkfT5cclxuICAgICAgICA8Qm94XHJcbiAgICAgICAgICB3aWR0aD17MX1cclxuICAgICAgICAgIGJvcmRlcj1cIjFweCBkYXNoZWQgI2JiYlwiXHJcbiAgICAgICAgICBib3JkZXJSYWRpdXM9XCIxMnB4XCJcclxuICAgICAgICAgIGhlaWdodD1cIjM1MHB4XCJcclxuICAgICAgICAgIGRpc3BsYXk9XCJmbGV4XCJcclxuICAgICAgICAgIGFsaWduSXRlbXM9XCJjZW50ZXJcIlxyXG4gICAgICAgICAganVzdGlmeUNvbnRlbnQ9XCJjZW50ZXJcIlxyXG4gICAgICAgICAgYmFja2dyb3VuZENvbG9yPVwiI2ZhZmFmYVwiXHJcbiAgICAgICAgICBwPXs4fVxyXG4gICAgICAgID5cclxuICAgICAgICAgIDxMYWJlbFxyXG4gICAgICAgICAgICBodG1sRm9yPVwiaW1hZ2UtdXBsb2FkXCJcclxuICAgICAgICAgICAgc3R5bGU9e3tcclxuICAgICAgICAgICAgICB3aWR0aDogJzEwMCUnLFxyXG4gICAgICAgICAgICAgIGhlaWdodDogJzEwMCUnLFxyXG4gICAgICAgICAgICAgIGN1cnNvcjogJ3BvaW50ZXInLFxyXG4gICAgICAgICAgICAgIGRpc3BsYXk6ICdmbGV4JyxcclxuICAgICAgICAgICAgICBhbGlnbkl0ZW1zOiAnY2VudGVyJyxcclxuICAgICAgICAgICAgICBqdXN0aWZ5Q29udGVudDogJ2NlbnRlcicsXHJcbiAgICAgICAgICAgIH19XHJcbiAgICAgICAgICA+XHJcbiAgICAgICAgICAgIHtzZWxlY3RlZEZpbGUgPyAoXHJcbiAgICAgICAgICAgICAgPD5cclxuICAgICAgICAgICAgICAgIDxpbWdcclxuICAgICAgICAgICAgICAgICAgc3JjPXtVUkwuY3JlYXRlT2JqZWN0VVJMKHNlbGVjdGVkRmlsZSl9XHJcbiAgICAgICAgICAgICAgICAgIGFsdD1cIlByZXZpZXdcIlxyXG4gICAgICAgICAgICAgICAgICBzdHlsZT17eyB3aWR0aDogJzEwMCUnLCBoZWlnaHQ6ICcxMDAlJywgb2JqZWN0Rml0OiAnY29udGFpbicgfX1cclxuICAgICAgICAgICAgICAgIC8+XHJcbiAgICAgICAgICAgICAgPC8+XHJcbiAgICAgICAgICAgICkgOiAoXHJcbiAgICAgICAgICAgICAgPFRleHQ+VXBsb2FkIEltYWdlPC9UZXh0PlxyXG4gICAgICAgICAgICApfVxyXG4gICAgICAgICAgPC9MYWJlbD5cclxuXHJcbiAgICAgICAgICA8SW5wdXRcclxuICAgICAgICAgICAgaWQ9XCJpbWFnZS11cGxvYWRcIlxyXG4gICAgICAgICAgICB0eXBlPVwiZmlsZVwiXHJcbiAgICAgICAgICAgIGFjY2VwdD1cImltYWdlLypcIlxyXG4gICAgICAgICAgICBvbkNoYW5nZT17aGFuZGxlRmlsZUNoYW5nZX1cclxuICAgICAgICAgICAgc3R5bGU9e3sgZGlzcGxheTogJ25vbmUnIH19XHJcbiAgICAgICAgICAgIHJlcXVpcmVkXHJcbiAgICAgICAgICAvPlxyXG4gICAgICAgIDwvQm94PlxyXG5cclxuICAgICAgICA8Qm94IHdpZHRoPXsxfT5cclxuICAgICAgICAgIDxMYWJlbCBodG1sRm9yPVwidGl0bGVcIiBzdHlsZT17eyBkaXNwbGF5OiAnZmxleCcsIGFsaWduSXRlbXM6ICdjZW50ZXInLCBnYXA6IDIgfX0+XHJcbiAgICAgICAgICAgIDxUZXh0IHZhcmlhbnQ9XCJwcmltYXJ5XCIgY29sb3I9XCJwcmltYXJ5MTAwXCI+XHJcbiAgICAgICAgICAgICAgKlxyXG4gICAgICAgICAgICA8L1RleHQ+XHJcbiAgICAgICAgICAgIFRpdGxlXHJcbiAgICAgICAgICA8L0xhYmVsPlxyXG4gICAgICAgICAgPElucHV0XHJcbiAgICAgICAgICAgIHdpZHRoPXsxfVxyXG4gICAgICAgICAgICB2YXJpYW50PVwiZGVmYXVsdFwiXHJcbiAgICAgICAgICAgIHR5cGU9XCJ0ZXh0XCJcclxuICAgICAgICAgICAgaWQ9XCJ0aXRsZVwiXHJcbiAgICAgICAgICAgIHZhbHVlPXt0aXRsZX1cclxuICAgICAgICAgICAgb25DaGFuZ2U9e2hhbmRsZVRpdGxlQ2hhbmdlfVxyXG4gICAgICAgICAgICByZXF1aXJlZFxyXG4gICAgICAgICAgLz5cclxuICAgICAgICA8L0JveD5cclxuXHJcbiAgICAgICAgPEJveCB3aWR0aD17MX0+XHJcbiAgICAgICAgICA8TGFiZWwgaHRtbEZvcj1cImxpbmtVcmxcIiBzdHlsZT17eyBkaXNwbGF5OiAnZmxleCcsIGFsaWduSXRlbXM6ICdjZW50ZXInLCBnYXA6IDIgfX0+XHJcbiAgICAgICAgICAgIExpbmsgVXJsXHJcbiAgICAgICAgICA8L0xhYmVsPlxyXG4gICAgICAgICAgPElucHV0IHdpZHRoPXsxfSB2YXJpYW50PVwiZGVmYXVsdFwiIHR5cGU9XCJ0ZXh0XCIgaWQ9XCJsaW5rVXJsXCIgdmFsdWU9e2xpbmtVcmx9IG9uQ2hhbmdlPXtoYW5kbGVMaW5rVXJsQ2hhbmdlfSAvPlxyXG4gICAgICAgIDwvQm94PlxyXG4gICAgICAgIDxCb3ggd2lkdGg9ezF9IGRpc3BsYXk9XCJmbGV4XCIgYWxpZ25JdGVtcz1cImNlbnRlclwiIGdhcD17Mn0+XHJcbiAgICAgICAgICA8Q2hlY2tCb3ggaWQ9XCJpc0FjdGl2ZVwiIGNoZWNrZWQ9e2lzQWN0aXZlfSBvbkNsaWNrPXsoKSA9PiBzZXRJc0FjdGl2ZSghaXNBY3RpdmUpfSAvPlxyXG4gICAgICAgICAgPExhYmVsIGh0bWxGb3I9XCJpc0FjdGl2ZVwiPklzIEFjdGl2ZTwvTGFiZWw+XHJcbiAgICAgICAgPC9Cb3g+XHJcbiAgICAgICAgPEJ1dHRvbiB0eXBlPVwic3VibWl0XCIgdmFyaWFudD1cImNvbnRhaW5lZFwiIGxhYmVsPXtsb2FkaW5nID8gJ1VwbG9hZGluZy4uLicgOiAnVXBsb2FkJ30gZGlzYWJsZWQ9e2xvYWRpbmd9IC8+XHJcbiAgICAgIDwvZm9ybT5cclxuICAgIDwvQm94PlxyXG4gICk7XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBJbWFnZVVwbG9hZDtcclxuIiwiaW1wb3J0IFJlYWN0LCB7IHVzZVN0YXRlLCB1c2VFZmZlY3QgfSBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCB7IEJveCwgQnV0dG9uLCBMYWJlbCwgSW5wdXQsIEZvcm1Hcm91cCB9IGZyb20gJ0BhZG1pbmpzL2Rlc2lnbi1zeXN0ZW0nO1xyXG5pbXBvcnQgeyBCYXNlUHJvcGVydHlQcm9wcyB9IGZyb20gJ2FkbWluanMnO1xyXG5cclxuY29uc3QgQ2hhbmdlQWRtaW5QYXNzd29yZCA9IChwcm9wczogQmFzZVByb3BlcnR5UHJvcHMpID0+IHtcclxuICBjb25zdCB7IG9uQ2hhbmdlLCBwcm9wZXJ0eSwgcmVjb3JkIH0gPSBwcm9wcztcclxuICBjb25zdCBpc0VkaXQgPSAhIXJlY29yZD8uaWQ7XHJcbiAgY29uc3QgW3Nob3dGb3JtLCBzZXRTaG93Rm9ybV0gPSB1c2VTdGF0ZSghaXNFZGl0KTtcclxuICBjb25zdCBbcGFzc3dvcmQsIHNldFBhc3N3b3JkXSA9IHVzZVN0YXRlKCcnKTtcclxuXHJcbiAgY29uc3QgaGFuZGxlQ2hhbmdlUGFzc3dvcmRDaGFuZ2UgPSAoZTogUmVhY3QuQ2hhbmdlRXZlbnQ8SFRNTElucHV0RWxlbWVudD4pID0+IHtcclxuICAgIGNvbnN0IHZhbHVlID0gZS50YXJnZXQudmFsdWU7XHJcbiAgICBzZXRQYXNzd29yZCh2YWx1ZSk7XHJcbiAgICBvbkNoYW5nZT8uKHByb3BlcnR5Lm5hbWUsIGUudGFyZ2V0LnZhbHVlKTtcclxuICB9O1xyXG5cclxuICBjb25zdCBoYW5kbGVDaGFuZ2VQYXNzd29yZENsaWNrID0gKGU6IFJlYWN0Lk1vdXNlRXZlbnQpID0+IHtcclxuICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbiAgICBzZXRTaG93Rm9ybSghc2hvd0Zvcm0pO1xyXG4gIH07XHJcblxyXG4gIGNvbnN0IGhhbmRsZUNhbmNlbCA9IChlOiBSZWFjdC5Nb3VzZUV2ZW50KSA9PiB7XHJcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgc2V0U2hvd0Zvcm0oZmFsc2UpO1xyXG4gICAgb25DaGFuZ2U/Lihwcm9wZXJ0eS5uYW1lLCAnJyk7XHJcbiAgfTtcclxuXHJcbiAgdXNlRWZmZWN0KCgpID0+IHtcclxuICAgIGlmICghaXNFZGl0KSB7XHJcbiAgICAgIHNldFBhc3N3b3JkKHJlY29yZD8ucGFyYW1zPy5bcHJvcGVydHkubmFtZV0gfHwgJycpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgc2V0UGFzc3dvcmQoJycpO1xyXG4gICAgfVxyXG4gIH0sIFtyZWNvcmQ/LmlkXSk7XHJcblxyXG4gIHJldHVybiAoXHJcbiAgICA8Qm94IHdpZHRoPXsxfSBmbGV4IGZsZXhEaXJlY3Rpb249XCJjb2x1bW5cIiBhbGlnbkl0ZW1zPVwiY2VudGVyXCIgZ2FwPXsyfT5cclxuICAgICAge3Nob3dGb3JtICYmIChcclxuICAgICAgICA8Qm94IHdpZHRoPXsxfSBmbGV4IGZsZXhEaXJlY3Rpb249XCJjb2x1bW5cIiBhbGlnbkl0ZW1zPVwiY2VudGVyXCIgZ2FwPXsyfT5cclxuICAgICAgICAgIHsvKiA8Qm94IHdpZHRoPXsxfSBtYXJnaW5Cb3R0b209ezMyfT5cclxuICAgICAgICAgICAgPExhYmVsIGh0bWxGb3I9XCJvbGRQYXNzd29yZFwiPk9sZCBQYXNzd29yZDwvTGFiZWw+XHJcbiAgICAgICAgICAgIDxpbnB1dFxyXG4gICAgICAgICAgICAgIGlkPVwib2xkUGFzc3dvcmRcIlxyXG4gICAgICAgICAgICAgIHR5cGU9XCJwYXNzd29yZFwiXHJcbiAgICAgICAgICAgICAgdmFsdWU9e29sZFBhc3N3b3JkfVxyXG4gICAgICAgICAgICAgIG9uQ2hhbmdlPXsoZSkgPT4gc2V0T2xkUGFzc3dvcmQoZS50YXJnZXQudmFsdWUpfVxyXG4gICAgICAgICAgICAgIHJlcXVpcmVkXHJcbiAgICAgICAgICAgICAgc3R5bGU9e3tcclxuICAgICAgICAgICAgICAgIHdpZHRoOiAnMTAwJScsXHJcbiAgICAgICAgICAgICAgICBwYWRkaW5nOiAnOHB4JyxcclxuICAgICAgICAgICAgICAgIGJvcmRlclJhZGl1czogJzRweCcsXHJcbiAgICAgICAgICAgICAgICBib3JkZXI6ICcxcHggc29saWQgI2RkZCcsXHJcbiAgICAgICAgICAgICAgICBib3hTaXppbmc6ICdib3JkZXItYm94JyxcclxuICAgICAgICAgICAgICB9fVxyXG4gICAgICAgICAgICAvPlxyXG4gICAgICAgICAgPC9Cb3g+ICovfVxyXG5cclxuICAgICAgICAgIDxGb3JtR3JvdXAgd2lkdGg9ezF9IG1hcmdpbkJvdHRvbT17MzJ9PlxyXG4gICAgICAgICAgICA8TGFiZWwgaHRtbEZvcj1cIm5ld1Bhc3N3b3JkXCIgcmVxdWlyZWQ+XHJcbiAgICAgICAgICAgICAgTmV3IFBhc3N3b3JkXHJcbiAgICAgICAgICAgIDwvTGFiZWw+XHJcbiAgICAgICAgICAgIDxJbnB1dFxyXG4gICAgICAgICAgICAgIGlkPVwibmV3UGFzc3dvcmRcIlxyXG4gICAgICAgICAgICAgIHR5cGU9XCJwYXNzd29yZFwiXHJcbiAgICAgICAgICAgICAgdmFsdWU9e3Bhc3N3b3JkfVxyXG4gICAgICAgICAgICAgIG9uQ2hhbmdlPXtoYW5kbGVDaGFuZ2VQYXNzd29yZENoYW5nZX1cclxuICAgICAgICAgICAgICB2YXJpYW50PVwiZGVmYXVsdFwiXHJcbiAgICAgICAgICAgICAgd2lkdGg9ezF9XHJcbiAgICAgICAgICAgICAgcmVxdWlyZWRcclxuICAgICAgICAgICAgLz5cclxuICAgICAgICAgIDwvRm9ybUdyb3VwPlxyXG5cclxuICAgICAgICAgIHsvKiAvLyA8Qm94IHdpZHRoPXsxfSBtYXJnaW5Cb3R0b209ezMyfT5cclxuICAgICAgICAgIC8vICAgPExhYmVsIGh0bWxGb3I9XCJjb25maXJtUGFzc3dvcmRcIj5Db25maXJtIFBhc3N3b3JkPC9MYWJlbD5cclxuICAgICAgICAgIC8vICAgPGlucHV0XHJcbiAgICAgICAgICAvLyAgICAgaWQ9XCJjb25maXJtUGFzc3dvcmRcIlxyXG4gICAgICAgICAgLy8gICAgIHR5cGU9XCJwYXNzd29yZFwiXHJcbiAgICAgICAgICAvLyAgICAgdmFsdWU9e2NvbmZpcm1QYXNzd29yZH1cclxuICAgICAgICAgIC8vICAgICBvbkNoYW5nZT17KGUpID0+IHNldENvbmZpcm1QYXNzd29yZChlLnRhcmdldC52YWx1ZSl9XHJcbiAgICAgICAgICAvLyAgICAgcmVxdWlyZWRcclxuICAgICAgICAgIC8vICAgICBzdHlsZT17e1xyXG4gICAgICAgICAgLy8gICAgICAgd2lkdGg6ICcxMDAlJyxcclxuICAgICAgICAgIC8vICAgICAgIHBhZGRpbmc6ICc4cHgnLFxyXG4gICAgICAgICAgLy8gICAgICAgYm9yZGVyUmFkaXVzOiAnNHB4JyxcclxuICAgICAgICAgIC8vICAgICAgIGJvcmRlcjogJzFweCBzb2xpZCAjZGRkJyxcclxuICAgICAgICAgIC8vICAgICAgIGJveFNpemluZzogJ2JvcmRlci1ib3gnLFxyXG4gICAgICAgICAgLy8gICAgIH19XHJcbiAgICAgICAgICAvLyAgIC8+XHJcbiAgICAgICAgICAvLyA8L0JveD4gKi99XHJcbiAgICAgICAgICB7aXNFZGl0ICYmIChcclxuICAgICAgICAgICAgPEJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgb25DbGljaz17aGFuZGxlQ2FuY2VsfSB2YXJpYW50PVwiZGVmYXVsdFwiPlxyXG4gICAgICAgICAgICAgIENhbmNlbFxyXG4gICAgICAgICAgICA8L0J1dHRvbj5cclxuICAgICAgICAgICl9XHJcbiAgICAgICAgPC9Cb3g+XHJcbiAgICAgICl9XHJcbiAgICAgIHshc2hvd0Zvcm0gJiYgKFxyXG4gICAgICAgIDxCdXR0b24gdHlwZT1cImJ1dHRvblwiIG1hcmdpbkJvdHRvbT17MzJ9IG9uQ2xpY2s9e2hhbmRsZUNoYW5nZVBhc3N3b3JkQ2xpY2t9PlxyXG4gICAgICAgICAgQ2hhbmdlIFBhc3N3b3JkXHJcbiAgICAgICAgPC9CdXR0b24+XHJcbiAgICAgICl9XHJcbiAgICA8L0JveD5cclxuICApO1xyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgQ2hhbmdlQWRtaW5QYXNzd29yZDtcclxuIiwiQWRtaW5KUy5Vc2VyQ29tcG9uZW50cyA9IHt9XG5pbXBvcnQgRGFzaGJvYXJkIGZyb20gJy4uL3NyYy9jb21wb25lbnRzL0N1c3RvbURhc2hib2FyZCdcbkFkbWluSlMuVXNlckNvbXBvbmVudHMuRGFzaGJvYXJkID0gRGFzaGJvYXJkXG5pbXBvcnQgQ3VzdG9tR2FsbGVyeVVwbG9hZENvbXBvbmVudCBmcm9tICcuLi9zcmMvY29tcG9uZW50cy9DdXN0b21HYWxsZXJ5VXBsb2FkQ29tcG9uZW50J1xuQWRtaW5KUy5Vc2VyQ29tcG9uZW50cy5DdXN0b21HYWxsZXJ5VXBsb2FkQ29tcG9uZW50ID0gQ3VzdG9tR2FsbGVyeVVwbG9hZENvbXBvbmVudFxuaW1wb3J0IEN1c3RvbVNob3cgZnJvbSAnLi4vc3JjL2NvbXBvbmVudHMvQ3VzdG9tU2hvdydcbkFkbWluSlMuVXNlckNvbXBvbmVudHMuQ3VzdG9tU2hvdyA9IEN1c3RvbVNob3dcbmltcG9ydCBSYW5kb21QaWN0dXJlIGZyb20gJy4uL3NyYy9jb21wb25lbnRzL1JhbmRvbVBpY3R1cmUnXG5BZG1pbkpTLlVzZXJDb21wb25lbnRzLlJhbmRvbVBpY3R1cmUgPSBSYW5kb21QaWN0dXJlXG5pbXBvcnQgQ3VzdG9tSW1hZ2VVcGxvYWRDb21wb25lbnQgZnJvbSAnLi4vc3JjL2NvbXBvbmVudHMvQ3VzdG9tSW1hZ2VVcGxvYWRDb21wb25lbnQnXG5BZG1pbkpTLlVzZXJDb21wb25lbnRzLkN1c3RvbUltYWdlVXBsb2FkQ29tcG9uZW50ID0gQ3VzdG9tSW1hZ2VVcGxvYWRDb21wb25lbnRcbmltcG9ydCBDdXN0b21Qb3B1cFVwbG9hZENvbXBvbmVudCBmcm9tICcuLi9zcmMvY29tcG9uZW50cy9DdXN0b21Qb3B1cFVwbG9hZENvbXBvbmVudCdcbkFkbWluSlMuVXNlckNvbXBvbmVudHMuQ3VzdG9tUG9wdXBVcGxvYWRDb21wb25lbnQgPSBDdXN0b21Qb3B1cFVwbG9hZENvbXBvbmVudFxuaW1wb3J0IEN1c3RvbVBhc3N3b3JkRWRpdENvbXBvbmVudCBmcm9tICcuLi9zcmMvY29tcG9uZW50cy9DdXN0b21BZG1pblBhc3N3b3JkQ29tcG9uZW50J1xuQWRtaW5KUy5Vc2VyQ29tcG9uZW50cy5DdXN0b21QYXNzd29yZEVkaXRDb21wb25lbnQgPSBDdXN0b21QYXNzd29yZEVkaXRDb21wb25lbnQiXSwibmFtZXMiOlsiQ3VzdG9tRGFzaGJvYXJkIiwidHJhbnNsYXRlIiwidXNlVHJhbnNsYXRpb24iLCJSZWFjdCIsImNyZWF0ZUVsZW1lbnQiLCJCb3giLCJ3aWR0aCIsInRleHRBbGlnbiIsInBhZGRpbmciLCJiZyIsImlzRnVuY3Rpb24iLCJ1dGlscyIsIkF4aW9zSGVhZGVycyIsIkF4aW9zRXJyb3IiLCJ0b0Zvcm1EYXRhIiwiZW5jb2RlIiwiVVJMU2VhcmNoUGFyYW1zIiwiRm9ybURhdGEiLCJCbG9iIiwicGxhdGZvcm0iLCJpc0NhbmNlbCIsIm1lcmdlQ29uZmlnIiwiQ2FuY2VsZWRFcnJvciIsIlZFUlNJT04iLCJmZXRjaEFkYXB0ZXIuZ2V0RmV0Y2giLCJnZXRBZGFwdGVyIiwidmFsaWRhdG9ycyIsIkF4aW9zIiwic3ByZWFkIiwiaXNBeGlvc0Vycm9yIiwiSHR0cFN0YXR1c0NvZGUiLCJDYW5jZWxUb2tlbiIsIkltYWdlVXBsb2FkIiwicHJvcHMiLCJyZWNvcmQiLCJzZWxlY3RlZEZpbGUiLCJzZXRTZWxlY3RlZEZpbGUiLCJ1c2VTdGF0ZSIsInRpdGxlIiwic2V0VGl0bGUiLCJkZXNjcmlwdGlvbiIsInNldERlc2NyaXB0aW9uIiwibG9hZGluZyIsInNldExvYWRpbmciLCJlcnJvciIsInNldEVycm9yIiwic3VjY2VzcyIsInNldFN1Y2Nlc3MiLCJzZW5kTm90aWNlIiwidXNlTm90aWNlIiwibmF2aWdhdGUiLCJ1c2VOYXZpZ2F0ZSIsImFwaSIsIkFwaUNsaWVudCIsImhhbmRsZUZpbGVDaGFuZ2UiLCJldmVudCIsImZpbGUiLCJ0YXJnZXQiLCJmaWxlcyIsImhhbmRsZVRpdGxlQ2hhbmdlIiwidmFsdWUiLCJoYW5kbGVEZXNjcmlwdGlvbkNoYW5nZSIsImhhbmRsZVVwbG9hZCIsInByZXZlbnREZWZhdWx0IiwiZm9ybURhdGEiLCJhcHBlbmQiLCJyZXNwb25zZSIsImF4aW9zIiwicG9zdCIsImhlYWRlcnMiLCJjb25zb2xlIiwibG9nIiwiZGF0YSIsInJlc291cmNlQWN0aW9uIiwicmVzb3VyY2VJZCIsImFjdGlvbk5hbWUiLCJpbWFnZVVybCIsInVybCIsImNsb3VkaW5hcnlQdWJsaWNJZCIsInB1YmxpY19pZCIsIm1lc3NhZ2UiLCJ0eXBlIiwiYmFja2dyb3VuZENvbG9yIiwicCIsImJvcmRlclJhZGl1cyIsImJveFNoYWRvdyIsInN0eWxlIiwiZGlzcGxheSIsImZsZXhEaXJlY3Rpb24iLCJhbGlnbkl0ZW1zIiwiZ2FwIiwib25TdWJtaXQiLCJib3JkZXIiLCJoZWlnaHQiLCJqdXN0aWZ5Q29udGVudCIsIkxhYmVsIiwiaHRtbEZvciIsImN1cnNvciIsIkZyYWdtZW50Iiwic3JjIiwiVVJMIiwiY3JlYXRlT2JqZWN0VVJMIiwiYWx0Iiwib2JqZWN0Rml0IiwiVGV4dCIsIklucHV0IiwiaWQiLCJhY2NlcHQiLCJvbkNoYW5nZSIsInJlcXVpcmVkIiwidmFyaWFudCIsImNvbG9yIiwiVGV4dEFyZWEiLCJCdXR0b24iLCJsYWJlbCIsImRpc2FibGVkIiwiQ3VzdG9tU2hvdyIsImZsZXgiLCJtYXJnaW5CbG9jayIsInBhcmFtcyIsIm1hcmdpbklubGluZSIsIlJhbmRvbVBpY3R1cmUiLCJDdXN0b21JbWFnZVVwbG9hZENvbXBvbmVudCIsIm1hcmdpbkJvdHRvbSIsImxpbmtVcmwiLCJzZXRMaW5rVXJsIiwiaXNBY3RpdmUiLCJzZXRJc0FjdGl2ZSIsImhhbmRsZUxpbmtVcmxDaGFuZ2UiLCJDaGVja0JveCIsImNoZWNrZWQiLCJvbkNsaWNrIiwiQ2hhbmdlQWRtaW5QYXNzd29yZCIsInByb3BlcnR5IiwiaXNFZGl0Iiwic2hvd0Zvcm0iLCJzZXRTaG93Rm9ybSIsInBhc3N3b3JkIiwic2V0UGFzc3dvcmQiLCJoYW5kbGVDaGFuZ2VQYXNzd29yZENoYW5nZSIsImUiLCJuYW1lIiwiaGFuZGxlQ2hhbmdlUGFzc3dvcmRDbGljayIsInN0b3BQcm9wYWdhdGlvbiIsImhhbmRsZUNhbmNlbCIsInVzZUVmZmVjdCIsIkZvcm1Hcm91cCIsIkFkbWluSlMiLCJVc2VyQ29tcG9uZW50cyIsIkRhc2hib2FyZCIsIkN1c3RvbUdhbGxlcnlVcGxvYWRDb21wb25lbnQiLCJDdXN0b21Qb3B1cFVwbG9hZENvbXBvbmVudCIsIkN1c3RvbVBhc3N3b3Jk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LEVBbUJYeUIsTUFBTSxpQkFDTG5JLHNCQUFBLENBQUFDLGFBQUEsQ0FBQzZHLG1CQUFNLEVBQUE7RUFBQ2hDLElBQUFBLElBQUksRUFBQyxRQUFRO0VBQUNrRCxJQUFBQSxPQUFPLEVBQUVhLFlBQWE7RUFBQ2xDLElBQUFBLE9BQU8sRUFBQztLQUFTLEVBQUMsUUFFdkQsQ0FFUCxDQUNOLEVBQ0EsQ0FBQ3lCLFFBQVEsaUJBQ1JwSSxzQkFBQSxDQUFBQyxhQUFBLENBQUM2RyxtQkFBTSxFQUFBO0VBQUNoQyxJQUFBQSxJQUFJLEVBQUMsUUFBUTtFQUFDMEMsSUFBQUEsWUFBWSxFQUFFLEVBQUc7RUFBQ1EsSUFBQUEsT0FBTyxFQUFFVztLQUEwQixFQUFDLGlCQUVwRSxDQUVQLENBQUM7RUFFVixDQUFDOztFQ3pHREssT0FBTyxDQUFDQyxjQUFjLEdBQUcsRUFBRTtFQUUzQkQsT0FBTyxDQUFDQyxjQUFjLENBQUNDLFNBQVMsR0FBR0EsZUFBUztFQUU1Q0YsT0FBTyxDQUFDQyxjQUFjLENBQUNFLDRCQUE0QixHQUFHQSxhQUE0QjtFQUVsRkgsT0FBTyxDQUFDQyxjQUFjLENBQUNoQyxVQUFVLEdBQUdBLFVBQVU7RUFFOUMrQixPQUFPLENBQUNDLGNBQWMsQ0FBQzNCLGFBQWEsR0FBR0EsYUFBYTtFQUVwRDBCLE9BQU8sQ0FBQ0MsY0FBYyxDQUFDMUIsMEJBQTBCLEdBQUdBLDBCQUEwQjtFQUU5RXlCLE9BQU8sQ0FBQ0MsY0FBYyxDQUFDRywwQkFBMEIsR0FBR0EsV0FBMEI7RUFFOUVKLE9BQU8sQ0FBQ0MsY0FBYyxDQUFDSSwyQkFBMkIsR0FBR0EsbUJBQTJCOzs7Ozs7IiwieF9nb29nbGVfaWdub3JlTGlzdCI6WzEsMiwzLDQsNSw2LDcsOCw5LDEwLDExLDEyLDEzLDE0LDE1LDE2LDE3LDE4LDE5LDIwLDIxLDIyLDIzLDI0LDI1LDI2LDI3LDI4LDI5LDMwLDMxLDMyLDMzLDM0LDM1LDM2LDM3LDM4LDM5LDQwLDQxLDQyLDQzLDQ0LDQ1LDQ2LDQ3LDQ4LDQ5LDUwLDUxXX0=
