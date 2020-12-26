interface GameState {
  cups: number[],
  currentCupIndex: number
}

export function playRound(gameState: GameState): GameState {
  const localCups = [...gameState.cups];
  
  const currentIndex = gameState.currentCupIndex;

  const tail = localCups.splice(0, currentIndex);
  localCups.push(...tail);

  const currentCup = localCups[0];

  const nextThreeCups = localCups.splice(1, 3);

  let destinationCup = currentCup - 1;
  if (destinationCup === 0) {
    destinationCup = Math.max(...gameState.cups);
  }
  while (nextThreeCups.includes(destinationCup)) {
    destinationCup -= 1;
    if (destinationCup === 0) {
      destinationCup = Math.max(...gameState.cups);
    }
  }

  const destinationIndex = localCups.indexOf(destinationCup) + 1;

  localCups.splice(destinationIndex, 0, ...nextThreeCups);

  const head = localCups.splice(localCups.length - currentIndex, currentIndex);
  localCups.unshift(...head);

  return {
    cups: localCups,
    currentCupIndex: (currentIndex + 1) % localCups.length
  };
}

export function playXRound(gameState: GameState, numberOfRounds: number): GameState {
  let currentGameState = gameState;
  for (let i = 0; i < numberOfRounds; i++) {
    currentGameState = playRound(currentGameState);
  }

  return currentGameState;
}

export function getCupsLabeling(input: string, numberOfRounds: number): string {
  const cups = input.split('').map(i => parseInt(i)); //?

  const gameState = {
    cups,
    currentCupIndex: 0
  }
  
  const result = playXRound(gameState, numberOfRounds);

  const indexOf1 = result.cups.indexOf(1);
  
  const tail = result.cups.splice(0, indexOf1);
  result.cups.push(...tail);

  result.cups.shift()

  return result.cups
    .join('');
}





export interface GameStateLinkedArray {
  cups: number[],
  currentCup: number,
  maxCup: number
}

export function convertToLinkedArray(orderedListOfCups: number[]): number[] {
  const linkedArray: number[] = [-1];

  for(let i = 0; i < orderedListOfCups.length; i++) {
    const currentCup = orderedListOfCups[i];
    const nextIndex = (i+1) % orderedListOfCups.length;
    const nextCup = orderedListOfCups[nextIndex];
    linkedArray[currentCup] = nextCup;
  }

  return linkedArray;
}

export function convertToOrderedArray(linkedListOfCups: number[]): number[] {
  const orderedArray: number[] = [];

  const firstItem = linkedListOfCups[1]; //?

  orderedArray.push(firstItem);

  let previousIndex = linkedListOfCups.indexOf(firstItem);

  while (previousIndex !== firstItem) {
    orderedArray.unshift(previousIndex);
    previousIndex = linkedListOfCups.indexOf(previousIndex);
  }

  return orderedArray;
}

export function shiftOrderedArray(orderedListOfCups: number[], startingCup: number) {
  const indexOfStartingCup = orderedListOfCups.indexOf(startingCup);

  const tail = orderedListOfCups.splice(0, indexOfStartingCup);

  orderedListOfCups.push(...tail);
}

export function removeNext(linkedListOfCups:number[], cup: number) {
  const nextCup = linkedListOfCups[cup];
  const nextNextCup = linkedListOfCups[nextCup];

  linkedListOfCups[cup] = nextNextCup;

  return nextCup;
}

export function removeNextThree(linkedListOfCups:number[], cup: number): number[] {
  return [
    removeNext(linkedListOfCups, cup),
    removeNext(linkedListOfCups, cup),
    removeNext(linkedListOfCups, cup)
  ]
}

export function insertNext (linkedListOfCups:number[], cup: number, insertedCup: number) {
  const nextCup = linkedListOfCups[cup];

  linkedListOfCups[cup] = insertedCup;

  linkedListOfCups[insertedCup] = nextCup;
}

export function insertNextThree(linkedListOfCups:number[], cup: number, insertedCups: number[]) {
  insertedCups.reverse().forEach(insertedCup => {
    insertNext(linkedListOfCups, cup, insertedCup)
  })
}

export function playRoundLinkedArray(gameState: GameStateLinkedArray) {
  const nextThree = removeNextThree(gameState.cups, gameState.currentCup); //?

  let destinationCup = gameState.currentCup;
  do {
    destinationCup -= 1;
    if (destinationCup === 0) {
      destinationCup = gameState.maxCup;
    }
  } while (nextThree.includes(destinationCup))

  insertNextThree(gameState.cups, destinationCup, nextThree);

  gameState.currentCup = gameState.cups[gameState.currentCup];
}

export function playXRoundLinkedArray(gameState: GameStateLinkedArray, numberOfRounds: number) {
  for (let i = 0; i < numberOfRounds; i++) {
    playRoundLinkedArray(gameState);
  }
}

export function getStars(input: string, numberOfRounds: number): number {
  const cups = input.split('').map(i => parseInt(i)); //?
  const linkedCups = convertToLinkedArray(cups); //?.

  const macCups = 1_000_000;
  
  const maxCupsFromFile = Math.max(...cups);
  let lastCup = cups[cups.length - 1];
  for (let i = maxCupsFromFile + 1; i <= macCups; i++) {
    insertNext(linkedCups, lastCup, i);
    lastCup = i;
  }

  const gameState = {
    cups: linkedCups,
    currentCup: cups[0],
    maxCup: macCups
  };

  playXRoundLinkedArray(gameState, numberOfRounds);

  const nextCup1 = gameState.cups[1];
  const nextCup2 = gameState.cups[nextCup1];

  return nextCup1 * nextCup2;
}