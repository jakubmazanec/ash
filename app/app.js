'use strict';

var $ = window.$ = require('jquery');
var _ = window._ = require('_');
var ash = window.ash = require('./ash');


Renderer = window.Renderer = new ash.Renderer();



class Display extends ash.Component {
	getInitialState() {
		return {displayClicks: 0};
	}

	autobind() {
		return ['tick'];
	}

	render() {
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
	}

	tick() {
		//console.log(this.name + ' tick!');
		this.setState({displayClicks: this.state.displayClicks + 1});
	}

	onBeforeReceiveProps() {
		//console.log('display componentWillReceiveProps');
	}

	onMount() {
		//console.log('display componentDidMount');
		//debugger;
		//this.interval = setInterval(this.tick, 500);
		//console.log(this.getDOMNode());
	}

	onUnmount() {
		//console.log('display componentWillUnmount');
		//clearInterval(this.interval);
	}
}

var display = window.display = ash.createFactory(Display);

class Timer extends ash.Component {
	getInitialState() {
		return {timerClicks: 0};
	}

	autobind() {
		return ['tick'];
	}

	tick() {
		console.log('timer tick!');
		this.setState({timerClicks: this.state.timerClicks + 1});
	}

	onMount() {
		//console.log('Timer onMount');
		//this.interval = setInterval(this.tick, 1000);
		//console.log(this.getDOMNode());
	}

	onUnmount() {
		//console.log('Timer onUnmount');
		//clearInterval(this.interval);
	}

	onBeforeMount()	{
		//console.log('Timer onBeforeMount');
	}

	/*shouldUpdate () {
		return false;
	}*/

	render() {
		return ash.e('div', null, [		
			display({timerClicks: this.state.timerClicks}),
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
		]);
	}
}

var timer = window.timer = ash.createFactory(Timer);

Renderer.addComponent(timer(), $('.page-content')[0]);



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

barAction.trigger(42, 47);


















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

