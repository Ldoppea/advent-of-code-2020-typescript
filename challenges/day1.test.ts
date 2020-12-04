import {findTheTwoEntriesThatSumTo2020, findTheThreeEntriesThatSumTo2020} from "./day1";
import day1Sample from "../data/day1-sample.json";
import day1Input from "../data/day1-input.json";

describe('day 1 part 1', () => {
    it('compute result for sample', () => {
        const result = findTheTwoEntriesThatSumTo2020(day1Sample)
        expect(result).toEqual([1721, 299])

        const multipliedResult = result[0] * result[1]
        expect(multipliedResult).toEqual(514579)
    })

    it('compute result for input', () => {
        const result = findTheTwoEntriesThatSumTo2020(day1Input)
        expect(result).toEqual([976, 1044])

        const multipliedResult = result[0] * result[1]
        expect(multipliedResult).toEqual(1018944)
    })
});

describe('day 1 part 2', () => {
    it('return result for sample', () => {
        const result = findTheThreeEntriesThatSumTo2020(day1Sample)
        expect(result).toEqual([675, 979, 366])

        const multipliedResult = result[0] * result[1] * result[2]
        expect(multipliedResult).toEqual(241861950)
    })

    it('return result for input', () => {
        const result = findTheThreeEntriesThatSumTo2020(day1Input)
        expect(result).toEqual([16, 1692, 312])

        const multipliedResult = result[0] * result[1] * result[2]
        expect(multipliedResult).toEqual(8446464)
    })
});
