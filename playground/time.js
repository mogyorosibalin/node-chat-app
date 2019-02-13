const moment = require('moment');

const someTimestamp = moment().valueOf();
console.log(someTimestamp);

const createdAt = 1234;
const date = moment(createdAt);
// date.add(100, 'years').subtract(9, 'months');
console.log(date.format('MMM Do YYYY'));
console.log(date.format('h:mm a'));