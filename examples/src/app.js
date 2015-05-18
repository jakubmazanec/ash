/*eslint-disable no-unused-vars, vars-on-top, no-console, no-multiple-empty-lines */

import $ from 'jquery';
import _ from 'lodash-fp';
import ash from './ash';
import flyd from 'flyd';
import rx from 'rx';


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
const MAX = 100000;

var foo$ = new ash.Stream();

console.log(foo$);

// $('body').on('click', () => {
// 	for (let i = 0; i < MAX + 1; i++) {
// 		foo$.push(i);
// 	}
// });

setTimeout(() => {
	for (let i = 0; i < MAX + 1; i++) {
		foo$.push(i);
	}
}, 1000);

var bar$ = ash.Stream.from(() => {
	if (foo$.get() >= MAX) {
		console.log('ash Done!', MAX, foo$.get());
	}
}, foo$);

console.log(bar$);


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




class List extends ash.Component {
	state = {redOutline: false};

	name = 'List';

	render() {
		return <ul style={{
			outline: this.state.redOutline ? '1px solid red' : '1px solid blue'
		}}>
			<button events={{
				click: this.changeOutline
			}}>
				!!!
			</button>
			{this.props.map((value, index) => <li key={'' + index}>{'' + value}</li>)}
		</ul>;
	}

	changeOutline() {
		this.state.redOutline = !this.state.redOutline;

		this.isDirty = true;
	}

	onBeforeReceiveProps() {
	}
}

class App extends ash.Component {
	state = new ash.ImmutableObject({
		list1: new ash.ImmutableArray(),
		list2: new ash.ImmutableArray(),
		redShadow: true
	});

	name = 'App';

	render() {
		return <div>
			<div style={{
				boxShadow: this.state.redShadow ? '2px 2px 5px red' : '2px 2px 5px blue'
			}}>
				<button events={{
					click: this.addToList1
				}}>+ list 1!</button>
				<button events={{
					click: this.addToList2
				}}>+ list 2!</button>
				<button events={{
					click: this.clearList1
				}}>+ clear 1!</button>
				<button events={{
					click: this.clearList2
				}}>+ clear 2!</button>
				<button events={{
					click: this.changeShadow
				}}>!!!</button>
			</div>
			<List {...this.state.list1} />
			<List {...this.state.list2} />
		</div>;
	}

	onMount() {
		console.log('App mounted!');
	}

	changeShadow() {
		this.state = this.state.set('redShadow', !this.state.redShadow);
		this.isDirty = true;
	}

	addToList1() {
		// console.log('App addToList1...');

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

	get randomFoo() {
		return Math.random();
	}
}

// Renderer.addComponent(<App />, global.document.querySelector('.page'));

// console.log(<div>test</div>);
