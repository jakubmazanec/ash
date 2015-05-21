import ash from 'ash';
import List from './List';



export default class App extends ash.Component {
	state = new ash.ImmutableObject({
		list1: new ash.ImmutableArray(),
		list2: new ash.ImmutableArray(),
		redShadow: true
	});

	name = 'App';

	render() {
		return <div>
			<div style={{
				boxShadow: this.state.redShadow ? '2px 2px 5px red' : '2px 2px 5px blue'
			}}>
				<button events={{
					click: this.addToList1
				}}>+ list 1!</button>
				<button events={{
					click: this.addToList2
				}}>+ list 2!</button>
				<button events={{
					click: this.clearList1
				}}>+ clear 1!</button>
				<button events={{
					click: this.clearList2
				}}>+ clear 2!</button>
				<button events={{
					click: this.changeShadow
				}}>!!!</button>
			</div>
			<List {...this.state.list1} />
			<List {...this.state.list2} />
		</div>;
	}

	onMount() {
		// console.log('App mounted!');
	}

	changeShadow() {
		this.state = this.state.set('redShadow', !this.state.redShadow);
		this.isDirty = true;
	}

	addToList1() {
		// console.log('App addToList1...');

		var items = [];

		for (let i = 0; i < 5000; i++) {
			items.push(Math.random().toFixed(1));
		}

		this.state = this.state.merge({list1: this.state.list1.concat(items)});
		// this.state.list1 = this.state.list1.concat(items);

		this.isDirty = true;
	}

	addToList2() {
		var items = [];

		for (let i = 0; i < 5000; i++) {
			items.push(Math.random().toFixed(1));
		}

		this.state = this.state.merge({list2: this.state.list2.concat(items)});
		// this.state.list2 = this.state.list2.concat(items);

		this.isDirty = true;
	}

	clearList1() {
		this.state = this.state.merge({list1: []});
		// this.state.list1 = [];
		this.isDirty = true;
	}

	clearList2() {
		this.state = this.state.merge({list2: []});
		// this.state.list2 = [];
		this.isDirty = true;
	}

	get randomFoo() {
		return Math.random();
	}
}
