import {countValidPassportsWithoutRules, countValidPassportsWithRules} from "./day4";
import { readLines } from '../helpers/file-reader';
import { isFieldValid } from './day4-validators';

describe('day 4 part 1', () => {
    it('compute result for sample', () => {
        const daySample = readLines('./data/day4-sample.txt');
        const result = countValidPassportsWithoutRules(daySample);
        expect(result).toEqual(2);
    })

    it('compute result for input', () => {
        const dayInput = readLines('./data/day4-input.txt');
        const result = countValidPassportsWithoutRules(dayInput);
        expect(result).toEqual(260);
    })
});

describe('day 4 part 2', () => {
    it('compute result for sample', () => {
        const dayInput = readLines('./data/day4-sample2.txt');
        const result = countValidPassportsWithRules(dayInput);
        expect(result).toEqual(4);
    })

    it('compute result for input', () => {
        const dayInput = readLines('./data/day4-input.txt');
        const result = countValidPassportsWithRules(dayInput);
        expect(result).toEqual(153);
    })

    describe('validator byr', () => {
        it('should accept byr:2002', () => {
            const field = 'byr:2002';
            const result = isFieldValid(field);
            expect(result).toEqual(true);
        })
        it('should reject byr:2003', () => {
            const field = 'byr:2003';
            const result = isFieldValid(field);
            expect(result).toEqual(false);
        })
        it('should reject byr:1919', () => {
            const field = 'byr:1919';
            const result = isFieldValid(field);
            expect(result).toEqual(false);
        })
    })
    
    describe('validator iyr', () => {
        it('should accept iyr:2015', () => {
            const field = 'iyr:2015';
            const result = isFieldValid(field);
            expect(result).toEqual(true);
        })
        it('should reject iyr:2021', () => {
            const field = 'iyr:2021';
            const result = isFieldValid(field);
            expect(result).toEqual(false);
        })
        it('should reject iyr:2009', () => {
            const field = 'iyr:2009';
            const result = isFieldValid(field);
            expect(result).toEqual(false);
        })
    })
    
    describe('validator eyr', () => {
        it('should accept eyr:2025', () => {
            const field = 'eyr:2025';
            const result = isFieldValid(field);
            expect(result).toEqual(true);
        })
        it('should reject eyr:2031', () => {
            const field = 'eyr:2031';
            const result = isFieldValid(field);
            expect(result).toEqual(false);
        })
        it('should reject eyr:2019', () => {
            const field = 'eyr:2019';
            const result = isFieldValid(field);
            expect(result).toEqual(false);
        })
    })
    
    describe('validator hgt', () => {
        it('should accept hgt:60in', () => {
            const field = 'hgt:60in';
            const result = isFieldValid(field);
            expect(result).toEqual(true);
        })
        it('should accept hgt:190cm', () => {
            const field = 'hgt:190cm';
            const result = isFieldValid(field);
            expect(result).toEqual(true);
        })
        it('should reject hgt:190in', () => {
            const field = 'hgt:190in';
            const result = isFieldValid(field);
            expect(result).toEqual(false);
        })
        it('should reject hgt:190', () => {
            const field = 'hgt:190';
            const result = isFieldValid(field);
            expect(result).toEqual(false);
        })
    })

    describe('validator hcl', () => {
        it('should accept hcl:#123abc', () => {
            const field = 'hcl:#123abc';
            const result = isFieldValid(field);
            expect(result).toEqual(true);
        })
        it('should reject hcl:#123abz', () => {
            const field = 'hcl:#123abz';
            const result = isFieldValid(field);
            expect(result).toEqual(false);
        })
        it('should reject hcl:123abc', () => {
            const field = 'hcl:123abc';
            const result = isFieldValid(field);
            expect(result).toEqual(false);
        })
    })

    describe('validator ecl', () => {
        it('should accept ecl:brn', () => {
            const field = 'ecl:brn';
            const result = isFieldValid(field);
            expect(result).toEqual(true);
        })
        it('should reject ecl:wat', () => {
            const field = 'ecl:wat';
            const result = isFieldValid(field);
            expect(result).toEqual(false);
        })
    })

    describe('validator pid', () => {
        it('should accept pid:000000001', () => {
            const field = 'pid:000000001';
            const result = isFieldValid(field);
            expect(result).toEqual(true);
        })
        it('should reject pid:0123456789', () => {
            const field = 'pid:0123456789';
            const result = isFieldValid(field);
            expect(result).toEqual(false);
        })
    })

    describe('validator cid', () => {
        it('should accept cid:whatever', () => {
            const field = 'cid:whatever';
            const result = isFieldValid(field);
            expect(result).toEqual(true);
        })
    })
});

