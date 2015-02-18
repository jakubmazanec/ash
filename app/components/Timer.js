import ash from '../ash';
import Display from './Display';

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
		]);
	}
}

export default ash.createFactory(Timer);