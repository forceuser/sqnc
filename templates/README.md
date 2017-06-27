# sqnc | [![Build Status](https://travis-ci.org/forceuser/sqnc.svg?branch=master)](https://travis-ci.org/forceuser/sqnc) [![Coverage Status](https://img.shields.io/codecov/c/github/forceuser/sqnc/master.svg)](https://codecov.io/gh/forceuser/sqnc) [![npm repository](https://img.shields.io/npm/v/sqnc.svg)](https://www.npmjs.com/package/sqnc)

Tiny and convenient reactive data manager, inspired by MobX. Automatically detects associated data and performs updates to your views or everything dependent on that data when it changes. Implemented with javascript Proxy objects

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
