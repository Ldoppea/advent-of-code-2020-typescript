import {isFieldValid} from "./day4-validators";

class Passport {
  public items: Array<string>;

  constructor() {
    this.items = new Array<string>();
  }
}

const extractPasswords = (input: string[]) : Array<Passport> => {
  let passports = [new Passport()];

  for (let line of input) {
    if(line.length == 0) {
      passports.push(new Passport());
    } else {
      let passportItems = line.split(' ');
      passports[passports.length - 1].items.push(...passportItems);
    }
  }

  return passports;
}

const isPasspordValid = (passport: Passport): boolean => {
  let isValid = true;
  const prefixLength = 3;

  const mandatoryItems = [
    'byr',
    'iyr',
    'eyr',
    'hgt',
    'hcl',
    'ecl',
    'pid'
  ];

  const passportItems = passport.items.map(item => item.substring(0, prefixLength));

  isValid = !mandatoryItems.some(mandatoryItem => !passportItems.includes(mandatoryItem));

  return isValid;
}

const isPasspordValidWithRules = (passport: Passport): boolean => {
  return isPasspordValid(passport) && passport.items.every(isFieldValid);
}

type Validator = (passport: Passport) => boolean;
const countValidPassports = (input: string[], validator: Validator): number => {
  const passports = extractPasswords(input);

  return passports.filter(validator).length;
}

export function countValidPassportsWithoutRules(input: string[]): number {
  return countValidPassports(input, isPasspordValid);
}

export function countValidPassportsWithRules(input: string[]): number {
  return countValidPassports(input, isPasspordValidWithRules);
}
