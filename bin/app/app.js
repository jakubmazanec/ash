"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj.default : obj; };

var _prototypeProperties = function (child, staticProps, instanceProps) { if (staticProps) Object.defineProperties(child, staticProps); if (instanceProps) Object.defineProperties(child.prototype, instanceProps); };

var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var $ = _interopRequire(require("jquery"));

var _ = _interopRequire(require("_"));

var ash = _interopRequire(require("./ash"));

var imm = _interopRequire(require("seamless-immutable"));

var Immutable = _interopRequire(require("immutable"));

var mori = _interopRequire(require("mori"));

var Display = _interopRequire(require("./components/Display"));

var Timer = _interopRequire(require("./components/Timer"));

global.$ = $;
global._ = _;
global.ash = ash;
global.imm = imm;
global.mori = mori;
global.Immutable = Immutable;

var Renderer = global.Renderer = new ash.Renderer();


// Renderer.addComponent(new Timer(), $('.page')[0]);

var AppComponent = (function (_ash$Component) {
	function AppComponent() {
		_classCallCheck(this, AppComponent);

		if (_ash$Component != null) {
			_ash$Component.apply(this, arguments);
		}
	}

	_inherits(AppComponent, _ash$Component);

	_prototypeProperties(AppComponent, null, {
		getInitialState: {
			value: function getInitialState() {
				return new ash.ImmutableObject({
					list1: new ash.ImmutableArray(),
					list2: new ash.ImmutableArray()
				});
			},
			writable: true,
			configurable: true
		},
		render: {
			value: function render() {
				return ash.e("div", null, ash.e("div", null, ash.e("button", {
					events: { click: this.addToList1 }
				}, "+ list 1"), ash.e("button", {
					events: { click: this.addToList2 }
				}, "+ list 2")), new List(this.state.list1), new List(this.state.list2));
			},
			writable: true,
			configurable: true
		},
		addToList1: {
			value: function addToList1() {
				var items = [];

				for (var i = 0; i < 1000; i++) {
					items.push(Math.random().toFixed(1));
				}

				this.state = this.state.merge({ list1: this.state.list1.concat(items) });

				this.setDirty();
			},
			writable: true,
			configurable: true
		},
		addToList2: {
			value: function addToList2() {
				var items = [];

				for (var i = 0; i < 1000; i++) {
					items.push(Math.random().toFixed(1));
				}

				this.state = this.state.merge({ list2: this.state.list2.concat(items) });

				this.setDirty();
			},
			writable: true,
			configurable: true
		}
	});

	return AppComponent;
})(ash.Component);

var App = ash.createFactory(AppComponent);

var ListComponent = (function (_ash$Component2) {
	function ListComponent() {
		_classCallCheck(this, ListComponent);

		if (_ash$Component2 != null) {
			_ash$Component2.apply(this, arguments);
		}
	}

	_inherits(ListComponent, _ash$Component2);

	_prototypeProperties(ListComponent, null, {
		shouldUpdate: {
			value: function shouldUpdate(nextProps) {
				//console.log('should i update list?', this.props !== nextProps);

				return this.props !== nextProps;
				//return true;
			},
			writable: true,
			configurable: true
		},
		render: {
			value: function render() {
				var items = [];

				for (var i = 0; i < this.props.length; i++) {
					items.push(ash.e("li", null, this.props[i] + ""));
				}

				return ash.e("ul", null, items);
			},
			writable: true,
			configurable: true
		}
	});

	return ListComponent;
})(ash.Component);

var List = ash.createFactory(ListComponent);

Renderer.addComponent(new App(), $(".page")[0]);





var start;
var end;
var total1 = 0;
var total2 = 0;

function parseAshNodeIndex1(index) {
	return index.split(".").map(function (value) {
		return parseInt(value, 10);
	});
}

function parseAshNodeIndex2(index) {
	var result = index.split(".");
	for (var i = 0; i < result.length; i++) {
		result[i] = parseInt(result[i], 10);
	}

	return result;
}

