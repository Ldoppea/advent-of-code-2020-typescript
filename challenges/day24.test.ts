import { getTileFromDirections, countBlackTiles, parseDirections, flipXDaysAndCountBlackTiles, getTilesThatShouldGoWhite, getTilesThatShouldGoBlack } from "./day24";
import { readLines } from '../helpers/file-reader';

describe('day 24 part 1', () => {
    it('parse directions for sesenwnenenewseeswwswswwnenewsewsw', () => {
        const coordinates = 'sesenwnenenewseeswwswswwnenewsewsw';
        const result = parseDirections(coordinates); //?.
        expect(result).toEqual([
            'se',
            'se',
            'nw',
            'ne',
            'ne',
            'ne',
            'w',
            'se',
            'e',
            'sw',
            'w',
            'sw',
            'sw',
            'w',
            'ne',
            'ne',
            'w',
            'se',
            'w',
            'sw'
        ]);
    })

    it('get coordinates for esew', () => {
        const coordinates = 'esew';
        const result = getTileFromDirections(coordinates); //?.
        expect(result).toEqual({
            posX: 1,
            posY: 1
        });
    })

    it('get coordinates for nwwswee', () => {
        const coordinates = 'nwwswee';
        const result = getTileFromDirections(coordinates); //?.
        expect(result).toEqual({
            posX: 0,
            posY: 0
        });
    })

    it('compute result for sample', () => {
        const daySample = readLines('./data/day24-sample.txt');
        const result = countBlackTiles(daySample); //?.
        expect(result).toEqual(10);
    })

    it('compute result for input', () => {
        const dayInput = readLines('./data/day24-input.txt');
        const result = countBlackTiles(dayInput); //?.
        expect(result).toEqual(356);
    })
});

describe('day 24 part 2', () => {
    it('getShouldTurnWhiteTiles for 1 tile with no neighbors', () => {
        const blackTiles = [
            { posX: 0, posY: 0 },
        ];
        const result = getTilesThatShouldGoWhite(blackTiles); //?.
        expect(result).toEqual([
            { posX: 0, posY: 0 },
        ]);
    });
    it('getShouldTurnWhiteTiles for 2 tiles with no neighbors', () => {
        const blackTiles = [
            { posX: -1, posY: 0 },
            { posX: 1, posY: 0 },
        ];
        const result = getTilesThatShouldGoWhite(blackTiles); //?.
        expect(result).toEqual([
            { posX: -1, posY: 0 },
            { posX: 1, posY: 0 },
        ]);
    });
    it('getShouldTurnWhiteTiles for 1 tile with 3 neighbors', () => {
        const blackTiles = [
            { posX: 0, posY: 0 },
            { posX: -1, posY: 0 },
            { posX: 1, posY: 0 },
            { posX: 1, posY: 1 },
        ];
        const result = getTilesThatShouldGoWhite(blackTiles); //?.
        expect(result).toEqual([
            { posX: 0, posY: 0}
        ]);
    });

    it('getShouldTurnBlackTiles for 1 tile with 2 black neighbors', () => {
        const blackTiles = [
            { posX: 1, posY: 0 },
            { posX: -1, posY: 0 },
        ];
        const result = getTilesThatShouldGoBlack(blackTiles); //?.
        expect(result).toEqual([
            { posX: 0, posY: 0},
        ]);
    });

    it('compute result for sample day 1', () => {
        const daySample = readLines('./data/day24-sample.txt');
        const result = flipXDaysAndCountBlackTiles(daySample, 1); //?.
        expect(result).toEqual(15);
    })

    it('compute result for sample day 2', () => {
        const daySample = readLines('./data/day24-sample.txt');
        const result = flipXDaysAndCountBlackTiles(daySample, 2); //?.
        expect(result).toEqual(12);
    })

    it('compute result for sample day 3', () => {
        const daySample = readLines('./data/day24-sample.txt');
        const result = flipXDaysAndCountBlackTiles(daySample, 3); //?.
        expect(result).toEqual(25);
    })

    it('compute result for sample', () => {
        const daySample = readLines('./data/day24-sample.txt');
        const result = flipXDaysAndCountBlackTiles(daySample, 100); //?.
        expect(result).toEqual(2208);
    })

    it('compute result for input', () => {
        const dayInput = readLines('./data/day24-input.txt');
        const result = flipXDaysAndCountBlackTiles(dayInput, 100); //?.
        expect(result).toEqual(3887);
    })
});

