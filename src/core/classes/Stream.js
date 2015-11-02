import isFunction from '../internals/isFunction';


let trueFn = () => true;
let streamsToUpdate = [];
let inStream;
let flushing = false;
let order = [];
let nextOrderIndex = -1;

function findDependencies(stream) {
	if (stream.__isQueued === false) {
		stream.__isQueued = true;

		for (let i = 0; i < stream.__listeners.length; ++i) {
			findDependencies(stream.__listeners[i]);
		}

		order[++nextOrderIndex] = stream;
	}
}

function detachDependencies(stream) {
	for (let i = 0; i < stream.__dependencies.length; ++i) {
		stream.__dependencies[i].__listeners[stream.__dependencies[i].__listeners.indexOf(stream)] = stream.__dependencies[i].__listeners[stream.__dependencies[i].__listeners.length - 1];
		stream.__dependencies[i].__listeners.length--;
	}

	stream.__dependencies.length = 0;
}

function flushUpdate() {
	// flush update
	flushing = true;

	while (streamsToUpdate.length) {
		let stream = streamsToUpdate.shift();

		if (stream.__values.length > 0) {
			stream.value = stream.__values.shift();
		}

		updateDependencies(stream);
	}

	flushing = false;
}

function updateStream(stream) {
	stream.__dependenciesMet = true;

	for (let i = 0; i < stream.__dependencies.length; i++) {
		if (!stream.__dependencies[i].hasValue) {
			stream.__dependenciesMet = false;

			break;
		}
	}

	if (!stream.__dependenciesMet || stream.end && stream.end.value === true) {
		return;
	}

	if (inStream) {
		streamsToUpdate.push(stream);
	} else {
		inStream = stream;

		let returnValue = stream.fn(stream, stream.__changedDependencies, stream.__dependencies);

		if (returnValue !== undefined) {
			stream.push(returnValue);
		}

		inStream = undefined;

		if (stream.__changedDependencies !== undefined) {
			stream.__changedDependencies = [];
		}

		stream.__shouldUpdate = false;
		
		if (flushing === false) {
			flushUpdate();
		}
	}
}

function updateDependencies(stream) {
	for (let i = 0; i < stream.__listeners.length; ++i) {
		if (stream.__listeners[i].end === stream) {
			if (stream.__listeners[i].__dependencies) {
				detachDependencies(stream.__listeners[i]);
			}

			if (stream.__listeners[i].end) {
				detachDependencies(stream.__listeners[i].end);
			}
		} else {
			if (stream.__listeners[i].__changedDependencies !== undefined) {
				stream.__listeners[i].__changedDependencies.push(stream);
			}

			stream.__listeners[i].__shouldUpdate = true;

			findDependencies(stream.__listeners[i]);
		}
	}

	for (; nextOrderIndex >= 0; --nextOrderIndex) {
		if (order[nextOrderIndex].__shouldUpdate === true) {
			updateStream(order[nextOrderIndex]);
		}

		order[nextOrderIndex].__isQueued = false;
	}
}

export default class Stream {
	hasValue = false;
	value = undefined;
	__values = [];
	__listeners = [];
	__isQueued = false;
	end = null;
	fn = null;
	__dependencies = [];
	__dependenciesMet = false;
	__changedDependencies = [];
	__shouldUpdate = false;
	isEndStream = false;

	constructor(fn, ...dependencies) {
		this.update = this.push = ::this.push;

		if (fn === trueFn) {
			this.fn = fn;
			this.isEndStream = true;
		} else {
			this.end = new Stream(trueFn);
			this.end.__listeners.push(this);

			if (arguments.length >= 2 || isFunction(fn)) {
				if (!isFunction(fn)) {
					throw new Error(`${fn} (fn) must be a function!`);
				}

				this.fn = fn;

				this.from(...dependencies);
			} else if (arguments.length === 1) {
				this.push(fn);
			}
		}

		return this;
	}

	from(/*...dependencies*/) {
		detachDependencies(this);
		detachDependencies(this.end);

		let dependencies = [];
		let endStreams = [];

		for (let i = 0; i < arguments.length; i++) {
			if (arguments[i] instanceof Stream) {
				dependencies.push(arguments[i]);

				if (arguments[i].end) {
					endStreams.push(arguments[i].end);
				}
			}
		}

		if (dependencies.length) {
			// add listeners to stream
			this.__dependencies = dependencies;

			for (let i = 0; i < dependencies.length; ++i) {
				dependencies[i].__listeners.push(this);
			}

			// add listeners to end stream
			this.end.__dependencies = endStreams;

			for (let i = 0; i < endStreams.length; ++i) {
				endStreams[i].__listeners.push(this.end);
			}

			// update stream
			updateStream(this);
		}

		return this;
	}

	get() {
		return this.value;
	}

	push(value) {
		if (value !== undefined && value !== null && isFunction(value.then)) {
			value.then(this.push).catch(this.push);
			
			return this;
		}

		this.value = value;
		this.hasValue = true;
		
		if (!inStream) {
			flushing = true;

			updateDependencies(this);
			
			if (streamsToUpdate.length > 0) {
				flushUpdate();
			} else {
				flushing = false;
			}
		} else if (inStream === this) {
			// mark listeners
			for (let i = 0; i < this.__listeners.length; ++i) {
				if (this.__listeners[i].end !== this) {
					if (this.__listeners[i].__changedDependencies !== undefined) {
						this.__listeners[i].__changedDependencies.push(this);
					}
					this.__listeners[i].__shouldUpdate = true;
				} else {
					if (this.__listeners[i].__dependencies) {
						detachDependencies(this.__listeners[i]);
					}

					if (this.__listeners[i].end) {
						detachDependencies(this.__listeners[i].end);
					}
				}
			}
		} else {
			this.__values.push(value);
			streamsToUpdate.push(this);
		}

		return this;
	}

	endsOn(endStream) {
		detachDependencies(this.end);
		endStream.__listeners.push(this.end);
		this.end.__dependencies.push(endStream);

		return this;
	}

	static isStream(stream) {
		return stream instanceof Stream;
	}

	toString() {
		return 'stream(' + this.value + ')';
	}

	static map(fn, stream) {
		return new Stream((self) => { self.push(fn(stream.value)); }, stream);
	}

	static on(fn, stream) {
		return new Stream(() => { fn(stream.value); }, stream);
	}

	map(fn) {
		return Stream.map(fn, this);
	}

	on(fn) {
		return Stream.on(fn, this);
	}

	ap(stream) {
		return new Stream(() => this.get()(stream.get()), this, stream);
	}
}
