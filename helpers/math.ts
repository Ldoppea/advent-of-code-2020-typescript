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