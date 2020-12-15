import { get2020thNumber } from "./day15";
import { readLines } from '../helpers/file-reader';

describe('day 15 part 1', () => {
    it('compute result for sample', () => {
        const daySample = readLines('./data/day15-sample.txt')[0];
        const result = get2020thNumber(daySample, 2020); //?.
        expect(result).toEqual(436);
    })

    it('compute result for input', () => {
        const dayInput = readLines('./data/day15-input.txt')[0];
        const result = get2020thNumber(dayInput, 2020); //?.
        expect(result).toEqual(1373);
    })
});

describe('day 15 part 2', () => {
    it('compute result for sample', () => {
        const daySample = readLines('./data/day15-sample.txt')[0];
        const result = get2020thNumber(daySample, 30_000_000);
        expect(result).toEqual(175594);
    })

    it('compute result for input', () => {
        const dayInput = readLines('./data/day15-input.txt')[0];
        const result = get2020thNumber(dayInput, 30_000_000);
        expect(result).toEqual(112458);
    })
});

