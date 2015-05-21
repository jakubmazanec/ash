/*eslint-disable no-unused-vars, vars-on-top, no-console, no-multiple-empty-lines */

// import $ from 'jquery';
// import _ from 'lodash-fp';
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

var _ash = require('ash');

var _ash2 = _interopRequireDefault(_ash);

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
// const MAX = 100000;

// var foo$ = new ash.Stream();

// $('body').on('click', () => {
// 	for (let i = 0; i < MAX + 1; i++) {
// 		foo$.push(i);
// 	}
// });

// setTimeout(() => {
// 	for (let i = 0; i < MAX + 1; i++) {
// 		foo$.push(i);
// 	}
// }, 1000);

// var bar$ = ash.Stream.from(() => {
// 	if (foo$.get() >= MAX) {
// 		console.log('ash Done!', MAX, foo$.get());
// 	}
// }, foo$);

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

var _componentsApp = require('./components/App');

var _componentsApp2 = _interopRequireDefault(_componentsApp);

// import flyd from 'flyd';
// import rx from 'rx';

// global.$ = $;
// global._ = _;
global.ash = _ash2.default;
// global.flyd = flyd;
// global.rx = rx;

var Renderer = global.Renderer = new _ash2.default.Renderer();

console.log('ash.js start...');
function _ref(value, index) {
	return _ash2.default.e(
		'button',
		{ key: '' + index /* events={{click: this.hello.bind(null, index, value)}}*/ },
		'' + value
	);
}

var ReorderApp = (function (_ash$Component) {
	function ReorderApp() {
		_classCallCheck(this, ReorderApp);

		if (_ash$Component != null) {
			_ash$Component.apply(this, arguments);
		}

		this.state = {
			reversed: false,
			items: []
		};
	}

	_inherits(ReorderApp, _ash$Component);

	_createClass(ReorderApp, [{
		key: 'render',
		value: function render() {
			var items = this.state.items.map(_ref);

			if (this.state.reversed) {}

			return _ash2.default.e(
				'div',
				null,
				_ash2.default.e('button', { key: 'btn', events: {
						click: this.addItem
					} }),
				this.state.reversed ? _ash2.default.e(
					'b',
					null,
					'!'
				) : null,
				_ash2.default.e(
					'div',
					{ key: 'inr' },
					this.state.reversed ? _ash2.default.e(
						'b',
						null,
						'!'
					) : null,
					_ash2.default.e(
						'div',
						{ key: 'itm' },
						items
					)
				)
			);
		}
	}, {
		key: 'addItem',
		value: function addItem() {
			console.log('adding item...');

			this.state.items.push('' + (Math.random() * 100 >> 0));
			this.state.reversed = !this.state.reversed;

			this.isDirty = true;
		}
	}, {
		key: 'hello',
		value: function hello(index, value) {
			console.log('Hello, this is', value, 'at', index);
		}
	}]);

	return ReorderApp;
})(_ash2.default.Component);

var viewStream = _ash2.default.AshNodeStream.from(_ash2.default.e(_componentsApp2.default, null));
// var viewStream = ash.AshNodeStream.from(<ReorderApp />);

console.log('viewStream', viewStream);

Renderer.addStream(viewStream, global.document.querySelector('.page'));

// items = items.reverse();
/*'' + this.state.reversed*/