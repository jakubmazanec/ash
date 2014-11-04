(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw (f.code="MODULE_NOT_FOUND", f)}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

//var $ = window.$ = require('jquery');
//var _ = window._ = require('_');
var ash = window.ash = require('./ash');


//Renderer = window.Renderer = new ash.Renderer();























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



/*var fooAction = new ash.Action();
var barAction = window.barAction = new ash.Action(function (number)
{
	return number * 2;
});

var fooStore = new ash.Store();

//fooAction.trigger({foo: 42});
barAction.trigger(1);


var events = new ash.Events();

fooStore.listenTo(fooAction, function ()
{
	console.log('listened to fooAction...', arguments);
});

fooStore.listenTo(barAction, function (number)
{
	console.log('listened to barAction...', number);
});*/




// function benchmark ()
// {
// 	//console.log('*** BENCHMARK ***');
// 	//var time = Date.now();
// 	for (var i = 0; i < 3; i++)
// 	{
// 		//Dispatcher.dispatch(TODO_CREATE,
// 		//{
// 		//	text: '' + i
// 		//});
// 		TodoStore.create('' + i);
// 		//TodoStore.trigger('change');
// 		//TodoStore.onAction(TODO_CREATE,
// 		//{
// 		//	text: '' + i
// 		//});
// 		//Renderer.__stages[0].descriptorTree.instance.onTodoStoreChange();
// 	}
// 	TodoStore.trigger('change');
// 	//console.log('*** BENCHMARK END ***');
// 	//console.log(Date.now() - time);
// }

// $('#button-1').on('click', function (event)
// {
// 	event.preventDefault();

// 	benchmark();
// });

// //benchmark();







