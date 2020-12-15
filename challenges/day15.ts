export function get2020thNumber(input: string, targetTurn: number): number {
  let initialNumbers = input.split(',').map(num => parseInt(num));

  let spokenHistoric = new Map();

  initialNumbers.forEach((value, index) => {
    spokenHistoric.set(value, index + 1);
  });

  let previousSpoken = initialNumbers[initialNumbers.length - 1];

  for (let currentTurn = initialNumbers.length + 1; currentTurn <= targetTurn; currentTurn++) {
    let previousTurn = currentTurn - 1;

    let lastSpokenTurn = spokenHistoric.get(previousSpoken);

    spokenHistoric.set(previousSpoken, previousTurn)

    let currentSpeak = 0;

    if (lastSpokenTurn) {
      currentSpeak = previousTurn - lastSpokenTurn;
    }

    previousSpoken = currentSpeak;
  }

  return previousSpoken;
}