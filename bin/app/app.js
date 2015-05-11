'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

var _jquery = require('jquery');

var _jquery2 = _interopRequireDefault(_jquery);

var _lodashFp = require('lodash-fp');

var _lodashFp2 = _interopRequireDefault(_lodashFp);

var _ash = require('./ash');

var _ash2 = _interopRequireDefault(_ash);

global.$ = _jquery2.default;
global._ = _lodashFp2.default;
global.ash = _ash2.default;

var Renderer = global.Renderer = new _ash2.default.Renderer();

var List = (function (_ash$Component) {
	function List() {
		_classCallCheck(this, List);

		if (_ash$Component != null) {
			_ash$Component.apply(this, arguments);
		}

		this.state = { redOutline: false };
		this.name = 'List';
	}

	_inherits(List, _ash$Component);

	_createClass(List, [{
		key: 'render',
		value: function render() {
			var items = [_ash2.default.e('button', {
				events: { click: this.changeOutline }
			}, '!!!')];

			for (var i = 0; i < this.props.length; i++) {
				// items.push(ash.e('li', {key: i + ''}, this.props[i] + ''));
				// items.push(ash.e('li', null, this.props[i] + ''));
				items.push(_ash2.default.e(
					'li',
					null,
					'' + this.props[i]
				));
			}

			// return ash.e('ul', {style: {outline: this.state.redOutline ? '1px solid red' : '1px solid blue'}}, items);
			return _ash2.default.e(
				'ul',
				{ style: {
						outline: this.state.redOutline ? '1px solid red' : '1px solid blue'
					} },
				items
			);
		}
	}, {
		key: 'changeOutline',
		value: function changeOutline() {
			this.state.redOutline = !this.state.redOutline;

			this.isDirty = true;
		}
	}, {
		key: 'onBeforeReceiveProps',
		value: function onBeforeReceiveProps() {}
	}]);

	return List;
})(_ash2.default.Component);

var App = (function (_ash$Component2) {
	function App() {
		_classCallCheck(this, App);

		if (_ash$Component2 != null) {
			_ash$Component2.apply(this, arguments);
		}

		this.state = new _ash2.default.ImmutableObject({
			list1: new _ash2.default.ImmutableArray(),
			list2: new _ash2.default.ImmutableArray(),
			redShadow: true
		});
		this.name = 'App';
	}

	_inherits(App, _ash$Component2);

	_createClass(App, [{
		key: 'render',
		value: function render() {
			/*return ash.e('div', null,
   	ash.e('div', {
   		style: {
   			boxShadow: this.state.redShadow ? '2px 2px 5px red' : '2px 2px 5px blue'
   		}
   	},
   		ash.e('button', {
   			events: {click: this.addToList1}
   		}, '+ list 1'),
   		ash.e('button', {
   			events: {click: this.addToList2}
   		}, '+ list 2'),
   		ash.e('button', {
   			events: {click: this.clearList1}
   		}, '+ clear 1'),
   		ash.e('button', {
   			events: {click: this.clearList2}
   		}, '+ clear 2'),
   		ash.e('button', {
   				events: {click: this.changeShadow}
   			}, '!!!')),
   	ash.e(List, this.state.list1),
   	ash.e(List, this.state.list2));*/
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
				_ash2.default.e(List, this.state.list1),
				_ash2.default.e(List, this.state.list2)
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

Renderer.addComponent(_ash2.default.e(App, null), global.document.querySelector('.page'));

// console.log(<div>test</div>);