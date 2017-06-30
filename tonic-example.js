const sqnc = require("sqnc");

console.log(sqnc("A", "Z")); // Alphabet
console.log(sqnc("👶", "👰")); // Some emojis
console.log(sqnc(25, 0, 5)); // From 25 to 0 with step 5
console.log(sqnc("☠", null, null, 5)); // Make Array(5) of Skull and bones symbol
console.log(sqnc(n => Math.pow(2, n), 10)); // Power of 2
console.log(sqnc((n, v, r) => n > 1 ? r[n - 1] + r[n - 2] : 1, 20)); // Fibonacci number
console.log(sqnc(1, 20, n => n % 2 ? 1 : 2)); // Using step function
