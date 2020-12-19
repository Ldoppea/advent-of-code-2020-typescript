import { getNumberOfMatchingLines, getRule0ToRegex, parseRules } from "./day19";
import { readLines } from '../helpers/file-reader';

describe('day 19 part 1', () => {
    it('regexify rule 1', () => {
        const rules = parseRules([
            '0: 1 2',
            '1: "a"',
            '2: 1 3 | 3 1',
            '3: "b"',
        ]);

        const result = getRule0ToRegex(rules); //?.
        expect(result).toEqual('(a((ab)|(ba)))');
    })
    
    it('regexify rule sample', () => {
        const rules = parseRules([
            '0: 4 1 5',
            '1: 2 3 | 3 2',
            '2: 4 4 | 5 5',
            '3: 4 5 | 5 4',
            '4: "a"',
            '5: "b"',
        ]);

        const result = getRule0ToRegex(rules); //?.
        expect(result).toEqual('(a((((aa)|(bb))((ab)|(ba)))|(((ab)|(ba))((aa)|(bb))))b)');
    })

    it('compute result for sample', () => {
        const daySample = readLines('./data/day19-sample.txt');
        const result = getNumberOfMatchingLines(daySample); //?.
        expect(result).toEqual(2);
    })

    it('compute result for input', () => {
        const dayInput = readLines('./data/day19-input.txt');
        const result = getNumberOfMatchingLines(dayInput); //?.
        expect(result).toEqual(200);
    })
});

describe('day 19 part 2', () => {    
    it('compute result for input', () => {
        const dayInput = readLines('./data/day19-input-part2.txt');
        const result = getNumberOfMatchingLines(dayInput); //?.
        expect(result).toEqual(407);
    })
});

