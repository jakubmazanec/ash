"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj.default : obj; };

var _prototypeProperties = function (child, staticProps, instanceProps) { if (staticProps) Object.defineProperties(child, staticProps); if (instanceProps) Object.defineProperties(child.prototype, instanceProps); };

var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var ash = _interopRequire(require("../ash"));

var Display = (function (_ash$Component) {
	function Display() {
		_classCallCheck(this, Display);

		if (_ash$Component != null) {
			_ash$Component.apply(this, arguments);
		}
	}

	_inherits(Display, _ash$Component);

	_prototypeProperties(Display, null, {
		getInitialState: {
			value: function getInitialState() {
				return { displayClicks: 0 };
			},
			writable: true,
			configurable: true
		},
		render: {
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
			},
			writable: true,
			configurable: true
		},
		tick: {
			value: function tick() {
				console.log(this);
				//console.log(this.name + ' tick!');
				this.setState({ displayClicks: this.state.displayClicks + 1 });
			},
			writable: true,
			configurable: true
		},
		onBeforeReceiveProps: {
			value: function onBeforeReceiveProps() {},
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
		}
	});

	return Display;
})(ash.Component);

module.exports = ash.createFactory(Display);
//console.log('display componentWillReceiveProps');
//console.log('display componentDidMount');
//debugger;
//this.interval = setInterval(this.tick, 500);
//console.log(this.getDOMNode());
//console.log('display componentWillUnmount');
//clearInterval(this.interval);