// TEST
/*console.log('*** TEST ***');

var Renderer = window.Renderer = new ash.Renderer();

var FooComponent = ash.Component.create(
{
	name: 'FooComponent',

	render: function ()
	{
		console.log('rendering foo...', this);
		return new BarComponent();
	}
});

var BarComponent = ash.Component.create(
{
	name: 'BarComponent',

	render: function ()
	{
		console.log('rendering bar...', this);
		return ash.e('div#bar', {}, new QuxComponent(), new PaxComponent());
	}
});

var QuxComponent = ash.Component.create(
{
	name: 'QuxComponent',

	render: function ()
	{
		console.log('rendering qux...', this);
		return ash.e('span#qux', {}, 'It is a quxtime!');
	}
});

var PaxComponent = ash.Component.create(
{
	name: 'PaxComponent',

	render: function ()
	{
		console.log('rendering pax...', this);
		return ash.e('span#pax', {}, 'It is a paxtime!');
	}
});



var ClickApp = ash.Component.create(
{
	name: 'ClickApp',

	getInitialState: function ()
	{
		return {
			clicks: 0,
		};
	},

	render: function ()
	{
		return ash.e('div#click-app', {},
			new ClickDisplay(
			{
				clicks: this.state.clicks
			}),
			new ClickButton(
			{
				clicks: this.state.clicks,
				onChange: this.updateNumber
			}));
	},

	updateNumber: function (value)
	{
		console.log('click', value);

		this.setState(
		{
			clicks: value
		});

		console.log('clicks are now', this.state.clicks);
	},
});

var ClickDisplay = ash.Component.create(
{
	name: 'ClickDisplay',

	render: function ()
	{
		return ash.e('i', {}, 'Clicks' + this.props.clicks);
	}
});

var ClickButton = ash.Component.create(
{
	name: 'ClickButton',

	render: function ()
	{
		return ash.e('div', {},
			ash.e('button',
			{
				events:
				{
					//click: this.props.onChange.bind(null, this.props.clicks + 1)
					click: _.bind(function ()
					{
						this.props.onChange(this.props.clicks + 1);
					}, this)
				}
			}, '+'),
			ash.e('button',
			{
				events:
				{
					click: this.props.onChange.bind(null, this.props.clicks - 1)
				}
			}, '-'));
	}
});




var ToggleAppWrapper = ash.Component.create(
{
	name: 'ToggleAppWrapper',

	render: function ()
	{
		return new ToggleApp();
	}
});

var ToggleApp = ash.Component.create(
{
	name: 'ToggleApp',

	getInitialState: function ()
	{
		return {
			show: true,
		};
	},

	render: function ()
	{
		var render = [];

		render.push(new ToggleButton({onClick: this.toggleShow}));

		if (this.state.show)
		{
			render.push(new ToggleFoo());//ash.e('b', {}, 'foo!'));
		}

		//render.push(this.state.show ? new ToggleFoo());// ash.e('b', {}, 'show!') : ash.e('i', {}, 'hide...'));
		

		return ash.e('div#toggle-app', {}, render);
	},

	toggleShow: function (value)
	{
		console.log('click', value);

		this.setState(
		{
			show: !this.state.show
		});

		console.log('showing now?', this.state.show);
	},
});

var ToggleFoo = ash.Component.create(
{
	name: 'ToggleFoo',

	render: function ()
	{
		return ash.e('b', {}, 'Foo!');
	}
});

var ToggleButton = ash.Component.create(
{
	name: 'ToggleButton',

	render: function ()
	{
		return ash.e('button',
		{
			events:
			{
				click: this.props.onClick
			}
		}, 'toggle');
	}
});





var Display = ash.Component.create(
{
	name: 'Display',
	getInitialState: function() {
		return {displayClicks: 0};
	},
	render: function() {
		//console.log(this);
		
		var message =
			'Timer Clicks = ' + this.props.timerClicks + ' -- Display Click = ' + this.state.displayClicks;

		return ash.e('div', null, [message,
			ash.e('button', {
				style:
				{
					color: this.state.displayClicks % 2 === 0 ? 'red' : 'blue'
				},
				events:
				{
					click: this.tick
				}
			}, '+')]);
	},

	tick: function() {
		//console.log(this.name + ' tick!');
		this.setState({displayClicks: this.state.displayClicks + 1});
	},

	onBeforeReceiveProps: function ()
	{
		//console.log('display componentWillReceiveProps');
	},

	onMount: function ()
	{
		//console.log('display componentDidMount');
		//debugger;
		//this.interval = setInterval(this.tick, 500);
		//console.log(this.getDOMNode());
	},

	onUnmount: function() {
		//console.log('display componentWillUnmount');
		//clearInterval(this.interval);
	},
});

var Timer = ash.Component.create(
{
	name: 'Timer',
	getInitialState: function() {
		return {timerClicks: 0};
	},
	tick: function() {
		console.log(this.name + ' tick!');
		this.setState({timerClicks: this.state.timerClicks + 1});
	},
	onMount: function() {
		//console.log('Timer onMount');
		this.interval = setInterval(this.tick, 1000);
		//console.log(this.getDOMNode());
	},
	onUnmount: function() {
		//console.log('Timer onUnmount');
		//clearInterval(this.interval);
	},
	onBeforeMount: function ()
	{
		//console.log('Timer onBeforeMount');
	},

	shouldUpdate: function ()
	{
		return false;
	},

	render: function()
	{
		return ash.e('div', null,
		
			new Display({timerClicks: this.state.timerClicks}),
			ash.e('button', {
				style:
				{
					color: this.state.timerClicks % 2 === 0 ? 'red' : 'blue'
				},
				events:
				{
					click: this.tick
				}
			}, '+')
			//new Foo()
		);
	}
});*/




//Renderer.registerComponent(new FooComponent(), $('.page-content')[0]);
//Renderer.registerComponent(new ClickApp(), $('.page-content')[0]);
//Renderer.registerComponent(new ToggleAppWrapper(), $('.page-content')[0]);
//Renderer.registerComponent(new Timer(), $('.page-content')[0]);
},{"./ash":2}],2:[function(require,module,exports){
/*var ash = require('../src/index');

module.exports = ash;*/
},{}]},{},[1]);
