"use strict";

var _ = require("_");
var ash = require("ash");
var TodoItem = require("./TodoItem");

var toggleCompleteAll = require("../actions/toggleCompleteAll");

var MainSection = ash.Component.create({
  name: "MainSection",

  render: function () {
    if (!_.keys(this.props.allTodos).length) {
      return null;
    }

    var todos = [];

    _.forOwn(this.props.allTodos, function (value, key, object) {
      todos.push(new TodoItem({
        key: key,
        todo: value
      }));
    });

    return ash.e("section", null, [ash.e("input", {
      id: "toggle-all",
      type: "checkbox",
      checked: this.props.areAllComplete ? "checked" : "",
      events: {
        change: this.onToggleCompleteAll
      }
    }), ash.e("label", {
      for: "toggle-all"
    }, "Mark as complete"), ash.e("ul", {
      id: "todo-list"
    }, todos)]);
  },

  onToggleCompleteAll: function () {
    toggleCompleteAll.trigger();
  }
});

module.exports = MainSection;