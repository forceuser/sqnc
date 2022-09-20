/* global process */
const UTF16MAX = 65536;

let iteratorSupport = typeof Symbol === "function" && "iterator" in Symbol;
let asyncIteratorSupport = typeof Symbol === "function" && "asyncIterator" in Symbol;

function stringToUTF16Array (val) {
	return val.split("").map((c) => {
		return c.charCodeAt(0);
	});
}

function utf16ArrayToString (val) {
	return String.fromCharCode.apply(null, val);
}

function utf16ArrayToDec (val) {
	let res = 0;
	let n = 0;
	for (let i = val.length - 1; i >= 0; i--) {
		res += val[i] * Math.pow(UTF16MAX, n);
		n++;
	}
	return res;
}

function decToUTF16Array (val) {
	let res = [];
	let p;
	while (val) {
		p = val % UTF16MAX;
		res.unshift(p);
		val = Math.floor(val / UTF16MAX);
	}
	return res;
}

function delta (a, b) {
	if (typeof a === "string") {
		a = stringToUTF16Array(a);
	}
	if (typeof b === "string") {
		b = stringToUTF16Array(b);
	}
	if (Array.isArray(a) && Array.isArray(b)) {
		a = utf16ArrayToDec(a);
		b = utf16ArrayToDec(b);
	}
	return Math.abs(a - b) + 1;
}

function compare (a, b) {
	if (Array.isArray(a) && Array.isArray(b)) {
		a = utf16ArrayToDec(a);
		b = utf16ArrayToDec(b);
	}
	return a > b ? 1 : a < b ? -1 : 0;
}

function inc (val, count) {
	count = count == null ? 1 : count;
	if (Array.isArray(val)) {
		return decToUTF16Array(utf16ArrayToDec(val) + count);
	}
	else {
		return val + count;
	}
}

function iterableToArray (iterable) {
	let result = [];
	let state = iterable.next();
	while (!state.done) {
		result.push(state.value);
		state = iterable.next();
	}
	return result;
}

function SqncIterator (arg0, arg1, arg2, arg3) {
	let iterator = this;

	if (iteratorSupport) {
		iterator[Symbol.iterator] = function () {
			return iterator;
		};
	}

	if (asyncIteratorSupport) {
		iterator[Symbol.asyncIterator] = function () {
			return {
				next: iterator.nextAsync,
			};
		};
	}

	let options;
	if (typeof arg0 === "object" && arg0 != null) {
		options = arg0;
	}
	else if (typeof arg0 === "function") {
		options = {fn: arg0, count: arg1};
	}
	else if (arg1 == null && arg2 == null && arg3 == null) {
		options = {fill: arg0};
	}
	else {
		options = {from: arg0, to: arg1, step: arg2, count: arg3};
	}

	let from = options.from == null ? 0 : options.from;
	let to = options.to;
	let step = options.step == null ? 1 : options.step;
	let count = options.count;
	let fn = options.fn;
	let init = options.init;

	let chars = options.chars || false;

	if (typeof from === "string") {
		from = stringToUTF16Array(from);
		chars = true;
	}
	if (typeof to === "string") {
		to = stringToUTF16Array(to);
		chars = true;
	}
	if (from != null && to != null && step) {
		step = (compare(from, to) > 0 ? -1 : 1) * Math.abs(step);
		count = count == null ? Math.ceil(delta(from, to) / Math.abs(step)) : count;
	}

	Object.defineProperty(iterator, "length", {
		get () {
			return count;
		},
	});

	function cloneOptions () {
		let opt = {
			from,
			to,
			step,
			count,
			fn,
			init,
			chars,
		};
		if ("fill" in options) {
			opt.fill = options.fill;
		}
		return opt;
	}

	let idx = 0;
	let val = from;
	let state = {};
	let nextIteration;

	if ("fill" in options) {
		nextIteration = function () {
			state = {done: false, value: options.fill};
		};
	}
	else if (typeof fn === "function") {
		let fnState;
		let endCallback = function () {
			state = {done: true};
		};
		nextIteration = function (isAsync) {
			state = {done: false};
			if (idx === 0) {
				fnState = typeof init === "function" ? init() : {};
			}
			let value = fn(idx, fnState, endCallback);
			if (isAsync) {
				return Promise.resolve(value).then((value) => {
					state.value = value;
					return state;
				});
			}
			state.value = value;
		};
	}
	else {
		nextIteration = function () {
			state = {done: false, value: chars ? utf16ArrayToString(val) : val};
			val = inc(val, step);
		};
	}

	iterator.instance = function (count) {
		let options = cloneOptions();
		if (count != null) {
			options.count = count;
		}
		return new iterator.constructor(options);
	};

	iterator.nextAsync = function () {
		return Promise.resolve(nextIteration(true)).then((state) => {
			if (!state.done) {
				if (count == null || idx < count) {
					idx++;
				}
				else {
					state = {done: true};
				}
			}
			return state;
		});
	};

	iterator.next = function () {
		if (!state.done) {
			if (count == null || idx < count) {
				nextIteration();
				idx++;
			}
			else {
				state = {done: true};
			}
		}
		return state;
	};

	return iterator;
}

