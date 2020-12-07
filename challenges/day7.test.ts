import { countBagsContainingShinyGold, countBagsInsideShinyGold } from "./day7";
import { BagContent, parseRule } from "./day7-bag-rules";
import { readLines } from '../helpers/file-reader';

describe('day 7 part 1', () => {
    it('compute result for sample', () => {
        const daySample = readLines('./data/day7-sample.txt');
        const result = countBagsContainingShinyGold(daySample);
        expect(result).toEqual(4);
    })

    it('compute result for input', () => {
        const dayInput = readLines('./data/day7-input.txt');
        const result = countBagsContainingShinyGold(dayInput);
        expect(result).toEqual(272);
    })

    it('compute row for light red bags', () => {
        const bagRule = parseRule('light red bags contain 1 bright white bag, 2 muted yellow bags.');
        expect(bagRule.bagColor).toEqual('light red');
        expect(bagRule.subBags).toEqual([
            new BagContent('bright white', 1),
            new BagContent('muted yellow', 2),
        ]);
    });
    it('compute row for bright white bags', () => {
        const bagRule = parseRule('bright white bags contain 1 shiny gold bag.');
        expect(bagRule.bagColor).toEqual('bright white');
        expect(bagRule.subBags).toEqual([
            new BagContent('shiny gold', 1)
        ]);
    });
    it('compute row for dotted black bags', () => {
        const bagRule = parseRule('dotted black bags contain no other bags.');
        expect(bagRule.bagColor).toEqual('dotted black');
        expect(bagRule.subBags).toEqual([]);
    });
});

describe('day 7 part 2', () => {
    it('compute result for sample', () => {
        const daySample = readLines('./data/day7-sample.txt');
        const result = countBagsInsideShinyGold(daySample);
        expect(result).toEqual(32);
    })

    it('compute result for input', () => {
        const dayInput = readLines('./data/day7-input.txt');
        const result = countBagsInsideShinyGold(dayInput);
        expect(result).toEqual(172246);
    })
});

