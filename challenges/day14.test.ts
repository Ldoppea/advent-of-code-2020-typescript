import { getAddressesForMask, getSumInMemory, getSumInMemoryV2 } from "./day14";
import { readLines } from '../helpers/file-reader';

describe('day 14 part 1', () => {
    it('compute result for sample', () => {
        const daySample = readLines('./data/day14-sample.txt');
        const result = getSumInMemory(daySample); //?.
        expect(result).toEqual(165);
    })

    it('compute result for input', () => {
        const dayInput = readLines('./data/day14-input.txt');
        const result = getSumInMemory(dayInput); //?.
        expect(result).toEqual(12135523360904);
    })
});

describe('day 14 part 2', () => {
    it('apply mask for 11', () => {
        const mask = '000000000000000000000000000000X1001X';
        const memoryAddress = 42;
        const result = getAddressesForMask(memoryAddress, mask); //?.
        expect(result).toEqual([
            26,
            27,
            58,
            59
        ]);
    })

    it('compute result for sample', () => {
        const daySample = readLines('./data/day14-sample2.txt');
        const result = getSumInMemoryV2(daySample); //?.
        expect(result).toEqual(208);
    })

    it('compute result for input', () => {
        const dayInput = readLines('./data/day14-input.txt');
        const result = getSumInMemoryV2(dayInput); //?.
        expect(result).toEqual(2741969047858);
    })
});

