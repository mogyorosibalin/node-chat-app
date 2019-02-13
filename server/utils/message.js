const moment = require('moment');

module.exports = {
    generateMessage: (from, text) => {
        return { from, text, createdAt: moment().valueOf() };
    },
    generateLocationMessage: (from, latitude, longitude) => {
        return { from, url: `https://www.google.com/maps?q=${latitude},${longitude}`, createdAt: moment().valueOf() };
    }
}