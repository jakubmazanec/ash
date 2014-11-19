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

var _classProps = function (child, staticProps, instanceProps) {
  if (staticProps) Object.defineProperties(child, staticProps);
  if (instanceProps) Object.defineProperties(child.prototype, instanceProps);
};

"use strict";

var Creature = (function () {
  var Creature = function Creature(name) {
    this.name = name;
  };

  _classProps(Creature, null, {
    name: {
      get: function () {
        // Template strings
        return this.name;
      }
    }
  });

  return Creature;
})();

var Person = (function (Creature) {
  var Person = function Person(firstName, lastName) {
    this.firstName = firstName;
    this.lastName = lastName;
  };

  _extends(Person, Creature);

  _classProps(Person, null, {
    name: {
      get: function () {
        // Template strings
        return this.firstName + " " + this.lastName;
      }
    },
    toString: {
      writable: true,
      value: function () {
        Creature.prototype.toString.call(this);
        return this.name;
      }
    }
  });

  return Person;
})(Creature);

module.exports = Person;