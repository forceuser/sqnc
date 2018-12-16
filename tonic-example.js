const sqnc = require("sqnc");

console.log(sqnc("A", "Z").toArray()); // Alphabet
console.log(sqnc("👶", "👰").toArray()); // Some emojis
console.log(sqnc(25, 0, 5).toArray()); // From 25 to 0 with step 5
console.log(sqnc("☠").toArray(5)); // Make Array(5) of Skull and bones symbol
