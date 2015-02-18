import Observable from './Observable';
import isAshNodeAshElement from '../internal/isAshNodeAshElement';
import constants from '../internal/constants';
import findNode from '../DOM/findNode';
import forEach from '../internal/forEach';
import keys from '../internal/keys';
import assign from '../internal/assign';
import isFunction from '../internal/isFunction';

const LIFECYCLE_UNMOUNTED = constants.LIFECYCLE_UNMOUNTED;
const LIFECYCLE_MOUNTING = constants.LIFECYCLE_MOUNTING;
const LIFECYCLE_MOUNTED = constants.LIFECYCLE_MOUNTED;

class Component extends Observable {
	constructor(props) {
		// autobind methods
		forEach(Object.getOwnPropertyNames(this.__proto__), (value) => {
			if (isFunction(this[value]) && value != 'constructor') {
				this[value] = this[value].bind(this);
			}
		});

		this.props = props || {};
		this.state = this.getInitialState();

		// set state if specified in props
		/*if (this.props.state)
		{
			keys(this.state).forEach((key) => {
				this.props.state[key] = this.state[key];
			});

			delete this.props.state;
		}*/

		this.__isDirty = true;
		this.__lifecycle = LIFECYCLE_UNMOUNTED;
	}

	getInitialState() {
		return {};
	}

	setDirty(options) {
		this.__isDirty = true;

		if (!options || (options && options.update !== false)) {
			if (this.element.stage) {
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
			assign(this.state, state);

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

	shouldUpdate(newProps) {
		// with immutable props...
		//if (this.props === newProps) return false;

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
