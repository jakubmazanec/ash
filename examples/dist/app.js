/* eslint-disable no-unused-vars, vars-on-top, no-console, no-multiple-empty-lines, lines-around-comment */

'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _jquery = require('jquery');

var _jquery2 = _interopRequireDefault(_jquery);

var _lodashFp = require('lodash-fp');

var _lodashFp2 = _interopRequireDefault(_lodashFp);

var _ash = require('ash');

var _ash2 = _interopRequireDefault(_ash);

var _immutable = require('immutable');

var _immutable2 = _interopRequireDefault(_immutable);

global.$ = _jquery2.default;
global._ = _lodashFp2.default;
global.ash = _ash2.default;
global.Immutable = _immutable2.default;

var Header = (function (_ash$Component) {
	_inherits(Header, _ash$Component);

	function Header() {
		_classCallCheck(this, Header);

		_get(Object.getPrototypeOf(Header.prototype), 'constructor', this).apply(this, arguments);
	}

	_createClass(Header, [{
		key: 'render',
		value: function render() {
			return _ash2.default.createElement(
				'header',
				null,
				'Test component!'
			);
		}
	}]);

	return Header;
})(_ash2.default.Component);

var FooContent = (function (_ash$Component2) {
	_inherits(FooContent, _ash$Component2);

	function FooContent() {
		_classCallCheck(this, FooContent);

		_get(Object.getPrototypeOf(FooContent.prototype), 'constructor', this).apply(this, arguments);
	}

	_createClass(FooContent, [{
		key: 'render',
		value: function render() {
			return _ash2.default.createElement(
				'section',
				null,
				_ash2.default.createElement(
					'div',
					{ key: 'content' },
					_ash2.default.createElement(
						'h1',
						null,
						'FooContent'
					)
				),
				_ash2.default.createElement(
					'p',
					null,
					'Spinner!'
				)
			);
		}
	}, {
		key: 'onMount',
		value: function onMount() {
			console.log('FooContent onMount...');
		}
	}, {
		key: 'onUnmount',
		value: function onUnmount() {
			console.log('FooContent onUnmount...');
		}
	}]);

	return FooContent;
})(_ash2.default.Component);

var BarContent = (function (_ash$Component3) {
	_inherits(BarContent, _ash$Component3);

	function BarContent() {
		_classCallCheck(this, BarContent);

		_get(Object.getPrototypeOf(BarContent.prototype), 'constructor', this).apply(this, arguments);
	}

	_createClass(BarContent, [{
		key: 'render',
		value: function render() {
			return _ash2.default.createElement(
				'section',
				null,
				_ash2.default.createElement(
					'h1',
					null,
					'About us'
				),
				_ash2.default.createElement(
					'h2',
					null,
					'Eva'
				)
			);
		}
	}, {
		key: 'onMount',
		value: function onMount() {
			console.log('BarContent onMount...');

			// this.update();
		}
	}]);

	return BarContent;
})(_ash2.default.Component);

var Content = (function (_ash$Component4) {
	_inherits(Content, _ash$Component4);

	function Content() {
		_classCallCheck(this, Content);

		_get(Object.getPrototypeOf(Content.prototype), 'constructor', this).apply(this, arguments);
	}

	_createClass(Content, [{
		key: 'render',
		value: function render(props, state) {
			var elements = [];

			// console.log('Content render...', props, state);

			/*if (this.props.show === 'foo') {
   	elements = <FooContent />;
   } else if (this.props.show === 'bar') {
   	elements = <BarContent />;
   } else {
   	elements = '---';
   }*/

			for (var i = 0; i < 10; i++) {
				elements.push(_ash2.default.createElement(
					'i',
					null,
					this.props.show + ' ' + i
				));
			}

			return _ash2.default.createElement(FooContent, null);

			return _ash2.default.createElement(
				'main',
				null,
				elements
			);
		}
	}, {
		key: 'onMount',
		value: function onMount() {
			console.log('Content onMount...');
		}
	}, {
		key: 'onUnmount',
		value: function onUnmount() {
			console.log('Content onUnmount...');
		}
	}]);

	return Content;
})(_ash2.default.Component);

