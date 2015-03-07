"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(object, property, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc && desc.writable) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var Observable = _interopRequire(require("./Observable"));

var TRIGGER_OPTIONS = {
	noEventArgument: true
};

var Store = (function (_Observable) {
	function Store() {
		_classCallCheck(this, Store);

		if (_Observable != null) {
			_Observable.apply(this, arguments);
		}
	}

	_inherits(Store, _Observable);

	_createClass(Store, {
		trigger: {
			value: function trigger() {
				if (arguments.length == 10) {
					_get(Object.getPrototypeOf(Store.prototype), "trigger", this).call(this, "all", arguments[0], arguments[1], arguments[2], arguments[3], arguments[4], arguments[5], arguments[6], arguments[7], arguments[8], arguments[9], TRIGGER_OPTIONS);
				} else if (arguments.length == 9) {
					_get(Object.getPrototypeOf(Store.prototype), "trigger", this).call(this, "all", arguments[0], arguments[1], arguments[2], arguments[3], arguments[4], arguments[5], arguments[6], arguments[7], arguments[8], TRIGGER_OPTIONS);
				} else if (arguments.length == 8) {
					_get(Object.getPrototypeOf(Store.prototype), "trigger", this).call(this, "all", arguments[0], arguments[1], arguments[2], arguments[3], arguments[4], arguments[5], arguments[6], arguments[7], TRIGGER_OPTIONS);
				} else if (arguments.length == 7) {
					_get(Object.getPrototypeOf(Store.prototype), "trigger", this).call(this, "all", arguments[0], arguments[1], arguments[2], arguments[3], arguments[4], arguments[5], arguments[6], TRIGGER_OPTIONS);
				} else if (arguments.length == 6) {
					_get(Object.getPrototypeOf(Store.prototype), "trigger", this).call(this, "all", arguments[0], arguments[1], arguments[2], arguments[3], arguments[4], arguments[5], TRIGGER_OPTIONS);
				} else if (arguments.length == 5) {
					_get(Object.getPrototypeOf(Store.prototype), "trigger", this).call(this, "all", arguments[0], arguments[1], arguments[2], arguments[3], arguments[4], TRIGGER_OPTIONS);
				} else if (arguments.length == 4) {
					_get(Object.getPrototypeOf(Store.prototype), "trigger", this).call(this, "all", arguments[0], arguments[1], arguments[2], arguments[3], TRIGGER_OPTIONS);
				} else if (arguments.length == 3) {
					_get(Object.getPrototypeOf(Store.prototype), "trigger", this).call(this, "all", arguments[0], arguments[1], arguments[2], TRIGGER_OPTIONS);
				} else if (arguments.length == 2) {
					_get(Object.getPrototypeOf(Store.prototype), "trigger", this).call(this, "all", arguments[0], arguments[1], TRIGGER_OPTIONS);
				} else if (arguments.length) {
					_get(Object.getPrototypeOf(Store.prototype), "trigger", this).call(this, "all", arguments[0], TRIGGER_OPTIONS);
				} else {
					_get(Object.getPrototypeOf(Store.prototype), "trigger", this).call(this, "all", TRIGGER_OPTIONS);
				}

				return this;
			}
		}
	});

	return Store;
})(Observable);

module.exports = Store;
/*data*/