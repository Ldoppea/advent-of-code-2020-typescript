export function getValidPasswords(passwords: string[]): string[] {
  return passwords.filter(password => {
    const [rule, phrase] = password.split(':');

    const [ruleMinMax, ruleLetter] = rule.split(' ');
    
    const [minOccurences, maxOccurences] = ruleMinMax.split('-')

    const passwordLetters = phrase.split('');

    const numberOfOccurences = passwordLetters.filter(letter => letter == ruleLetter).length;

    return numberOfOccurences >= parseInt(minOccurences) && numberOfOccurences <= parseInt(maxOccurences);
  })
}

export function getValidPasswordsBasedOnPosition(passwords: string[]): string[] {
  return passwords.filter(password => {
    const [rule, phrase] = password.split(': ');

    const [rulePositions, ruleLetter] = rule.split(' ');

    const [rulePosition1, rulePosition2] = rulePositions.split('-')

    const passwordLetters = phrase.split('');

    const letter1 = passwordLetters[parseInt(rulePosition1) - 1];
    const letter2 = passwordLetters[parseInt(rulePosition2) - 1];

    return (letter1 == ruleLetter) !== (letter2 == ruleLetter);
  })
}
