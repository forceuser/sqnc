import test from "tape";
import sinon from "sinon";
import sqnc from "../src/sqnc.js";

test(`Straight numeric sequence (from: 1, to: 10)`, t => {
	t.deepEqual(sqnc({from: 1, to: 10}).toArray(), [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
	t.end();
});

test(`Reverse numeric sequence (from: 10, to: 1)`, t => {
	t.deepEqual(sqnc({from: 10, to: 1}).toArray(), [10, 9, 8, 7, 6, 5, 4, 3, 2, 1]);
	t.end();
});

test(`Straight char sequence (from: "A", to: "D")`, t => {
	t.deepEqual(sqnc({from: "A", to: "D"}).toArray(), ["A", "B", "C", "D"]);
	t.end();
});

test(`Reverse char sequence (from: "D", to: "A")`, t => {
	t.deepEqual(sqnc({from: "D", to: "A"}).toArray(), ["D", "C", "B", "A"]);
	t.end();
});

test(`Straight utf16 sequence (from: "👰", to: "👶")`, t => {
	t.deepEqual(sqnc({from: "👰", to: "👶"}).toArray(), ["👰", "👱", "👲", "👳", "👴", "👵", "👶"]);
	t.deepEqual(sqnc({from: "\u2648"}).toArray(12), ["♈", "♉", "♊", "♋", "♌", "♍", "♎", "♏", "♐", "♑", "♒", "♓"]);
	t.end();
});

test(`Reverse utf16 sequence (from: "👶", to: "👰")`, t => {
	t.deepEqual(sqnc({from: "👶", to: "👰"}).toArray(), ["👶", "👵", "👴", "👳", "👲", "👱", "👰"]);
	t.deepEqual(sqnc({from: "👶", to: "👶"}).toArray(), ["👶"]);
	t.end();
});

test(`fill with "👶"`, t => {
	t.deepEqual(sqnc("👶").toArray(5), ["👶", "👶", "👶", "👶", "👶"]);
	t.end();
});


test(`Custom step`, t => {
	t.deepEqual(sqnc("👶", null, 2).toArray(5), ["👶", "👸", "👺", "👼", "👾"]);
	t.deepEqual(sqnc({from: "👶", step: 2, count: 5}).toArray(), ["👶", "👸", "👺", "👼", "👾"]);
	t.deepEqual(sqnc({from: "👶", step: -2, count: 5}).toArray(), ["👶", "👴", "👲", "👰", "👮"]);
	t.deepEqual(sqnc({from: "👰", to: "👶", step: 2}).toArray(), ["👰", "👲", "👴", "👶"]);
	// t.deepEqual(sqnc({from: "👰", to: "👶", step: -2}).toArray(), sqnc({from: "👰", to: "👶", step: 2}).toArray());
	t.end();
});

test(`Placeholder with count`, t => {
	t.deepEqual(sqnc("👶").toArray(5), ["👶", "👶", "👶", "👶", "👶"]);
	t.deepEqual(sqnc({fill: "👶", count: 5}).toArray(), ["👶", "👶", "👶", "👶", "👶"]);
	t.deepEqual(sqnc({from: 1, step: 1, count: 3}).toArray(), [1, 2, 3]);
	t.throws(() => sqnc("a").toArray());
	t.end();
});

test(`Use as iterator`, t => {
	t.deepEqual([...sqnc({from: 1, to: 5})], [1, 2, 3, 4, 5]);
	t.deepEqual([...sqnc(idx => idx + 1, 5)], [1, 2, 3, 4, 5]);
	t.end();
});

test(`Async iterator and for-await-of loop`, async t => {
	t.timeoutAfter(3000);
	const timeout = (cb, time) => new Promise(resolve => setTimeout(() => resolve(cb()), time));
	const iter = sqnc(async (idx) => timeout(() => `--${idx}`, 100), 3);

	let result = "";
	for await (const val of iter) {
		result += val;
	}
	t.equal(result, "--0--1--2");
	t.end();
});

test(`Async iterator and for-await-of loop 2`, async t => {
	t.timeoutAfter(3000);
	const timeout = (cb, time) => new Promise(resolve => setTimeout(() => resolve(cb()), time));
	const iter = sqnc(async (idx, state, done) => {
		if (idx === 4) {
			return timeout(() => {
				done();
				return "--end";
			}, 100);
		}
		else {
			return timeout(() => `--${idx}`, 100);
		}
	});

	let result = "";
	for await (const val of iter) {
		result += val;
	}
	t.equal(result, "--0--1--2--3");
	t.end();
});

test(`Use as infinite iterator`, t => {
	t.deepEqual([...sqnc({fn: idx => idx + 1}).instance(5)], [1, 2, 3, 4, 5]);
	t.deepEqual([...sqnc({fn: idx => idx + 1}).toArray(5)], [1, 2, 3, 4, 5]);
	t.end();
});

test(`Function based sequence`, t => {
	t.deepEqual(
		[
			...sqnc({
				fn: (idx, data) => {
					const result = data.current;
					[data.current, data.next] = [data.next, data.current + data.next];
					return result;
				},
				init: () => ({current: 0, next: 1}),
			})
				.instance(10),
		],
		[0, 1, 1, 2, 3, 5, 8, 13, 21, 34]
	);

	t.end();
});

test(`Function based sequence with end callback`, t => {
	t.deepEqual(
		[
			...sqnc({
				fn: (idx, data, end) => {
					if (idx > 4) {
						end();
					}
					return "test";
				},
			})
				.instance(10),
		],
		["test", "test", "test", "test", "test"]
	);
	t.end();
});


test(`Custom filler with toArray count`, t => {
	t.deepEqual(sqnc({fn: idx => `item${idx + 1}`}).toArray(5), ["item1", "item2", "item3", "item4", "item5"]);
	t.end();
});

test(`Clone instance`, t => {
	const it = sqnc({fn: idx => `item${idx + 1}`, count: 5});
	t.deepEqual([...it], ["item1", "item2", "item3", "item4", "item5"]);
	t.deepEqual([...it], []);
	t.deepEqual([...it.instance()], ["item1", "item2", "item3", "item4", "item5"]);
	t.end();
});


test(`Utils`, t => {
	const utf16array = sqnc.utils.stringToUTF16Array("👰");
	t.deepEqual(sqnc.utils.delta("👰", "👶"), 7);
	t.deepEqual(sqnc.utils.decToUTF16Array(sqnc.utils.utf16ArrayToDec(utf16array)), utf16array);
	t.deepEqual(sqnc.utils.decToUTF16Array(256 * 256), [1, 0]);
	t.equal(sqnc.utils.inc(1), 2);
	t.equal(sqnc.utils.inc(1, -1), 0);
	t.end();
});



test(`Test without iterator support`, t => {
	sqnc.setIteratorSupport(false);
	sqnc.setAsyncIteratorSupport(false);
	// ======
	t.deepEqual(sqnc({from: 1, to: 10}).toArray(), [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
	t.deepEqual(sqnc({from: 10, to: 1}).toArray(), [10, 9, 8, 7, 6, 5, 4, 3, 2, 1]);
	t.deepEqual(sqnc({from: "👰", to: "👶"}).toArray(), ["👰", "👱", "👲", "👳", "👴", "👵", "👶"]);
	t.deepEqual(sqnc({from: "\u2648"}).toArray(12), ["♈", "♉", "♊", "♋", "♌", "♍", "♎", "♏", "♐", "♑", "♒", "♓"]);
	// ======
	sqnc.setIteratorSupport();
	t.end();
});
