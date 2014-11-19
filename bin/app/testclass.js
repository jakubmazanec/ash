var _classProps = function (child, staticProps, instanceProps) {
  if (staticProps) Object.defineProperties(child, staticProps);
  if (instanceProps) Object.defineProperties(child.prototype, instanceProps);
};

var _extends = function (child, parent) {
  child.prototype = Object.create(parent.prototype, {
    constructor: {
      value: child,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  child.__proto__ = parent;
};

"use strict";

var Character = function Character(x, y) {
  this.x = x;
  this.y = y;
};

var Monster = (function (Character) {
  var Monster = function Monster(x, y, name) {
    Character.call(this, x, y);
    this.name = name;
    this.health_ = 100;
  };

  _extends(Monster, Character);

  _classProps(Monster, null, {
    attack: {
      writable: true,
      value: function (character) {
        Character.prototype.attack.call(this, character);
        // Can also be written as:
        // super(character);
      }
    },
    isAlive: {
      get: function () {
        return this.health_ > 0;
      }
    },
    health: {
      get: function () {
        return this.health_;
      },
      set: function (value) {
        if (value < 0) throw new Error("Health must be non-negative.");
        this.health_ = value;
      }
    }
  });

  return Monster;
})(Character);

module.exports = Monster;