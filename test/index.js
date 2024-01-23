const randomBytes = require('crypto').randomBytes(1)
const number = parseInt(randomBytes.toString('hex'), 16);

console.log(randomBytes, number, Math.floor(number / 63) + 1, Math.floor(255 / 63));