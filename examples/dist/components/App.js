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

var _storesList1Store = require('../stores/list1Store');

var _storesList1Store2 = _interopRequireDefault(_storesList1Store);

var _storesList2Store = require('../stores/list2Store');

var _storesList2Store2 = _interopRequireDefault(_storesList2Store);

var _storesAppStore = require('../stores/appStore');

var _storesAppStore2 = _interopRequireDefault(_storesAppStore);

var _immutable = require('immutable');

var _immutable2 = _interopRequireDefault(_immutable);

var App = (function (_ash$Component) {
	function App() {
		_classCallCheck(this, App);

		if (_ash$Component != null) {
			_ash$Component.apply(this, arguments);
		}
	}

	_inherits(App, _ash$Component);

	_createClass(App, [{
		key: 'render',
		value: function render() {
			/*return <section>
   	<header style={{
   		boxShadow: appStore.get().get('appShadow') ? '2px 2px 5px red' : '2px 2px 5px blue'
   	}}>
   		<a href="#" events={{click: this.addToList1}}>+ list 1!</a>
   	</header>
   	<List label="List1" list={list1Store.get()} shadow={appStore.get().get('list1Shadow')} changeShadow={this.changeList1Shadow} />
   </section>;*/

			return _ash2.default.e(
				'div',
				null,
				_ash2.default.e(
					'div',
					{ style: {
							boxShadow: _storesAppStore2.default.get().get('appShadow') ? '2px 2px 5px red' : '2px 2px 5px blue'
						} },
					_ash2.default.e(
						'button',
						{ events: {
								click: this.list1.update.bind(null, 1)
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
				_ash2.default.e(_List2.default, { label: 'List1', list: _storesList1Store2.default.get(), shadow: _storesAppStore2.default.get().get('list1Shadow'), changeShadow: this.changeList1Shadow }),
				_ash2.default.e(_List2.default, { label: 'List2', list: _storesList2Store2.default.get(), shadow: _storesAppStore2.default.get().get('list2Shadow'), changeShadow: this.changeList2Shadow })
			);
		}
	}, {
		key: 'onMount',
		value: function onMount() {
			// list1Store.subscribe(this.onList1StoreUpdate);
			// list2Store.subscribe(this.onList2StoreUpdate);
			// appStore.subscribe(this.onAppStoreUpdate);
			_storesList1Store2.default.subscribe(this.update);
			_storesList2Store2.default.subscribe(this.update);
			_storesAppStore2.default.subscribe(this.update);
		}
	}, {
		key: 'onList1StoreUpdate',
		value: function onList1StoreUpdate(stream, changed, dependencies) {
			// console.log('onList1StoreUpdate...', changed);

			this.update();
		}
	}, {
		key: 'onList2StoreUpdate',
		value: function onList2StoreUpdate(stream, changed, dependencies) {
			// console.log('onList2StoreUpdate...', changed);

			this.update();
		}
	}, {
		key: 'onAppStoreUpdate',
		value: function onAppStoreUpdate(stream, changed, dependencies) {
			// console.log('onAppStoreUpdate...', changed);

			this.update();
		}
	}, {
		key: 'changeShadow',
		value: function changeShadow() {
			_storesAppStore2.default.push(_storesAppStore2.default.get().set('appShadow', !_storesAppStore2.default.get().get('appShadow')));
		}
	}, {
		key: 'addToList1',
		value: function addToList1(event) {
			event.preventDefault();
			// console.log('App addToList1...');

			this.list1.push(100);
			// var items = [];

			// for (let i = 0; i < 5000; i++) {
			// 	items.push(Math.random().toFixed(1));
			// }

			// list1Store.push(list1Store.get().push(...items));
		}
	}, {
		key: 'addToList2',
		value: function addToList2() {
			// console.log('App addToList2...');
			this.list2.push(5000);
			// var items = [];

			// for (let i = 0; i < 5000; i++) {
			// 	items.push(Math.random().toFixed(1));
			// }

			// list2Store.push(list2Store.get().push(...items));
		}
	}, {
		key: 'clearList1',
		value: function clearList1() {
			_storesList1Store2.default.push(new _immutable2.default.List());
		}
	}, {
		key: 'clearList2',
		value: function clearList2() {
			_storesList2Store2.default.push(new _immutable2.default.List());
		}
	}, {
		key: 'changeList1Shadow',
		value: function changeList1Shadow() {
			_storesAppStore2.default.push(_storesAppStore2.default.get().set('list1Shadow', !_storesAppStore2.default.get().get('list1Shadow')));
		}
	}, {
		key: 'changeList2Shadow',
		value: function changeList2Shadow() {
			_storesAppStore2.default.push(_storesAppStore2.default.get().set('list2Shadow', !_storesAppStore2.default.get().get('list2Shadow')));
		}
	}], [{
		key: 'list1',
		value: new _ash2.default.Stream({
			transformFn: function (number, event) {
				return { event: event, number: number };
			}
		}),
		enumerable: true
	}, {
		key: 'list2',
		value: new _ash2.default.Stream(),
		enumerable: true
	}]);

	return App;
})(_ash2.default.Component);

exports.default = App;
module.exports = exports.default;

// click: this.addToList1