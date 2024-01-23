const crypto = require("crypto");

const dices = {
    d2: 2,
    d4: 4,
    d6: 6,
    d10: 10,
    d20: 20,
    dp: 100,
    d120: 120
}

function generateRandomInt() {
    const randomBytes = crypto.randomBytes(1);
    const random = (randomBytes.readUint8() % dices.dp) + 1;

    return random;
}

const result = {};

for (let i=0; i<dices.dp; i++) {
    result[i+1] = 0;
}

result.total = 0;
result.rollCount = 0;

for (let i=0; i<1000000; i++) {
    var dice = generateRandomInt();
    result[dice]++;
    result.total += dice;
    result.rollCount++;
    console.log(dice);
}

console.log(result);