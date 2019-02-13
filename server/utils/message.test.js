const expect = require('expect');

const { generateMessage } = require('./message');

describe('generateMessage', () => {
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