var storeStream = new _ash2.default.Stream(function (self, changed) {
	console.log('storeStream fn...', changed.length);
	if (changed.length) {
		var data = self.get();

		data.amount += changed[0].get();

		return data;
	}
});

storeStream.push({ amount: 0 });

var App = (function (_ash$Component5) {
	_inherits(App, _ash$Component5);

	function App() {
		_classCallCheck(this, App);

		_get(Object.getPrototypeOf(App.prototype), 'constructor', this).apply(this, arguments);

		this.state = {
			renderCount: 0,
			show: 'bar',
			foo: false,
			useAlternativeHandler: false
		};
	}

	_createClass(App, [{
		key: 'render',
		value: function render() {
			var amount = storeStream.get().amount;

			this.state.renderCount++;

			// return this.state.foo ? <b>Oj!</b> : <Content show={this.state.show} />;

			// return <div>
			// 	<p>{amount}</p>
			// 	<a href="#" events={{click: this.add}}>+1</a>
			// 	<a href="#" events={{click: this.showFoo}}>FooContent</a>
			// 	<a href="#" events={{click: this.showBar}}>BarContent</a>
			// 	<div>{amount ? <Content show={this.state.show} /> : null }</div>
			// </div>;

			if (this.state.renderCount > 1) {
				this.update();
			}

			return _ash2.default.createElement(
				'div',
				null,
				_ash2.default.createElement(
					'p',
					null,
					this.state.renderCount
				),
				_ash2.default.createElement(BarContent, null),
				_ash2.default.createElement(
					'p',
					{ events: {
							click: this.state.useAlternativeHandler ? this.handleClickAlternatively : this.handleClick,
							mouseenter: this.sayFoo,
							mouseleave: this.sayBar
						} },
					_ash2.default.createElement(
						'a',
						{ id: 'link-1', href: '#' },
						'(1)'
					),
					_ash2.default.createElement(
						'a',
						{ id: 'link-2', href: '#' },
						'(2)'
					),
					_ash2.default.createElement(
						'a',
						{ id: 'link-3', href: '#' },
						'(3)'
					),
					_ash2.default.createElement(
						'a',
						{ id: 'link-4', href: '#' },
						'(4)'
					)
				),
				_ash2.default.createElement(
					'p',
					null,
					_ash2.default.createElement(
						'a',
						{ href: '#', events: {
								click: this.changeHandler
							} },
						'Change event handler!'
					)
				)
			);
		}
	}, {
		key: 'sayFoo',
		value: function sayFoo() {
			console.log('sayFoo...');
		}
	}, {
		key: 'sayBar',
		value: function sayBar() {
			console.log('sayBar...');
		}
	}, {
		key: 'changeHandler',
		value: function changeHandler(event) {
			event.preventDefault();

			console.log('changeHandler...', event);

			this.state.useAlternativeHandler = !this.state.useAlternativeHandler;

			this.update();
		}
	}, {
		key: 'handleClick',
		value: function handleClick(event) {
			event.preventDefault();

			console.log('handleClick...', event);
		}
	}, {
		key: 'handleClickAlternatively',
		value: function handleClickAlternatively(event) {
			event.preventDefault();

			console.log('handleClickAlternatively...', event);
		}
	}, {
		key: 'onMount',
		value: function onMount() {
			console.log('onMount...');

			// this.update();

			/*storeStream.on((store) => {
   	// debugger;
   			this.update();
   });*/

			/*setTimeout(() => {
   	console.log('updating!');
   	this.state.foo = true;
   			this.update();
   }, 2000);
   		setTimeout(() => {
   	console.log('updating 2!');
   	this.state.foo = false;
   			this.update();
   }, 4000);*/
		}
	}, {
		key: 'add',
		value: function add(event) {
			event.preventDefault();

			this.increaseStream.push(1);
		}
	}, {
		key: 'showFoo',
		value: function showFoo(event) {
			event.preventDefault();

			this.state.show = 'foo';

			this.update();
		}
	}, {
		key: 'showBar',
		value: function showBar(event) {
			event.preventDefault();

			this.state.show = 'bar';

			this.update();
		}
	}], [{
		key: 'increaseStream',
		value: new _ash2.default.Stream(),
		enumerable: true
	}]);

	return App;
})(_ash2.default.Component);

