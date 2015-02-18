import isObject from '../internal/isObject';
import DOMEvents from '../class/DOMEvents';

var domEvents = new DOMEvents();

function setNodeProperties(node, properties, inserted)
{
	for (let key in properties) {
		if (properties.hasOwnProperty(key)) {
			if (key == 'style' && isObject(properties[key])) {
				//node.style.
				// TO DO
			} else if (key == 'events' && isObject(properties[key])) {
				domEvents.addEvents(node, properties[key], inserted);
			} else if (key == 'className' || key == 'class') {
				node.className = properties[key];
			}	else if (!isObject(properties[key])) {
				// TODO
				if (key.substring(0, 6) == 'xlink:') {
					node.setAttributeNS('http://www.w3.org/1999/xlink', key.substring(6), properties[key]);
				} else if (key.substring(0, 4) == 'xml:') {
					node.setAttributeNS('http://www.w3.org/2000/svg', key.substring(4), properties[key]);
				} else {
					if (key == 'checked')
					{
						node.checked = !!properties[key];
						if (node.checked) {
							node.setAttribute('checked', 'checked');
						} else {
							node.removeAttribute('checked');
						}
					} else if (key == 'value')
					{
						node.value = properties[key];
						node.setAttribute(key, properties[key]);
					} else {
						node.setAttribute(key, properties[key]);
					}
				}
			}
		}
	}

	return node;
}

export default setNodeProperties;
