import React from 'react';

export default class List extends React.Component {
	state = {redOutline: false};

	shouldComponentUpdate(nextProps) {
		return nextProps.list !== this.props.list;
	}

	render() {
		// console.log(this.props);
		return React.createElement('ul', {
			style: {
				outline: this.state.redOutline ? '1px solid red' : '1px solid blue'
			}
		},
			React.createElement('button', {
				onClick: this.changeOutline.bind(this)
			}, '!!!'),
			this.props.list.toArray().map((value, index) => React.createElement('li', {key: '' + index}, '' + value))
		);
	}

	

	changeOutline() {
		this.state.redOutline = !this.state.redOutline;

		this.forceUpdate();
	}
}
