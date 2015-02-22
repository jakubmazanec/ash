"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj.default : obj; };

var isObject = _interopRequire(require("../internal/isObject"));

var EventListener = _interopRequire(require("../class/EventListener"));

var eventListener = new EventListener();

function setNodeProperties(node, properties, inserted) {
	for (var prop in properties) {
		if (properties.hasOwnProperty(prop)) {
			if (prop == "style" && isObject(properties[prop])) {
				for (var style in properties[prop]) {
					if (properties[prop].hasOwnProperty(style)) {
						node.style[style] = properties[prop][style];
					}
				}
			} else if (prop === "events" && isObject(properties[prop])) {
				eventListener.addEvents(node, properties[prop], inserted);
			} else if (prop === "className" || prop === "class") {
				node.className = properties[prop];
			} else if (!isObject(properties[prop])) {
				if (prop.substring(0, 6) == "xlink:") {
					node.setAttributeNS("http://www.w3.org/1999/xlink", prop.substring(6), properties[prop]);
				} else if (prop.substring(0, 4) == "xml:") {
					node.setAttributeNS("http://www.w3.org/2000/svg", prop.substring(4), properties[prop]);
				} else {
					if (prop == "checked") {
						node.checked = !!properties[prop];
						if (node.checked) {
							node.setAttribute("checked", "checked");
						} else {
							node.removeAttribute("checked");
						}
					} else if (prop == "value") {
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

module.exports = setNodeProperties;