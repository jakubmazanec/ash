// import $ from 'jquery';
import _ from 'lodash-fp';
import ash from './ash';


// import Display from './components/Display';
// import Timer from './components/Timer';

// global.$ = $;
global._ = _;
global.ash = ash;

var Renderer = global.Renderer = new ash.Renderer();








// Renderer.addComponent(new Timer(), $('.page')[0]);

class AppComponent extends ash.Component {
	/* jshint ignore:start */
	state = new ash.ImmutableObject({
		list1: new ash.ImmutableArray(),
		list2: new ash.ImmutableArray(),
		redShadow: true
	});

	/*state = {
		list1: [],
		list2: [],
		redShadow: true
	};*/

	name = 'App';
	/* jshint ignore:end */

	render() {
		return ash.e('div', null,
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
			new List(this.state.list1),//);
			new List(this.state.list2));
	}

	onMount() {
		console.log('App mounted!');
	}

	changeShadow() {
		this.state = this.state.set('redShadow', !this.state.redShadow);
		this.isDirty = true;
	}

	addToList1() {
		var items = [];

		for (let i = 0; i < 5000; i++) {
			items.push(Math.random().toFixed(1));
		}

		this.state = this.state.merge({list1: this.state.list1.concat(items)});
		// this.state.list1 = this.state.list1.concat(items);

		this.isDirty = true;
	}

	addToList2() {
		var items = [];

		for (let i = 0; i < 5000; i++) {
			items.push(Math.random().toFixed(1));
		}

		this.state = this.state.merge({list2: this.state.list2.concat(items)});
		// this.state.list2 = this.state.list2.concat(items);

		this.isDirty = true;
	}

	clearList1() {
		this.state = this.state.merge({list1: []});
		// this.state.list1 = [];
		this.isDirty = true;
	}

	clearList2() {
		this.state = this.state.merge({list2: []});
		// this.state.list2 = [];
		this.isDirty = true;
	}
}

var App = ash.createElement(AppComponent);

class ListComponent extends ash.Component {
	/* jshint ignore:start */
	state = {redOutline: false};

	name = 'List';
	/* jshint ignore:end */

	render() {
		var items = [ash.e('button', {
					events: {click: this.changeOutline}
				}, '!!!')];

		for (let i = 0; i < this.props.length; i++) {
			items.push(ash.e('li', null/*{key: i + ''}*/, this.props[i] + ''));
		}

		return ash.e('ul', {style: {outline: this.state.redOutline ? '1px solid red' : '1px solid blue'}}, items);
	}

	changeOutline() {
		this.state.redOutline = !this.state.redOutline;

		this.isDirty = true;
	}

	onBeforeReceiveProps() {
	}
}

var List = ash.createElement(ListComponent);

Renderer.addComponent(new App(), global.document.querySelector('.page'));















// benchmark
// var start;
// var end;
// var total1 = 0;
// var total2 = 0;
// var total3 = 0;
// var total4 = 0;
// var total5 = 0;
// var total6 = 0;


// var object = {a: 1, b: 2};

// var coll = icepick.freeze(object);
// var imobj = new ash.ImmutableObject(object);


// const TEST_STRESS = 100;
// const TEST_REPEAT = 10;

// for (let j = 0; j < TEST_REPEAT; j++) {
// 	start = global.performance.now();
// 	for (let i = 0; i < TEST_STRESS; i++) {
// 		coll = icepick.assoc(coll, 'new' + i, i);
// 	}
// 	end = global.performance.now();
// 	total1 += (end - start);

// 	start = global.performance.now();
// 	for (let i = 0; i < TEST_STRESS; i++) {
// 		imobj = imobj.set('new' + i, i);
// 	}
// 	end = global.performance.now();
// 	total2 += (end - start);

	// start = global.performance.now();
	// for (let i = 0; i < TEST_STRESS; i++) {
	// 	zeroPadNumber2(12345, 10, '0');
	// }
	// end = global.performance.now();
	// total3 += (end - start);
// }

// console.log('icepick', total1 / TEST_REPEAT);
// console.log('ImmutableObject', total2 / TEST_REPEAT);
// console.log('_.padLeft', total3 / TEST_REPEAT);


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

