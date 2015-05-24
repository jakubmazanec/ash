import ash from 'ash';

export default class List extends ash.Component {
	shouldUpdate(newProps) {
		// console.log('List shouldUpdate...', this.props.label, this.props.list !== newProps.list, this.props.shadow !== newProps.shadow);
		return this.props.list !== newProps.list || this.props.shadow !== newProps.shadow;
	}

	render() {
		return <ul style={{
			outline: this.props.shadow ? '1px solid red' : '1px solid blue'
		}}>
			<button events={{
				click: this.props.changeShadow
			}}>
				!!!
			</button>
			{this.props.list.toArray().map((value, index) => <li key={'' + index}>{'' + value}</li>)}
		</ul>;
	}
}
