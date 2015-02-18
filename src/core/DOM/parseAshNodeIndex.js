function parseAshNodeIndex(index) {
	return index.split('.').map((value) => {
		return parseInt(value, 10);
	});
}

export default parseAshNodeIndex;
