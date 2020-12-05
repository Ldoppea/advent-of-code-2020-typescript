import {getHighestSeatId, GetMySeat} from "./day5";
import { readLines } from '../helpers/file-reader';
import { Seat } from './day5-seat';

describe('day 5 part 1', () => {
    it('compute result for sample', () => {
        const daySample = readLines('./data/day5-sample.txt');
        const result = getHighestSeatId(daySample);
        expect(result).toEqual(820);
    })

    it('compute result for input', () => {
        const dayInput = readLines('./data/day5-input.txt');
        const result = getHighestSeatId(dayInput);
        expect(result).toEqual(935);
    })

    it('compute row for FBFBBFFRLR', () => {
        const seat = new Seat('FBFBBFFRLR');
        expect(seat.row).toEqual(44);
    })
    it('compute column for FBFBBFFRLR', () => {
        const seat = new Seat('FBFBBFFRLR');
        expect(seat.column).toEqual(5);
    })
    it('compute id for FBFBBFFRLR', () => {
        const seat = new Seat('FBFBBFFRLR');
        expect(seat.id).toEqual(357);
    })
});

describe('day 5 part 2', () => {
    it('compute result for input', () => {
        const dayInput = readLines('./data/day5-input.txt');
        const result = GetMySeat(dayInput);
        expect(result).toEqual(743);
    })
});

