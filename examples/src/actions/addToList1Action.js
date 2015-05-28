import ash from 'ash';

var addToList1 = ash.Stream.from((stream, changed) => {
	// console.log('addToList1 fn...', changed[0].get());
	var items = [];
	var value = changed[0].get();

	for (let i = 0; i < value.number; i++) {
		items.push(Math.random().toFixed(1));
	}

	return items;
});

export default addToList1;
