import React from 'react';
import ListReact from './ListReact';
import Immutable from 'immutable';



export default class App extends React.Component {
	state = {
		list1: new Immutable.List(),
		list2: new Immutable.List(),
		redShadow: true
	};

	render() {
		return React.createElement('div', null,
			React.createElement('div', {
				style: {
					boxShadow: this.state.redShadow ? '2px 2px 5px red' : '2px 2px 5px blue'
				}
			},
				React.createElement('button', {onClick: this.addToList1.bind(this)}, '+ list 1!'),
				React.createElement('button', {onClick: this.addToList2.bind(this)}, '+ list 2!'),
				React.createElement('button', {onClick: this.clearList1.bind(this)}, '+ clear 1!'),
				React.createElement('button', {onClick: this.clearList2.bind(this)}, '+ clear 2!'),
				React.createElement('button', {onClick: this.changeShadow.bind(this)}, '!!!')
			),
			React.createElement(ListReact, {list: this.state.list1}),
			React.createElement(ListReact, {list: this.state.list2})
		);
	}

	changeShadow() {
		this.state = this.state.set('redShadow', !this.state.redShadow);

		this.forceUpdate();
	}

	addToList1() {
		// console.log('App addToList1...');

		var items = [];

		for (let i = 0; i < 100; i++) {
			items.push(Math.random().toFixed(1));
		}

		this.state.list1 = this.state.list1.concat(items);
		// this.state.list1 = this.state.list1.concat(items);

		this.forceUpdate();
	}

	addToList2() {
		var items = [];

		for (let i = 0; i < 5000; i++) {
			items.push(Math.random().toFixed(1));
		}

		this.state.list2 = this.state.list2.concat(items);
		// this.state.list2 = this.state.list2.concat(items);

		this.forceUpdate();
	}

	clearList1() {
		this.state = this.state.merge({list1: []});
		// this.state.list1 = [];
		this.forceUpdate();
	}

	clearList2() {
		this.state = this.state.merge({list2: []});
		// this.state.list2 = [];
		this.forceUpdate();
	}
}
