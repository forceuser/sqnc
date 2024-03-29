# sqnc | [![Build Status](https://travis-ci.org/forceuser/sqnc.svg?branch=master)](https://travis-ci.org/forceuser/sqnc) [![Coverage Status](https://img.shields.io/codecov/c/github/forceuser/sqnc/master.svg)](https://codecov.io/gh/forceuser/sqnc) [![npm repository](https://img.shields.io/npm/v/sqnc.svg)](https://www.npmjs.com/package/sqnc)

Utility for numeric or symbolic seqence generation. Specify range of values, step or custom function to create array with seqence

## Installation

#### Install as npm package

```shell
npm i sqnc --save
```

#### Or simply download \*.js file

[sqnc.js@3.0.8](https://github.com/forceuser/sqnc/releases/download/3.0.8/sqnc.js)

#### Or just load from CDN

```html
<script src="//cdn.jsdelivr.net/npm/sqnc@3.0.8/dist/sqnc.js" integrity="sha512-3tikuegV0rx0lArqTp53bFeEFfgc9E9HuBpFkX2TqxP7PkIJ2Pdn/iMmUfna5VsUdEjN1fX6j1u2sgSbe0eGgQ==" crossorigin="anonymous">
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

console.log(sqnc("A", "Z").toArray()); // Alphabet
console.log(sqnc("👶", "👰").toArray()); // Some emojis
console.log(sqnc(25, 0, 5).toArray()); // From 25 to 0 with step 5
console.log(sqnc("☠").toArray(5)); // Make Array(5) of Skull and bones symbol

```