for (var j = 0; j < 10; j++) {
	start = global.performance.now();
	for (var i = 0; i < 1000; i++) {
		parseAshNodeIndex1("0.1.2.3.4.5.6.7.8.9.10");
	}
	end = global.performance.now();
	total1 += end - start;

	start = global.performance.now();
	for (var i = 0; i < 1000; i++) {
		parseAshNodeIndex2("0.1.2.3.4.5.6.7.8.9.10");
	}
	end = global.performance.now();
	total2 += end - start;
}




console.log("parseAshNodeIndex1", total1 / 10);
console.log("parseAshNodeIndex2", total2 / 10);


// var map1 = new ash.ImmutableArray(1, 2);
// var map2 = map1.push(3);
// var map3 = map2.reverse();
// var map4 = new ash.ImmutableArray(map1, 4, 5);
// var map5 = map1.push(map3);
// var map6 = new ash.ImmutableArray([[10, 20], [30, 40]]);
// var map7 = map1.set(3, 'oi!');

// var hash1 = new ash.ImmutableObject({foo: 1, bar: 2});
// var hash2 = hash1.set('pax', {qux: 'oi!'});
// var hash3 = hash1.set('foo', 1);
// var hash4 = hash1.set('foo', '1');
// var hash5 = new ash.ImmutableObject({
// 	foo: 1,
// 	bar: {
// 		pax: 'oi!',
// 		qux: true,
// 		norf: null,
// 		baz: {
// 			foo: () => {},
// 			bar: undefined
// 		}
// 	}
// });

// var hash6 = hash5.merge({
// 	/*bar: {
// 		baz: {
// 			foo: () => {},
// 			bar: undefined
// 		}
// 	}*/
// 	bar: {
// 		pax: false
// 	}
// });

// var hash7 = new ash.ImmutableObject({
// 	orig: 'so so!'
// });

// var hash8 = hash5.merge({imm: [1, 2, hash7]});


// console.log('map1', JSON.stringify(map1), map1, map1['__ash:immutable__']);
// console.log('map2', JSON.stringify(map2), map2);
// console.log('map3', JSON.stringify(map3), map3);
// console.log('map4', JSON.stringify(map4), map4, map4[0] === map1);
// console.log('map5', JSON.stringify(map5), map5, map5[2] === map3);
// console.log('map6', JSON.stringify(map6), map6);
// console.log('map7', JSON.stringify(map7), map7);

// console.log('hash1', JSON.stringify(hash1), hash1);
// console.log('hash2', JSON.stringify(hash2), hash2);
// console.log('hash3', JSON.stringify(hash3), hash3, hash3 === hash1);
// console.log('hash4', JSON.stringify(hash4), hash4, hash4 === hash1);
// console.log('hash5', JSON.stringify(hash5), hash5);
// console.log('hash6', JSON.stringify(hash6), hash6, hash6 === hash5);
// console.log('hash7', JSON.stringify(hash7), hash7);
// console.log('hash8', JSON.stringify(hash8), hash8, hash8.imm[2] === hash7);


var array = [];
var object1 = {};
var object2 = {};


for (var i = 0; i < 10000; i++) {
	array.push(i);
}

for (var i = 0; i < 50000; i++) {
	object1[i + ""] = i;
}

for (var i = 0; i < 50000; i++) {
	object2[i + ""] = i + 50000;
}

// start = performance.now();
// var map1 = new ash.ImmutableArray(array);
// end = performance.now();
// console.log('create ImmutableArray', end - start);

// start = performance.now();
// var map2 = new Immutable.List(array);
// end = performance.now();
// console.log('create List', end - start);

// start = performance.now();
// for (let i = 0; i < 100; i++) {
// 	map1.push(i);
// }
// end = performance.now();
// console.log('push to ImmutableArray', end - start);

// start = performance.now();
// for (let i = 0; i < 100; i++) {
// 	map2.push(i);
// }
// end = performance.now();
// console.log('push to List', end - start);


for (var i = 0; i < 5; i++) {}

// var map1 = imm({foo: {bar: true}});

// var map2 = map1.merge({foo: {}});


//console.log(map1, map2, map1 === map2);


