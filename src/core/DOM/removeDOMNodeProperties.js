'use strict';

var $ = require('jquery');
var DOMEvents = require('../singletons/DOMEvents');

var domEvents = new DOMEvents();

function removeDOMNodeProperties(node, properties)
{
	var prop;
	var i;

	for (i = 0; i < properties.length; i++)
	{
		prop = properties[i].split('.');
		if (prop.length == 1)
		{
			if (prop[0] == 'style')
			{
				$(node).removeAttr('style');
			} else if (prop[0] == 'events')
			{
				//$(node).off();

			}	else if (prop[0] == 'className' || prop[0] == 'class' )
			{
				node.className = '';
			} else
			{
				//$(node).removeAttr(prop[0]);

				if (prop[0].substring(0, 6) == "xlink:")
				{
					node.removeAttributeNS('http://www.w3.org/1999/xlink', prop[0].substring(6));
				} else if (prop[0].substring(0, 4) == "xml:")
				{
					node.removeAttributeNS('http://www.w3.org/2000/svg', prop[0].substring(4));
				} else
				{
					node.removeAttribute(prop[0]);
				}

			}
		} else if (prop.length == 2)
		{
			if (prop[0] == 'style')
			{
				$(node).css(prop[1], '');
			} else if (prop[0] == 'events')
			{
				//$(node).off(prop[1]);
				domEvents.removeEvent(node, prop[1]);
			} else
			{
				// TODO
			}
		}
	}
}

module.exports = removeDOMNodeProperties;