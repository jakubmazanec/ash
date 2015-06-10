/*eslint-disable no-unused-vars, vars-on-top, no-console, no-multiple-empty-lines */

import $ from 'jquery';
import _ from 'lodash-fp';
import ash from 'ash';
import Immutable from 'immutable';
// import React from 'react';
// import m from 'mithril';
// import flyd from 'flyd';
// import rx from 'rx';



global.$ = $;
global._ = _;
global.ash = ash;
// global.React = React;
// global.flyd = flyd;
// global.rx = rx;
global.Immutable = Immutable;

var Renderer = global.Renderer = new ash.Renderer();



/*var s1 = global.s1 = new ash.Stream();
var s2 = global.s2 = new ash.Stream();
var s3 = global.s3 = new ash.Stream();

s1.name = 's1';
s2.name = 's2';
s3.name = 's3';

// s1.push(3);
// s2.push(4);
s3.from(() => {
	console.log('s3 fn...');
	return s1.get() + s2.get();
}, s1, s2);*/


// console.log('ash.js start...');

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






// import App from './components/App';
// import AppReact from './components/AppReact';

class FooSubComponent extends ash.Component {
	state = {
		width: 1
	};

	render() {
		return <button key="btn" style={{
				outline: this.state.width + 'px solid #f0c'
			}} events={{
				click: this.change
			}}>Morw wdith!</button>;

		/*return <section>
			<button key="btn" style={{
				outline: this.state.width + 'px solid #f0c'
			}} events={{
				click: this.change
			}}>Morw wdith!</button>
		</section>;*/
	}

	change() {
		this.state.width++;

		this.update();
	}
}


class ReorderApp extends ash.Component {
	state = {
		reversed: false,
		items: []
	};

	render() {
		var items = this.state.items.map((value, index) => <button key={'' + index} events={{click: this.hello.bind(null, index, value)}}>{'' + value + '. '}</button>);

		if (this.state.reversed) {
			// items = items.reverse();
		}

		return <div>
			<button key="btn" style={{
				outline: this.state.reversed ? '1px solid red' : '1px solid blue'
			}} events={{
					click: this.addItem
				}}>{'' + this.state.reversed}</button>
				{/*this.state.reversed ? <b>!</b> : null*/}
				<div key="inr">
					{this.state.reversed ? <b>!</b> : null}
					<div key="itm">{items}</div>
				</div>
			<FooSubComponent />
		</div>;
	}

	addItem() {
		console.log('adding item...');

		this.state.items.push('' + (Math.random() * 100 >> 0));
		this.state.reversed = !this.state.reversed;

		this.update();
	}

	hello(index, value) {
		console.log('Hello, this is', value, 'at', index);
	}
}



class Menu extends ash.Component {
	state = {
		left: 0,
		width: 0
	};

	render() {
		console.log('Menu render...', this.state);

		return <nav>
			<a href="/en/what-we-do" events={{mouseenter: this.onLinkMouseEnter, mouseleave: this.refreshSelectedLink}}>What we do</a>
			<a href="/en/pricing" events={{mouseenter: this.onLinkMouseEnter, mouseleave: this.refreshSelectedLink}}>Pricing</a>
			<a href="/en/blog" events={{mouseenter: this.onLinkMouseEnter, mouseleave: this.refreshSelectedLink}}>Blog</a>
			<a href="/en/about-us" events={{mouseenter: this.onLinkMouseEnter, mouseleave: this.refreshSelectedLink}}>About us</a>
			<a href="/en/career" events={{mouseenter: this.onLinkMouseEnter, mouseleave: this.refreshSelectedLink}}>Career</a>
			<a href="#" events={{mouseenter: this.onLinkMouseEnter, mouseleave: this.refreshSelectedLink}}>Koi</a>
			<span style={{
				left: this.state.left + 'px',
				width: this.state.width + 'px'
			}}></span>
		</nav>;
	}

	getSelectedMenuLink() {
		var menuNode = this.domNode;

		for (let i = 0; i < menuNode.childNodes.length; i++) {
			if (menuNode.childNodes[i].className && menuNode.childNodes[i].className.indexOf('is-selected') >= 0) {
				return menuNode.childNodes[i];
			}
		}

		return menuNode.childNodes[0];
	}

