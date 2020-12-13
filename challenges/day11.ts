const OCCUPIED_SEAT = '#';
const EMPTY_SEAT = 'L';
const FLOOR = '.';

interface Position {
  x: number,
  y: number
}

interface Vector {
  x: number,
  y: number
}

type AdjacentSeatFinder = (input: string[], position: Position, direction: Vector) => string;

export function getAdjacentSeat(input: string[], position: Position, direction: Vector): string {
  const adjacentLineIndex = position.y + direction.y;
  const adjacentColumnIndex = position.x + direction.x;
  
  const newPosition = { 
    x: position.x + direction.x,
    y: position.y + direction.y
  }

  if(newPosition.y < 0 || newPosition.y >= input.length || newPosition.x < 0 || newPosition.x >= input[newPosition.y].length){
    return FLOOR;
  }

  return input[adjacentLineIndex][adjacentColumnIndex];
}


export function getFirstSeatAtDirection(input: string[], position: Position, direction: Vector): string {
  let seat: string = FLOOR;

  let newPosition = position;
  while(true) {
    newPosition = { 
      x: newPosition.x + direction.x,
      y: newPosition.y + direction.y
    }

    if(newPosition.y < 0 || newPosition.y >= input.length || newPosition.x < 0 || newPosition.x >= input[newPosition.y].length) break;

    const place = input[newPosition.y][newPosition.x];

    if (place !== FLOOR) {
      seat = place;
      break;
    }
  }

  return seat;
}

export function computeRound(input: string[], adjacentSeatFinder: AdjacentSeatFinder, maximumAdjacentOccupiedSeats: number): string[] {
  return input.map((line, lineIndex) => {
    return line
      .split('')
      .map((seat, seatIndex) => {
        if (seat === FLOOR) {
          return seat;
        }

        let numberOfAdjacentOccupiedSeat = 0;
        for (let iLine = -1; iLine <= 1; iLine++) {
          for (let iColumn = -1; iColumn <= 1; iColumn ++) {
            if(iLine === 0 && iColumn === 0) continue;

            const position = { x: seatIndex, y: lineIndex};
            const direction = { x: iColumn, y: iLine }
            const adjacentSeat = adjacentSeatFinder(input, position, direction);

            if (adjacentSeat === OCCUPIED_SEAT) {
              numberOfAdjacentOccupiedSeat++;
            }
          }
        }

        if (numberOfAdjacentOccupiedSeat === 0) {
          return OCCUPIED_SEAT;
        } else if (numberOfAdjacentOccupiedSeat >= maximumAdjacentOccupiedSeats) {
          return EMPTY_SEAT;
        } else {
          return seat;
        }
      })
      .join('');
  })
}

export function countNumberOfOccupiedSeatsAfterStabilization(input: string[]): number {
  let lastMap: string[] = [];
  let newMap: string[] = input;

  while(JSON.stringify(lastMap) !== JSON.stringify(newMap)) {
    lastMap = [...newMap];
    newMap = computeRound(lastMap, getAdjacentSeat, 4);
  }

  return newMap
    .join('')
    .split('')
    .filter(seat => seat === OCCUPIED_SEAT)
    .length;
}

export function countNumberOfOccupiedSeatsAfterStabilizationWithRayCast(input: string[]): number {
  let lastMap: string[] = [];
  let newMap: string[] = input;

  while(JSON.stringify(lastMap) !== JSON.stringify(newMap)) {
    lastMap = [...newMap];
    newMap = computeRound(lastMap, getFirstSeatAtDirection, 5);
  }

  return newMap
    .join('')
    .split('')
    .filter(seat => seat === OCCUPIED_SEAT)
    .length;
}
