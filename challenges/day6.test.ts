import { getAnyoneYesQuestions, getEveryoneYesQuestions } from "./day6";
import { readLines } from '../helpers/file-reader';

describe('day 6 part 1', () => {
    it('compute result for sample', () => {
        const daySample = readLines('./data/day6-sample.txt');
        const result = getAnyoneYesQuestions(daySample);
        expect(result).toEqual(11);
    })

    it('compute result for input', () => {
        const dayInput = readLines('./data/day6-input.txt');
        const result = getAnyoneYesQuestions(dayInput);
        expect(result).toEqual(7283);
    })
});

describe('day 6 part 2', () => {
    it('compute result for sample', () => {
        const daySample = readLines('./data/day6-sample.txt');
        const result = getEveryoneYesQuestions(daySample);
        expect(result).toEqual(6);
    })

    it('compute result for input', () => {
        const dayInput = readLines('./data/day6-input.txt');
        const result = getEveryoneYesQuestions(dayInput);
        expect(result).toEqual(3520);
    })
});

