'use strict';

var _Object$defineProperty = require('babel-runtime/core-js/object/define-property').default;

var _Reflect$ownKeys = require('babel-runtime/core-js/reflect/own-keys').default;

var _Object$getOwnPropertyDescriptor = require('babel-runtime/core-js/object/get-own-property-descriptor').default;

var _Symbol = require('babel-runtime/core-js/symbol').default;

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default').default;

_Object$defineProperty(exports, '__esModule', {
  value: true
});

var _isFunction = require('./isFunction');

var _isFunction2 = _interopRequireDefault(_isFunction);

/**
 *
 * The decorator may be used on classes or methods
 * ```
 * @autobind
 * class FullBound {}
 *
 * class PartBound {
 *   @autobind
 *   method () {}
 * }
 * ```
 */
function autobind() {
  for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  if (args.length === 1) {
    return boundClass.apply(undefined, args);
  } else {
    return boundMethod.apply(undefined, args);
  }
}

/**
 * Use boundMethod to bind all methods on the target.prototype
 */
function boundClass(target) {
  // (Using reflect to get all keys including symbols)
  _Reflect$ownKeys(target.prototype).forEach(function (key) {
    // Ignore special case target method
    if (key === 'constructor') {
      return;
    }

    var descriptor = _Object$getOwnPropertyDescriptor(target.prototype, key);

    // Only methods need binding
    if ((0, _isFunction2.default)(descriptor.value)) {
      _Object$defineProperty(target.prototype, key, boundMethod(target, key, descriptor));
    }
  });

  return target;
}

/**
 * Return a descriptor removing the value and returning a getter
 * The getter will return a .bind version of the function
 * and memoize the result against a symbol on the instance
 */
function boundMethod(target, key, descriptor) {
  var fn = descriptor.value;
  var newKey;

  if (!(0, _isFunction2.default)(fn)) {
    throw new Error('@autobind decorator can only be applied to methods not: ' + typeof fn);
  }

  if (typeof key === 'string') {
    // Add the key to the symbol name for easier debugging
    newKey = _Symbol('@autobind method: ' + key);
  } else if (typeof key === 'symbol') {
    // A symbol cannot be coerced to a string
    newKey = _Symbol('@autobind method: (symbol)');
  } else {
    throw new Error('Unexpected key type: ' + typeof key);
  }

  return {
    configurable: true, // must be true or we could not be changing it
    get: function () {
      if (!this.hasOwnProperty(newKey)) {
        this[newKey] = fn.bind(this);
      }
      return this[newKey];
    }
  };
}

exports.default = autobind;
module.exports = exports.default;