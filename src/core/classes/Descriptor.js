'use strict';

var _ = require('_');
var Construct = require('./Construct');
var descriptorTypes = require('../constants/descriptorTypes');

var COMPONENT_DESCRIPTOR = descriptorTypes.COMPONENT_DESCRIPTOR;
var VIRTUAL_NODE_DESCRIPTOR = descriptorTypes.VIRTUAL_NODE_DESCRIPTOR;

var Descriptor = Construct.extend(
{
	constructor: function (type, spec, args, children)
	{
		this.type = type;
		this.spec = spec;
		this.args = args || null;
		this.children = children || [];
		this.parent = null;
		this.owner = null;
	},

	static:
	{
		create: function (type, spec/*, args...*/)
		{
			var args;
			var children;

			if (type == COMPONENT_DESCRIPTOR)
			{
				args = [arguments[2]];
			} else if (type == VIRTUAL_NODE_DESCRIPTOR)
			{
				args = [arguments[2], arguments[3]];
				children = arguments[4];
			} else
			{
				throw new Error(type + ' is not correct Descriptor type.');
			}

			return new Descriptor(type, spec, args, children);
		},

		instantiate: function (descriptor)
		{
			if (descriptor.type == COMPONENT_DESCRIPTOR)
			{
				descriptor.instance = new descriptor.spec(descriptor.args[0]);
			} else if (descriptor.type == VIRTUAL_NODE_DESCRIPTOR)
			{
				descriptor.instance = new descriptor.spec(descriptor.args[0], descriptor.args[1]);
			} else
			{
				throw new Error(descriptor + ' is not a Descriptor object instance.');
			}

			descriptor.instance.descriptor = descriptor;

			return descriptor.instance;
		}
	}
});

module.exports = Descriptor;