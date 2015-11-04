/* eslint-disable no-unused-vars, vars-on-top, no-console, no-multiple-empty-lines, lines-around-comment */

import $ from 'jquery';
import _ from 'lodash-fp';
import ash from 'ash';
import Immutable from 'immutable';



global.$ = $;
global._ = _;
global.ash = ash;
global.Immutable = Immutable;


class Header extends ash.Component {
	render() {
		return <header>Test component!</header>;
	}
}

class FooContent extends ash.Component {
	render() {
		return <section>
			<div key="content">
				<h1>FooContent</h1>
			</div>
			<p>Spinner!</p>
		</section>;
	}

	onMount() {
		console.log('FooContent onMount...');
	}

	onUnmount() {
		console.log('FooContent onUnmount...');
	}
}

class BarContent extends ash.Component {
	render() {
		return <section>
			<h1>About us</h1>
			<h2>Eva</h2>
		</section>;
	}
}

class Content extends ash.Component {
	render(props, state) {
		let elements = [];

		// console.log('Content render...', props, state);

		/*if (this.props.show === 'foo') {
			elements = <FooContent />;
		} else if (this.props.show === 'bar') {
			elements = <BarContent />;
		} else {
			elements = '---';
		}*/

		for (let i = 0; i < 10; i++) {
			elements.push(<i>{this.props.show + ' ' + i}</i>);
		}

		return <FooContent />;


		return <main>{elements}</main>;
	}

	onMount() {
		console.log('Content onMount...');
	}

	onUnmount() {
		console.log('Content onUnmount...');
	}
}


let storeStream = new ash.Stream((self, changed) => {
	console.log('storeStream fn...', changed.length);
	if (changed.length) {
		let data = self.get();

		data.amount += changed[0].get();

		return data;
	}
});

storeStream.push({amount: 0});


class App extends ash.Component {
	state = {
		show: 'bar',
		foo: false
	};

	static increaseStream = new ash.Stream();

	render() {
		let amount = storeStream.get().amount;

		return this.state.foo ? <b>Oj!</b> : <Content show={this.state.show} />;

		return <div>
			<p>{amount}</p>
			<a href="#" events={{click: this.add}}>+1</a>
			<a href="#" events={{click: this.showFoo}}>FooContent</a>
			<a href="#" events={{click: this.showBar}}>BarContent</a>
			<div>{amount ? <Content show={this.state.show} /> : null }</div>
		</div>;
	}

	onMount() {
		storeStream.on(this.update);

		setTimeout(() => {
			console.log('updating!');
			this.state.foo = true;

			this.update();
		}, 2000);

		setTimeout(() => {
			console.log('updating 2!');
			this.state.foo = false;

			this.update();
		}, 4000);
	}

	add(event) {
		event.preventDefault();

		this.increaseStream.push(1);
	}

	showFoo(event) {
		event.preventDefault();

		this.state.show = 'foo';

		this.update();
	}

	showBar(event) {
		event.preventDefault();
		
		this.state.show = 'bar';

		this.update();
	}
}


storeStream.from(App.increaseStream);

global.storeStream = storeStream;



import TestApp1 from './components/TestApp1';

// let viewStream = new ash.ViewStream(<App />);
// let renderStream = new ash.RenderStream(viewStream, global.document.querySelector('.page'));



function assertAshNodeTree(expected, actual) {
	for (let nodeProperty in actual) {
		if (actual.hasOwnProperty(nodeProperty)) {
			if (nodeProperty === 'properties') {
				for (let propertiesProperty in actual[nodeProperty]) {
					if (actual[nodeProperty][propertiesProperty].hasOwnProperty(propertiesProperty)) {
						if (expected[nodeProperty][propertiesProperty] !== actual[nodeProperty][propertiesProperty]) {
							throw new Error(`Expected and actual property mismatch: ${actual[nodeProperty][propertiesProperty]} should be ${expected[nodeProperty][propertiesProperty]}`);
						}
					}
				}
			} else if (nodeProperty !== 'children' && expected[nodeProperty] !== actual[nodeProperty]) {
				throw new Error(`Expected and actual property mismatch: ${actual[nodeProperty]} should be ${expected[nodeProperty]}`);
			}
		}
	}

	if (actual.children && actual.children.length) {
		for (let i = 0; i < actual.children.length; i++) {

			if (!(expected.children && expected.children[i])) {
				throw new Error(`Expected ash node tree doesn't have expected child!`);
			}

			assertAshNodeTree(expected.children[i], actual.children[i]);
		}
	}
}


let updateStream = new ash.Stream();
let viewStream = new ash.ViewStream(<TestApp1 updateStream={updateStream} />);
let renderStream = new ash.RenderStream(viewStream, global.document.querySelector('.page'));


let doneCount = 0;

TestApp1.doneStream.on((count) => {
	doneCount++;

	console.log('doneStream on...', count, TestApp1.doneStream);
	let ashNodeTree = viewStream.get().ashNodeTree;
});

updateStream.push(true);


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
