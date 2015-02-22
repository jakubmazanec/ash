function parseAshNodeIndex(index) {
	var result = index.split('.');
	
	for (let i = 0; i < result.length; i++) {
		result[i] = parseInt(result[i], 10);
	}

	return result;
}

export default parseAshNodeIndex;
