import { getWeaknessNumber, getEncryptionWeaknessNumbers } from "./day9";
import { readLines } from '../helpers/file-reader';

describe('day 9 part 1', () => {
    it('compute result for sample', () => {
        const daySample = readLines('./data/day9-sample.txt');
        const result = getWeaknessNumber(daySample, 5);
        expect(result).toEqual(127);
    })

    it('compute result for input', () => {
        const dayInput = readLines('./data/day9-input.txt');
        const result = getWeaknessNumber(dayInput, 25);
        expect(result).toEqual(375054920);
    })
});

describe('day 9 part 2', () => {
    it('compute result for sample', () => {
        const daySample = readLines('./data/day9-sample.txt');
        const result = getEncryptionWeaknessNumbers(daySample, 5);
        expect(result).toEqual(62);
    })

    it('compute result for input', () => {
        const dayInput = readLines('./data/day9-input.txt');
        const result = getEncryptionWeaknessNumbers(dayInput, 25);
        expect(result).toEqual(54142584);
    })
});

