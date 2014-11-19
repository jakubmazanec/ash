"use strict";

var _ = require("_");
var ash = require("ash");
var TodoTextInput = require("./TodoTextInput");

var createTodo = require("../actions/createTodo");

var Header = ash.Component.create({
  name: "Header",

  render: function () {
    return ash.e("header", null, [ash.e("h1", { style: { margin: 0 } }, "todos"), new TodoTextInput({
      onSave: this.onSave,
      placeholder: "What needs to be done?"
    })]);
  },

  onSave: function (text) {
    if (text && text.trim()) {
      createTodo.trigger({
        text: text
      });
    }
  }
});

module.exports = Header;