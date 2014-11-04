'use strict';

var _ = require('_');
var Construct = require('./Construct');
var Descriptor = require('./Descriptor');
var descriptorTypes = require('../constants/descriptorTypes');
var virtualNodeTypes = require('../constants/virtualNodeTypes');
var isDescriptor = require('../internals/isDescriptor');

var VIRTUAL_NODE_DESCRIPTOR = descriptorTypes.VIRTUAL_NODE_DESCRIPTOR;
var VIRTUAL_NODE = virtualNodeTypes.VIRTUAL_NODE;
var VIRTUAL_TEXT_NODE = virtualNodeTypes.VIRTUAL_TEXT_NODE;

var VirtualNode = Construct.extend(
{
	constructor: function (tagName, properties)
	{
		if (typeof properties !== 'undefined')
		{
			this.type = VIRTUAL_NODE;
			this.tagName = tagName.toLowerCase();
			this.properties = properties || {};
			this.children = [];
			this.index = null;
			this.key = null;

			// find element's key
			if (this.properties.key)
			{
				this.key = this.properties.key;
				delete this.properties.key;
			}
		} else
		{
			this.type = VIRTUAL_TEXT_NODE;
			this.text = tagName;
			this.index = null;
		}
	},

	static:
	{
		create: function (tagName, properties, child)
		{
			var props = properties;
			var children = child;
			var i;

			// type check
			if (tagName && typeof props === 'undefined' && !children)
			{
				return new Descriptor(VIRTUAL_NODE_DESCRIPTOR, VirtualNode, [tagName]);
			}

			if (Array.isArray(props))
			{
				children = props;
				props = null;
			} else if (typeof children === 'string')
			{
				children = [children];
			}

			// check type of children
			if (Array.isArray(children))
			{
				for (i = 0; i < children.length; i++)
				{
					if (typeof children[i] === 'string')
					{
						//children[i] = VirtualNode.create(children[i]);
						children[i] = new Descriptor(VIRTUAL_NODE_DESCRIPTOR, VirtualNode, [children[i]]);
					} else if (!children[i])
					{
						children.splice(i, 1);
						i--;
					} else if (!isDescriptor(children[i]))
					{
						throw new Error(children[i] + ' must be a Descriptor object.');
					}
				}
			}

			return new Descriptor(VIRTUAL_NODE_DESCRIPTOR, VirtualNode, [tagName, props], children);
		}
	}
},
{
	extendable: false
});

module.exports = VirtualNode;