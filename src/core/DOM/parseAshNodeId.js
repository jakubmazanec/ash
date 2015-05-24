export default function parseAshNodeId(id) {
	var result = id.split('.');
	
	for (let i = 0; i < result.length; i++) {
		result[i] |= 0;
	}

	return result;
}
