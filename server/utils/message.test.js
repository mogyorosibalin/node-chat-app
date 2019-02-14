const expect = require('expect');

const { generateMessage, generateLocationMessage } = require('./message');

describe('FUNC | generateMessage', () => {
    it('should generate the correct message object', () => {
        // Making the variables for the test case
        const from = 'Jen';
        const text = 'Some message';
        const message = generateMessage(from, text);

        // Making assertions about the result
        expect(message.createdAt).toBeA('number');
        expect(message).toInclude({ from, text });
    });
});

describe('FUNC | generateLocationMessage', () => {
    it('should generate correct location object', () => {
        // Making the variables for the test case
        const from = 'Deb';
        const latitude = 15;
        const longitude = 19;
        const url = 'https://www.google.com/maps?q=15,19';
        const message = generateLocationMessage(from, latitude, longitude);

        // Making assertions about the result
        expect(message.createdAt).toBeA('number');
        expect(message).toInclude({ from, url });
    });
});