/*class SubArray extends Array {
	constructor() {
		var arr = [ ];
	  arr.push.apply(arr, arguments);
	  arr.__proto__ = SubArray.prototype;
	  return arr;
	}

	lastElement() {
		return this[this.length - 1];
	}
}

var sub = new SubArray(1, 2, 3);

console.log('tag', Object.prototype.toString.call(sub));
console.log('instanceof SubArray', sub instanceof SubArray);
console.log('instanceof Array', sub instanceof Array);
console.log('isArray', Array.isArray(sub));
console.log('lastElement', sub.lastElement ? sub.lastElement() : 'not a function!');
console.log('---');
console.log(sub.length, JSON.stringify(sub));

sub.length = 1;
console.log(sub.length, JSON.stringify(sub));

sub[10] = 'x';
console.log(sub.length, JSON.stringify(sub));

sub.push(1);
console.log(sub.length, JSON.stringify(sub));*/





/*$(document).on('click', 'a', function (event) {
	event.preventDefault();


});

var $buttons = $('.ash-button--flat').eq(0);
var progress = 0;

var makeProgress = function () {
	console.log(progress);

	progress += Math.random();

	if (progress > 100) progress = 0;

	$buttons.removeClass (function (index, css) {
	    return (css.match (/(^|\s)progress-\S+/g) || []).join(' ');
	});

	$buttons.addClass('progress-' + Math.floor(progress));

	requestAnimationFrame(makeProgress);
};*/

//requestAnimationFrame(makeProgress);

//Renderer.addComponent(timer(), $('.page-content')[0]);


/*class FooComponent extends ash.Component {
	render() {
		return ash.e('div', {
			style: {
				'border-top': '1px solid red',
				'font-size': '24px'
			},
			'checked': true,
			'value': 42,
			'data-foo': '<This is Foo!>'
		}, [
			ash.e('b', null, 'This is Foo!')
		]);
	}
}

var fooComponent = ash.createFactory(FooComponent);*/


//html = Renderer.componentToString(fooComponent());
//html = Renderer.componentToString(Timer());

//console.log(html);



//$('.page').html('<br>');









/**
 * observables & actions test
 *

class BarAction extends ash.Action {
	onTrigger(value)
	{
		return value * 2;
	}
}




var fooObservable = global.fooObservable = new ash.Observable();
var barAction = global.barAction = new BarAction();

fooObservable.name = 'fooObservable';
barAction.name = 'barAction';

function report()
{
	console.log('reporting argument 1: ', arguments[0], ' and 2: ', arguments[1]);
	console.log('this is ', this);
}

function reportAll()
{
	console.log('reporting all arguments: ', arguments);
	console.log('this is ', this);
}

fooObservable.observe(barAction, '*', report);

barAction.trigger(42, 47);*/


















/**
 * todo
 */

/*var TodoStore = require('./todo/TodoStore');
var TodoApp = require('./todo/components/TodoApp');*/

/*var router = global.router = new ash.Router();
router.add('*all', 'not found');
router.on('all', function ()
{
	console.log('router triggered something', arguments);
});
router.start();*/


// global.TodoStore = TodoStore;
// var todoApp = global.todoApp = new TodoApp();

// TodoStore.create('foo');
// TodoStore.create('bar');
// TodoStore.create('baz');
// // TodoStore.create('qux');

// TodoStore.todos['todo-1'].complete = true;

// Renderer.registerComponent(todoApp, $('.page-content')[0]);


// start = global.performance.now();
// var map1 = new ash.ImmutableObject(object1);
// end = global.performance.now();
// console.log('create ImmutableObject', end - start);

// start = performance.now();
// var map2 = new Immutable.Map(object2);
// end = performance.now();
// console.log('create Map', end - start);

// start = performance.now();
// var map3 = new imm(object1);
// end = performance.now();
// console.log('create imm', end - start);

// start = global.performance.now();
// map1.merge(object2);
// end = global.performance.now();
// console.log('merge to ImmutableObject', end - start);

// start = performance.now();
// map2.merge(object2);
// end = performance.now();
// console.log('merge to Map', end - start);

// start = performance.now();
// map3.merge(object2);
// end = performance.now();
// console.log('merge to imm', end - start);