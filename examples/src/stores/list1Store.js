import ash from 'ash';
import Immutable from 'immutable';
import addToList1Action from '../actions/addToList1Action';

var list1Store = ash.Stream.from(new Immutable.List());

list1Store.from((stream, changed) => {
	// console.log('list1Store fn...');
	return list1Store.get().push(...changed[0].get());
}, addToList1Action);

export default list1Store;
