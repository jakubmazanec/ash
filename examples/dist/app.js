/*eslint-disable no-unused-vars, vars-on-top, no-console, no-multiple-empty-lines */

'use strict';

var _inherits = require('babel-runtime/helpers/inherits').default;

var _createClass = require('babel-runtime/helpers/create-class').default;

var _classCallCheck = require('babel-runtime/helpers/class-call-check').default;

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default').default;

var _jquery = require('jquery');

var _jquery2 = _interopRequireDefault(_jquery);

var _lodashFp = require('lodash-fp');

var _lodashFp2 = _interopRequireDefault(_lodashFp);

var _ash = require('./ash');

var _ash2 = _interopRequireDefault(_ash);

var _flyd = require('flyd');

var _flyd2 = _interopRequireDefault(_flyd);

var _rx = require('rx');

var _rx2 = _interopRequireDefault(_rx);

// global.$ = $;
// global._ = _;
// global.ash = ash;
// global.flyd = flyd;
// global.rx = rx;

// var Renderer = global.Renderer = new ash.Renderer();

console.log('ash.js start...');

// var promise1 = new Promise((resolve) => {
// 	setTimeout(() => {
// 		resolve('promise 1 resolved!');
// 	}, 2000);
// });

// var promise2 = new Promise((resolve) => {
// 	setTimeout(() => {
// 		resolve('promise 2 resolved!');
// 	}, 4000);
// });

// var promise1 = 'no promise 1';
// var promise2 = 'no promise 2';

// var foo$ = flyd.stream();

// console.log(foo$);

// foo$(promise1);
// foo$(promise2);

// flyd.stream([foo$], function() {
// 	console.log('Recieved response!', arguments);
// 	console.log(foo$());
// });

// var foo$ = new ash.Stream();

// console.log(foo$);

// foo$.push(promise1);

// foo$.push(promise2);

// benchmark
var MAX = 100000;

var foo$ = new _ash2.default.Stream();

console.log(foo$);

// $('body').on('click', () => {
// 	for (let i = 0; i < MAX + 1; i++) {
// 		foo$.push(i);
// 	}
// });

setTimeout(function () {
	for (var i = 0; i < MAX + 1; i++) {
		foo$.push(i);
	}
}, 1000);

var bar$ = _ash2.default.Stream.from(function () {
	if (foo$.get() >= MAX) {
		console.log('ash Done!', MAX, foo$.get());
	}
}, foo$);

console.log(bar$);

function _ref(value, index) {
	return _ash2.default.e(
		'li',
		{ key: '' + index },
		'' + value
	);
}

// var testStream = new rx.ReplaySubject();

// setTimeout(() => {
// 	for (let i = 0; i < MAX + 1; i++) {
// 		testStream.onNext(i);
// 	}
// }, 1500);

// var resultStream = testStream.subscribe((value) => {
// 	if (value >= MAX) {
// 		console.log('rx Done!', MAX, value);
// 	}
// });

// merge test
/*var btn1Clicks = new ash.Stream();
var btn2Clicks = new ash.Stream();

btn1Clicks.name = 'btn1Clicks';
btn2Clicks.name = 'btn2Clicks';

// console.log(btn1Clicks);

$('body').on('click', btn1Clicks.push);
$('body').on('keydown', btn2Clicks.push);

var allClicks = ash.Stream.merge(btn1Clicks, btn2Clicks);

allClicks.name = 'allClicks';

allClicks.subscribe(() => {
	console.log('allClicks subscription!');
})


var resultStream = new ash.Stream();

resultStream.name = 'resultStream';


resultStream.from(() => {
	// console.log(btn1Clicks.end.get(), btn2Clicks.end.get(), allClicks.end.get());
 //  console.log(allClicks.get());
}, allClicks);

setTimeout(() => {
	console.log('btn1Clicks end!');
	btn1Clicks.end.push(true);
}, 2000);

setTimeout(() => {
	console.log('btn2Clicks end!');
	// btn2Clicks.end.push(true);
}, 4000);

setInterval(() => {
	// console.log(btn1Clicks.end.get(), btn2Clicks.end.get(), allClicks.end.get());
}, 250);*/

