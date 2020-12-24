export function pgcd(a: number, b: number): number {
  do {  
  let r = a;  
  a = b;  
  b = r % a;  
  } while (b > 0);

  return a;  
}

export function ppcm (a: number, b: number): number {
  return a * b / pgcd(a, b);
}

export function sum (numbers: number[]): number {
  return numbers.reduce((total, current) => total + current, 0);
}

export function multiply (numbers: number[]): number {
  return numbers.reduce((total, current) => total * current, 1);
}

export function isEven (x: number): boolean {
  return x % 2 === 0;
}