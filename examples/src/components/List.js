import ash from 'ash';

export default class List extends ash.Component {
	state = {redOutline: false};

	name = 'List';

	render() {
		return <ul style={{
			outline: this.state.redOutline ? '1px solid red' : '1px solid blue'
		}}>
			<button events={{
				click: this.changeOutline
			}}>
				!!!
			</button>
			{this.props.map((value, index) => <li key={'' + index}>{'' + value}</li>)}
		</ul>;
	}

	changeOutline() {
		this.state.redOutline = !this.state.redOutline;

		this.isDirty = true;
	}

	onBeforeReceiveProps() {
	}
}
