'use strict';

var $ = global.$ = require('jquery');
var _ = global._ = require('_');
var ash = global.ash = require('./ash');

var Display = require('./components/Display');
var Timer = require('./components/Timer');


var Renderer = global.Renderer = new ash.Renderer();


$(document).on('click', 'a', function (event) {
	event.preventDefault();


});

var $buttons = $('.ash-button--flat').eq(0);
var progress = 0;

var makeProgress = function () {
	console.log(progress);

	progress += Math.random();

	if (progress > 100) progress = 0;

	$buttons.removeClass (function (index, css) {
	    return (css.match (/(^|\s)progress-\S+/g) || []).join(' ');
	});

	$buttons.addClass('progress-' + Math.floor(progress));

	requestAnimationFrame(makeProgress);
};

//requestAnimationFrame(makeProgress);

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



$('.page').html('<br>');

//Renderer.addComponent(new Timer(), $('.page')[0]);








/**
 * observables & actions test
 *

class BarAction extends ash.Action {
	onTrigger(value)
	{
		return value * 2;
	}
}




var fooObservable = global.fooObservable = new ash.Observable();
var barAction = global.barAction = new BarAction();

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

/*var router = global.router = new ash.Router();
router.add('*all', 'not found');
router.on('all', function ()
{
	console.log('router triggered something', arguments);
});
router.start();*/


// global.TodoStore = TodoStore;
// var todoApp = global.todoApp = new TodoApp();

// TodoStore.create('foo');
// TodoStore.create('bar');
// TodoStore.create('baz');
// // TodoStore.create('qux');

// TodoStore.todos['todo-1'].complete = true;

// Renderer.registerComponent(todoApp, $('.page-content')[0]);

