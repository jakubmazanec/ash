'use strict';

var _ = require('_');
var DOMEvents = require('../class/DOMEvents');

var domEvents = new DOMEvents();

function setNodeProperties(node, properties)
{
	_.forOwn(properties, function (value, key, object) {
		if (key == 'style' && _.isObject(value)) {
			$(node).css(value);
		} else if (key == 'events' && _.isObject(value)) {
			domEvents.addEvents(node, value);
			/*_.forOwn(value, function (callback, eventName, object) {
				if (_.isFunction(callback)) {
					domEvents.addEvent(node, eventName, callback);
				}
			});*/
		} else if (key == 'className' || key == 'class') {
			node.className = value;
		}	else if (!_.isObject(value)) {
			// TODO
			if (key.substring(0, 6) == "xlink:") {
				node.setAttributeNS('http://www.w3.org/1999/xlink', key.substring(6), value);
			} else if (key.substring(0, 4) == "xml:") {
				node.setAttributeNS('http://www.w3.org/2000/svg', key.substring(4), value);
			} else {
				if (key == 'checked') {
					node.checked = !!value;
				} else if (key == 'value') {
					node.value = value;
				}

				node.setAttribute(key, value);
			}
		}
	});

	return node;
}

module.exports = setNodeProperties;