import { computeRound, countNumberOfOccupiedSeatsAfterStabilization, countNumberOfOccupiedSeatsAfterStabilizationWithRayCast, getAdjacentSeat, getFirstSeatAtDirection } from "./day11";
import { readLines } from '../helpers/file-reader';

describe('day 11 part 1', () => {
    it('compute result for round 1', () => {
        const currentMap = [
            '#.##.##.##',
            '#######.##',
            '#.#.#..#..',
            '####.##.##',
            '#.##.##.##',
            '#.#####.##',
            '..#.#.....',
            '##########',
            '#.######.#',
            '#.#####.##',
        ];
        const newMap = computeRound(currentMap, getAdjacentSeat, 4);
        expect(newMap).toEqual([
            '#.LL.L#.##',
            '#LLLLLL.L#',
            'L.L.L..L..',
            '#LLL.LL.L#',
            '#.LL.LL.LL',
            '#.LLLL#.##',
            '..L.L.....',
            '#LLLLLLLL#',
            '#.LLLLLL.L',
            '#.#LLLL.##',
        ]);
    })

    it('compute result for round 2', () => {
        const currentMap = [
            '#.LL.L#.##',
            '#LLLLLL.L#',
            'L.L.L..L..',
            '#LLL.LL.L#',
            '#.LL.LL.LL',
            '#.LLLL#.##',
            '..L.L.....',
            '#LLLLLLLL#',
            '#.LLLLLL.L',
            '#.#LLLL.##',
        ];
        const newMap = computeRound(currentMap, getAdjacentSeat, 4);
        expect(newMap).toEqual([
            '#.##.L#.##',
            '#L###LL.L#',
            'L.#.#..#..',
            '#L##.##.L#',
            '#.##.LL.LL',
            '#.###L#.##',
            '..#.#.....',
            '#L######L#',
            '#.LL###L.L',
            '#.#L###.##',
        ]);
    })

    it('compute result for round 3', () => {
        const currentMap = [
            '#.##.L#.##',
            '#L###LL.L#',
            'L.#.#..#..',
            '#L##.##.L#',
            '#.##.LL.LL',
            '#.###L#.##',
            '..#.#.....',
            '#L######L#',
            '#.LL###L.L',
            '#.#L###.##',
        ];
        const newMap = computeRound(currentMap, getAdjacentSeat, 4);
        expect(newMap).toEqual([
            '#.#L.L#.##',
            '#LLL#LL.L#',
            'L.L.L..#..',
            '#LLL.##.L#',
            '#.LL.LL.LL',
            '#.LL#L#.##',
            '..L.L.....',
            '#L#LLLL#L#',
            '#.LLLLLL.L',
            '#.#L#L#.##',
        ]);
    })

    it('compute result for round 4', () => {
        const currentMap = [
            '#.#L.L#.##',
            '#LLL#LL.L#',
            'L.L.L..#..',
            '#LLL.##.L#',
            '#.LL.LL.LL',
            '#.LL#L#.##',
            '..L.L.....',
            '#L#LLLL#L#',
            '#.LLLLLL.L',
            '#.#L#L#.##',
        ];
        const newMap = computeRound(currentMap, getAdjacentSeat, 4);
        expect(newMap).toEqual([
            '#.#L.L#.##',
            '#LLL#LL.L#',
            'L.#.L..#..',
            '#L##.##.L#',
            '#.#L.LL.LL',
            '#.#L#L#.##',
            '..L.L.....',
            '#L#L##L#L#',
            '#.LLLLLL.L',
            '#.#L#L#.##',
        ]);
    })

    it('compute result for sample', () => {
        const daySample = readLines('./data/day11-sample.txt');
        const result = countNumberOfOccupiedSeatsAfterStabilization(daySample); //?.
        expect(result).toEqual(37);
    })

    it('compute result for input', () => {
        const dayInput = readLines('./data/day11-input.txt');
        const result = countNumberOfOccupiedSeatsAfterStabilization(dayInput); //?.
        expect(result).toEqual(2283);
    })
});

