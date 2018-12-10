function isInt (n) {
	return n % 1 === 0;
}

function isFiniteNumber (value) {
	return Number(value) === value && isFinite(value);
}

const UTF16MAX = 65536;

function StringToUTF16Array (val) {
	return val.split("").map(c => c.charCodeAt(0));
}

function UTF16ArrayToString (val) {
	return String.fromCharCode.apply(null, val);
}

function UTF16ArrayToDec (val) {
	let res = 0;
	let n = 0;
	for (let i = val.length - 1; i >= 0; i--) {
		res += val[i] * Math.pow(UTF16MAX, n);
		n++;
	}
	return res;
}

function DecToUTF16Array (val) {
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
		a = StringToUTF16Array(a);
	}
	if (typeof b === "string") {
		b = StringToUTF16Array(b);
	}
	if (Array.isArray(a) && Array.isArray(b)) {
		a = UTF16ArrayToDec(a);
		b = UTF16ArrayToDec(b);
	}
	return Math.abs(a - b) + 1;
}

function compare (a, b) {
	if (Array.isArray(a) && Array.isArray(b)) {
		a = UTF16ArrayToDec(a);
		b = UTF16ArrayToDec(b);
	}
	return a > b ? 1 : a < b ? -1 : 0;
}

function inc (val, count = 1) {
	if (Array.isArray(val)) {
		return DecToUTF16Array(UTF16ArrayToDec(val) + count);
	}
	else {
		return val + count;
	}
}

class SQNCIterable {
	constructor (options) {
		let {fill, from = 0, to, step = 1, count, fn} = options;
		let chars = false;
		if (typeof from === "string") {
			from = StringToUTF16Array(from);
			chars = true;
		}

		if (typeof to === "string") {
			to = StringToUTF16Array(to);
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
		this.iterator = function*(count) {
			let idx = 0;
			let val = from;
			const data = {};
			count = count || this.length;
			while (idx < count) {
				if ("fill" in options) {
					yield fill;
				}
				else if (fn) {
					yield fn(idx, data);
				}
				else {
					const res = chars ? UTF16ArrayToString(val) : val;
					yield res;
					val = inc(val, step);
				}
				idx++;
			}
		};
	}
	*[Symbol.iterator] () {
		yield* this.iterator();
	}
	toArray (count) {
		count = count == null ? this.length : count;
		if (count == null) {
			throw Error("Iterable should be finite to cast to array");
		}
		return Array.from(this.iterator(count));
	}
}

function sqnc (options) {
	return new SQNCIterable(options);
}

sqnc.maxLength = UTF16MAX;
sqnc.utils = {
	inc,
	compare,
	delta,
	isInt,
	isFiniteNumber,
	StringToUTF16Array,
	UTF16ArrayToString,
	DecToUTF16Array,
	UTF16ArrayToDec,
};

export default sqnc;
