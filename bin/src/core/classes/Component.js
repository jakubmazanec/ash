"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var Observable = _interopRequire(require("./Observable"));

var isAshNodeAshElement = _interopRequire(require("../internals/isAshNodeAshElement"));

var constants = _interopRequire(require("../internals/constants"));

var findNode = _interopRequire(require("../DOM/findNode"));

var isFunction = _interopRequire(require("../internals/isFunction"));

var LIFECYCLE_UNMOUNTED = constants.LIFECYCLE_UNMOUNTED;
var LIFECYCLE_MOUNTING = constants.LIFECYCLE_MOUNTING;
var LIFECYCLE_MOUNTED = constants.LIFECYCLE_MOUNTED;
var LIFECYCLE_UNINITIALIZED = constants.LIFECYCLE_UNINITIALIZED;

var Component = (function (_Observable) {
	function Component(props) {
		var _this = this;

		_classCallCheck(this, Component);

		// autobind methods
		var prototype = Object.getPrototypeOf(this);
		Object.getOwnPropertyNames(prototype).forEach(function (value) {
			var descriptor = Object.getOwnPropertyDescriptor(prototype, value);

			if (!(descriptor && (typeof descriptor.get !== "undefined" || typeof descriptor.set !== "undefined")) && isFunction(_this[value]) && value !== "constructor") {
				_this[value] = _this[value].bind(_this);
			}
		});

		this.props = props || {};
		this.state = this.state || {};

		this.__isDirty = false;
		this.__previousLifecycle = LIFECYCLE_UNINITIALIZED;
		this.__currentLifecycle = LIFECYCLE_UNMOUNTED;
	}

	_inherits(Component, _Observable);

	_createClass(Component, {
		isDirty: {
			get: function () {
				return this.__isDirty;
			},
			set: function (value) {
				this.__isDirty = !!value;

				if (this.__isDirty && this.__element.stage) {
					this.__element.stage.update(this);
				}
			}
		},
		__lifecycle: {
			get: function () {
				return this.__currentLifecycle;
			},
			set: function (nextLifecycle) {
				if (nextLifecycle !== LIFECYCLE_UNMOUNTED && nextLifecycle !== LIFECYCLE_MOUNTING && nextLifecycle !== LIFECYCLE_MOUNTED) {
					throw new Error("" + nextLifecycle + " must be \"" + LIFECYCLE_UNMOUNTED + "\", \"" + LIFECYCLE_MOUNTING + "\" or \"" + LIFECYCLE_MOUNTED + "\". Also, this property is for internal use only. Do not change it!");
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
		},
		isMounted: {
			get: function () {
				return this.__currentLifecycle === LIFECYCLE_MOUNTED;
			}
		},
		domNode: {
			get: function () {
				if (this.isMounted && isAshNodeAshElement(this.__element.children[0])) {
					return findNode(this.__element.stage.getRootNode(), this.__element.children[0].instance.index);
				}

				return null;
			}
		},
		shouldUpdate: {
			value: function shouldUpdate(newProps) {
				return this.props !== newProps;
			}
		},
		onBeforeMount: {
			value: function onBeforeMount() {}
		},
		onMount: {
			value: function onMount() {}
		},
		onUnmount: {
			value: function onUnmount() {}
		},
		onBeforeReceiveProps: {
			value: function onBeforeReceiveProps() {}
		},
		render: {
			value: function render() {
				return null;
			}
		}
	});

	return Component;
})(Observable);

module.exports = Component;