(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["activeData"] = factory();
	else
		root["activeData"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
function compare(a, b) {
	if (Array.isArray(a) && Array.isArray(b)) {
		var l = Math.max(a.length, b.length);
		var sa = l - a.length;
		var sb = l - b.length;
		for (var i = 0; i < l; i++) {
			var av = i >= sa ? a[i - sa] : 0;
			var bv = i >= sb ? b[i - sb] : 0;
			if (av > bv) {
				return 1;
			} else if (av < bv) {
				return -1;
			}
		}
		return 0;
	} else {
		return a > b ? 1 : a < b ? -1 : 0;
	}
}

function isInt(n) {
	return n % 1 === 0;
}

function inc(val) {
	var count = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;

	if (Array.isArray(val)) {
		var MAX = 65536;
		var i = count;
		for (var p = val.length - 1; p >= 0; p--) {
			var res = val[p] + i;
			val[p] = res % MAX;
			if (val[p] < 0) {
				val[p] = MAX + val[p];
			}
			val[p] = Math.abs(val[p]);
			i = Math.floor(res / MAX);
		}
		if (i > 0) {
			val.unshift(i);
		}
		return val;
	} else {
		return val + count;
	}
}

function sqnc(from, to) {
	var step = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;
	var count = arguments[3];

	function isFiniteNumber(value) {
		return Number(value) === value && isFinite(value);
	}

	var result = [];

	if (typeof from === "function" && isFinite(to)) {
		var val = 0;
		for (var n = 0; n < to; n++) {
			val = from(n, val, result);
			result.push(val);
		}
		return result;
	}

	if (to != null) {
		count = null;
		console.warn("\"count\" argument is ignored when \"to\" argument is specified");
	}

	var countMode = count != null;
	if (countMode || from != null && to != null && step != null) {
		var chars = false;
		var initial = from;

		if (typeof from === "string") {
			from = from.split("").map(function (s) {
				return s.charCodeAt(0);
			});
			chars = true;
			if (step && typeof step !== "function" && !isInt(step)) {
				throw new Error("Step should be integer when characters are used");
			}
		}

		if (countMode) {
			if (count === 0) {
				throw new Error("count can't be zero!");
			}
			if (!isFiniteNumber(count)) {
				throw new Error("count should be a number!");
			}

			count = Math.abs(count);

			var c = count;
			var _val = from;

			if (!step) {
				while (c) {
					result.push(initial);
					c--;
				}
			} else {
				if (!chars && !isFiniteNumber(from)) {
					throw new Error("\"from\" argument should be number or character when \"step\" and \"count\" specified!");
				}

				var _n = 0;
				while (c) {
					_n++;
					result.push(chars ? String.fromCharCode.apply(null, _val) : _val);
					_val = inc(_val, typeof step === "function" ? step(_n, _val) : step);
					c--;
				}
			}
		} else {
			if (typeof to === "string") {
				to = to.split("").map(function (s) {
					return s.charCodeAt(0);
				});
				chars = true;
			}

			if (!Array.isArray(from) && !isFiniteNumber(from) || !Array.isArray(to) && !isFiniteNumber(to) || !isFiniteNumber(step) && typeof step !== "function") {
				throw new Error("arguments should be finite!");
			}
			if (typeof step !== "function") {
				step = Math.abs(step);
				if (step === 0) {
					throw new Error("\"step\" argument can't be zero!");
				}
			}

			var dir = 1;
			var check = void 0;
			if (compare(from, to) > 0) {
				dir = -1;
				check = function check(a) {
					return compare(a, to) >= 0;
				};
			} else {
				check = function check(a) {
					return compare(a, to) <= 0;
				};
			}
			var _n2 = 0;
			var _val2 = from;
			while (check(_val2)) {
				_n2++;
				result.push(chars ? String.fromCharCode.apply(null, _val2) : _val2);
				_val2 = inc(_val2, dir * (typeof step === "function" ? step(_n2, _val2, result) : step));
			}
		}
	}
	return result;
}

sqnc.maxSize = 65536;

/* harmony default export */ __webpack_exports__["default"] = (sqnc);

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(0).default;

/***/ })
/******/ ]);
});
//# sourceMappingURL=active-data.js.map