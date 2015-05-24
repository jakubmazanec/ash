/*eslint-disable no-unused-vars, vars-on-top, no-console, no-multiple-empty-lines */

'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

var _jquery = require('jquery');

var _jquery2 = _interopRequireDefault(_jquery);

var _lodashFp = require('lodash-fp');

var _lodashFp2 = _interopRequireDefault(_lodashFp);

var _ash = require('ash');

var _ash2 = _interopRequireDefault(_ash);

var _immutable = require('immutable');

var _immutable2 = _interopRequireDefault(_immutable);

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

var _componentsApp = require('./components/App');

var _componentsApp2 = _interopRequireDefault(_componentsApp);

// import React from 'react';
// import m from 'mithril';
// import flyd from 'flyd';
// import rx from 'rx';

// global.$ = $;
// global._ = _;
// global.ash = ash;
// global.React = React;
// global.flyd = flyd;
// global.rx = rx;
global.Immutable = _immutable2.default;

var Renderer = global.Renderer = new _ash2.default.Renderer();
/*import AppReact from './components/AppReact';


class ReorderApp extends ash.Component {
	state = {
		reversed: false,
		items: []
	};

	render() {
		var items = this.state.items.map((value, index) => <button key={'' + index} events={{click: this.hello.bind(null, index, value)}}>{'' + value}</button>);

		if (this.state.reversed) {
			items = items.reverse();
		}

		return <div>
			<button key="btn" events={{
					click: this.addItem
				}}>{'' + this.state.reversed}</button>
				{this.state.reversed ? <b>!</b> : null}
				<div key="inr">
					{this.state.reversed ? <b>!</b> : null}
					<div key="itm">{items}</div>
				</div>
		</div>;
	}

	addItem() {
		console.log('adding item...');

		this.state.items.push('' + (Math.random() * 100 >> 0));
		this.state.reversed = !this.state.reversed;

		this.isDirty = true;
	}

	hello(index, value) {
		console.log('Hello, this is', value, 'at', index);
	}
}*/
// var viewStream = ash.AshNodeStream.from(<ReorderApp />);

var viewStream = _ash2.default.AshNodeStream.from(_ash2.default.e(_componentsApp2.default, null));

