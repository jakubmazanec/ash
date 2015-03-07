"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var ash = _interopRequire(require("../ash"));

var Display = _interopRequire(require("./Display"));

var Timer = (function (_ash$Component) {
	function Timer() {
		this.state = { timerClicks: 0 };

		_classCallCheck(this, Timer);

		if (_ash$Component != null) {
			_ash$Component.apply(this, arguments);
		}
	}

	_inherits(Timer, _ash$Component);

	_createClass(Timer, {
		tick: {
			/* jshint ignore:end */

			value: function tick() {
				console.log("timer tick!");
				this.setState({ timerClicks: this.state.timerClicks + 1 });
			}
		},
		onMount: {
			value: function onMount() {}
		},
		onUnmount: {
			value: function onUnmount() {}
		},
		onBeforeMount: {
			value: function onBeforeMount() {}
		},
		render: {

			/*shouldUpdate () {
   	return false;
   }*/

			value: function render() {
				return ash.e("div", null, [new Display({ timerClicks: this.state.timerClicks }), ash.e("button", {
					style: {
						color: this.state.timerClicks % 2 === 0 ? "red" : "blue"
					},
					events: {
						click: this.tick
					}
				}, "+")]);
			}
		}
	});

	return Timer;
})(ash.Component);

module.exports = ash.createElement(Timer);

/* jshint ignore:start */

//console.log('Timer onMount');
//this.interval = setInterval(this.tick, 1000);
//console.log(this.getDOMNode());

//console.log('Timer onUnmount');
//clearInterval(this.interval);

//console.log('Timer onBeforeMount');