	refreshSelectedLink() {
		var $selected = $(this.getSelectedMenuLink());

		this.state.left = $selected.position().left + 0.5 * ($selected.outerWidth(true) - $selected.width());
		this.state.width = $selected.width();

		// this.update();
	}

	onLinkMouseEnter(event) {
		var $link = $(event.target);

		this.state.left = $link.position().left + 0.5 * ($link.outerWidth(true) - $link.width());
		this.state.width = $link.width();

		this.update();
	}

	onMount() {
		this.refreshSelectedLink();
	}
}

class Header extends ash.Component {
	render() { // {/*<Menu isHorizontal={true} />*/}
		return <header>
			<FooSubComponent />
		</header>;
	}
}

class Footer extends ash.Component {
	render() { // {/*<Menu isHorizontal={true} />*/}
		return <footer>
			<FooSubComponent />
		</footer>;
	}
}

class App extends ash.Component {
	render() {
		return <div>
			<Header />
			<Footer />
		</div>;
	}
}







// var viewStream = ash.AshNodeStream.from(<ReorderApp />);

// import addToList1Action from './actions/addToList1Action';
// import addToList2Action from './actions/addToList2Action';


var viewStream = ash.AshNodeStream.from(<App />);

global.viewStream = viewStream;

// addToList1Action.from(App.list1);
// addToList2Action.from(App.list2);

Renderer.addStream(viewStream, global.document.querySelector('.page'));





// React.render(
// 	React.createElement(AppReact),
// 	global.document.querySelector('.pageReact')
// );



/*var items = [];

for (let i = 0; i < 5000; i++) {
	items.push({name: '' + Math.random() * 10 >> 0});
}

var BenchmarkApp1Mithril = {};

BenchmarkApp1Mithril.controller = function () {
	this.items = items;
};

BenchmarkApp1Mithril.view = function (ctrl) {
	return ctrl.items
	.map(function (item) {
		return m('input', {value: item.name});
	});
};

class BenchmarkApp1Ash extends ash.Component {
	render() {
		return <div>
			{this.props.data.map((item) => <input value={item.name}/>)}
		</div>;
	}
}

class BenchmarkApp1React extends React.Component {
	render() {
		return React.DOM.div({}, this.props.data.map(function (item) {
			return React.DOM.input({value: item.name});
		}));
	}
}

setTimeout(() => {
	m.mount(global.document.querySelector('.pageMithril'), BenchmarkApp1Mithril);
}, 2000);

setTimeout(() => {
	Renderer.addStream(ash.AshNodeStream.from(<BenchmarkApp1Ash data={items}/>), global.document.querySelector('.page'));
}, 3000);

setTimeout(() => {
	React.render(React.createElement(BenchmarkApp1React, {data: items}), global.document.querySelector('.pageReact'));
}, 4000);*/



var Utils = global.Utils = {
	uuid() {
		var i;
		var random;
		var uuid = '';

		for (i = 0; i < 32; i++) {
			random = Math.random() * 16 | 0;
			if (i === 8 || i === 12 || i === 16 || i === 20) {
				uuid += '-';
			}
			uuid += (i === 12 ? 4 : i === 16 ? random & 3 | 8 : random).toString(16);
		}

		return uuid;
	},

	pluralize(count, word) {
		return count === 1 ? word : word + 's';
	},

	store(namespace, data) {
		if (data) {
			return localStorage.setItem(namespace, JSON.stringify(data));
		}

		var store = localStorage.getItem(namespace);

		return store && JSON.parse(store) || [];
	},

	extend() {
		var newObj = {};

		for (var i = 0; i < arguments.length; i++) {
			var obj = arguments[i];

			for (var key in obj) {
				if (obj.hasOwnProperty(key)) {
					newObj[key] = obj[key];
				}
			}
		}
		return newObj;
	}
};

const ALL_TODOS = 'all';
const ACTIVE_TODOS = 'active';
const COMPLETED_TODOS = 'completed';

const ENTER_KEY = 13;
const ESCAPE_KEY = 27;


class TodoItem extends ash.Component {
	setState(newState) {
		this.state = _.extend(newState, this.state);
		this.isDirty = true;
	}

