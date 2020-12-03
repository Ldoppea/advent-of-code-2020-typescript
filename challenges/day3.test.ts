import {countNumberOfTrees, countNumberOfThreesForEachSlopes} from "./day3";
import { readLines } from '../helpers/file-reader';

describe('day one part 1', () => {
    it('compute result for sample', () => {
        const daySample = readLines('./data/day3-sample.txt');
        const result = countNumberOfTrees(daySample)
        expect(result).toEqual(7)
    })

    it('compute result for input', () => {
        const dayInput = readLines('./data/day3-input.txt');
        const result = countNumberOfTrees(dayInput)
        expect(result).toEqual(159)
    })
});

describe('day one part 2', () => {
    it('compute result for sample', () => {
        const daySample = readLines('./data/day3-sample.txt');
        const result = countNumberOfThreesForEachSlopes(daySample)
        const product = result.reduce((total, current) => total * current, 1);
        expect(product).toEqual(336)
    })

    it('compute result for input', () => {
        const dayInput = readLines('./data/day3-input.txt');
        const result = countNumberOfThreesForEachSlopes(dayInput)
        const product = result.reduce((total, current) => total * current, 1);
        expect(product).toEqual(6419669520)
    })
});
