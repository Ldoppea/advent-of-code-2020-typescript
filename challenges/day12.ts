export const NORTH_CODE = 'N';
export const EAST_CODE = 'E';
export const WEST_CODE = 'W';
export const SOUTH_CODE = 'S';
 
export const FORWARD_CODE = 'F';
 
export const RIGHT_CODE = 'R';
export const LEFT_CODE = 'L';

interface ShipPosition  {
  horizontal: number,
  vertical: number,
  direction: string
}

interface Position {
  horizontal: number,
  vertical: number,
}

interface ShipWithWaypoint  {
  ship: Position,
  waypoint: Position
}

const getRotatedDirection = (direction: string, angle: number, clockwise: boolean) => {
  const directions = [
    EAST_CODE,
    SOUTH_CODE,
    WEST_CODE,
    NORTH_CODE
  ];

  if (!clockwise) {
    directions.reverse();
  }

  const currentDirectionIndex = directions.indexOf(direction);
  const numberOfRotations = angle / 90;

  const newDirectionIndex = (currentDirectionIndex + numberOfRotations) % 4;

  return directions[newDirectionIndex];
}

const getDirectionVector = (direction: string) => {
  const directions: { [id: string]: Position; } = {}
  directions[EAST_CODE] = { horizontal: 1, vertical: 0 };
  directions[WEST_CODE] = { horizontal: -1, vertical: 0 };
  directions[NORTH_CODE] = { horizontal: 0, vertical: 1 };
  directions[SOUTH_CODE] = { horizontal: 0, vertical: -1 };

  return directions[direction];
}

const getMovedShip = (shipPosition: ShipPosition, distance: number, direction: string): ShipPosition => {
  const vector = getDirectionVector(direction);

  return {
    ...shipPosition,
    horizontal: shipPosition.horizontal + (vector.horizontal * distance),
    vertical: shipPosition.vertical + (vector.vertical * distance),
  }
}

export function getNewShipPosition(shipPosition: ShipPosition, instruction: string): ShipPosition {
  const [instructionCode, ...value] = instruction.split('');
  const instructionValue = parseInt(value.join(''));

  let newShipPosition = { ...shipPosition };

  switch (instructionCode) {
    case RIGHT_CODE:
      newShipPosition.direction = getRotatedDirection(shipPosition.direction, instructionValue, true);
      break;
    case LEFT_CODE:
      newShipPosition.direction = getRotatedDirection(shipPosition.direction, instructionValue, false);
      break;
    case FORWARD_CODE:
      newShipPosition = getMovedShip(newShipPosition, instructionValue, shipPosition.direction);
      break;
    case EAST_CODE:
    case WEST_CODE:
    case NORTH_CODE:
    case SOUTH_CODE:
      newShipPosition = getMovedShip(newShipPosition, instructionValue, instructionCode);
      break;
    default:
      throw 'Invalid instruction';     
  }

  return newShipPosition;
}

const getRotatedWaypoint = (position: Position, angle: number, clockwise: boolean) => {
  let rotatedPosition = {...position};

  const numberOfRotations = angle / 90;
  const clockwiseMultiplier = clockwise ? 1 : -1;

  for (let i = 1; i <= numberOfRotations; i++) {
    const horizontal = rotatedPosition.horizontal;
    const vertical = rotatedPosition.vertical;
    rotatedPosition.horizontal = vertical * clockwiseMultiplier;
    rotatedPosition.vertical = horizontal * (-clockwiseMultiplier);
  }

  return rotatedPosition;
}

export function getNewShipPositionWithWaypoint(shipPosition: ShipWithWaypoint, instruction: string): ShipWithWaypoint {
  const [instructionCode, ...value] = instruction.split('');
  const intValue = parseInt(value.join(''));

  let newShipPosition = JSON.parse(JSON.stringify(shipPosition));

  switch (instructionCode) {
    case FORWARD_CODE:
      newShipPosition.ship.horizontal += shipPosition.waypoint.horizontal * intValue;
      newShipPosition.ship.vertical += shipPosition.waypoint.vertical * intValue;
      break;
    case EAST_CODE:
      newShipPosition.waypoint.horizontal += intValue;
      break;
    case WEST_CODE:
      newShipPosition.waypoint.horizontal -= intValue;
      break;
    case NORTH_CODE:
      newShipPosition.waypoint.vertical += intValue;
      break;
    case SOUTH_CODE:
      newShipPosition.waypoint.vertical -= intValue;
      break;
    case RIGHT_CODE:
      newShipPosition.waypoint = getRotatedWaypoint(newShipPosition.waypoint, intValue, true)
      break;
    case LEFT_CODE:
      newShipPosition.waypoint = getRotatedWaypoint(newShipPosition.waypoint, intValue, false)
      break;
    default:
      throw 'Invalid instruction';     
  }

  return newShipPosition;
}

export function getShipManhattanDistance(input: string[]): number {
  let shipPosition = {
    horizontal: 0,
    vertical: 0,
    direction: EAST_CODE
  }

  for (let line of input) {
    shipPosition = getNewShipPosition(shipPosition, line)
  }

  return Math.abs(shipPosition.horizontal) + Math.abs(shipPosition.vertical);
}

export function getShipManhattanDistanceWithWaypoint(input: string[]): number {
  let shipPositionWithWaypoint = {
    ship: {
        horizontal: 0,
        vertical: 0
    },
    waypoint: {
        horizontal: 10,
        vertical: 1
    }
  }

  for (let line of input) {
    shipPositionWithWaypoint = getNewShipPositionWithWaypoint(shipPositionWithWaypoint, line)
  }

  return Math.abs(shipPositionWithWaypoint.ship.horizontal) + Math.abs(shipPositionWithWaypoint.ship.vertical);
}
