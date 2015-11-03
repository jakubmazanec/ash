/* eslint-disable no-unused-vars, vars-on-top, no-console, no-multiple-empty-lines, lines-around-comment */

'use strict';

var _createClass = (function () {
	function defineProperties(target, props) {
		for (var i = 0; i < props.length; i++) {
			var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ('value' in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
		}
	}return function (Constructor, protoProps, staticProps) {
		if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
	};
})();

var _get = function get(object, property, receiver) {
	if (object === null) object = Function.prototype;var desc = Object.getOwnPropertyDescriptor(object, property);if (desc === undefined) {
		var parent = Object.getPrototypeOf(object);if (parent === null) {
			return undefined;
		} else {
			return get(parent, property, receiver);
		}
	} else if ('value' in desc) {
		return desc.value;
	} else {
		var getter = desc.get;if (getter === undefined) {
			return undefined;
		}return getter.call(receiver);
	}
};

function _interopRequireDefault(obj) {
	return obj && obj.__esModule ? obj : { 'default': obj };
}

function _classCallCheck(instance, Constructor) {
	if (!(instance instanceof Constructor)) {
		throw new TypeError('Cannot call a class as a function');
	}
}

function _inherits(subClass, superClass) {
	if (typeof superClass !== 'function' && superClass !== null) {
		throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass);
	}subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}

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
			return _ash2.default.createElement('header', null, 'Test component!');
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
			return _ash2.default.createElement('section', null, _ash2.default.createElement('div', { key: 'content' }, _ash2.default.createElement('h1', null, 'FooContent')), _ash2.default.createElement('p', null, 'Spinner!'));
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
			return _ash2.default.createElement('section', null, _ash2.default.createElement('h1', null, 'About us'), _ash2.default.createElement('h2', null, 'Eva'));
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
				elements.push(_ash2.default.createElement('i', null, this.props.show + ' ' + i));
			}

			return _ash2.default.createElement(FooContent, null);

			return _ash2.default.createElement('main', null, elements);
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
			show: 'bar',
			foo: false
		};
	}

	_createClass(App, [{
		key: 'render',
		value: function render() {
			var amount = storeStream.get().amount;

			return this.state.foo ? _ash2.default.createElement('b', null, 'Oj!') : _ash2.default.createElement(Content, { show: this.state.show });

			return _ash2.default.createElement('div', null, _ash2.default.createElement('p', null, amount), _ash2.default.createElement('a', { href: '#', events: { click: this.add } }, '+1'), _ash2.default.createElement('a', { href: '#', events: { click: this.showFoo } }, 'FooContent'), _ash2.default.createElement('a', { href: '#', events: { click: this.showBar } }, 'BarContent'), _ash2.default.createElement('div', null, amount ? _ash2.default.createElement(Content, { show: this.state.show }) : null));
		}
	}, {
		key: 'onMount',
		value: function onMount() {
			var _this = this;

			storeStream.on(this.update);

			setTimeout(function () {
				console.log('updating!');
				_this.state.foo = true;

				_this.update();
			}, 2000);

			setTimeout(function () {
				console.log('updating 2!');
				_this.state.foo = false;

				_this.update();
			}, 4000);
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

// var viewStream = ash.AshNodeStream.from(<App />);

// Renderer.addStream(viewStream, global.document.querySelector('.page'));

var viewStream = new _ash2.default.ViewStream(_ash2.default.createElement(App, null));
var renderStream = new _ash2.default.RenderStream(viewStream, global.document.querySelector('.page'));

// console.log(renderStream.stringify());

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