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

for (let i=0; i<100000; i++) {
    var dice = generateRandomInt();
    result[dice]++; //한 번호가 몇 번 나왔는지 확인
    result.total += dice; //나온 숫자들 총합
    result.rollCount++; //주사위 굴린 횟수
    console.log(dice);
}

console.log(result);