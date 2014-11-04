'use strict';

var _ = require('_');
var Construct = require('./Construct');
var isDescriptor = require('../internals/isDescriptor');
var isVirtualNodeDescriptor = require('../internals/isVirtualNodeDescriptor');
var componentLifecycle = require('../constants/componentLifecycle');
var findNode = require('../DOM/findNode');

var UNMOUNTED = componentLifecycle.UNMOUNTED;
var MOUNTING = componentLifecycle.MOUNTING;
var MOUNTED = componentLifecycle.MOUNTED;


var Descriptor = require('./Descriptor');
var descriptorTypes = require('../constants/descriptorTypes');

var COMPONENT_DESCRIPTOR = descriptorTypes.COMPONENT_DESCRIPTOR;


var Component = Construct.extend(
{
	constructor: function (props)
	{
		// make sure functions are always bound to this
		_.forIn(this, function (value, key)
		{
			if (_.isFunction(value) && key != 'constructor')
			{
				this[key] = value.bind(this);
			}
		}, this);

		this.props = props || {};
		this.state = this.getInitialState ? this.getInitialState() : {};

		// set state if specified in props
		if (this.props.state)
		{
			_.keys(this.state).forEach(function (key)
			{
				this.props.state[key] = this.state[key];
			}, this);

			delete this.props.state;
		}

		this.__isDirty = true;
		this.__lifecycle = UNMOUNTED;

		// DEBUG
		/*if (typeof this.constructor.__instance !== 'undefined')
		{
			this.constructor.__instance++;
			this.__instance = this.constructor.__instance;
		} else
		{
			this.__instance = this.constructor.__instance = 1;
		}
		this.name = this.name + ' ' + this.__instance;*/
	},

	static:
	{
		create: function (spec)
		{
			if (!_.isObject(spec))
			{
				throw new Error(spec + ' must be Object.');
			}

			var	BaseComponent = this;

			var ChildComponent = function ()
			{
				return BaseComponent.apply(this, arguments);
			};

			var Surrogate = function ()
			{
				this.constructor = ChildComponent;
			};

			Surrogate.prototype = BaseComponent.prototype;
			ChildComponent.prototype = new Surrogate();

			// add new spec object to the new ChildComponent's prototype
			_.assign(ChildComponent.prototype, spec);

			ChildComponent.__super__ = BaseComponent.prototype;

			var descriptorCreator = Descriptor.create.bind(null, COMPONENT_DESCRIPTOR, ChildComponent);

			descriptorCreator.spec = ChildComponent;

			return descriptorCreator;
		}
	},

	setDirty: function (options)
	{
		this.__isDirty = true;

		if (!options || (options && options.update !== false))
		{			
			if (this.descriptor.stage)
			{
				this.descriptor.stage.update();
			}
		}

		return this;
	},

	isMounted: function ()
	{
		return this.__lifecycle == MOUNTED;
	},

	isDirty: function ()
	{
		return !!this.__isDirty;
	},

	setState: function (state)
	{
		if (state && typeof state === 'object')
		{
			// merge new state with the old
			//_.merge(this.state, state);
			_.assign(this.state, state);

			// set component dirty
			this.setDirty();
		}

		return this;
	},

	__getRender: function ()
	{
		this.__isDirty = false;
		this.__cachedRender = this.render();

		/*if (!!this.__cachedRender && !isDescriptor(this.__cachedRender))
		{
			throw new Error(this.__cachedRender + ' must be a Descriptor object or falsy value.');
		}*/

		return this.__cachedRender;
	},

	__setLifecycle: function (lifecycle)
	{
		// value check
		if (lifecycle != UNMOUNTED && lifecycle != MOUNTING && lifecycle != MOUNTED)
		{
			throw new Error(lifecycle + ' must be "Unmounted", "Mounting" or "Mounted".');
		}

		this.__lifecycle = lifecycle;

		return this;
	},

	shouldUpdate: function ()
	{
		return true;
	},

	mount: function ()
	{
		// set lifecycle
		this.__setLifecycle(MOUNTED);

		// call an event
		this.onMount();

		return this;
	},

	unmount: function ()
	{
		// set lifecycle
		this.__setLifecycle(UNMOUNTED);

		// call an event
		this.onUnmount();

		return this;
	},

	onBeforeMount: function () {},

	onMount: function () {},

	onUnmount: function () {},

	onBeforeReceiveProps: function () {},

	render: function ()
	{
		return null;
	},

	getDOMNode: function ()
	{
		if (this.isMounted() && isVirtualNodeDescriptor(this.__cachedRender))
		{
			return findNode(this.descriptor.stage/*getStage()*/.getRootDOMNode(), this.__cachedRender.instance.index);
		}

		return null;
	},

	/*getStage: function ()
	{
		if (this.isMounted())
		{
			var descriptor = this.descriptor;

			// find root component descriptor
			while (!descriptor.isRoot)
			{
				descriptor = descriptor.owner;
			}

			// return the stage
			return descriptor.owner;
		}

		return null;
	}*/
});

module.exports = Component;