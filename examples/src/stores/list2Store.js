import ash from 'ash';
import Immutable from 'immutable';
import addToList2Action from '../actions/addToList2Action';

var list2Store = ash.Stream.from(new Immutable.List());

list2Store.from((stream, changed) => {
	// console.log('list2Store fn...');
	return list2Store.get().push(...changed[0].get());
}, addToList2Action);

export default list2Store;