storeStream.from(App.increaseStream);

global.storeStream = storeStream;

// let viewStream = new ash.ViewStream(<App />);
// let renderStream = new ash.RenderStream(viewStream, global.document.querySelector('.page'));

var List = (function (_ash$Component6) {
	_inherits(List, _ash$Component6);

	function List() {
		_classCallCheck(this, List);

		_get(Object.getPrototypeOf(List.prototype), 'constructor', this).apply(this, arguments);

		this.state = {
			notifications: [{
				id: 1,
				text: 'Info 1'
			}, {
				id: 2,
				text: 'Info 2'
			}, {
				id: 3,
				text: 'Info 3'
			}, {
				id: 4,
				text: 'Info 4'
			}]
		};
	}

	_createClass(List, [{
		key: 'render',
		value: function render() {
			var children = [];

			this.state.notifications.forEach(function (notification) {
				children.push(_ash2.default.createElement(
					'li',
					{ key: 'notification-' + notification.id, class: 'notification' },
					notification.text + ''
				));
			});

			return _ash2.default.createElement(
				'div',
				{ class: 'root2' },
				_ash2.default.createElement(
					'ul',
					{ class: 'notifications' },
					children
				)
			);
		}
	}, {
		key: 'onMount',
		value: function onMount() {
			var _this = this;

			setTimeout(function () {
				// let old = this.state.notifications.splice(1, 1);
				// let old2 = this.state.notifications.splice(1, 1);

				// this.state.notifications = this.state.notifications.concat(old2, old);

				// this.state.notifications = [{
				// 	id: 1,
				// 	text: 'Info 1'
				// }, {
				// 	id: 4,
				// 	text: 'Info 4'
				// }, {
				// 	id: 3,
				// 	text: 'Info 3'
				// }, {
				// 	id: 2,
				// 	text: 'Info 2'
				// }];

				// let old = this.state.notifications.splice(0, 1);
				// let old2 = this.state.notifications.splice(1, 1);

				// this.state.notifications = this.state.notifications.concat(old2, old);

				_this.state.notifications.unshift({
					id: 10,
					text: 'new 10'
				});

				// this.state.notifications = [{
				// 	id: 2,
				// 	text: 'Info 2'
				// }, {
				// 	id: 1,
				// 	text: 'Info 1'
				// }, {
				// 	id: 4,
				// 	text: 'Info 4'
				// }, {
				// 	id: 3,
				// 	text: 'Info 3'
				// }];

				// this.state.notifications = [{
				// 	id: 2,
				// 	text: 'Info 2'
				// }, {
				// 	id: 10,
				// 	text: 'New 10'
				// }, {
				// 	id: 1,
				// 	text: 'Info 1'
				// }, {
				// 	id: 3,
				// 	text: 'Info 3'
				// }, {
				// 	id: 4,
				// 	text: 'Info 4'
				// }];

				// this.state.notifications = [{
				// 	id: 1,
				// 	text: 'Info 1'
				// }, {
				// 	id: 2,
				// 	text: 'Info 2'
				// }, {
				// 	id: 3,
				// 	text: 'Info 3'
				// }, {
				// 	id: 10,
				// 	text: 'New 10'
				// }, {
				// 	id: 4,
				// 	text: 'Info 4'
				// }];

				// this.state.notifications = [{
				// 	id: 4,
				// 	text: 'Info 4'
				// }, {
				// 	id: 3,
				// 	text: 'Info 3'
				// }, {
				// 	id: 2,
				// 	text: 'Info 2'
				// }, {
				// 	id: 1,
				// 	text: 'Info 1'
				// }];

				console.log(_this);

				_this.update();
			}, 500);
		}
	}]);

	return List;
})(_ash2.default.Component);

