'use strict';

var _ = require('_');

var Observable = require('./Observable');
var isAshNodeAshElement = require('../internal/isAshNodeAshElement');
var constants = require('../internal/constants');
var findNode = require('../DOM/findNode');

var LIFECYCLE_UNMOUNTED = constants.LIFECYCLE_UNMOUNTED;
var LIFECYCLE_MOUNTING = constants.LIFECYCLE_MOUNTING;
var LIFECYCLE_MOUNTED = constants.LIFECYCLE_MOUNTED;

class Component extends Observable {
	constructor(props) {
		// autobind functions
		/*var keys = this.autobind();
		var i;

		if (keys && Array.isArray(keys) && keys.length)
		{
			for (i = 0; i < keys.length; i++)
			{
				if (_.isFunction(this[keys[i]]) && keys[i] != 'constructor')
				{
					this[keys[i]] = this[keys[i]].bind(this);
				}
			}
		}*/
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
		this.__lifecycle = LIFECYCLE_UNMOUNTED;
	}

	autobind() {
		return null;
	}

	setDirty(options) {
		this.__isDirty = true;

		if (!options || (options && options.update !== false))
		{
			if (this.element.stage)
			{
				this.element.stage.update();
			}
		}

		return this;
	}

	isMounted()	{
		return this.__lifecycle == LIFECYCLE_MOUNTED;
	}

	isDirty()	{
		return !!this.__isDirty;
	}

	setState(state)	{
		if (state && typeof state === 'object')
		{
			_.assign(this.state, state);

			// set component dirty
			this.setDirty();
		}

		return this;
	}

	__getRender()	{
		this.__isDirty = false;
		this.__cachedRender = this.render();

		return this.__cachedRender;
	}

	__setLifecycle(lifecycle)	{
		// value check
		if (lifecycle != LIFECYCLE_UNMOUNTED && lifecycle != LIFECYCLE_MOUNTING && lifecycle != LIFECYCLE_MOUNTED)
		{
			throw new Error(lifecycle + ' must be "Unmounted", "Mounting" or "Mounted".');
		}

		this.__lifecycle = lifecycle;

		return this;
	}

	shouldUpdate() {
		return true;
	}

	mount() {
		// set lifecycle
		this.__setLifecycle(LIFECYCLE_MOUNTED);

		// call an event
		this.onMount();

		return this;
	}

	unmount()	{
		// set lifecycle
		this.__setLifecycle(LIFECYCLE_UNMOUNTED);

		// call an event
		this.onUnmount();

		return this;
	}

	onBeforeMount() {}

	onMount() {}

	onUnmount() {}

	onBeforeReceiveProps() {}

	render() {
		return null;
	}

	getDOMNode() {
		if (this.isMounted() && isAshNodeAshElement(this.__cachedRender))
		{
			return findNode(this.element.stage.getRootDOMNode(), this.__cachedRender.instance.index);
		}

		return null;
	}
}

module.exports = Component;