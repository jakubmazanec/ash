"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj.default : obj; };

var _prototypeProperties = function (child, staticProps, instanceProps) { if (staticProps) Object.defineProperties(child, staticProps); if (instanceProps) Object.defineProperties(child.prototype, instanceProps); };

var _get = function get(object, property, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc && desc.writable) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var Observable = _interopRequire(require("./Observable"));

var TRIGGER_OPTIONS = {
	noEventArgument: true
};

var Action = (function (Observable) {
	function Action() {
		_classCallCheck(this, Action);

		if (Observable != null) {
			Observable.apply(this, arguments);
		}
	}

	_inherits(Action, Observable);

	_prototypeProperties(Action, null, {
		trigger: {
			value: function trigger() {
				if (typeof this.onTrigger === "function") {
					_get(Object.getPrototypeOf(Action.prototype), "trigger", this).call(this, "all", this.onTrigger.apply(this, arguments), TRIGGER_OPTIONS);
				} else {
					if (arguments.length == 10) {
						_get(Object.getPrototypeOf(Action.prototype), "trigger", this).call(this, "all", arguments[0], arguments[1], arguments[2], arguments[3], arguments[4], arguments[5], arguments[6], arguments[7], arguments[8], arguments[9], TRIGGER_OPTIONS);
					} else if (arguments.length == 9) {
						_get(Object.getPrototypeOf(Action.prototype), "trigger", this).call(this, "all", arguments[0], arguments[1], arguments[2], arguments[3], arguments[4], arguments[5], arguments[6], arguments[7], arguments[8], TRIGGER_OPTIONS);
					} else if (arguments.length == 8) {
						_get(Object.getPrototypeOf(Action.prototype), "trigger", this).call(this, "all", arguments[0], arguments[1], arguments[2], arguments[3], arguments[4], arguments[5], arguments[6], arguments[7], TRIGGER_OPTIONS);
					} else if (arguments.length == 7) {
						_get(Object.getPrototypeOf(Action.prototype), "trigger", this).call(this, "all", arguments[0], arguments[1], arguments[2], arguments[3], arguments[4], arguments[5], arguments[6], TRIGGER_OPTIONS);
					} else if (arguments.length == 6) {
						_get(Object.getPrototypeOf(Action.prototype), "trigger", this).call(this, "all", arguments[0], arguments[1], arguments[2], arguments[3], arguments[4], arguments[5], TRIGGER_OPTIONS);
					} else if (arguments.length == 5) {
						_get(Object.getPrototypeOf(Action.prototype), "trigger", this).call(this, "all", arguments[0], arguments[1], arguments[2], arguments[3], arguments[4], TRIGGER_OPTIONS);
					} else if (arguments.length == 4) {
						_get(Object.getPrototypeOf(Action.prototype), "trigger", this).call(this, "all", arguments[0], arguments[1], arguments[2], arguments[3], TRIGGER_OPTIONS);
					} else if (arguments.length == 3) {
						_get(Object.getPrototypeOf(Action.prototype), "trigger", this).call(this, "all", arguments[0], arguments[1], arguments[2], TRIGGER_OPTIONS);
					} else if (arguments.length == 2) {
						_get(Object.getPrototypeOf(Action.prototype), "trigger", this).call(this, "all", arguments[0], arguments[1], TRIGGER_OPTIONS);
					} else if (arguments.length) {
						_get(Object.getPrototypeOf(Action.prototype), "trigger", this).call(this, "all", arguments[0], TRIGGER_OPTIONS);
					} else {
						_get(Object.getPrototypeOf(Action.prototype), "trigger", this).call(this, "all", TRIGGER_OPTIONS);
					}
				}

				return this;
			},
			writable: true,
			configurable: true
		}
	});

	return Action;
})(Observable);

module.exports = Action;
/*data*/