import { getCanonicalDangerousIngredientList, getFoodWithoutAllergens } from "./day21";
import { readLines } from '../helpers/file-reader';

describe('day 21 part 1', () => {
    it('compute result for sample', () => {
        const daySample = readLines('./data/day21-sample.txt');
        const result = getFoodWithoutAllergens(daySample); //?.
        expect(result).toEqual(5);
    })

    it('compute result for input', () => {
        const dayInput = readLines('./data/day21-input.txt');
        const result = getFoodWithoutAllergens(dayInput); //?.
        expect(result).toEqual(2485);
    })
});

describe('day 21 part 2', () => {   
    it('compute result for sample', () => {
        const daySample = readLines('./data/day21-sample.txt');
        const result = getCanonicalDangerousIngredientList(daySample); //?.
        expect(result).toEqual('mxmxvkd,sqjhc,fvjkl');
    })

    it('compute result for input', () => {
        const dayInput = readLines('./data/day21-input.txt');
        const result = getCanonicalDangerousIngredientList(dayInput); //?.
        expect(result).toEqual('bqkndvb,zmb,bmrmhm,snhrpv,vflms,bqtvr,qzkjrtl,rkkrx');
    })
});

