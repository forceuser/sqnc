const UTF16MAX = 65536;

function stringToUTF16Array (val) {
	return val.split("").map(c => c.charCodeAt(0));
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
	const res = [];
	while (val) {
		const p = val % UTF16MAX;
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

function inc (val, count = 1) {
	if (Array.isArray(val)) {
		return decToUTF16Array(utf16ArrayToDec(val) + count);
	}
	else {
		return val + count;
	}
}

class SqncIterator {
	constructor (...args) {
		let options;
		if (typeof args[0] === "object") {
			options = args[0];
		}
		else if (typeof args[0] === "function") {
			options = {fn: args[0], count: args[1]};
		}
		else if (args.length === 1) {
			options = {fill: args[0]};
		}
		else {
			options = {from: args[0], to: args[1], step: args[2], count: args[3]};
		}

		let {fill, from = 0, to, step = 1, count, fn, init} = options;
		let chars = false;
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
			count = Math.ceil(delta(from, to) / Math.abs(step));
		}

		Object.defineProperty(this, "length", {
			get () {
				return count;
			},
		});

		this.count = (val) => {
			count = val;
			return this;
		};

		this.iterator = function* () {
			let idx = 0;
			let val = from;

			if ("fill" in options) {
				while (idx < count) {
					yield fill;
					idx++;
				}
			}
			else if (fn) {
				const data = typeof init === "function" ? init() : {};

				while (idx < count) {
					yield fn(idx, data);
					idx++;
				}
			}
			else {
				while (idx < count) {
					const res = chars ? utf16ArrayToString(val) : val;
					yield res;
					val = inc(val, step);
					idx++;
				}
			}
		};
	}
	*[Symbol.iterator] () {
		yield* this.iterator();
	}
	toArray (count) {
		count = count == null ? this.length : count;
		if (count == null) {
			throw Error("Can't cast to an Array: Infinite iterable");
		}
		return Array.from(this.count(count));
	}
}


/**
 * @name sqnc
 * @function
 * @description Create sequence iterator with set of options
 * @param {SqncOptions} options - sequence options
 * @returns {SqncIterator} iterator
 */
/**
 * @name sqnc
 * @function
 * @description Create sequence iterator with generation function
 * @param {SqncGenFunction} fn - sequence generation function
 * @param {Integer} [count] limit iterations count
 * @returns {SqncIterator} iterator
 */
/**
 * @name sqnc
 * @function
 * @description Create sequence iterator with range of values
 * @param {Numeric|String} from - first value within iteration range
 * @param {Numeric|String} to - last value within iteration range
 * @param {Numeric} [step=1] iteration step
 * @param {Integer} [count] limit iterations count (if {@link to} is undefined)
 * @returns {SqncIterator} iterator
 */
/**
 * @name sqnc
 * @function
 * @description Create iterator that will return only one value specified by fill param
 * @param {Numeric|String} fill - value that will be returned by every step of iterator
 * @returns {SqncIterator} iterator
 */

function sqnc (...args) {
	return new SqncIterator(...args);
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

export default sqnc;

/**
 * @typedef SqncOptions
 * @name SqncOptions
 * @type {Object}
 * @property {SqncGenFunction} fn -
 * @property {SqncGenInitFunction} init -
 * @property {Numeric|String} from -
 * @property {Numeric|String} to -
 * @property {Numeric} step -
 * @property {Integer} count -
 */
