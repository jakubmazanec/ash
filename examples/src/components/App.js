import ash from 'ash';
import List from './List';
import list1Store from '../stores/list1Store';
import list2Store from '../stores/list2Store';
import appStore from '../stores/appStore';
import Immutable from 'immutable';



export default class App extends ash.Component {
	static list1 = new ash.Stream();

	render() {
		return <div>
			<div style={{
				boxShadow: appStore.get().get('appShadow') ? '2px 2px 5px red' : '2px 2px 5px blue'
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
			<List label="List1" list={list1Store.get()} shadow={appStore.get().get('list1Shadow')} changeShadow={this.changeList1Shadow} />
			<List label="List2" list={list2Store.get()} shadow={appStore.get().get('list2Shadow')} changeShadow={this.changeList2Shadow} />
		</div>;
	}

	onMount() {
		list1Store.subscribe(this.onList1StoreUpdate);
		list2Store.subscribe(this.onList2StoreUpdate);
		appStore.subscribe(this.onAppStoreUpdate);
	}

	onList1StoreUpdate(stream, changed, dependencies) {
		// console.log('onList1StoreUpdate...', changed);

		this.update();
	}

	onList2StoreUpdate(stream, changed, dependencies) {
		// console.log('onList2StoreUpdate...', changed);

		this.update();
	}

	onAppStoreUpdate(stream, changed, dependencies) {
		// console.log('onAppStoreUpdate...', changed);

		this.update();
	}

	changeShadow() {
		appStore.push(appStore.get().set('appShadow', !appStore.get().get('appShadow')));
	}

	addToList1() {
		// console.log('App addToList1...');
		var items = [];

		for (let i = 0; i < 5000; i++) {
			items.push(Math.random().toFixed(1));
		}

		list1Store.push(list1Store.get().push(...items));
	}

	addToList2() {
		// console.log('App addToList2...');
		var items = [];

		for (let i = 0; i < 5000; i++) {
			items.push(Math.random().toFixed(1));
		}

		list2Store.push(list2Store.get().push(...items));
	}

	clearList1() {
		list1Store.push(new Immutable.List());
	}

	clearList2() {
		list2Store.push(new Immutable.List());
	}

	changeList1Shadow() {
		appStore.push(appStore.get().set('list1Shadow', !appStore.get().get('list1Shadow')));
	}

	changeList2Shadow() {
		appStore.push(appStore.get().set('list2Shadow', !appStore.get().get('list2Shadow')));
	}
}
