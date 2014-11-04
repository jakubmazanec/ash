'use strict';

class Creature
{
	constructor(name)
	{
    this.name = name;
		
  }

  get name()
	{
    // Template strings
    return this.name;
  }
}

class Person extends Creature
{
  constructor(firstName, lastName)
	{
    this.firstName = firstName;
    this.lastName = lastName;
		
  }

  get name()
	{
    // Template strings
    return this.firstName + ' ' + this.lastName;
  }

  toString()
	{
		super()
    return this.name;
  }
}

module.exports = Person;