import { multiply } from "../helpers/math";

interface Tile {
  tileId: number,
  tileContent: string[][],
  borders: string[],
  posX?: number,
  posY?: number
}
interface TileWithNeighbors {
  tile: Tile,
  neighbors: Tile[]
}

export const TOP = 0;
export const LEFT = 1;
export const BOTTOM = 2;
export const RIGHT = 3;

const parseTiles = (file: string): Tile[] => {
  const tiles = file
  .split('\n\n')
  .map(tile => {
    const [tileName, tileContent] = tile.split(':\n');
    const tileIdString = tileName.substring('Tile '.length);
    return {
      tileId: parseInt(tileIdString),
      tileContent: tileContent.split('\n')
    }
  })
  .map((tile): Tile => {
    const tileTop = tile.tileContent[0];
    const tileBottom = tile.tileContent[tile.tileContent.length - 1];
    const tileLeft = tile.tileContent.map(line => line[0]).join('');
    const tileRight = tile.tileContent.map(line => line[line.length - 1]).join('');
    const tileTopFlip = tileTop.split('').reverse().join('');
    const tileBottomFlip = tileBottom.split('').reverse().join('');
    const tileLeftFlip = tileLeft.split('').reverse().join('');
    const tileRightFlip = tileRight.split('').reverse().join('');

    return {
      tileId: tile.tileId,
      tileContent: tile.tileContent.map(row => row.split('')),
      borders: [
        tileTop,
        tileBottom,
        tileLeft,
        tileRight,
        tileTopFlip,
        tileBottomFlip,
        tileLeftFlip,
        tileRightFlip
      ]
    }
  })

  return tiles;
}

const countCommonBorders = (tile1: Tile, tile2: Tile): number => {
  const commonBorders = tile1.borders.filter(tile1Border => tile2.borders.includes(tile1Border));

  return commonBorders.length;
}

const matchTiles = (tiles: Tile[]): TileWithNeighbors[] => {
  const tilesMatched = tiles.map(tile => {
    const otherTiles = tiles.filter(otherTile => otherTile.tileId !== tile.tileId);
    
    const matchingTiles = otherTiles.filter(otherTile => {
      return countCommonBorders(tile, otherTile) > 0;
    })

    return {
      tile: tile,
      neighbors: matchingTiles,
    }
  })

  return tilesMatched;
}

const findCorners = (tiles: Tile[]) => {
  return matchTiles(tiles).filter(tile => tile.neighbors.length === 2);
}

export function getCorners(file: string): number {
  const tiles = parseTiles(file);

  const borders = findCorners(tiles);

  const bordersId = borders.map(border => border.tile.tileId);

  return multiply(bordersId);
}

const rotateClockwise = (tileContent: string[][]): string[][] => {
  let result: string[][] = [];
  
  for (let row = 0; row < tileContent.length; row++) {
    const rowContent = tileContent[row];
    
    for (let column = 0; column < rowContent.length; column++) {
      const value = rowContent[column];

      const newRow = column;
      const newColum = (tileContent.length - 1) - row;

      result[newRow] = result[newRow] || [];
      result[newRow][newColum] = value;
    }
  }

  return result;
}

export function rotateTileContent(tileContent: string[][], numberOfRotations: number, flipX: boolean, flipY: boolean) {
  let rotatedTileContent = tileContent.map(row => row.map(column => column));

  if (flipX) {
    rotatedTileContent = rotatedTileContent.map(row => row.reverse())
  }
  
  if (flipY) {
    rotatedTileContent = rotatedTileContent.reverse();
  }

  for (let i = 0; i < numberOfRotations; i++) {
    rotatedTileContent = rotateClockwise(rotatedTileContent)
  };

  return rotatedTileContent;
}

const getTileContentSide = (tileContent: string[][], direction: number): string[] => {
  let side: string[] = [];

  switch(direction) {
    case TOP:
      side = tileContent[0];
      break;
    case LEFT:
      side = tileContent.map(row => row[0]);
      break;
    case BOTTOM:
      side = tileContent[tileContent.length - 1];
      break;
    case RIGHT:
    default:
      side = tileContent.map(row => row[row.length - 1]);
      break;
  }

  return side;
}
export function getMatching2(tile: Tile, placedTileBorder: string[], direction: number, numberOfRotations: number, flipX: boolean, flipY: boolean) {
  let tileContent = rotateTileContent(tile.tileContent, numberOfRotations, flipX, flipY);

  let tileOppositeBorder = getTileContentSide(tileContent, direction);

  if (placedTileBorder.join('') === tileOppositeBorder.join('')) {
    return {
      ...tile,
      tileContent: tileContent
    }
  } else {
    return undefined;
  }
}

