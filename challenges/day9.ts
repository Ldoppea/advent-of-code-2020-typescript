export function getWeaknessNumber(input: string[], preambleSize: number): number {
  const numbers = input.map(line => parseInt(line));

  const firstNotSum = numbers.find((codeNum, codeNumIndex) => {
    if (codeNumIndex < preambleSize) return false;

    const fivePreviousCodeNum = numbers.slice(codeNumIndex - preambleSize, codeNumIndex);

    return !fivePreviousCodeNum.some(previous1 => fivePreviousCodeNum.some(previous2 => (previous2 !== previous1) && (previous1 + previous2 === codeNum)));
  });

  return firstNotSum!;
}

export function getEncryptionWeaknessNumbers(input: string[], preambleSize: number): number {
  const numbers = input.map(line => parseInt(line));

  const weaknessNumber = getWeaknessNumber(input, preambleSize);

  let firstIndex = 0;
  let lastIndex = 0;

  for (let firstNumberIndexStr in numbers) {
    if(firstIndex !== 0) break;

    const firstNumberIndex = parseInt(firstNumberIndexStr);

    let sum = numbers[firstNumberIndex];
    let nextNumbers = numbers.slice(firstNumberIndex + 1);
    
    for (let nextNumberIndexStr in nextNumbers) {
      const nextNumberIndex = parseInt(nextNumberIndexStr);

      sum += nextNumbers[nextNumberIndex];

      if (sum > weaknessNumber) {
        break;
      }

      if (sum === weaknessNumber) {
        firstIndex = firstNumberIndex;
        lastIndex = firstNumberIndex + nextNumberIndex + 1;
        break;
      }
    }
  }

  const range = numbers.slice(firstIndex, lastIndex + 1);

  const min = Math.min(...range);
  const max = Math.max(...range);

  return min + max;
}
