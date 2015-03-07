"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var ash = _interopRequire(require("../ash"));

var Display = (function (_ash$Component) {
	function Display() {
		this.state = { displayClicks: 0 };

		_classCallCheck(this, Display);

		if (_ash$Component != null) {
			_ash$Component.apply(this, arguments);
		}
	}

	_inherits(Display, _ash$Component);

	_createClass(Display, {
		render: {
			/* jshint ignore:end */

			value: function render() {
				var message = "Timer Clicks = " + this.props.timerClicks + " -- Display Click = " + this.state.displayClicks;

				return ash.e("div", null, [message, ash.e("button", {
					className: "big",
					style: {
						color: this.state.displayClicks % 2 === 0 ? "red" : "blue"
					},
					events: {
						click: this.tick
					}
				}, "+")]);
			}
		},
		tick: {
			value: function tick() {
				console.log(this);
				//console.log(this.name + ' tick!');
				this.setState({ displayClicks: this.state.displayClicks + 1 });
			}
		},
		onBeforeReceiveProps: {
			value: function onBeforeReceiveProps() {}
		},
		onMount: {
			value: function onMount() {}
		},
		onUnmount: {
			value: function onUnmount() {}
		}
	});

	return Display;
})(ash.Component);

module.exports = ash.createElement(Display);

/* jshint ignore:start */

//console.log('display componentWillReceiveProps');

//console.log('display componentDidMount');
//debugger;
//this.interval = setInterval(this.tick, 500);
//console.log(this.getDOMNode());

//console.log('display componentWillUnmount');
//clearInterval(this.interval);