describe('day 11 part 2', () => {
    
    it('ray cast stops on first seat', () => {
        const currentMap = [
            '.............',
            '.L.L.#.#.#.#.',
            '.............',
        ];
        
        const positon = { x: 1, y: 1};
        const direction = { x: 1, y: 0};
        const place = getFirstSeatAtDirection(currentMap, positon, direction);
        expect(place).toEqual('L');
    })

    it('see empty seat on all directions', () => {
        const currentMap = [
            '.##.##.',
            '#.#.#.#',
            '##...##',
            '...L...',
            '##...##',
            '#.#.#.#',
            '.##.##.',
        ];
        
        const positon = { x: 3, y: 3};

        const placeTop = getFirstSeatAtDirection(currentMap, positon, { x: 0, y: -1});
        const placeLeft = getFirstSeatAtDirection(currentMap, positon, { x: -1, y: 0});
        const placeRight = getFirstSeatAtDirection(currentMap, positon, { x: 1, y: 0});
        const placeBottom = getFirstSeatAtDirection(currentMap, positon, { x: 0, y: 1});

        const placeTopLeft = getFirstSeatAtDirection(currentMap, positon, { x: -1, y: -1});
        const placeTopRight = getFirstSeatAtDirection(currentMap, positon, { x: 1, y: -1});
        const placeBottomLeft = getFirstSeatAtDirection(currentMap, positon, { x: -1, y: 1});
        const placeBottomRight = getFirstSeatAtDirection(currentMap, positon, { x: 1, y: 1});

        expect(placeTop).toEqual('.');
        expect(placeLeft).toEqual('.');
        expect(placeRight).toEqual('.');
        expect(placeBottom).toEqual('.');
        expect(placeTopLeft).toEqual('.');
        expect(placeTopRight).toEqual('.');
        expect(placeBottomLeft).toEqual('.');
        expect(placeBottomRight).toEqual('.');
    })

    it('compute result for round 1', () => {
        const currentMap = [
            'L.LL.LL.LL',
            'LLLLLLL.LL',
            'L.L.L..L..',
            'LLLL.LL.LL',
            'L.LL.LL.LL',
            'L.LLLLL.LL',
            '..L.L.....',
            'LLLLLLLLLL',
            'L.LLLLLL.L',
            'L.LLLLL.LL',
        ];
        const newMap = computeRound(currentMap,  getFirstSeatAtDirection, 5);
        expect(newMap).toEqual([
            '#.##.##.##',
            '#######.##',
            '#.#.#..#..',
            '####.##.##',
            '#.##.##.##',
            '#.#####.##',
            '..#.#.....',
            '##########',
            '#.######.#',
            '#.#####.##',
        ]);
    })

    it('compute result for round 2', () => {
        const currentMap = [
            '#.##.##.##',
            '#######.##',
            '#.#.#..#..',
            '####.##.##',
            '#.##.##.##',
            '#.#####.##',
            '..#.#.....',
            '##########',
            '#.######.#',
            '#.#####.##',
        ];
        const newMap = computeRound(currentMap,  getFirstSeatAtDirection, 5);
        expect(newMap).toEqual([
            '#.LL.LL.L#',
            '#LLLLLL.LL',
            'L.L.L..L..',
            'LLLL.LL.LL',
            'L.LL.LL.LL',
            'L.LLLLL.LL',
            '..L.L.....',
            'LLLLLLLLL#',
            '#.LLLLLL.L',
            '#.LLLLL.L#',
        ]);
    })

    it('compute result for round 3', () => {
        const currentMap = [
            '#.LL.LL.L#',
            '#LLLLLL.LL',
            'L.L.L..L..',
            'LLLL.LL.LL',
            'L.LL.LL.LL',
            'L.LLLLL.LL',
            '..L.L.....',
            'LLLLLLLLL#',
            '#.LLLLLL.L',
            '#.LLLLL.L#',
        ];
        const newMap = computeRound(currentMap,  getFirstSeatAtDirection, 5);
        expect(newMap).toEqual([
            '#.L#.##.L#',
            '#L#####.LL',
            'L.#.#..#..',
            '##L#.##.##',
            '#.##.#L.##',
            '#.#####.#L',
            '..#.#.....',
            'LLL####LL#',
            '#.L#####.L',
            '#.L####.L#',
        ]);
    })

    it('compute result for round 4', () => {
        const currentMap = [
            '#.L#.##.L#',
            '#L#####.LL',
            'L.#.#..#..',
            '##L#.##.##',
            '#.##.#L.##',
            '#.#####.#L',
            '..#.#.....',
            'LLL####LL#',
            '#.L#####.L',
            '#.L####.L#',
        ];
        const newMap = computeRound(currentMap,  getFirstSeatAtDirection, 5);
        expect(newMap).toEqual([
            '#.L#.L#.L#',
            '#LLLLLL.LL',
            'L.L.L..#..',
            '##LL.LL.L#',
            'L.LL.LL.L#',
            '#.LLLLL.LL',
            '..L.L.....',
            'LLLLLLLLL#',
            '#.LLLLL#.L',
            '#.L#LL#.L#',
        ]);
    })

    it('compute result for round 5', () => {
        const currentMap = [
            '#.L#.L#.L#',
            '#LLLLLL.LL',
            'L.L.L..#..',
            '##LL.LL.L#',
            'L.LL.LL.L#',
            '#.LLLLL.LL',
            '..L.L.....',
            'LLLLLLLLL#',
            '#.LLLLL#.L',
            '#.L#LL#.L#',
        ];
        const newMap = computeRound(currentMap,  getFirstSeatAtDirection, 5);
        expect(newMap).toEqual([
            '#.L#.L#.L#',
            '#LLLLLL.LL',
            'L.L.L..#..',
            '##L#.#L.L#',
            'L.L#.#L.L#',
            '#.L####.LL',
            '..#.#.....',
            'LLL###LLL#',
            '#.LLLLL#.L',
            '#.L#LL#.L#',
        ]);
    })

    it('compute result for round 5', () => {
        const currentMap = [
            '#.L#.L#.L#',
            '#LLLLLL.LL',
            'L.L.L..#..',
            '##L#.#L.L#',
            'L.L#.#L.L#',
            '#.L####.LL',
            '..#.#.....',
            'LLL###LLL#',
            '#.LLLLL#.L',
            '#.L#LL#.L#',
        ];
        const newMap = computeRound(currentMap,  getFirstSeatAtDirection, 5);
        expect(newMap).toEqual([
            '#.L#.L#.L#',
            '#LLLLLL.LL',
            'L.L.L..#..',
            '##L#.#L.L#',
            'L.L#.LL.L#',
            '#.LLLL#.LL',
            '..#.L.....',
            'LLL###LLL#',
            '#.LLLLL#.L',
            '#.L#LL#.L#',
        ]);
    })
    
    it('compute result for round 6 and stabilize', () => {
        const currentMap = [
            '#.L#.L#.L#',
            '#LLLLLL.LL',
            'L.L.L..#..',
            '##L#.#L.L#',
            'L.L#.LL.L#',
            '#.LLLL#.LL',
            '..#.L.....',
            'LLL###LLL#',
            '#.LLLLL#.L',
            '#.L#LL#.L#',
        ];
        const newMap = computeRound(currentMap,  getFirstSeatAtDirection, 5);
        expect(newMap).toEqual([
            '#.L#.L#.L#',
            '#LLLLLL.LL',
            'L.L.L..#..',
            '##L#.#L.L#',
            'L.L#.LL.L#',
            '#.LLLL#.LL',
            '..#.L.....',
            'LLL###LLL#',
            '#.LLLLL#.L',
            '#.L#LL#.L#',
        ]);
    })

    it('compute result for sample', () => {
        const daySample = readLines('./data/day11-sample.txt');
        const result = countNumberOfOccupiedSeatsAfterStabilizationWithRayCast(daySample); //?.
        expect(result).toEqual(26);
    })

    it('compute result for input', () => {
        const dayInput = readLines('./data/day11-input.txt');
        const result = countNumberOfOccupiedSeatsAfterStabilizationWithRayCast(dayInput); //?.
        expect(result).toEqual(2054);
    })
});

