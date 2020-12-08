const ACC = 'acc';
const JMP = 'jmp';
const NOP = 'nop';

interface GameResult {
  accumulator: number,
  reachedEnd: boolean
}

interface GameInstruction {
  hasBeenExecuted: boolean;
  verb: string;
  count: number;
}

const runGame = (instructions: GameInstruction[]): GameResult => {
  let hasLooped = false;
  let currentInstruction = 0;
  let accumulator = 0;

  while(!hasLooped && currentInstruction < instructions.length) {
    const instruction = instructions[currentInstruction]; 

    if(instruction.hasBeenExecuted) {
      hasLooped = true;
    } else {
      instruction.hasBeenExecuted = true;

      if (instruction.verb == ACC) {
        accumulator += instruction.count;
        currentInstruction += 1;
      } else if (instruction.verb == JMP) {
        currentInstruction += instruction.count;
      } else {
        currentInstruction += 1;
      }
    }
  }

  return {
    accumulator,
    reachedEnd: !hasLooped
  };
}

const extratGameInstructions = (input: string[]): GameInstruction[] => {
  return input.map(line => { 
    let [verb, count] = line.split(' ');
    return { 
      hasBeenExecuted: false, 
      verb, 
      count: parseInt(count) 
    }; 
  });
}

export function getAccumulatorValueAtLoop(input: string[]): number {
  let instructions = extratGameInstructions(input);

  return runGame(instructions).accumulator;
}

export function getAccumulatorValueAtEnd(input: string[]): number {
  let currentReplacedIndex = 0
  let reachedEnd = false;
  let accumulator = 0;

  while(!reachedEnd && currentReplacedIndex < input.length) {
    let instructions = extratGameInstructions(input);
    
    let currentInstruction = instructions[currentReplacedIndex];
    
    if(currentInstruction.verb !== ACC && currentInstruction.count !== 0) {
      currentInstruction.verb = currentInstruction.verb === NOP ? JMP : NOP;

      const result = runGame(instructions);

      reachedEnd = result.reachedEnd;
      accumulator = result.accumulator;
    }

    currentReplacedIndex++;
  }

  return accumulator;
}