
'use strict';

var _ = require('_');
var ash = require('ash');
var TodoTextInput = require('./TodoTextInput');

var completeTodo = require('../actions/completeTodo');
var destroyTodo = require('../actions/destroyTodo');
var updateText = require('../actions/updateText');

var TodoItem = ash.Component.create(
{
	name: 'TodoItem',

	getInitialState: function ()
	{
		return {
			isEditing: false
		};
	},

	render: function()
	{
		var input;

		//console.log('rendering todoitem');

		if (this.state.isEditing)
		{
			input = new TodoTextInput(
			{
				className: 'edit',
				onSave: this.onSave,
				value: this.props.todo.text
			});
		}

		return ash.e('li',
		{
			//className: (this.props.todo.complete ? 'isCompleted' : '') + ' ' + (this.state.isEditing ? 'isEditing' : ''),
			key: this.props.todo.id
		}, [
			ash.e('div', {className: 'view'}, [
				ash.e('input',
				{
					className: 'toggle',
					type: 'checkbox',
					checked: this.props.todo.complete ? 'checked' : 'unchecked',
					events:
					{
						'change': this.onToggleComplete
					}
				}),
				ash.e('label',
				{
					events:
					{
						'dblclick': this.onDoubleClick
					}
				}, this.props.todo.text),
			]),
			input
		]);
	},

	onToggleComplete: function ()
	{
		console.log('todoitem toggle click');
		completeTodo.trigger(
		{
		id: this.props.todo.id
		});
	},

	onDoubleClick: function ()
	{
		console.log('todoitem doubleclikc');
		this.setState({isEditing: true});
	},

	/**
	 * Event handler called within TodoTextInput.
	 * Defining this here allows TodoTextInput to be used in multiple places
	 * in different ways.
	 * @param  {string} text
	 */
	onSave: function (text)
	{
		updateText.trigger(
		{
			id: this.props.todo.id,
			text: text
		});
		this.setState({isEditing: false});
	},

	onDestroyClick: function()
	{
		destroyTodo.trigger(
		{
			id: this.props.todo.id
		});
	}
});

module.exports = TodoItem;