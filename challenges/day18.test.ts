import { calculate, calculateAdvanced, calculateAllAndSum, calculateAllAndSumAdvanced, groupFormula, splitFormula } from "./day18";
import { readLines } from '../helpers/file-reader';

describe('day 18 part 1', () => {
    it('compute result for 1 + 2 * 3 + 4 * 5 + 6', () => {
        const formula = '1 + 2 * 3 + 4 * 5 + 6';
        const result = calculate(formula); //?.
        expect(result).toEqual(71);
    })

    it('compute result for 1 + (2 * 3)', () => {
        const formula = '1 + (2 * 3)';
        const result = calculate(formula); //?.
        expect(result).toEqual(7);
    })

    it('compute result for 1 + (2 * 3) + (4 * 11)', () => {
        const formula = '1 + (2 * 3) + (4 * 11)';
        const result = calculate(formula); //?.
        expect(result).toEqual(51);
    })

    it('compute result for 1 + (4 * (5 + 6))', () => {
        const formula = '1 + (4 * (5 + 6))';
        const result = calculate(formula); //?.
        expect(result).toEqual(45);
    })

    it('compute result for 1 + (2 * 3) + (4 * (5 + 6))', () => {
        const formula = '1 + (2 * 3) + (4 * (5 + 6))';
        const result = calculate(formula); //?.
        expect(result).toEqual(51);
    })

    it('compute result for sample', () => {
        const daySample = readLines('./data/day18-sample.txt');
        const result = calculateAllAndSum(daySample); //?.
        expect(result).toEqual(71 + 51 + 26 + 437 + 12240 + 13632);
    })

    it('compute result for input', () => {
        const dayInput = readLines('./data/day18-input.txt');
        const result = calculateAllAndSum(dayInput); //?.
        expect(result).toEqual(21347713555555);
    })
});

describe('day 18 part 2', () => {
    it('group for 1 + 2 * 3 + 4 * 5 + 6', () => {
        const formula = splitFormula('1 + 2 * 3 + 4 * 5 + 6');
        const result = groupFormula(formula); //?.
        expect(result).toEqual([
            { numberOfOperands: 1, operator: '+', operandLeaf: 1, operandGroup: [] },
            { numberOfOperands: 2, operator: '+', operandLeaf: 2, operandGroup: [] },
            { numberOfOperands: 2, operator: '*', operandLeaf: 3, operandGroup: [] },
            { numberOfOperands: 2, operator: '+', operandLeaf: 4, operandGroup: [] },
            { numberOfOperands: 2, operator: '*', operandLeaf: 5, operandGroup: [] },
            { numberOfOperands: 2, operator: '+', operandLeaf: 6, operandGroup: [] }
        ]);
    })

    it('group for 1 + (2 * 3)', () => {
        const formula = splitFormula('1 + (2 * 3)');
        const result = groupFormula(formula); //?.
        expect(result).toEqual([
            { numberOfOperands: 1, operator: '+', operandLeaf: 1, operandGroup: [] },
            { numberOfOperands: 6, operator: '+', operandLeaf: undefined, operandGroup: [
                { numberOfOperands: 1, operator: '+', operandLeaf: 2, operandGroup: [] },
                { numberOfOperands: 2, operator: '*', operandLeaf: 3, operandGroup: [] }
              ]
            } 
          ]);
    })

    it('group for 1 + (2 * 3) + (4 * 11)', () => {
        const formula = splitFormula('1 + (2 * 3) + (4 * 11)');
        const result = groupFormula(formula); //?.
        expect(result).toEqual([
            { numberOfOperands: 1, operator: '+', operandLeaf: 1, operandGroup: [] },
            { numberOfOperands: 6, operator: '+', operandLeaf: undefined, operandGroup: [
                { numberOfOperands: 1, operator: '+', operandLeaf: 2, operandGroup: [] },
                { numberOfOperands: 2, operator: '*', operandLeaf: 3, operandGroup: [] }
              ]
            },
            { numberOfOperands: 6, operator: '+', operandLeaf: undefined, operandGroup: [
                { numberOfOperands: 1, operator: '+', operandLeaf: 4, operandGroup: [] },
                { numberOfOperands: 2, operator: '*', operandLeaf: 11, operandGroup: [] }
              ]
            }
          ]);
    })

    it('group for 1 + (2 * 3) + (4 * (5 + 6))', () => {
        const formula = splitFormula('1 + (2 * 3) + (4 * (5 + 6))');
        const result = groupFormula(formula); //?.
        expect(result).toEqual([
            { numberOfOperands: 1,          operator: '+',  operandLeaf: 1,             operandGroup: [] },
            { numberOfOperands: 6,          operator: '+',  operandLeaf: undefined,     operandGroup: [
                { numberOfOperands: 1,      operator: '+',  operandLeaf: 2,             operandGroup: [] },
                { numberOfOperands: 2,      operator: '*',  operandLeaf: 3,             operandGroup: [] }
              ]
            },
            { numberOfOperands: 10,          operator: '+',  operandLeaf: undefined,     operandGroup: [
                { numberOfOperands: 1,      operator: '+',  operandLeaf: 4,             operandGroup: [] },
                { numberOfOperands: 6,      operator: '*',  operandLeaf: undefined,     operandGroup: [
                    { numberOfOperands: 1,  operator: '+',  operandLeaf: 5,             operandGroup: [] },
                    { numberOfOperands: 2,  operator: '+',  operandLeaf: 6,             operandGroup: [] }
                  ]
                }
              ]
            },
          ]);
    })

    it('compute result for 1 + 2 * 3 + 4 * 5 + 6', () => {
        const formula = '1 + 2 * 3 + 4 * 5 + 6';
        const result = calculateAdvanced(formula); //?.
        expect(result).toEqual(231);
    })

    it('compute result for 1 + (2 * 3) + (4 * (5 + 6))', () => {
        const formula = '1 + (2 * 3) + (4 * (5 + 6))';
        const result = calculateAdvanced(formula); //?.
        expect(result).toEqual(51);
    })

    it('compute result for 2 * 3 + (4 * 5)', () => {
        const formula = '2 * 3 + (4 * 5)';
        const result = calculateAdvanced(formula); //?.
        expect(result).toEqual(46);
    })

    it('compute result for sample', () => {
        const daySample = readLines('./data/day18-sample.txt');
        const result = calculateAllAndSumAdvanced(daySample); //?.
        expect(result).toEqual(231 + 51 + 46 + 1445 + 669060 + 23340);
    })

    it('compute result for input', () => {
        const dayInput = readLines('./data/day18-input.txt');
        const result = calculateAllAndSumAdvanced(dayInput); //?.
        expect(result).toEqual(275011754427339);
    })
});

