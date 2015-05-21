'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

var _ash = require('ash');

var _ash2 = _interopRequireDefault(_ash);

var _List = require('./List');

var _List2 = _interopRequireDefault(_List);

var App = (function (_ash$Component) {
	function App() {
		_classCallCheck(this, App);

		if (_ash$Component != null) {
			_ash$Component.apply(this, arguments);
		}

		this.state = new _ash2.default.ImmutableObject({
			list1: new _ash2.default.ImmutableArray(),
			list2: new _ash2.default.ImmutableArray(),
			redShadow: true
		});
		this.name = 'App';
	}

	_inherits(App, _ash$Component);

	_createClass(App, [{
		key: 'render',
		value: function render() {
			return _ash2.default.e(
				'div',
				null,
				_ash2.default.e(
					'div',
					{ style: {
							boxShadow: this.state.redShadow ? '2px 2px 5px red' : '2px 2px 5px blue'
						} },
					_ash2.default.e(
						'button',
						{ events: {
								click: this.addToList1
							} },
						'+ list 1!'
					),
					_ash2.default.e(
						'button',
						{ events: {
								click: this.addToList2
							} },
						'+ list 2!'
					),
					_ash2.default.e(
						'button',
						{ events: {
								click: this.clearList1
							} },
						'+ clear 1!'
					),
					_ash2.default.e(
						'button',
						{ events: {
								click: this.clearList2
							} },
						'+ clear 2!'
					),
					_ash2.default.e(
						'button',
						{ events: {
								click: this.changeShadow
							} },
						'!!!'
					)
				),
				_ash2.default.e(_List2.default, this.state.list1),
				_ash2.default.e(_List2.default, this.state.list2)
			);
		}
	}, {
		key: 'onMount',
		value: function onMount() {}
	}, {
		key: 'changeShadow',
		value: function changeShadow() {
			this.state = this.state.set('redShadow', !this.state.redShadow);
			this.isDirty = true;
		}
	}, {
		key: 'addToList1',
		value: function addToList1() {
			// console.log('App addToList1...');

			var items = [];

			for (var i = 0; i < 5000; i++) {
				items.push(Math.random().toFixed(1));
			}

			this.state = this.state.merge({ list1: this.state.list1.concat(items) });
			// this.state.list1 = this.state.list1.concat(items);

			this.isDirty = true;
		}
	}, {
		key: 'addToList2',
		value: function addToList2() {
			var items = [];

			for (var i = 0; i < 5000; i++) {
				items.push(Math.random().toFixed(1));
			}

			this.state = this.state.merge({ list2: this.state.list2.concat(items) });
			// this.state.list2 = this.state.list2.concat(items);

			this.isDirty = true;
		}
	}, {
		key: 'clearList1',
		value: function clearList1() {
			this.state = this.state.merge({ list1: [] });
			// this.state.list1 = [];
			this.isDirty = true;
		}
	}, {
		key: 'clearList2',
		value: function clearList2() {
			this.state = this.state.merge({ list2: [] });
			// this.state.list2 = [];
			this.isDirty = true;
		}
	}, {
		key: 'randomFoo',
		get: function () {
			return Math.random();
		}
	}]);

	return App;
})(_ash2.default.Component);

exports.default = App;
module.exports = exports.default;

// console.log('App mounted!');