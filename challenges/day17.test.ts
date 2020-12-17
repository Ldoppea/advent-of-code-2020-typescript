import { ACTIVE, countActiveCubes, countActiveHypercubes, getEmptyXGrow, getEmptyYGrow, getEmptyZGrow, getForeigners, getHyperForeigners, INACTIVE } from "./day17";
import { readLines } from '../helpers/file-reader';

describe('day 17 part 1', () => {
    it('get empty Y grow', () => {
        const pocketDimension = [
            [
                ['.', '#', '.'],
                ['.', '.', '#'],
                ['#', '#', '#'],
            ]
        ];
        const result = getEmptyYGrow(pocketDimension); //?.
        expect(result).toEqual('.');
    })
    it('get empty X grow', () => {
        const pocketDimension = [
            [
                ['.', '#', '.'],
                ['.', '.', '#'],
                ['#', '#', '#'],
            ]
        ];
        const result = getEmptyXGrow(pocketDimension); //?.
        expect(result).toEqual(['.', '.', '.', '.', '.']);
    })
    
    it('get empty Z grow', () => {
        const pocketDimension = [
            [
                ['.', '#', '.'],
                ['.', '.', '#'],
                ['#', '#', '#'],
            ]
        ];
        
        const result = getEmptyZGrow(pocketDimension); //?.
        expect(result).toEqual( [
            ['.', '.', '.', '.', '.'],
            ['.', '.', '.', '.', '.'],
            ['.', '.', '.', '.', '.'],
            ['.', '.', '.', '.', '.'],
            ['.', '.', '.', '.', '.'],
        ]);
    })

    it('get neighbors for sample round 0', () => {
        const pocketDimension = [
            [
                ['.', '#', '.'],
                ['.', '.', '#'],
                ['#', '#', '#'],
            ]
        ];
        const result = getForeigners(pocketDimension, 0, 1, 1); //?.

        const numberOfActive = result.filter(foreigner => foreigner === ACTIVE).length;
        const numberOfInactive = result.filter(foreigner => foreigner === INACTIVE).length;
        expect(result.length).toEqual(26);
        expect(numberOfActive).toEqual(5);
        expect(numberOfInactive).toEqual(21);
    })

    it('get neighbors for sample round 1', () => {
        const pocketDimension = [
            [
                ['#', '.', '.'],
                ['.', '.', '#'],
                ['.', '#', '.'],
            ],
            [
                ['#', '.', '#'],
                ['.', '#', '#'],
                ['.', '#', '.'],
            ],
            [
                ['#', '.', '.'],
                ['.', '.', '#'],
                ['.', '#', '.'],
            ]
        ];
        const result = getForeigners(pocketDimension, 1, 1, 1); //?.

        const numberOfActive = result.filter(foreigner => foreigner === ACTIVE).length;
        const numberOfInactive = result.filter(foreigner => foreigner === INACTIVE).length;
        expect(result.length).toEqual(26);
        expect(numberOfActive).toEqual(10);
        expect(numberOfInactive).toEqual(16);
    })

    it('compute result for sample', () => {
        const daySample = readLines('./data/day17-sample.txt');
        const result = countActiveCubes(daySample); //?.
        expect(result).toEqual(112);
    })

    it('compute result for input', () => {
        const dayInput = readLines('./data/day17-input.txt');
        const result = countActiveCubes(dayInput); //?.
        expect(result).toEqual(301);
    })
});

describe('day 17 part 2', () => {
    it('get neighbors for sample round 0', () => {
        const pocketDimension = [
            [
                [
                    ['.', '#', '.'],
                    ['.', '.', '#'],
                    ['#', '#', '#'],
                ]
            ]
        ];
        const result = getHyperForeigners(pocketDimension, 0, 0, 1, 1); //?.

        const numberOfActive = result.filter(foreigner => foreigner === ACTIVE).length;
        const numberOfInactive = result.filter(foreigner => foreigner === INACTIVE).length;
        expect(result.length).toEqual(80);
        expect(numberOfActive).toEqual(5);
        expect(numberOfInactive).toEqual(75);
    })

    it('compute result for sample', () => {
        const daySample = readLines('./data/day17-sample.txt');
        const result = countActiveHypercubes(daySample); //?.
        expect(result).toEqual(848);
    })

    it('compute result for input', () => {
        const dayInput = readLines('./data/day17-input.txt');
        const result = countActiveHypercubes(dayInput); //?.
        expect(result).toEqual(2424);
    })
});

