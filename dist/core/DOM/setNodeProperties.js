'use strict';

var _Object$defineProperty = require('babel-runtime/core-js/object/define-property').default;

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default').default;

_Object$defineProperty(exports, '__esModule', {
	value: true
});

var _internalsIsObject = require('../internals/isObject');

var _internalsIsObject2 = _interopRequireDefault(_internalsIsObject);

var _classesEventListener = require('../classes/EventListener');

var _classesEventListener2 = _interopRequireDefault(_classesEventListener);

var eventListener = new _classesEventListener2.default();

function setNodeProperties(node, properties, inserted) {
	for (var prop in properties) {
		if (properties.hasOwnProperty(prop)) {
			if (prop == 'style' && (0, _internalsIsObject2.default)(properties[prop])) {
				for (var style in properties[prop]) {
					if (properties[prop].hasOwnProperty(style)) {
						node.style[style] = properties[prop][style];
					}
				}
			} else if (prop === 'events' && (0, _internalsIsObject2.default)(properties[prop])) {
				eventListener.addEvents(node, properties[prop], inserted);
			} else if (prop === 'className' || prop === 'class') {
				if (typeof node.className === 'string') {
					node.className = properties[prop];
				} else {
					node.setAttribute('class', properties[prop]);
				}
			} else if (!(0, _internalsIsObject2.default)(properties[prop])) {
				if (prop.substring(0, 6) == 'xlink:') {
					node.setAttributeNS('http://www.w3.org/1999/xlink', prop.substring(6), properties[prop]);
				} else if (prop.substring(0, 4) == 'xml:') {
					node.setAttributeNS('http://www.w3.org/2000/svg', prop.substring(4), properties[prop]);
				} else {
					if (prop == 'checked') {
						node.checked = !!properties[prop];
						if (node.checked) {
							node.setAttribute('checked', 'checked');
						} else {
							node.removeAttribute('checked');
						}
					} else if (prop == 'value') {
						node.value = properties[prop];
						node.setAttribute(prop, properties[prop]);
					} else {
						node.setAttribute(prop, properties[prop]);
					}
				}
			}
		}
	}

	return node;
}

exports.default = setNodeProperties;
module.exports = exports.default;