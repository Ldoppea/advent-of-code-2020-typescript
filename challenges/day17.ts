interface Point {
  x: number,
  y: number,
  z: number,
  value: boolean
}

export const ACTIVE = '#';
export const INACTIVE = '.';

export function getHyperForeigners(pocketDimension: string[][][][], w: number, z: number, x: number, y: number) {
  const foreigners: string[] = [];

  for (let wi = w-1; wi <= w+1; wi++) {
    if (wi < 0 || wi >= pocketDimension.length) {
      const sizeZ = 3;
      const sizeX = 3;
      const sizeY = 3;
      const insertedInactive = new Array(sizeZ * sizeX * sizeY).fill(INACTIVE)
      foreigners.push(...insertedInactive);
      continue;
    };

    const planZ = pocketDimension[wi];
    for (let zi = z-1; zi <= z+1; zi++) {
      if (zi < 0 || zi >= pocketDimension[0].length) {
        const sizeX = 3;
        const sizeY = 3;
        const insertedInactive = new Array(sizeX * sizeY).fill(INACTIVE)
        foreigners.push(...insertedInactive);
        continue;
      };

      const planX = planZ[zi];
      for (let xi = x-1; xi <= x+1; xi++) {
        if (xi < 0 || xi >= pocketDimension[0][0].length) {
          const sizeY = 3;
          const insertedInactive = new Array(sizeY).fill(INACTIVE)
          foreigners.push(...insertedInactive);
          continue;
        };

        const planY = planX[xi];
        for (let yi = y-1; yi <= y+1; yi++) {
          if (yi < 0 || yi >= pocketDimension[0][0][0].length) {
            foreigners.push(INACTIVE);
            continue;
          };

          if (x === xi && y === yi && z === zi && w === wi) {
            continue;
          }

          const hypercube = planY[yi];
          foreigners.push(hypercube)
        }
      }
    }
  }

  return foreigners;
}

export function getForeigners(pocketDimension: string[][][], z: number, x: number, y: number) {
  const foreigners: string[] = [];

  for (let zi = z-1; zi <= z+1; zi++) {
    if (zi < 0 || zi >= pocketDimension.length) {
      const sizeX = 3;
      const sizeY = 3;
      const insertedInactive = new Array(sizeX * sizeY).fill(INACTIVE)
      foreigners.push(...insertedInactive);
      continue;
    };

    const planX = pocketDimension[zi];
    for (let xi = x-1; xi <= x+1; xi++) {
      if (xi < 0 || xi >= pocketDimension[0].length) {
        const sizeY = 3;
        const insertedInactive = new Array(sizeY).fill(INACTIVE)
        foreigners.push(...insertedInactive);
        continue;
      };

      const planY = planX[xi];
      for (let yi = y-1; yi <= y+1; yi++) {
        if (yi < 0 || yi >= pocketDimension[0][0].length) {
          foreigners.push(INACTIVE);
          continue;
        };

        if (x === xi && y === yi && z === zi) {
          continue;
        }

        const cube = planY[yi];
        foreigners.push(cube)
      }
    }
  }

  return foreigners;
}

export function getEmptyYGrow(pocketDimension: string[][][]): string {
  return INACTIVE;
}
export function getEmptyXGrow(pocketDimension: string[][][]): string[] {
  const y = getEmptyYGrow(pocketDimension);

  const x = new Array(pocketDimension[0][0].length + 2).fill(y);

  return x;
}
export function getEmptyZGrow(pocketDimension: string[][][]): string[][] {
  const x = getEmptyXGrow(pocketDimension);

  const z = new Array(pocketDimension[0].length + 2).fill(x);

  return z;
}

export function getEmptyHyperYGrow(): string {
  return INACTIVE;
}
export function getEmptyHyperXGrow(pocketDimension: string[][][][]): string[] {
  const y = getEmptyHyperYGrow();

  const x = new Array(pocketDimension[0][0][0].length + 2).fill(y);

  return x;
}
export function getEmptyHyperZGrow(pocketDimension: string[][][][]): string[][] {
  const x = getEmptyHyperXGrow(pocketDimension);

  const z = new Array(pocketDimension[0][0].length + 2).fill(x);

  return z;
}
export function getEmptyHyperWGrow(pocketDimension: string[][][][]): string[][][] {
  const z = getEmptyHyperZGrow(pocketDimension);

  const w = new Array(pocketDimension[0].length + 2).fill(z);

  return w;
}

