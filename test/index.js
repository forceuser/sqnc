import test from "tape";
import sinon from "sinon";
import sqnc from "sqnc";

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
	t.equal("--0--1--2", result);
	t.end();
});

test(`Use as infinite iterator`, t => {
	t.deepEqual([...sqnc({fn: idx => idx + 1}).count(5)], [1, 2, 3, 4, 5]);
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
				.count(10),
		],
		[0, 1, 1, 2, 3, 5, 8, 13, 21, 34]
	);

	t.end();
});


test(`Custom filler with toArray count`, t => {
	t.deepEqual(sqnc({fn: idx => `item${idx + 1}`}).toArray(5), ["item1", "item2", "item3", "item4", "item5"]);
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

// test(`Invalid data`, t => {
// 	t.throws(() => sqnc(Infinity, 5));
// 	t.throws(() => sqnc(10, NaN));
// 	t.throws(() => sqnc(1, null, null, 0));
// 	t.throws(() => sqnc(1, null, null, NaN));
// 	t.throws(() => sqnc("a", "z", 1.5));
// 	let warnMessage;
// 	sinon.stub(console, "warn", message => warnMessage = message);
// 	t.throws(() => sqnc(false, "z", 1, 5));
// 	t.equal(warnMessage, `"count" argument is ignored when "to" argument is specified`);
// 	t.throws(() => sqnc(1, 5, 0));
// 	t.throws(() => sqnc(false, null, 1, 5));
// 	t.throws(() => sqnc(0, sqnc.maxLength + 1));
// 	t.throws(() => sqnc(0, null, null, sqnc.maxLength + 1));
// 	t.deepEqual(sqnc(3), []);
// 	t.end();
// });
