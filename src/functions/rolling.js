const crypto = require("crypto");

/**
 * get random number
 * @param {string} type dice type
 * @param {number} times 
 * @return {number} random dice value
 */
function dice(type, times, dice=null, effect_num=null) {
    const dices = {
        d2: 2,
        d4: 4,
        d6: 6,
        d10: 10,
        d20: 20,
        dp: 100,
        d120: 120
    }

    let rolledNumber = 0;                                      //돌린 주사위 값들의 총합 변수
    let rolledArr = [];
    for (i=0; i<times; i++) {                                  //rolls 값만큼 반복해서 난수 생성
        const randomBytes = crypto.randomBytes(1);
        const random = (randomBytes[0] % dices[type]) + 1;     //crypto로 생성한 난수
        rolledArr.push(random);                                //생성된 난수 rolledArr에 저장
        rolledNumber += random;                           
    }

    effectedTotal = rolledNumber

    if (dice) {
        switch (dice) {
            case 'plus':
                effectedTotal += effect_num;
                break;
            case 'minus':
                effectedTotal -= effect_num;
                break;
        }
    }

    return {values: rolledArr, total: rolledNumber, effectedTotal: effectedTotal, dice: dice, effect_num: effect_num}
}

module.exports = { dice };