export function getMatching(tile: Tile, placedTile: Tile, direction: number) {
  let placedTileBorder = getTileContentSide(placedTile.tileContent, direction);
  const oppositeDirection = (direction + 2) % 4;

  return getMatching2(tile, placedTileBorder, oppositeDirection, 0, false,  false)
      || getMatching2(tile, placedTileBorder, oppositeDirection, 1, false,  false)
      || getMatching2(tile, placedTileBorder, oppositeDirection, 2, false,  false)
      || getMatching2(tile, placedTileBorder, oppositeDirection, 3, false,  false)
      || getMatching2(tile, placedTileBorder, oppositeDirection, 0, true,   false)
      || getMatching2(tile, placedTileBorder, oppositeDirection, 1, true,   false)
      || getMatching2(tile, placedTileBorder, oppositeDirection, 2, true,   false)
      || getMatching2(tile, placedTileBorder, oppositeDirection, 3, true,   false)
}

const tryPlace = (tile: Tile, placedTile: Tile, row: number, column: number, direction: number) => {
  let matchingTile = getMatching(tile, placedTile, direction);

  if (matchingTile) {
    return {
      ...matchingTile,
      posX: column,
      posY: row
    }
  }

  return undefined;
}

export function getImage(file: string): string[][] {
  let tiles: TileWithNeighbors[] = matchTiles(parseTiles(file));

  const numberOfTiles = tiles.length;
  let currentTile = tiles.shift()!;
  currentTile.tile.posX = 0;
  currentTile.tile.posY = 0;
  let imageTilesIds = new Set([currentTile.tile.tileId])
  let imageTiles: TileWithNeighbors[] = [currentTile]

  while (imageTiles.length < numberOfTiles) {
    let tileToBeMatched = imageTiles
      .flatMap(tiles => tiles)
      .find(tile => {
        return tile.neighbors.filter(borderTile => !imageTilesIds.has(borderTile.tileId)).length > 0;
      });

    if (tileToBeMatched) {
      const row = tileToBeMatched.tile.posY!;
      const column = tileToBeMatched.tile.posX!;

      const neighborToBePlaced = tileToBeMatched.neighbors.filter(neighbor => !imageTilesIds.has(neighbor.tileId));
      neighborToBePlaced.forEach(neighbor => {
        let placed = tryPlace(neighbor, tileToBeMatched!.tile, row - 1, column, TOP)
                  || tryPlace(neighbor, tileToBeMatched!.tile, row + 1, column, BOTTOM)
                  || tryPlace(neighbor, tileToBeMatched!.tile, row, column - 1, LEFT)
                  || tryPlace(neighbor, tileToBeMatched!.tile, row, column + 1, RIGHT)

        if(placed) {
          const tileToBeAdded = tiles.find(tile => tile.tile.tileId === placed!.tileId)!;
          tileToBeAdded.tile = placed!;
          
          imageTiles.push(tileToBeAdded)
          imageTilesIds.add(tileToBeAdded.tile.tileId)
          tiles = tiles.filter(tile => tile.tile.tileId !== tileToBeAdded.tile.tileId)
        }
      });
    }
  }

  const minX = Math.min(...imageTiles.map(tile => tile.tile.posX!));
  const minY = Math.min(...imageTiles.map(tile => tile.tile.posY!));

  const imageTilesOffset = imageTiles.map(tile => {
    return {
      ...tile.tile,
      posX: tile.tile.posX! - minX,
      posY: tile.tile.posY! - minY,
    }
  });
  
  const maxX = Math.max(...imageTilesOffset.map(tile => tile.posX!));
  const maxY = Math.max(...imageTilesOffset.map(tile => tile.posY!));

  const imageTilesArray: Tile[][] = [];

  for (let row = 0; row <= maxY; row++) {
    for (let column = 0; column <= maxX; column++) {
      let tileAtPosition = imageTilesOffset.find(tile => tile.posX === column && tile.posY === row)!;

      imageTilesArray[row] = imageTilesArray[row] || [];
      imageTilesArray[row][column] = tileAtPosition;
    }
  }

  const image = imageTilesArray
    .flatMap(row => {
      let lines: string[][] = [];
      const rowsContent = row
        .map(column => column.tileContent)
        .map(tileContent => {
          return tileContent
            .map(line => {
              return line
                .splice(1, line.length - 2);
            })
            .splice(1, tileContent.length - 2);
        });
      for (let i = 0; i < rowsContent[0].length; i++) {
        lines.push([]);
        for (let j = 0; j < rowsContent.length; j++) {
          lines[i].push(...rowsContent[j][i]);
        }
      }

      return lines;
    })

  return image;
}

