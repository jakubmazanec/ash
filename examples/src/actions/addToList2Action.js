import ash from 'ash';

var addToList2 = ash.Stream.from((stream, changed) => {
	// console.log('addToList2 fn...');
	var items = [];
	var number = changed[0].get();

	for (let i = 0; i < number; i++) {
		items.push(Math.random().toFixed(1));
	}

	return items;
});

export default addToList2;
