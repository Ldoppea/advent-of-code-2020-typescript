import { getJoltageProduct, getNumberOfDistrinctArrangements } from "./day10";
import { readLines } from '../helpers/file-reader';

describe('day 10 part 1', () => {
    it('compute result for sample', () => {
        const daySample = readLines('./data/day10-sample.txt');
        const result = getJoltageProduct(daySample);
        expect(result).toEqual(220);
    })

    it('compute result for input', () => {
        const dayInput = readLines('./data/day10-input.txt');
        const result = getJoltageProduct(dayInput);
        expect(result).toEqual(2376);
    })
});

describe('day 10 part 2', () => {
    it('should handle combination of two consecutive numbers', () => {
        const sample = '1 2'.split(' ')
        const result = getNumberOfDistrinctArrangements(sample);
        expect(result).toEqual(2);
    })

    it('should handle combination of three consecutive numbers', () => {
        const sample = '1 2 3'.split(' ')
        const result = getNumberOfDistrinctArrangements(sample);
        expect(result).toEqual(4);
    })

    it('should handle combination of four consecutive numbers', () => {
        const sample = '1 2 3 4'.split(' ')
        const result = getNumberOfDistrinctArrangements(sample);
        expect(result).toEqual(7);
    })

    it('should handle combination of five consecutive numbers', () => {
        const sample = '1 2 3 4 5'.split(' ')
        const result = getNumberOfDistrinctArrangements(sample);
        expect(result).toEqual(13);
    })

    it('should handle combination of six consecutive numbers', () => {
        const sample = '1 2 3 4 5 6'.split(' ')
        const result = getNumberOfDistrinctArrangements(sample);
        expect(result).toEqual(24);
    })

    it('should handle combination of seven consecutive numbers', () => {
        const sample = '1 2 3 4 5 6 7'.split(' ')
        const result = getNumberOfDistrinctArrangements(sample);
        expect(result).toEqual(44);
    })

    it('should handle combination of eight consecutive numbers', () => {
        const sample = '1 2 3 4 5 6 7 8'.split(' ')
        const result = getNumberOfDistrinctArrangements(sample);
        expect(result).toEqual(81);
    })

    it('should handle combination of eight consecutive numbers', () => {
        const sample = '1 2 3 4 5 6 7 8 9'.split(' ')
        const result = getNumberOfDistrinctArrangements(sample);
        expect(result).toEqual(149);
    })
    
    it('compute result for sample small', () => {
        const daySample = readLines('./data/day10-sample-small.txt');
        const result = getNumberOfDistrinctArrangements(daySample);
        expect(result).toEqual(8);
    })

    it('compute result for sample', () => {
        const daySample = readLines('./data/day10-sample.txt');
        const result = getNumberOfDistrinctArrangements(daySample); //?.
        expect(result).toEqual(19208);
    })

    it('compute result for input', () => {
        const dayInput = readLines('./data/day10-input.txt');
        const result = getNumberOfDistrinctArrangements(dayInput); //?.
        expect(result).toEqual(129586085429248);
    })
});