export function countSeaMonstersInImage(image: string[][]) {
  let numberOfMonsters = 0;
  const monsterWidth = 20;
  const monsterHeight = 3;
  
  for (let row = 0; row < image.length - monsterHeight + 1; row++) {
    for (let column = 0; column < image[0].length - monsterWidth + 1; column++) {
      const pixel1  = image[row    ][column + 18];
      const pixel2  = image[row + 1][column     ];
      const pixel3  = image[row + 1][column + 5 ];
      const pixel4  = image[row + 1][column + 6 ];
      const pixel5  = image[row + 1][column + 11];
      const pixel6  = image[row + 1][column + 12];
      const pixel7  = image[row + 1][column + 17];
      const pixel8  = image[row + 1][column + 18];
      const pixel9  = image[row + 1][column + 19];
      const pixel10 = image[row + 2][column + 1 ];
      const pixel11 = image[row + 2][column + 4 ];
      const pixel12 = image[row + 2][column + 7 ];
      const pixel13 = image[row + 2][column + 10];
      const pixel14 = image[row + 2][column + 13];
      const pixel15 = image[row + 2][column + 16];

      if ( pixel1  === '#'
        && pixel2  === '#'
        && pixel3  === '#'
        && pixel4  === '#'
        && pixel5  === '#'
        && pixel6  === '#'
        && pixel7  === '#'
        && pixel8  === '#'
        && pixel9  === '#'
        && pixel10 === '#'
        && pixel11 === '#'
        && pixel12 === '#'
        && pixel13 === '#'
        && pixel14 === '#'
        && pixel15 === '#') {
          numberOfMonsters++;
        }
    }
  }

  return numberOfMonsters;
}

export function countSeaMonstersInFile(file: string): number {
  const image = getImage(file);

  const numberOfMonsters1 = countSeaMonstersInImage(image);

  const rotatedImage = rotateClockwise(image);
  const numberOfMonsters2 = countSeaMonstersInImage(rotatedImage);

  const rotatedImage2 = rotateClockwise(rotatedImage);
  const numberOfMonsters3 = countSeaMonstersInImage(rotatedImage2);

  const rotatedImage3 = rotateClockwise(rotatedImage2);
  const numberOfMonsters4 = countSeaMonstersInImage(rotatedImage3);

  const flipedImage = image.map(row => row.reverse());
  const numberOfMonsters5 = countSeaMonstersInImage(flipedImage);

  const rotatedflipedImage = rotateClockwise(flipedImage);
  const numberOfMonsters6 = countSeaMonstersInImage(rotatedflipedImage);

  const rotatedflipedImage2 = rotateClockwise(rotatedflipedImage);
  const numberOfMonsters7 = countSeaMonstersInImage(rotatedflipedImage2);

  const rotatedflipedImage3 = rotateClockwise(rotatedflipedImage2);
  const numberOfMonsters8 = countSeaMonstersInImage(rotatedflipedImage3);


  const maxMonsters = Math.max(numberOfMonsters1,
    numberOfMonsters2,
    numberOfMonsters3,
    numberOfMonsters4,
    numberOfMonsters5,
    numberOfMonsters6,
    numberOfMonsters7,
    numberOfMonsters8);

  const numberOfSharpInMonster = 15;

  const numberOfSharpInImage = image
    .flatMap(row => {
      return row.filter(column => column === '#');
    })
    .length;

  return numberOfSharpInImage - (numberOfSharpInMonster * maxMonsters);
}