console.log('viewStream', viewStream);

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
	uuid: function () {
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

	pluralize: function (count, word) {
		return count === 1 ? word : word + 's';
	},

	store: function (namespace, data) {
		if (data) {
			return localStorage.setItem(namespace, JSON.stringify(data));
		}

		var store = localStorage.getItem(namespace);

		return store && JSON.parse(store) || [];
	},

	extend: function () {
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

var ALL_TODOS = 'all';
var ACTIVE_TODOS = 'active';
var COMPLETED_TODOS = 'completed';

var ENTER_KEY = 13;
var ESCAPE_KEY = 27;

function _ref() {
	var node = (0, _jquery2.default)(this.domNode).find('.edit')[0];

	node.focus();
	node.setSelectionRange(node.value.length, node.value.length);
}

var TodoItem = (function (_ash$Component) {
	function TodoItem() {
		_classCallCheck(this, TodoItem);

		if (_ash$Component != null) {
			_ash$Component.apply(this, arguments);
		}

		this.state = { editText: this.props.todo.title };
	}

	_inherits(TodoItem, _ash$Component);

	_createClass(TodoItem, [{
		key: 'setState',
		value: function setState(newState) {
			this.state = _lodashFp2.default.extend(newState, this.state);
			this.isDirty = true;
		}
	}, {
		key: 'handleSubmit',
		value: function handleSubmit() {
			var val = this.state.editText.trim();

			if (val) {
				this.props.onSave(val);
				this.setState({ editText: val });
			} else {
				this.props.onDestroy();
			}
			return false;
		}
	}, {
		key: 'handleEdit',
		value: function handleEdit() {
			// react optimizes renders by batching them. This means you can't call
			// parent's `onEdit` (which in this case triggeres a re-render), and
			// immediately manipulate the DOM as if the rendering's over. Put it as a
			// callback. Refer to app.js' `edit` method
			this.props.onEdit(_ref.bind(this));

			this.setState({ editText: this.props.todo.title });
		}
	}, {
		key: 'handleKeyDown',
		value: function handleKeyDown(event) {
			if (event.keyCode === ESCAPE_KEY) {
				this.setState({ editText: this.props.todo.title });
				this.props.onCancel();
			} else if (event.keyCode === ENTER_KEY) {
				this.handleSubmit();
			}
		}
	}, {
		key: 'handleChange',
		value: function handleChange(event) {
			this.setState({ editText: event.target.value });
		}
	}, {
		key: 'render',
		value: function render() {
			return _ash2.default.e(
				'li',
				{ className: (this.props.todo.completed ? 'completed' : '') + (this.props.editing ? ' editing' : '') },
				_ash2.default.e(
					'div',
					{ className: 'view' },
					_ash2.default.e('input', {
						className: 'toggle',
						type: 'checkbox',
						checked: this.props.todo.completed ? 'checked' : null,
						events: {
							change: this.props.onToggle
						}
					}),
					_ash2.default.e(
						'label',
						{ events: { click: this.handleEdit } },
						this.props.todo.title
					),
					_ash2.default.e('button', { className: 'destroy', events: { click: this.props.onDestroy } })
				),
				_ash2.default.e('input', {
					ref: 'editField',
					className: 'edit',
					value: this.state.editText,
					events: {
						blur: this.handleSubmit,
						change: this.handleChange,
						keydown: this.handleKeyDown
					}
				})
			);
		}
	}]);

	return TodoItem;
})(_ash2.default.Component);

var TodoFooter = (function (_ash$Component2) {
	function TodoFooter() {
		_classCallCheck(this, TodoFooter);

		if (_ash$Component2 != null) {
			_ash$Component2.apply(this, arguments);
		}
	}

	_inherits(TodoFooter, _ash$Component2);

	_createClass(TodoFooter, [{
		key: 'setState',
		value: function setState(newState) {
			this.state = _lodashFp2.default.extend(newState, this.state);
			this.isDirty = true;
		}
	}, {
		key: 'render',
		value: function render() {
			var activeTodoWord = Utils.pluralize(this.props.count, 'item');
			var clearButton = null;

			if (this.props.completedCount > 0) {
				clearButton = _ash2.default.e(
					'button',
					{
						id: 'clear-completed',
						events: {
							click: this.props.onClearCompleted
						} },
					'',
					'Clear completed (',
					this.props.completedCount,
					')',
					''
				);
			}

			var show = {
				ALL_TODOS: '',
				ACTIVE_TODOS: '',
				COMPLETED_TODOS: ''
			};

			show[this.props.nowShowing] = 'selected';

			return _ash2.default.e(
				'footer',
				{ id: 'footer' },
				_ash2.default.e(
					'span',
					{ id: 'todo-count' },
					_ash2.default.e(
						'strong',
						null,
						this.props.count
					),
					' ',
					activeTodoWord,
					' ',
					'left',
					''
				),
				_ash2.default.e(
					'ul',
					{ id: 'filters' },
					_ash2.default.e(
						'li',
						null,
						_ash2.default.e(
							'a',
							{ href: '#/', className: show[ALL_TODOS] },
							'All'
						)
					),
					' ',
					_ash2.default.e(
						'li',
						null,
						_ash2.default.e(
							'a',
							{ href: '#/active', className: show[ACTIVE_TODOS] },
							'Active'
						)
					),
					' ',
					_ash2.default.e(
						'li',
						null,
						_ash2.default.e(
							'a',
							{ href: '#/completed', className: show[COMPLETED_TODOS] },
							'Completed'
						)
					)
				),
				clearButton
			);
		}
	}]);

	return TodoFooter;
})(_ash2.default.Component);

function _ref2(todo) {
	return !todo.completed;
}

function _ref3(accum, todo) {
	return todo.completed ? accum : accum + 1;
}

var TodoApp = (function (_ash$Component3) {
	function TodoApp() {
		_classCallCheck(this, TodoApp);

		if (_ash$Component3 != null) {
			_ash$Component3.apply(this, arguments);
		}

		this.state = {
			todos: Utils.store('react-todos'),
			nowShowing: ALL_TODOS,
			editing: null
		};
	}

	_inherits(TodoApp, _ash$Component3);

	_createClass(TodoApp, [{
		key: 'setState',
		value: function setState(newState) {
			this.state = _lodashFp2.default.extend(newState, this.state);
			this.isDirty = true;
		}
	}, {
		key: 'onMount',
		value: function onMount() {
			/*var router = Router({
   	'/': this.setState.bind(this, {nowShowing: ALL_TODOS}),
   	'/active': this.setState.bind(this, {nowShowing: ACTIVE_TODOS}),
   	'/completed': this.setState.bind(this, {nowShowing: COMPLETED_TODOS})
   });
   router.init();*/
			(0, _jquery2.default)(this.domNode).find('#new-todo')[0].focus();
		}
	}, {
		key: 'handleNewTodoKeyDown',
		value: function handleNewTodoKeyDown(event) {
			if (event.which !== ENTER_KEY) {
				return;
			}

			var val = (0, _jquery2.default)(this.domNode).find('#new-todo')[0].value.trim();
			var newTodo;

			if (val) {
				newTodo = {
					id: Utils.uuid(),
					title: val,
					completed: false
				};

				this.setState({ todos: this.state.todos.concat([newTodo]) });
				(0, _jquery2.default)(this.domNode).find('#new-todo')[0].value = '';
			}

			return false;
		}
	}, {
		key: 'toggleAll',
		value: function toggleAll(event) {
			var checked = event.target.checked;

			// Note: it's usually better to use immutable data structures since they're easier to
			// reason about and React works very well with them. That's why we use map() and filter()
			// everywhere instead of mutating the array or todo items themselves.
			var newTodos = this.state.todos.map(function (todo) {
				return Utils.extend({}, todo, { completed: checked });
			});

			this.setState({ todos: newTodos });
		}
	}, {
		key: 'toggle',
		value: function toggle(todoToToggle) {
			var newTodos = this.state.todos.map(function (todo) {
				return todo !== todoToToggle ? todo : Utils.extend({}, todo, { completed: !todo.completed });
			});

			this.setState({ todos: newTodos });
		}
	}, {
		key: 'destroy',
		value: function destroy(todo) {
			var newTodos = this.state.todos.filter(function (candidate) {
				return candidate.id !== todo.id;
			});

			this.setState({ todos: newTodos });
		}
	}, {
		key: 'edit',
		value: function edit(todo, callback) {
			// refer to todoItem.js `handleEdit` for the reasoning behind the
			// callback
			this.setState({ editing: todo.id }, function () {
				callback();
			});
		}
	}, {
		key: 'save',
		value: function save(todoToSave, text) {
			var newTodos = this.state.todos.map(function (todo) {
				return todo !== todoToSave ? todo : Utils.extend({}, todo, { title: text });
			});

			this.state = { todos: newTodos, editing: null };
			this.isDirty = true;
		}
	}, {
		key: 'cancel',
		value: function cancel() {
			this.setState({ editing: null });
		}
	}, {
		key: 'clearCompleted',
		value: function clearCompleted() {
			var newTodos = this.state.todos.filter(_ref2);

			this.setState({ todos: newTodos });
		}
	}, {
		key: 'render',

		/*componentDidUpdate() {
  	Utils.store('react-todos', this.state.todos);
  }*/

		value: function render() {
			var _this = this;

			var footer = null;
			var main = null;

			var shownTodos = this.state.todos.filter(function (todo) {
				switch (_this.state.nowShowing) {
					case ACTIVE_TODOS:
						return !todo.completed;
					case COMPLETED_TODOS:
						return todo.completed;
					default:
						return true;
				}
			});

			var todoItems = shownTodos.map(function (todo) {
				return _ash2.default.e(TodoItem, {
					key: todo.id,
					todo: todo,
					onToggle: _this.toggle.bind(_this, todo),
					onDestroy: _this.destroy.bind(_this, todo),
					onEdit: _this.edit.bind(_this, todo),
					editing: _this.state.editing === todo.id,
					onSave: _this.save.bind(_this, todo),
					onCancel: _this.cancel
				});
			});

			var activeTodoCount = this.state.todos.reduce(_ref3, 0);

			var completedCount = this.state.todos.length - activeTodoCount;

			if (activeTodoCount || completedCount) {
				footer = _ash2.default.e(TodoFooter, {
					count: activeTodoCount,
					completedCount: completedCount,
					nowShowing: this.state.nowShowing,
					onClearCompleted: this.clearCompleted
				});
			}

			if (this.state.todos.length) {
				main = _ash2.default.e(
					'section',
					{ id: 'main' },
					_ash2.default.e('input', {
						id: 'toggle-all',
						type: 'checkbox',
						events: { change: this.toggleAll },
						checked: activeTodoCount === 0
					}),
					_ash2.default.e(
						'ul',
						{ id: 'todo-list' },
						todoItems
					)
				);
			}

			return _ash2.default.e(
				'div',
				null,
				_ash2.default.e(
					'header',
					{ id: 'header' },
					_ash2.default.e(
						'h1',
						null,
						'todos'
					),
					_ash2.default.e('input', {
						ref: 'newField',
						id: 'new-todo',
						placeholder: 'What needs to be done?',
						events: { keydown: this.handleNewTodoKeyDown }
					})
				),
				main,
				footer
			);
		}
	}]);

	return TodoApp;
})(_ash2.default.Component);

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