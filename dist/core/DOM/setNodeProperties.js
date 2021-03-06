'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});
exports.default = setNodeProperties;

function _interopRequireDefault(obj) {
	return obj && obj.__esModule ? obj : { 'default': obj };
}

var _internalsIsObject = require('../internals/isObject');

var _internalsIsObject2 = _interopRequireDefault(_internalsIsObject);

// import EventListener from '../classes/EventListener';

var _attachEvents = require('./attachEvents');

var _attachEvents2 = _interopRequireDefault(_attachEvents);

// var eventListener = new EventListener();

function setNodeProperties(node, properties, isNewlyInserted) {
	for (var prop in properties) {
		if (properties.hasOwnProperty(prop)) {
			if (prop === 'style' && (0, _internalsIsObject2.default)(properties[prop])) {
				for (var style in properties[prop]) {
					if (properties[prop].hasOwnProperty(style)) {
						node.style[style] = properties[prop][style];
					}
				}
			} else if (prop === 'events' && (0, _internalsIsObject2.default)(properties[prop])) {
				// eventListener.addEvents(node, properties[prop], isNewlyInserted);
				(0, _attachEvents2.default)(node, properties[prop], isNewlyInserted);
			} else if (prop === 'className' || prop === 'class') {
				if (typeof node.className === 'string' && properties[prop]) {
					node.className = properties[prop];
				} else if (properties[prop]) {
					node.setAttribute('class', properties[prop]);
				}
			} else if (!(0, _internalsIsObject2.default)(properties[prop])) {
				if (prop.substring(0, 6) === 'xlink:') {
					node.setAttributeNS('http://www.w3.org/1999/xlink', prop.substring(6), properties[prop]);
				} else if (prop.substring(0, 4) === 'xml:') {
					node.setAttributeNS('http://www.w3.org/2000/svg', prop.substring(4), properties[prop]);
				} else if (prop === 'checked') {
					node.checked = !!properties[prop];

					if (node.checked) {
						node.setAttribute('checked', 'checked');
					} else {
						node.removeAttribute('checked');
					}
				} else if (prop === 'value') {
					node.value = properties[prop];
					node.setAttribute(prop, properties[prop]);
				} else if (prop !== 'key') {
					node.setAttribute(prop, properties[prop]);
				}
			}
		}
	}

	return node;
}

module.exports = exports.default;