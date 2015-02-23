import Observable from './Observable';
import isAshNodeAshElement from '../internal/isAshNodeAshElement';
import constants from '../internal/constants';
import findNode from '../DOM/findNode';
import isFunction from '../internal/isFunction';

const LIFECYCLE_UNMOUNTED = constants.LIFECYCLE_UNMOUNTED;
const LIFECYCLE_MOUNTING = constants.LIFECYCLE_MOUNTING;
const LIFECYCLE_MOUNTED = constants.LIFECYCLE_MOUNTED;

class Component extends Observable {
	constructor(props) {
		// autobind methods
		Object.getOwnPropertyNames(this.__proto__).forEach((value) => {
			if (isFunction(this[value]) && value !== 'constructor') {
				this[value] = this[value].bind(this);
			}
		});

		this.props = props || {};
		this.state = this.state || {};

		this.__isDirty = false;
		this.__lifecycle = LIFECYCLE_UNMOUNTED;
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

	get lifecycle() {
		return this.__lifecycle;
	}

	set lifecycle(value) {
		if (value != LIFECYCLE_UNMOUNTED && value != LIFECYCLE_MOUNTING && value != LIFECYCLE_MOUNTED) {
			throw new Error(value + ' must be "Unmounted", "Mounting" or "Mounted".');
		}

		this.__lifecycle = value;
	}

	get isMounted() {
		return this.__lifecycle === LIFECYCLE_MOUNTED;
	}

	get cachedRender() {
		this.__cachedRender = this.render();

		return this.__cachedRender;
	}

	get domNode() {
		if (this.isMounted && isAshNodeAshElement(this.__cachedRender)) {
			return findNode(this.__element.stage.getRootNode(), this.__cachedRender.instance.index);
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
