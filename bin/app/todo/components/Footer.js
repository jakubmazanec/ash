"use strict";

var _ = require("_");
var ash = require("ash");

var destroyCompleted = require("../actions/destroyCompleted");

var Footer = ash.Component.create({
  name: "Footer",

  render: function () {
    var allTodos = this.props.allTodos;
    var total = Object.keys(allTodos).length;

    if (total === 0) {
      return null;
    }

    var completed = 0;
    for (var key in allTodos) {
      if (allTodos[key].complete) {
        completed++;
      }
    }

    var itemsLeft = total - completed;
    var itemsLeftPhrase = itemsLeft === 1 ? " item " : " items ";
    itemsLeftPhrase += "left";

    // Undefined and thus not rendered if no completed items are left.
    var clearCompletedButton;
    if (completed) {
      clearCompletedButton = ash.e("button", {
        id: "clear-completed",
        events: {
          click: this.onClearCompletedClick
        }
      }, "Clear completed (" + completed + ")");
    }

    return ash.e("footer", null, [ash.e("span", null, [ash.e("strong", null, "" + itemsLeft), itemsLeftPhrase]), clearCompletedButton]);
  },

  onClearCompletedClick: function () {
    destroyCompleted.trigger();
  }

});

module.exports = Footer;