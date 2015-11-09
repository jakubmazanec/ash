import isObject from '../internals/isObject';
// import EventListener from '../classes/EventListener';
import attachEvents from './attachEvents';


// var eventListener = new EventListener();

export default function setNodeProperties(node, properties, isNewlyInserted) {
	for (let prop in properties) {
		if (properties.hasOwnProperty(prop)) {
			if (prop === 'style' && isObject(properties[prop])) {
				for (let style in properties[prop]) {
					if (properties[prop].hasOwnProperty(style)) {
						node.style[style] = properties[prop][style];
					}
				}
			} else if (prop === 'events' && isObject(properties[prop])) {
				// eventListener.addEvents(node, properties[prop], isNewlyInserted);
				attachEvents(node, properties[prop], isNewlyInserted);
			} else if (prop === 'className' || prop === 'class') {
				if (typeof node.className === 'string' && properties[prop]) {
					node.className = properties[prop];
				} else if (properties[prop]) {
					node.setAttribute('class', properties[prop]);
				}
			}	else if (!isObject(properties[prop])) {
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
