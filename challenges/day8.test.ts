import { getAccumulatorValueAtLoop, getAccumulatorValueAtEnd } from "./day8";
import { readLines } from '../helpers/file-reader';

describe('day 8 part 1', () => {
    it('compute result for sample', () => {
        const daySample = readLines('./data/day8-sample.txt');
        const result = getAccumulatorValueAtLoop(daySample);
        expect(result).toEqual(5);
    })

    it('compute result for input', () => {
        const dayInput = readLines('./data/day8-input.txt');
        const result = getAccumulatorValueAtLoop(dayInput);
        expect(result).toEqual(1489);
    })
});

describe('day 8 part 2', () => {
    it('compute result for sample', () => {
        const daySample = readLines('./data/day8-sample.txt');
        const result = getAccumulatorValueAtEnd(daySample);
        expect(result).toEqual(8);
    })

    it('compute result for input', () => {
        const dayInput = readLines('./data/day8-input.txt');
        const result = getAccumulatorValueAtEnd(dayInput);
        expect(result).toEqual(1539);
    })
});