	handleSubmit() {
		var val = this.state.editText.trim();

		if (val) {
			this.props.onSave(val);
			this.setState({editText: val});
		} else {
			this.props.onDestroy();
		}
		return false;
	}

	handleEdit() {
		// react optimizes renders by batching them. This means you can't call
		// parent's `onEdit` (which in this case triggeres a re-render), and
		// immediately manipulate the DOM as if the rendering's over. Put it as a
		// callback. Refer to app.js' `edit` method
		this.props.onEdit(function () {
			var node = $(this.domNode).find('.edit')[0];

			node.focus();
			node.setSelectionRange(node.value.length, node.value.length);
		}.bind(this));

		this.setState({editText: this.props.todo.title});
	}

	handleKeyDown(event) {
		if (event.keyCode === ESCAPE_KEY) {
			this.setState({editText: this.props.todo.title});
			this.props.onCancel();
		} else if (event.keyCode === ENTER_KEY) {
			this.handleSubmit();
		}
	}

	handleChange(event) {
		this.setState({editText: event.target.value});
	}

	state = {editText: this.props.todo.title};

	render() {
		return <li className={(this.props.todo.completed ? 'completed' : '') + (this.props.editing ? ' editing' : '')}>
			<div className="view">
				<input
					className="toggle"
					type="checkbox"
					checked={this.props.todo.completed ? 'checked' : null}
					events={{
						change: this.props.onToggle
					}}
				/>
				<label events={{click: this.handleEdit}}>
					{this.props.todo.title}
				</label>
				<button className="destroy" events={{click: this.props.onDestroy}} />
			</div>
			<input
				ref="editField"
				className="edit"
				value={this.state.editText}
				events={{
					blur: this.handleSubmit,
					change: this.handleChange,
					keydown: this.handleKeyDown
				}}
			/>
		</li>;
	}
}


class TodoFooter extends ash.Component {
	setState(newState) {
		this.state = _.extend(newState, this.state);
		this.isDirty = true;
	}

	render() {
		var activeTodoWord = Utils.pluralize(this.props.count, 'item');
		var clearButton = null;

		if (this.props.completedCount > 0) {
			clearButton = <button
				id="clear-completed"
				events={{
					click: this.props.onClearCompleted
				}}>
				{''}Clear completed ({this.props.completedCount}){''}
			</button>;
		}

		let show = {
			ALL_TODOS: '',
			ACTIVE_TODOS: '',
			COMPLETED_TODOS: ''
		};

		show[this.props.nowShowing] = 'selected';

		return <footer id="footer">
			<span id="todo-count">
				<strong>{this.props.count}</strong>
				{' '}{activeTodoWord}{' '}left{''}
			</span>
			<ul id="filters">
				<li>
					<a href="#/" className={show[ALL_TODOS]}>All</a>
				</li>
				{' '}
				<li>
					<a href="#/active" className={show[ACTIVE_TODOS]}>Active</a>
				</li>
				{' '}
				<li>
					<a href="#/completed" className={show[COMPLETED_TODOS]}>Completed</a>
				</li>
			</ul>
			{clearButton}
		</footer>;
	}
}








class TodoApp extends ash.Component {
	state = {
		todos: Utils.store('react-todos'),
		nowShowing: ALL_TODOS,
		editing: null
	};

	setState(newState) {
		this.state = _.extend(newState, this.state);
		this.isDirty = true;
	}

	onMount() {
		/*var router = Router({
			'/': this.setState.bind(this, {nowShowing: ALL_TODOS}),
			'/active': this.setState.bind(this, {nowShowing: ACTIVE_TODOS}),
			'/completed': this.setState.bind(this, {nowShowing: COMPLETED_TODOS})
		});
		router.init();*/
		$(this.domNode).find('#new-todo')[0].focus();
	}

	handleNewTodoKeyDown(event) {
		if (event.which !== ENTER_KEY) {
			return;
		}

		var val = $(this.domNode).find('#new-todo')[0].value.trim();
		var newTodo;

		if (val) {
			newTodo = {
				id: Utils.uuid(),
				title: val,
				completed: false
			};

			this.setState({todos: this.state.todos.concat([newTodo])});
			$(this.domNode).find('#new-todo')[0].value = '';
		}

		return false;
	}

