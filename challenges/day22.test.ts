import { getGameScore, getGameScoreRecursive } from "./day22";
import { readFile } from '../helpers/file-reader';

describe('day 22 part 1', () => {
    it('compute result for sample', () => {
        const daySample = readFile('./data/day22-sample.txt');
        const result = getGameScore(daySample); //?.
        expect(result).toEqual(306);
    })

    it('compute result for input', () => {
        const dayInput = readFile('./data/day22-input.txt');
        const result = getGameScore(dayInput); //?.
        expect(result).toEqual(33473);
    })
});

describe('day 22 part 2', () => {   
    it('compute result for sample', () => {
        const daySample = readFile('./data/day22-sample.txt');
        const result = getGameScoreRecursive(daySample); //?.
        expect(result).toEqual(291);
    })

    it('compute result for input', () => {
        const dayInput = readFile('./data/day22-input.txt');
        const result = getGameScoreRecursive(dayInput); //?.
        expect(result).toEqual(31793);
    })
});

