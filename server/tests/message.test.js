const expect = require('expect');
const { generateMessage } = require('../utils/message');

describe('generateMessage', () => {
    it('should generate correct message object', () => {
        const mockMessage = { from: 'Victor', content: 'Message from victor' };
        const result = generateMessage(mockMessage.from, mockMessage.content);
        expect(result).toBeA('object');
        expect(result).toIncludeKey('createdAt');
        expect(result.createdAt).toBeA('number');
        expect(result).toInclude(mockMessage);
    });
});