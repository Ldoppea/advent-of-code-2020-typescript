import { isEven } from "../helpers/math";

interface Tile {
  posX: number,
  posY: number
}

export function parseDirections(directions: string) {
  let directionsArray = directions.split('');
  let parsedDirections: string[] = [];

  while (directionsArray.length > 0) {
    let next = directionsArray.shift()!;

    if ((next === 's' || next === 'n') && (directionsArray[0] === 'w' || directionsArray[0] === 'e')) {
      next += directionsArray.shift();
    }

    parsedDirections.push(next);
  }

  return parsedDirections;
}

export function getTileFromDirections(directions: string): Tile {
  let directionsArray = parseDirections(directions);

  let posX = 0;
  let posY = 0;

  directionsArray.forEach(direction => {
    switch (direction) {
      case 'e':
        posX += 1;
        break;
      case 'w':
        posX -= 1;
        break;
      case 'sw':
        posX += isEven(posY) ? 0 : -1;
        posY += 1;
        break;
      case 'se':
        posX += isEven(posY) ? 1 : 0;
        posY += 1;
        break;
      case 'nw':
        posX += isEven(posY) ? 0 : -1;
        posY -= 1;
        break;
      case 'ne':
        posX += isEven(posY) ? 1 : 0;
        posY -= 1;
        break;
      default:
        direction
        throw 'operation impossible';
    }
  });

  return {
    posX,
    posY
  }
}

const tileAsString = (tile: Tile): string => {
  return JSON.stringify(tile);
}

const stringAsTile = (tile: string): Tile => {
  return JSON.parse(tile) as Tile;
}

const getBlacksTiles = (input: string[]): Set<string> => {
  const coordinates = input
    .map(line => getTileFromDirections(line))
    .map(coordinate => tileAsString(coordinate));

  let blacks = new Set<string>();

  coordinates.forEach(coordinate => {
    if (blacks.has(coordinate)) {
      blacks.delete(coordinate);
    } else {
      blacks.add(coordinate);
    }
  })

  return blacks;
}

export function countBlackTiles(input: string[]): number {
  const blackTiles = getBlacksTiles(input);

  return blackTiles.size;
}

const getUniqueTiles = (tiles: Tile[]): Tile[] => {
  return [...new Set(tiles.map(tile => tileAsString(tile)))].map(tile => stringAsTile(tile) as Tile);
}

const getBlackTilesNeighbors = (tile: Tile, blackTiles: Tile[]) => {
  const minX = isEven(tile.posY) ? tile.posX : tile.posX - 1;
  const maxX = isEven(tile.posY) ? tile.posX + 1 : tile.posX;

  return blackTiles.filter(candidate => {
    return ( candidate.posY === tile.posY && (candidate.posX === tile.posX - 1 || candidate.posX === tile.posX + 1))
        || ((candidate.posY === tile.posY - 1 || candidate.posY === tile.posY + 1) && (candidate.posX === minX || candidate.posX === maxX));
  });
}

const getAllNeighborsCoordinates = (tile: Tile): Tile[] => {
  const minX = isEven(tile.posY) ? tile.posX : tile.posX - 1;
  const maxX = isEven(tile.posY) ? tile.posX + 1 : tile.posX;

  const posY = tile.posY;
  const posX = tile.posX;

  return [
    { posX: posX + 1, posY: posY     }, //E
    { posX: posX - 1, posY: posY     }, //W
    { posX: maxX,     posY: posY - 1 }, //NE
    { posX: minX,     posY: posY - 1 }, //NW
    { posX: maxX,     posY: posY + 1 }, //SE
    { posX: minX,     posY: posY + 1 }  //SW
  ]
}

export function getTilesThatShouldGoBlack(blackTiles: Tile[]) {
  const whiteTiles = blackTiles
    .flatMap(getAllNeighborsCoordinates)
    .filter(tile => !blackTiles.some(blackTile => blackTile.posX === tile.posX && blackTile.posY === tile.posY));
  
  const shouldTurnBlack = whiteTiles
    .filter(whiteNeighbor => {
      const blackNeighbors = getBlackTilesNeighbors(whiteNeighbor, blackTiles);

      return blackNeighbors.length === 2;
    });

  const shouldTurnBlackUnique = getUniqueTiles(shouldTurnBlack);

  return shouldTurnBlackUnique;
}

export function getTilesThatShouldGoWhite(blackTiles: Tile[]) {
  const shouldTurnWhite = blackTiles
    .filter(black => {
      const neighbors = getBlackTilesNeighbors(black, blackTiles);

      return neighbors.length === 0 || neighbors.length > 2;
    });

  const shouldTurnWhiteUnique = getUniqueTiles(shouldTurnWhite);

  return shouldTurnWhiteUnique;
}

export function flipXDaysAndCountBlackTiles(input: string[], numberOfDays: number): number {
  const blackTiles = getBlacksTiles(input);

  for (let i = 0; i < numberOfDays; i++) { 
    const blacksArray = [...blackTiles].map(tile => stringAsTile(tile) as Tile);

    const shouldGoWhite = getTilesThatShouldGoWhite(blacksArray);
    const shouldGoBlack = getTilesThatShouldGoBlack(blacksArray);
  
    shouldGoWhite.forEach(tile => {
      const tileString = tileAsString(tile);
      if (blackTiles.has(tileString)) {
        blackTiles.delete(tileString);
      } else {
        throw 'already white';
      }
    });
  
    shouldGoBlack
      .forEach(tile => {
        const tileString = tileAsString(tile);
        if (!blackTiles.has(tileString)) {
          blackTiles.add(tileString);
        } else {
          throw 'already black';
        }
      });
  }

  return blackTiles.size;
}