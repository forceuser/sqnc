# sqnc | [![Build Status](https://travis-ci.org/forceuser/sqnc.svg?branch=master)](https://travis-ci.org/forceuser/sqnc) [![Coverage Status](https://img.shields.io/codecov/c/github/forceuser/sqnc/master.svg)](https://codecov.io/gh/forceuser/sqnc) [![npm repository](https://img.shields.io/npm/v/sqnc.svg)](https://www.npmjs.com/package/sqnc)

Utility for numeric or symbolic seqence generation. Specify range of values, step or custom function to create array with seqence

## Installation

#### Install as npm package

```shell
npm i sqnc --save
```

#### Or simply download \*.js file

[sqnc.js@{{version}}](https://github.com/forceuser/sqnc/releases/download/{{version}}/sqnc.js)

#### Or just load from CDN

```html
<script src="//cdn.jsdelivr.net/npm/sqnc@{{version}}/dist/sqnc.js" integrity="{{#ssri}}../dist/sqnc.js{{/ssri}}" crossorigin="anonymous">
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
{{#file}}../tonic-example.js{{/file}}
```
