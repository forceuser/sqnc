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

function getCount (a, b) {
	if (Array.isArray(a) && Array.isArray(b)) {
		a = UTF16ArrayToDec(a);
		b = UTF16ArrayToDec(b);
	}
	return Math.abs(a - b);
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

function sqnc (from, to, step = 1, count) {
	const result = [];

	if (typeof from === "function" && isFinite(to)) {
		let val = 0;
		for (let n = 0; n < to; n++) {
			val = from(n, val, result);
			result.push(val);
		}
		return result;
	}

	if (to != null && count != null) {
		count = null;
		console.warn(`"count" argument is ignored when "to" argument is specified`);
	}

	const countMode = count != null;
	if (countMode || (from != null && to != null && step != null)) {
		let chars = false;
		const initial = from;

		if (typeof from === "string") {
			from = StringToUTF16Array(from);
			chars = true;
			if (step && typeof step !== "function" && !isInt(step)) {
				throw new Error("Step should be integer when characters are used");
			}
		}

		if (countMode) {
			if (count === 0) {
				throw new Error("count can't be zero!");
			}
			if (count > sqnc.maxLength) {
				throw new Error(`length of the generated squence cant't be bigger then ${sqnc.maxLength} (you can change it: sqnc.maxLength = <max seqence length>)`);
			}

			if (!isFiniteNumber(count)) {
				throw new Error("count should be a number!");
			}

			count = Math.abs(count);

			let c = count;
			let val = from;

			if (!step) {
				while (c) {
					result.push(initial);
					c--;
				}
			}
			else {
				if (!chars && !isFiniteNumber(from)) {
					throw new Error("\"from\" argument should be number or character when \"step\" and \"count\" specified!");
				}

				let n = 0;
				while (c) {
					n++;
					result.push(chars ? UTF16ArrayToString(val) : val);
					val = inc(val, typeof step === "function" ? step(n, val) : step);
					c--;
				}
			}
		}
		else {
			if (typeof to === "string") {
				to = StringToUTF16Array(to);
				chars = true;
			}

			if (
				(!Array.isArray(from) && !isFiniteNumber(from)) ||
				(!Array.isArray(to) && !isFiniteNumber(to)) ||
				(!isFiniteNumber(step) && typeof step !== "function")
			) {
				throw new Error("arguments should be finite!");
			}

			if (getCount(from, to) > sqnc.maxLength) {
				throw new Error(`length of the generated squence cant't be bigger then ${sqnc.maxLength} (you can change it: sqnc.maxLength = <max seqence length>)`);
			}

			if (typeof step !== "function") {
				step = Math.abs(step);
				if (step === 0) {
					throw new Error("\"step\" argument can't be zero!");
				}
			}

			let dir = 1;
			let check;
			if (compare(from, to) > 0) {
				dir = -1;
				check = a => compare(a, to) >= 0;
			}
			else {
				check = a => compare(a, to) <= 0;
			}
			let n = 0;
			let val = from;
			while (check(val)) {
				n++;
				result.push(chars ? UTF16ArrayToString(val) : val);
				val = inc(val, dir * (typeof step === "function" ? step(n, val, result) : step));
			}
		}
	}
	return result;
}
sqnc.maxLength = UTF16MAX;
sqnc.utils = {
	inc,
	compare,
	isInt,
	isFiniteNumber,
	StringToUTF16Array,
	UTF16ArrayToString,
	DecToUTF16Array,
	UTF16ArrayToDec
};

export default sqnc;
