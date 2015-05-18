'use strict';

var _Object$defineProperty = require('babel-runtime/core-js/object/define-property').default;

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default').default;

_Object$defineProperty(exports, '__esModule', {
	value: true
});

var _classesEventListener = require('../classes/EventListener');

var _classesEventListener2 = _interopRequireDefault(_classesEventListener);

var eventListener = new _classesEventListener2.default();

function removeNodeProperties(node, properties) {
	for (var i = 0; i < properties.length; i++) {
		var props = properties[i].split('.');

		if (props.length == 1) {
			if (props[0] == 'style') {
				node.removeAttribute('style');
			} else if (props[0] == 'events') {} else if (props[0] == 'className' || props[0] == 'class') {
				if (typeof node.className === 'string') {
					node.className = '';
				} else {
					node.setAttribute('class', '');
				}
			} else {
				if (props[0].substring(0, 6) == 'xlink:') {
					node.removeAttributeNS('http://www.w3.org/1999/xlink', props[0].substring(6));
				} else if (props[0].substring(0, 4) == 'xml:') {
					node.removeAttributeNS('http://www.w3.org/2000/svg', props[0].substring(4));
				} else {
					node.removeAttribute(props[0]);
				}
			}
		} else if (props.length == 2) {
			if (props[0] == 'style') {
				node.style[props[1]] = '';
			} else if (props[0] == 'events') {
				eventListener.removeEvent(node, props[1]);
			}
		}
	}
}

exports.default = removeNodeProperties;
module.exports = exports.default;