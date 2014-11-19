"use strict";

var Creature = function () {
  var Creature = function Creature(name) {
    this.name = name;
  };

  Object.defineProperties(Creature.prototype, {
    name: {
      get: function () {
        // Template strings
        return this.name;
      }
    }
  });

  return Creature;
}();

var Person = function (Creature) {
  var Person = function Person(firstName, lastName) {
    this.firstName = firstName;
    this.lastName = lastName;
  };

  Person.prototype = Object.create(Creature.prototype, {
    constructor: {
      value: Person,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });

  Person.__proto__ = Creature;

  Object.defineProperties(Person.prototype, {
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
}(Creature);

module.exports = Person;