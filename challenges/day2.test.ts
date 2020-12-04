import {getValidPasswords, getValidPasswordsBasedOnPosition} from "./day2";
import daySample from "../data/day2-sample.json";
import dayInput from "../data/day2-input.json";

describe('day 2 part 1', () => {
    it('compute result for sample', () => {
        const result = getValidPasswords(daySample)
        expect(result).toEqual(['1-3 a: abcde', '2-9 c: ccccccccc'])
        expect(result.length).toEqual(2)
    })

    it('compute result for input', () => {
        const result = getValidPasswords(dayInput)
        expect(result.length).toEqual(524)
    })
});

describe('day 2 part 2', () => {
    it('return result for sample', () => {
        const result = getValidPasswordsBasedOnPosition(daySample)
        expect(result).toEqual(['1-3 a: abcde'])
        expect(result.length).toEqual(1)
    })

    it('return result for input', () => {
        const result = getValidPasswordsBasedOnPosition(dayInput)
        expect(result.length).toEqual(485)
    })
});
