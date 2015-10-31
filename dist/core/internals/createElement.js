'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});
exports.default = createElement;

function _interopRequireDefault(obj) {
	return obj && obj.__esModule ? obj : { 'default': obj };
}

var _classesAshNode = require('../classes/AshNode');

var _classesAshNode2 = _interopRequireDefault(_classesAshNode);

var _classesAshElement = require('../classes/AshElement');

var _classesAshElement2 = _interopRequireDefault(_classesAshElement);

var _isAshElement = require('./isAshElement');

var _isAshElement2 = _interopRequireDefault(_isAshElement);

var _constants = require('./constants');

var _constants2 = _interopRequireDefault(_constants);

var _classesComponent = require('../classes/Component');

var _classesComponent2 = _interopRequireDefault(_classesComponent);

var COMPONENT_ASH_ELEMENT = _constants2.default.COMPONENT_ASH_ELEMENT;
var ASH_NODE_ASH_ELEMENT = _constants2.default.ASH_NODE_ASH_ELEMENT;

function iterate(iterable) {
	var result = [];

	if (typeof iterable.__iterator === 'function') {
		var iterator = iterable.__iterator();
		var iterationResult = iterator.next();

		while (!iterationResult.done) {
			result.push(iterationResult.value[1]);

			iterationResult = iterator.next();
		}
	} else if (typeof global.Symbol === 'function' && typeof iterable[global.Symbol.iterator]) {
		var iterator = iterable[global.Symbol.iterator]();
		var iterationResult = iterator.next();

		while (!iterationResult.done) {
			result.push(iterationResult.value);

			iterationResult = iterator.next();
		}
	}

	return result;
}

function createElement(tagName, props /*, children...*/) {
	var children = [];

	if (typeof tagName !== 'string' && typeof tagName === 'function' && _classesComponent2.default.isAncestorOf(tagName)) {
		return new _classesAshElement2.default(COMPONENT_ASH_ELEMENT, tagName, arguments[1]);
	} else if (typeof tagName === 'string' && !tagName.length) {
		throw new Error(tagName + ' (tagName) must be non-empty string or Component class.');
	}

	// type check
	if (tagName && arguments.length === 1) {
		return new _classesAshElement2.default(ASH_NODE_ASH_ELEMENT, _classesAshNode2.default, tagName, null);
	}

	for (var i = 2; i < arguments.length; i++) {
		if (typeof arguments[i] === 'string' || typeof arguments[i] === 'number') {
			children.push(new _classesAshElement2.default(ASH_NODE_ASH_ELEMENT, _classesAshNode2.default, '' + arguments[i]));
		} else if ((0, _isAshElement2.default)(arguments[i])) {
			children.push(arguments[i]);
		} else if (Array.isArray(arguments[i])) {
			for (var j = 0; j < arguments[i].length; j++) {
				if (typeof arguments[i][j] === 'string' || typeof arguments[i] === 'number') {
					children.push(new _classesAshElement2.default(ASH_NODE_ASH_ELEMENT, _classesAshNode2.default, '' + arguments[i][j]));
				} else if ((0, _isAshElement2.default)(arguments[i][j])) {
					children.push(arguments[i][j]);
				}
			}
		} else if (arguments[i] && typeof arguments[i].__iterator === 'function' || arguments[i] && typeof global.Symbol === 'function' && typeof arguments[i][global.Symbol.iterator]) {
			var iteratorResult = iterate(arguments[i]);

			for (var j = 0; j < iteratorResult.length; j++) {
				if (typeof iteratorResult[j] === 'string' || typeof iteratorResult === 'number') {
					children.push(new _classesAshElement2.default(ASH_NODE_ASH_ELEMENT, _classesAshNode2.default, '' + iteratorResult[j]));
				} else if ((0, _isAshElement2.default)(iteratorResult[j])) {
					children.push(iteratorResult[j]);
				}
			}
		}
	}

	return new _classesAshElement2.default(ASH_NODE_ASH_ELEMENT, _classesAshNode2.default, tagName, props, children);
}

module.exports = exports.default;