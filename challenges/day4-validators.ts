const isYearValid = (minYear: number, maxYear: number) => (value: string) : boolean => {
  if (value.length != 4) {
    return false;
  }

  const yearValue = parseInt(value);

  return yearValue >= minYear && yearValue <= maxYear;
}

const isHeightInRange = (value: string, minHeight: number, maxHeight: number): boolean => {
  const heightString = value.slice(0, -2); //?
  const height = parseInt(heightString);

  return height >= minHeight && height <= maxHeight;
}

const isHeightValid = (value: string): boolean => {
  if (value.endsWith('cm')) {
    return isHeightInRange(value, 150, 193);
  } else if (value.endsWith('in')) {
    return isHeightInRange(value, 59, 76);
  }

  return false;
}

const isHexadecimalColorValid = (value: string): boolean => {
  let regexp: RegExp = /#[0-9a-f]{6}/;

  return regexp.test(value);
}

const isEyeColorValid = (value: string): boolean => {
  const authorizedValues = [
    'amb',
    'blu',
    'brn',
    'gry',
    'grn',
    'hzl',
    'oth'
  ];

  return authorizedValues.includes(value);
}

const isPidValid = (value: string): boolean => {
  let regexp: RegExp = /^[0-9]{9}$/;

  return regexp.test(value);
}

const validators: { [id: string]: (value: string) => boolean; } = {
  'byr': isYearValid(1920, 2002),
  'iyr': isYearValid(2010, 2020),
  'eyr': isYearValid(2020, 2030),
  'hgt': isHeightValid,
  'hcl': isHexadecimalColorValid,
  'ecl': isEyeColorValid,
  'pid': isPidValid,
  'cid': () => true
};

export function isFieldValid(rule: string): boolean {
  const [fieldName, fieldValue] = rule.split(':');

  return validators[fieldName](fieldValue);
}
