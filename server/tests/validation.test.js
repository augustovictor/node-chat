const expect           = require('expect');
const { isRealString } = require('../utils/validation');

describe('isRealString', () => {
    it('should accept valid string', () => {
        const validString = 'Victor';
        expect(isRealString(validString)).toBe(true);
    });

    it('should not accept invalid string', () => {
        const invalidString = '     ';
        expect(isRealString(invalidString)).toBe(false);
    });

    it('should not accept numbers', () => {
        const numbers = 1234;
        expect(isRealString(numbers)).toBe(false);
    });
})