import { convertToLinkedArray, convertToOrderedArray, getCupsLabeling, getStars, insertNext, insertNextThree, playRound, playRoundLinkedArray, playXRound, playXRoundLinkedArray, removeNext, removeNextThree, shiftOrderedArray } from "./day23";
import { readLines } from '../helpers/file-reader';

describe('day 23 part 1', () => {
    it('play 1 round on sample', () => {
        const gameState      = {
            cups: [3,8,9,1,2,5,4,6,7],
            currentCupIndex: 0
        };
        const result = playRound(gameState); //?.
        expect(result).toEqual({
            cups: [3,2,8,9,1,5,4,6,7],
            currentCupIndex: 1
        });
    })

    it('play 2 rounds on sample', () => {
        const gameState      = {
            cups: [3,8,9,1,2,5,4,6,7],
            currentCupIndex: 0
        };
        const result = playXRound(gameState, 2); //?
        expect(result).toEqual({
            cups: [3,2,5,4,6,7,8,9,1],
            currentCupIndex: 2
        });
    });

    it('play 1 rounds on XXX', () => {
        const gameState      = {
            cups: [9,2,5,8,4,1,3,6,7],
            currentCupIndex: 5
        };
        const result = playRound(gameState); //?
        expect(result).toEqual({
            cups: [7,2,5,8,4,1,9,3,6],
            currentCupIndex: 6
        });
    });

    it('play 10 rounds on sample', () => {
        const gameState      = {
            cups: [3,8,9,1,2,5,4,6,7],
            currentCupIndex: 0
        };
        const result = playXRound(gameState, 10); //?
        expect(result).toEqual({
            cups: [5,8,3,7,4,1,9,2,6],
            currentCupIndex: 1
        });
    });

    it('compute result for sample 10 rounds', () => {
        const daySample = readLines('./data/day23-sample.txt');
        const result = getCupsLabeling(daySample[0], 10); //?.
        expect(result).toEqual('92658374');
    })

    it('compute result for sample 100 rounds', () => {
        const daySample = readLines('./data/day23-sample.txt');
        const result = getCupsLabeling(daySample[0], 100); //?.
        expect(result).toEqual('67384529');
    })

    it('compute result for input', () => {
        const dayInput = readLines('./data/day23-input.txt');
        const result = getCupsLabeling(dayInput[0], 100); //?.
        expect(result).toEqual('45798623');
    })
});

describe('day 23 part 2', () => {
    it('convert to linked array', () => {
        const cups = [3,8,9,1,2,5,4,6,7];
        
        const result = convertToLinkedArray(cups); //?.


        expect(result).toEqual([-1,2,5,8,6,4,7,3,9,1]);
    })
    it('convert to ordered array', () => {
        const linkedCups = [-1,2,5,8,6,4,7,3,9,1];
        
        const result = convertToOrderedArray(linkedCups); //?.
        
        shiftOrderedArray(result, 3); //?.

        expect(result).toEqual([3,8,9,1,2,5,4,6,7]);
    })

    it('remove 1 item', () => {
        const cups = [3,8,9,1,2,5,4,6,7];
        
        const linkedCups = convertToLinkedArray(cups); //?.

        const removed = removeNext(linkedCups, 8); //?.

        const result = convertToOrderedArray(linkedCups); //?.
        
        shiftOrderedArray(result, 3); //?.
        
        expect(removed).toEqual(9);
        expect(result).toEqual([3,8,1,2,5,4,6,7]);
    })

    it('insert 1 item', () => {
        const cups = [3,8,1,2,5,4,6,7];
        
        const linkedCups = convertToLinkedArray(cups); //?.

        insertNext(linkedCups, 8, 9); //?.

        const result = convertToOrderedArray(linkedCups); //?.

        shiftOrderedArray(result, 3); //?.
        
        expect(result).toEqual([3,8,9,1,2,5,4,6,7]);
    })

    it('remove and add 3 items', () => {
        const cups = [3,8,9,1,2,5,4,6,7];
        
        const linkedCups = convertToLinkedArray(cups); //?.

        const removed = removeNextThree(linkedCups, 8); //?.
        expect(removed).toEqual([9,1,2]);

        insertNextThree(linkedCups, 4, removed); //?.

        const result = convertToOrderedArray(linkedCups); //?.

        shiftOrderedArray(result, 3); //?.
        
        expect(result).toEqual([3,8,5,4,9,1,2,6,7]);
    })
    
    it('play 1 round on sample', () => {
        const cups = [3,8,9,1,2,5,4,6,7];
        const linkedCups = convertToLinkedArray(cups); //?.

        const gameState = {
            cups: linkedCups,
            currentCup: 3,
            maxCup: 9
        };

        playRoundLinkedArray(gameState); //?.
        
        const result = convertToOrderedArray(gameState.cups); //?.

        shiftOrderedArray(result, 3); //?.

        expect(result).toEqual([3,2,8,9,1,5,4,6,7]);
        expect(gameState.currentCup).toEqual(2);
    })

    it('play 2 rounds on sample', () => {
        const cups = [3,8,9,1,2,5,4,6,7];
        const linkedCups = convertToLinkedArray(cups); //?.

        const gameState = {
            cups: linkedCups,
            currentCup: 3,
            maxCup: 9
        };

        playXRoundLinkedArray(gameState, 2); //?.
        
        const result = convertToOrderedArray(gameState.cups); //?.

        shiftOrderedArray(result, 3); //?.

        expect(result).toEqual([3,2,5,4,6,7,8,9,1]);
        expect(gameState.currentCup).toEqual(5);
    });

     it('play round 4', () => {
        const cups = [7,2,5,8,9,1,3,4,6];
        const linkedCups = convertToLinkedArray(cups); //?.

        const gameState = {
            cups: linkedCups,
            currentCup: 8,
            maxCup: 9
        };

        playRoundLinkedArray(gameState); //?.
        
        const result = convertToOrderedArray(gameState.cups); //?.

        shiftOrderedArray(result, 3); //?.

        expect(result).toEqual([3,2,5,8,4,6,7,9,1]);
        expect(gameState.currentCup).toEqual(4);
    });
    
    it('play 10 rounds on sample', () => {
        const cups = [3,8,9,1,2,5,4,6,7];
        const linkedCups = convertToLinkedArray(cups); //?.

        const gameState = {
            cups: linkedCups,
            currentCup: 3,
            maxCup: 9
        };

        playXRoundLinkedArray(gameState, 10); //?.
        
        const result = convertToOrderedArray(gameState.cups); //?.

        shiftOrderedArray(result, 5); //?.

        expect(result).toEqual([5,8,3,7,4,1,9,2,6]);
        expect(gameState.currentCup).toEqual(8);
    });

    
    it('compute result for sample', () => {
        const daySample = readLines('./data/day23-sample.txt');
        const result = getStars(daySample[0], 10_000_000); //?.

        expect(result).toEqual(149245887792);
    })

    it('compute result for input', () => {
        const dayInput = readLines('./data/day23-input.txt');
        const result = getStars(dayInput[0], 10_000_000); //?.

        expect(result).toEqual(235551949822);
    })
});

