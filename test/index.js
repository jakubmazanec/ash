import assert from 'assert';
import ramda from 'ramda';
import transducers from 'transducers.js';
import ash from '../dist';



describe('ash.Stream', () => {
	it('can be set with initial value', () => {
    var num = new ash.Stream({value: 12});

    assert.equal(num.get(), 12);
  });

	it('can be set', () => {
		var stream = new ash.Stream();

		stream.push(23);

		assert.equal(stream.get(), 23);

		stream.push(3);

		assert.equal(stream.get(), 3);
	});

	it('setting a stream returns the stream', () => {
		var stream = new ash.Stream();

		assert.equal(stream, stream.push(23));
	});

	it('updates dependencies', () => {
    var x = ash.Stream.from(3);
    var x2 = ash.Stream.from(() => {
      return x.get() * 2;
    }, x);

    assert.equal(x2.get(), x.get() * 2);
  });

	it('can set result by returning value', () => {
		var stream1 = new ash.Stream();
		var stream2 = new ash.Stream();
		var sumStream = new ash.Stream();

		stream1.push(3);
		stream2.push(4);
		sumStream.from(() => stream1.get() + stream2.get(), stream1, stream2);

		assert.equal(sumStream.get(), stream1.get() + stream2.get());
	});

	it('is updated when dependencies change', () => {
		var stream1 = new ash.Stream();
		var stream2 = new ash.Stream();
		var sumStream = new ash.Stream();

		stream1.push(3);
		stream2.push(4);
		sumStream.from(() => stream1.get() + stream2.get(), stream1, stream2);

		assert.equal(sumStream.get(), stream1.get() + stream2.get()); // -> 7

		stream1.push(12);

		assert.equal(sumStream.get(), stream1.get() + stream2.get()); // -> 16

		stream2.push(8);

		assert.equal(sumStream.get(), stream1.get() + stream2.get()); // -> 20
	});

	it('can set result by calling callback', () => {
		var stream1 = new ash.Stream();
		var stream2 = new ash.Stream();
		var sumStream = new ash.Stream();
		var timesStream = new ash.Stream();
		var times = 0;

		stream1.push(3);
		stream2.push(4);
		sumStream.from((stream) => {
			stream.push(stream1.get() + stream2.get());
		}, stream1, stream2);
		timesStream.from(() => {
			times++;
		}, sumStream);

		assert.equal(sumStream.get(), stream1.get() + stream2.get()); // -> 7

		stream1.push(12);

		assert.equal(sumStream.get(), stream1.get() + stream2.get()); // -> 16

		stream2.push(8);

		assert.equal(sumStream.get(), stream1.get() + stream2.get()); // -> 20
		assert.equal(times, 3);
	});

	it('is not called until dependencies have value', () => {
		var stream1 = new ash.Stream();
		var stream2 = new ash.Stream();
		var sumStream = new ash.Stream();
		var called = 0;

		sumStream.from(() => {
			called++;

			return stream1.get() + stream2.get();
		}, stream1, stream2);

		stream1.push(2);
		stream1.push(1);
		stream2.push(2);
		stream2.push(4);
		stream1.push(2);

		assert.equal(called, 3);
	});
	
	it('streams can lead into other streams', () => {
		var stream1 = new ash.Stream();
		var stream2 = new ash.Stream();
		var sumStream = new ash.Stream();
		var doubleSumStream = new ash.Stream();
		var sumPlusDoubleSumStream = new ash.Stream();

		stream1.push(3);
		stream2.push(4);

		sumStream.from(() => stream1.get() + stream2.get(), stream1, stream2);
		doubleSumStream.from(() => sumStream.get() * 2, sumStream);
		sumPlusDoubleSumStream.from(() => doubleSumStream.get() + sumStream.get(), doubleSumStream, sumStream);

		stream1.push(12);

		assert.equal(sumPlusDoubleSumStream.get(), sumStream.get() * 3);

		stream2.push(3);

		assert.equal(sumPlusDoubleSumStream.get(), sumStream.get() * 3);

		stream1.push(2);

		assert.equal(sumPlusDoubleSumStream.get(), sumStream.get() * 3);
		assert.equal(sumPlusDoubleSumStream.get(), (2 + 3) * 3);
	});

	it('stream dependencies can be changed', () => {
		var result = [];
		var stream1 = new ash.Stream();
		var stream2 = new ash.Stream();
		var stream3 = new ash.Stream();
		var stream4 = new ash.Stream();

		stream3.from(() => stream1.get(), stream1);
		stream4.from(() => {
			result.push(stream3.get());
		}, stream3);

		stream1.push(11);

		stream3.from(() => stream2.get(), stream2);

		stream1.push(12);
		stream2.push(21);

		stream3.from(() => stream1.get(), stream1);

		stream1.push(13);
		stream2.push(22);

		assert.deepEqual(result, [11, 21, 13]);
	});

	it('stream dependencies can be injected later', () => {
		var stream2 = new ash.Stream();
		var stream1 = ash.Stream.from((stream, changed) => {
			
			console.log(changed);

			return changed[0].get() * 2;
		});
		

		stream1.from(stream2);

		stream2.push(1);

		assert.equal(stream1.get(), 2);
	});

	it('can get its own value', () => {
		var num = new ash.Stream({value: 0});
		var sum = new ash.Stream();

		sum.from(() => (sum.get() || 0) + num.get(), num);
		num.push(2).push(3).push(8).push(7);

		assert.equal(sum.get(), 20);
	});

	it('is called with changed streams', () => {
		var s1 = new ash.Stream({value: 0});
		var s2 = new ash.Stream({value: 0});
		var dependend = new ash.Stream();
		var result = [];

		dependend.from((d, changed) => {
			if (changed[0] === s1) {
				result.push(1);
			}

			if (changed[0] === s2) {
				result.push(2);
			}
		}, s1, s2);

		s1.push(1);
		s2.push(1);
		s2.push(1);
		s1.push(1);
		s2.push(1);
		s1.push(1);

		assert.deepEqual(result, [1, 2, 2, 1, 2, 1]);
	});
	
	it('handles dependencies when streams are triggered in streams', () => {
		var x = new ash.Stream({value: 4});
		var y = new ash.Stream({value: 3});
		var z = new ash.Stream({value: 1});
		var doubleX = new ash.Stream();
		var setAndSum = new ash.Stream();

		doubleX.from(() => x.get() * 2, x);
		setAndSum.from(() => {
			x.push(3);

			return z.get() + y.get();
		}, y, z);

		z.push(4);

		assert.equal(setAndSum.get(), 7);
	});

	it('executes to the end before handlers are triggered', () => {
		var order = [];
		var x = new ash.Stream({value: 4});
		var y = new ash.Stream({value: 3});
		var doubleX = new ash.Stream();
		var setAndY = new ash.Stream();

		doubleX.from(function dx() {
			if (x.get() === 3) {
				order.push(2);
			}

			return x.get() * 2;
		}, x);
		setAndY.from(function sy() {
			x.push(3);
			order.push(1);

			return y.get();
		}, y);

		assert.deepEqual(order, [1, 2]);
	});
	
	it('with static deps executes to the end', () => {
		var order = [];
		var x = new ash.Stream({value: 4});
		var y = new ash.Stream({value: 3});
		var doubleX = new ash.Stream();
		var setAndY = new ash.Stream();

		doubleX.from(() => {
			if (x.get() === 3) {
				order.push(2);
			}

			return x.get() * 2;
		}, x);
		setAndY.from(() => {
			x.push(3);
			order.push(1);

			return y.get();
		}, y);

		assert.equal(order[0], 1);
		assert.equal(order[1], 2);
	});

	it('let\'s explicit `undefined` flow down streams', () => {
		var result = [];
		var s1 = new ash.Stream({value: undefined});
		var s2 = s1.map((value) => {
			result.push(value);
		});

		s1.push(2).push(undefined);

		assert.deepEqual(result, [undefined, 2, undefined]);
	});

	it('handles a null floating down the stream', () => {
		var s1 = new ash.Stream();

		s1.push(null);
	});
	
	it('can typecheck', () => {
		var s1 = new ash.Stream();
		var s2 = new ash.Stream({value: null});
		var s3 = new ash.Stream();
		var f = () => {};

		assert(ash.Stream.isStream(s1));
		assert(ash.Stream.isStream(s2));
		assert(ash.Stream.isStream(s3));
		assert(!ash.Stream.isStream(f));
	});
	
	it('has pretty string representation', () => {
		var ns = new ash.Stream({value: 1});
		var ss = new ash.Stream({value: 'hello'});
		var os = new ash.Stream({value: {}});

		assert.deepEqual('' + ns, 'stream(1)');
		assert.deepEqual('' + ss, 'stream(hello)');
		assert.deepEqual('' + os, 'stream([object Object])');
	});

	it('can filter values', () => {
		var result = [];
		var n = new ash.Stream({value: 0});
		var lrg5 = new ash.Stream();

		lrg5.from(() => {
			if (n.get() > 5) {
				return n.get();
			}
		}, n);

		lrg5.map((value) => {
			result.push(value);
		});

		n.push(4).push(6).push(2).push(8).push(3).push(4);

		assert.deepEqual(result, [6, 8]);
	});

	describe('from static method', () => {
		it('handles an array', () => {
			var result = [];
			var stream = ash.Stream.from([1]);
			
			ash.Stream.from(() => {
				result.push(stream.get());
			}, stream);
			stream.from([2, undefined, 'foo']);

			assert.deepEqual(result, [1, 2, undefined, 'foo']);
		});
	});

	describe('ending a stream', () => {
		it('works for streams without dependencies', () => {
			var s = new ash.Stream({value: 1});

			s.end.push(true);

			assert(s.end.get());
			assert(s.end.get());
		});

		it('detaches it from dependencies', () => {
			var x = new ash.Stream({value: 3});
			var y = new ash.Stream({value: 2});
			var sum = new ash.Stream();

			sum.from(() => y.get() * x.get(), y, x);

			assert.equal(y.__listeners.length, 1);
			assert.equal(x.__listeners.length, 1);

			sum.end.push(true);

			assert.equal(y.__listeners.length, 0);
			assert.equal(x.__listeners.length, 0);
			assert(sum.end.get());
		});

		it('ends its dependents', () => {
			var x = new ash.Stream({value: 3});
			var y = new ash.Stream();
			var z = new ash.Stream();

			y.from(() => 2 * x.get(), x);
			z.from(() => 2 * y.get(), y);

			assert.equal(z.get(), x.get() * 2 * 2);

			x.end.push(true);

			assert(x.end.get());
			assert.equal(x.__listeners.length, 0);
			assert(y.end.get());
			assert.equal(y.__listeners.length, 0);
			assert(z.end.get());
		});

		it('updates children if stream ends after recieving value', () => {
			var x = new ash.Stream({value: 3});
			var whenX2 = new ash.Stream();
			var y = new ash.Stream();
			var z = new ash.Stream();

			whenX2.from(() => {
				if (x.get() === 0) {
					return true;
				}
			}, x);
			y.from(() => x.get(), x);
			y.endsOn(whenX2);
			z.from(() => y.get(), y);

			assert.equal(y.get(), z.get());

			x.push(2);

			assert.equal(y.get(), z.get());
			assert(!y.end.get());
			assert(!z.end.get());

			x.push(0);

			assert.equal(x.__listeners.length, 1);
			assert(y.end.get());
			assert.equal(y.__listeners.length, 0);
			assert(z.end.get());
			assert.equal(2, y.get());
			assert.equal(2, z.get());
		});
		
		it('works if end stream has initial value', () => {
			var killer = new ash.Stream({value: true});
			var x = new ash.Stream({value: 1});
			var y = new ash.Stream();

			y.from(() => 2 * x.get(), x);
			y.endsOn(killer);
			x.push(2);

			assert.equal(undefined, y.end.get());
			assert.equal(2 * x.get(), y.get());
		});

		it('end stream does not have value even if base stream has initial value', () => {
			var killer = new ash.Stream({value: true});
			var x = new ash.Stream({value: 1});
			var y = new ash.Stream();

			y.from(() => 2 * x.get(), x);
			y.endsOn(killer);

			assert.equal(false, y.end.hasValue);
		});

		it('ends stream can be changed without affecting listeners', () => {
			var killer1 = new ash.Stream();
			var killer2 = new ash.Stream();
			var ended = false;
			var x = new ash.Stream({value: 1});
			var y = new ash.Stream();

			y.from(() => 2 * x.get(), x);
			y.endsOn(killer1);
			y.end.map(() => {
				ended = true;
			});
			y.endsOn(killer2);
			killer2.push(true);

			assert(ended);
		});

		it('end stream can be set on top level stream', () => {
      var killer = new ash.Stream();
      var s = new ash.Stream({value: 1});

      s.endsOn(killer);

      assert.notEqual(s.end.get(), true);
      
      killer.push(true);

      assert.equal(s.end.get(), true);
    });
	});

	describe('promise integration', () => {
		it('pushes result of promise down the stream', (done) => {
			var s = new ash.Stream();
			var result = new ash.Stream();

			result.from(() => {
				assert.equal(s.get(), 12);
				done();
			}, s);

			s.push(Promise.resolve(12));
		});

		it('recursively unpacks promise', (done) => {
			var s = new ash.Stream();
			var result = new ash.Stream();

			result.from(() => {
				assert.equal(s.get(), 12);
				done();
			}, s);

			s.push(new Promise((resolve1/*, reject*/) => {
				setTimeout(() => {
					resolve1(new Promise((resolve2/*, reject*/) => {
						setTimeout(resolve2.bind(null, 12));
					}));
				}, 20);
			}));
		});
	});

	describe('map', () => {
		it('maps a function', () => {
			var x = new ash.Stream({value: 3});
			var doubleX = x.map((v) => 2 * v);

			assert.equal(doubleX.get(), 6);
			
			x.push(1);

			assert.equal(doubleX.get(), 2);
		});

		it('maps a function', () => {
			var x = new ash.Stream({value: 3});
			var doubleX = x.map((v) => 2 * v);

			assert.equal(doubleX.get(), 6);
			
			x.push(1);

			assert.equal(doubleX.get(), 2);
		});

		it('handles function returning undefined', () => {
			var x = new ash.Stream({value: 1});
			var maybeDoubleX = x.map((v) => v > 3 ? 2 * v : undefined);

			assert.equal(undefined, maybeDoubleX.get());
			assert.equal(true, maybeDoubleX.hasValue);
			
			x.push(4);

			assert.equal(8, maybeDoubleX.get());
		});

		/*it('is curried', () => {
			var x = stream(3);
			var doubler = flyd.map(function(x) { return 2*x; });
			var quadroX = doubler(doubler(x));
			assert.equal(quadroX(), 12);
			x(2);
			assert.equal(quadroX(), 8);
		});*/

		it('returns equivalent stream when mapping identity', () => {
			var x = new ash.Stream({value: 3});
			var x2 = x.map((a) => a);

			assert.equal(x2.get(), x.get());
			
			x.push('foo');

			assert.equal(x2.get(), x.get());
		});

		it('is compositive', () => {
			var f = (v) => v * 2;
			var g = (v) => v + 4;
			var x = new ash.Stream({value: 3});
			var s1 = x.map(g).map(f);
			var s2 = x.map((v) => f(g(v)));

			assert.equal(s1.get(), s2.get());
			
			x.push(12);

			assert.equal(s1.get(), s2.get());
		});
	});
	describe('reduce', () => {
		it('has initial acc as value when stream is undefined', () => {
			var numbers = new ash.Stream();
			var sum = numbers.reduce((s, n) => s + n, 0);

			assert.equal(sum.get(), 0);
		});

		it('can sum streams of integers', () => {
			var numbers = new ash.Stream();
			var sum = numbers.reduce((s, n) => s + n, 0);

			numbers.push(3).push(2).push(4).push(10);

			assert.equal(sum.get(), 19);
		});

		/*it('is curried', () => {
			var numbers = stream();
			var sumStream = flyd.reduce(function(sum, n) {
				return sum + n;
			}, 0);
			var sum = sumStream(numbers);
			numbers(3)(2)(4)(10);
			assert.equal(sum(), 19);
		});*/
	});
	describe('merge', () => {
		it('can sum streams of integers', () => {
			var result = [];
			var s1 = new ash.Stream();
			var s2 = new ash.Stream();
			var merged = ash.Stream.merge(s1, s2);
			var s3 = new ash.Stream();

			s3.from(() => result.push(merged.get()), merged);

			s1.push(12).push(2);
			s2.push(4).push(44);
			s1.push(1);
			s2.push(12).push(2);

			assert.deepEqual(result, [12, 2, 4, 44, 1, 12, 2]);
		});

		/*it('is curried', function() {
			var result = [];
			var s1 = stream();
			var mergeWithS1 = flyd.merge(s1);
			var s2 = stream();
			s1and2 = mergeWithS1(s2);
			flyd.map(function(v) { result.push(v); }, s1and2);
			s1(12)(2); s2(4)(44); s1(1); s2(12)(2);
			assert.deepEqual(result, [12, 2, 4, 44, 1, 12, 2]);
		});*/

		it('ends only when both merged streams have ended', () => {
			var result = [];
			var s1 = new ash.Stream();
			var s2 = new ash.Stream();
			var s1and2 = ash.Stream.merge(s1, s2);
			var s3 = s1and2.map((v) => {
				result.push(v);
			});

			s1.push(12).push(2);
			s2.push(4).push(44);
			s1.push(1);

			s1.end.push(true);

			assert(!s1and2.end.get());

			s2.push(12).push(2);
			s2.end.push(true);

			assert(s1and2.end.get());

			assert.deepEqual(result, [12, 2, 4, 44, 1, 12, 2]);
		});
	});

	describe('ap', () => {
		it('applies functions in stream', () => {
			var a = new ash.Stream({value: (x) => 2 * x});
			var v = new ash.Stream({value: 3});
			var s = a.ap(v);

			assert.equal(s.get(), 6);
			
			a.push((x) => x / 3);
			
			assert.equal(s.get(), 1);
			
			v.push(9);
			
			assert.equal(s.get(), 3);
		});
		
		it('is compositive', () => {
			var a = new ash.Stream({value: (x) => x * 2});
			var u = new ash.Stream({value: (x) => x + 5});
			var v = new ash.Stream({value: 8});
			var s1 = a.map((f) => (g) => (x) => f(g(x))).ap(u).ap(v);
			var s2 = a.ap(u.ap(v));

			assert.equal(s1.get(), 26);
			assert.equal(s2.get(), 26);

			a.push((x) => x * 4);

			assert.equal(s1.get(), 52);
			assert.equal(s2.get(), 52);

			u.push((x) => x / 8);

			assert.equal(s1.get(), 4);
			assert.equal(s2.get(), 4);

			v.push(24);

			assert.equal(s1.get(), 12);
			assert.equal(s2.get(), 12);
		});

		it('supports neat ap pattern', () => {
			var result = [];
			var sumThree = ramda.curryN(3, (x, y, z) => x + y + z);
			var s1 = new ash.Stream({value: 0});
			var s2 = new ash.Stream({value: 0});
			var s3 = new ash.Stream({value: 0});
			var sum = s1.map(sumThree).ap(s2).ap(s3);
			var s4 = sum.map((v) => {
				result.push(v);
			});

			s1.push(3);
			s2.push(2);
			s3.push(5);

			assert.deepEqual(result, [0, 3, 5, 10]);
		});
		
		it('applies functions if streams have no initial value', () => {
			var result = [];
			var add = ramda.curryN(2, (x, y) => x + y);
			var numbers1 = new ash.Stream();
			var numbers2 = new ash.Stream();
			var addToNumbers1 = numbers1.map(add);
			var added = addToNumbers1.ap(numbers2);
			var s = added.map((n) => {
				result.push(n);
			});

			numbers1.push(3);
			numbers2.push(2);
			numbers1.push(4);

			assert.deepEqual(result, [5, 6]);
		});
	});

	/*describe('of', function() {
		it('returns a stream with the passed value', function() {
			var s1 = stream(2);
			var s2 = s1.of(3);
			assert.equal(s2(), 3);
		});

		it('has identity', function() {
			var a = stream();
			var id = function(a) { return a; };
			var v = stream(12);
			assert.equal(a.of(id).ap(v)(), v());
		});

		it('is homomorphic', function() {
			var a = stream(0);
			var f = function(x) { return 2*x; };
			var x = 12;
			assert.equal(a.of(f).ap(a.of(x))(), a.of(f(x))());
		});

		it('is interchangeable', function() {
			var y = 7;
			var a = stream();
			var u = stream()(function(x) { return 3*x; });
			assert.equal(u.ap(a.of(y))(), a.of(function(f) { return f(y); }).ap(u)());
		});
	});*/

	describe('transducer.js transducer support', () => {
		it('creates new stream with map applied', () => {
			var result = [];
			var s1 = new ash.Stream();
			var tx = transducers.map(function (x) { return x * 3; });
			var s2 = ash.Stream.transduce(tx, s1);
			var r = new ash.Stream();

			r.from(function () { result.push(s2.get()); }, s2);

			s1.push(1).push(2).push(4).push(6);

			assert.deepEqual(result, [3, 6, 12, 18]);
		});

		it('creates new stream with filter applied', () => {
			var result = [];
			var s1 = new ash.Stream();
			var tx = transducers.compose(
				transducers.map(function (x) { return x * 3; }),
				transducers.filter(function (x) { return x % 2 === 0; })
			);
			var s2 = ash.Stream.transduce(tx, s1);
			var r = new ash.Stream();

			r.from(function () { result.push(s2.get()); }, s2);
			s1.push(1).push(2).push(3).push(4);

			assert.deepEqual(result, [6, 12]);
		});

		it('supports dedupe', () => {
			var result = [];
			var s1 = new ash.Stream();
			var tx = transducers.compose(
				transducers.map(function (x) { return x * 2; }),
				transducers.dedupe()
			);
			var s2 = ash.Stream.transduce(tx, s1);
			var r = new ash.Stream();

			r.from(function () { result.push(s2.get()); }, s2);
			s1.push(1).push(1).push(2).push(3).push(3).push(3).push(4);

			assert.deepEqual(result, [2, 4, 6, 8]);
		});

		it('handles reduced stream and ends', () => {
			var result = [];
			var s1 = new ash.Stream();
			var tx = transducers.compose(
				transducers.map(function (x) { return x * 2; }),
				transducers.take(3)
			);
			var s2 = ash.Stream.transduce(tx, s1);
			var r = new ash.Stream();

			r.from(function () { result.push(s2.get()); }, s2);
			s1.push(1).push(2);

			assert.notEqual(true, s2.end.get());

			s1.push(3);

			assert.equal(true, s2.end.get());

			s1.push(4);

			assert.deepEqual(result, [2, 4, 6]);
		});
	});

	describe('Ramda transducer support', () => {
		it('creates new stream with map applied', () => {
			var result = [];
			var s1 = new ash.Stream();
			var tx = ramda.map(function (x) { return x * 3; });
			var s2 = ash.Stream.transduce(tx, s1);
			var r = new ash.Stream();

			r.from(function () { result.push(s2.get()); }, s2);
			s1.push(1).push(2).push(4).push(6);
			assert.deepEqual(result, [3, 6, 12, 18]);
		});

		it('creates new stream with filter applied', () => {
			var result = [];
			var s1 = new ash.Stream();
			var tx = ramda.pipe(
				ramda.map(function (x) { return x * 3; }),
				ramda.filter(function (x) { return x % 2 === 0; })
			);
			var s2 = ash.Stream.transduce(tx, s1);
			var r = new ash.Stream();

			r.from(function () { result.push(s2.get()); }, s2);
			s1.push(1).push(2).push(3).push(4);

			assert.deepEqual(result, [6, 12]);
		});

		it('filters empty elements', () => {
			var result = [];
			var s1 = new ash.Stream();
			var s2 = ash.Stream.transduce(ramda.reject(ramda.isEmpty), s1);

			s2.map(function (v) { result.push(v); });
			s1.push('foo').push('').push('bar').push('').push('').push('!');

			assert.deepEqual(result, ['foo', 'bar', '!']);
		});

		it('supports dedupe', () => {
			var result = [];
			var s1 = new ash.Stream();
			var tx = ramda.compose(
				ramda.map(ramda.multiply(2)),
				ramda.dropRepeats()
			);
			var s2 = ash.Stream.transduce(tx, s1);
			var r = new ash.Stream();

			r.from(function () { result.push(s2.get()); }, s2);
			s1.push(1).push(1).push(2).push(3).push(3).push(3).push(4);

			assert.deepEqual(result, [2, 4, 6, 8]);
		});
	});

	describe('atomic updates', () => {
		it('does atomic updates', () => {
			var result = [];
			var a = new ash.Stream({value: 1});
			var b = new ash.Stream();
			var c = new ash.Stream();
			var d = new ash.Stream();

			b.from(() => a.get() * 2, a);
			c.from(() => a.get() + 4, a);
			d.from(() => {
				result.push(b.get() + c.get());
			}, b, c);

			a.push(2);

			assert.deepEqual(result, [7, 10]);
		});

		it('does not glitch', () => {
			var result = [];
			var s1 = new ash.Stream({value: 1});
			var s1x2 = s1.map((n) => n * 2);
			var s2 = new ash.Stream();
			var s1x4 = new ash.Stream();

			s2.from(() => s1.get() + s1x2.get(), s1, s1x2);
			s1x4.from(() => s1.get() + s2.get(), s1, s2);

			let res = s1x4.map((n) => {
				result.push(n);
			});

			s1.push(2).push(3).push(4);
			
			assert.deepEqual(result, [4, 8, 12, 16]);
		});

		it('handles complex dependency graph', () => {
			var result = [];
			var a = new ash.Stream();
			var b = new ash.Stream();
			var c = new ash.Stream();
			var d = new ash.Stream();
			var e = new ash.Stream();


			b.from(function bs() { return a.get() + 1; }, a);
			c.from(function cs() { return a.get() + 2; }, a);
			d.from(function ds() { return c.get() + 3; }, c);
			e.from(function res() {
				return b.get() + d.get();
			}, b, d);

			e.map(function (v) { result.push(v); }, e);
			a.push(1).push(5).push(11);

			assert.deepEqual(result, [8, 16, 28]);
		});

		it('handles another complex dependency graph', () => {
			var result = [];
			var a = new ash.Stream();
			var b = new ash.Stream();
			var c = new ash.Stream();
			var d = new ash.Stream();
			var e = new ash.Stream();

			b.from(function () { return a.get() + 1; }, a);
			c.from(function () { return a.get() + 2; }, a);
			d.from(function () { return a.get() + 4; }, a);
			e.from(function () { return b.get() + c.get() + d.get(); }, b, c, d);
			e.map(function (v) { result.push(v); });

			a.push(1).push(2).push(3);

			assert.deepEqual(result, [10, 13, 16]);
		});

		it('is called with all changed dependencies', () => {
			var result = [];
			var a = new ash.Stream({value: 0});
			var b = new ash.Stream();
			var c = new ash.Stream();
			var d = new ash.Stream({value: 0});
			var e = new ash.Stream();
			var f = new ash.Stream();
			var g = new ash.Stream();
			var h = new ash.Stream();

			b.from(function () { return a.get() + 1; }, a);
			c.from(function () { return a.get() + 2; }, a);
			e.from(function () { return d.get() + 4; }, d);
			f.from(function () { return d.get() + 5; }, d);
			g.from(function () { return d.get() + 6; }, d);
			h.from(function (self, changed) {
				var vals = changed.map(function (s) { return s.get(); });
				
				result.push(vals);
				
				return 1;
			}, a, b, c, d, e, f, g);

			a.push(1); d.push(2); a.push(3);

			assert.deepEqual(result, [
				[], [1, 3, 2], [2, 8, 7, 6], [3, 5, 4]
			]);
		});
	});
});
