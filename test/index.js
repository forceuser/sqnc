import test from "tape";
import sinon from "sinon";
import sqnc from "../src/index";

test(`Straight numeric sequence (from: 1, to: 10)`, t => {
	t.deepEqual(sqnc(1, 10), [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
	t.end();
});

test(`Reverse numeric sequence (from: 10, to: 1)`, t => {
	t.deepEqual(sqnc(10, 1), [10, 9, 8, 7, 6, 5, 4, 3, 2, 1]);
	t.end();
});

test(`Straight char sequence (from: "A", to: "D")`, t => {
	t.deepEqual(sqnc("A", "D"), ["A", "B", "C", "D"]);
	t.end();
});

test(`Reverse char sequence (from: "D", to: "A")`, t => {
	t.deepEqual(sqnc("D", "A"), ["D", "C", "B", "A"]);
	t.end();
});

test(`Straight utf16 sequence (from: "👰", to: "👶")`, t => {
	t.deepEqual(sqnc("👰", "👶"), ["👰", "👱", "👲", "👳", "👴", "👵", "👶"]);
	t.end();
});

test(`Reverse utf16 sequence (from: "👶", to: "👰")`, t => {
	t.deepEqual(sqnc("👶", "👰"), ["👶", "👵", "👴", "👳", "👲", "👱", "👰"]);
	t.end();
});

test(`Custom step`, t => {
	t.deepEqual(sqnc("👶", null, 2, 5), ["👶", "👸", "👺", "👼", "👾"]);
	t.deepEqual(sqnc("👶", null, -2, 5), ["👶", "👴", "👲", "👰", "👮"]);
	t.deepEqual(sqnc("👰", "👶", 2), ["👰", "👲", "👴", "👶"]);
	t.deepEqual(sqnc("👰", "👶", -2), sqnc("👰", "👶", 2));
	t.deepEqual(sqnc(1, 10, n => n % 2 === 0 ? 1 : 2), [1, 3, 4, 6, 7, 9, 10]);
	t.deepEqual(sqnc(1, null, n => n + 2, 3), [1, 4, 8]);
	t.end();
});

test(`Placeholder with count`, t => {
	t.deepEqual(sqnc("👶", null, null, 5), ["👶", "👶", "👶", "👶", "👶"]);
	t.deepEqual(sqnc(1, null, 1, 3), [1, 2, 3]);
	t.end();
});

test(`Custom filler with count`, t => {
	t.deepEqual(sqnc(n => `item${n + 1}`, 5), ["item1", "item2", "item3", "item4", "item5"]);
	t.end();
});

test(`Invalid data`, t => {
	t.throws(() => sqnc(Infinity, 5));
	t.throws(() => sqnc(10, NaN));
	t.throws(() => sqnc(1, null, null, 0));
	t.throws(() => sqnc(1, null, null, NaN));
	t.throws(() => sqnc("a", "z", 1.5));
	let warnMessage;
	sinon.stub(console, "warn", message => warnMessage = message);
	t.throws(() => sqnc(false, "z", 1, 5));
	t.equal(warnMessage, `"count" argument is ignored when "to" argument is specified`);
	t.throws(() => sqnc(1, 5, 0));
	t.throws(() => sqnc(false, null, 1, 5));
	t.throws(() => sqnc(0, sqnc.maxLength + 1));
	t.throws(() => sqnc(0, null, null, sqnc.maxLength + 1));
	t.deepEqual(sqnc(3), []);
	t.end();
});

test(`Utils`, t => {
	const utf16array = sqnc.utils.StringToUTF16Array("👰");
	t.deepEqual(sqnc.utils.DecToUTF16Array(sqnc.utils.UTF16ArrayToDec(utf16array)), utf16array);
	t.deepEqual(sqnc.utils.DecToUTF16Array(256 * 256), [1, 0]);
	t.equal(sqnc.utils.inc(1), 2);
	t.equal(sqnc.utils.inc(1, -1), 0);
	t.end();
});
