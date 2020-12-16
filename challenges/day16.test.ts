import { getTicketRulesPosition, getTicketScanningErrorRate } from "./day16";
import { readLines } from '../helpers/file-reader';

describe('day 16 part 1', () => {
    it('compute result for sample', () => {
        const daySample = readLines('./data/day16-sample.txt');
        const result = getTicketScanningErrorRate(daySample); //?.
        expect(result).toEqual(71);
    })

    it('compute result for input', () => {
        const dayInput = readLines('./data/day16-input.txt');
        const result = getTicketScanningErrorRate(dayInput); //?.
        expect(result).toEqual(19060);
    })
});

describe('day 16 part 2', () => {
    it('compute result for input', () => {
        const dayInput = readLines('./data/day16-input.txt');
        const result = getTicketRulesPosition(dayInput); //?.
        expect(result).toEqual(953713095011);
    })
});

