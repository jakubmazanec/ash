function assign(/*target, ...source*/) {
	var sources = [];
	var target = arguments[0] || {};

	for (let i = 1; i < arguments.length; i++) {
		if (arguments[i] && typeof arguments[i] === 'object') {
			sources.push(arguments[i]);
		}
	}

	if (!sources.length) {
		return target;
	}

	for (let i = 0; i < sources.length; i++) {
		for (let prop in sources[i]) {
			if (sources[i].hasOwnProperty(prop) && typeof sources[i][prop] !== 'undefined' && sources[i][prop] !== null) {
				target[prop] = sources[i][prop];
			}
		}
	}

	return target;
}

export default assign;