	toggleAll(event) {
		var checked = event.target.checked;

		// Note: it's usually better to use immutable data structures since they're easier to
		// reason about and React works very well with them. That's why we use map() and filter()
		// everywhere instead of mutating the array or todo items themselves.
		var newTodos = this.state.todos.map((todo) => {
			return Utils.extend({}, todo, {completed: checked});
		});

		this.setState({todos: newTodos});
	}

	toggle(todoToToggle) {
		var newTodos = this.state.todos.map((todo) => {
			return todo !== todoToToggle ? todo : Utils.extend({}, todo, {completed: !todo.completed});
		});

		this.setState({todos: newTodos});
	}

	destroy(todo) {
		var newTodos = this.state.todos.filter((candidate) => {
			return candidate.id !== todo.id;
		});

		this.setState({todos: newTodos});
	}

	edit(todo, callback) {
		// refer to todoItem.js `handleEdit` for the reasoning behind the
		// callback
		this.setState({editing: todo.id}, function () {
			callback();
		});
	}

	save(todoToSave, text) {
		var newTodos = this.state.todos.map((todo) => {
			return todo !== todoToSave ? todo : Utils.extend({}, todo, {title: text});
		});

		this.state = {todos: newTodos, editing: null};
		this.isDirty = true;
	}

	cancel() {
		this.setState({editing: null});
	}

	clearCompleted() {
		var newTodos = this.state.todos.filter(function (todo) {
			return !todo.completed;
		});

		this.setState({todos: newTodos});
	}

	/*componentDidUpdate() {
		Utils.store('react-todos', this.state.todos);
	}*/

	render() {
		var footer = null;
		var main = null;

		var shownTodos = this.state.todos.filter((todo) => {
			switch (this.state.nowShowing) {
			case ACTIVE_TODOS:
				return !todo.completed;
			case COMPLETED_TODOS:
				return todo.completed;
			default:
				return true;
			}
		});

		var todoItems = shownTodos.map((todo) => {
			return <TodoItem
				key={todo.id}
				todo={todo}
				onToggle={this.toggle.bind(this, todo)}
				onDestroy={this.destroy.bind(this, todo)}
				onEdit={this.edit.bind(this, todo)}
				editing={this.state.editing === todo.id}
				onSave={this.save.bind(this, todo)}
				onCancel={this.cancel}
			/>;
		});

		var activeTodoCount = this.state.todos.reduce((accum, todo) => {
			return todo.completed ? accum : accum + 1;
		}, 0);

		var completedCount = this.state.todos.length - activeTodoCount;

		if (activeTodoCount || completedCount) {
			footer =
				<TodoFooter
					count={activeTodoCount}
					completedCount={completedCount}
					nowShowing={this.state.nowShowing}
					onClearCompleted={this.clearCompleted}
				/>;
		}

		if (this.state.todos.length) {
			main = <section id="main">
				<input
					id="toggle-all"
					type="checkbox"
					events={{change: this.toggleAll}}
					checked={activeTodoCount === 0}
				/>
				<ul id="todo-list">
					{todoItems}
				</ul>
			</section>;
		}

		return <div>
			<header id="header">
				<h1>todos</h1>
				<input
					ref="newField"
					id="new-todo"
					placeholder="What needs to be done?"
					events={{keydown: this.handleNewTodoKeyDown}}
				/>
			</header>
			{main}
			{footer}
		</div>;
	}
}

// Renderer.addStream(ash.AshNodeStream.from(<TodoApp />), global.document.querySelector('#todoapp'));



/*function resolveIfReady() {
	console.log('resolveIfReady...');
		var newTodo = document.querySelector('#new-todo');

		if (newTodo) {
			for (var i = 0; i < 100; i++) {
				var keydownEvent = document.createEvent('Event');

				keydownEvent.initEvent('keydown', true, true);
				keydownEvent.which = 13; // VK_ENTER
				newTodo.value = 'Something to do ' + i;
				newTodo.dispatchEvent(keydownEvent);
			}
		} else {
			setTimeout(resolveIfReady, 50);
		}
}

setTimeout(resolveIfReady, 1000);*/
