import StreamTransformer from './StreamTransformer';
import StreamsQueue from './StreamsQueue';
import isFunction from '../internals/isFunction';
import {detachStreamDependencies, isInStream, getInStream, updateStream} from './streamMethods';



var streamsQueue = new StreamsQueue();

class Stream {
	value = undefined;
	hasValue = false;
	end = undefined;
	fn = undefined;

	__queued = false;
	__listeners = [];
	__dependencies = [];
	__updatedDependencies = [];
	__dependenciesMet = false;

	constructor({isEndStream = false, value} = {}) {
		if (value !== undefined || typeof arguments[0] === 'object' && arguments[0].hasOwnProperty('value')) {
			this.value = value;
			this.hasValue = true;
		}

		// autobind push method
		// this.push = this.push.bind(this);

		this.isEndStream = !!isEndStream;

		if (!this.isEndStream) {
			this.end = new Stream({isEndStream: true});
			this.end.__listeners.push(this);
		} else {
			this.fn = () => true;
		}
	}

	static from(fn, ...args) {
		return new Stream().from(fn, ...args);
	}

	toString() {
		return 'stream(' + this.value + ')';
	}

	from(fn, ...args) {
		if (args.length) {
			if (isFunction(fn)) {
				this.fn = fn;
			}

			detachStreamDependencies(this);

			for (let i = 0; i < args.length; i++) {
				if (args[i] instanceof Stream) {
					args[i].__listeners.push(this);
					this.__dependencies.push(args[i]);
				}
			}

			if (!this.isEndStream && this.__dependencies.length) {
				let endStreams = [];

				for (let i = 0; i < this.__dependencies.length; i++) {
					endStreams.push(this.__dependencies[i].end);
				}

				this.endsOn(...endStreams);
			}
			
			updateStream(this);
			streamsQueue.update();
		}

		return this;
	}

	subscribe(fn) {
		return Stream.from(fn, this);
	}

	endsOn(...endStreams) {
		if (this.isEndStream) {
			return this;
		}

		let endStream = new Stream({isEndStream: true});

		detachStreamDependencies(this.end);
		endStream.from(null, ...endStreams);
		endStream.__listeners.push(this.end);
		this.end.__dependencies.push(endStream);

		return this;
	}

	get() {
		return this.value;
	}

	push(value) {
		// handle a Promise...
		if (value && value.then && isFunction(value.then)) {
			value.then((result) => {
				this.push(result);
			});

			return this;
		}

		this.value = value;
		this.hasValue = true;

		if (!isInStream(this)) {
			streamsQueue.push(this);

			if (!getInStream()) {
				streamsQueue.update();
			}
		} else {
			for (let i = 0; i < this.__listeners.length; i++) {
				if (this.__listeners[i].end === this) {
					detachStreamDependencies(this.__listeners[i]);
					detachStreamDependencies(this.__listeners[i].end);
				} else {
					this.__listeners[i].__updatedDependencies.push(this);
				}
			}
		}

		return this;
	}

	map(fn) {
		return Stream.from((stream) => {
			stream.push(fn(this.get()));
		}, this);
	}

	ap(stream1) {
		return Stream.from((stream2) => {
			stream2.push(this.get()(stream1.get()));
		}, this, stream1);
	}

	static transduce(xform, sourceStream) {
		var xformResult = xform(new StreamTransformer());

		return Stream.from((stream) => {
			var result = xformResult['@@transducer/step'](undefined, sourceStream.get());

			if (result && result['@@transducer/reduced'] === true) {
				stream.end.push(true);

				return result['@@transducer/value'];
			}

			return result;
		}, sourceStream);
	}

	static isStream(stream) {
		return stream instanceof Stream;
	}

	reduce(fn, acc) {
		var result = acc;
		var newStream = Stream.from(() => {
			result = fn(result, this.get());

			return result;
		}, this);

		if (!newStream.hasValue) {
			newStream.push(acc);
		}

		return newStream;
	}

	static merge(stream1, stream2) {
		return Stream
			.from((stream, changed) => changed[0] ? changed[0].get() : stream1.hasValue ? stream1.get() : stream2.get(), stream1, stream2)
			.immediate()
			.endsOn(stream1.end, stream2.end);
	}

	immediate() {
		if (this.__dependenciesMet === false) {
			this.__dependenciesMet = true;
			updateStream(this);

			streamsQueue.update();
		}

		return this;
	}
}


export default Stream;
