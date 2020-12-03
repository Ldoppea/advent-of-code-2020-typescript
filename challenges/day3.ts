const countNumberOfThreesForSlope = (map: string[]) => {
  return (vectorX: number, vectorY: number) => {
    const numberOfLines = map.length;
    const mapWidth = map[0].length;
    const TREE_PATTERN = '#';

    let posX = 0;
    let posY = 0;

    let numberOfTrees = 0;

    while (posY < numberOfLines) {
      const currentPosition = map[posY][posX % mapWidth];

      if (currentPosition == TREE_PATTERN) {
        numberOfTrees++;
      }

      posX += vectorX;
      posY += vectorY;
    }

    return numberOfTrees;
  }
}

export function countNumberOfTrees(map: string[]): number {
  return countNumberOfThreesForSlope(map)(3, 1);
}

export function countNumberOfThreesForEachSlopes(map: string[]): number[] {
  const countForMap = countNumberOfThreesForSlope(map);

  const slope1 = countForMap(1, 1);
  const slope2 = countForMap(3, 1);
  const slope3 = countForMap(5, 1);
  const slope4 = countForMap(7, 1);
  const slope5 = countForMap(1, 2);

  return [slope1, slope2, slope3, slope4, slope5];
}
