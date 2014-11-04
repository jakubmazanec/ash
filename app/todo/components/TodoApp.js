
	'use strict';

	var _ = require('_');
	var ash = require('ash');
	var Header = require('./Header');
	var Footer = require('./Footer');
	var MainSection = require('./MainSection');
	var TodoStore = require('../TodoStore');

	/**
	 * Retrieve the current TODO data from the TodoStore
	 */
	function getTodoState()
	{
		var todoState =
		{
			allTodos: TodoStore.getAll(),
			areAllComplete: TodoStore.areAllComplete()
		};

		return todoState;
	}

	var TodoApp = ash.Component.create(
	{
		name: 'TodoApp',
		
		getInitialState: function()
		{
			return getTodoState();
		},

		onMount: function ()
		{
			TodoStore.on('change', this.onTodoStoreChange);
		},

		onUnmount: function ()
		{
			TodoStore.off('change', this.onTodoStoreChange);
		},

		render: function()
		{
			return ash.e('div', [
				//new Header(),
				new MainSection({
					allTodos: this.state.allTodos,
					areAllComplete: this.state.areAllComplete
				}),
				new Footer(
				{
					allTodos: this.state.allTodos
				})
			]);
		},

		onTodoStoreChange: function ()
		{
			this.setState(getTodoState());
		}
	});

	module.exports = TodoApp;