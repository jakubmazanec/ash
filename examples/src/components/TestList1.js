import ash from 'ash';

export default class TestList1 extends ash.Component {
	state = {
		renderCount: 0,
		list: [{id: 1}, {id: 2}, {id: 3}, {id: 4}]
	};

	static doneStream = new ash.Stream();

	render() {
		let children = [];

		this.state.list.forEach((item) => {
			children.push(<li key={'item-' + item.id}>{'' + item.id}</li>);
		});

		return <ul>{children}</ul>;
	}

	onMount() {
		if (this.props && this.props.updateStream) {
			this.props.updateStream.on((newList) => {
				this.state.list = newList;

				this.update();
			});
		}
	}

	onRender() {
		this.state.renderCount++;

		if (this.state.renderCount === 2) {
			this.doneStream.push(true);
		}
	}
}
