import isAshNodeAshElement from '../internals/isAshNodeAshElement';
import constants from '../internals/constants';
import findNode from '../DOM/findNode';
import isFunction from '../internals/isFunction';
import isAncestor from '../internals/isAncestor';
import Stream from '../streams/Stream';


const LIFECYCLE_UNMOUNTED = constants.LIFECYCLE_UNMOUNTED;
const LIFECYCLE_MOUNTING = constants.LIFECYCLE_MOUNTING;
const LIFECYCLE_MOUNTED = constants.LIFECYCLE_MOUNTED;
const LIFECYCLE_UNINITIALIZED = constants.LIFECYCLE_UNINITIALIZED;

export default class Component {
	__element = null;
	__previousLifecycle = LIFECYCLE_UNINITIALIZED;
	__currentLifecycle = LIFECYCLE_UNMOUNTED;
	props = null;
	state = null;

	constructor(props = null) {
		// autobind methods
		let prototype = Object.getPrototypeOf(this);

		Object.getOwnPropertyNames(prototype).forEach((value) => {
			let descriptor = Object.getOwnPropertyDescriptor(prototype, value);

			// typeof must be used to avoid executing getter and setters
			if (!(descriptor && (typeof descriptor.get !== 'undefined' || typeof descriptor.set !== 'undefined')) && isFunction(this[value]) && value !== 'constructor') {
				this[value] = ::this[value];
			}
		});

		this.props = props;

		// references to the component streams
		Object.getOwnPropertyNames(this.constructor).filter((value) => value !== 'caller' && value !== 'callee' && value !== 'arguments').forEach((value) => {
			if (this.constructor[value] instanceof Stream && !this[value]) {
				this[value] = this.constructor[value];
			}
		});
	}

	static isAncestorOf(value) {
		return isAncestor(Component, value);
	}

	update = () => {
		if (this.__element.stream) {
			this.__element.stream.push(this);
		}

		if (arguments[0] instanceof Stream) {
			return undefined;
		}

		return this;
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
			return findNode(this.__element.stream.getRootNode(), this.__element.children[0].instance.id, this.__element.children[0].instance.indices);
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

	onRender() {}

	render() {
		return null;
	}
}
