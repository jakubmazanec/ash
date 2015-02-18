"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj.default : obj; };

var _prototypeProperties = function (child, staticProps, instanceProps) { if (staticProps) Object.defineProperties(child, staticProps); if (instanceProps) Object.defineProperties(child.prototype, instanceProps); };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var constants = _interopRequire(require("../internal/constants"));

// constants references
var ASH_NODE_ASH_ELEMENT = constants.ASH_NODE_ASH_ELEMENT;
var COMPONENT_ASH_ELEMENT = constants.COMPONENT_ASH_ELEMENT;

/**
 * AshElement
 */
var AshElement = (function () {
	function AshElement(type, spec) {
		_classCallCheck(this, AshElement);

		if (type != COMPONENT_ASH_ELEMENT && type != ASH_NODE_ASH_ELEMENT) {
			throw new Error(type + "must be " + COMPONENT_ASH_ELEMENT + " or " + ASH_NODE_ASH_ELEMENT + ".");
		}

		if (!spec) {
			throw new Error(spec + "must be specified.");
		}

		if (!(this instanceof AshElement)) {
			if (arguments.length >= 5) {
				return new AshElement(type, spec, arguments[2], arguments[3], arguments[4]);
			} else if (arguments.length >= 4) {
				return new AshElement(type, spec, arguments[2], arguments[3]);
			} else if (arguments.length >= 3) {
				return new AshElement(type, spec, arguments[2]);
			} else {
				return new AshElement(type, spec);
			}
		}

		if (type == COMPONENT_ASH_ELEMENT) {
			this.type = type;
			this.spec = spec;

			if (arguments.length >= 3 && typeof arguments[2] !== "undefined") {
				this.args = [arguments[2]];
			} else {
				this.args = null;
			}

			this.children = [];
		} else {
			this.type = ASH_NODE_ASH_ELEMENT;
			this.spec = spec;

			if (arguments.length >= 4 && typeof arguments[2] !== "undefined" && typeof arguments[3] !== "undefined") {
				this.args = [arguments[2], arguments[3]];
			} else if (arguments.length >= 3 && typeof arguments[2] !== "undefined") {
				this.args = [arguments[2]];
			} else {
				this.args = null;
			}

			if (arguments.length >= 5 && arguments[4]) {
				this.children = arguments[4];
			} else {
				this.children = [];
			}
		}

		this.parent = null;
		this.owner = null;
	}

	_prototypeProperties(AshElement, null, {
		instantiate: {
			value: function instantiate() {
				if (this.type == COMPONENT_ASH_ELEMENT) {
					if (this.args) {
						this.instance = new this.spec(this.args[0]);
					} else {
						this.instance = new this.spec();
					}
				} else if (this.type == ASH_NODE_ASH_ELEMENT) {
					if (this.args) {
						this.instance = new this.spec(this.args[0], this.args[1]);
					} else {
						this.instance = new this.spec();
					}
				} else {
					throw new Error(this + " is not a AshElement object.");
				}

				this.instance.element = this;

				return this.instance;
			},
			writable: true,
			configurable: true
		}
	});

	return AshElement;
})();

module.exports = AshElement;