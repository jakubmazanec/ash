"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj.default : obj; };

var isArguments = _interopRequire(require("./isArguments"));

var isArray = _interopRequire(require("./isArray"));

var isIndex = _interopRequire(require("./isIndex"));

var isLength = _interopRequire(require("./isLength"));

var keysIn = _interopRequire(require("./keysIn"));

var support = _interopRequire(require("../support"));

/**
 * A fallback implementation of `Object.keys` which creates an array of the
 * own enumerable property names of `object`.
 *
 * @private
 * @param {Object} object The object to inspect.
 * @returns {Array} Returns the array of property names.
 */
function shimKeys(object) {
  var props = keysIn(object),
      propsLength = props.length,
      length = propsLength && object.length;

  var allowIndexes = length && isLength(length) && (isArray(object) || support.nonEnumArgs && isArguments(object));

  var index = -1,
      result = [];

  while (++index < propsLength) {
    var key = props[index];
    if (allowIndexes && isIndex(key, length) || Object.prototype.hasOwnProperty.call(object, key)) {
      result.push(key);
    }
  }
  return result;
}

module.exports = shimKeys;