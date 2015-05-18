'use strict';

var _inherits = require('babel-runtime/helpers/inherits').default;

var _createClass = require('babel-runtime/helpers/create-class').default;

var _classCallCheck = require('babel-runtime/helpers/class-call-check').default;

var _Object$defineProperty = require('babel-runtime/core-js/object/define-property').default;

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default').default;

_Object$defineProperty(exports, '__esModule', {
	value: true
});

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
		value: function onMount() {
			console.log('App mounted!');
		}
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