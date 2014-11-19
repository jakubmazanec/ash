"use strict";

var _ = require("_");
var ash = require("ash");

var TodoTextInput = ash.Component.create({
  name: "TodoTextInput",

  getInitialState: function () {
    return {
      value: this.props.value || ""
    };
  },

  render: function () {
    return ash.e("input", {
      //className: this.props.className,
      //id: this.props.id,
      placeholder: this.props.placeholder,
      value: this.state.value,
      autoFocus: "true",
      events: {
        blur: this.save,
        // change: this.onChange,
        keydown: this.onKeyDown }
    });
  },

  /**
   * Invokes the callback passed in as onSave, allowing this component to be
   * used in different ways.
   */
  save: function (event) {
    console.log("text inpout calling props.onsave...");
    this.props.onSave(event.target.value);
    /*this.setState(
    {
    	value: ''
    });*/
  },

  /**
   * @param {object} event
   */
  onChange: function ( /*object*/event) {},

  /**
   * @param  {object} event
   */
  onKeyDown: function (event) {
    if (event.keyCode === 13) {
      console.log("text input keydown = ENTER event");
      this.save(event);
    }
  }
});

module.exports = TodoTextInput;