SqncIterator.prototype.toArray = function (count) {
	count = count == null ? this.length : count;
	if (count == null) {
		throw Error("Can't cast to an Array: Infinite iterable");
	}
	if (typeof Array.from === "function" && iteratorSupport) {
		let iter = this.instance(count);
		return Array.from(iter);
	}
	return iterableToArray(this.instance(count));
};


/**
 * @function
 * @name sqnc
 * @description Create sequence iterator with set of options
 * @param {SqncOptions} options - sequence options
 * @returns {SqncIterator} iterator
 */
/**
 * @function
 * @name sqnc
 * @description Create {@link SqncIterator} that will return only one value for each iteration specified by {@link fill} param
 * @param {number|string} fill - value that will be returned by every iteration of iterator
 * @returns {SqncIterator} iterator
 */
/**
 * @function
 * @name sqnc
 * @description Create sequence iterator with generation function
 * @param {SqncGenFunction} fn - sequence generation function
 * @param {number} [count] - limit iterations count
 * @returns {SqncIterator} iterator
 */
/**
 * @function
 * @name sqnc
 * @description Create sequence iterator with range of values
 * @param {(number|string)} from - first value within iteration range
 * @param {(number|string)} to - value to limit iteration range
 * @param {number} [step=1] - step within iteration range
 * @param {number} [count] - limit iterations count
 * @returns {SqncIterator} iterator
 */
function sqnc (arg0, arg1, arg2, arg3) {
	return new SqncIterator(arg0, arg1, arg2, arg3);
}

sqnc.maxLength = UTF16MAX;
sqnc.utils = {
	inc,
	compare,
	delta,
	stringToUTF16Array,
	utf16ArrayToString,
	decToUTF16Array,
	utf16ArrayToDec,
};

/* istanbul ignore next */
if (typeof process !== "undefined" && process.env.NODE_ENV === "test") {
	sqnc.setIteratorSupport = function (val) {
		if (val == null) {
			iteratorSupport = typeof Symbol === "function" && "iterator" in Symbol;
		}
		else {
			iteratorSupport = val;
		}
	};

	sqnc.setAsyncIteratorSupport = function (val) {
		if (val == null) {
			asyncIteratorSupport = typeof Symbol === "function" && "asyncIterator" in Symbol;
		}
		else {
			asyncIteratorSupport = val;
		}
	};
}

export default sqnc;


/**
 * @typedef
 * @type {Object}
 * @name SqncIterator
 * @description Iterator created by {@link sqnc} function
 */

/**
 * @method
 * @name SqncIterator#next
 * @description Do increment and return next state of iterator
 * @returns {IteratorState}
 */

/**
 * @method
 * @name SqncIterator#instance
 * @description Create {@link SqncIterator} with the same {@link SqncOptions} as `source`
 * @param {number} [count] Limit count of iterations in constructed instance
 * @returns {SqncIterator}
 */

/**
 * @method
 * @name SqncIterator#toArray
 * @description convert sequence to {@link Array}
 * @param {number} [count] Limit count of iterations in constructed array
 * @returns {Array.<*>}
 */


/**
 * @typedef
 * @type {Object}
 * @name IteratorState
 * @description Object that describes current iterator state, check out {@link https://developer.mozilla.org/docs/Web/JavaScript/Reference/Iteration_protocols|Iterable protocol}
 * @property {boolean} done - is `true` if iterator is past the end of the iterated sequence.
 * @property {*} value - value returned by iterator for the current step
 */

/**
 * @typedef
 * @type {Object}
 * @name SqncOptions
 * @description Options to instantiate sequence interator, one of its groups of params will be used,
 * by priority:
 * - {@link fill} - value to fill the sequence
 * - {@link fn}, {@link init} - function that generates sequence
 * - {@link from}, {@link to}, {@link step} - range in which seqence is generated
 * @property {*} fill -
 * @property {(number|string)} from - first value within iteration range
 * @property {(number|string)} [to] - value to limit iteration range
 * @property {number} [step=1] - step within iteration range
 * @property {SqncGenFunction} fn - function that generates sequence
 * @property {SqncGenInitFunction} init - function that will be called before first call of {@link fn} to initialize state object that will be shared between iterations
 * @property {number} count - limit iterations count
 */

/**
 * @callback
 * @name SqncGenFunction
 * @description callback function that will be invoked for each iteration
 * @param {number} idx - index of current iteration
 * @param {Object} state - object to store state between iterations
 * @param {function} end - should be called to end sequence before {@link idx} reaches the limit
 * @returns {*} value of current iteration
 */


/**
 * @callback
 * @name SqncGenInitFunction
 * @description initializes state object that will be shared between iterations
 * @returns {Object} object to store state between iterations
 */
