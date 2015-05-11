'use strict';

var _ = require('_');
var ash = require('ash');
var completeTodo = require('./actions/completeTodo');
var createTodo = require('./actions/createTodo');
var destroyCompleted = require('./actions/destroyCompleted');
var destroyTodo = require('./actions/destroyTodo');
var toggleCompleteAll = require('./actions/toggleCompleteAll');
var undoComplete = require('./actions/undoComplete');
var updateText = require('./actions/updateText');

var TodoStore = ash.Store.extend({
	initialize: function () {
		this.todos = {};

		this.listenTo(createTodo, function (payload) {
			this.create(payload.text);
		});

		this.listenTo(toggleCompleteAll, function (payload) {
			if (this.areAllComplete()) {
				this.updateAll({ complete: false });
			} else {
				this.updateAll({ complete: true });
			}
		});

		this.listenTo(undoComplete, function (payload) {
			this.update(payload.id, { complete: false });
		});

		this.listenTo(completeTodo, function (payload) {
			this.update(payload.id, { complete: true });
		});

		this.listenTo(updateText, function (payload) {
			this.update(payload.id, { text: payload.text });
		});

		this.listenTo(destroyTodo, function (payload) {
			this.destroy(payload.id);
		});

		this.listenTo(destroyCompleted, function (payload) {
			this.destroyCompleted();
		});
	},

	create: function (text) {
		if (_.isString(text) && text.trim() !== '') {
			var id = _.uniqueId('todo-'); //_.uuid();

			this.todos[id] = {
				id: id,
				text: text.trim(),
				complete: false
			};
		}

		this.trigger('change');
	},

	update: function (id, data) {
		_.assign(this.todos[id], data);

		this.trigger('change');
	},

	updateAll: function (data) {
		_.forOwn(this.todos, function (todo) {
			_.assign(todo, data);
		});

		this.trigger('change');
	},

	destroy: function (id) {
		delete this.todos[id];

		this.trigger('change');
	},

	destroyCompleted: function () {
		_(this.todos).filter('complete').pluck('id').map(this.destroy, this);

		this.trigger('change');
	},

	getAll: function () {
		return this.todos;

		this.trigger('change');
	},

	areAllComplete: function () {
		return !_.countBy(this.todos, 'complete').false;

		this.trigger('change');
	}
});

module.exports = new TodoStore();