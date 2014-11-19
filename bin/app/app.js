"use strict";

var $ = window.$ = require("jquery");
var _ = window._ = require("_");
var ash = window.ash = require("./ash");

var Display = require("./components/Display");
var Timer = require("./components/Timer");


Renderer = window.Renderer = new ash.Renderer();







//Renderer.addComponent(timer(), $('.page-content')[0]);


/*class FooComponent extends ash.Component {
	render() {
		return ash.e('div', {
			style: {
				'border-top': '1px solid red',
				'font-size': '24px'
			},
			'checked': true,
			'value': 42,
			'data-foo': '<This is Foo!>'
		}, [
			ash.e('b', null, 'This is Foo!')
		]);
	}
}

var fooComponent = ash.createFactory(FooComponent);*/

var html;
//html = Renderer.componentToString(fooComponent());
//html = Renderer.componentToString(Timer());

//console.log(html);



//$('.page-content').html(html);

Renderer.addComponent(Timer(), $(".page")[0]);








/**
 * observables & actions test
 *

class BarAction extends ash.Action {
	onTrigger(value)
	{
		return value * 2;
	}
}




var fooObservable = window.fooObservable = new ash.Observable();
var barAction = window.barAction = new BarAction();

fooObservable.name = 'fooObservable';
barAction.name = 'barAction';

function report()
{
	console.log('reporting argument 1: ', arguments[0], ' and 2: ', arguments[1]);
	console.log('this is ', this);
}

function reportAll()
{
	console.log('reporting all arguments: ', arguments);
	console.log('this is ', this);
}

fooObservable.observe(barAction, '*', report);

barAction.trigger(42, 47);*/


















/**
 * todo
 */

/*var TodoStore = require('./todo/TodoStore');
var TodoApp = require('./todo/components/TodoApp');*/

/*var router = window.router = new ash.Router();
router.add('*all', 'not found');
router.on('all', function ()
{
	console.log('router triggered something', arguments);
});
router.start();*/


// window.TodoStore = TodoStore;
// var todoApp = window.todoApp = new TodoApp();

// TodoStore.create('foo');
// TodoStore.create('bar');
// TodoStore.create('baz');
// // TodoStore.create('qux');

// TodoStore.todos['todo-1'].complete = true;

// Renderer.registerComponent(todoApp, $('.page-content')[0]);