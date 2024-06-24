const moment = require("moment");

function isNightTime() {
    const now = moment().hour();

    if (now <= 5 || now >= 10) return true;
    else return false;
}

module.exports = { isNightTime };