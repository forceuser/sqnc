# sqnc | [![Build Status](https://travis-ci.org/forceuser/sqnc.svg?branch=master)](https://travis-ci.org/forceuser/sqnc) [![Coverage Status](https://img.shields.io/codecov/c/github/forceuser/sqnc/master.svg)](https://codecov.io/gh/forceuser/sqnc) [![npm repository](https://img.shields.io/npm/v/sqnc.svg)](https://www.npmjs.com/package/sqnc)

Utility for numeric or symbolic seqence generation. Specify range of values, step or custom function to create array with seqence

## Installation

#### Install as npm package

```shell
npm i sqnc --save
```

#### Or simply download \*.js file

sqnc@{{version}} minified file: [sqnc.min.js](https://github.com/forceuser/sqnc/releases/download/{{version}}/sqnc.min.js)

#### Or just load from CDN

```html
<script src="//cdn.rawgit.com/forceuser/sqnc/{{version}}/dist/sqnc.min.js">
</script>
```

And then use **sqnc** as global variable
```html
<script>
    console.log(sqnc("👶", "👰"));
</script>
```
## [Documentation](./DOCUMENTATION.md)

## Example

Run example with [runkit](https://npm.runkit.com/sqnc)

```js
const sqnc = require("sqnc");

console.log(sqnc("A", "Z")); // Alphabet
console.log(sqnc("👶", "👰")); // Some emojis
console.log(sqnc(25, 0, 5)); // From 25 to 0 with step 5
console.log(sqnc("☠", null, null, 5)); // Make Array(5) of Skull and bones symbol
console.log(sqnc(n => Math.pow(2, n), 10)); // Power of 2 sequence
console.log(sqnc((n, v, r) => n > 1 ? r[n - 1] + r[n - 2] : 1, 20)); // Fibonacci number sequence
console.log(sqnc(1, 20, n => n % 2 ? 1 : 2)); // Using step function
```
