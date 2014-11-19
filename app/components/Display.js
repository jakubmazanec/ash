'use strict';

var ash = require('../ash');

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

module.exports = ash.createFactory(Display);