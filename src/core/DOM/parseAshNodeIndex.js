function parseAshNodeIndex(index) {
	var result = index.split('.');
	
	for (let i = 0; i < result.length; i++) {
		result[i] = result[i] >> 0; // NOTE: faster than parseInt
	}

	return result;
}

export default parseAshNodeIndex;
