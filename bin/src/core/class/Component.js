"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj.default : obj; };

var _prototypeProperties = function (child, staticProps, instanceProps) { if (staticProps) Object.defineProperties(child, staticProps); if (instanceProps) Object.defineProperties(child.prototype, instanceProps); };

var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var Observable = _interopRequire(require("./Observable"));

var isAshNodeAshElement = _interopRequire(require("../internal/isAshNodeAshElement"));

var constants = _interopRequire(require("../internal/constants"));

var findNode = _interopRequire(require("../DOM/findNode"));

var forEach = _interopRequire(require("../internal/forEach"));

var keys = _interopRequire(require("../internal/keys"));

var assign = _interopRequire(require("../internal/assign"));

var isFunction = _interopRequire(require("../internal/isFunction"));

var LIFECYCLE_UNMOUNTED = constants.LIFECYCLE_UNMOUNTED;
var LIFECYCLE_MOUNTING = constants.LIFECYCLE_MOUNTING;
var LIFECYCLE_MOUNTED = constants.LIFECYCLE_MOUNTED;

var Component = (function (Observable) {
	function Component(props) {
		var _this = this;
		_classCallCheck(this, Component);

		// autobind methods
		forEach(Object.getOwnPropertyNames(this.__proto__), function (value) {
			if (isFunction(_this[value]) && value != "constructor") {
				_this[value] = _this[value].bind(_this);
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

	_inherits(Component, Observable);

	_prototypeProperties(Component, null, {
		getInitialState: {
			value: function getInitialState() {
				return {};
			},
			writable: true,
			configurable: true
		},
		setDirty: {
			value: function setDirty(options) {
				this.__isDirty = true;

				if (!options || options && options.update !== false) {
					if (this.element.stage) {
						this.element.stage.update();
					}
				}

				return this;
			},
			writable: true,
			configurable: true
		},
		isMounted: {
			value: function isMounted() {
				return this.__lifecycle == LIFECYCLE_MOUNTED;
			},
			writable: true,
			configurable: true
		},
		isDirty: {
			value: function isDirty() {
				return !!this.__isDirty;
			},
			writable: true,
			configurable: true
		},
		setState: {
			value: function setState(state) {
				if (state && typeof state === "object") {
					assign(this.state, state);

					// set component dirty
					this.setDirty();
				}

				return this;
			},
			writable: true,
			configurable: true
		},
		__getRender: {
			value: function __getRender() {
				this.__isDirty = false;
				this.__cachedRender = this.render();

				return this.__cachedRender;
			},
			writable: true,
			configurable: true
		},
		__setLifecycle: {
			value: function __setLifecycle(lifecycle) {
				// value check
				if (lifecycle != LIFECYCLE_UNMOUNTED && lifecycle != LIFECYCLE_MOUNTING && lifecycle != LIFECYCLE_MOUNTED) {
					throw new Error(lifecycle + " must be \"Unmounted\", \"Mounting\" or \"Mounted\".");
				}

				this.__lifecycle = lifecycle;

				return this;
			},
			writable: true,
			configurable: true
		},
		shouldUpdate: {
			value: function shouldUpdate(newProps) {
				// with immutable props...
				//if (this.props === newProps) return false;

				return true;
			},
			writable: true,
			configurable: true
		},
		mount: {
			value: function mount() {
				// set lifecycle
				this.__setLifecycle(LIFECYCLE_MOUNTED);

				// call an event
				this.onMount();

				return this;
			},
			writable: true,
			configurable: true
		},
		unmount: {
			value: function unmount() {
				// set lifecycle
				this.__setLifecycle(LIFECYCLE_UNMOUNTED);

				// call an event
				this.onUnmount();

				return this;
			},
			writable: true,
			configurable: true
		},
		onBeforeMount: {
			value: function onBeforeMount() {},
			writable: true,
			configurable: true
		},
		onMount: {
			value: function onMount() {},
			writable: true,
			configurable: true
		},
		onUnmount: {
			value: function onUnmount() {},
			writable: true,
			configurable: true
		},
		onBeforeReceiveProps: {
			value: function onBeforeReceiveProps() {},
			writable: true,
			configurable: true
		},
		render: {
			value: function render() {
				return null;
			},
			writable: true,
			configurable: true
		},
		getDOMNode: {
			value: function getDOMNode() {
				if (this.isMounted() && isAshNodeAshElement(this.__cachedRender)) {
					return findNode(this.element.stage.getRootDOMNode(), this.__cachedRender.instance.index);
				}

				return null;
			},
			writable: true,
			configurable: true
		}
	});

	return Component;
})(Observable);

module.exports = Component;