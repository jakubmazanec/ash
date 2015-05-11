import Observable from './Observable';
import isAshNodeAshElement from '../internals/isAshNodeAshElement';
import constants from '../internals/constants';
import findNode from '../DOM/findNode';
import isFunction from '../internals/isFunction';

const LIFECYCLE_UNMOUNTED = constants.LIFECYCLE_UNMOUNTED;
const LIFECYCLE_MOUNTING = constants.LIFECYCLE_MOUNTING;
const LIFECYCLE_MOUNTED = constants.LIFECYCLE_MOUNTED;
const LIFECYCLE_UNINITIALIZED = constants.LIFECYCLE_UNINITIALIZED;

class Component extends Observable {
	constructor(props = {}) {
		super();

		// autobind methods
		var prototype = Object.getPrototypeOf(this);
		Object.getOwnPropertyNames(prototype).forEach((value) => {
			let descriptor = Object.getOwnPropertyDescriptor(prototype, value);

			if (!(descriptor && (typeof descriptor.get !== 'undefined' || typeof descriptor.set !== 'undefined')) && isFunction(this[value]) && value !== 'constructor') {
				this[value] = this[value].bind(this);
			}
		});

		this.props = props;
		this.state = this.state || {};

		this.__isDirty = false;
		this.__previousLifecycle = LIFECYCLE_UNINITIALIZED;
		this.__currentLifecycle = LIFECYCLE_UNMOUNTED;
	}

	get isDirty() {
		return this.__isDirty;
	}

	set isDirty(value) {
		this.__isDirty = !!value;

		if (this.__isDirty && this.__element.stage) {
			this.__element.stage.update(this);
		}
	}

	get __lifecycle() {
		return this.__currentLifecycle;
	}

	set __lifecycle(nextLifecycle) {
		if (nextLifecycle !== LIFECYCLE_UNMOUNTED && nextLifecycle !== LIFECYCLE_MOUNTING && nextLifecycle !== LIFECYCLE_MOUNTED) {
			throw new Error(`${nextLifecycle} must be "${LIFECYCLE_UNMOUNTED}", "${LIFECYCLE_MOUNTING}" or "${LIFECYCLE_MOUNTED}". Also, this property is for internal use only. Do not change it!`);
		}

		this.__previousLifecycle = this.__currentLifecycle;
		this.__currentLifecycle = nextLifecycle;

		if (this.__previousLifecycle !== this.__currentLifecycle) {
			if (this.__currentLifecycle === LIFECYCLE_MOUNTING) {
				this.onBeforeMount();
			} else if (this.__currentLifecycle === LIFECYCLE_MOUNTED) {
				this.onMount();
			} else if (this.__currentLifecycle === LIFECYCLE_UNMOUNTED) {
				this.onUnmount();
			}
		}
	}

	get isMounted() {
		return this.__currentLifecycle === LIFECYCLE_MOUNTED;
	}

	get domNode() {
		if (this.isMounted && isAshNodeAshElement(this.__element.children[0])) {
			return findNode(this.__element.stage.getRootNode(), this.__element.children[0].instance.index);
		}

		return null;
	}

	shouldUpdate(newProps) {
		return this.props !== newProps;
	}

	onBeforeMount() {}

	onMount() {}

	onUnmount() {}

	onBeforeReceiveProps() {}

	render() {
		return null;
	}
}

export default Component;