var viewStream = new _ash2.default.ViewStream(_ash2.default.createElement(List, null));
var renderStream = new _ash2.default.RenderStream(viewStream, global.document.querySelector('.page'));

var h = require('virtual-dom/h');
var diff = require('virtual-dom/diff');
var patch = require('virtual-dom/patch');
var createElement = require('virtual-dom/create-element');

// 1: Create a function that declares what the DOM should look like
function render(notifications) {
	var children = [];

	notifications.forEach(function (notification) {
		children.push(h('li', {
			key: 'notification-' + notification.id,
			className: 'notification'
		}, ['' + notification.text]));
	});

	return h('div', { className: 'root' }, [h('ul', { className: 'notifications' }, children)]);
}

// 2: Initialise the document
var notifications = [{
	id: 1,
	text: 'Info 1'
}, {
	id: 2,
	text: 'Info 2'
}, {
	id: 3,
	text: 'Info 3'
}, {
	id: 4,
	text: 'Info 4'
}]; // We need some app data. Here we just store a count.

var tree = render(notifications); // We need an initial tree
var rootNode = createElement(tree); // Create an initial root DOM node ...

global.document.querySelector('.pageVirtualDom').appendChild(rootNode); // ... and it should be in the document

// 3: Wire up the update logic
setTimeout(function () {

	var old = notifications.splice(1, 1);
	var old2 = notifications.splice(1, 1);

	notifications = notifications.concat(old2, old);

	// let old = notifications.splice(0, 1);
	// let old2 = notifications.splice(1, 1);

	// notifications = notifications.concat(old2, old);

	// notifications.unshift({
	// 	id: 10,
	// 	text: 'new 10'
	// });

	// notifications = [{
	// 	id: 2,
	// 	text: 'Info 2'
	// }, {
	// 	id: 10,
	// 	text: 'New 10'
	// }, {
	// 	id: 1,
	// 	text: 'Info 1'
	// }, {
	// 	id: 3,
	// 	text: 'Info 3'
	// }, {
	// 	id: 4,
	// 	text: 'Info 4'
	// }];

	var newTree = render(notifications);
	var patches = diff(tree, newTree);

	// console.log(patches);

	rootNode = patch(rootNode, patches);
	tree = newTree;
}, 500);

// import TestList1 from './components/TestList1';

// let updateStream = new ash.Stream();
// let viewStream = new ash.ViewStream(<TestList1 updateStream={updateStream} />);
// let renderStream = new ash.RenderStream(viewStream);

// console.log(renderStream.stringify());

// TestList1.doneStream.on(() => {
// 	console.log(renderStream.stringify());
// });

// updateStream.push([{id: 1}, {id: 2}, {id: 3}, {id: 4}, {id: 5}]);

/*var Utils = global.Utils = {
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
		this.props.onEdit(() => {
			var node = $(this.domNode).find('.edit')[0];

			node.focus();
			node.setSelectionRange(node.value.length, node.value.length);
		});

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

		return;
	}

	toggleAll(event) {
		var checked = event.target.checked;

		// Note: it's usually better to use immutable data structures since they're easier to
		// reason about and React works very well with them. That's why we use map() and filter()
		// everywhere instead of mutating the array or items themselves.
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
		this.setState({editing: todo.id}, () => {
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
		var newTodos = this.state.todos.filter((todo) => {
			return !todo.completed;
		});

		this.setState({todos: newTodos});
	}


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
}*/

// Renderer.addStream(ash.AshNodeStream.from(<TodoApp />), global.document.querySelector('#todoapp'));

/* function resolveIfReady() {
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