const growPocketDimension = (pocketDimension: string[][][]): string[][][] => {
  return [
    getEmptyZGrow(pocketDimension),
    ...pocketDimension.map(planZ => {
      return [
        getEmptyXGrow(pocketDimension),
        ...planZ.map(planX => {
          return [
            getEmptyYGrow(pocketDimension),
            ...planX,
            getEmptyYGrow(pocketDimension)
          ]
        }),
        getEmptyXGrow(pocketDimension),
      ]
    }),
    getEmptyZGrow(pocketDimension),
  ]
}

const growPocketHyperDimension = (pocketDimension: string[][][][]): string[][][][] => {
  return [
    getEmptyHyperWGrow(pocketDimension),
    ...pocketDimension.map(planW => {
      return [
        getEmptyHyperZGrow(pocketDimension),
        ...planW.map(planZ => {
          return [
            getEmptyHyperXGrow(pocketDimension),
            ...planZ.map(planX => {
              return [
                getEmptyHyperYGrow(),
                ...planX,
                getEmptyHyperYGrow()
              ]
            }),
            getEmptyHyperXGrow(pocketDimension)
          ]
        }),
        getEmptyHyperZGrow(pocketDimension),
      ]
    }),
    getEmptyHyperWGrow(pocketDimension),
  ]
}

export function playCycle(pocketDimension: string[][][]): string[][][] {
  const grownPocketDimension = growPocketDimension(pocketDimension);
  return grownPocketDimension.map((planZ, z) => {
    return planZ.map((planX, x) => {
      return planX.map((planY, y) => {
        const foreigners = getForeigners(grownPocketDimension, z, x, y);
        const numberOfActiveForeigners = foreigners.filter(f => f === ACTIVE).length;
        if (planY === ACTIVE && (numberOfActiveForeigners === 2 || numberOfActiveForeigners === 3)) {
          return ACTIVE;
        } else if (planY === INACTIVE && numberOfActiveForeigners === 3) {
          return ACTIVE;
        } else {
          return INACTIVE;
        }
      });
    });
  });
}

export function playHyperCycle(pocketDimension: string[][][][]): string[][][][] {
  const grownPocketDimension = growPocketHyperDimension(pocketDimension);
  return grownPocketDimension.map((planW, w) => {
    return planW.map((planZ, z) => {
      return planZ.map((planX, x) => {
        return planX.map((planY, y) => {
          const foreigners = getHyperForeigners(grownPocketDimension, w, z, x, y);
          const numberOfActiveForeigners = foreigners.filter(f => f === ACTIVE).length;
          if (planY === ACTIVE && (numberOfActiveForeigners === 2 || numberOfActiveForeigners === 3)) {
            return ACTIVE;
          } else if (planY === INACTIVE && numberOfActiveForeigners === 3) {
            return ACTIVE;
          } else {
            return INACTIVE;
          }
        });
      });
    });
  });
}

export function getPocketDimension(input: string[]): string[][][] {
  return [
    input.map(line => line.split(''))
  ];
}

const countActives = (pocketDimension: string[][][]) => {
  return pocketDimension
    .flatMap(z => z)
    .flatMap(z => z)
    .filter(cube => cube === ACTIVE)
    .length;
}

const countHyperActives = (pocketDimension: string[][][][]) => {
  return pocketDimension
    .flatMap(z => z)
    .flatMap(z => z)
    .flatMap(z => z)
    .filter(cube => cube === ACTIVE)
    .length;
}

export function countActiveCubes(input: string[]): number {
  const pocketDimension = getPocketDimension(input);
  const round1 = playCycle(pocketDimension);
  const round2 = playCycle(round1);
  const round3 = playCycle(round2);
  const round4 = playCycle(round3);
  const round5 = playCycle(round4);
  const round6 = playCycle(round5);

  countActives(pocketDimension);
  countActives(round1);
  countActives(round2);
  countActives(round3);
  countActives(round4);
  countActives(round5);
  countActives(round6);


  return countActives(round6);;
}

export function countActiveHypercubes(input: string[]): number {
  const pocketDimension = [getPocketDimension(input)];
  const round1 = playHyperCycle(pocketDimension);
  const round2 = playHyperCycle(round1);
  const round3 = playHyperCycle(round2);
  const round4 = playHyperCycle(round3);
  const round5 = playHyperCycle(round4);
  const round6 = playHyperCycle(round5);

  countHyperActives(pocketDimension);
  countHyperActives(round1);
  countHyperActives(round2);
  countHyperActives(round3);
  countHyperActives(round4);
  countHyperActives(round5);
  countHyperActives(round6);


  return countHyperActives(round6);
}