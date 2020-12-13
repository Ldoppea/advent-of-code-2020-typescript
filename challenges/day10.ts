export function getJoltageProduct(input: string[]): number {
  const joltages = input.map(line => parseInt(line)).sort((a, b) => a - b);
  
  let numOf1Jolt = 0;
  let numOf3Jolt = 1;

  joltages.reduce((previous, current) => {
    if (current - previous == 1) {
      numOf1Jolt++;
    }
    if (current - previous == 3) {
      numOf3Jolt++;
    }

    return current;
  }, 0);

  return numOf1Jolt * numOf3Jolt;
}

// Fibonacci de taille 3
const computeSuiteCombinations = (suiteLength: number): number => {
  let previous3 = 0;
  let previous2 = 0;
  let previous1 = 1;

  let current = 0;

  for (let i = 0; i < suiteLength; i++) {
    current = previous3 + previous2 + previous1;

    previous3 = previous2;
    previous2 = previous1;
    previous1 = current;
  }

  return current;
}

export function getNumberOfDistrinctArrangements(input: string[]): number {
  const joltages = input.map(line => parseInt(line)).sort((a, b) => a - b);

  let adapters = joltages.map((joltage, index) => {
    return index == 0 
      ? joltage 
      : joltage - joltages[index - 1];
  });

  // add final adapter
  adapters.push(3);

  // compute series
  let series: number[] = [];
  let currentSerie: number = 0;
  adapters.forEach(adapter => {
    if (adapter === 1) {
      currentSerie++;
    } else {
      series.push(currentSerie);
      currentSerie = 0;
    }
  });

  // compute combinations
  let numberOfCombinations = series
    .filter(serie => serie !== 0)
    .reduce((accumulator, currentSerieLength) => {
      return accumulator * computeSuiteCombinations(currentSerieLength);
    }, 1);

  return numberOfCombinations;
}


/*

serie of 1 '1 adapter', cannot remove last -> 0 removable

result = 0


serie of 2 '1 adapter', cannot remove last -> 1 removable
>2<
 0
 1

result = 2


serie of 3 '1 adapter', cannot remove last -> 2 removables
-->3<--
    >2<
00  10
01  11


result = 4


serie of 4 '1 adapter', cannot remove last -> 3 removables
----->4<-----
          >3<
000 -> x  100
001       101
010       110
011       111

result = 7


serie of 5 '1 adapter', cannot remove last -> 4 removables
----------------->5<--------------------
           ->3<-         ------>4<------
0000 -> x  0100          1000 -> x  1100
0001 -> x  0101          1001       1101
0010       0110          1010       1110
0011       0111          1011       1111
>2<

result = 13


serie of 6 '1 adapter', cannot remove last -> 5 removables
-------------------------------------------------->6<----------------------------------------------------
           ->3<-             ------>4<-------               --------------------->5<---------------------
00000 -> x 00100             01000 -> x 01100               10000 -> x 10100             11000 -> x 11100
00001 -> x 00101             01001      01101               10001 -> x 10101             11001      11101
00010 -> x 00110             01010      01110               10010      10110             11010      11110
00011 -> x 00111             01011      01111               10011      10111             11011      11111

result = 24


serie of 7 '1 adapter', cannot remove last -> 6 removables
-------------------------------------------------------------------------------------------------------->7<-----------------------------------------------------------------------------------------------------------
                             ------->4<-------              --------------------->5<---------------------          ------------------------------------------------>6<------------------------------------------------
000000 -> x 000100 -> x      001000 -> x 001100             010000 -> x  010100         011000 -> x 011100         100000 -> x 100100         101000 -> x 101100         110000 -> x 110100         111000 -> x 111100
000001 -> x 000101 -> x      001001      001101             010001 -> x  010101         011001      011101         100001 -> x 100101         101001      101101         110001 -> x 110101         111001      111101
000010 -> x 000110 -> x      001010      001110             010010       010110         011010      011110         100010 -> x 100110         101010      101110         110010      110110         111010      111110
000011 -> x 000111 -> x      001011      001111             010011       010111         011011      011111         100011 -> x 100111         101011      101111         110011      110111         111011      111111

result = 44


serie of 8 '1 adapter', cannot remove last -> 7 removables         
                                                            ----------------------->5<----------------------          ------------------------------------------------>6<------------------------------------------------
0000000 -> x 0000100 -> x    0001000 -> x 0001100 -> x      0010000 -> x  0010100       0011000 -> x 0011100       0100000 -> x 0100100       0101000 -> x 0101100       0110000 -> x 0110100       0111000 -> x 0111100
0000001 -> x 0000101 -> x    0001001 -> x 0001101 -> x      0010001 -> x  0010101       0011001      0011101       0100001 -> x 0100101       0101001      0101101       0110001 -> x 0110101       0111001      0111101
0000010 -> x 0000110 -> x    0001010 -> x 0001110 -> x      0010010       0010110       0011010      0011110       0100010 -> x 0100110       0101010      0101110       0110010      0110110       0111010      0111110
0000011 -> x 0000111 -> x    0001011 -> x 0001111 -> x      0010011       0010111       0011011      0011111       0100011 -> x 0100111       0101011      0101111       0110011      0110111       0111011      0111111
                                                                              
----------------------------------------------------------------------------------------------------------->7<-----------------------------------------------------------------------------------------------------------
1000000 -> x 1000100 -> x    1001000 -> x 1001100           1010000 -> x 1010100        1011000 -> x 1011100       1100000 -> x 1100100       1101000 -> x 1101100       1110000 -> x 1110100       1111000 -> x 1111100
1000001 -> x 1000101 -> x    1001001      1001101           1010001 -> x 1010101        1011001      1011101       1100001 -> x 1100101       1101001      1101101       1110001 -> x 1110101       1111001      1111101
1000010 -> x 1000110 -> x    1001010      1001110           1010010      1010110        1011010      1011110       1100010 -> x 1100110       1101010      1101110       1110010      1110110       1111010      1111110
1000011 -> x 1000111 -> x    1001011      1001111           1010011      1010111        1011011      1011111       1100011 -> x 1100111       1101011      1101111       1110011      1110111       1111011      1111111

result = 81


Suite fibonacci à 3 niveaux:

0    <--- initialisateur - 3
0    <--- initialisateur - 2
1    <--- initialisateur - 1

--- début suite fibonaci

1    <---  1 +  0 +  0
2    <---  1 +  1 +  0
4    <---  2 +  1 +  1
7    <---  4 +  2 +  1
13   <---  7 +  4 +  2
24   <--- 13 +  7 +  4
44   <--- 24 + 13 +  7
81   <--- 44 + 24 + 13

*/