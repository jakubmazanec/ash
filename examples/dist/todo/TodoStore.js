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

function _ref(payload) {
	this.create(payload.text);
}

function _ref2(payload) {
	if (this.areAllComplete()) {
		this.updateAll({ complete: false });
	} else {
		this.updateAll({ complete: true });
	}
}

function _ref3(payload) {
	this.update(payload.id, { complete: false });
}

function _ref4(payload) {
	this.update(payload.id, { complete: true });
}

function _ref5(payload) {
	this.update(payload.id, { text: payload.text });
}

function _ref6(payload) {
	this.destroy(payload.id);
}

function _ref7(payload) {
	this.destroyCompleted();
}

var TodoStore = ash.Store.extend({
	initialize: function () {
		this.todos = {};

		this.listenTo(createTodo, _ref);

		this.listenTo(toggleCompleteAll, _ref2);

		this.listenTo(undoComplete, _ref3);

		this.listenTo(completeTodo, _ref4);

		this.listenTo(updateText, _ref5);

		this.listenTo(destroyTodo, _ref6);

		this.listenTo(destroyCompleted, _ref7);
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