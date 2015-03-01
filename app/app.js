// import $ from 'jquery';
import _ from 'lodash-fp';
import ash from './ash';


// import Display from './components/Display';
// import Timer from './components/Timer';

// global.$ = $;
global._ = _;
global.ash = ash;

var Renderer = global.Renderer = new ash.Renderer();



class LogoComponent extends ash.Component {
	render() {
		var badge = [
			ash.e('path', {
				fill: '#ffb819',
				d: 'M27,0C12.112,0,0,12.112,0,27c0,0.677,0.033,1.346,0.083,2.01c0.008,0.113,0.016,0.226,0.026,0.34c0.186,2.13,0.618,4.19,1.271,6.15l11.066-11.066C12.162,23.674,12,22.857,12,22c0-3.859,3.14-7,7-7s7,3.141,7,7c0,1.126-0.273,2.188-0.748,3.131L31,30.879l3.086-3.086C33.88,27.23,33.75,26.633,33.75,26c0-2.895,2.355-5.25,5.25-5.25s5.25,2.355,5.25,5.25c0,0.633-0.13,1.23-0.336,1.793l8.454,8.454c0.257-0.702,0.483-1.42,0.682-2.149c0.008-0.03,0.018-0.059,0.026-0.089c0.186-0.691,0.341-1.396,0.472-2.108c0.017-0.096,0.035-0.191,0.051-0.287c0.12-0.691,0.214-1.392,0.28-2.1c0.009-0.1,0.015-0.199,0.022-0.299C53.962,28.484,54,27.747,54,27C54,12.112,41.888,0,27,0z'
			}),
			ash.e('path', {
				fill: '#ffb819',
				d: 'M29.206,53.902c0.492-0.039,0.981-0.092,1.464-0.158c0.088-0.012,0.178-0.019,0.266-0.033c0.587-0.086,1.168-0.191,1.742-0.314c0.063-0.014,0.124-0.029,0.186-0.043c0.54-0.12,1.073-0.256,1.6-0.407c0.054-0.016,0.107-0.03,0.161-0.046c7.174-2.117,13.112-7.143,16.45-13.703l-8.979-8.979C41.226,30.858,40.162,31.25,39,31.25s-2.226-0.392-3.097-1.032l-3.843,3.843C31.768,34.354,31.384,34.5,31,34.5s-0.768-0.146-1.06-0.439l-6.587-6.588C22.156,28.426,20.645,29,19,29c-1.899,0-3.622-0.763-4.884-1.995L2.592,38.529c3.246,6.846,9.287,12.117,16.64,14.33c0.025,0.008,0.051,0.015,0.077,0.022c0.544,0.162,1.097,0.304,1.655,0.433c0.088,0.02,0.175,0.041,0.264,0.061c0.585,0.128,1.177,0.239,1.775,0.328c0.054,0.008,0.108,0.014,0.162,0.021c0.527,0.075,1.059,0.132,1.596,0.177c0.149,0.012,0.299,0.023,0.45,0.034C25.802,53.973,26.398,54,27,54c0.589,0,1.171-0.025,1.751-0.063C28.903,53.928,29.055,53.915,29.206,53.902z'
			}),
			ash.e('circle', {
				fill: '#ffb819',
				cx: '39',
				cy: '26',
				r: '2.75'
			}),
			ash.e('path', {
				fill: '#ffb819',
				d: 'M23,22c0-2.205-1.794-4-4-4s-4,1.795-4,4s1.794,4,4,4S23,24.205,23,22z'
		})];
		var label = [
			ash.e('path', {
				fill: '#292624',
				d: 'M78,21.04c0-0.18,0.144-0.342,0.324-0.342h4.393c3.475,0,6.32,2.827,6.32,6.284c0,3.493-2.845,6.32-6.32,6.32h-4.393c-0.18,0-0.324-0.162-0.324-0.342V21.04z M82.538,30.637c2.035,0,3.511-1.602,3.511-3.655c0-2.035-1.476-3.637-3.511-3.637h-1.729v7.292H82.538z'
			}),
			ash.e('path', {
				fill: '#292624',
				d: 'M89.664,32.833l5.636-12.118c0.054-0.108,0.18-0.198,0.306-0.198h0.18c0.126,0,0.252,0.09,0.306,0.198l5.636,12.118c0.108,0.234-0.036,0.468-0.306,0.468h-1.999c-0.324,0-0.468-0.108-0.63-0.45l-0.648-1.422h-4.897l-0.648,1.44c-0.09,0.216-0.288,0.432-0.648,0.432H89.97C89.7,33.302,89.556,33.068,89.664,32.833z M97.064,28.98l-1.368-2.971h-0.018l-1.351,2.971H97.064z'
			}),
			ash.e('path', {
				fill: '#292624',
				d: 'M104.353,23.345h-2.575c-0.198,0-0.342-0.162-0.342-0.342V21.04c0-0.18,0.144-0.342,0.342-0.342h7.994c0.198,0,0.342,0.162,0.342,0.342v1.963c0,0.18-0.144,0.342-0.342,0.342h-2.575v9.615c0,0.18-0.162,0.342-0.342,0.342h-2.161c-0.18,0-0.342-0.162-0.342-0.342V23.345z'
			}),
			ash.e('path', {
				fill: '#292624',
				d: 'M109.824,32.833l5.635-12.118c0.054-0.108,0.18-0.198,0.306-0.198h0.18c0.126,0,0.252,0.09,0.306,0.198l5.636,12.118c0.108,0.234-0.036,0.468-0.306,0.468h-1.999c-0.324,0-0.468-0.108-0.63-0.45l-0.648-1.422h-4.897l-0.648,1.44c-0.09,0.216-0.288,0.432-0.648,0.432h-1.981C109.859,33.302,109.715,33.068,109.824,32.833z M117.224,28.98l-1.368-2.971h-0.018l-1.351,2.971H117.224z'
			}),
			ash.e('path', {
				fill: '#292624',
				d: 'M123.521,20.842c0-0.18,0.162-0.324,0.342-0.324h0.45l7.184,6.914h0.018V21.04c0-0.18,0.144-0.342,0.342-0.342h2.161c0.18,0,0.342,0.162,0.342,0.342v12.118c0,0.18-0.162,0.324-0.342,0.324h-0.288c-0.054,0-0.198-0.054-0.234-0.09l-7.112-7.148h-0.018v6.716c0,0.18-0.144,0.342-0.342,0.342h-2.143c-0.18,0-0.342-0.162-0.342-0.342L123.521,20.842'
			}),
			ash.e('path', {
				fill: '#292624',
				d: 'M136.013,32.833l5.635-12.118c0.054-0.108,0.18-0.198,0.306-0.198h0.18c0.126,0,0.252,0.09,0.306,0.198l5.636,12.118c0.108,0.234-0.036,0.468-0.306,0.468h-1.999c-0.324,0-0.468-0.108-0.63-0.45l-0.648-1.422h-4.897l-0.648,1.44c-0.09,0.216-0.288,0.432-0.648,0.432h-1.981C136.049,33.302,135.905,33.068,136.013,32.833z M143.413,28.98l-1.368-2.971h-0.018l-1.351,2.971H143.413z'
			}),
			ash.e('path', {
				fill: '#292624',
				d: 'M149.333,21.04c0-0.18,0.162-0.342,0.342-0.342h2.215c0.198,0,0.342,0.162,0.342,0.342v7.292c0,1.261,0.937,2.269,2.215,2.269c1.296,0,2.25-1.008,2.25-2.269V21.04c0-0.18,0.144-0.342,0.342-0.342h2.215c0.18,0,0.342,0.162,0.342,0.342v7.437c0,2.736-2.305,5.005-5.149,5.005c-2.827,0-5.113-2.269-5.113-5.005V21.04z'
			}),
			ash.e('path', {
				fill: '#292624',
				d: 'M164.292,23.345h-2.575c-0.198,0-0.342-0.162-0.342-0.342V21.04c0-0.18,0.144-0.342,0.342-0.342h7.994c0.198,0,0.342,0.162,0.342,0.342v1.963c0,0.18-0.144,0.342-0.342,0.342h-2.575v9.615c0,0.18-0.162,0.342-0.342,0.342h-2.161c-0.18,0-0.342-0.162-0.342-0.342V23.345z'
			}),
			ash.e('path', {
				fill: '#292624',
				d: 'M172.031,21.04c0-0.18,0.162-0.342,0.342-0.342h2.161c0.18,0,0.342,0.162,0.342,0.342v11.919c0,0.18-0.162,0.342-0.342,0.342h-2.161c-0.18,0-0.342-0.162-0.342-0.342V21.04z'
			}),
			ash.e('path', {
				fill: '#292624',
				d: 'M178.151,21.13c0-0.234,0.18-0.432,0.432-0.432h2.107c0.234,0,0.432,0.198,0.432,0.432v4.736l3.997-4.988c0.072-0.09,0.234-0.18,0.342-0.18h2.269c0.342,0,0.522,0.396,0.324,0.666l-4.213,5.275l4.591,5.978c0.198,0.27,0,0.666-0.342,0.666h-2.485c-0.126,0-0.288-0.072-0.324-0.126l-4.159-5.654v5.366c0,0.234-0.198,0.432-0.432,0.432h-2.107c-0.252,0-0.432-0.198-0.432-0.432V21.13z'
			}),
			ash.e('path', {
				fill: '#292624',
				d: 'M188.825,32.833l5.635-12.118c0.054-0.108,0.18-0.198,0.306-0.198h0.18c0.126,0,0.252,0.09,0.306,0.198l5.636,12.118c0.108,0.234-0.036,0.468-0.306,0.468h-1.999c-0.324,0-0.468-0.108-0.63-0.45l-0.648-1.422h-4.897l-0.648,1.44c-0.09,0.216-0.288,0.432-0.648,0.432h-1.981C188.86,33.302,188.716,33.068,188.825,32.833z M196.225,28.98l-1.368-2.971h-0.018l-1.351,2.971H196.225z'
			})
		];

		return ash.e('span', {className: this.props.className ? this.props.className : 'logo'}, [
				ash.e('svg', {
					xlmns: 'http://www.w3.org/2000/svg',
					viewBox: this.props.badgeOnly ? '0 0 54 54' : '0 0 200.924 54'
				}, this.props.badgeOnly ? badge : badge.concat(label))
			]);
	}
}

var Logo = ash.createElement(LogoComponent);






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

//Renderer.addComponent(new App(), global.document.querySelector('.page'));
Renderer.addComponent(new Logo(), global.document.querySelector('.page'));















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

