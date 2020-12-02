export function getValidPasswords(passwords: string[]): string[] {
  return passwords.filter(password => {
    const passwordsParts = password.split(' ');

    const passwordMinMax = passwordsParts[0].split('-');
    const ruleLetter = passwordsParts[1].slice(0, -1);
    const passwordLetters = passwordsParts[2].split('');

    const minOccurences = +passwordMinMax[0];
    const maxOccurences = +passwordMinMax[1];

    const numberOfOccurences = passwordLetters.filter(letter => letter == ruleLetter).length;

    return numberOfOccurences >= minOccurences && numberOfOccurences <= maxOccurences;
  })
}

export function getValidPasswordsBasedOnPosition(passwords: string[]): string[] {
  return passwords.filter(password => {
    const passwordsParts = password.split(' ');

    const rules = passwordsParts[0].split('-');
    const ruleLetter = passwordsParts[1].slice(0, -1);
    const passwordLetters = passwordsParts[2].split('');

    const rulePosition1 = +rules[0] - 1;
    const rulePosition2 = +rules[1] - 1;

    const letter1 = passwordLetters[rulePosition1];
    const letter2 = passwordLetters[rulePosition2];

    return (letter1 == ruleLetter) !== (letter2 == ruleLetter);
  })
}