/*var btn1Clicks = flyd.stream();
var btn2Clicks = flyd.stream();

$('body').on('click', btn1Clicks);
$('body').on('keydown', btn2Clicks);

var allClicks = flyd.merge(btn1Clicks, btn2Clicks);
var resultStream = flyd.stream([allClicks], () => {
	console.log(btn1Clicks.end(), btn2Clicks.end(), allClicks.end());
  console.log(allClicks());
});

setTimeout(() => {
	console.log('btn1Clicks end!');
	btn1Clicks.end(true);
}, 2000);

setTimeout(() => {
	console.log('btn2Clicks end!');
	btn2Clicks.end(true);
}, 4000);

setInterval(() => {
	console.log(btn1Clicks.end(), btn2Clicks.end(), allClicks.end());
}, 250);*/

/*var foo$ = flyd.stream([], () => 'oi!');

flyd.stream([foo$], function() {
	console.log('Recieved response!');
	console.log(foo$());
});*/

// var foo$ = new ash.Stream(() => 'oi!');

// console.log(foo$);

// var bar$ = new ash.Stream([foo$], function() {
// 	console.log('Recieved response!', arguments);
// 	console.log(foo$.get());
// });

// console.log(bar$);

// mappign test
/*var numbers = new ash.Stream();
var squaredNumbers = numbers.map((n) => Math.round(n));

setInterval(() => {
	numbers.push(Math.random());
}, 1000);

new ash.Stream([squaredNumbers], () => {
	console.log(squaredNumbers.get());
});*/

/*var numbers = flyd.stream(0);
var squaredNumbers = flyd.map(function(n) { return n * n; }, numbers);


flyd.stream([squaredNumbers], () => {
	console.log(squaredNumbers());
});*/

// atomic updates test
/*var a = new ash.Stream();
var b = new ash.Stream();

a.push(1);
b.push(2);

var b = new ash.Stream();

b.from(() => {
	return a.get() * 2;
}, a);

var c = new ash.Stream();

c.from(() => {
	return a.get() + 4;
}, a);

var d = new ash.Stream();

d.from(function(self, ch) {
  console.log(b.get(), c.get(), b.get() + c.get());
  // a.end.push(true);
}, b, c);

console.log(d);*/

// var a = flyd.stream(1);

// setTimeout(() => a(2), 500);

// var b = flyd.stream([a], function() { console.log(arguments); return a() * 2; });
// var c = flyd.stream([a], function() { console.log(arguments); return a() + 4; });
// var d = flyd.stream([b, c], function(self, ch) {
// 	console.log(arguments);
//   console.log(b() + c());
// });

// end stream test
/*var n1 = new ash.Stream();
var n2 = new ash.Stream();
var sum = new ash.Stream();

setInterval(() => {
	n1.push(1);
}, 500);

setInterval(() => {
	n2.push(2);
}, 600);

sum.from(() => {
	console.log(n1.get(), n2.get());
}, n1, n2);

$('body').on('click', (event) => {
	event.preventDefault();

	console.log('ending n1!');

	n1.end.push(true);
});

$('body').on('keydown', () => {
	console.log('ending n2!');

	n2.end.push(true);
});*/

/*var n1 = flyd.stream();
var n2 = flyd.stream();
var sum = flyd.stream([n1, n2], function() {
  console.log(n1(), n2());

  return n1() + n2();
});

n1.foo = 'n1';
n2.foo = 'n2';
sum.foo = 'sum';

console.log(n1, n2, sum);

setInterval(() => {
	n1(1);
}, 500);

setInterval(() => {
	n2(2);
}, 600);


$('body').on('click', (event) => {
	event.preventDefault();

	console.log('ending n1!');

	n1.end(true);
});

$('body').on('keydown', () => {
	console.log('ending n2!');

	n2.end(true);
});*/

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
			return _ash2.default.e(
				'ul',
				{ style: {
						outline: this.state.redOutline ? '1px solid red' : '1px solid blue'
					} },
				_ash2.default.e(
					'button',
					{ events: {
							click: this.changeOutline
						} },
					'!!!'
				),
				this.props.map(_ref)
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

// Renderer.addComponent(<App />, global.document.querySelector('.page'));

// console.log(<div>test</div>);