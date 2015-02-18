"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj.default : obj; };

var isObject = _interopRequire(require("../internal/isObject"));

var isArray = _interopRequire(require("../internal/isArray"));

var isFunction = _interopRequire(require("../internal/isFunction"));

var isImmutable = _interopRequire(require("./isImmutable"));

function mergeOnto(target, reference, source) {
	var hasChanged = false;

	//console.log('mergeOnto... ', JSON.stringify(source), ' -> ', JSON.stringify(reference));

	for (var prop in source) {
		if (source.hasOwnProperty(prop) && !isFunction(source[prop])) {
			//console.log('source prop', prop);

			if (isImmutable(source[prop])) {
				//console.log(prop, 'is immutable');
				if (source[prop] !== reference[prop]) {
					target[prop] = source[prop];
					hasChanged = true;
				}
			} else if (isArray(source[prop])) {
				//console.log(prop, 'is array');
				if (source[prop] !== reference[prop]) {
					target[prop] = source[prop];
					hasChanged = true;
				}
			} else if (isObject(source[prop])) {
				//console.log(prop, 'is object');
				if (isImmutable(reference[prop])) {
					//console.log('reference is immutable');
					target[prop] = reference[prop].merge(source[prop]);
					hasChanged = true;
				} /*else if (isObject(reference[prop])) {
      target[prop] = {};
      hasChanged = mergeOnto(target[prop], reference[prop], source[prop]);
      } */else {
					target[prop] = source[prop];
					hasChanged = true;
				}
			} else {
				//console.log(prop, 'is else');
				if (source[prop] !== reference[prop]) {
					target[prop] = source[prop];
					hasChanged = true;
				}
			}
		}
	}

	return hasChanged;
}

module.exports = mergeOnto;