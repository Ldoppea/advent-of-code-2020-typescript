export function findTheTwoEntriesThatSumTo2020(array: number[]): [number, number] {
  const target = 2020;
  let result:[number, number] = [0, 0];

  for (let first of array) {
    const rest = target - first;
    let second = array.find(item => item == rest);

    if(second != null) {
      result = [first, second];
      break;
    }
  }

  return result;
}

export function findTheThreeEntriesThatSumTo2020(array: number[]): [number, number, number] {
  const target = 2020;
  let result:[number, number, number] = [0, 0, 0];

  for (let first of array) {
    const rest = target - first;
    for (let second of array) {
      const rest2 = rest - second;
      
      let third = array.find(item => item == rest2);

      if (third != null) {
        result = [first, second, third];
        break;
      }
    }
  }

  return result;
}
